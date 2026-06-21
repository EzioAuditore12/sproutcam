import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "sproutcam",
  slug: "sproutcam",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "sproutcam",
  userInterfaceStyle: "automatic",
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSCameraUsageDescription:
        "$(PRODUCT_NAME) needs access to your Camera to capture photos and videos.",
      NSMicrophoneUsageDescription:
        "$(PRODUCT_NAME) needs access to your Microphone to record audio for video recordings.",
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    predictiveBackGestureEnabled: false,
    package: "com.dakshpurohit.sproutcam",
    permissions: ["android.permission.CAMERA", "android.permission.RECORD_AUDIO"],
  },
  web: {
    output: "single",
    favicon: "./assets/images/favicon.png",
    bundler: "metro",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    "expo-secure-store",
    "expo-background-task",
    "react-native-nitro-fetch",
    "@react-native-vector-icons/entypo",
    "@react-native-vector-icons/ant-design",
    "@react-native-vector-icons/fontawesome6",
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
});
