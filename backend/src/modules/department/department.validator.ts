import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Department name must be at least 2 characters")
    .max(100, "Department name must not exceed 100 characters"),

  code: z
    .string()
    .trim()
    .min(2, "Department code must be at least 2 characters")
    .max(20, "Department code must not exceed 20 characters")
    .transform((value) => value.toUpperCase()),

  collegeId: z.string().uuid("Invalid college ID"),
});

export const updateDepartmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  code: z
    .string()
    .trim()
    .min(2)
    .max(20)
    .transform((value) => value.toUpperCase())
    .optional(),

  collegeId: z
    .string()
    .uuid()
    .optional(),

  isActive: z
    .boolean()
    .optional(),
});