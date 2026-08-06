import { Request, Response } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

import enrollmentService from "./enrollment.service.js";

const createEnrollment = catchAsync(
  async (req: Request, res: Response) => {
    const enrollment =
      await enrollmentService.createEnrollment(
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        true,
        "Enrollment created successfully",
        enrollment
      )
    );
  }
);

const getAllEnrollments = catchAsync(
  async (req: Request, res: Response) => {
    const enrollments =
      await enrollmentService.getAllEnrollments(
        req.query
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Enrollments fetched successfully",
        enrollments
      )
    );
  }
);

const getEnrollmentById = catchAsync(
  async (req: Request, res: Response) => {
    const enrollment =
      await enrollmentService.getEnrollmentById(
        String(req.params.id)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Enrollment fetched successfully",
        enrollment
      )
    );
  }
);

const updateEnrollment = catchAsync(
  async (req: Request, res: Response) => {
    const enrollment =
      await enrollmentService.updateEnrollment(
        String(req.params.id),
        req.body
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Enrollment updated successfully",
        enrollment
      )
    );
  }
);

const deleteEnrollment = catchAsync(
  async (req: Request, res: Response) => {
    const enrollment =
      await enrollmentService.deleteEnrollment(
        String(req.params.id)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Enrollment deleted successfully",
        enrollment
      )
    );
  }
);

export default {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
};