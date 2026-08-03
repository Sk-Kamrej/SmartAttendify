import { Request, Response } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

import semesterService from "./semester.service.js";

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const semester = await semesterService.createSemester(req.body);

  res.status(201).json(
    new ApiResponse(
      true,
      "Semester created successfully",
      semester
    )
  );
});

const getAllSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const semesters = await semesterService.getAllSemesters(req.query);

    res.status(200).json(
      new ApiResponse(
        true,
        "Semesters fetched successfully",
        semesters
      )
    );
  }
);

const getSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const semester = await semesterService.getSemesterById(
      String(req.params.id)
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Semester fetched successfully",
        semester
      )
    );
  }
);

const updateSemester = catchAsync(
  async (req: Request, res: Response) => {
    const semester = await semesterService.updateSemester(
      String(req.params.id),
      req.body
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Semester updated successfully",
        semester
      )
    );
  }
);

const deleteSemester = catchAsync(
  async (req: Request, res: Response) => {
    const semester = await semesterService.deleteSemester(
      String(req.params.id)
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Semester deleted successfully",
        semester
      )
    );
  }
);

export default {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
};