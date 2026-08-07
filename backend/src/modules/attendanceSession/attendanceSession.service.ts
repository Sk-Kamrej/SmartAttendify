import { Prisma } from "@prisma/client";

import ApiError from "../../utils/ApiError.js";
import { getPagination } from "../../utils/pagination.js";
import { PaginatedResponse } from "../../types/pagination.js";

import attendanceSessionRepository from "./attendanceSession.repository.js";
import teacherAssignmentRepository from "../teacherAssignment/teacherAssignment.repository.js";

interface AttendanceSessionQuery {
  page?: string;
  limit?: string;
  teacherAssignmentId?: string;
  classDate?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const createAttendanceSession = async (payload: {
  teacherAssignmentId: string;
  classDate: Date;
  classNumber?: number;
  startTime?: Date;
  endTime?: Date;
  remarks?: string;
}) => {
  const assignment =
    await teacherAssignmentRepository.findById(
      payload.teacherAssignmentId
    );

  if (!assignment) {
    throw new ApiError(
      404,
      "Teacher assignment not found"
    );
  }

  if (
    payload.startTime &&
    payload.endTime &&
    payload.startTime >= payload.endTime
  ) {
    throw new ApiError(
      400,
      "Start time must be before end time"
    );
  }

  const duplicate =
    await attendanceSessionRepository.findDuplicate(
      payload.teacherAssignmentId,
      payload.classDate,
      payload.classNumber
    );

  if (duplicate) {
    throw new ApiError(
      409,
      "Attendance session already exists"
    );
  }

  return attendanceSessionRepository.create({
    classDate: payload.classDate,
    classNumber: payload.classNumber,
    startTime: payload.startTime,
    endTime: payload.endTime,
    remarks: payload.remarks,
    teacherAssignment: {
      connect: {
        id: payload.teacherAssignmentId,
      },
    },
  });
};

const getAttendanceSessionById = async (
  id: string
) => {
  const session =
    await attendanceSessionRepository.findById(id);

  if (!session) {
    throw new ApiError(
      404,
      "Attendance session not found"
    );
  }

  return session;
};

const getAllAttendanceSessions = async (
  query: AttendanceSessionQuery
): Promise<PaginatedResponse<any>> => {
  const { page, limit, skip } =
    getPagination(query);

  const where: Prisma.AttendanceSessionWhereInput =
    {};

  if (query.teacherAssignmentId) {
    where.teacherAssignmentId =
      query.teacherAssignmentId;
  }

  if (query.classDate) {
    where.classDate = new Date(query.classDate);
  }

  const orderBy: Prisma.AttendanceSessionOrderByWithRelationInput =
    {
      [query.sortBy || "createdAt"]:
        query.sortOrder || "desc",
    };

  const [sessions, total] =
    await Promise.all([
      attendanceSessionRepository.findMany(
        where,
        skip,
        limit,
        orderBy
      ),
      attendanceSessionRepository.count(where),
    ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: sessions,
  };
};

const updateAttendanceSession = async (
  id: string,
  payload: {
    classDate?: Date;
    classNumber?: number;
    startTime?: Date;
    endTime?: Date;
    remarks?: string;
  }
) => {
  const session =
    await attendanceSessionRepository.findById(id);

  if (!session) {
    throw new ApiError(
      404,
      "Attendance session not found"
    );
  }

  if (
    payload.startTime &&
    payload.endTime &&
    payload.startTime >= payload.endTime
  ) {
    throw new ApiError(
      400,
      "Start time must be before end time"
    );
  }

  return attendanceSessionRepository.update(
    id,
    payload
  );
};

const deleteAttendanceSession = async (
  id: string
) => {
  const session =
    await attendanceSessionRepository.findById(id);

  if (!session) {
    throw new ApiError(
      404,
      "Attendance session not found"
    );
  }

  return attendanceSessionRepository.remove(id);
};

export default {
  createAttendanceSession,
  getAllAttendanceSessions,
  getAttendanceSessionById,
  updateAttendanceSession,
  deleteAttendanceSession,
};