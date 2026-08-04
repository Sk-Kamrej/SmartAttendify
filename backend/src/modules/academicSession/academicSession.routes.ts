import { Router } from "express";
import { UserRole } from "@prisma/client";

import academicSessionController from "./academicSession.controller.js";
import {
  createAcademicSessionSchema,
  updateAcademicSessionSchema,
} from "./academicSession.validator.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

// Create Academic Session
router.post(
  "/",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  validateRequest(createAcademicSessionSchema),
  academicSessionController.createAcademicSession
);

// Get All Academic Sessions
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
  academicSessionController.getAllAcademicSessions
);

// Get Academic Session By ID
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
  academicSessionController.getAcademicSessionById
);

// Update Academic Session
router.patch(
  "/:id",
  authenticate,
  authorize(
    UserRole.SUPER_ADMIN,
    UserRole.COLLEGE_ADMIN
  ),
  validateRequest(updateAcademicSessionSchema),
  academicSessionController.updateAcademicSession
);

// Delete Academic Session
router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.SUPER_ADMIN),
  academicSessionController.deleteAcademicSession
);

export default router;