import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

export async function buildServer() {
  const server = fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>();

  // 👇 Tell Fastify to use Zod for validation + serialization
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  await server.register(swagger, {
    openapi: {
      info: {
        title: "Fastify Template API",
        description: "API documentation using Swagger",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
  });

  await server.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
  });

  // Register routes
  await server.register(import("./routes"));

  return server;
}

export type FastifyServer = Awaited<ReturnType<typeof buildServer>>;
