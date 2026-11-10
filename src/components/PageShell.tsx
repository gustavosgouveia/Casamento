import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";

interface PageShellProps {
  title: string;
  /** Frase em script abaixo do título. */
  subtitle?: string;
  children: React.ReactNode;
}

// Moldura padrão das páginas internas: nav sólida, título editorial e rodapé.
export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white px-6 pb-24 pt-[164px] md:px-12">
        <header className="mx-auto mb-16 max-w-[1100px] text-center">
          <h1 className="font-serif-display text-[clamp(2.6rem,7vw,5.5rem)] font-extralight uppercase leading-[0.95] text-[var(--ink)]">
            {title}
          </h1>
          {subtitle && <p className="mt-4 font-script text-[clamp(1.6rem,3vw,2.3rem)] text-[var(--gold)]">{subtitle}</p>}
          <span className="mx-auto mt-8 block h-px w-28 bg-[var(--gold)]" />
        </header>
        <div className="mx-auto max-w-[1100px]">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
