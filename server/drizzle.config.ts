import { defineConfig } from "drizzle-kit";

import { env } from "./src/env";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schemas/*.schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  casing: "snake_case",
});
