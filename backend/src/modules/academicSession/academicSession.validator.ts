import { z } from "zod";

export const createAcademicSessionSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, "Title is required")
      .max(30),

    startDate: z.coerce.date(),

    endDate: z.coerce.date(),

    collegeId: z.uuid(),

    isActive: z
      .boolean()
      .optional(),
  }),
});

export const updateAcademicSessionSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3)
      .max(30)
      .optional(),

    startDate: z.coerce
      .date()
      .optional(),

    endDate: z.coerce
      .date()
      .optional(),

    isActive: z
      .boolean()
      .optional(),

    isLocked: z
      .boolean()
      .optional(),
  }),
});