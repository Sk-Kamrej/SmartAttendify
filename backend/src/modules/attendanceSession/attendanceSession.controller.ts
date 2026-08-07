import { Request, Response } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

import attendanceSessionService from "./attendanceSession.service.js";

const createAttendanceSession = catchAsync(
  async (req: Request, res: Response) => {
    const attendanceSession =
      await attendanceSessionService.createAttendanceSession(
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        true,
        "Attendance session created successfully",
        attendanceSession
      )
    );
  }
);

const getAllAttendanceSessions = catchAsync(
  async (req: Request, res: Response) => {
    const attendanceSessions =
      await attendanceSessionService.getAllAttendanceSessions(
        req.query
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Attendance sessions fetched successfully",
        attendanceSessions
      )
    );
  }
);

const getAttendanceSessionById = catchAsync(
  async (req: Request, res: Response) => {
    const attendanceSession =
      await attendanceSessionService.getAttendanceSessionById(
        String(req.params.id)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Attendance session fetched successfully",
        attendanceSession
      )
    );
  }
);

const updateAttendanceSession = catchAsync(
  async (req: Request, res: Response) => {
    const attendanceSession =
      await attendanceSessionService.updateAttendanceSession(
        String(req.params.id),
        req.body
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Attendance session updated successfully",
        attendanceSession
      )
    );
  }
);

const deleteAttendanceSession = catchAsync(
  async (req: Request, res: Response) => {
    const attendanceSession =
      await attendanceSessionService.deleteAttendanceSession(
        String(req.params.id)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Attendance session deleted successfully",
        attendanceSession
      )
    );
  }
);

export default {
  createAttendanceSession,
  getAllAttendanceSessions,
  getAttendanceSessionById,
  updateAttendanceSession,
  deleteAttendanceSession,
};