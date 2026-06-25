import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";

import type { ClassificationResult } from "../types/classification-result";

export function useImageClassifier(photoUri: string | null) {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    async function loadModel() {
      await tf.ready();
      const loadedModel = await mobilenet.load({ version: 1, alpha: 1.0 });
      setModel(loadedModel);
    }
    loadModel();
  }, []);

  useEffect(() => {
    if (!photoUri || !model) {
      setResult(null);
      return;
    }

    let isActive = true;

    async function classifyImage(uri: string, activeModel: mobilenet.MobileNet) {
      setIsAnalyzing(true);

      try {
        const img = new Image();
        img.src = uri;
        img.crossOrigin = "anonymous";

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        if (!isActive) return;

        const predictions = await activeModel.classify(img, 3);
        if (isActive && predictions && predictions.length > 0) {
          setResult({
            label: predictions[0].className,
            confidence: predictions[0].probability,
          });
        }
      } catch (error) {
        console.error("Classification failed:", error);
      } finally {
        if (isActive) setIsAnalyzing(false);
      }
    }

    classifyImage(photoUri, model);

    return () => {
      isActive = false;
    };
  }, [photoUri, model]);

  return { result, isAnalyzing, isReady: !!model };
}
