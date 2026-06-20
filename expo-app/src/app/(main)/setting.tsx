import { View } from "react-native";
import { Typography } from "heroui-native/text";
import { Button } from "heroui-native/button";
import { useRouter } from "expo-router";
import { Avatar } from "heroui-native/avatar";

import { useSession, authClient } from "../../lib/auth";

export default function SettingScreen() {
  const { data } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 px-4 py-8 items-center justify-center">
      <Typography.Heading type="h2" className="mb-8">
        Settings
      </Typography.Heading>

      {data?.user ? (
        <View className="w-full max-w-sm rounded-3xl p-8 items-center border border-slate-200">
          <Avatar alt="User Avatar" className="w-24 h-24 mb-6">
            <Avatar.Image source={{ uri: data.user.image ?? "" }} />
            <Avatar.Fallback className="text-4xl">
              {data.user.name?.[0]?.toUpperCase() || data.user.email?.[0]?.toUpperCase() || "?"}
            </Avatar.Fallback>
          </Avatar>

          <Typography.Heading type="h3" className="mb-1">
            {data.user.name || "User"}
          </Typography.Heading>
          <Typography.Paragraph type="body" color="muted" className="mb-8">
            {data.user.email}
          </Typography.Paragraph>

          <Button className="w-full" variant="danger" onPress={handleSignOut}>
            Log Out
          </Button>
        </View>
      ) : (
        <Typography.Paragraph type="body" color="muted">
          No user data available.
        </Typography.Paragraph>
      )}
    </View>
  );
}
