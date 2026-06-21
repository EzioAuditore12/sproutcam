import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-arktype";

import { missionsTable } from "./mission.table";

export const USER_MISSIONS_TABLE_NAME = "user_missions";

export const userMissionsTable = sqliteTable(
  USER_MISSIONS_TABLE_NAME,
  {
    id: text("id")
      .references(() => missionsTable.id, { onDelete: "cascade" })
      .primaryKey(),
    progress: integer("progress").default(0).notNull(),
    claimedAt: integer("claimed_at", { mode: "timestamp" }),
    completedAt: integer("completed_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (t) => [index("user_missions_updated_at_idx").on(t.updatedAt)]
);

export const userMissionSchema = createSelectSchema(userMissionsTable);
export const insertUserMissionSchema = createInsertSchema(userMissionsTable);
export const updateUserMissionSchema = createUpdateSchema(userMissionsTable);

export type UserMission = typeof userMissionSchema.infer;
export type InsertUserMission = typeof insertUserMissionSchema.infer;
export type UpdateUserMission = typeof updateUserMissionSchema.infer;
