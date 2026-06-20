import type { InsertBadge } from "../src/db/schemas/badge.schema";
import { badgeService } from "../src/services/badge.service";

const DEFAULT_BADGES: InsertBadge[] = [
  {
    name: "Flower Finder",
    description: "Found beautiful flowers in nature.",
    icon: "flower-finder",
  },
  {
    name: "Tree Explorer",
    description: "Discovered amazing trees.",
    icon: "tree-explorer",
  },
  {
    name: "Leaf Collector",
    description: "Collected different kinds of leaves.",
    icon: "leaf-collector",
  },
  {
    name: "Rock Discoverer",
    description: "Found interesting rocks.",
    icon: "rock-discoverer",
  },
  {
    name: "Water Bottle Hero",
    description: "Spotted a water bottle and helped keep the world clean.",
    icon: "water-bottle-hero",
  },
  {
    name: "Book Detective",
    description: "Found hidden books.",
    icon: "book-detective",
  },
  {
    name: "Toy Hunter",
    description: "Discovered fun toys.",
    icon: "toy-hunter",
  },
  {
    name: "Shape Spotter",
    description: "Recognized different shapes.",
    icon: "shape-spotter",
  },
  {
    name: "Camera Rookie",
    description: "Completed your first camera mission.",
    icon: "camera-rookie",
  },
  {
    name: "Little Explorer",
    description: "Started your exploration journey.",
    icon: "little-explorer",
  },
  {
    name: "Star Collector",
    description: "Collected lots of stars.",
    icon: "star-collector",
  },
  {
    name: "Mission Champion",
    description: "Completed many exciting missions.",
    icon: "mission-champion",
  },
];

async function seed() {
  try {
    console.log("Seeding badges...");
    await badgeService.createMany(DEFAULT_BADGES);
    console.log("✅ Badges seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding badges:", error);
    process.exit(1);
  }
}

seed();
