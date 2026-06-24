import { memo, type FC } from "react";
import { StyleSheet } from "react-native";
import type { ViewProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

import { BottomProgressState } from "../typings";
import { CollapsedArea } from "./collapsed-area";
import { ProgressBarArea } from "./progress-bar-area";

type BottomProgressProps = {
  style?: ViewProps["style"];
  progress: SharedValue<number>;
  readingTime: string;
  onReset: () => void;
};

const BottomProgress: FC<BottomProgressProps> = memo(
  ({ style, progress, readingTime, onReset }) => {
    const state = useDerivedValue(() => {
      if (progress.get() === 0) {
        return BottomProgressState.INITIAL;
      }
      if (progress.get() === 1) {
        return BottomProgressState.END;
      }
      return BottomProgressState.EXPANDED;
    }, []);

    const isExpanded = useDerivedValue(() => {
      return state.get() === BottomProgressState.EXPANDED;
    }, []);

    const rAnimatedStyle = useAnimatedStyle(() => {
      const width = withTiming(isExpanded.get() ? 200 : 70, {
        duration: 500,
      });

      return {
        width: width,
      };
    });

    return (
      <Animated.View style={[styles.container, rAnimatedStyle, style]}>
        <ProgressBarArea isVisible={isExpanded} progress={progress} />
        <CollapsedArea state={state} readingTime={readingTime} onReset={onReset} />
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    height: 70,
    width: 200,
  },
});

BottomProgress.displayName = "BottomProgress";

export { BottomProgress };
