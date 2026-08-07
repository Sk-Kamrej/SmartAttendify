import { Prisma } from "@prisma/client";

import prisma from "../../config/prisma.js";

const create = (
  data: Prisma.AttendanceSessionCreateInput
) => {
  return prisma.attendanceSession.create({
    data,
    include: {
      teacherAssignment: {
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
      },
      records: {
        include: {
          enrollment: {
            include: {
              student: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const findById = (id: string) => {
  return prisma.attendanceSession.findUnique({
    where: {
      id,
    },
    include: {
      teacherAssignment: {
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
      },
      records: {
        include: {
          enrollment: {
            include: {
              student: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const findDuplicate = (
  teacherAssignmentId: string,
  classDate: Date,
  classNumber?: number
) => {
  return prisma.attendanceSession.findFirst({
    where: {
      teacherAssignmentId,
      classDate,
      classNumber,
    },
  });
};

const findMany = (
  where: Prisma.AttendanceSessionWhereInput,
  skip: number,
  take: number,
  orderBy: Prisma.AttendanceSessionOrderByWithRelationInput
) => {
  return prisma.attendanceSession.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      teacherAssignment: {
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
      },
      records: {
        include: {
          enrollment: {
            include: {
              student: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const count = (
  where: Prisma.AttendanceSessionWhereInput
) => {
  return prisma.attendanceSession.count({
    where,
  });
};

const update = (
  id: string,
  data: Prisma.AttendanceSessionUpdateInput
) => {
  return prisma.attendanceSession.update({
    where: {
      id,
    },
    data,
    include: {
      teacherAssignment: {
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
      },
      records: {
        include: {
          enrollment: {
            include: {
              student: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const remove = (id: string) => {
  return prisma.attendanceSession.delete({
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