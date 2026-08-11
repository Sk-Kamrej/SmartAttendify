import { Router } from "express";
import { UserRole } from "@prisma/client";

import attendancePolicyController from "./attendancePolicy.controller.js";
import {
  createAttendancePolicySchema,
  updateAttendancePolicySchema,
} from "./attendancePolicy.validator.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

// Create Attendance Policy
router.post(
  "/",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  validateRequest(createAttendancePolicySchema),
  attendancePolicyController.createAttendancePolicy
);

// Get Attendance Policy By ID
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
  attendancePolicyController.getAttendancePolicyById
);

// Get Attendance Policy By College ID
router.get(
  "/college/:collegeId",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.PRINCIPAL,
    UserRole.HOD,
    UserRole.TEACHER
  ),
  attendancePolicyController.getAttendancePolicyByCollegeId
);

// Update Attendance Policy
router.patch(
  "/:id",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  validateRequest(updateAttendancePolicySchema),
  attendancePolicyController.updateAttendancePolicy
);

// Delete Attendance Policy
router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.SUPER_ADMIN),
  attendancePolicyController.deleteAttendancePolicy
);

export default router;
