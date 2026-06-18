import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-arktype";

import { SnowFlakeId } from "@/lib/snowflake";

export const MISSIONS_TABLE_NAME = "missions";

export const missionsTable = sqliteTable(MISSIONS_TABLE_NAME, {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => new SnowFlakeId(1).generate()),

  title: text("title").notNull(),

  description: text("description"),

  targetObject: text("target_object").notNull(),

  requiredCount: integer("required_count").default(1),

  rewardStars: integer("reward_stars").default(1),

  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const missionSchema = createSelectSchema(missionsTable);

export type Mission = typeof missionSchema.infer;
