import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnimatedCountText } from "@/components/animated-count-text";
import { AnimatedIndicatorList } from "@/components/animated-indicator-list";
import { FloatingModal } from "@/components/floating-modal";
import { LoadingButton } from "@/components/loading-button";
import { ParticlesButton } from "@/components/particles-button";
import { ScrollProgress } from "@/components/scroll-progress";
import { StackedList } from "@/components/stacked-list";

const SECTIONS = [
  { id: "1", title: "Animated Count Text", component: <AnimatedCountText /> },
  { id: "2", title: "Loading Button", component: <LoadingButton /> },
  { id: "3", title: "Particles Button", component: <ParticlesButton /> },
  { id: "4", title: "Scroll Progress", component: <ScrollProgress /> },
  { id: "5", title: "Stacked List", component: <StackedList /> },
  { id: "6", title: "Animated Indicator List", component: <AnimatedIndicatorList /> },
];

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(SECTIONS[0].id);

  const ActiveComponent = SECTIONS.find((s) => s.id === activeTab)?.component;

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      {/* Custom Tab Bar */}
      <View style={[styles.tabBarContainer, { paddingTop: Math.max(insets.top, 20) }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBar}
        >
          {SECTIONS.map((section) => {
            const isActive = section.id === activeTab;
            return (
              <TouchableOpacity
                key={section.id}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                onPress={() => setActiveTab(section.id)}
              >
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {section.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Active Component Area */}
      <View style={styles.contentContainer}>{ActiveComponent}</View>

      {/* FloatingModal is absolutely positioned, so it should be at the root */}
      <FloatingModal />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
  },
  tabButtonActive: {
    backgroundColor: "#222",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  tabTextActive: {
    color: "#fff",
  },
  contentContainer: {
    flex: 1,
  },
});
