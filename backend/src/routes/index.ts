import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import collegeRoutes from "../modules/college/college.routes.js";
import departmentRoutes from "../modules/department/department.routes.js";
import programRoutes from "../modules/program/program.routes.js";
import semesterRoutes from "../modules/semester/semester.routes.js";
import subjectRoutes from "../modules/subject/subject.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/colleges", collegeRoutes);
router.use("/departments", departmentRoutes);
router.use("/programs", programRoutes);
router.use("/semesters", semesterRoutes);
router.use("/subjects", subjectRoutes);

export default router;