import { z } from "zod";

export const passwordRecoverySchema = z.object({
  email: z.email(),
});

export type PasswordRecoveryForm = z.infer<typeof passwordRecoverySchema>;
