import {
  AttendanceStatus,
  Prisma,
} from "@prisma/client";

import ApiError from "../../utils/ApiError.js";
import { getPagination } from "../../utils/pagination.js";
import { PaginatedResponse } from "../../types/pagination.js";

import attendanceRecordRepository from "./attendanceRecord.repository.js";
import attendanceSessionRepository from "../attendanceSession/attendanceSession.repository.js";
import enrollmentRepository from "../enrollment/enrollment.repository.js";

interface AttendanceRecordQuery {
  page?: string;
  limit?: string;
  attendanceSessionId?: string;
  enrollmentId?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface BulkAttendanceRecord {
  enrollmentId: string;
  status: AttendanceStatus;
  remarks?: string;
  markedAt?: Date;
}

const createAttendanceRecord = async (payload: {
  attendanceSessionId: string;
  enrollmentId: string;
  status: AttendanceStatus;
  remarks?: string;
  markedAt?: Date;
}) => {
  const attendanceSession =
    await attendanceSessionRepository.findById(
      payload.attendanceSessionId
    );

  if (!attendanceSession) {
    throw new ApiError(
      404,
      "Attendance session not found"
    );
  }

  const enrollment =
    await enrollmentRepository.findById(
      payload.enrollmentId
    );

  if (!enrollment) {
    throw new ApiError(
      404,
      "Enrollment not found"
    );
  }

  if (
    enrollment.academicSessionId !==
    attendanceSession.teacherAssignment.academicSessionId
  ) {
    throw new ApiError(
      400,
      "Enrollment does not belong to the same academic session"
    );
  }

  if (
    enrollment.programId !==
    attendanceSession.teacherAssignment.subject.programId
  ) {
    throw new ApiError(
      400,
      "Enrollment program does not match the subject program"
    );
  }

  if (
    enrollment.semesterId !==
    attendanceSession.teacherAssignment.subject.semesterId
  ) {
    throw new ApiError(
      400,
      "Enrollment semester does not match the subject semester"
    );
  }

  const duplicate =
    await attendanceRecordRepository.findDuplicate(
      payload.attendanceSessionId,
      payload.enrollmentId
    );

  if (duplicate) {
    throw new ApiError(
      409,
      "Attendance record already exists for this student"
    );
  }

  return attendanceRecordRepository.create({
    status: payload.status,
    remarks: payload.remarks,
    markedAt: payload.markedAt,
    attendanceSession: {
      connect: {
        id: payload.attendanceSessionId,
      },
    },
    enrollment: {
      connect: {
        id: payload.enrollmentId,
      },
    },
  });
};

const createBulkAttendanceRecords = async (payload: {
  attendanceSessionId: string;
  records: BulkAttendanceRecord[];
}) => {
  const attendanceSession =
    await attendanceSessionRepository.findById(
      payload.attendanceSessionId
    );

  if (!attendanceSession) {
    throw new ApiError(
      404,
      "Attendance session not found"
    );
  }

  if (payload.records.length === 0) {
    throw new ApiError(
      400,
      "Attendance records cannot be empty"
    );
  }

  const enrollmentIds = payload.records.map(
    (record) => record.enrollmentId
  );

  const uniqueEnrollmentIds = new Set(
    enrollmentIds
  );

  if (
    uniqueEnrollmentIds.size !==
    enrollmentIds.length
  ) {
    throw new ApiError(
      400,
      "Duplicate enrollment IDs are not allowed"
    );
  }

  const enrollments = await Promise.all(
    enrollmentIds.map((enrollmentId) =>
      enrollmentRepository.findById(enrollmentId)
    )
  );

  for (let i = 0; i < enrollments.length; i++) {
    const enrollment = enrollments[i];

    if (!enrollment) {
      throw new ApiError(
        404,
        `Enrollment not found: ${enrollmentIds[i]}`
      );
    }

    if (
      enrollment.academicSessionId !==
      attendanceSession.teacherAssignment
        .academicSessionId
    ) {
      throw new ApiError(
        400,
        `Enrollment ${enrollmentIds[i]} does not belong to the same academic session`
      );
    }

    if (
      enrollment.programId !==
      attendanceSession.teacherAssignment
        .subject.programId
    ) {
      throw new ApiError(
        400,
        `Enrollment ${enrollmentIds[i]} does not belong to the subject program`
      );
    }

    if (
      enrollment.semesterId !==
      attendanceSession.teacherAssignment
        .subject.semesterId
    ) {
      throw new ApiError(
        400,
        `Enrollment ${enrollmentIds[i]} does not belong to the subject semester`
      );
    }
  }

  const records =
    payload.records.map((record) => ({
      attendanceSessionId:
        payload.attendanceSessionId,
      enrollmentId: record.enrollmentId,
      status: record.status,
      remarks: record.remarks,
      markedAt: record.markedAt ?? new Date(),
    }));

  const result =
    await attendanceRecordRepository.createMany(
      records
    );

  return {
    count: result.count,
    message:
      "Bulk attendance marked successfully",
  };
};

const getAttendanceRecordById = async (
  id: string
) => {
  const record =
    await attendanceRecordRepository.findById(id);

  if (!record) {
    throw new ApiError(
      404,
      "Attendance record not found"
    );
  }

  return record;
};

const getAllAttendanceRecords = async (
  query: AttendanceRecordQuery
): Promise<PaginatedResponse<any>> => {
  const { page, limit, skip } =
    getPagination(query);

  const where: Prisma.AttendanceRecordWhereInput =
    {};

  if (query.attendanceSessionId) {
    where.attendanceSessionId =
      query.attendanceSessionId;
  }

  if (query.enrollmentId) {
    where.enrollmentId = query.enrollmentId;
  }

  if (query.status) {
    where.status =
      query.status as AttendanceStatus;
  }

  const orderBy: Prisma.AttendanceRecordOrderByWithRelationInput =
    {
      [query.sortBy || "markedAt"]:
        query.sortOrder || "desc",
    };

  const [records, total] =
    await Promise.all([
      attendanceRecordRepository.findMany(
        where,
        skip,
        limit,
        orderBy
      ),
      attendanceRecordRepository.count(where),
    ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: records,
  };
};

const updateAttendanceRecord = async (
  id: string,
  payload: {
    status?: AttendanceStatus;
    remarks?: string;
    markedAt?: Date;
  }
) => {
  const record =
    await attendanceRecordRepository.findById(id);

  if (!record) {
    throw new ApiError(
      404,
      "Attendance record not found"
    );
  }

  return attendanceRecordRepository.update(
    id,
    payload
  );
};

const deleteAttendanceRecord = async (
  id: string
) => {
  const record =
    await attendanceRecordRepository.findById(id);

  if (!record) {
    throw new ApiError(
      404,
      "Attendance record not found"
    );
  }

  return attendanceRecordRepository.remove(id);
};

export default {
  createAttendanceRecord,
  createBulkAttendanceRecords,
  getAllAttendanceRecords,
  getAttendanceRecordById,
  updateAttendanceRecord,
  deleteAttendanceRecord,
};
