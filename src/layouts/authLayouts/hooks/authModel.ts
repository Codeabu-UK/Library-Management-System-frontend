import { z } from "zod";

export enum UserType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const createUserSchema = z.object({
  username: z
    .string({
      message: "Username must be a string",
    })
    .min(1, { message: "Username must be at least 1 characters long" }),
  email: z
    .string({
      message: "Email must be a string",
    })
    .min(1, { message: "Email cannot be empty" }),
  type: z.nativeEnum(UserType, {
    message: `Type must be one of ${Object.values(UserType).join(", ")}`,
  }),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      "Password must contain at least 8 character long, one uppercase letter, one lowercase letter, and one number",
  }),
});

export type CreateUserModel = z.infer<typeof createUserSchema>;

export const userSchema = createUserSchema.extend({
  id: z.string(),
  email_verified: z.boolean().default(false),
  remember_me: z.boolean().default(false),
  is_active: z.boolean().default(true),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type UserModel = z.infer<typeof userSchema>;

export const userLoginSchema = createUserSchema.pick({
  email: true,
  password: true,
});

export type UserLoginModel = z.infer<typeof userLoginSchema>;

export const updateUserSchema = createUserSchema.partial();

export type UpdateUserModel = z.infer<typeof updateUserSchema>;

export type AuthResponseModel = {
  user: UserModel;
  token: string;
};
