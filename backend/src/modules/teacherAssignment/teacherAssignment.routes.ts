import { Router } from "express";
import { UserRole } from "@prisma/client";

import teacherAssignmentController from "./teacherAssignment.controller.js";
import {
  createTeacherAssignmentSchema,
  updateTeacherAssignmentSchema,
} from "./teacherAssignment.validator.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

// Create Teacher Assignment
router.post(
  "/",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  validateRequest(createTeacherAssignmentSchema),
  teacherAssignmentController.createTeacherAssignment
);

// Get All Teacher Assignments
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
  teacherAssignmentController.getAllTeacherAssignments
);

// Get Teacher Assignment By ID
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
  teacherAssignmentController.getTeacherAssignmentById
);

// Update Teacher Assignment
router.patch(
  "/:id",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  validateRequest(updateTeacherAssignmentSchema),
  teacherAssignmentController.updateTeacherAssignment
);

// Delete Teacher Assignment
router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.SUPER_ADMIN),
  teacherAssignmentController.deleteTeacherAssignment
);

export default router;