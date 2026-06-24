import { PressableScale } from "pressto";
import { memo, type FC, type ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

import { FLOATING_BUTTON_SIZE } from "./constants";

type ModalProps = {
  children?: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  isVisible: SharedValue<boolean>;
};

const ModalContent: FC<ModalProps> = memo(({ children, isVisible, contentContainerStyle }) => {
  const rAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isVisible.get() ? 1 : 0, {
        duration: 100,
      }),
    };
  }, [isVisible]);

  const rAnimatedProps = useAnimatedProps(() => {
    return {
      pointerEvents: isVisible.get() ? "auto" : "none",
    } as any;
  }, [isVisible]);

  return (
    <Animated.View
      animatedProps={rAnimatedProps}
      style={[
        {
          ...StyleSheet.absoluteFill,
          alignItems: "center",
        },
        rAnimatedStyle,
      ]}
    >
      <View style={styles.modalContainerTitle}>
        <Text style={styles.modalTitle}>New</Text>
      </View>

      <View style={[{ flex: 1 }, contentContainerStyle]}>{children}</View>
      <View style={styles.buttonContainer}>
        <PressableScale style={styles.button}>
          <Text style={styles.buttonTitle}>Done</Text>
        </PressableScale>
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#111",
    borderCurve: "continuous",
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  buttonContainer: {
    height: 80,
    width: "100%",
  },

  buttonTitle: { color: "white", fontSize: 20, fontWeight: "700" },
  modalContainerTitle: {
    height: FLOATING_BUTTON_SIZE,
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

ModalContent.displayName = "ModalContent";

export { ModalContent };
