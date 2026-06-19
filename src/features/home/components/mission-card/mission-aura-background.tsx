import { useEffect } from "react";
import { Canvas, Circle, vec, Blur, RadialGradient, Group } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";
import { View } from "react-native";

export function MissionAuraBackground() {
  const auraScale = useSharedValue(0.8);
  const auraOpacity = useSharedValue(0.2);

  useEffect(() => {
    auraScale.value = withRepeat(
      withTiming(1.3, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    auraOpacity.value = withRepeat(
      withTiming(0.6, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [auraScale, auraOpacity]);

  const transform1 = useDerivedValue(() => [{ scale: auraScale.value }]);
  const transform2 = useDerivedValue(() => [{ scale: 1.5 - auraScale.value / 2 }]);

  return (
    <View className="absolute inset-0 pointer-events-none">
      <Canvas style={{ flex: 1 }}>
        <Group origin={vec(250, 20)} transform={transform1}>
          <Circle cx={250} cy={20} r={100} opacity={auraOpacity}>
            <RadialGradient
              c={vec(250, 20)}
              r={100}
              colors={["rgba(52, 211, 153, 0.6)", "transparent"]}
            />
            <Blur blur={30} />
          </Circle>
        </Group>
        <Group origin={vec(40, 150)} transform={transform2}>
          <Circle cx={40} cy={150} r={120} opacity={auraOpacity}>
            <RadialGradient
              c={vec(40, 150)}
              r={120}
              colors={["rgba(16, 185, 129, 0.5)", "transparent"]}
            />
            <Blur blur={40} />
          </Circle>
        </Group>
      </Canvas>
    </View>
  );
}
