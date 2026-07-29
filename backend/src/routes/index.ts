import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import collegeRoutes from "../modules/college/college.routes.js";
import departmentRoutes from "../modules/department/department.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/colleges", collegeRoutes);
router.use("/departments", departmentRoutes);

export default router;