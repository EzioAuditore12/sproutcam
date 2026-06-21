import { Stack } from "expo-router";

export default function MissionRootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="complete" />
    </Stack>
  );
}
