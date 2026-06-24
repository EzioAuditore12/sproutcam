import { authenticatedTypedFetch } from "../../../lib/auth/typed-fetch";
import { PullChangesParam } from "../schemas/pull-changes/param.schema";
import { pullChangesResponseSchema } from "../schemas/pull-changes/response.schema";

export const pullChangesApi = async (data: PullChangesParam) => {
  const { lastSyncedAt } = data;

  return await authenticatedTypedFetch({
    url: "sync/pull",
    method: "GET",
    query: { lastSyncedAt: lastSyncedAt?.toISOString() ?? undefined },
    schema: pullChangesResponseSchema,
  });
};
