import { View } from "react-native";
import { Spinner } from "heroui-native/spinner";

export function LoadingScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Spinner size="lg" />
    </View>
  );
}
