import { CameraType, CameraView, type CameraViewProps } from "expo-camera";
import { Button } from "heroui-native/button";
import { Activity, useRef, useState } from "react";
import { View } from "react-native";

import { useImageClassifier } from "../hooks/use-image-classifier.web";
import { PhotoPreview } from "./photo-preview";

interface PhotoTakerProps extends Omit<CameraViewProps, "ref" | "facing"> {
  isActive?: boolean;
}

export function PhotoTaker({ isActive = true, ...props }: PhotoTakerProps) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const { result } = useImageClassifier(capturedPhotoUri);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: false,
      });
      if (photo?.uri) {
        setCapturedPhotoUri(photo.uri);
      }
    }
  };

  return (
    <View className="flex-1 relative bg-black">
      {/* Hide the camera when inactive or previewing */}
      {isActive && !capturedPhotoUri && (
        <CameraView className="flex-1" facing={facing} ref={cameraRef} {...props} />
      )}

      <Activity mode={!capturedPhotoUri ? "visible" : "hidden"}>
        <View className="absolute bottom-12 left-0 right-0 flex-row items-center justify-between px-6">
          <Button
            onPress={toggleCameraFacing}
            variant="secondary"
            className="flex-1 border-white mr-4"
          >
            Flip
          </Button>
          <Button onPress={handleCapture} size="lg" className="flex-2">
            Capture Photo
          </Button>
        </View>
      </Activity>

      {/* Modal image viewer works on Web as well */}
      <PhotoPreview
        photoUri={capturedPhotoUri}
        onDismiss={() => setCapturedPhotoUri(null)}
        classification={result}
      />
    </View>
  );
}
