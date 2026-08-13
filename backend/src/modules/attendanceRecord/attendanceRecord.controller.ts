import { Request, Response } from "express";

import ApiResponse from "../../utils/ApiResponse.js";
import catchAsync from "../../utils/catchAsync.js";

import attendanceRecordService from "./attendanceRecord.service.js";

const createBulkAttendanceRecords = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await attendanceRecordService.createBulkAttendanceRecords(
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        true,
        "Bulk attendance marked successfully",
        result
      )
    );
  }
);

const createAttendanceRecord = catchAsync(
  async (req: Request, res: Response) => {
    const record =
      await attendanceRecordService.createAttendanceRecord(
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        true,
        "Attendance record created successfully",
        record
      )
    );
  }
);

const getAllAttendanceRecords = catchAsync(
  async (req: Request, res: Response) => {
    const records =
      await attendanceRecordService.getAllAttendanceRecords(
        req.query
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Attendance records fetched successfully",
        records
      )
    );
  }
);

const getAttendanceRecordById = catchAsync(
  async (req: Request, res: Response) => {
    const record =
      await attendanceRecordService.getAttendanceRecordById(
        String(req.params.id)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Attendance record fetched successfully",
        record
      )
    );
  }
);

const updateAttendanceRecord = catchAsync(
  async (req: Request, res: Response) => {
    const record =
      await attendanceRecordService.updateAttendanceRecord(
        String(req.params.id),
        req.body
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Attendance record updated successfully",
        record
      )
    );
  }
);

const deleteAttendanceRecord = catchAsync(
  async (req: Request, res: Response) => {
    const record =
      await attendanceRecordService.deleteAttendanceRecord(
        String(req.params.id)
      );

    res.status(200).json(
      new ApiResponse(
        true,
        "Attendance record deleted successfully",
        record
      )
    );
  }
);

export default {
  createAttendanceRecord,
  createBulkAttendanceRecords,
  getAllAttendanceRecords,
  getAttendanceRecordById,
  updateAttendanceRecord,
  deleteAttendanceRecord,
};
