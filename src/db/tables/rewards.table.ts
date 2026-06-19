import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-arktype";

import { missionsTable } from "./mission.table";

import { SnowFlakeId } from "@/lib/snowflake";

export const REWARDS_TABLE_NAME = "rewards";

export const rewardsTable = sqliteTable(
  REWARDS_TABLE_NAME,
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => new SnowFlakeId(1).generate()),

    missionId: text("mission_id")
      .notNull()
      .references(() => missionsTable.id),

    stars: integer("stars").notNull().default(1),

    badgeName: text("badge_name"),

    earnedAt: integer("earned_at", {
      mode: "timestamp",
    })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [index("rewards_mission_id_idx").on(t.missionId)]
);

export const rewardSchema = createSelectSchema(rewardsTable);
export const insertRewardSchema = createInsertSchema(rewardsTable);
export const updateRewardSchema = createUpdateSchema(rewardsTable);

export type Reward = typeof rewardSchema.infer;
export type InsertReward = typeof insertRewardSchema.infer;
export type UpdateReward = typeof updateRewardSchema.infer;
