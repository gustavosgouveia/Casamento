"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { cn } from "@/lib/utils";
import { formatBRL } from "@/lib/gifts";
import { pixPayload } from "@/lib/pix";
import { pix } from "@/lib/content";
import { registerGift } from "@/app/actions";
import type { FormState, Gift } from "@/types";

const initial: FormState = { ok: false, message: "" };

const fieldClass =
  "w-full rounded-[10px] border border-black/20 bg-white/80 px-4 py-3 text-[15px] text-black outline-none focus:border-[var(--gold)]";

export function GiftCard({ gift, purchased }: { gift: Gift; purchased: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };

  return (
    <article className="flex w-[300px] flex-col items-center rounded-[18px] border border-[#dddddd] bg-white/[0.44] p-8 shadow-[0_4px_8px_rgba(0,0,0,0.25)] backdrop-blur-[11.3px]">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[8px]">
        <Image src={gift.image} alt={gift.title} fill sizes="236px" className="object-cover" />
      </div>

      <h3 className="mt-6 min-h-[2.6em] text-center text-[16px] font-normal uppercase leading-tight text-black">
        {gift.title}
      </h3>

      <p className="mt-2 text-center text-[16px] font-bold text-black">{formatBRL(gift.price)}</p>

      <button
        type="button"
        disabled={purchased}
        onClick={show}
        className={cn(
          "mt-5 rounded-[30px] border-2 px-[23px] py-[13px] font-serif-display text-[18px] italic leading-none transition-colors",
          purchased
            ? "cursor-default border-black/25 text-black/50"
            : "cursor-pointer border-black/50 text-black/85 hover:border-black hover:bg-black hover:text-white",
        )}
      >
        {purchased ? "Presenteado" : "Ver detalhes"}
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-auto w-[min(92vw,460px)] rounded-[18px] p-0 backdrop:bg-black/60"
      >
        {open && <GiftDetails gift={gift} onClose={() => dialogRef.current?.close()} />}
      </dialog>
    </article>
  );
}

function GiftDetails({ gift, onClose }: { gift: Gift; onClose: () => void }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(registerGift.bind(null, gift.id), initial);
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);

  const code = pix.key
    ? pixPayload({ key: pix.key, receiverName: pix.receiverName, receiverCity: pix.receiverCity, amount: gift.price, txid: `PRESENTE${gift.id}` })
    : "";

  useEffect(() => {
    if (code) QRCode.toDataURL(code, { margin: 1, width: 440 }).then(setQr);
  }, [code]);

  // Depois de registrar, recarrega os dados do servidor para o card virar "Presenteado".
  useEffect(() => {
    if (state.ok) router.refresh();
  }, [state.ok, router]);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative max-h-[90vh] overflow-y-auto p-7 text-center text-black">
      <button type="button" onClick={onClose} aria-label="Fechar" className="absolute right-4 top-3 text-[26px] leading-none text-black/60 hover:text-black">
        ×
      </button>

      <h2 className="font-serif-display text-[24px] uppercase leading-tight">{gift.title}</h2>
      <p className="mt-1 text-[18px] font-bold">{formatBRL(gift.price)}</p>

      {code ? (
        <>
          {qr ? (
            // eslint-disable-next-line @next/next/no-img-element -- data URL gerada no cliente
            <img src={qr} alt="QR Code Pix" className="mx-auto mt-5 size-[220px]" />
          ) : (
            <div className="mx-auto mt-5 size-[220px] animate-pulse rounded bg-black/5" />
          )}
          <p className="mt-3 text-[13px] text-black/60">Aponte a câmera do app do banco ou use o copia e cola:</p>
          <button
            type="button"
            onClick={copy}
            className="mt-3 w-full rounded-full border border-[var(--gold)] px-6 py-3 font-script text-[20px] leading-none text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-white"
          >
            {copied ? "Código copiado!" : "Copiar código Pix"}
          </button>
        </>
      ) : (
        <p className="mt-5 text-[15px] text-black/70">A chave Pix estará disponível em breve.</p>
      )}

      {state.ok ? (
        <p className="mt-6 font-script text-[26px] text-[var(--gold)]" aria-live="polite">
          {state.message}
        </p>
      ) : (
        <form action={formAction} className="mt-6 space-y-3 border-t border-black/10 pt-6 text-left">
          <p className="text-center text-[14px] text-black/70">Já fez o Pix? Conte pra gente quem presenteou:</p>
          <input name="name" required maxLength={80} placeholder="Seu nome" className={fieldClass} />
          <textarea name="message" maxLength={500} rows={3} placeholder="Deixe um recado (opcional)" className={fieldClass} />
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
          {state.message && (
            <p className="text-[14px] text-red-700" aria-live="polite">
              {state.message}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-black px-6 py-3 font-serif-display text-[18px] italic text-white transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {pending ? "Enviando..." : "Já fiz o Pix"}
          </button>
        </form>
      )}
    </div>
  );
}
