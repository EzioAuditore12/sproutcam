import { z } from "zod";
import { pgEnum } from "drizzle-orm/pg-core";

export const missionType = [
  "find_object",
  "count_objects",
  "find_color",
  "find_shape",
  "find_category",
] as const;

export const missionTypeEnum = pgEnum("mission_type", missionType);

export const missionTypeSchema = z.enum(missionType);

export type MissionType = z.infer<typeof missionTypeSchema>;
