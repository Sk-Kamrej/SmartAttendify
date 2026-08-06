import { z } from "zod";
import { EnrollmentStatus } from "@prisma/client";

export const createEnrollmentSchema = z.object({
  body: z.object({
    studentId: z.uuid(),

    academicSessionId: z.uuid(),

    programId: z.uuid(),

    semesterId: z.uuid(),

    status: z
      .nativeEnum(EnrollmentStatus)
      .optional(),
  }),
});

export const updateEnrollmentSchema = z.object({
  body: z.object({
    status: z
      .nativeEnum(EnrollmentStatus)
      .optional(),
  }),
});