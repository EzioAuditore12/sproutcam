import { View } from "react-native";
import { Typography } from "heroui-native/text";
import { FlashList } from "@shopify/flash-list";

import type { Mission } from "@/db/tables/mission.table";
import { MissionListItem } from "./card";

interface MissionListProps {
  missions: Mission[];
  onMissionPress?: (mission: Mission) => void;
}

export const MissionList = ({ missions, onMissionPress }: MissionListProps) => {
  if (!missions || missions.length === 0) {
    return (
      <View className="p-4 items-center justify-center">
        <Typography.Paragraph color="muted">
          No missions available yet! Sync to discover new missions.
        </Typography.Paragraph>
      </View>
    );
  }

  return (
    <View className="flex-1 w-full">
      <FlashList
        data={missions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MissionListItem className="mb-4" item={item} onPress={() => onMissionPress?.(item)} />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};
