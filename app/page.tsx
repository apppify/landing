import { AiModelsSection } from "@/components/home/ai-models-section";
import { HeroSection } from "@/components/home/hero-section";
import { NewsLetterSection } from "@/components/home/newsletter-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AiModelsSection />
      <NewsLetterSection />
    </>
  );
}
