import { Request, Response, NextFunction } from "express";

import collegeService from "./college.service.js";
import { createCollegeSchema } from "./college.validator.js";
import ApiResponse from "../../utils/ApiResponse.js";

const createCollege = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createCollegeSchema.parse(req.body);

    const college = await collegeService.createCollege(data);

    res.status(201).json(
      new ApiResponse(
        true,
        "College created successfully",
        college
      )
    );
  } catch (error) {
    next(error);
  }
};

const getAllColleges = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const colleges = await collegeService.getAllColleges();

    res.status(200).json(
      new ApiResponse(
        true,
        "Colleges fetched successfully",
        colleges
      )
    );
  } catch (error) {
    next(error);
  }
};

const getCollegeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const college = await collegeService.getCollegeById(
    String(req.params.id)
    );
    
    res.status(200).json(
      new ApiResponse(
        true,
        "College fetched successfully",
        college
      )
    );
  } catch (error) {
    next(error);
  }
};

export default {
  createCollege,
  getAllColleges,
  getCollegeById,
};