import { Typography } from "heroui-native/text";
import { Card } from "heroui-native/card";
import { FadeInDown } from "react-native-reanimated";
import { MotionView, type MotionViewProps } from "@/components/motion-view";

export interface ProgressCardProps extends Partial<MotionViewProps> {
  title?: string;
  description?: string;
}

export function ProgressCard({
  animation = FadeInDown,
  duration = 500,
  delay = 450,
  title,
  description,
  ...props
}: ProgressCardProps) {
  return (
    <MotionView animation={animation} duration={duration} delay={delay} {...props}>
      <Card className="mt-6 border-0 shadow-sm">
        <Card.Body>
          <Typography.Paragraph type="body-sm" weight="semibold" className="text-slate-700">
            {title}
          </Typography.Paragraph>

          <Typography.Paragraph type="body" className="mt-3 text-lg text-slate-600">
            {description}
          </Typography.Paragraph>
        </Card.Body>
      </Card>
    </MotionView>
  );
}
