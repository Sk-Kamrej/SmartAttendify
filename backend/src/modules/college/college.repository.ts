import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma.js";

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

const findAll = async () => {
  return prisma.college.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
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

export default {
  create,
  findByCode,
  findByEmail,
  findById,
  findAll,
  update,
  findByCodeExceptId,
  findByEmailExceptId,
};