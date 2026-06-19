import { useEffect } from "react";
import { Canvas, Path, LinearGradient, vec } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";
import { View } from "react-native";

export function HeaderWaveAnimation() {
  const phase = useSharedValue(0);

  useEffect(() => {
    phase.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 6000, easing: Easing.linear }),
      -1,
      false
    );
  }, [phase]);

  const animatedPath = useDerivedValue(() => {
    const width = 400; // max reasonable width for a card
    const height = 150;
    const waveHeight = 20;
    let path = `M 0 0 L 0 ${height / 2}`;
    for (let x = 0; x <= width; x += 10) {
      const y = height / 2 + Math.sin((x / width) * Math.PI * 1.5 + phase.value) * waveHeight;
      path += ` L ${x} ${y}`;
    }
    path += ` L ${width} 0 Z`;
    return path;
  });

  return (
    <View className="absolute inset-0 pointer-events-none opacity-15">
      <Canvas style={{ flex: 1 }}>
        <Path path={animatedPath}>
          <LinearGradient start={vec(0, 0)} end={vec(400, 150)} colors={["#34D399", "#047857"]} />
        </Path>
      </Canvas>
    </View>
  );
}
