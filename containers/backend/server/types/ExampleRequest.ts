import { z } from "zod";

export const ExampleRequestSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(0).max(150),
});

export type ExampleRequest = z.infer<typeof ExampleRequestSchema>;
