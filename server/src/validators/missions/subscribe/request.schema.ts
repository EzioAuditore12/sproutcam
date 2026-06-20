import { z } from "zod";
import type { ValidatedRequest } from "express-zod-safe";

export const subscribeMissionSchema = z.object({ id: z.coerce.bigint() });

export type SubscribeMissionParam = z.infer<typeof subscribeMissionSchema>;

export type SubscribeMissionRequest = ValidatedRequest<{
  params: typeof subscribeMissionSchema;
}>;
