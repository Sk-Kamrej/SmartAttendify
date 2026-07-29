import { Request, Response } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

import departmentService from "./department.service.js";

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const department = await departmentService.createDepartment(req.body);

  res.status(201).json(
    new ApiResponse(
      true,
      "Department created successfully",
      department
    )
  );
});

const getAllDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const departments = await departmentService.getAllDepartments(req.query);

    res.status(200).json(
      new ApiResponse(
        true,
        "Departments fetched successfully",
        departments
      )
    );
  }
);

const getDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const department = await departmentService.getDepartmentById(
      String(req.params.id)
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Department fetched successfully",
        department
      )
    );
  }
);

const updateDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const department = await departmentService.updateDepartment(
      String(req.params.id),
      req.body
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Department updated successfully",
        department
      )
    );
  }
);

const deleteDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const department = await departmentService.deleteDepartment(
      String(req.params.id)
    );

    res.status(200).json(
      new ApiResponse(
        true,
        "Department deleted successfully",
        department
      )
    );
  }
);

export default {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};