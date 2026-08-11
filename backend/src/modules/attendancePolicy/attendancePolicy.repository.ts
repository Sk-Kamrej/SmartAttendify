import { Prisma } from "@prisma/client";

import prisma from "../../config/prisma.js";

const create = (
  data: Prisma.AttendancePolicyCreateInput
) => {
  return prisma.attendancePolicy.create({
    data,
    include: {
      college: true,
    },
  });
};

const findById = (id: string) => {
  return prisma.attendancePolicy.findUnique({
    where: {
      id,
    },
    include: {
      college: true,
    },
  });
};

const findByCollegeId = (collegeId: string) => {
  return prisma.attendancePolicy.findUnique({
    where: {
      collegeId,
    },
    include: {
      college: true,
    },
  });
};

const update = (
  id: string,
  data: Prisma.AttendancePolicyUpdateInput
) => {
  return prisma.attendancePolicy.update({
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
  return prisma.attendancePolicy.delete({
    where: {
      id,
    },
  });
};

export default {
  create,
  findById,
  findByCollegeId,
  update,
  remove,
};
