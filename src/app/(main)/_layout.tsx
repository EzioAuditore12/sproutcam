import { Redirect, Stack } from "expo-router";

import { useSettingStore } from "@/store/settings";

export default function MainLayout() {
  const { isOnboardingCompleted } = useSettingStore((state) => state);

  if (!isOnboardingCompleted) return <Redirect href="/onboarding" />;

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="mission" options={{ headerShown: false }} />
    </Stack>
  );
}
