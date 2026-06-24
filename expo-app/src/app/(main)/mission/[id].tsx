import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "heroui-native/button";
import { Card } from "heroui-native/card";
import { Typography } from "heroui-native/text";
import { View } from "react-native";

import { useMissionById } from "@/features/mission/hooks/database/use-mission-by-id";

export default function MissionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { mission, isLoading } = useMissionById(id);

  if (isLoading || !mission) {
    return (
      <View className="flex-1 items-center justify-center">
        <Typography.Paragraph color="muted">Loading Mission...</Typography.Paragraph>
      </View>
    );
  }

  const currentProgress = mission.progress || 0;

  return (
    <View className="flex-1 p-4 items-center">
      <Typography.Heading type="h2" className="mt-8 text-center">
        {mission.title}
      </Typography.Heading>
      <Typography.Paragraph color="muted" className="mt-2 text-center">
        {mission.description}
      </Typography.Paragraph>

      <Card className="mt-8 w-full border border-gray-200">
        <Card.Body className="items-center py-6">
          <Typography.Heading type="h4">Target Object</Typography.Heading>
          <Typography.Heading type="h2" className="text-green-600 mt-2 uppercase">
            {mission.targetObject}
          </Typography.Heading>

          <Typography.Paragraph color="muted" className="mt-6 font-medium">
            Progress: {currentProgress} / {mission.requiredCount} found
          </Typography.Paragraph>
        </Card.Body>
      </Card>

      <View className="flex-1 justify-end w-full pb-8">
        <Button
          onPress={() => router.replace("/(main)/mission/camera-screen")}
          size="lg"
          className="w-full bg-green-500"
        >
          Go To Mission
        </Button>
      </View>
    </View>
  );
}
