import { pgTable, timestamp, uuid, varchar, index } from "drizzle-orm/pg-core";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { badgeIconEnum } from "../enums/badge-icon.enum";

export const BADGES_TABLE_NAME = "badges";

export const badge = pgTable(
  BADGES_TABLE_NAME,
  {
    id: uuid("id").primaryKey().defaultRandom(),

    name: varchar("name", { length: 60 }).unique().notNull(),

    description: varchar("description", { length: 200 }),

    icon: badgeIconEnum("icon").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (t) => [index("badges_updated_at_idx").on(t.updatedAt)],
);

export const badgeSchema = createSelectSchema(badge);
export const updateBadgeSchema = createUpdateSchema(badge);
export const insertBadgeSchema = createInsertSchema(badge);

export type Badge = z.infer<typeof badgeSchema>;
export type UpdateBadge = z.infer<typeof updateBadgeSchema>;
export type InsertBadge = z.infer<typeof insertBadgeSchema>;
