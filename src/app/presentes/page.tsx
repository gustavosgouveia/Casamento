import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { GiftCard } from "@/components/GiftCard";
import { SiteFooter } from "@/components/SiteFooter";
import { gifts } from "@/lib/gifts";
import { getPurchasedGiftIds } from "@/lib/supabase";

export const metadata = {
  title: "Presentes — Samira & Gustavo",
};

export default async function PresentesPage() {
  const purchased = await getPurchasedGiftIds();

  return (
    <>
      <Navigation />
      {/* Fixed faded couple photo behind the frosted gift grid */}
      <div className="fixed inset-0 -z-10">
        <Image src="/samiragustavo/02.jpg" alt="" fill sizes="100vw" className="object-cover grayscale" priority />
        <div className="absolute inset-0 bg-white/55" />
      </div>

      <main className="relative min-h-screen">
        <p className="mx-auto max-w-[680px] px-6 pt-[164px] text-center font-script text-[clamp(1.6rem,3vw,2.3rem)] leading-snug text-black/80">
          Sua presença é o nosso maior presente — mas, se quiser nos mimar, escolha um item e faça o Pix.
        </p>
        <div className="mx-auto flex max-w-[2400px] flex-wrap justify-center gap-x-[34px] gap-y-[44px] px-6 pb-32 pt-14 md:px-16">
          {gifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift} purchased={purchased.has(gift.id)} />
          ))}
        </div>
        <SiteFooter />
      </main>
    </>
  );
}
