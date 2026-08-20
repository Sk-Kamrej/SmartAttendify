import { Prisma } from "@prisma/client";

import prisma from "../../config/prisma.js";

const create = (data: Prisma.SubjectCreateInput) => {
  return prisma.subject.create({
    data,
    include: {
      program: true,
      semester: true,
    },
  });
};

const findById = (id: string) => {
  return prisma.subject.findUnique({
    where: {
      id,
    },
    include: {
      program: true,
      semester: true,
    },
  });
};

const findByCode = (
  programId: string,
  code: string
) => {
  return prisma.subject.findFirst({
    where: {
      programId,
      code,
    },
  });
};

const findMany = (
  where: Prisma.SubjectWhereInput,
  skip: number,
  take: number,
  orderBy: Prisma.SubjectOrderByWithRelationInput
) => {
  return prisma.subject.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      program: true,
      semester: true,
    },
  });
};

const count = (
  where: Prisma.SubjectWhereInput
) => {
  return prisma.subject.count({
    where,
  });
};

const update = (
  id: string,
  data: Prisma.SubjectUpdateInput
) => {
  return prisma.subject.update({
    where: {
      id,
    },
    data,
    include: {
      program: true,
      semester: true,
    },
  });
};

const remove = (id: string) => {
  return prisma.subject.delete({
    where: {
      id,
    },
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
