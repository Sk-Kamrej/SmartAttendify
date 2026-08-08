import { z } from "zod";
import { AttendanceStatus } from "@prisma/client";

export const createAttendanceRecordSchema = z.object({
  body: z.object({
    attendanceSessionId: z.uuid(),

    enrollmentId: z.uuid(),

    status: z.nativeEnum(AttendanceStatus),

    remarks: z
      .string()
      .trim()
      .max(500)
      .optional(),

    markedAt: z.coerce.date().optional(),
  }),
});

export const updateAttendanceRecordSchema = z.object({
  body: z.object({
    status: z.nativeEnum(AttendanceStatus),

    remarks: z
      .string()
      .trim()
      .max(500)
      .optional(),

    markedAt: z.coerce.date().optional(),
  }),
});