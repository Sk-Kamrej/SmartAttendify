import { Prisma } from "@prisma/client";

import prisma from "../../config/prisma.js";

const create = (
  data: Prisma.AttendanceRecordCreateInput
) => {
  return prisma.attendanceRecord.create({
    data,
    include: {
      attendanceSession: {
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
        },
      },
      enrollment: {
        include: {
          student: {
            include: {
              user: true,
            },
          },
          program: true,
          semester: true,
          academicSession: true,
        },
      },
    },
  });
};

const findById = (id: string) => {
  return prisma.attendanceRecord.findUnique({
    where: {
      id,
    },
    include: {
      attendanceSession: {
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
        },
      },
      enrollment: {
        include: {
          student: {
            include: {
              user: true,
            },
          },
          program: true,
          semester: true,
          academicSession: true,
        },
      },
    },
  });
};

const findDuplicate = (
  attendanceSessionId: string,
  enrollmentId: string
) => {
  return prisma.attendanceRecord.findFirst({
    where: {
      attendanceSessionId,
      enrollmentId,
    },
  });
};

const findMany = (
  where: Prisma.AttendanceRecordWhereInput,
  skip: number,
  take: number,
  orderBy: Prisma.AttendanceRecordOrderByWithRelationInput
) => {
  return prisma.attendanceRecord.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      attendanceSession: {
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
        },
      },
      enrollment: {
        include: {
          student: {
            include: {
              user: true,
            },
          },
          program: true,
          semester: true,
          academicSession: true,
        },
      },
    },
  });
};

const count = (
  where: Prisma.AttendanceRecordWhereInput
) => {
  return prisma.attendanceRecord.count({
    where,
  });
};

const update = (
  id: string,
  data: Prisma.AttendanceRecordUpdateInput
) => {
  return prisma.attendanceRecord.update({
    where: {
      id,
    },
    data,
    include: {
      attendanceSession: {
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
        },
      },
      enrollment: {
        include: {
          student: {
            include: {
              user: true,
            },
          },
          program: true,
          semester: true,
          academicSession: true,
        },
      },
    },
  });
};

const remove = (id: string) => {
  return prisma.attendanceRecord.delete({
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