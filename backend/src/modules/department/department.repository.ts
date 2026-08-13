import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma.js";
import { PaginatedResponse } from "../../types/pagination.js";

interface FindAllOptions {
  page: number;
  limit: number;
  skip: number;
  search?: string;
  collegeId?: string;
  isActive?: boolean;
  sortBy?: "name" | "code" | "createdAt";
  sortOrder?: "asc" | "desc";
}

const create = async (data: Prisma.DepartmentCreateInput) => {
  return prisma.department.create({
    data,
    include: {
      college: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  });
};

const findById = async (id: string) => {
  return prisma.department.findUnique({
    where: {
      id,
    },
    include: {
      college: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  });
};

const findByCollegeAndCode = async (
  collegeId: string,
  code: string
) => {
  return prisma.department.findFirst({
    where: {
      collegeId,
      code,
    },
  });
};

const findByCollegeAndCodeExceptId = async (
  collegeId: string,
  code: string,
  id: string
) => {
  return prisma.department.findFirst({
    where: {
      collegeId,
      code,
      NOT: {
        id,
      },
    },
  });
};

const findAll = async (
  options: FindAllOptions
): Promise<PaginatedResponse<Prisma.DepartmentGetPayload<{
  include: {
    college: {
      select: {
        id: true;
        name: true;
        code: true;
      };
    };
  };
}>>> => {
  const {
    page,
    limit,
    skip,
    search,
    collegeId,
    isActive,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = options;

  const where: Prisma.DepartmentWhereInput = {};

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
    ];
  }

  if (collegeId) {
    where.collegeId = collegeId;
  }

  if (isActive !== undefined) {
    where.isActive = isActive;
  }

  const [data, total] = await Promise.all([
    prisma.department.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    }),

    prisma.department.count({
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

const update = async (
  id: string,
  data: Prisma.DepartmentUpdateInput
) => {
  return prisma.department.update({
    where: {
      id,
    },
    data,
    include: {
      college: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
    },
  });
};

const softDelete = async (id: string) => {
  return prisma.department.update({
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
  findById,
  findByCollegeAndCode,
  findByCollegeAndCodeExceptId,
  findAll,
  update,
  softDelete,
};
