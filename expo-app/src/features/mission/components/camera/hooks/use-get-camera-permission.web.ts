import { useCameraPermissions } from "expo-camera";
import { useEffect } from "react";

export function useGetCameraPermission() {
  const [permission, requestPermission] = useCameraPermissions();

  const hasPermission = permission?.granted ?? false;

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  return { hasPermission, requestPermission };
}
