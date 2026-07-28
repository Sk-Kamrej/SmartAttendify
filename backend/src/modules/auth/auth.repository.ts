import prisma from "../../config/prisma.js";

const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      college: true,
    },
  });
};

export default {
  findUserByEmail,
};