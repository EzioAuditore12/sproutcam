import { Typography } from "heroui-native/text";
import { View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MissionList } from "@/features/mission/components/list";
import { useGetMissions } from "@/features/mission/hooks/database/use-get-missions";

export default function MissionInfoScreen() {
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();

  const { data: missions = [] } = useGetMissions();

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <View
              style={{ paddingTop: safeAreaInsets.top }}
              className="w-full p-2 items-center border-b"
            >
              <Typography.Heading type="h2">Available Missions</Typography.Heading>
              <Typography.Paragraph className="mt-1 mb-4" color="muted">
                Complete missions to earn stars and badges!
              </Typography.Paragraph>
            </View>
          ),
        }}
      />
      <View className="flex-1 w-full items-center">
        <MissionList
          missions={missions}
          onMissionPress={(mission) =>
            router.push({
              pathname: "/(main)/mission/[id]",
              params: { id: mission.id },
            })
          }
        />
      </View>
    </>
  );
}
