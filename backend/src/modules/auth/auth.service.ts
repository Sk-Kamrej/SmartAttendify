import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authRepository from "./auth.repository.js";
import ApiError from "../../utils/ApiError.js";

const login = async (email: string, password: string) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
      collegeId: user.collegeId,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  const { passwordHash, ...safeUser } = user;

  return {
    token,
    user: safeUser,
  };
  };

export default {
  login,
};
