import { z } from "zod";

export const createProgramSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Program name must be at least 2 characters")
      .max(100, "Program name must not exceed 100 characters"),

    code: z
      .string()
      .trim()
      .min(2, "Program code must be at least 2 characters")
      .max(20, "Program code must not exceed 20 characters")
      .transform((value) => value.toUpperCase()),

    duration: z
      .number()
      .int("Duration must be an integer")
      .min(1, "Duration must be at least 1 semester")
      .max(20, "Duration cannot exceed 20 semesters"),

    collegeId: z.uuid("Invalid college ID"),

    departmentId: z.uuid("Invalid department ID"),
  }),
});

export const updateProgramSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Program name must be at least 2 characters")
      .max(100, "Program name must not exceed 100 characters")
      .optional(),

    code: z
      .string()
      .trim()
      .min(2, "Program code must be at least 2 characters")
      .max(20, "Program code must not exceed 20 characters")
      .transform((value) => value.toUpperCase())
      .optional(),

    duration: z
      .number()
      .int("Duration must be an integer")
      .min(1, "Duration must be at least 1 semester")
      .max(20, "Duration cannot exceed 20 semesters")
      .optional(),

    isActive: z.boolean().optional(),
  }),
});