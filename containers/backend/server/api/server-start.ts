import { env } from "@/api/env";
import { buildServer } from "./server";

export const start = async () => {
  const server = await buildServer();

  try {
    await server.listen({ port: env.PORT, host: env.HOST }); // listen on all interfaces, this will make your server accessible from other devices
    console.log(`Server is running on http://${env.HOST}:${env.PORT}`);
    console.log(
      `API documentation available at http://http://${env.HOST}:${env.PORT}/docs`,
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
