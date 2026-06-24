import { Response } from 'express';
import type { ValidatedRequest } from 'express-zod-safe';
import { StatusCodes } from 'http-status-codes';

import { syncService } from '@/services/sync.service';
import { pullChangesQuerySchema } from '@/validators/sync/pull-changes';
import { pushChangesSchema } from '@/validators/sync/push-changes';

export type PullChangesRequest = ValidatedRequest<{
  query: typeof pullChangesQuerySchema;
}>;

export type PushChangesRequest = ValidatedRequest<{
  body: typeof pushChangesSchema;
}>;

export class SyncController {
  private readonly syncService = syncService;

  public pullChanges = async (req: PullChangesRequest, res: Response) => {
    const userId = req.user?.id!;
    const { lastSyncedAt } = req.query;

    const response = await this.syncService.pullChanges(userId, lastSyncedAt);

    return res.status(StatusCodes.OK).send(response);
  };

  public pushChanges = async (req: PushChangesRequest, res: Response) => {
    const userId = req.user?.id!;
    const changes = req.body;

    await this.syncService.pushChanges(userId, changes);

    return res.status(StatusCodes.NO_CONTENT).send();
  };
}

export const syncController = new SyncController();
