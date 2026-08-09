import { z } from "zod";

export const createAttendancePolicySchema = z.object({
  body: z.object({
    collegeId: z.uuid(),

    minimumAttendancePercentage: z
      .number()
      .int()
      .min(0)
      .max(100)
      .optional(),

    attendanceEditWindowMinutes: z
      .number()
      .int()
      .min(0)
      .optional(),

    allowLateAttendance: z
      .boolean()
      .optional(),

    allowLeaveAttendance: z
      .boolean()
      .optional(),

    autoLockAttendance: z
      .boolean()
      .optional(),
  }),
});

export const updateAttendancePolicySchema = z.object({
  body: z.object({
    minimumAttendancePercentage: z
      .number()
      .int()
      .min(0)
      .max(100)
      .optional(),

    attendanceEditWindowMinutes: z
      .number()
      .int()
      .min(0)
      .optional(),

    allowLateAttendance: z
      .boolean()
      .optional(),

    allowLeaveAttendance: z
      .boolean()
      .optional(),

    autoLockAttendance: z
      .boolean()
      .optional(),
  }),
});