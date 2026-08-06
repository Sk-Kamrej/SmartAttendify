import {
  EnrollmentStatus,
  Prisma,
} from "@prisma/client";

import ApiError from "../../utils/ApiError.js";
import { getPagination } from "../../utils/pagination.js";
import { PaginatedResponse } from "../../types/pagination.js";

import enrollmentRepository from "./enrollment.repository.js";

import studentRepository from "../student/student.repository.js";
import programRepository from "../program/program.repository.js";
import semesterRepository from "../semester/semester.repository.js";
import academicSessionRepository from "../academicSession/academicSession.repository.js";

interface EnrollmentQuery {
  page?: string;
  limit?: string;
  studentId?: string;
  programId?: string;
  semesterId?: string;
  academicSessionId?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const createEnrollment = async (payload: {
  studentId: string;
  academicSessionId: string;
  programId: string;
  semesterId: string;
  status?: EnrollmentStatus;
}) => {
  const student = await studentRepository.findById(
    payload.studentId
  );

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  const program = await programRepository.findById(
    payload.programId
  );

  if (!program) {
    throw new ApiError(404, "Program not found");
  }

  const semester = await semesterRepository.findById(
    payload.semesterId
  );

  if (!semester) {
    throw new ApiError(404, "Semester not found");
  }

  if (semester.programId !== payload.programId) {
    throw new ApiError(
      400,
      "Semester does not belong to the selected program"
    );
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
    await enrollmentRepository.findDuplicate(
      payload.studentId,
      payload.academicSessionId
    );

  if (duplicate) {
    throw new ApiError(
      409,
      "Student is already enrolled in this academic session"
    );
  }

  return enrollmentRepository.create({
    status: payload.status ?? EnrollmentStatus.ACTIVE,
    student: {
      connect: {
        id: payload.studentId,
      },
    },
    program: {
      connect: {
        id: payload.programId,
      },
    },
    semester: {
      connect: {
        id: payload.semesterId,
      },
    },
    academicSession: {
      connect: {
        id: payload.academicSessionId,
      },
    },
  });
};

const getEnrollmentById = async (
  id: string
) => {
  const enrollment =
    await enrollmentRepository.findById(id);

  if (!enrollment) {
    throw new ApiError(
      404,
      "Enrollment not found"
    );
  }

  return enrollment;
};

const getAllEnrollments = async (
  query: EnrollmentQuery
): Promise<PaginatedResponse<any>> => {
  const { page, limit, skip } =
    getPagination(query);

  const where: Prisma.EnrollmentWhereInput = {};

  if (query.studentId) {
    where.studentId = query.studentId;
  }

  if (query.programId) {
    where.programId = query.programId;
  }

  if (query.semesterId) {
    where.semesterId = query.semesterId;
  }

  if (query.academicSessionId) {
    where.academicSessionId =
      query.academicSessionId;
  }

  if (query.status) {
    where.status =
      query.status as EnrollmentStatus;
  }

  const orderBy: Prisma.EnrollmentOrderByWithRelationInput =
    {
      [query.sortBy || "createdAt"]:
        query.sortOrder || "desc",
    };

  const [enrollments, total] =
    await Promise.all([
      enrollmentRepository.findMany(
        where,
        skip,
        limit,
        orderBy
      ),
      enrollmentRepository.count(where),
    ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: enrollments,
  };
};

const updateEnrollment = async (
  id: string,
  payload: {
    status?: EnrollmentStatus;
  }
) => {
  const enrollment =
    await enrollmentRepository.findById(id);

  if (!enrollment) {
    throw new ApiError(
      404,
      "Enrollment not found"
    );
  }

  return enrollmentRepository.update(
    id,
    payload
  );
};

const deleteEnrollment = async (
  id: string
) => {
  const enrollment =
    await enrollmentRepository.findById(id);

  if (!enrollment) {
    throw new ApiError(
      404,
      "Enrollment not found"
    );
  }

  return enrollmentRepository.remove(id);
};

export default {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
};