/*
  Warnings:

  - You are about to drop the column `name` on the `academic_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `attendanceDate` on the `attendance_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `semesters` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `students` table. All the data in the column will be lost.
  - The `gender` column on the `students` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `fullName` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[collegeId,title]` on the table `academic_sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherAssignmentId,classDate,classNumber]` on the table `attendance_sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[programId,name]` on the table `semesters` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `academic_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classDate` to the `attendance_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `semesters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('THEORY', 'PRACTICAL', 'PROJECT');

-- DropIndex
DROP INDEX "academic_sessions_collegeId_name_key";

-- DropIndex
DROP INDEX "attendance_sessions_attendanceDate_idx";

-- DropIndex
DROP INDEX "attendance_sessions_teacherAssignmentId_attendanceDate_key";

-- DropIndex
DROP INDEX "semesters_programId_number_key";

-- AlterTable
ALTER TABLE "academic_sessions" DROP COLUMN "name",
ADD COLUMN     "isLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "attendance_sessions" DROP COLUMN "attendanceDate",
ADD COLUMN     "classDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "classNumber" INTEGER;

-- AlterTable
ALTER TABLE "colleges" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "departments" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "programs" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "semesters" DROP COLUMN "number",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "guardianName" TEXT,
ADD COLUMN     "guardianPhone" TEXT,
ADD COLUMN     "phone" TEXT,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";

-- AlterTable
ALTER TABLE "subjects" ADD COLUMN     "type" "SubjectType" NOT NULL;

-- AlterTable
ALTER TABLE "teacher_assignments" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "officialEmail" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "fullName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "profileImageUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "academic_sessions_collegeId_title_key" ON "academic_sessions"("collegeId", "title");

-- CreateIndex
CREATE INDEX "attendance_sessions_classDate_idx" ON "attendance_sessions"("classDate");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_sessions_teacherAssignmentId_classDate_classNumb_key" ON "attendance_sessions"("teacherAssignmentId", "classDate", "classNumber");

-- CreateIndex
CREATE UNIQUE INDEX "semesters_programId_name_key" ON "semesters"("programId", "name");

-- CreateIndex
CREATE INDEX "students_studentId_idx" ON "students"("studentId");

-- CreateIndex
CREATE INDEX "students_registrationNumber_idx" ON "students"("registrationNumber");

-- CreateIndex
CREATE INDEX "students_rollNumber_idx" ON "students"("rollNumber");

-- CreateIndex
CREATE INDEX "subjects_code_idx" ON "subjects"("code");

-- CreateIndex
CREATE INDEX "teachers_employeeId_idx" ON "teachers"("employeeId");
