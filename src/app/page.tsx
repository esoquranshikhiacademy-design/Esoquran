import { HeroSection } from "@/components/home/HeroSection";
import { TodaySection } from "@/components/home/TodaySection";
import { Footer } from "@/components/layout/Footer";
import { LandingShell } from "@/components/layout/LandingShell";

export default function HomePage() {
  return (
    <LandingShell>
      <HeroSection />
      <TodaySection />
      <Footer />
    </LandingShell>
  );
}
