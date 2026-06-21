import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Typography } from "heroui-native/text";
import { Button } from "heroui-native/button";
import { Card } from "heroui-native/card";
import { db } from "@/db";
import { userMissionsTable } from "@/db/tables/user-mission.table";
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
  const isCompleted = currentProgress >= mission.requiredCount || mission.completedAt != null;

  const handleSimulateFind = async () => {
    const newProgress = currentProgress + 1;
    const completedAt = newProgress >= mission.requiredCount ? new Date() : null;

    try {
      await db
        .insert(userMissionsTable)
        .values({
          id: mission.id,
          progress: newProgress,
          completedAt: completedAt,
        })
        .onConflictDoUpdate({
          target: userMissionsTable.id,
          set: {
            progress: newProgress,
            completedAt: completedAt,
            updatedAt: new Date(),
          },
        });

      if (completedAt) {
        router.replace("/(main)/mission/complete");
      }
    } catch (error) {
      console.error("Failed to update mission progress", error);
    }
  };

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
        {!isCompleted ? (
          <Button onPress={handleSimulateFind} size="lg" className="w-full bg-amber-500">
            Simulate Find Object
          </Button>
        ) : (
          <Button
            onPress={() => router.replace("/(main)/mission/complete")}
            size="lg"
            className="w-full bg-green-500"
          >
            Mission Completed!
          </Button>
        )}
      </View>
    </View>
  );
}
