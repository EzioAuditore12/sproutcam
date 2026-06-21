import { View, FlatList } from "react-native";
import { Typography } from "heroui-native/text";

import { useGetMissions } from "../hooks/database/use-get-missions";
import type { Mission } from "@/db/tables/mission.table";

interface MissionListProps {
  onMissionPress?: (mission: Mission) => void;
}

export const MissionList = ({ onMissionPress }: MissionListProps) => {
  const { data: missions } = useGetMissions();

  if (!missions || missions.length === 0) {
    return (
      <View className="p-4 items-center justify-center">
        <Typography.Paragraph className="text-gray-500">
          No missions available yet! Sync to discover new missions.
        </Typography.Paragraph>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Mission }) => (
    <View className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
      <Typography.Heading type="h4">{item.title}</Typography.Heading>
      {item.description && (
        <Typography.Paragraph className="text-gray-600 mt-1">
          {item.description}
        </Typography.Paragraph>
      )}
      <View className="flex-row justify-between items-center mt-3">
        <Typography.Paragraph className="text-sm text-gray-500">
          Find: {item.requiredCount} {item.targetObject}
        </Typography.Paragraph>
        <Typography.Paragraph className="text-sm font-bold text-amber-500">
          Reward: {item.rewardStars} ⭐
        </Typography.Paragraph>
      </View>
    </View>
  );

  return (
    <FlatList
      data={missions}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerClassName="p-4 w-full"
      className="flex-1 w-full"
    />
  );
};
