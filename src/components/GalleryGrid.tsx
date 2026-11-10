"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// Grade de fotos + lightbox com <dialog> nativo (Esc fecha, foco preso pelo browser).
export function GalleryGrid({ images }: { images: string[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);

  const open = (i: number) => {
    setCurrent(i);
    dialogRef.current?.showModal();
  };
  const step = (delta: number) => setCurrent((c) => (c + delta + images.length) % images.length);

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {images.map((src, i) => (
          <li key={src} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => open(i)}
              className="block w-full overflow-hidden rounded-[12px]"
              aria-label={`Abrir foto ${i + 1}`}
            >
              <Image
                src={src}
                alt=""
                width={800}
                height={1000}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full grayscale transition duration-500 hover:scale-[1.02] hover:grayscale-0"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-[92vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-black/85"
      >
        <div className="relative">
          <Image
            src={images[current]}
            alt={`Foto ${current + 1} de ${images.length}`}
            width={1600}
            height={2000}
            sizes="92vw"
            className="h-auto max-h-[92vh] w-auto rounded-[8px] object-contain"
          />
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-3">
            {[
              ["‹", "Anterior", -1],
              ["›", "Próxima", 1],
            ].map(([sym, label, delta]) => (
              <button
                key={label}
                type="button"
                aria-label={String(label)}
                onClick={() => step(Number(delta))}
                className="size-11 rounded-full bg-white/85 text-[24px] leading-none text-black hover:bg-white"
              >
                {sym}
              </button>
            ))}
            <button
              type="button"
              aria-label="Fechar"
              onClick={() => dialogRef.current?.close()}
              className="size-11 rounded-full bg-white/85 text-[20px] leading-none text-black hover:bg-white"
            >
              ×
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
