import { z } from "zod";
import { missionSchema } from "@/db/schemas/mission.schema";
import { badgeSchema } from "@/db/schemas/badge.schema";
import { userMissionSchema } from "@/db/schemas/user-mission.schema";
import { userBadgeSchema } from "@/db/schemas/user-badge.schema";

const tableChangesSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    created: z.array(schema),
    updated: z.array(schema),
    deleted: z.array(z.any()),
  });

const pullMissionSchema = missionSchema.extend({
  id: z.string(),
});

const pullUserMissionSchema = userMissionSchema
  .omit({ userId: true, missionId: true })
  .extend({
    id: z.string(),
  });

const pullUserBadgeSchema = userBadgeSchema
  .omit({ userId: true, badgeId: true })
  .extend({
    id: z.string(),
  });

export const pullChangesResponseSchema = z.object({
  changes: z.object({
    missions: tableChangesSchema(pullMissionSchema).optional(),
    badges: tableChangesSchema(badgeSchema).optional(),
    userMissions: tableChangesSchema(pullUserMissionSchema).optional(),
    userBadges: tableChangesSchema(pullUserBadgeSchema).optional(),
  }),
  timestamp: z.date(),
});

export type PullChangesResponse = z.infer<typeof pullChangesResponseSchema>;

export const pullChangesQuerySchema = z.object({
  lastSyncedAt: z.coerce.date().optional(),
});

export type PullChangesQuery = z.infer<typeof pullChangesQuerySchema>;
