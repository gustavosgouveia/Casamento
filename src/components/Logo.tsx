interface LogoProps {
  /** "dark" = monograma preto (fundos claros); "light" = branco (fundos escuros). */
  variant?: "dark" | "light";
  className?: string;
}

// Monograma SG (Samira & Gustavo). SVGs recortados em /public/samiragustavo/.
export function Logo({ variant = "dark", className }: LogoProps) {
  const src = variant === "light" ? "/samiragustavo/sg-branco.svg" : "/samiragustavo/sg-preto.svg";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Samira & Gustavo" className={className} />
  );
}
