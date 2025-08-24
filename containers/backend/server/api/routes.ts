import type { FastifyPluginAsync } from "fastify";
import z from "zod";
import {
  type ErrorResponse,
  ErrorResponseSchema,
} from "../types/ErrorResponse";
import {
  type ExampleRequest,
  ExampleRequestSchema,
} from "../types/ExampleRequest";
import {
  type ExampleResponse,
  ExampleResponseSchema,
} from "../types/ExampleResponse";

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/",
    {
      schema: {
        description: "Welcome endpoint",
        response: {
          200: z.ZodString,
          400: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (_request, reply) => {
      try {
        return "Welcome to Fastify Template API!";
      } catch (_error) {
        reply.status(500).send({
          statusCode: 500,
          error: "Internal Server Error",
          message: "An unexpected error occurred",
        });
      }
    },
  );

  fastify.post<{
    Body: ExampleRequest;
    Reply: ExampleResponse | ErrorResponse;
  }>(
    "/example",
    {
      schema: {
        description: "Example endpoint",
        body: ExampleRequestSchema,
        response: {
          200: ExampleResponseSchema,
          400: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { name, age } = request.body;

        // Example validation
        if (age < 0 || age > 150) {
          return reply.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: "Age must be between 0 and 150",
          });
        }

        return {
          message: "Success",
          data: {
            name,
            age,
            timestamp: Date.now(),
          },
        };
      } catch (_error) {
        reply.status(500).send({
          statusCode: 500,
          error: "Internal Server Error",
          message: "An unexpected error occurred",
        });
      }
    },
  );
};

export { routes };
