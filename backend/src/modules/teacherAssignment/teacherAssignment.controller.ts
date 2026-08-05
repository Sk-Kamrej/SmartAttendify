import { Request, Response } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

import teacherAssignmentService from "./teacherAssignment.service.js";

const createTeacherAssignment = catchAsync(
  async (req: Request, res: Response) => {
    const assignment =
      await teacherAssignmentService.createTeacherAssignment(
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        true,
        "Teacher assignment created successfully",
        assignment
      )
    );
  }
);

const getAllTeacherAssignments = catchAsync(
  async (req: Request, res: Response) => {
    const assignments =
      await teacherAssignmentService.getAllTeacherAssignments(
        req.query
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Teacher assignments fetched successfully",
        assignments
      )
    );
  }
);

const getTeacherAssignmentById = catchAsync(
  async (req: Request, res: Response) => {
    const assignment =
      await teacherAssignmentService.getTeacherAssignmentById(
        String(req.params.id)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Teacher assignment fetched successfully",
        assignment
      )
    );
  }
);

const updateTeacherAssignment = catchAsync(
  async (req: Request, res: Response) => {
    const assignment =
      await teacherAssignmentService.updateTeacherAssignment(
        String(req.params.id),
        req.body
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Teacher assignment updated successfully",
        assignment
      )
    );
  }
);

const deleteTeacherAssignment = catchAsync(
  async (req: Request, res: Response) => {
    const assignment =
      await teacherAssignmentService.deleteTeacherAssignment(
        String(req.params.id)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Teacher assignment deleted successfully",
        assignment
      )
    );
  }
);

export default {
  createTeacherAssignment,
  getAllTeacherAssignments,
  getTeacherAssignmentById,
  updateTeacherAssignment,
  deleteTeacherAssignment,
};