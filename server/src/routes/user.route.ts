import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";

import { createApiResponse } from "@/lib/open-api/open-api-response-builder";
import { authMiddleware } from "@/middlewares/auth.middleware";

import { StatusCodes } from "http-status-codes";
import { userSchema } from "@/db/schemas/auth.schema";
import { userController } from "@/controller/user.controller";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

export const userPrefix = "/user";

const TAGS = ["User"];

userRegistry.registerPath({
  tags: TAGS,
  method: "get",
  path: `${userPrefix}/profile`,
  summary: "Get Authenticated User Profile",
  description: "Returns authenticated user's profile.",
  responses: createApiResponse(userSchema, "OK", StatusCodes.OK),
});

userRouter.get("/profile", authMiddleware, userController.get);
