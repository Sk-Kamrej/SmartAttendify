import { Router } from "express";
import { UserRole } from "@prisma/client";

import attendanceSessionController from "./attendanceSession.controller.js";
import {
  createAttendanceSessionSchema,
  updateAttendanceSessionSchema,
} from "./attendanceSession.validator.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

// Create Attendance Session
router.post(
  "/",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.HOD,
    UserRole.TEACHER
  ),
  validateRequest(createAttendanceSessionSchema),
  attendanceSessionController.createAttendanceSession
);

// Get All Attendance Sessions
router.get(
  "/",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.PRINCIPAL,
    UserRole.HOD,
    UserRole.TEACHER
  ),
  attendanceSessionController.getAllAttendanceSessions
);

// Get Attendance Session By ID
router.get(
  "/:id",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.PRINCIPAL,
    UserRole.HOD,
    UserRole.TEACHER
  ),
  attendanceSessionController.getAttendanceSessionById
);

// Update Attendance Session
router.patch(
  "/:id",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.HOD,
    UserRole.TEACHER
  ),
  validateRequest(updateAttendanceSessionSchema),
  attendanceSessionController.updateAttendanceSession
);

// Delete Attendance Session
router.delete(
  "/:id",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  attendanceSessionController.deleteAttendanceSession
);

export default router;
