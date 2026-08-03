import { z } from "zod";
import { Gender } from "@prisma/client";

export const createStudentSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50),

    lastName: z
      .string()
      .trim()
      .max(50)
      .optional(),

    email: z
      .string()
      .email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    collegeId: z.uuid(),

    studentId: z
      .string()
      .trim()
      .min(1, "Student ID is required"),

    rollNumber: z
      .string()
      .trim()
      .min(1, "Roll Number is required"),

    registrationNumber: z
      .string()
      .trim()
      .min(1, "Registration Number is required"),

    gender: z.nativeEnum(Gender).optional(),

    dateOfBirth: z.coerce
      .date()
      .optional(),

    phone: z
      .string()
      .trim()
      .optional(),

    guardianName: z
      .string()
      .trim()
      .optional(),

    guardianPhone: z
      .string()
      .trim()
      .optional(),

    admissionDate: z.coerce.date(),
  }),
});

export const updateStudentSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .trim()
      .min(2)
      .optional(),

    lastName: z
      .string()
      .trim()
      .optional(),

    gender: z
      .nativeEnum(Gender)
      .optional(),

    dateOfBirth: z.coerce
      .date()
      .optional(),

    phone: z
      .string()
      .trim()
      .optional(),

    guardianName: z
      .string()
      .trim()
      .optional(),

    guardianPhone: z
      .string()
      .trim()
      .optional(),

    admissionDate: z.coerce
      .date()
      .optional(),

    isActive: z
      .boolean()
      .optional(),
  }),
});