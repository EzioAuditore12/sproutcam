import cors from "cors";
import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";

import { healthCheckRouter } from "@/routes/health-check.route";
import { openAPIRouter } from "@/lib/open-api/open-api-router";

import errorHandler from "@/middlewares/error-handler.middleware";
import rateLimiter from "@/middlewares/rate-limiter.middleware";
import requestLogger from "@/middlewares/request-logger.middleware";
import helmet from "@/middlewares/helmet.middleware";

import { env } from "@/env";

import { auth } from "./lib/auth";
import { missionRouter } from "./routes/mission.route";

const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet);

app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use("/health-check", healthCheckRouter);
app.use("/mission", missionRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
