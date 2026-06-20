import type { InsertMission } from "../tables/mission.table";
import { BADGE_IDS } from "./badges";

export const DEFAULT_MISSIONS: InsertMission[] = [
  // ===== Flowers =====
  {
    title: "Find 3 Flowers",
    badgeId: BADGE_IDS.FLOWER_FINDER,
    description: "Explore your surroundings and find three flowers.",
    type: "count_objects",
    targetObject: "flower",
    requiredCount: 3,
    rewardStars: 3,
  },

  {
    title: "Find a Flower",
    badgeId: BADGE_IDS.FLOWER_FINDER,
    description: "Can you spot a flower?",
    type: "find_object",
    targetObject: "flower",
    requiredCount: 1,
    rewardStars: 2,
  },

  // ===== Trees =====
  {
    title: "Find 2 Trees",
    badgeId: BADGE_IDS.TREE_EXPLORER,
    description: "Look around for two trees.",
    type: "count_objects",
    targetObject: "tree",
    requiredCount: 2,
    rewardStars: 4,
  },

  {
    title: "Find a Tree",
    badgeId: BADGE_IDS.TREE_EXPLORER,
    description: "Find a tall tree nearby.",
    type: "find_object",
    targetObject: "tree",
    requiredCount: 1,
    rewardStars: 2,
  },

  // ===== Leaves =====
  {
    title: "Collect 5 Leaves",
    badgeId: BADGE_IDS.LEAF_COLLECTOR,
    description: "Find five different leaves.",
    type: "count_objects",
    targetObject: "leaf",
    requiredCount: 5,
    rewardStars: 5,
  },

  // ===== Rocks =====
  {
    title: "Find a Rock",
    badgeId: BADGE_IDS.ROCK_DISCOVERER,
    description: "Find an interesting rock.",
    type: "find_object",
    targetObject: "rock",
    requiredCount: 1,
    rewardStars: 2,
  },

  // ===== Water Bottle =====
  {
    title: "Find a Water Bottle",
    badgeId: BADGE_IDS.WATER_BOTTLE_HERO,
    description: "Locate a reusable water bottle.",
    type: "find_object",
    targetObject: "bottle",
    requiredCount: 1,
    rewardStars: 2,
  },

  // ===== Books =====
  {
    title: "Find 3 Books",
    badgeId: BADGE_IDS.BOOK_DETECTIVE,
    description: "Search for three books.",
    type: "count_objects",
    targetObject: "book",
    requiredCount: 3,
    rewardStars: 4,
  },

  {
    title: "Find a Book",
    badgeId: BADGE_IDS.BOOK_DETECTIVE,
    description: "Can you find a book?",
    type: "find_object",
    targetObject: "book",
    requiredCount: 1,
    rewardStars: 2,
  },

  // ===== Toys =====
  {
    title: "Find 2 Toys",
    badgeId: BADGE_IDS.TOY_HUNTER,
    description: "Look for two toys.",
    type: "count_objects",
    targetObject: "toy",
    requiredCount: 2,
    rewardStars: 3,
  },

  {
    title: "Find a Toy",
    badgeId: BADGE_IDS.TOY_HUNTER,
    description: "Find your favorite toy.",
    type: "find_object",
    targetObject: "toy",
    requiredCount: 1,
    rewardStars: 2,
  },

  // ===== Shapes =====
  {
    title: "Find a Circle",
    badgeId: BADGE_IDS.SHAPE_SPOTTER,
    description: "Find something circular.",
    type: "find_shape",
    targetObject: "circle",
    requiredCount: 1,
    rewardStars: 2,
  },

  {
    title: "Find a Square",
    badgeId: BADGE_IDS.SHAPE_SPOTTER,
    description: "Find something square.",
    type: "find_shape",
    targetObject: "square",
    requiredCount: 1,
    rewardStars: 2,
  },

  {
    title: "Find a Triangle",
    badgeId: BADGE_IDS.SHAPE_SPOTTER,
    description: "Find a triangle.",
    type: "find_shape",
    targetObject: "triangle",
    requiredCount: 1,
    rewardStars: 3,
  },

  // ===== Colors =====
  {
    title: "Find Something Red",
    badgeId: null,
    description: "Find any red object.",
    type: "find_color",
    targetObject: "red",
    requiredCount: 1,
    rewardStars: 2,
  },

  {
    title: "Find Something Blue",
    badgeId: null,
    description: "Find any blue object.",
    type: "find_color",
    targetObject: "blue",
    requiredCount: 1,
    rewardStars: 2,
  },

  {
    title: "Find Something Green",
    badgeId: null,
    description: "Find any green object.",
    type: "find_color",
    targetObject: "green",
    requiredCount: 1,
    rewardStars: 2,
  },

  {
    title: "Find Something Yellow",
    badgeId: null,
    description: "Find any yellow object.",
    type: "find_color",
    targetObject: "yellow",
    requiredCount: 1,
    rewardStars: 2,
  },

  // ===== Categories =====
  {
    title: "Find an Animal",
    badgeId: null,
    description: "Can you spot an animal?",
    type: "find_category",
    targetObject: "animal",
    requiredCount: 1,
    rewardStars: 4,
  },

  {
    title: "Find a Fruit",
    badgeId: null,
    description: "Find a fruit.",
    type: "find_category",
    targetObject: "fruit",
    requiredCount: 1,
    rewardStars: 3,
  },

  {
    title: "Find Furniture",
    badgeId: null,
    description: "Find a piece of furniture.",
    type: "find_category",
    targetObject: "furniture",
    requiredCount: 1,
    rewardStars: 3,
  },

  {
    title: "Find a Vehicle",
    badgeId: null,
    description: "Find any vehicle.",
    type: "find_category",
    targetObject: "vehicle",
    requiredCount: 1,
    rewardStars: 4,
  },

  // ===== Beginner =====
  {
    title: "Take Your First Picture",
    badgeId: BADGE_IDS.CAMERA_ROOKIE,
    description: "Capture any object using the camera.",
    type: "find_object",
    targetObject: "any",
    requiredCount: 1,
    rewardStars: 1,
  },

  {
    title: "Complete Your First Adventure",
    badgeId: BADGE_IDS.LITTLE_EXPLORER,
    description: "Find three different objects.",
    type: "count_objects",
    targetObject: "any",
    requiredCount: 3,
    rewardStars: 5,
  },

  {
    title: "Collect Five Objects",
    badgeId: BADGE_IDS.STAR_COLLECTOR,
    description: "Find any five objects.",
    type: "count_objects",
    targetObject: "any",
    requiredCount: 5,
    rewardStars: 6,
  },

  {
    title: "Explorer Challenge",
    badgeId: BADGE_IDS.MISSION_CHAMPION,
    description: "Find ten different objects.",
    type: "count_objects",
    targetObject: "any",
    requiredCount: 10,
    rewardStars: 10,
  },
];
