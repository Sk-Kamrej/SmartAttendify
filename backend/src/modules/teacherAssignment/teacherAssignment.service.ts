import { Prisma } from "@prisma/client";

import ApiError from "../../utils/ApiError.js";
import { getPagination } from "../../utils/pagination.js";
import { PaginatedResponse } from "../../types/pagination.js";

import teacherAssignmentRepository from "./teacherAssignment.repository.js";

import teacherRepository from "../teacher/teacher.repository.js";
import subjectRepository from "../subject/subject.repository.js";
import academicSessionRepository from "../academicSession/academicSession.repository.js";

interface TeacherAssignmentQuery {
  page?: string;
  limit?: string;
  teacherId?: string;
  subjectId?: string;
  academicSessionId?: string;
  isActive?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const createTeacherAssignment = async (payload: {
  teacherId: string;
  subjectId: string;
  academicSessionId: string;
  isActive?: boolean;
}) => {
  const teacher = await teacherRepository.findById(
    payload.teacherId
  );

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  const subject = await subjectRepository.findById(
    payload.subjectId
  );

  if (!subject) {
    throw new ApiError(404, "Subject not found");
  }

  const academicSession =
    await academicSessionRepository.findById(
      payload.academicSessionId
    );

  if (!academicSession) {
    throw new ApiError(
      404,
      "Academic session not found"
    );
  }

  const duplicate =
    await teacherAssignmentRepository.findDuplicate(
      payload.teacherId,
      payload.subjectId,
      payload.academicSessionId
    );

  if (duplicate) {
    throw new ApiError(
      409,
      "Teacher assignment already exists"
    );
  }

  return teacherAssignmentRepository.create({
    isActive: payload.isActive ?? true,
    teacher: {
      connect: {
        id: payload.teacherId,
      },
    },
    subject: {
      connect: {
        id: payload.subjectId,
      },
    },
    academicSession: {
      connect: {
        id: payload.academicSessionId,
      },
    },
  });
};

const getTeacherAssignmentById = async (
  id: string
) => {
  const assignment =
    await teacherAssignmentRepository.findById(id);

  if (!assignment) {
    throw new ApiError(
      404,
      "Teacher assignment not found"
    );
  }

  return assignment;
};

const getAllTeacherAssignments = async (
  query: TeacherAssignmentQuery
): Promise<PaginatedResponse<any>> => {
  const { page, limit, skip } =
    getPagination(query);

  const where: Prisma.TeacherAssignmentWhereInput =
    {};

  if (query.teacherId) {
    where.teacherId = query.teacherId;
  }

  if (query.subjectId) {
    where.subjectId = query.subjectId;
  }

  if (query.academicSessionId) {
    where.academicSessionId =
      query.academicSessionId;
  }

  if (query.isActive !== undefined) {
    where.isActive =
      query.isActive === "true";
  }

  const orderBy: Prisma.TeacherAssignmentOrderByWithRelationInput =
    {
      [query.sortBy || "createdAt"]:
        query.sortOrder || "desc",
    };

  const [assignments, total] =
    await Promise.all([
      teacherAssignmentRepository.findMany(
        where,
        skip,
        limit,
        orderBy
      ),
      teacherAssignmentRepository.count(where),
    ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: assignments,
  };
};

const updateTeacherAssignment = async (
  id: string,
  payload: {
    isActive?: boolean;
  }
) => {
  const assignment =
    await teacherAssignmentRepository.findById(id);

  if (!assignment) {
    throw new ApiError(
      404,
      "Teacher assignment not found"
    );
  }

  return teacherAssignmentRepository.update(
    id,
    payload
  );
};

const deleteTeacherAssignment = async (
  id: string
) => {
  const assignment =
    await teacherAssignmentRepository.findById(id);

  if (!assignment) {
    throw new ApiError(
      404,
      "Teacher assignment not found"
    );
  }

  return teacherAssignmentRepository.remove(id);
};

export default {
  createTeacherAssignment,
  getAllTeacherAssignments,
  getTeacherAssignmentById,
  updateTeacherAssignment,
  deleteTeacherAssignment,
};
