export const missionStatus = ["locked", "active", "completed"] as const;

export type MissionStatus = (typeof missionStatus)[number];
