import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync.js";
import ApiResponse from "../../utils/ApiResponse.js";

import programService from "./program.service.js";

const createProgram = catchAsync(async (req: Request, res: Response) => {
  const program = await programService.createProgram(req.body);

  res.status(201).json(
    new ApiResponse(true, "Program created successfully", program)
  );
});

const getAllPrograms = catchAsync(async (req: Request, res: Response) => {
  const programs = await programService.getAllPrograms(req.query);

  res.status(200).json(
    new ApiResponse(true, "Programs fetched successfully", programs)
  );
});

const getProgramById = catchAsync(async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const program = await programService.getProgramById(id);

  res.status(200).json(
    new ApiResponse(true, "Program fetched successfully", program)
  );
});

const updateProgram = catchAsync(async (req: Request, res: Response) => {
  const id = String(req.params.id);

  const program = await programService.updateProgram(id, req.body);

  res.status(200).json(
    new ApiResponse(true, "Program updated successfully", program)
  );
});

const deleteProgram = catchAsync(async (req: Request, res: Response) => {
  const id = String(req.params.id);

  await programService.deleteProgram(id);

  res.status(200).json(
    new ApiResponse(true, "Program deleted successfully", null)
  );
});

export default {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
};