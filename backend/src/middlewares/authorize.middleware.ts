import { Request, Response, NextFunction } from "express";
import { UserRole } from "@prisma/client";

import ApiError from "../utils/ApiError.js";

const authorize =
  (...allowedRoles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return next(new ApiError(401, "Unauthorized"));
    }

    if (!allowedRoles.includes(user.role)) {
      return next(
        new ApiError(403, "You do not have permission to access this resource")
      );
    }

    next();
  };

export default authorize;