import prisma from "../../config/prisma.js";
import { Prisma } from "@prisma/client";

const create = (data: Prisma.ProgramCreateInput) => {
  return prisma.program.create({
    data,
    include: {
      college: true,
      department: true,
    },
  });
};

const findById = (id: string) => {
  return prisma.program.findUnique({
    where: { id },
    include: {
      college: true,
      department: true,
    },
  });
};

const findByCode = (collegeId: string, code: string) => {
  return prisma.program.findFirst({
    where: {
      collegeId,
      code,
    },
  });
};

const findMany = (
  where: Prisma.ProgramWhereInput,
  skip: number,
  take: number,
  orderBy: Prisma.ProgramOrderByWithRelationInput
) => {
  return prisma.program.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      college: true,
      department: true,
    },
  });
};

const count = (where: Prisma.ProgramWhereInput) => {
  return prisma.program.count({
    where,
  });
};

const update = (id: string, data: Prisma.ProgramUpdateInput) => {
  return prisma.program.update({
    where: { id },
    data,
    include: {
      college: true,
      department: true,
    },
  });
};

const remove = (id: string) => {
  return prisma.program.delete({
    where: { id },
  });
};

export default {
  create,
  findById,
  findByCode,
  findMany,
  count,
  update,
  remove,
};