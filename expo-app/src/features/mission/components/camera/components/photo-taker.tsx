import { Button } from "heroui-native/button";
import { Activity, useRef, useState } from "react";
import { View } from "react-native";
import {
  Camera,
  useCameraDevice,
  usePhotoOutput,
  type CameraProps,
  type CameraRef,
} from "react-native-vision-camera";

import { LoadingScreen } from "@/components/loading-screen";
import { capturePhoto } from "../handlers/capture-photo";
import { PhotoPreview } from "./photo-preview";

interface PhotoTakerProps extends Omit<CameraProps, "ref" | "isActive" | "device" | "outputs"> {
  isActive?: boolean;
}

export function PhotoTaker({ isActive = true, ...props }: PhotoTakerProps) {
  const cameraRef = useRef<CameraRef>(null);
  const device = useCameraDevice("back");
  const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | null>(null);

  const photoOutput = usePhotoOutput();

  const handleCapture = async () => {
    const photo = await capturePhoto({ photoOutput });
    if (photo?.filePath) setCapturedPhotoUri(`file://${photo.filePath}`);
  };

  if (!device) return <LoadingScreen />;

  return (
    <View className="flex-1 relative">
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        isActive={isActive && !capturedPhotoUri} // Pause camera if we're previewing
        device={device}
        outputs={[photoOutput]}
        {...props}
      />

      {/* Render the capture button only when not previewing a photo */}
      <Activity mode={!capturedPhotoUri ? "visible" : "hidden"}>
        <View className="absolute bottom-12 left-0 right-0 items-center justify-center">
          <Button onPress={handleCapture} size="lg">
            Capture Photo
          </Button>
        </View>
      </Activity>

      {/* Modal image viewer */}
      <PhotoPreview photoUri={capturedPhotoUri} onDismiss={() => setCapturedPhotoUri(null)} />
    </View>
  );
}
