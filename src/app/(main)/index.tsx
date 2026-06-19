import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { WelcomeCard } from "@/features/home/components/welcome-card";
import { StarsCard } from "@/features/home/components/stars-card";
import { MissionCard } from "@/features/home/components/mission-card";
import { ProgressCard } from "@/features/home/components/progress-card";
import { BadgeCard } from "@/features/home/components/badge-card";

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        flexGrow: 1,
      }}
    >
      <WelcomeCard title="🌱 Welcome Explorer" description="Ready for today's adventure?" />

      <StarsCard title="Total Stars" starsCount={15} />

      <MissionCard
        title="Today's Mission"
        missionName="🌸 Find 3 Flowers"
        description="Explore your surroundings and discover three flowers using your camera."
        reward="⭐⭐⭐"
        onAdventureClick={() => console.log("Adventure started!")}
      />

      <ProgressCard title="Today's Progress" description="1 of 3 missions completed" />
      
      <BadgeCard title="Latest Badge" badgeName="🌼 Flower Finder" />
    </ScrollView>
  );
}
