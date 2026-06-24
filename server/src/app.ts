import { toNodeHandler } from 'better-auth/node';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';

import { openAPIRouter } from '@/lib/open-api/open-api-router';
import errorHandler from '@/middlewares/error-handler.middleware';
import helmet from '@/middlewares/helmet.middleware';
import rateLimiter from '@/middlewares/rate-limiter.middleware';
import requestLogger from '@/middlewares/request-logger.middleware';
import { healthCheckRouter } from '@/routes/health-check.route';
import { auth } from './lib/auth';
import { missionPrefix, missionRouter } from './routes/mission.route';
import { syncPrefix, syncRouter } from './routes/sync.route';
import { userPrefix, userRouter } from './routes/user.route';

const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

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
app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use('/health-check', healthCheckRouter);
app.use(missionPrefix, missionRouter);
app.use(syncPrefix, syncRouter);
app.use(userPrefix, userRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
