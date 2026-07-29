import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma.js";
import { PaginatedResponse } from "../../types/pagination.js";

interface FindAllOptions {
  page: number;
  limit: number;
  skip: number;
  search?: string;
  isActive?: boolean;
  sortBy?: "name" | "code" | "createdAt";
  sortOrder?: "asc" | "desc";
}

const create = async (data: Prisma.CollegeCreateInput) => {
  return prisma.college.create({
    data,
  });
};

const findByCode = async (code: string) => {
  return prisma.college.findUnique({
    where: {
      code,
    },
  });
};

const findByEmail = async (email: string) => {
  return prisma.college.findUnique({
    where: {
      email,
    },
  });
};

const findById = async (id: string) => {
  return prisma.college.findUnique({
    where: {
      id,
    },
  });
};

const findAll = async (
  options: FindAllOptions
): Promise<PaginatedResponse<Prisma.CollegeGetPayload<{}>>> => {
  const {
    page,
    limit,
    skip,
    search,
    isActive,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = options;

  const where: Prisma.CollegeWhereInput = {};

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        code: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (isActive !== undefined) {
    where.isActive = isActive;
  }

  const [data, total] = await Promise.all([
    prisma.college.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),

    prisma.college.count({
      where,
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};

const update = async (id: string, data: Prisma.CollegeUpdateInput) => {
  return prisma.college.update({
    where: {
      id,
    },
    data,
  });
};

const findByCodeExceptId = async (code: string, id: string) => {
  return prisma.college.findFirst({
    where: {
      code,
      NOT: {
        id,
      },
    },
  });
};

const findByEmailExceptId = async (email: string, id: string) => {
  return prisma.college.findFirst({
    where: {
      email,
      NOT: {
        id,
      },
    },
  });
};

const softDelete = async (id: string) => {
  return prisma.college.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
};

export default {
  create,
  findByCode,
  findByEmail,
  findById,
  findAll,
  update,
  softDelete,
  findByCodeExceptId,
  findByEmailExceptId,
};