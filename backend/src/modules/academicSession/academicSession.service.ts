import { Prisma } from "@prisma/client";

import ApiError from "../../utils/ApiError.js";
import { getPagination } from "../../utils/pagination.js";
import { PaginatedResponse } from "../../types/pagination.js";

import academicSessionRepository from "./academicSession.repository.js";
import collegeRepository from "../college/college.repository.js";

interface AcademicSessionQuery {
  page?: string;
  limit?: string;
  search?: string;
  collegeId?: string;
  isActive?: string;
  isLocked?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const createAcademicSession = async (payload: {
  title: string;
  startDate: Date;
  endDate: Date;
  collegeId: string;
  isActive?: boolean;
}) => {
  const college = await collegeRepository.findById(
    payload.collegeId
  );

  if (!college) {
    throw new ApiError(404, "College not found");
  }

  if (payload.startDate >= payload.endDate) {
    throw new ApiError(
      400,
      "Start date must be before end date"
    );
  }

  const existing =
    await academicSessionRepository.findByTitle(
      payload.collegeId,
      payload.title
    );

  if (existing) {
    throw new ApiError(
      409,
      "Academic session already exists for this college"
    );
  }

  if (payload.isActive) {
    const active =
      await academicSessionRepository.findMany(
        {
          collegeId: payload.collegeId,
          isActive: true,
        },
        0,
        1,
        {
          createdAt: "desc",
        }
      );

    if (active.length > 0) {
      throw new ApiError(
        409,
        "Another academic session is already active"
      );
    }
  }

  return academicSessionRepository.create({
    title: payload.title,
    startDate: payload.startDate,
    endDate: payload.endDate,
    isActive: payload.isActive ?? false,
    college: {
      connect: {
        id: payload.collegeId,
      },
    },
  });
};

const getAcademicSessionById = async (
  id: string
) => {
  const session =
    await academicSessionRepository.findById(id);

  if (!session) {
    throw new ApiError(
      404,
      "Academic session not found"
    );
  }

  return session;
};

const getAllAcademicSessions = async (
  query: AcademicSessionQuery
): Promise<PaginatedResponse<any>> => {
  const { page, limit, skip } =
    getPagination(query);

  const where: Prisma.AcademicSessionWhereInput =
    {};

  if (query.search) {
    where.title = {
      contains: query.search,
      mode: "insensitive",
    };
  }

  if (query.collegeId) {
    where.collegeId = query.collegeId;
  }

  if (query.isActive !== undefined) {
    where.isActive =
      query.isActive === "true";
  }

  if (query.isLocked !== undefined) {
    where.isLocked =
      query.isLocked === "true";
  }

  const orderBy: Prisma.AcademicSessionOrderByWithRelationInput =
    {
      [query.sortBy || "createdAt"]:
        query.sortOrder || "desc",
    };

  const [sessions, total] =
    await Promise.all([
      academicSessionRepository.findMany(
        where,
        skip,
        limit,
        orderBy
      ),
      academicSessionRepository.count(where),
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

const updateAcademicSession = async (
  id: string,
  payload: {
    title?: string;
    startDate?: Date;
    endDate?: Date;
    isActive?: boolean;
    isLocked?: boolean;
  }
) => {
  const session =
    await academicSessionRepository.findById(id);

  if (!session) {
    throw new ApiError(
      404,
      "Academic session not found"
    );
  }

  if (
    payload.startDate &&
    payload.endDate &&
    payload.startDate >= payload.endDate
  ) {
    throw new ApiError(
      400,
      "Start date must be before end date"
    );
  }

  if (
    payload.title &&
    payload.title !== session.title
  ) {
    const existing =
      await academicSessionRepository.findByTitle(
        session.collegeId,
        payload.title
      );

    if (existing) {
      throw new ApiError(
        409,
        "Academic session title already exists"
      );
    }
  }

  return academicSessionRepository.update(
    id,
    payload
  );
};

const deleteAcademicSession = async (
  id: string
) => {
  const session =
    await academicSessionRepository.findById(id);

  if (!session) {
    throw new ApiError(
      404,
      "Academic session not found"
    );
  }

  return academicSessionRepository.remove(id);
};

export default {
  createAcademicSession,
  getAllAcademicSessions,
  getAcademicSessionById,
  updateAcademicSession,
  deleteAcademicSession,
};