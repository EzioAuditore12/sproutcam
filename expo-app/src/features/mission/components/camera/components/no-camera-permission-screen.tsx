import { Button } from "heroui-native/button";
import { Typography } from "heroui-native/text";
import { cn } from "heroui-native/utils";
import { View, type ViewProps } from "react-native";

interface NoCameraPermissionScreenProps extends ViewProps {
  onRequestPermission: () => void;
}

export function NoCameraPermissionScreen({
  className,
  onRequestPermission,
  ...props
}: NoCameraPermissionScreenProps) {
  return (
    <View className={cn("flex-1 items-center justify-center p-6 gap-y-4", className)} {...props}>
      <Typography.Heading type="h2" color="muted" align="center">
        Camera Permission
      </Typography.Heading>
      <Typography.Paragraph color="muted" align="center">
        We need access to your camera so you can capture photos for the mission.
      </Typography.Paragraph>

      <Button onPress={onRequestPermission} className="mt-4 w-full justify-center">
        Grant Permission
      </Button>
    </View>
  );
}
