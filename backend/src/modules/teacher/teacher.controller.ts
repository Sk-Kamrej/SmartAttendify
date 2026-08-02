import { Request, Response } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

import teacherService from "./teacher.service.js";

const createTeacher = catchAsync(
  async (req: Request, res: Response) => {
    const teacher = await teacherService.createTeacher(req.body);

    res.status(201).json(
      new ApiResponse(
        true,
        "Teacher created successfully",
        teacher
      )
    );
  }
);

const getAllTeachers = catchAsync(
  async (req: Request, res: Response) => {
    const teachers = await teacherService.getAllTeachers(req.query);

    res.status(200).json(
      new ApiResponse(
        true,
        "Teachers fetched successfully",
        teachers
      )
    );
  }
);

const getTeacherById = catchAsync(
  async (req: Request, res: Response) => {
    const teacher = await teacherService.getTeacherById(
      String(req.params.id)
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Teacher fetched successfully",
        teacher
      )
    );
  }
);

const updateTeacher = catchAsync(
  async (req: Request, res: Response) => {
    const teacher = await teacherService.updateTeacher(
      String(req.params.id),
      req.body
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Teacher updated successfully",
        teacher
      )
    );
  }
);

const deleteTeacher = catchAsync(
  async (req: Request, res: Response) => {
    const teacher = await teacherService.deleteTeacher(
      String(req.params.id)
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Teacher deleted successfully",
        teacher
      )
    );
  }
);

export default {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};