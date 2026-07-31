import { Router } from "express";

import semesterController from "./semester.controller.js";
import {
  createSemesterSchema,
  updateSemesterSchema,
} from "./semester.validator.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("SUPER_ADMIN", "COLLEGE_ADMIN"),
  validateRequest(createSemesterSchema),
  semesterController.createSemester
);

router.get(
  "/",
  authenticate,
  authorize(
    "SUPER_ADMIN",
    "COLLEGE_ADMIN",
    "PRINCIPAL",
    "HOD",
    "TEACHER"
  ),
  semesterController.getAllSemesters
);

router.get(
  "/:id",
  authenticate,
  authorize(
    "SUPER_ADMIN",
    "COLLEGE_ADMIN",
    "PRINCIPAL",
    "HOD",
    "TEACHER"
  ),
  semesterController.getSemesterById
);

router.patch(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN", "COLLEGE_ADMIN"),
  validateRequest(updateSemesterSchema),
  semesterController.updateSemester
);

router.delete(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  semesterController.deleteSemester
);

export default router;