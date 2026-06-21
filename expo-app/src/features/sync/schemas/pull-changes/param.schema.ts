import { type } from "arktype";

export const pullChangesParamSchema = type({
  lastSyncedAt: "Date | undefined",
});

export type PullChangesParam = typeof pullChangesParamSchema.infer;
