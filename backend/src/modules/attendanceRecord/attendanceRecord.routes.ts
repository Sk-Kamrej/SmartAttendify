import { Router } from "express";
import { UserRole } from "@prisma/client";

import attendanceRecordController from "./attendanceRecord.controller.js";
import {
  createAttendanceRecordSchema,
  createBulkAttendanceRecordsSchema,
  updateAttendanceRecordSchema,
} from "./attendanceRecord.validator.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

// Create Attendance Record
router.post(
  "/",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.HOD,
    UserRole.TEACHER
  ),
  validateRequest(createAttendanceRecordSchema),
  attendanceRecordController.createAttendanceRecord
);

// Create Bulk Attendance Records
router.post(
  "/bulk",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.HOD,
    UserRole.TEACHER
  ),
  validateRequest(createBulkAttendanceRecordsSchema),
  attendanceRecordController.createBulkAttendanceRecords
);

// Get All Attendance Records
router.get(
  "/",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.PRINCIPAL,
    UserRole.HOD,
    UserRole.TEACHER,
    UserRole.STUDENT
  ),
  attendanceRecordController.getAllAttendanceRecords
);

// Get Attendance Record By ID
router.get(
  "/:id",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.PRINCIPAL,
    UserRole.HOD,
    UserRole.TEACHER,
    UserRole.STUDENT
  ),
  attendanceRecordController.getAttendanceRecordById
);

// Update Attendance Record
router.patch(
  "/:id",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.HOD,
    UserRole.TEACHER
  ),
  validateRequest(updateAttendanceRecordSchema),
  attendanceRecordController.updateAttendanceRecord
);

// Delete Attendance Record
router.delete(
  "/:id",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.HOD
  ),
  attendanceRecordController.deleteAttendanceRecord
);

export default router;
