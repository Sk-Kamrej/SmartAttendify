import { z } from "zod";

export const createAttendanceSessionSchema = z.object({
  body: z.object({
    teacherAssignmentId: z.uuid(),

    classDate: z.coerce.date(),

    classNumber: z
      .number()
      .int()
      .positive()
      .optional(),

    startTime: z
      .coerce
      .date()
      .optional(),

    endTime: z
      .coerce
      .date()
      .optional(),

    remarks: z
      .string()
      .trim()
      .max(500)
      .optional(),
  }),
});

export const updateAttendanceSessionSchema = z.object({
  body: z.object({
    classDate: z
      .coerce
      .date()
      .optional(),

    classNumber: z
      .number()
      .int()
      .positive()
      .optional(),

    startTime: z
      .coerce
      .date()
      .optional(),

    endTime: z
      .coerce
      .date()
      .optional(),

    remarks: z
      .string()
      .trim()
      .max(500)
      .optional(),
  }),
});
