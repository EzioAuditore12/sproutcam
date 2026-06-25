import { NoCameraPermissionScreen } from "@/features/mission/components/camera/components/no-camera-permission-screen";
import { PhotoTaker } from "@/features/mission/components/camera/components/photo-taker";
import { useGetCameraPermission } from "@/features/mission/components/camera/hooks/use-get-camera-permission";

export default function MissionCameraScreen() {
  const { hasPermission, requestPermission } = useGetCameraPermission();

  if (!hasPermission) return <NoCameraPermissionScreen onRequestPermission={requestPermission} />;

  return <PhotoTaker />;
}
