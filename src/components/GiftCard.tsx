import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Gift } from "@/types";

export function GiftCard({ gift }: { gift: Gift }) {
  return (
    <article
      className="flex w-[300px] flex-col items-center rounded-[18px] border border-[#dddddd] bg-white/[0.44] p-8 shadow-[0_4px_8px_rgba(0,0,0,0.25)] backdrop-blur-[11.3px]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px]">
        <Image
          src={gift.image}
          alt={gift.title}
          fill
          sizes="236px"
          className="object-cover"
        />
      </div>

      <h3 className="mt-6 min-h-[2.6em] text-center text-[16px] font-normal uppercase leading-tight text-black">
        {gift.title}
      </h3>

      <p className="mt-2 text-center text-[16px] font-bold text-black">{gift.price}</p>

      <button
        type="button"
        disabled={gift.purchased}
        className={cn(
          "mt-5 rounded-[30px] border-2 px-[23px] py-[13px] font-serif-display text-[18px] italic leading-none transition-colors",
          gift.purchased
            ? "cursor-default border-black/25 text-black/50"
            : "cursor-pointer border-black/50 text-black/85 hover:border-black hover:bg-black hover:text-white",
        )}
      >
        {gift.purchased ? "Comprado" : "Ver detalhes"}
      </button>
    </article>
  );
}
