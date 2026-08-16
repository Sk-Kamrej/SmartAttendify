import { AttendanceStatus, Prisma } from "@prisma/client";

import ApiError from "../../utils/ApiError.js";

import prisma from "../../config/prisma.js";

const getStudentAttendanceSummary = async (
  studentId: string,
  academicSessionId?: string
) => {
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  const enrollmentWhere: Prisma.EnrollmentWhereInput = {
    studentId,
  };

  if (academicSessionId) {
    enrollmentWhere.academicSessionId =
      academicSessionId;
  }

  const enrollments =
    await prisma.enrollment.findMany({
      where: enrollmentWhere,
      include: {
        program: true,
        semester: true,
        academicSession: true,
        attendanceRecords: {
          include: {
            attendanceSession: {
              include: {
                teacherAssignment: {
                  include: {
                    subject: true,
                  },
                },
              },
            },
          },
          orderBy: {
            markedAt: "desc",
          },
        },
      },
    });

  let totalClasses = 0;
  let present = 0;
  let absent = 0;
  let late = 0;
  let leave = 0;

  const subjectMap = new Map<
    string,
    {
      subjectId: string;
      subjectName: string;
      subjectCode: string;
      totalClasses: number;
      present: number;
      absent: number;
      late: number;
      leave: number;
    }
  >();

  for (const enrollment of enrollments) {
    for (const record of enrollment.attendanceRecords) {
      totalClasses++;

      switch (record.status) {
        case AttendanceStatus.PRESENT:
          present++;
          break;

        case AttendanceStatus.ABSENT:
          absent++;
          break;

        case AttendanceStatus.LATE:
          late++;
          break;

        case AttendanceStatus.LEAVE:
          leave++;
          break;
      }

      const subject =
        record.attendanceSession.teacherAssignment.subject;

      let subjectData = subjectMap.get(subject.id);

      if (!subjectData) {
        subjectData = {
          subjectId: subject.id,
          subjectName: subject.name,
          subjectCode: subject.code,
          totalClasses: 0,
          present: 0,
          absent: 0,
          late: 0,
          leave: 0,
        };

        subjectMap.set(subject.id, subjectData);
      }

      subjectData.totalClasses++;

      switch (record.status) {
        case AttendanceStatus.PRESENT:
          subjectData.present++;
          break;

        case AttendanceStatus.ABSENT:
          subjectData.absent++;
          break;

        case AttendanceStatus.LATE:
          subjectData.late++;
          break;

        case AttendanceStatus.LEAVE:
          subjectData.leave++;
          break;
      }
    }
  }

  const attendancePercentage =
    totalClasses === 0
      ? 0
      : ((present + late) / totalClasses) * 100;

  const subjects = Array.from(
    subjectMap.values()
  ).map((subject) => ({
    ...subject,
    attendancePercentage:
      subject.totalClasses === 0
        ? 0
        : ((subject.present + subject.late) /
            subject.totalClasses) *
          100,
  }));

  return {
    student: {
      id: student.id,
      studentId: student.studentId,
    },

    academicSessionId:
      academicSessionId ?? null,

    summary: {
      totalClasses,
      present,
      absent,
      late,
      leave,
      attendancePercentage:
        Number(attendancePercentage.toFixed(2)),
    },

    subjects: subjects.map((subject) => ({
      ...subject,
      attendancePercentage: Number(
        subject.attendancePercentage.toFixed(2)
      ),
    })),
  };
};

const getStudentAttendanceShortage = async (
  studentId: string,
  academicSessionId?: string
) => {
  const summary = await getStudentAttendanceSummary(
    studentId,
    academicSessionId
  );

  const enrollment = await prisma.enrollment.findFirst({
    where: {
      studentId,
      ...(academicSessionId
        ? {
            academicSessionId,
          }
        : {}),
    },
    include: {
      academicSession: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!enrollment) {
    throw new ApiError(
      404,
      "Student enrollment not found"
    );
  }

  const policy =
    await prisma.attendancePolicy.findUnique({
      where: {
        collegeId:
          enrollment.academicSession.collegeId,
      },
    });

  const minimumPercentage =
    policy?.minimumAttendancePercentage ?? 75;

  const attendancePercentage =
    summary.summary.attendancePercentage;

  const isShortage =
    attendancePercentage < minimumPercentage;

  return {
    student: summary.student,

    academicSessionId:
      academicSessionId ??
      enrollment.academicSessionId,

    attendancePercentage,

    minimumRequiredPercentage:
      minimumPercentage,

    isShortage,

    shortagePercentage: isShortage
      ? Number(
          (
            minimumPercentage -
            attendancePercentage
          ).toFixed(2)
        )
      : 0,
  };
};

export default {
  getStudentAttendanceSummary,
  getStudentAttendanceShortage,
};