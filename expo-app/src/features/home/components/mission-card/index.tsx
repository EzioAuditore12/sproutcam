import { View } from "react-native";
import { Typography } from "heroui-native/text";
import { Card } from "heroui-native/card";
import { Button } from "heroui-native/button";
import { FadeInDown } from "react-native-reanimated";
import { MotionView, type MotionViewProps } from "@/components/motion-view";
import { useDebouncedCallback } from "use-debounce";

import { MissionAuraBackground } from "./mission-aura-background";

export interface MissionCardProps extends Partial<MotionViewProps> {
  title?: string;
  missionName?: string;
  description?: string;
  reward?: string;
  onAdventureClick?: () => void;
}

export function MissionCard({
  animation = FadeInDown,
  duration = 500,
  delay = 350,
  title,
  missionName,
  description,
  reward,
  onAdventureClick,
  ...props
}: MissionCardProps) {
  const handleAdventureClick = useDebouncedCallback(
    () => {
      onAdventureClick?.();
    },
    500,
    { leading: true, trailing: false }
  );

  return (
    <MotionView animation={animation} duration={duration} delay={delay} {...props}>
      <Card className="mt-6 border-0 shadow-sm overflow-hidden">
        <MissionAuraBackground />
        <Card.Body className="z-10">
          <Typography.Paragraph
            type="body-sm"
            weight="semibold"
            className="uppercase tracking-wide text-emerald-600 mb-2"
          >
            {title}
          </Typography.Paragraph>

          <Card.Title className="text-2xl font-bold text-slate-900">{missionName}</Card.Title>

          <Card.Description className="mt-2 text-base text-slate-500">
            {description}
          </Card.Description>
        </Card.Body>

        <Card.Footer className="flex-row items-center justify-between pt-4 z-10">
          <View>
            <Typography.Paragraph type="body-xs" color="muted">
              Reward
            </Typography.Paragraph>

            <Typography.Paragraph type="body" weight="semibold" className="text-lg text-amber-500">
              {reward}
            </Typography.Paragraph>
          </View>

          <Button onPress={handleAdventureClick}>Start Adventure</Button>
        </Card.Footer>
      </Card>
    </MotionView>
  );
}
