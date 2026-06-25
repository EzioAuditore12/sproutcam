import type { RefObject } from "react";
import type {
  CameraPhotoOutput,
  CapturePhotoSettings,
  PhotoFile,
} from "react-native-vision-camera";

export interface CapturePhotoOptions {
  photoOutput: CameraPhotoOutput;
  settings?: CapturePhotoSettings;
}

export async function capturePhoto({
  photoOutput,
  settings = { flashMode: "auto" },
}: CapturePhotoOptions) {
  try {
    // V5 uses capturePhotoToFile on the photo output instance directly to save to disk.
    // It requires the settings and an empty callbacks object.
    const photo: PhotoFile = await photoOutput.capturePhotoToFile(settings, {});

    console.log("Photo metadata:", photo);
    return photo;
  } catch (error) {
    console.error("Capture failed:", error);
  }
}
