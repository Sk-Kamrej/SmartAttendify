import { Request, Response, NextFunction } from "express";
import authService from "./auth.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json(
      new ApiResponse(
        true,
        "Login successful",
        result
      )
    );
  } catch (error) {
    next(error);
  }
};

export default {
  login,
};
