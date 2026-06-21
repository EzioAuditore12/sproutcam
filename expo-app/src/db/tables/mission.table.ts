import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-arktype";

import { snowflakeIdGenerator } from "@/lib/snowflake";
import { missionType } from "./enums/mission-type.enum";
import { badgesTable } from "./badge.table";

export const MISSIONS_TABLE_NAME = "missions";

export const missionsTable = sqliteTable(
  MISSIONS_TABLE_NAME,
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => snowflakeIdGenerator.generate()),
    badgeId: text("badge_id").references(() => badgesTable.id),
    title: text("title").notNull(),
    description: text("description"),
    type: text("type", { enum: missionType }).notNull(),
    targetObject: text("target_object").notNull(),
    requiredCount: integer("required_count").notNull().default(1),
    rewardStars: integer("reward_stars").notNull().default(1),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (t) => [
    index("missions_badge_id_idx").on(t.badgeId),
    index("missions_updated_at_idx").on(t.updatedAt),
  ]
);

export const missionSchema = createSelectSchema(missionsTable);
export const insertMissionSchema = createInsertSchema(missionsTable);
export const updateMissionSchema = createUpdateSchema(missionsTable);

export type Mission = typeof missionSchema.infer;
export type InsertMission = typeof insertMissionSchema.infer;
export type UpdateMission = typeof updateMissionSchema.infer;
