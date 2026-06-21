import { db } from "@/db";
import { useLiveQuery } from "@/db/hooks/use-live-query";
import { missionsTable } from "@/db/tables/mission.table";
import { Typography } from "heroui-native/text";
import { View } from "react-native";

export default function MissionInfoScreen() {
  const { data } = useLiveQuery(db.select().from(missionsTable));

  console.log(data);

  return (
    <View className="flex-1 justify-center items-center">
      <Typography.Paragraph>Mission Info Screen</Typography.Paragraph>
    </View>
  );
}
