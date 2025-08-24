import dotenvx from "@dotenvx/dotenvx";

// Inject .env into process.env for later use
dotenvx.config();

const bootstrap = () => {
  const { start } = require("@/api/server-start");
  start();
};

bootstrap();
