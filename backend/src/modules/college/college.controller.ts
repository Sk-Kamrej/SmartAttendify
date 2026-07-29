import { Request, Response } from "express";

import collegeService from "./college.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

const createCollege = catchAsync(async (req: Request, res: Response) => {
  const college = await collegeService.createCollege(req.body);

  res.status(201).json(
    new ApiResponse(
      true,
      "College created successfully",
      college
    )
  );
});

const getAllColleges = catchAsync(async (req: Request, res: Response) => {
  const colleges = await collegeService.getAllColleges(req.query);

  res.status(200).json(
    new ApiResponse(
      true,
      "Colleges fetched successfully",
      colleges
    )
  );
});

const getCollegeById = catchAsync(async (req: Request, res: Response) => {
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
});

const updateCollege = catchAsync(async (req: Request, res: Response) => {
  const college = await collegeService.updateCollege(
    String(req.params.id),
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      true,
      "College updated successfully",
      college
    )
  );
});

const deleteCollege = catchAsync(async (req: Request, res: Response) => {
  const college = await collegeService.deleteCollege(
    String(req.params.id)
  );

  res.status(200).json(
    new ApiResponse(
      true,
      "College deleted successfully",
      college
    )
  );
});

export default {
  createCollege,
  getAllColleges,
  getCollegeById,
  updateCollege,
  deleteCollege,
};