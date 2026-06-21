import { Stack } from "expo-router";

export default function MissionRootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="complete" />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="camera-screen/index" options={{ headerShown: false }} />
    </Stack>
  );
}
