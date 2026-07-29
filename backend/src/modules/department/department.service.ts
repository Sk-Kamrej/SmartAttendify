import { Prisma } from "@prisma/client";

import ApiError from "../../utils/ApiError.js";
import { getPagination } from "../../utils/pagination.js";

import collegeRepository from "../college/college.repository.js";
import departmentRepository from "./department.repository.js";

interface GetAllDepartmentsQuery {
  page?: string;
  limit?: string;
  search?: string;
  collegeId?: string;
  isActive?: string;
  sortBy?: "name" | "code" | "createdAt";
  sortOrder?: "asc" | "desc";
}

const createDepartment = async (
  data: {
    name: string;
    code: string;
    collegeId: string;
  }
) => {
  const college = await collegeRepository.findById(data.collegeId);

  if (!college) {
    throw new ApiError(404, "College not found");
  }

  const existingDepartment =
    await departmentRepository.findByCollegeAndCode(
      data.collegeId,
      data.code
    );

  if (existingDepartment) {
    throw new ApiError(
      409,
      "Department code already exists in this college"
    );
  }

  return departmentRepository.create({
    name: data.name,
    code: data.code,
    college: {
      connect: {
        id: data.collegeId,
      },
    },
  });
};

const getAllDepartments = async (
  query: GetAllDepartmentsQuery
) => {
  const { page, limit, skip } = getPagination(query);

  return departmentRepository.findAll({
    page,
    limit,
    skip,
    search: query.search,
    collegeId: query.collegeId,
    isActive:
      query.isActive === undefined
        ? undefined
        : query.isActive === "true",
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  });
};

const getDepartmentById = async (id: string) => {
  const department = await departmentRepository.findById(id);

  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  return department;
};

const updateDepartment = async (
  id: string,
  data: Prisma.DepartmentUpdateInput
) => {
  const department = await departmentRepository.findById(id);

  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  const code =
    typeof data.code === "string"
      ? data.code
      : department.code;

  const existingDepartment =
    await departmentRepository.findByCollegeAndCodeExceptId(
      department.collegeId,
      code,
      id
    );

  if (existingDepartment) {
    throw new ApiError(
      409,
      "Department code already exists in this college"
    );
  }

  return departmentRepository.update(id, data);
};

const deleteDepartment = async (id: string) => {
  const department = await departmentRepository.findById(id);

  if (!department) {
    throw new ApiError(404, "Department not found");
  }

  return departmentRepository.softDelete(id);
};

export default {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};