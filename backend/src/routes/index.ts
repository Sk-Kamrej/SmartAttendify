import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import collegeRoutes from "../modules/college/college.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/colleges", collegeRoutes);

export default router;