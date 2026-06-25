import { useEffect } from "react";
import { useCameraPermission } from "react-native-vision-camera";

export function useGetCameraPermission() {
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  return { hasPermission, requestPermission };
}
