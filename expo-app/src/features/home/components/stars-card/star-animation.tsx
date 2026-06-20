import { useEffect } from "react";
import { Canvas, Path, vec, Group, Shadow, LinearGradient } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";
import { View } from "react-native";

export function StarAnimation() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 6000, easing: Easing.linear }),
      -1,
      false
    );
    scale.value = withRepeat(
      withTiming(1.2, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [rotation, scale]);

  const transform = useDerivedValue(() => [{ rotate: rotation.value }, { scale: scale.value }]);

  const getStarPath = () => {
    const cx = 50;
    const cy = 50;
    const outerRadius = 45;
    const innerRadius = 20;
    const numPoints = 5;
    let path = "";

    for (let i = 0; i < numPoints * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / numPoints - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      if (i === 0) {
        path += `M ${x} ${y} `;
      } else {
        path += `L ${x} ${y} `;
      }
    }
    path += "Z";
    return path;
  };

  const starPath = getStarPath();

  return (
    <View
      style={{ width: 140, height: 140 }}
      className="absolute -right-6 -top-6 opacity-30 pointer-events-none"
    >
      <Canvas style={{ flex: 1 }}>
        <Group origin={vec(50, 50)} transform={transform}>
          <Path path={starPath}>
            <LinearGradient start={vec(0, 0)} end={vec(100, 100)} colors={["#FCD34D", "#D97706"]} />
            <Shadow dx={0} dy={0} blur={10} color="#FBBF24" />
          </Path>
        </Group>
      </Canvas>
    </View>
  );
}
