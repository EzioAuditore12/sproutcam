import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";

import { healthCheckRegistry } from "@/routes/health-check.route";
import { missionRegistry } from "@/routes/mission.route";
import { syncRegistry } from "@/routes/sync.route";
import { userRegistry } from "@/routes/user.route";

export type OpenAPIDocument = ReturnType<
  OpenApiGeneratorV3["generateDocument"]
>;

export function generateOpenAPIDocument(): OpenAPIDocument {
  const registry = new OpenAPIRegistry([
    healthCheckRegistry,
    missionRegistry,
    syncRegistry,
    userRegistry,
  ]);

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Scalar API",
    },
  });
}
