import { useQuery } from "@powersync/react";
import { toCompilableQuery } from "@powersync/drizzle-driver";
import { Button } from "heroui-native/button";
import { View } from "react-native";

import { db } from "@/db";
import { missionsTable } from "@/db/tables/mission.table";

export default function HomeScreen() {
  const { data } = useQuery(toCompilableQuery(db.select().from(missionsTable)));

  console.log(data);

  return (
    <View className="flex-1 bg-background justify-center px-6">
      <Button
        onPress={async () =>
          await db.insert(missionsTable).values({
            title: "Hello",
            requiredCount: 2,
            targetObject: "xyz",
            description: "This is that",
          })
        }
      >
        Click ME
      </Button>
    </View>
  );
}
