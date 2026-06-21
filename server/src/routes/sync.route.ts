import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";

import { createApiResponse } from "@/lib/open-api/open-api-response-builder";
import validate from "express-zod-safe";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { syncController } from "@/controller/sync.controller";
import {
  pullChangesQuerySchema,
  pullChangesResponseSchema,
} from "@/validators/sync/pull-changes";
import { pushChangesSchema } from "@/validators/sync/push-changes";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

export const syncRegistry = new OpenAPIRegistry();
export const syncRouter: Router = express.Router();

export const syncPrefix = "/sync";

const TAGS = ["Sync"];

syncRegistry.registerPath({
  tags: TAGS,
  method: "get",
  path: `${syncPrefix}/pull`,
  summary: "Pull synchronization changes",
  description:
    "Returns all changes (created, updated, deleted) that occurred since the provided `lastSyncedAt` timestamp.",
  request: {
    query: pullChangesQuerySchema,
  },
  responses: createApiResponse(pullChangesResponseSchema, "OK", StatusCodes.OK),
});

syncRegistry.registerPath({
  tags: TAGS,
  method: "post",
  path: `${syncPrefix}/push`,
  summary: "Push synchronization changes",
  description:
    "Applies a batch of local client changes (creates, updates, deletes) to the server database.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: pushChangesSchema,
        },
      },
    },
  },
  responses: createApiResponse(z.any(), "No Content", StatusCodes.NO_CONTENT),
});

syncRouter.get(
  "/pull",
  // @ts-ignore
  validate({ query: pullChangesQuerySchema }),
  authMiddleware,
  syncController.pullChanges,
);

syncRouter.post(
  "/push",
  // @ts-ignore
  validate({ body: pushChangesSchema }),
  authMiddleware,
  syncController.pushChanges,
);
