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
  getAllAttendanceRecords,
  getAttendanceRecordById,
  updateAttendanceRecord,
  deleteAttendanceRecord,
};