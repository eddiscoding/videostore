import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Must introduce valid email").trim(),
  password: z
    .string("Password is a required parameter")
    .trim()
    .min(1, "Password is a required parameter"),
});
