"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/content";
import { Logo } from "@/components/Logo";

interface NavigationProps {
  /** Home page has a full-screen photo hero: nav starts transparent/white and turns solid on scroll. */
  overHero?: boolean;
}

export function Navigation({ overHero = false }: NavigationProps) {
  const pathname = usePathname();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolledPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  // Pages without a hero are always solid; the hero page turns solid past the fold.
  const dark = overHero ? scrolledPastHero : true;

  // Only real page routes get the active (script) treatment.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : href === "/presentes" && pathname.startsWith("/presentes");

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[112px] px-6 md:px-12",
        "flex items-center transition-[background-color,box-shadow,color] duration-500",
        dark
          ? "bg-white/95 text-[var(--ink)] shadow-[0_1px_0_rgba(0,0,0,0.08)] backdrop-blur-sm"
          : "bg-transparent text-white",
      )}
    >
      {/* Logo (left) */}
      <Link href="/" className="relative z-10 flex items-center" aria-label="Início">
        <Logo variant={dark ? "dark" : "light"} className="h-12 w-auto" />
      </Link>

      {/* Centered link group (desktop) */}
      <ul className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "transition-opacity hover:opacity-60",
                  active
                    ? "font-script text-[42px] leading-none lowercase"
                    : "text-[16px] font-medium uppercase tracking-[0.02em]",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile hamburger (right) */}
      <button
        type="button"
        aria-label="Menu"
        onClick={() => setMenuOpen((v) => !v)}
        className="absolute right-6 z-10 flex flex-col gap-[5px] lg:hidden"
      >
        <span className={cn("h-[2px] w-6 bg-current transition-transform", menuOpen && "translate-y-[7px] rotate-45")} />
        <span className={cn("h-[2px] w-6 bg-current transition-opacity", menuOpen && "opacity-0")} />
        <span className={cn("h-[2px] w-6 bg-current transition-transform", menuOpen && "-translate-y-[7px] -rotate-45")} />
      </button>

      {/* Mobile menu panel */}
      <div
        className={cn(
          "absolute inset-x-0 top-[112px] origin-top bg-white text-[var(--ink)] shadow-lg transition-all lg:hidden",
          menuOpen ? "visible scale-y-100 opacity-100" : "invisible scale-y-95 opacity-0",
        )}
      >
        <ul className="flex flex-col items-center gap-5 py-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "text-[15px] font-medium uppercase tracking-[0.04em]",
                  isActive(link.href) && "font-script text-[34px] normal-case tracking-normal",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
