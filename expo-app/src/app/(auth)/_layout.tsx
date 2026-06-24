import { Redirect, Stack } from "expo-router";

import { LoadingScreen } from "@/components/loading-screen";
import { useSession } from "../../lib/auth";

export default function AuthRootLayout() {
  const { data, isPending } = useSession();

  if (isPending) return <LoadingScreen />;

  if (data) return <Redirect href={"/(main)"} />;

  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
