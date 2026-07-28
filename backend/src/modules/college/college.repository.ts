import prisma from "../../config/prisma.js";
import { Prisma } from "@prisma/client";

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

export default {
  create,
  findByCode,
  findByEmail,
  findById,
  findAll,
};