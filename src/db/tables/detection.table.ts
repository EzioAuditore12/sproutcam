import { index, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-arktype";

import { missionsTable } from "./mission.table";

import { SnowFlakeId } from "@/lib/snowflake";

export const DETECTIONS_TABLE_NAME = "detections";

export const detectionsTable = sqliteTable(
  DETECTIONS_TABLE_NAME,
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => new SnowFlakeId(1).generate()),

    missionId: text("mission_id")
      .notNull()
      .references(() => missionsTable.id),

    objectName: text("object_name").notNull(),

    confidence: real("confidence"),

    imageUri: text("image_uri"),

    detectedAt: integer("detected_at", {
      mode: "timestamp",
    })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [index("detections_mission_id_idx").on(t.missionId)]
);

export const detectionSchema = createSelectSchema(detectionsTable);
export const insertDetectionSchema = createInsertSchema(detectionsTable);
export const updateDetectionSchema = createUpdateSchema(detectionsTable);

export type Detection = typeof detectionSchema.infer;
export type InsertDetection = typeof insertDetectionSchema.infer;
export type UpdateDetection = typeof updateDetectionSchema.infer;
