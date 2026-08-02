import { Router } from "express";
import { UserRole } from "@prisma/client";

import teacherController from "./teacher.controller.js";
import {
  createTeacherSchema,
  updateTeacherSchema,
} from "./teacher.validator.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

// Create Teacher
router.post(
  "/",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  validateRequest(createTeacherSchema),
  teacherController.createTeacher
);

// Get All Teachers
router.get(
  "/",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN,
    UserRole.PRINCIPAL,
    UserRole.HOD
  ),
  teacherController.getAllTeachers
);

// Get Teacher By ID
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
  teacherController.getTeacherById
);

// Update Teacher
router.patch(
  "/:id",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  validateRequest(updateTeacherSchema),
  teacherController.updateTeacher
);

// Delete Teacher
router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.SUPER_ADMIN),
  teacherController.deleteTeacher
);

export default router;