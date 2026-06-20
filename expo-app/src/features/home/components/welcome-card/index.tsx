import { Typography } from "heroui-native/text";
import { Card } from "heroui-native/card";
import { FadeInLeft, FadeInDown } from "react-native-reanimated";
import { MotionView, type MotionViewProps } from "@/components/motion-view";

import { HeaderWaveAnimation } from "./header-wave-animation";

export interface WelcomeCardProps extends Partial<MotionViewProps> {
  title?: string;
  description?: string;
}

export function WelcomeCard({
  animation = FadeInDown,
  duration = 500,
  delay = 0,
  title,
  description,
  ...props
}: WelcomeCardProps) {
  return (
    <MotionView animation={animation} duration={duration} delay={delay} {...props}>
      <Card variant="transparent" className="mb-2 overflow-hidden">
        <HeaderWaveAnimation />
        <Card.Body className="gap-1 z-10">
          <MotionView animation={FadeInLeft} duration={400} delay={300}>
            <Typography.Heading type="h3">{title}</Typography.Heading>
          </MotionView>

          <MotionView animation={FadeInLeft} duration={400} delay={450}>
            <Typography.Paragraph type="body" color="muted">
              {description}
            </Typography.Paragraph>
          </MotionView>
        </Card.Body>
      </Card>
    </MotionView>
  );
}
