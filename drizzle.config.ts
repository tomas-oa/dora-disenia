import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/lib/cms/schema.ts",
  out: "./drizzle",
});
