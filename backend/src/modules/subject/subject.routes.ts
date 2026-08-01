import { Router } from "express";

import subjectController from "./subject.controller.js";
import {
  createSubjectSchema,
  updateSubjectSchema,
} from "./subject.validator.js";

import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";
import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("SUPER_ADMIN", "COLLEGE_ADMIN"),
  validateRequest(createSubjectSchema),
  subjectController.createSubject
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
  subjectController.getAllSubjects
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
  subjectController.getSubjectById
);

router.patch(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN", "COLLEGE_ADMIN"),
  validateRequest(updateSubjectSchema),
  subjectController.updateSubject
);

router.delete(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  subjectController.deleteSubject
);

export default router;