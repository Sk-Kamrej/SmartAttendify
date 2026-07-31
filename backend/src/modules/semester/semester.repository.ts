import { Prisma } from "@prisma/client";

import prisma from "../../config/prisma.js";

const create = (data: Prisma.SemesterCreateInput) => {
  return prisma.semester.create({
    data,
    include: {
      program: true,
    },
  });
};

const findById = (id: string) => {
  return prisma.semester.findUnique({
    where: { id },
    include: {
      program: true,
    },
  });
};

const findByName = (programId: string, name: string) => {
  return prisma.semester.findFirst({
    where: {
      programId,
      name,
    },
  });
};

const findMany = (
  where: Prisma.SemesterWhereInput,
  skip: number,
  take: number,
  orderBy: Prisma.SemesterOrderByWithRelationInput
) => {
  return prisma.semester.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      program: true,
    },
  });
};

const count = (where: Prisma.SemesterWhereInput) => {
  return prisma.semester.count({
    where,
  });
};

const update = (
  id: string,
  data: Prisma.SemesterUpdateInput
) => {
  return prisma.semester.update({
    where: { id },
    data,
    include: {
      program: true,
    },
  });
};

const remove = (id: string) => {
  return prisma.semester.delete({
    where: { id },
  });
};

export default {
  create,
  findById,
  findByName,
  findMany,
  count,
  update,
  remove,
};