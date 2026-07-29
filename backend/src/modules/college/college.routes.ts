import { Router } from "express";
import { UserRole } from "@prisma/client";

import collegeController from "./college.controller.js";
import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

const router = Router();

// Create College
router.post(
  "/",
  authenticate,
  authorize(UserRole.SUPER_ADMIN),
  collegeController.createCollege
);

// Get All Colleges
router.get(
  "/",
  authenticate,
  authorize(UserRole.SUPER_ADMIN),
  collegeController.getAllColleges
);

// Get College By ID
router.get(
  "/:id",
  authenticate,
  authorize(UserRole.SUPER_ADMIN),
  collegeController.getCollegeById
);

// Update College
router.patch(
  "/:id",
  authenticate,
  authorize(UserRole.SUPER_ADMIN),
  collegeController.updateCollege
);

// Soft Delete College
router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.SUPER_ADMIN),
  collegeController.deleteCollege
);

export default router;