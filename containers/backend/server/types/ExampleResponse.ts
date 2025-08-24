import z from "zod";

export const ExampleResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    name: z.string(),
    age: z.number(),
    timestamp: z.number(),
  }),
});

export type ExampleResponse = z.infer<typeof ExampleResponseSchema>;
