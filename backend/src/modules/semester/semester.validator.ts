import { z } from "zod";

export const createSemesterSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Semester name must be at least 2 characters")
      .max(50, "Semester name must not exceed 50 characters"),

    programId: z.uuid("Invalid program ID"),
  }),
});

export const updateSemesterSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Semester name must be at least 2 characters")
      .max(50, "Semester name must not exceed 50 characters")
      .optional(),
  }),
});