import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import collegeRoutes from "../modules/college/college.routes.js";
import departmentRoutes from "../modules/department/department.routes.js";
import programRoutes from "../modules/program/program.routes.js";
import semesterRoutes from "../modules/semester/semester.routes.js";
import subjectRoutes from "../modules/subject/subject.routes.js";
import teacherRoutes from "../modules/teacher/teacher.routes.js";
import studentRoutes from "../modules/student/student.routes.js";
import academicSessionRoutes from "../modules/academicSession/academicSession.routes.js";
import teacherAssignmentRoutes from "../modules/teacherAssignment/teacherAssignment.routes.js";
import enrollmentRoutes from "../modules/enrollment/enrollment.routes.js";
import attendanceSessionRoutes from "../modules/attendanceSession/attendanceSession.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/colleges", collegeRoutes);
router.use("/departments", departmentRoutes);
router.use("/programs", programRoutes);
router.use("/semesters", semesterRoutes);
router.use("/subjects", subjectRoutes);
router.use("/teachers", teacherRoutes);
router.use("/students", studentRoutes);
router.use("/academic-sessions", academicSessionRoutes);
router.use("/teacher-assignments", teacherAssignmentRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/attendance-sessions", attendanceSessionRoutes);

export default router;