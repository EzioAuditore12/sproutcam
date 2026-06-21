import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { StatusCodes } from "http-status-codes";

import { createApiResponse } from "@/lib/open-api/open-api-response-builder";
import { subscribeMissionSchema } from "@/validators/missions/subscribe/request.schema";
import { subscribeMissionResponseSchema } from "@/validators/missions/subscribe/response.schema";
import validate from "express-zod-safe";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { missionController } from "@/controller/mission.controller";

export const missionRegistry = new OpenAPIRegistry();
export const missionRouter: Router = express.Router();

export const missionPrefix = "/mission";

const TAGS = ["Mission"];

missionRegistry.registerPath({
  tags: TAGS,
  method: "post",
  path: `${missionPrefix}/{id}/subscribe`,
  summary: "Subscribe to a mission",
  description:
    "Registers the current user to participate in a specific mission by its ID.",
  request: {
    params: subscribeMissionSchema,
  },
  responses: createApiResponse(
    subscribeMissionResponseSchema,
    "Created",
    StatusCodes.CREATED,
  ),
});

missionRouter.post(
  "/:id/subscribe",
  // @ts-ignore
  validate({ params: subscribeMissionSchema }),
  authMiddleware,
  missionController.subsribe,
);
