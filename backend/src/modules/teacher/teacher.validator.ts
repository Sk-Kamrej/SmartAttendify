import { z } from "zod";

export const createTeacherSchema = z.object({
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

    employeeId: z
      .string()
      .trim()
      .min(2, "Employee ID is required")
      .max(30),

    designation: z
      .string()
      .trim()
      .optional(),

    qualification: z
      .string()
      .trim()
      .optional(),

    phone: z
      .string()
      .trim()
      .optional(),

    officialEmail: z
      .string()
      .email("Invalid official email")
      .optional(),

    joiningDate: z.coerce.date(),

    collegeId: z.uuid(),

    departmentId: z.uuid(),
  }),
});

export const updateTeacherSchema = z.object({
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

    designation: z
      .string()
      .trim()
      .optional(),

    qualification: z
      .string()
      .trim()
      .optional(),

    phone: z
      .string()
      .trim()
      .optional(),

    officialEmail: z
      .string()
      .email()
      .optional(),

    joiningDate: z.coerce
      .date()
      .optional(),

    isActive: z
      .boolean()
      .optional(),
  }),
});