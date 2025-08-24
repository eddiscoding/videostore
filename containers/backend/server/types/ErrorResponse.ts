import z from "zod";

export const ErrorResponseSchema = z.object({
  statusCode: z.number().min(0),
  error: z.string(),
  message: z.string(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
