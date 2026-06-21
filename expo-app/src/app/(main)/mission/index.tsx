import { syncDatabase } from "@/db/sync";
import { MissionList } from "@/features/mission/components/mission-list";
import { useSettingStore } from "@/store/settings";
import { Button } from "heroui-native/button";
import { Typography } from "heroui-native/text";
import { View } from "react-native";

export default function MissionInfoScreen() {
  const { lastSyncedAt } = useSettingStore((state) => state);

  console.log(new Date(lastSyncedAt));

  return (
    <View className="flex-1 w-full bg-slate-50 items-center">
      <View className="pt-8 pb-4 w-full items-center bg-white border-b border-gray-200">
        <Typography.Heading type="h2">Available Missions</Typography.Heading>
        <Typography.Paragraph className="text-gray-500 mt-1 mb-4">
          Complete missions to earn stars and badges!
        </Typography.Paragraph>
        <Button onPress={async () => await syncDatabase.pullChanges()}>Sync from Server</Button>
      </View>

      <MissionList />
    </View>
  );
}
