import { Prisma } from "@prisma/client";

import programRepository from "./program.repository.js";

import departmentRepository from "../department/department.repository.js";

import collegeRepository from "../college/college.repository.js";

import ApiError from "../../utils/ApiError.js";

import { getPagination } from "../../utils/pagination.js";

import { PaginatedResponse } from "../../types/pagination.js";

interface ProgramQuery {
  page?: string;
  limit?: string;
  search?: string;
  collegeId?: string;
  departmentId?: string;
  isActive?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const createProgram = async (payload: {
  name: string;
  code: string;
  duration: number;
  collegeId: string;
  departmentId: string;
}) => {
  const college = await collegeRepository.findById(payload.collegeId);

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

  const existingProgram = await programRepository.findByCode(
    payload.collegeId,
    payload.code
  );

  if (existingProgram) {
    throw new ApiError(
      409,
      "Program code already exists in this college"
    );
  }

  return programRepository.create({
    ...payload,
    college: {
      connect: {
        id: payload.collegeId,
      },
    },
    department: {
      connect: {
        id: payload.departmentId,
      },
    },
  });
};

const getProgramById = async (id: string) => {
  const program = await programRepository.findById(id);

  if (!program) {
    throw new ApiError(404, "Program not found");
  }

  return program;
};

const getAllPrograms = async (
  query: ProgramQuery
): Promise<PaginatedResponse<any>> => {
  const { page, limit, skip } = getPagination(query);

  const where: Prisma.ProgramWhereInput = {};

  if (query.search) {
    where.OR = [
      {
        name: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        code: {
          contains: query.search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (query.collegeId) {
    where.collegeId = query.collegeId;
  }

  if (query.departmentId) {
    where.departmentId = query.departmentId;
  }

  if (query.isActive !== undefined) {
    where.isActive = query.isActive === "true";
  }

  const orderBy: Prisma.ProgramOrderByWithRelationInput = {
    [query.sortBy || "createdAt"]:
      query.sortOrder || "desc",
  };

  const [programs, total] = await Promise.all([
    programRepository.findMany(where, skip, limit, orderBy),
    programRepository.count(where),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: programs,
  };
};

const updateProgram = async (
  id: string,
  payload: {
    name?: string;
    code?: string;
    duration?: number;
    isActive?: boolean;
  }
) => {
  const existingProgram = await programRepository.findById(id);

  if (!existingProgram) {
    throw new ApiError(404, "Program not found");
  }

  if (
    payload.code &&
    payload.code !== existingProgram.code
  ) {
    const duplicate = await programRepository.findByCode(
      existingProgram.collegeId,
      payload.code
    );

    if (duplicate) {
      throw new ApiError(
        409,
        "Program code already exists in this college"
      );
    }
  }

  return programRepository.update(id, payload);
};

const deleteProgram = async (id: string) => {
  const program = await programRepository.findById(id);

  if (!program) {
    throw new ApiError(404, "Program not found");
  }

  return programRepository.remove(id);
};

export default {
  createProgram,
  getProgramById,
  getAllPrograms,
  updateProgram,
  deleteProgram,
};
