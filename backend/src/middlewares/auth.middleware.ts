import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

interface JwtPayload {
  userId: string;
  role: string;
  collegeId: string;
}

const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access token is missing");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user || !user.isActive) {
      throw new ApiError(401, "User not found or inactive");
    }

    req.user = user;

    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

export default authenticate;