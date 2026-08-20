import { Prisma, SubjectType } from "@prisma/client";

import ApiError from "../../utils/ApiError.js";
import { getPagination } from "../../utils/pagination.js";
import { PaginatedResponse } from "../../types/pagination.js";

import subjectRepository from "./subject.repository.js";
import programRepository from "../program/program.repository.js";
import semesterRepository from "../semester/semester.repository.js";

interface SubjectQuery {
  page?: string;
  limit?: string;
  search?: string;
  programId?: string;
  semesterId?: string;
  type?: string;
  isActive?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const createSubject = async (payload: {
  name: string;
  code: string;
  credits: number;
  type: SubjectType;
  programId: string;
  semesterId: string;
}) => {
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

  const existingSubject =
    await subjectRepository.findByCode(
      payload.programId,
      payload.code
    );

  if (existingSubject) {
    throw new ApiError(
      409,
      "Subject code already exists in this program"
    );
  }

  return subjectRepository.create({
    name: payload.name,
    code: payload.code,
    credits: payload.credits,
    type: payload.type,
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
  });
};

const getSubjectById = async (id: string) => {
  const subject = await subjectRepository.findById(id);

  if (!subject) {
    throw new ApiError(404, "Subject not found");
  }

  return subject;
};

const getAllSubjects = async (
  query: SubjectQuery
): Promise<PaginatedResponse<any>> => {
  const { page, limit, skip } = getPagination(query);

  const where: Prisma.SubjectWhereInput = {};

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

  if (query.programId) {
    where.programId = query.programId;
  }

  if (query.semesterId) {
    where.semesterId = query.semesterId;
  }

  if (query.type) {
    where.type = query.type as SubjectType;
  }

  if (query.isActive !== undefined) {
    where.isActive = query.isActive === "true";
  }

  const orderBy: Prisma.SubjectOrderByWithRelationInput = {
    [query.sortBy || "createdAt"]:
      query.sortOrder || "desc",
  };

  const [subjects, total] = await Promise.all([
    subjectRepository.findMany(
      where,
      skip,
      limit,
      orderBy
    ),
    subjectRepository.count(where),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: subjects,
  };
};

const updateSubject = async (
  id: string,
  payload: {
    name?: string;
    code?: string;
    credits?: number;
    type?: SubjectType;
    isActive?: boolean;
  }
) => {
  const subject = await subjectRepository.findById(id);

  if (!subject) {
    throw new ApiError(404, "Subject not found");
  }

  if (
    payload.code &&
    payload.code !== subject.code
  ) {
    const existingSubject =
      await subjectRepository.findByCode(
        subject.programId,
        payload.code
      );

    if (existingSubject) {
      throw new ApiError(
        409,
        "Subject code already exists in this program"
      );
    }
  }

  return subjectRepository.update(id, payload);
};

const deleteSubject = async (id: string) => {
  const subject = await subjectRepository.findById(id);

  if (!subject) {
    throw new ApiError(404, "Subject not found");
  }

  return subjectRepository.remove(id);
};

export default {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
