import React from "react";
import { ViewProps, StyleProp, ViewStyle } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export interface MotionViewProps extends ViewProps {
  animation?: any;
  delay?: number;
  duration?: number;
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function MotionView({
  animation = FadeInDown,
  delay = 0,
  duration = 500,
  children,
  style,
  className,
  ...props
}: MotionViewProps) {
  // Safely apply duration and delay to the animation builder
  let enteringAnimation = animation;
  if (enteringAnimation && typeof enteringAnimation.duration === "function") {
    enteringAnimation = enteringAnimation.duration(duration);
  }
  if (enteringAnimation && typeof enteringAnimation.delay === "function") {
    enteringAnimation = enteringAnimation.delay(delay);
  }

  return (
    <Animated.View entering={enteringAnimation} style={style} className={className} {...props}>
      {children}
    </Animated.View>
  );
}
