import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-arktype";

import { missionsTable } from "./mission.table";

export const MISSION_PROGRESS_TABLE_NAME = "mission_progress";

export const missionProgressTable = sqliteTable(MISSION_PROGRESS_TABLE_NAME, {
  id: text("id")
    .primaryKey()
    .references(() => missionsTable.id, { onDelete: "cascade" }),

  detectedCount: integer("detected_count").notNull().default(0),

  assignedDate: integer("assigned_date", { mode: "timestamp" }).notNull(),

  completedAt: integer("completed_at", {
    mode: "timestamp",
  }),
});

export const missionProgressSchema = createSelectSchema(missionProgressTable);
export const insertMissionProgressSchema = createInsertSchema(missionProgressTable);
export const updateMissionProgressSchema = createUpdateSchema(missionProgressTable);

export type MissionProgress = typeof missionProgressSchema.infer;
export type InsertMissionProgress = typeof insertMissionProgressSchema.infer;
export type UpdateMissionProgress = typeof updateMissionProgressSchema.infer;
