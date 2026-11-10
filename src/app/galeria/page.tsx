import { PageShell } from "@/components/PageShell";
import { GalleryGrid } from "@/components/GalleryGrid";
import { gallery } from "@/lib/content";

export const metadata = { title: "Galeria — Samira & Gustavo" };

export default function GaleriaPage() {
  return (
    <PageShell title="Galeria" subtitle="nosso pré-wedding">
      <GalleryGrid images={gallery} />
    </PageShell>
  );
}
