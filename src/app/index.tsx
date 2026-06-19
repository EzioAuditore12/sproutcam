import { useState } from "react";
import Onboarding from "react-native-onboarding-swiper";

import { OnboardingBanner } from "@/features/onboarding/components/banner";

import PlantSprout from "@/features/onboarding/assets/plant-sprout.json";
import ShootingPhotoAnimation from "@/features/onboarding/assets/shooting-photo-animation.json";
import FiveStars from "@/features/onboarding/assets/five-stars.json";

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <Onboarding
      containerStyles={{ justifyContent: "center" }}
      pageIndexCallback={setCurrentPage}
      pages={[
        {
          backgroundColor: "#F8FAFC",
          image: <OnboardingBanner asset={PlantSprout} isActive={currentPage === 0} />,
          title: "Welcome to SproutCam 🌱",
          subtitle:
            "Turn everyday objects into fun learning adventures for curious young explorers.",
        },
        {
          backgroundColor: "#ECFDF5",
          image: <OnboardingBanner asset={ShootingPhotoAnimation} isActive={currentPage === 1} />,
          title: "Complete Fun Missions 📸",
          subtitle:
            "Find flowers, toys, colors, and more by using your camera to explore the world around you.",
        },
        {
          backgroundColor: "#EFF6FF",
          image: <OnboardingBanner asset={FiveStars} isActive={currentPage === 2} />,
          title: "Earn Stars & Badges ⭐",
          subtitle:
            "Complete missions, unlock rewards, and celebrate every discovery along the way.",
        },
      ]}
    />
  );
}
