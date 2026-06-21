import {
  pgTable,
  text,
  timestamp,
  uuid,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { user } from "./auth.schema";
import { badge } from "./badge.schema";

export const USER_BADGES_TABLE_NAME = "user_badges";

export const userBadge = pgTable(
  USER_BADGES_TABLE_NAME,
  {
    userId: text("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),

    badgeId: uuid("badge_id")
      .references(() => badge.id, { onDelete: "cascade" })
      .notNull(),

    earnedAt: timestamp("earned_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("user_badges_user_badge_unique").on(t.userId, t.badgeId),
    index("user_badges_user_earned_at_idx").on(t.userId, t.earnedAt),
  ],
);

export const userBadgeSchema = createSelectSchema(userBadge);
export const insertUserBadgeSchema = createInsertSchema(userBadge);
export const updateUserBadgeSchema = createUpdateSchema(userBadge);

export type UserBadge = z.infer<typeof userBadgeSchema>;
export type InsertUserBadge = z.infer<typeof insertUserBadgeSchema>;
export type UpdateUserBadge = z.infer<typeof updateUserBadgeSchema>;
