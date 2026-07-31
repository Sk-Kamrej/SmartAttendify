import { Prisma } from "@prisma/client";

import ApiError from "../../utils/ApiError.js";
import { getPagination } from "../../utils/pagination.js";
import { PaginatedResponse } from "../../types/pagination.js";

import semesterRepository from "./semester.repository.js";
import programRepository from "../program/program.repository.js";

interface SemesterQuery {
  page?: string;
  limit?: string;
  search?: string;
  programId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const createSemester = async (payload: {
  name: string;
  programId: string;
}) => {
  const program = await programRepository.findById(payload.programId);

  if (!program) {
    throw new ApiError(404, "Program not found");
  }

  const existingSemester = await semesterRepository.findByName(
    payload.programId,
    payload.name
  );

  if (existingSemester) {
    throw new ApiError(
      409,
      "Semester already exists in this program"
    );
  }

  return semesterRepository.create({
    name: payload.name,
    program: {
      connect: {
        id: payload.programId,
      },
    },
  });
};

const getSemesterById = async (id: string) => {
  const semester = await semesterRepository.findById(id);

  if (!semester) {
    throw new ApiError(404, "Semester not found");
  }

  return semester;
};

const getAllSemesters = async (
  query: SemesterQuery
): Promise<PaginatedResponse<any>> => {
  const { page, limit, skip } = getPagination(query);

  const where: Prisma.SemesterWhereInput = {};

  if (query.search) {
    where.name = {
      contains: query.search,
      mode: "insensitive",
    };
  }

  if (query.programId) {
    where.programId = query.programId;
  }

  const orderBy: Prisma.SemesterOrderByWithRelationInput = {
    [query.sortBy || "createdAt"]:
      query.sortOrder || "desc",
  };

  const [semesters, total] = await Promise.all([
    semesterRepository.findMany(
      where,
      skip,
      limit,
      orderBy
    ),
    semesterRepository.count(where),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: semesters,
  };
};

const updateSemester = async (
  id: string,
  payload: {
    name?: string;
  }
) => {
  const semester = await semesterRepository.findById(id);

  if (!semester) {
    throw new ApiError(404, "Semester not found");
  }

  if (
    payload.name &&
    payload.name !== semester.name
  ) {
    const existingSemester =
      await semesterRepository.findByName(
        semester.programId,
        payload.name
      );

    if (existingSemester) {
      throw new ApiError(
        409,
        "Semester already exists in this program"
      );
    }
  }

  return semesterRepository.update(id, payload);
};

const deleteSemester = async (id: string) => {
  const semester = await semesterRepository.findById(id);

  if (!semester) {
    throw new ApiError(404, "Semester not found");
  }

  return semesterRepository.remove(id);
};

export default {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
};