import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-arktype";

import { badgesTable } from "./badge.table";

export const USER_BADGES_TABLE_NAME = "user_badges";

export const userBadgesTable = sqliteTable(
  USER_BADGES_TABLE_NAME,
  {
    id: text("id")
      .references(() => badgesTable.id, { onDelete: "cascade" })
      .primaryKey(),
    earnedAt: integer("earned_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (t) => [index("user_badges_earned_at_idx").on(t.earnedAt)]
);

export const userBadgeSchema = createSelectSchema(userBadgesTable);
export const insertUserBadgeSchema = createInsertSchema(userBadgesTable);
export const updateUserBadgeSchema = createUpdateSchema(userBadgesTable);

export type UserBadge = typeof userBadgeSchema.infer;
export type InsertUserBadge = typeof insertUserBadgeSchema.infer;
export type UpdateUserBadge = typeof updateUserBadgeSchema.infer;
