import {
  bigint,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { z } from "zod";

import { badge } from "./badge.schema";

import { missionTypeEnum } from "../enums/mission-type.enum";

export const MISSIONS_TABLE_NAME = "missions";

export const mission = pgTable(
  MISSIONS_TABLE_NAME,
  {
    id: bigint("id", { mode: "bigint" })
      .primaryKey()
      .$defaultFn(() => DiscordSnowflake.generate()),

    badgeId: uuid("badge_id").references(() => badge.id),

    title: varchar("title", { length: 50 }).notNull(),

    description: varchar("description", { length: 240 }),

    type: missionTypeEnum("type").notNull(),

    targetObject: text("target_object").notNull(),

    requiredCount: integer("required_count").notNull().default(1),

    rewardStars: integer("reward_stars").notNull().default(1),

    createdAt: timestamp().defaultNow(),

    updatedAt: timestamp().$onUpdateFn(() => new Date()),
  },
  (t) => [
    index("missions_badge_id_idx").on(t.badgeId),
    index("missions_updated_at_idx").on(t.updatedAt),
  ],
);

export const missionSchema = createSelectSchema(mission);
export const insertMissionSchema = createInsertSchema(mission);
export const updateMissionSchema = createUpdateSchema(mission);

export type Mission = z.infer<typeof missionSchema>;
export type InsertMission = z.infer<typeof insertMissionSchema>;
export type UpdateMission = z.infer<typeof updateMissionSchema>;
