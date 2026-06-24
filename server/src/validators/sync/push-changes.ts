import { z } from 'zod';

import {
  insertUserBadgeSchema,
  updateUserBadgeSchema,
} from '@/db/schemas/user-badge.schema';
import {
  insertUserMissionSchema,
  updateUserMissionSchema,
} from '@/db/schemas/user-mission.schema';

export const tableChangesSchema = <
  TInsert extends z.ZodTypeAny,
  TUpdate extends z.ZodTypeAny,
  TId extends z.ZodTypeAny,
>(
  insertSchema: TInsert,
  updateSchema: TUpdate,
  idSchema: TId,
) =>
  z.object({
    created: z.array(insertSchema),
    updated: z.array(updateSchema),
    deleted: z.array(idSchema),
  });

const pushInsertUserMissionSchema = insertUserMissionSchema
  .omit({ userId: true, missionId: true })
  .extend({
    id: z.string(),
  });

const pushUpdateUserMissionSchema = updateUserMissionSchema
  .omit({ userId: true, missionId: true })
  .extend({
    id: z.string().optional(),
  });

const pushInsertUserBadgeSchema = insertUserBadgeSchema
  .omit({ userId: true, badgeId: true })
  .extend({
    id: z.string(),
  });
const pushUpdateUserBadgeSchema = updateUserBadgeSchema
  .omit({ userId: true, badgeId: true })
  .extend({
    id: z.string().optional(),
  });

export const pushChangesSchema = z.object({
  userMissions: tableChangesSchema(
    pushInsertUserMissionSchema,
    pushUpdateUserMissionSchema,
    z.string().base64(),
  ).optional(),
  userBadges: tableChangesSchema(
    pushInsertUserBadgeSchema,
    pushUpdateUserBadgeSchema,
    z.string(),
  ).optional(),
});

export type PushChanges = z.infer<typeof pushChangesSchema>;

export const pushChangesRequestSchema = z.object({
  body: pushChangesSchema,
});
