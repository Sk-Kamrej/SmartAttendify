import { Router } from "express";
import { UserRole } from "@prisma/client";

import studentController from "./student.controller.js";
import {
  createStudentSchema,
  updateStudentSchema,
} from "./student.validator.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

// Create Student
router.post(
  "/",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  validateRequest(createStudentSchema),
  studentController.createStudent
);

// Get All Students
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
  studentController.getAllStudents
);

// Get Student By ID
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
  studentController.getStudentById
);

// Update Student
router.patch(
  "/:id",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  validateRequest(updateStudentSchema),
  studentController.updateStudent
);

// Delete Student
router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.SUPER_ADMIN),
  studentController.deleteStudent
);

export default router;