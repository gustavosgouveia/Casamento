import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { GiftCard } from "@/components/GiftCard";
import { SiteFooter } from "@/components/SiteFooter";
import { gifts } from "@/lib/gifts";

export const metadata = {
  title: "Presentes — Samira & Gustavo",
};

export default function PresentesPage() {
  return (
    <>
      <Navigation />
      {/* Fixed faded couple photo behind the frosted gift grid */}
      <div className="fixed inset-0 -z-10">
        <Image src="/giftpage/bg.jpg" alt="" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-white/45" />
      </div>

      <main className="relative min-h-screen">
        <div className="mx-auto flex max-w-[2400px] flex-wrap justify-center gap-x-[34px] gap-y-[44px] px-6 pb-32 pt-[164px] md:px-16">
          {gifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>
        <SiteFooter />
      </main>
    </>
  );
}
