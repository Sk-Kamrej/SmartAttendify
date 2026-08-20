import { z } from "zod";
import { SubjectType } from "@prisma/client";

export const createSubjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Subject name must be at least 2 characters")
      .max(100, "Subject name must not exceed 100 characters"),

    code: z
      .string()
      .trim()
      .min(2, "Subject code must be at least 2 characters")
      .max(20, "Subject code must not exceed 20 characters")
      .transform((value) => value.toUpperCase()),

    credits: z
      .number()
      .int("Credits must be an integer")
      .min(1, "Credits must be at least 1")
      .max(20, "Credits cannot exceed 20"),

    type: z.enum(SubjectType),

    programId: z.uuid("Invalid program ID"),

    semesterId: z.uuid("Invalid semester ID"),
  }),
});

export const updateSubjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Subject name must be at least 2 characters")
      .max(100, "Subject name must not exceed 100 characters")
      .optional(),

    code: z
      .string()
      .trim()
      .min(2, "Subject code must be at least 2 characters")
      .max(20, "Subject code must not exceed 20 characters")
      .transform((value) => value.toUpperCase())
      .optional(),

    credits: z
      .number()
      .int("Credits must be an integer")
      .min(1)
      .max(20)
      .optional(),

    type: z.enum(SubjectType).optional(),

    isActive: z.boolean().optional(),
  }),
});
