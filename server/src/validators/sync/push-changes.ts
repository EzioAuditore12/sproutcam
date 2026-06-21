import { z } from "zod";
import { insertUserMissionSchema, updateUserMissionSchema } from "@/db/schemas/user-mission.schema";
import { insertUserBadgeSchema, updateUserBadgeSchema } from "@/db/schemas/user-badge.schema";

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

const pushInsertUserMissionSchema = insertUserMissionSchema.extend({
  missionId: z.base64(),
});

const pushUpdateUserMissionSchema = updateUserMissionSchema.extend({
  missionId: z.base64().optional(),
});

export const pushChangesSchema = z.object({
  userMissions: tableChangesSchema(
    pushInsertUserMissionSchema,
    pushUpdateUserMissionSchema,
    z.string().base64(),
  ).optional(),
  userBadges: tableChangesSchema(insertUserBadgeSchema, updateUserBadgeSchema, z.string()).optional(),
});

export type PushChanges = z.infer<typeof pushChangesSchema>;

export const pushChangesRequestSchema = z.object({
  body: pushChangesSchema,
});
