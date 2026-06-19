import { Typography } from "heroui-native/text";
import { Card } from "heroui-native/card";
import { ZoomIn, FadeInUp } from "react-native-reanimated";
import { MotionView, MotionViewProps } from "@/components/motion-view";
import { StarAnimation } from "./star-animation";

export interface StarsCardProps extends Partial<MotionViewProps> {
  title?: string;
  starsCount?: number;
}

export function StarsCard({
  animation = ZoomIn,
  duration = 400,
  delay = 200,
  title,
  starsCount,
  ...props
}: StarsCardProps) {
  return (
    <MotionView animation={animation} duration={duration} delay={delay} {...props}>
      <Card className="mt-6 bg-amber-100 border-0 shadow-none overflow-hidden">
        <StarAnimation />
        <Card.Body className="z-10">
          <MotionView animation={FadeInUp} duration={400} delay={500}>
            <Typography.Paragraph type="body-sm" weight="medium" className="text-amber-700">
              {title}
            </Typography.Paragraph>
          </MotionView>

          <MotionView animation={ZoomIn} duration={400} delay={650}>
            <Typography.Heading type="h1" className="mt-2 text-amber-500">
              ⭐ {starsCount}
            </Typography.Heading>
          </MotionView>
        </Card.Body>
      </Card>
    </MotionView>
  );
}
