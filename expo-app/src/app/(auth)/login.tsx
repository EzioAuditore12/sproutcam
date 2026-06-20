import { Typography } from "heroui-native/text";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LoginForm } from "@/features/auth/components/form";

import { signIn } from "../../lib/auth";

export default function LoginScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        flexGrow: 1,
      }}
      contentContainerClassName="px-2 flex-1 justify-center items-center"
    >
      <Typography.Heading>Welcome Back!</Typography.Heading>

      <LoginForm className="w-full max-w-4xl" handleSubmit={signIn.email} />
    </ScrollView>
  );
}
