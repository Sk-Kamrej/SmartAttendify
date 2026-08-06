import { Router } from "express";
import { UserRole } from "@prisma/client";

import enrollmentController from "./enrollment.controller.js";
import {
  createEnrollmentSchema,
  updateEnrollmentSchema,
} from "./enrollment.validator.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

// Create Enrollment
router.post(
  "/",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  validateRequest(createEnrollmentSchema),
  enrollmentController.createEnrollment
);

// Get All Enrollments
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
  enrollmentController.getAllEnrollments
);

// Get Enrollment By ID
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
  enrollmentController.getEnrollmentById
);

// Update Enrollment
router.patch(
  "/:id",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  validateRequest(updateEnrollmentSchema),
  enrollmentController.updateEnrollment
);

// Delete Enrollment
router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.SUPER_ADMIN),
  enrollmentController.deleteEnrollment
);

export default router;