import { Redirect, Stack } from "expo-router";

import { LoadingScreen } from "@/components/loading-screen";
import { useSyncEngine } from "../../db/sync/hook";
import { useSession } from "../../lib/auth";

export default function MainLayout() {
  const { data, isPending } = useSession();

  useSyncEngine(!!data);

  if (isPending) return <LoadingScreen />;

  if (!data) return <Redirect href={"/(auth)/login"} />;

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="mission" options={{ headerShown: false }} />

      <Stack.Screen name="setting" options={{ headerShown: false }} />
    </Stack>
  );
}
