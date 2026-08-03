import { Request, Response } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

import studentService from "./student.service.js";

const createStudent = catchAsync(
  async (req: Request, res: Response) => {
    const student = await studentService.createStudent(req.body);

    res.status(201).json(
      new ApiResponse(
        true,
        "Student created successfully",
        student
      )
    );
  }
);

const getAllStudents = catchAsync(
  async (req: Request, res: Response) => {
    const students = await studentService.getAllStudents(
      req.query
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Students fetched successfully",
        students
      )
    );
  }
);

const getStudentById = catchAsync(
  async (req: Request, res: Response) => {
    const student = await studentService.getStudentById(
      String(req.params.id)
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Student fetched successfully",
        student
      )
    );
  }
);

const updateStudent = catchAsync(
  async (req: Request, res: Response) => {
    const student = await studentService.updateStudent(
      String(req.params.id),
      req.body
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Student updated successfully",
        student
      )
    );
  }
);

const deleteStudent = catchAsync(
  async (req: Request, res: Response) => {
    const student = await studentService.deleteStudent(
      String(req.params.id)
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Student deleted successfully",
        student
      )
    );
  }
);

export default {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};