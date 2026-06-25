import { Button } from "heroui-native/button";
import { useCallback } from "react";
import { Image, Modal, ScrollView, View } from "react-native";
import { GestureViewer } from "react-native-gesture-image-viewer";

interface PhotoPreviewProps {
  photoUri: string | null;
  onDismiss: () => void;
}

export function PhotoPreview({ photoUri, onDismiss }: PhotoPreviewProps) {
  const renderImage = useCallback((imageUrl: string) => {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
      />
    );
  }, []);

  if (!photoUri) return null;

  return (
    <Modal transparent visible={!!photoUri} animationType="fade">
      <View className="flex-1 bg-black/90 relative">
        <GestureViewer
          data={[photoUri]}
          initialIndex={0}
          renderItem={renderImage}
          ListComponent={ScrollView}
          onDismiss={onDismiss}
        />

        {/* Overlay dismiss button on top of the viewer */}
        <View
          className="absolute bottom-12 left-0 right-0 items-center justify-center"
          pointerEvents="box-none"
        >
          <Button onPress={onDismiss} variant="danger">
            Dismiss
          </Button>
        </View>
      </View>
    </Modal>
  );
}
