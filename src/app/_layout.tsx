import "../global.css";

import { Stack } from "expo-router";
import { HeroUINativeProvider } from "heroui-native/provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { ThemeProvider, DarkTheme, DefaultTheme } from "expo-router/react-navigation";

import { PowerSyncDatabaseProvider } from "@/db";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
      </ThemeProvider>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
