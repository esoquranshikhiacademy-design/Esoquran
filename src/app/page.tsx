import { HeroSection } from "@/components/home/HeroSection";
import { SmartSearch } from "@/components/home/SmartSearch";
import { TodaySection } from "@/components/home/TodaySection";
import { LearningJourney } from "@/components/home/LearningJourney";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SmartSearch />
      <TodaySection />
      <LearningJourney />
    </>
  );
}
