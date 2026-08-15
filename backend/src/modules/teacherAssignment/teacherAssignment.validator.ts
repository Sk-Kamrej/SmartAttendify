import { z } from "zod";

export const createTeacherAssignmentSchema = z.object({
  body: z.object({
    teacherId: z.uuid(),

    subjectId: z.uuid(),

    academicSessionId: z.uuid(),

    isActive: z
      .boolean()
      .optional(),
  }),
});

export const updateTeacherAssignmentSchema = z.object({
  body: z.object({
    isActive: z
      .boolean()
      .optional(),
  }),
});
