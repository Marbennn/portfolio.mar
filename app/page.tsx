import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { CursorEffect } from "@/components/cursor-effect";
import { SectionSlideCover } from "@/components/section-slide-cover";

export default function Portfolio() {
  return (
    <>
      <CursorEffect />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SectionSlideCover
          zIndexClassName="z-20"
          overlapClassName="-mt-[44vh]"
          strength="strong"
        >
          <ProjectsSection />
        </SectionSlideCover>
        <SectionSlideCover zIndexClassName="z-30">
          <ExperienceSection />
        </SectionSlideCover>
        <SectionSlideCover
          zIndexClassName="z-40"
          overlapClassName="-mt-[18vh] pb-4"
          settleEarly
        >
          <ContactSection />
        </SectionSlideCover>
      </main>
      <Footer />
    </>
  );
}
