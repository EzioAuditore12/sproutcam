import { type } from "arktype";

export const missionType = ["find_object", "count_objects"] as const;

export const missionTypeSchema = type("'find_object' | 'count_objects'");

export type MissionType = typeof missionTypeSchema.infer;
