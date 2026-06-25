import { Button } from "heroui-native/button";
import { Typography } from "heroui-native/text";
import { Activity, useRef, useState } from "react";
import { Text, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  usePhotoOutput,
  type CameraProps,
  type CameraRef,
} from "react-native-vision-camera";

import { LoadingScreen } from "@/components/loading-screen";
import { capturePhoto } from "../handlers/capture-photo";
import { useImageClassifier } from "../hooks/use-image-classifier.native";
import { PhotoPreview } from "./photo-preview";

interface PhotoTakerProps extends Omit<CameraProps, "ref" | "isActive" | "device" | "outputs"> {
  isActive?: boolean;
}

export function PhotoTaker({ isActive = true, ...props }: PhotoTakerProps) {
  const cameraRef = useRef<CameraRef>(null);
  const device = useCameraDevice("back");
  const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | null>(null);
  const [capturedClassification, setCapturedClassification] = useState<any>(null);

  const photoOutput = usePhotoOutput();
  const { frameOutput, currentResult } = useImageClassifier();

  const handleCapture = async () => {
    // Snapshot the current ML classification result at the exact moment of capture
    setCapturedClassification(currentResult?.value || null);

    const photo = await capturePhoto({ photoOutput });
    if (photo?.filePath) setCapturedPhotoUri(`file://${photo.filePath}`);
  };

  const handleDismiss = () => {
    setCapturedPhotoUri(null);
    setCapturedClassification(null);
  };

  if (!device) return <LoadingScreen />;

  return (
    <View className="flex-1 relative">
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        isActive={isActive && !capturedPhotoUri} // Pause camera if we're previewing
        device={device}
        outputs={[photoOutput, frameOutput]}
        {...props}
      />

      {/* Real-time Classification Overlay */}
      <Activity mode={isActive && !capturedPhotoUri && currentResult.value ? "visible" : "hidden"}>
        <View className="absolute top-12 self-center bg-black/60 px-6 py-3 rounded-2xl items-center border border-white/20 shadow-lg">
          <Typography.Heading type="h2" className="text-white text-center">
            {currentResult.value?.label}
          </Typography.Heading>
          <Typography.Paragraph type="body-sm" weight="medium" className="text-white/80 mt-1">
            Confidence: {((currentResult.value?.confidence || 0) * 100).toFixed(0)}%
          </Typography.Paragraph>
        </View>
      </Activity>

      {/* Render the capture button only when not previewing a photo */}
      <Activity mode={!capturedPhotoUri ? "visible" : "hidden"}>
        <View className="absolute bottom-12 left-0 right-0 items-center justify-center">
          <Button onPress={handleCapture} size="lg">
            Capture Photo
          </Button>
        </View>
      </Activity>

      {/* Modal image viewer */}
      <PhotoPreview
        photoUri={capturedPhotoUri}
        onDismiss={handleDismiss}
        classification={capturedClassification}
      />
    </View>
  );
}
