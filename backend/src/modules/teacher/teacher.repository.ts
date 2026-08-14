import { Prisma } from "@prisma/client";

import prisma from "../../config/prisma.js";

const create = async (
  teacherData: {
    employeeId: string;
    designation?: string;
    qualification?: string;
    phone?: string;
    officialEmail?: string;
    joiningDate: Date;
    departmentId: string;
  },
  userData: Prisma.UserCreateInput
) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: userData,
    });

    return tx.teacher.create({
      data: {
        employeeId: teacherData.employeeId,
        designation: teacherData.designation,
        qualification: teacherData.qualification,
        phone: teacherData.phone,
        officialEmail: teacherData.officialEmail,
        joiningDate: teacherData.joiningDate,
        user: {
          connect: {
            id: user.id,
          },
        },
        department: {
          connect: {
            id: teacherData.departmentId,
          },
        },
      },
      include: {
        user: true,
        department: true,
      },
    });
  });
};

const findById = async (id: string) => {
  return prisma.teacher.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      department: true,
    },
  });
};

const findByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const findByEmployeeId = async (
  departmentId: string,
  employeeId: string
) => {
  return prisma.teacher.findFirst({
    where: {
      departmentId,
      employeeId,
    },
  });
};

const findMany = async (
  where: Prisma.TeacherWhereInput,
  skip: number,
  take: number,
  orderBy: Prisma.TeacherOrderByWithRelationInput
) => {
  return prisma.teacher.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      user: true,
      department: true,
    },
  });
};

const count = async (
  where: Prisma.TeacherWhereInput
) => {
  return prisma.teacher.count({
    where,
  });
};

const update = async (
  id: string,
  teacherData: Prisma.TeacherUpdateInput,
  userData: Prisma.UserUpdateInput
) => {
  return prisma.$transaction(async (tx) => {
    const teacher = await tx.teacher.update({
      where: {
        id,
      },
      data: teacherData,
    });

    await tx.user.update({
      where: {
        id: teacher.userId,
      },
      data: userData,
    });

    return tx.teacher.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        department: true,
      },
    });
  });
};

const remove = async (id: string) => {
  return prisma.$transaction(async (tx) => {
    const teacher = await tx.teacher.findUnique({
      where: {
        id,
      },
    });

    if (!teacher) {
      return null;
    }

    await tx.teacher.delete({
      where: {
        id,
      },
    });

    await tx.user.delete({
      where: {
        id: teacher.userId,
      },
    });

    return teacher;
  });
};

export default {
  create,
  findById,
  findByEmail,
  findByEmployeeId,
  findMany,
  count,
  update,
  remove,
};
