import { Prisma } from "@prisma/client";

import prisma from "../../config/prisma.js";

const create = (
  data: Prisma.AcademicSessionCreateInput
) => {
  return prisma.academicSession.create({
    data,
    include: {
      college: true,
    },
  });
};

const findById = (id: string) => {
  return prisma.academicSession.findUnique({
    where: {
      id,
    },
    include: {
      college: true,
    },
  });
};

const findByTitle = (
  collegeId: string,
  title: string
) => {
  return prisma.academicSession.findFirst({
    where: {
      collegeId,
      title,
    },
  });
};

const findMany = (
  where: Prisma.AcademicSessionWhereInput,
  skip: number,
  take: number,
  orderBy: Prisma.AcademicSessionOrderByWithRelationInput
) => {
  return prisma.academicSession.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      college: true,
    },
  });
};

const count = (
  where: Prisma.AcademicSessionWhereInput
) => {
  return prisma.academicSession.count({
    where,
  });
};

const update = (
  id: string,
  data: Prisma.AcademicSessionUpdateInput
) => {
  return prisma.academicSession.update({
    where: {
      id,
    },
    data,
    include: {
      college: true,
    },
  });
};

const remove = (id: string) => {
  return prisma.academicSession.delete({
    where: {
      id,
    },
  });
};

export default {
  create,
  findById,
  findByTitle,
  findMany,
  count,
  update,
  remove,
};
