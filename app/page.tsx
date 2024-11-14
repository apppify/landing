import { AiModelsSection } from "@/components/home/ai-models-section";
import { FeedbacksSection } from "@/components/home/feedbacks-section";
import { HeroSection } from "@/components/home/hero-section";
import { NewsLetterSection } from "@/components/home/newsletter-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeedbacksSection />
      <AiModelsSection />
      <NewsLetterSection />
    </>
  );
}
