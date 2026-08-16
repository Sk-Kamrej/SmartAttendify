import { Router } from "express";
import { UserRole } from "@prisma/client";

import attendanceController from "./attendance.controller.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

const router = Router();

// Get Student Attendance Summary
router.get(
  "/students/:studentId/summary",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.PRINCIPAL,
    UserRole.HOD,
    UserRole.TEACHER,
    UserRole.STUDENT
  ),
  attendanceController.getStudentAttendanceSummary
);

// Get Student Attendance Shortage
router.get(
  "/students/:studentId/shortage",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.PRINCIPAL,
    UserRole.HOD,
    UserRole.TEACHER,
    UserRole.STUDENT
  ),
  attendanceController.getStudentAttendanceShortage
);

export default router;