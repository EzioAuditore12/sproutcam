import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useSession } from "../../lib/auth";

import { WelcomeCard } from "@/features/home/components/welcome-card";
import { StarsCard } from "@/features/home/components/stars-card";
import { MissionCard } from "@/features/home/components/mission-card";
import { ProgressCard } from "@/features/home/components/progress-card";
import { BadgeCard } from "@/features/home/components/badge-card";

import { useTodayMission } from "@/features/home/hooks/database/use-home-missions";
import { useHomeProgress, useTotalStars } from "@/features/home/hooks/database/use-home-progress";
import { useLatestBadge } from "@/features/home/hooks/database/use-latest-badge";

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();
  const { data } = useSession();

  const { mission, isLoading: isMissionLoading } = useTodayMission();
  const { progressText } = useHomeProgress();
  const { totalStars } = useTotalStars();
  const { latestBadge } = useLatestBadge();

  const userImage = data?.user?.image;
  const userName = data?.user?.name || data?.user?.email;

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        flexGrow: 1,
      }}
      contentContainerClassName="px-2"
    >
      <WelcomeCard
        title={`🌱 Welcome ${data?.user?.name || "Explorer"}`}
        description="Ready for today's adventure?"
        userName={userName}
        avatarUri={userImage}
        onAvatarPress={() => router.push("/(main)/setting")}
      />

      <StarsCard title="Total Stars" starsCount={totalStars} />

      <MissionCard
        title="Today's Mission"
        missionName={
          isMissionLoading ? "Loading..." : mission ? mission.title : "No missions available"
        }
        description={
          isMissionLoading
            ? "..."
            : mission
              ? mission.description || "Complete this mission to earn stars!"
              : "You have completed all missions!"
        }
        reward={mission ? "⭐".repeat(mission.rewardStars) : "-"}
        onAdventureClick={() => router.push("/(main)/mission")}
      />

      <ProgressCard title="Today's Progress" description={progressText} />

      <BadgeCard
        title="Latest Badge"
        badgeName={latestBadge ? latestBadge.name : "No badges yet"}
      />
    </ScrollView>
  );
}
