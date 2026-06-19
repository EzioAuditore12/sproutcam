import { Typography } from "heroui-native/text";
import { Card } from "heroui-native/card";
import { FadeInDown } from "react-native-reanimated";
import { MotionView, MotionViewProps } from "@/components/motion-view";
import { BadgeBloomAnimation } from "./badge-bloom-animation";

export interface BadgeCardProps extends Partial<MotionViewProps> {
  title?: string;
  badgeName?: string;
}

export function BadgeCard({
  animation = FadeInDown,
  duration = 500,
  delay = 550,
  title,
  badgeName,
  ...props
}: BadgeCardProps) {
  return (
    <MotionView animation={animation} duration={duration} delay={delay} {...props}>
      <Card className="mt-6 bg-violet-100 border-0 shadow-none overflow-hidden">
        <BadgeBloomAnimation />
        <Card.Body className="z-10">
          <Typography.Paragraph type="body-sm" weight="medium" className="text-violet-700">
            {title}
          </Typography.Paragraph>

          <Typography.Heading type="h3" className="mt-2" color="muted">
            {badgeName}
          </Typography.Heading>
        </Card.Body>
      </Card>
    </MotionView>
  );
}
