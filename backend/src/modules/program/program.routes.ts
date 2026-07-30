import { Router } from "express";

import programController from "./program.controller.js";
import {
  createProgramSchema,
  updateProgramSchema,
} from "./program.validator.js";

import validateRequest from "../../middlewares/validateRequest.js";
import authenticate from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("SUPER_ADMIN", "COLLEGE_ADMIN"),
  validateRequest(createProgramSchema),
  programController.createProgram
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
  programController.getAllPrograms
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
  programController.getProgramById
);

router.patch(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN", "COLLEGE_ADMIN"),
  validateRequest(updateProgramSchema),
  programController.updateProgram
);

router.delete(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  programController.deleteProgram
);

export default router;