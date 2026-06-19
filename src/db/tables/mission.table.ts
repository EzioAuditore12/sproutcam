import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-arktype";

import { SnowFlakeId } from "@/lib/snowflake";

import { missionType } from "./enums/mission-type.enum";

export const MISSIONS_TABLE_NAME = "missions";

export const missionsTable = sqliteTable(MISSIONS_TABLE_NAME, {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => new SnowFlakeId(1).generate()),

  title: text("title").notNull(),

  description: text("description"),

  type: text("type", {
    enum: missionType,
  }).notNull(),

  targetObject: text("target_object").notNull(),

  requiredCount: integer("required_count").notNull().default(1),

  rewardStars: integer("reward_stars").notNull().default(1),

  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const missionSchema = createSelectSchema(missionsTable);
export const insertMissionSchema = createInsertSchema(missionsTable);
export const updateMissionSchema = createUpdateSchema(missionsTable);

export type Mission = typeof missionSchema.infer;
export type InsertMission = typeof insertMissionSchema.infer;
export type UpdateMission = typeof updateMissionSchema.infer;
