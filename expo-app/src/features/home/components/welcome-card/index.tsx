import { Typography } from "heroui-native/text";
import { Card } from "heroui-native/card";
import { View, Pressable } from "react-native";
import { FadeInLeft, FadeInDown, FadeInRight } from "react-native-reanimated";
import { MotionView, type MotionViewProps } from "@/components/motion-view";
import { Avatar } from "heroui-native/avatar";

import { HeaderWaveAnimation } from "./header-wave-animation";

export interface WelcomeCardProps extends Partial<MotionViewProps> {
  title?: string;
  description?: string;
  userName?: string;
  avatarUri?: string | null;
  onAvatarPress?: () => void;
}

export function WelcomeCard({
  animation = FadeInDown,
  duration = 500,
  delay = 0,
  title,
  description,
  userName,
  avatarUri,
  onAvatarPress,
  ...props
}: WelcomeCardProps) {
  return (
    <MotionView animation={animation} duration={duration} delay={delay} {...props}>
      <Card variant="transparent" className="mb-2 overflow-hidden">
        <HeaderWaveAnimation />
        <Card.Body className="gap-1 z-10 flex-row items-center justify-between">
          <View className="flex-1">
            <MotionView animation={FadeInLeft} duration={400} delay={300}>
              <Typography.Heading type="h3">{title}</Typography.Heading>
            </MotionView>

            <MotionView animation={FadeInLeft} duration={400} delay={450}>
              <Typography.Paragraph type="body" color="muted">
                {description}
              </Typography.Paragraph>
            </MotionView>
          </View>

          <MotionView animation={FadeInRight} duration={400} delay={450}>
            <Pressable onPress={onAvatarPress}>
              <Avatar alt="User Avatar">
                <Avatar.Image source={{ uri: avatarUri ?? "" }} />
                <Avatar.Fallback>{userName?.[0].toUpperCase()}</Avatar.Fallback>
              </Avatar>
            </Pressable>
          </MotionView>
        </Card.Body>
      </Card>
    </MotionView>
  );
}
