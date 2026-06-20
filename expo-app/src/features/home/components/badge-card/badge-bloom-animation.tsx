import { useEffect } from "react";
import { Canvas, Path, Group, vec, Blur } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
  useDerivedValue,
} from "react-native-reanimated";
import { View } from "react-native";

export function BadgeBloomAnimation() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 12000, easing: Easing.linear }),
      -1,
      false
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.8, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [rotation, scale]);

  const transform = useDerivedValue(() => [{ rotate: rotation.value }, { scale: scale.value }]);

  const petals = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
    const angle = (i * Math.PI) / 4;
    const px = 60 + 25 * Math.cos(angle);
    const py = 60 + 25 * Math.sin(angle);
    return { i, angle, px, py };
  });

  return (
    <View
      style={{ width: 120, height: 120 }}
      className="absolute -right-4 -bottom-4 pointer-events-none opacity-40"
    >
      <Canvas style={{ flex: 1 }}>
        <Group origin={vec(60, 60)} transform={transform}>
          {petals.map(({ i, angle, px, py }) => (
            <Group key={i} origin={vec(px, py)} transform={[{ rotate: angle }]}>
              <Path
                path={`M ${px} ${py} Q ${px - 15} ${py - 30} ${px} ${py - 45} Q ${px + 15} ${py - 30} ${px} ${py} Z`}
                color="#C084FC"
                opacity={0.6}
              >
                <Blur blur={2} />
              </Path>
            </Group>
          ))}
          <Path path={`M 60 60 m -12 0 a 12 12 0 1 0 24 0 a 12 12 0 1 0 -24 0`} color="#FCD34D">
            <Blur blur={4} />
          </Path>
        </Group>
      </Canvas>
    </View>
  );
}
