import { Prisma, Gender } from "@prisma/client";

import prisma from "../../config/prisma.js";

const create = async (
  studentData: {
    studentId: string;
    rollNumber: string;
    registrationNumber: string;
    gender?: Gender;
    dateOfBirth?: Date;
    phone?: string;
    guardianName?: string;
    guardianPhone?: string;
    admissionDate: Date;
  },
  userData: Prisma.UserCreateInput
) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: userData,
    });

    return tx.student.create({
      data: {
        studentId: studentData.studentId,
        rollNumber: studentData.rollNumber,
        registrationNumber:
          studentData.registrationNumber,
        gender: studentData.gender,
        dateOfBirth: studentData.dateOfBirth,
        phone: studentData.phone,
        guardianName: studentData.guardianName,
        guardianPhone: studentData.guardianPhone,
        admissionDate: studentData.admissionDate,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        user: true,
      },
    });
  });
};

const findById = async (id: string) => {
  return prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
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

const findByStudentId = async (
  studentId: string
) => {
  return prisma.student.findFirst({
    where: {
      studentId,
    },
  });
};

const findByRollNumber = async (
  rollNumber: string
) => {
  return prisma.student.findFirst({
    where: {
      rollNumber,
    },
  });
};

const findByRegistrationNumber = async (
  registrationNumber: string
) => {
  return prisma.student.findFirst({
    where: {
      registrationNumber,
    },
  });
};

const findMany = async (
  where: Prisma.StudentWhereInput,
  skip: number,
  take: number,
  orderBy: Prisma.StudentOrderByWithRelationInput
) => {
  return prisma.student.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      user: true,
    },
  });
};

const count = async (
  where: Prisma.StudentWhereInput
) => {
  return prisma.student.count({
    where,
  });
};

const update = async (
  id: string,
  studentData: Prisma.StudentUpdateInput,
  userData: Prisma.UserUpdateInput
) => {
  return prisma.$transaction(async (tx) => {
    const student = await tx.student.update({
      where: {
        id,
      },
      data: studentData,
    });

    await tx.user.update({
      where: {
        id: student.userId,
      },
      data: userData,
    });

    return tx.student.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  });
};

const remove = async (id: string) => {
  return prisma.$transaction(async (tx) => {
    const student = await tx.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      return null;
    }

    await tx.student.delete({
      where: {
        id,
      },
    });

    await tx.user.delete({
      where: {
        id: student.userId,
      },
    });

    return student;
  });
};

export default {
  create,
  findById,
  findByEmail,
  findByStudentId,
  findByRollNumber,
  findByRegistrationNumber,
  findMany,
  count,
  update,
  remove,
};
