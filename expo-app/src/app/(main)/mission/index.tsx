import { db } from "@/db";
import { useLiveQuery } from "@/db/hooks/use-live-query";
import { databaseSeeder } from "@/db/seed";
import { missionsTable } from "@/db/tables/mission.table";
import { Button } from "heroui-native/button";
import { Typography } from "heroui-native/text";
import { View } from "react-native";

export default function MissionInfoScreen() {
  const { data } = useLiveQuery(db.select().from(missionsTable));

  console.log(data);

  return (
    <View className="flex-1 justify-center items-center">
      <Typography.Paragraph>Mission Info Screen</Typography.Paragraph>

      <Button onPress={() => databaseSeeder.seed()}>Click Me</Button>
    </View>
  );
}
