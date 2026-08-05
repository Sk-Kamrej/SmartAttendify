import { Prisma } from "@prisma/client";

import prisma from "../../config/prisma.js";

const create = (
  data: Prisma.TeacherAssignmentCreateInput
) => {
  return prisma.teacherAssignment.create({
    data,
    include: {
      teacher: {
        include: {
          user: true,
          department: true,
        },
      },
      subject: {
        include: {
          program: true,
          semester: true,
        },
      },
      academicSession: {
        include: {
          college: true,
        },
      },
    },
  });
};

const findById = (id: string) => {
  return prisma.teacherAssignment.findUnique({
    where: {
      id,
    },
    include: {
      teacher: {
        include: {
          user: true,
          department: true,
        },
      },
      subject: {
        include: {
          program: true,
          semester: true,
        },
      },
      academicSession: {
        include: {
          college: true,
        },
      },
    },
  });
};

const findDuplicate = (
  teacherId: string,
  subjectId: string,
  academicSessionId: string
) => {
  return prisma.teacherAssignment.findFirst({
    where: {
      teacherId,
      subjectId,
      academicSessionId,
    },
  });
};

const findMany = (
  where: Prisma.TeacherAssignmentWhereInput,
  skip: number,
  take: number,
  orderBy: Prisma.TeacherAssignmentOrderByWithRelationInput
) => {
  return prisma.teacherAssignment.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      teacher: {
        include: {
          user: true,
          department: true,
        },
      },
      subject: {
        include: {
          program: true,
          semester: true,
        },
      },
      academicSession: {
        include: {
          college: true,
        },
      },
    },
  });
};

const count = (
  where: Prisma.TeacherAssignmentWhereInput
) => {
  return prisma.teacherAssignment.count({
    where,
  });
};

const update = (
  id: string,
  data: Prisma.TeacherAssignmentUpdateInput
) => {
  return prisma.teacherAssignment.update({
    where: {
      id,
    },
    data,
    include: {
      teacher: {
        include: {
          user: true,
          department: true,
        },
      },
      subject: {
        include: {
          program: true,
          semester: true,
        },
      },
      academicSession: {
        include: {
          college: true,
        },
      },
    },
  });
};

const remove = (id: string) => {
  return prisma.teacherAssignment.delete({
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