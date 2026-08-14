import bcrypt from "bcrypt";
import { Prisma, UserRole } from "@prisma/client";

import ApiError from "../../utils/ApiError.js";
import { getPagination } from "../../utils/pagination.js";
import { PaginatedResponse } from "../../types/pagination.js";

import teacherRepository from "./teacher.repository.js";
import collegeRepository from "../college/college.repository.js";
import departmentRepository from "../department/department.repository.js";

interface TeacherQuery {
  page?: string;
  limit?: string;
  search?: string;
  departmentId?: string;
  collegeId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const createTeacher = async (payload: {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  employeeId: string;
  designation?: string;
  qualification?: string;
  phone?: string;
 officialEmail?: string;
  joiningDate: Date;
  collegeId: string;
  departmentId: string;
}) => {
  const existingUser = await teacherRepository.findByEmail(
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

  const department = await departmentRepository.findById(
    payload.departmentId
  );

  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  if (department.collegeId !== payload.collegeId) {
    throw new ApiError(
      400,
      "Department does not belong to the selected college"
    );
  }

  const existingTeacher =
    await teacherRepository.findByEmployeeId(
      payload.departmentId,
      payload.employeeId
    );

  if (existingTeacher) {
    throw new ApiError(
      409,
      "Employee ID already exists in this department"
    );
  }

  const passwordHash = await bcrypt.hash(
    payload.password,
    10
  );

  return teacherRepository.create(
    {
      employeeId: payload.employeeId,
      designation: payload.designation,
      qualification: payload.qualification,
      phone: payload.phone,
      officialEmail: payload.officialEmail,
      joiningDate: payload.joiningDate,
      departmentId: payload.departmentId,
    },
    {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      passwordHash,
      role: UserRole.TEACHER,
      isActive: true,
      college: {
        connect: {
          id: payload.collegeId,
        },
      },
    }
  );
};

const getTeacherById = async (id: string) => {
  const teacher = await teacherRepository.findById(id);

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  return teacher;
};

const getAllTeachers = async (
  query: TeacherQuery
): Promise<PaginatedResponse<any>> => {
  const { page, limit, skip } =
    getPagination(query);

  const where: Prisma.TeacherWhereInput = {};

  if (query.departmentId) {
    where.departmentId = query.departmentId;
  }

  if (query.search) {
    where.OR = [
      {
        employeeId: {
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
      {
        user: {
          email: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  const orderBy: Prisma.TeacherOrderByWithRelationInput = {
    [query.sortBy || "createdAt"]:
      query.sortOrder || "desc",
  };

  const [teachers, total] = await Promise.all([
    teacherRepository.findMany(
      where,
      skip,
      limit,
      orderBy
    ),
    teacherRepository.count(where),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: teachers,
  };
};

const updateTeacher = async (
  id: string,
  payload: {
    firstName?: string;
    lastName?: string;
    designation?: string;
    qualification?: string;
    phone?: string;
    officialEmail?: string;
    joiningDate?: Date;
    isActive?: boolean;
  }
) => {
  const teacher = await teacherRepository.findById(id);

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  return teacherRepository.update(
    id,
    {
      designation: payload.designation,
      qualification: payload.qualification,
      phone: payload.phone,
      officialEmail: payload.officialEmail,
      joiningDate: payload.joiningDate,
    },
    {
      firstName: payload.firstName,
      lastName: payload.lastName,
      isActive: payload.isActive,
    }
  );
};

const deleteTeacher = async (id: string) => {
  const teacher = await teacherRepository.remove(id);

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  return teacher;
};

export default {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
