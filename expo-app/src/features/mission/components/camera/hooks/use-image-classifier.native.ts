import { useMemo, useState } from "react";
import { useTensorflowModel } from "react-native-fast-tflite";
import { NitroModules } from "react-native-nitro-modules";
import { useFrameOutput } from "react-native-vision-camera";
import { useResizer } from "react-native-vision-camera-resizer";
import { scheduleOnRN } from "react-native-worklets";

import mobileNetModel from "@/assets/models/mobilenet_v1_1.0_224_quant.tflite";
import { MOBILENET_LABELS } from "@/assets/models/mobilenet-labels";
import type { ClassificationResult } from "../types/classification-result";

export function useImageClassifier() {
  const plugin = useTensorflowModel(mobileNetModel, ["nnapi"]);

  const model = plugin.state === "loaded" ? plugin.model : undefined;

  const [currentResult, setCurrentResult] = useState<ClassificationResult | null>(null);

  const boxedModel = useMemo(
    //@ts-ignore
    () => (model != null ? NitroModules.box(model) : undefined),
    [model]
  );

  const { resizer } = useResizer({
    width: 224,
    height: 224,
    pixelLayout: "interleaved",
    dataType: "uint8",
    channelOrder: "rgb",
    scaleMode: "cover",
  });

  const frameOutput = useFrameOutput({
    onFrame: (frame) => {
      "worklet";
      if (boxedModel == null || resizer == null) return;

      const tflite = boxedModel.unbox();

      const resized = resizer.resize(frame);
      const inputBuffer = resized.getPixelBuffer();

      const result = tflite.runSync([inputBuffer]);

      resized.dispose();

      if (result && result.length > 0) {
        const output = new Uint8Array(result[0]);

        let maxIdx = 0;
        let maxProb = 0;
        for (let i = 0; i < output.length; i++) {
          if (output[i] > maxProb) {
            maxProb = output[i];
            maxIdx = i;
          }
        }

        const confidence = maxProb / 255.0;

        if (confidence > 0.5) {
          scheduleOnRN(setCurrentResult, {
            label: MOBILENET_LABELS[maxIdx] || "Unknown",
            confidence,
          });
        }
      }

      frame.dispose();
    },
  });

  return {
    frameOutput,
    currentResult: { value: currentResult },
    isReady: plugin.state === "loaded",
  };
}
