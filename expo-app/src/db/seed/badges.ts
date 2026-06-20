import { randomUUID } from "expo-crypto";
import type { InsertBadge } from "../tables/badge.table";

export const BADGE_IDS = {
  FLOWER_FINDER: randomUUID(),
  TREE_EXPLORER: randomUUID(),
  LEAF_COLLECTOR: randomUUID(),
  ROCK_DISCOVERER: randomUUID(),
  WATER_BOTTLE_HERO: randomUUID(),
  BOOK_DETECTIVE: randomUUID(),
  TOY_HUNTER: randomUUID(),
  SHAPE_SPOTTER: randomUUID(),
  CAMERA_ROOKIE: randomUUID(),
  LITTLE_EXPLORER: randomUUID(),
  STAR_COLLECTOR: randomUUID(),
  MISSION_CHAMPION: randomUUID(),
} as const;

export const DEFAULT_BADGES: InsertBadge[] = [
  {
    id: BADGE_IDS.FLOWER_FINDER,
    name: "Flower Finder",
    description: "Found beautiful flowers in nature.",
    icon: "flower-finder",
  },
  {
    id: BADGE_IDS.TREE_EXPLORER,
    name: "Tree Explorer",
    description: "Discovered amazing trees.",
    icon: "tree-explorer",
  },
  {
    id: BADGE_IDS.LEAF_COLLECTOR,
    name: "Leaf Collector",
    description: "Collected different kinds of leaves.",
    icon: "leaf-collector",
  },
  {
    id: BADGE_IDS.ROCK_DISCOVERER,
    name: "Rock Discoverer",
    description: "Found interesting rocks.",
    icon: "rock-discoverer",
  },
  {
    id: BADGE_IDS.WATER_BOTTLE_HERO,
    name: "Water Bottle Hero",
    description: "Spotted a water bottle and helped keep the world clean.",
    icon: "water-bottle-hero",
  },
  {
    id: BADGE_IDS.BOOK_DETECTIVE,
    name: "Book Detective",
    description: "Found hidden books.",
    icon: "book-detective",
  },
  {
    id: BADGE_IDS.TOY_HUNTER,
    name: "Toy Hunter",
    description: "Discovered fun toys.",
    icon: "toy-hunter",
  },
  {
    id: BADGE_IDS.SHAPE_SPOTTER,
    name: "Shape Spotter",
    description: "Recognized different shapes.",
    icon: "shape-spotter",
  },
  {
    id: BADGE_IDS.CAMERA_ROOKIE,
    name: "Camera Rookie",
    description: "Completed your first camera mission.",
    icon: "camera-rookie",
  },
  {
    id: BADGE_IDS.LITTLE_EXPLORER,
    name: "Little Explorer",
    description: "Started your exploration journey.",
    icon: "little-explorer",
  },
  {
    id: BADGE_IDS.STAR_COLLECTOR,
    name: "Star Collector",
    description: "Collected lots of stars.",
    icon: "star-collector",
  },
  {
    id: BADGE_IDS.MISSION_CHAMPION,
    name: "Mission Champion",
    description: "Completed many exciting missions.",
    icon: "mission-champion",
  },
];
