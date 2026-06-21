import { Typography } from "heroui-native/text";
import { View } from "react-native";
import { Button } from "heroui-native/button";
import { useRouter } from "expo-router";

export default function MissionCompleteScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-green-50 p-6">
      <Typography.Heading type="h1" className="text-6xl mb-4">
        🎉
      </Typography.Heading>
      <Typography.Heading type="h2" className="text-green-700 text-center">
        Mission Accomplished!
      </Typography.Heading>
      <Typography.Paragraph className="text-green-800 mt-4 text-center text-lg">
        You successfully found all the objects and completed your mission. Great job!
      </Typography.Paragraph>

      <Button
        onPress={() => router.replace("/(main)")}
        size="lg"
        className="mt-12 w-full bg-green-600"
      >
        Return Home
      </Button>
    </View>
  );
}
