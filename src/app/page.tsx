import { Navigation } from "@/components/Navigation";
import { HomeHeader } from "@/components/HomeHeader";
import { CountdownSection } from "@/components/CountdownSection";
import { SaveTheDate } from "@/components/SaveTheDate";
import { HorizontalScrollSection } from "@/components/HorizontalScrollSection";
import { OurStorySection } from "@/components/OurStorySection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Navigation overHero />
      <main className="relative">
        {/* Hero + Countdown share the fixed photo slideshow behind them (transparent) */}
        <HomeHeader />
        <CountdownSection />

        {/* Opaque white layer covers the fixed slideshow for the rest of the page */}
        <div className="relative z-10 bg-white">
          <SaveTheDate />
          <HorizontalScrollSection />
          <OurStorySection />
          <SiteFooter />
        </div>
      </main>
    </>
  );
}
