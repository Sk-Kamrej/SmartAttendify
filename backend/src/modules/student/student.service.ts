import bcrypt from "bcrypt";
import { Gender, Prisma, UserRole } from "@prisma/client";

import ApiError from "../../utils/ApiError.js";
import { getPagination } from "../../utils/pagination.js";
import { PaginatedResponse } from "../../types/pagination.js";

import studentRepository from "./student.repository.js";
import collegeRepository from "../college/college.repository.js";

interface StudentQuery {
  page?: string;
  limit?: string;
  search?: string;
  collegeId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const createStudent = async (payload: {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  collegeId: string;

  studentId: string;
  rollNumber: string;
  registrationNumber: string;

  gender?: Gender;
  dateOfBirth?: Date;

  phone?: string;
  guardianName?: string;
  guardianPhone?: string;

  admissionDate: Date;
}) => {
  const existingUser = await studentRepository.findByEmail(
    payload.email
  );

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const college = await collegeRepository.findById(
    payload.collegeId
  );

  if (!college) {
    throw new ApiError(404, "College not found");
  }

  const existingStudent =
    await studentRepository.findByStudentId(
      payload.studentId
    );

  if (existingStudent) {
    throw new ApiError(
      409,
      "Student ID already exists"
    );
  }

  const existingRoll =
    await studentRepository.findByRollNumber(
      payload.rollNumber
    );

  if (existingRoll) {
    throw new ApiError(
      409,
      "Roll number already exists"
    );
  }

  const existingRegistration =
    await studentRepository.findByRegistrationNumber(
      payload.registrationNumber
    );

  if (existingRegistration) {
    throw new ApiError(
      409,
      "Registration number already exists"
    );
  }

  const passwordHash = await bcrypt.hash(
    payload.password,
    10
  );

  return studentRepository.create(
    {
      studentId: payload.studentId,
      rollNumber: payload.rollNumber,
      registrationNumber:
        payload.registrationNumber,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      phone: payload.phone,
      guardianName: payload.guardianName,
      guardianPhone: payload.guardianPhone,
      admissionDate: payload.admissionDate,
    },
    {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      passwordHash,
      role: UserRole.STUDENT,
      isActive: true,
      college: {
        connect: {
          id: payload.collegeId,
        },
      },
    }
  );
};

const getStudentById = async (id: string) => {
  const student = await studentRepository.findById(id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  return student;
};

const getAllStudents = async (
  query: StudentQuery
): Promise<PaginatedResponse<any>> => {
  const { page, limit, skip } =
    getPagination(query);

  const where: Prisma.StudentWhereInput = {};

  if (query.search) {
    where.OR = [
      {
        studentId: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        rollNumber: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        registrationNumber: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        user: {
          firstName: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      },
      {
        user: {
          lastName: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  if (query.collegeId) {
    where.user = {
      collegeId: query.collegeId,
    };
  }

  const orderBy: Prisma.StudentOrderByWithRelationInput =
    {
      [query.sortBy || "createdAt"]:
        query.sortOrder || "desc",
    };

  const [students, total] =
    await Promise.all([
      studentRepository.findMany(
        where,
        skip,
        limit,
        orderBy
      ),
      studentRepository.count(where),
    ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: students,
  };
};

const updateStudent = async (
  id: string,
  payload: {
    firstName?: string;
    lastName?: string;
    gender?: Gender;
    dateOfBirth?: Date;
    phone?: string;
    guardianName?: string;
    guardianPhone?: string;
    admissionDate?: Date;
    isActive?: boolean;
  }
) => {
  const student = await studentRepository.findById(id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  return studentRepository.update(
    id,
    {
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      phone: payload.phone,
      guardianName: payload.guardianName,
      guardianPhone: payload.guardianPhone,
      admissionDate: payload.admissionDate,
    },
    {
      firstName: payload.firstName,
      lastName: payload.lastName,
      isActive: payload.isActive,
    }
  );
};

const deleteStudent = async (id: string) => {
  const student = await studentRepository.remove(id);

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  return student;
};

export default {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};