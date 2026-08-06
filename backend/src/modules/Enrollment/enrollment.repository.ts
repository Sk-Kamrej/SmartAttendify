import { Prisma } from "@prisma/client";

import prisma from "../../config/prisma.js";

const create = (
  data: Prisma.EnrollmentCreateInput
) => {
  return prisma.enrollment.create({
    data,
    include: {
      student: {
        include: {
          user: true,
        },
      },
      program: true,
      semester: true,
      academicSession: {
        include: {
          college: true,
        },
      },
    },
  });
};

const findById = (id: string) => {
  return prisma.enrollment.findUnique({
    where: {
      id,
    },
    include: {
      student: {
        include: {
          user: true,
        },
      },
      program: true,
      semester: true,
      academicSession: {
        include: {
          college: true,
        },
      },
    },
  });
};

const findDuplicate = (
  studentId: string,
  academicSessionId: string
) => {
  return prisma.enrollment.findFirst({
    where: {
      studentId,
      academicSessionId,
    },
  });
};

const findMany = (
  where: Prisma.EnrollmentWhereInput,
  skip: number,
  take: number,
  orderBy: Prisma.EnrollmentOrderByWithRelationInput
) => {
  return prisma.enrollment.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      student: {
        include: {
          user: true,
        },
      },
      program: true,
      semester: true,
      academicSession: {
        include: {
          college: true,
        },
      },
    },
  });
};

const count = (
  where: Prisma.EnrollmentWhereInput
) => {
  return prisma.enrollment.count({
    where,
  });
};

const update = (
  id: string,
  data: Prisma.EnrollmentUpdateInput
) => {
  return prisma.enrollment.update({
    where: {
      id,
    },
    data,
    include: {
      student: {
        include: {
          user: true,
        },
      },
      program: true,
      semester: true,
      academicSession: {
        include: {
          college: true,
        },
      },
    },
  });
};

const remove = (id: string) => {
  return prisma.enrollment.delete({
    where: {
      id,
    },
  });
};

export default {
  create,
  findById,
  findDuplicate,
  findMany,
  count,
  update,
  remove,
};