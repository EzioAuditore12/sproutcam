import { type } from "arktype";

export const badgeIcon = [
  "book-detective",
  "camera-rookie",
  "flower-finder",
  "leaf-collector",
  "little-explorer",
  "mission-champion",
  "rock-discoverer",
  "shape-spotter",
  "star-collector",
  "toy-hunter",
  "tree-explorer",
  "water-bottle-hero",
] as const;

export const badgeIconSchema = type(`
  "book-detective"
  | "camera-rookie"
  | "flower-finder"
  | "leaf-collector"
  | "little-explorer"
  | "mission-champion"
  | "rock-discoverer"
  | "shape-spotter"
  | "star-collector"
  | "toy-hunter"
  | "tree-explorer"
  | "water-bottle-hero"
`);

export type BadgeIcon = typeof badgeIconSchema.infer;
