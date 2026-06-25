import { Button } from "heroui-native/button";
import { Chip } from "heroui-native/chip";
import { useCallback } from "react";
import { Image, Modal, ScrollView, Text, View } from "react-native";
import { GestureViewer } from "react-native-gesture-image-viewer";

import type { ClassificationResult } from "../types/classification-result";

interface PhotoPreviewProps {
  photoUri: string | null;
  onDismiss: () => void;
  classification?: ClassificationResult | null;
}

export function PhotoPreview({ photoUri, onDismiss, classification }: PhotoPreviewProps) {
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

        {/* ML Classification Badge */}
        {classification && (
          <View className="absolute top-24 left-0 right-0 items-center" pointerEvents="none">
            <Chip color="success" variant="soft" size="lg">
              <Text className="text-white font-bold">
                🌳 {classification.label} ({(classification.confidence * 100).toFixed(0)}%)
              </Text>
            </Chip>
          </View>
        )}

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
