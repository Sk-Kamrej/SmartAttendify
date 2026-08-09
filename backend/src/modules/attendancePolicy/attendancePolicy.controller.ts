import { Request, Response } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

import attendancePolicyService from "./attendancePolicy.service.js";

const createAttendancePolicy = catchAsync(
  async (req: Request, res: Response) => {
    const policy =
      await attendancePolicyService.createAttendancePolicy(
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        true,
        "Attendance policy created successfully",
        policy
      )
    );
  }
);

const getAttendancePolicyById = catchAsync(
  async (req: Request, res: Response) => {
    const policy =
      await attendancePolicyService.getAttendancePolicyById(
        String(req.params.id)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Attendance policy fetched successfully",
        policy
      )
    );
  }
);

const getAttendancePolicyByCollegeId = catchAsync(
  async (req: Request, res: Response) => {
    const policy =
      await attendancePolicyService.getAttendancePolicyByCollegeId(
        String(req.params.collegeId)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Attendance policy fetched successfully",
        policy
      )
    );
  }
);

const updateAttendancePolicy = catchAsync(
  async (req: Request, res: Response) => {
    const policy =
      await attendancePolicyService.updateAttendancePolicy(
        String(req.params.id),
        req.body
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Attendance policy updated successfully",
        policy
      )
    );
  }
);

const deleteAttendancePolicy = catchAsync(
  async (req: Request, res: Response) => {
    const policy =
      await attendancePolicyService.deleteAttendancePolicy(
        String(req.params.id)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Attendance policy deleted successfully",
        policy
      )
    );
  }
);

export default {
  createAttendancePolicy,
  getAttendancePolicyById,
  getAttendancePolicyByCollegeId,
  updateAttendancePolicy,
  deleteAttendancePolicy,
};