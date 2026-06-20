import { type } from "arktype";

export const missionType = [
  "find_object",
  "count_objects",
  "find_color",
  "find_shape",
  "find_category",
] as const;

export const missionTypeSchema = type(
  "'find_object' | 'count_objects' | 'find_color' | 'find_shape' | 'find_category'"
);

export type MissionType = typeof missionTypeSchema.infer;
