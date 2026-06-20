import { badgeService } from "../src/services/badge.service";
import type { InsertMission } from "../src/db/schemas/mission.schema";
import { missionService } from "../src/services/mission.service";

async function seed() {
  try {
    console.log("Fetching badges to link to missions...");
    const allBadges = await badgeService.getAll();

    // Create a dictionary for quick badge lookups by name
    const badgeMap = allBadges.reduce((acc, b) => {
      acc[b.name] = b.id;
      return acc;
    }, {} as Record<string, string>);

    const MISSIONS: InsertMission[] = [
      {
        title: "📸 Take your first nature photo",
        description: "Step outside and take your very first photo of something in nature!",
        type: "find_object",
        targetObject: "nature",
        rewardStars: 10,
        badgeId: badgeMap["Camera Rookie"],
      },
      {
        title: "🌼 Photograph a flower",
        description: "Find a beautiful flower and capture it. What color is it?",
        type: "find_object",
        targetObject: "flower",
        rewardStars: 5,
        badgeId: badgeMap["Flower Finder"],
      },
      {
        title: "🌳 Capture a tall tree",
        description: "Look up high! Find a tall tree and take a picture of its leaves.",
        type: "find_object",
        targetObject: "tree",
        rewardStars: 5,
        badgeId: badgeMap["Tree Explorer"],
      },
      {
        title: "☁️ Take a picture of clouds",
        description: "Look at the sky. Can you find a cloud that looks like an animal?",
        type: "find_object",
        targetObject: "cloud",
        rewardStars: 5,
        badgeId: badgeMap["Little Explorer"],
      },
      {
        title: "🌈 Find something colorful",
        description: "Find an object in nature that has very bright colors.",
        type: "find_color",
        targetObject: "colorful",
        rewardStars: 10,
        badgeId: badgeMap["Star Collector"],
      },
      {
        title: "🐦 Photograph a bird (from a distance)",
        description: "Be very quiet and try to capture a bird. Don't scare it away!",
        type: "find_object",
        targetObject: "bird",
        rewardStars: 15,
        badgeId: badgeMap["Little Explorer"],
      },
      {
        title: "🌊 Capture water",
        description: "Find a river, lake, or even a tiny puddle and take a photo of it.",
        type: "find_object",
        targetObject: "water",
        rewardStars: 10,
        badgeId: badgeMap["Water Bottle Hero"],
      },
      {
        title: "🌙 Take an evening sky photo",
        description: "Wait until the sun starts to set and capture the evening sky.",
        type: "find_object",
        targetObject: "evening sky",
        rewardStars: 15,
        badgeId: badgeMap["Little Explorer"],
      },
    ];

    console.log("Seeding missions...");
    await missionService.createMany(MISSIONS);
    console.log(`✅ ${MISSIONS.length} Missions seeded successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding missions:", error);
    process.exit(1);
  }
}

seed();
