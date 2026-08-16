import { Request, Response } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

import attendanceService from "./attendance.service.js";

const getStudentAttendanceSummary = catchAsync(
  async (req: Request, res: Response) => {
    const summary =
      await attendanceService.getStudentAttendanceSummary(
        String(req.params.studentId),
        req.query.academicSessionId
          ? String(req.query.academicSessionId)
          : undefined
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Student attendance summary fetched successfully",
        summary
      )
    );
  }
);

const getStudentAttendanceShortage = catchAsync(
  async (req: Request, res: Response) => {
    const shortage =
      await attendanceService.getStudentAttendanceShortage(
        String(req.params.studentId),
        req.query.academicSessionId
          ? String(req.query.academicSessionId)
          : undefined
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Student attendance shortage fetched successfully",
        shortage
      )
    );
  }
);

export default {
  getStudentAttendanceSummary,
  getStudentAttendanceShortage,

};