import { useEffect } from "react";
import { Camera, useCameraPermission, useCameraDevice } from "react-native-vision-camera";

export default function MissionCameraScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  if (!hasPermission || !device) return null;

  return <Camera style={{ flex: 1 }} isActive={true} device={device} />;
}
