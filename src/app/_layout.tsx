import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native/provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import "../global.css";

import { PowerSyncDatabaseProvider } from "@/db";

export default function RootLayoutNative() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider
        config={{
          devInfo: {
            stylingPrinciples: false,
          },
        }}
      >
        <PowerSyncDatabaseProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </PowerSyncDatabaseProvider>
      </HeroUINativeProvider>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
