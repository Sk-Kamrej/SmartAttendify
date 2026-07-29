import { Router } from "express";

import departmentController from "./department.controller.js";
import validateRequest from "../../middlewares/validateRequest.js";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "./department.validator.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import authorize from "../../middlewares/authorize.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  authorize("SUPER_ADMIN", "COLLEGE_ADMIN"),
  validateRequest(createDepartmentSchema),
  departmentController.createDepartment
);

router.get(
  "/",
  authMiddleware,
  departmentController.getAllDepartments
);

router.get(
  "/:id",
  authMiddleware,
  departmentController.getDepartmentById
);

router.patch(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN", "COLLEGE_ADMIN"),
  validateRequest(updateDepartmentSchema),
  departmentController.updateDepartment
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("SUPER_ADMIN"),
  departmentController.deleteDepartment
);

export default router;