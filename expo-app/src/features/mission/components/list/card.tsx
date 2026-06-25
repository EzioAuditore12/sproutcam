import { cn } from "cnfast";
import { Card } from "heroui-native/card";
import { Typography } from "heroui-native/text";
import { Activity } from "react";
import { Pressable, View, type PressableProps } from "react-native";

import type { Mission } from "@/db/tables/mission.table";

interface MissionListItemProps extends PressableProps {
  item: Mission;
}

export const MissionListItem = ({ className, item, onPress, ...props }: MissionListItemProps) => {
  return (
    <Pressable onPress={onPress} className={cn("active:opacity-70", className)} {...props}>
      <Card className="border border-gray-200">
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Activity mode={item.description ? "visible" : "hidden"}>
            <Card.Description className="mt-1 text-muted">{item.description}</Card.Description>
          </Activity>

          <View className="flex-row justify-between items-center mt-3">
            <Typography.Paragraph type="body-sm" color="muted">
              Find: {item.requiredCount} {item.targetObject}
            </Typography.Paragraph>
            <Typography.Paragraph type="body-sm" weight="bold" className="text-amber-500">
              Reward: {item.rewardStars} ⭐
            </Typography.Paragraph>
          </View>
        </Card.Body>
      </Card>
    </Pressable>
  );
};
