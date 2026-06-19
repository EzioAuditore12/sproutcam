import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Canvas,
  Group,
  Skia,
  Skottie,
  useClock,
  type CanvasProps,
} from "@shopify/react-native-skia";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

export function OnboardingBanner({
  style,
  asset,
  isActive = true,
  ...props
}: CanvasProps & { asset: unknown; isActive?: boolean }) {
  const animation = Skia.Skottie.Make(JSON.stringify(asset));

  if (!animation) {
    throw new Error("Failed to parse animation");
  }

  const fps = animation.fps();
  const duration = animation.duration();
  const totalFrames = Math.floor(duration * fps);

  // Automatically calculate scale and centering offsets
  const { width: animW, height: animH } = animation.size();
  const canvasSize = 300;

  const safeAnimW = animW || 1;
  const safeAnimH = animH || 1;
  const scale = Math.min(canvasSize / safeAnimW, canvasSize / safeAnimH) * 0.9;

  const scaledW = safeAnimW * scale;
  const scaledH = safeAnimH * scale;

  const translateX = (canvasSize - scaledW) / 2;
  const translateY = (canvasSize - scaledH) / 2;

  const clock = useClock();
  const isActiveSV = useSharedValue(isActive);
  const startTime = useSharedValue(0);
  const hasStarted = useSharedValue(false);

  useEffect(() => {
    isActiveSV.value = isActive;
  }, [isActive, isActiveSV]);

  const frame = useDerivedValue(() => {
    if (!isActiveSV.value) {
      hasStarted.value = false;
      return 0;
    }
    if (!hasStarted.value) {
      hasStarted.value = true;
      startTime.value = clock.value;
    }
    const currentFrame = Math.floor(((clock.value - startTime.value) / 1000) * fps);
    return currentFrame < totalFrames ? currentFrame : totalFrames - 1;
  });

  return (
    <View style={StyleSheet.flatten([{ height: canvasSize, width: canvasSize }, style])}>
      <Canvas style={{ flex: 1 }} {...props}>
        <Group transform={[{ translateX }, { translateY }, { scale }]}>
          <Skottie animation={animation} frame={frame} />
        </Group>
      </Canvas>
    </View>
  );
}
