import { z } from "zod";

export const createCollegeSchema = z.object({
  name: z
    .string()
    .min(3, "College name must be at least 3 characters"),

  code: z
    .string()
    .min(2, "College code is required")
    .max(10, "College code cannot exceed 10 characters")
    .transform((value) => value.toUpperCase()),

  email: z
    .email("Invalid email address")
    .optional(),

  phone: z
    .string()
    .optional(),

  website: z
    .url("Invalid website URL")
    .optional(),

  logoUrl: z
    .url("Invalid logo URL")
    .optional(),

  address: z
    .string()
    .optional(),
});

export type CreateCollegeInput = z.infer<typeof createCollegeSchema>;

export const updateCollegeSchema = z
  .object({
    name: z
      .string()
      .min(3, "College name must be at least 3 characters")
      .optional(),

    code: z
      .string()
      .min(2, "College code is required")
      .max(10, "College code cannot exceed 10 characters")
      .transform((value) => value.toUpperCase())
      .optional(),

    email: z
      .email("Invalid email address")
      .optional(),

    phone: z
      .string()
      .optional(),

    website: z
      .url("Invalid website URL")
      .optional(),

    logoUrl: z
      .url("Invalid logo URL")
      .optional(),

    address: z
      .string()
      .optional(),

    isActive: z
      .boolean()
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update.",
  });

export type UpdateCollegeInput = z.infer<typeof updateCollegeSchema>;