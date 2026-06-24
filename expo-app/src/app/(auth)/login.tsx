import { Typography } from "heroui-native/text";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LoginForm } from "@/features/auth/components/form";
import { signIn } from "../../lib/auth";

export default function LoginScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        flexGrow: 1,
      }}
      contentContainerClassName="px-2 justify-center items-center"
      bottomOffset={100}
    >
      <Typography.Heading>Welcome Back!</Typography.Heading>

      <LoginForm className="w-full max-w-4xl" handleSubmit={signIn.email} />
    </KeyboardAwareScrollView>
  );
}
