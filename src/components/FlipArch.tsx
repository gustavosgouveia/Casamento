"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface FlipArchProps {
  images: string[];
  /** número exibido sobreposto (ex.: "01.") */
  number: string;
  interval?: number;
  delay?: number;
}

// Arco do "Save the Date": 2 fotos que alternam com flip 3D (como o site original),
// e o número com efeito dois-tons — branco sobre a foto, preto onde escapa do arco.
export function FlipArch({ images, number, interval = 4200, delay = 0 }: FlipArchProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => setActive((a) => (a + 1) % images.length), interval);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [images.length, interval, delay]);

  const numberClass =
    "pointer-events-none absolute bottom-[-6px] right-[-30px] font-serif-display font-normal leading-none text-[clamp(3.25rem,5.8vw,5.9rem)]";

  return (
    <div className="relative w-full" style={{ perspective: "1200px" }}>
      {/* Número PRETO (atrás): aparece onde o número escapa do arco, sobre o fundo branco */}
      <span className={`${numberClass} z-[1] text-[#111]`} aria-hidden>
        {number}
      </span>

      {/* Arco (pílula) com as fotos — recorta o número branco */}
      <div className="relative z-[2] aspect-[275/500] w-full overflow-hidden rounded-[300px] [transform-style:preserve-3d]">
        {images.map((src, i) => (
          <Image
            key={src + i}
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 32vw, 22vw"
            className="object-cover grayscale transition-[transform,opacity] duration-700 ease-in-out [backface-visibility:hidden]"
            style={{
              transform: i === active ? "rotateY(0deg)" : "rotateY(180deg)",
              opacity: i === active ? 1 : 0,
              zIndex: i === active ? 2 : 1,
            }}
          />
        ))}

        {/* Número BRANCO (dentro do arco, recortado pela foto) */}
        <span className={`${numberClass} z-[3] text-white`}>{number}</span>
      </div>
    </div>
  );
}
