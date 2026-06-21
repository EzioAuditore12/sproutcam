import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-arktype";
import { randomUUID } from "expo-crypto";

import { badgeIcon } from "./enums/badge-icon.enum";

export const BADGES_TABLE_NAME = "badges";

export const badgesTable = sqliteTable(
  BADGES_TABLE_NAME,
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    name: text("name").unique().notNull(),
    description: text("description"),
    icon: text("icon", { enum: badgeIcon }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (t) => [index("badges_updated_at_idx").on(t.updatedAt)]
);

export const badgeSchema = createSelectSchema(badgesTable);
export const insertBadgeSchema = createInsertSchema(badgesTable);
export const updateBadgeSchema = createUpdateSchema(badgesTable);

export type Badge = typeof badgeSchema.infer;
export type InsertBadge = typeof insertBadgeSchema.infer;
export type UpdateBadge = typeof updateBadgeSchema.infer;
