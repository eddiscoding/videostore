import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  server: {
    // App Environment Variables
    HOST: z.string().min(1),
    LOG_LEVEL: z.string().min(1),
    PORT: z.string().min(1),

    // Database Environment Variables
    DB_DATABASE: z.string().min(1),
    DB_HOST: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_PORT: z.string().min(1),
    DB_USER: z.string().min(1),
  },

  // Source for the Environment Variables
  runtimeEnv: process.env,

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});
