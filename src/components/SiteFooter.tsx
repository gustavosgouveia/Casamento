import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer>
      <div className="flex items-center justify-center border-t border-[#e6e6e6] bg-white py-14">
        <Logo className="h-16 w-auto" />
      </div>
    </footer>
  );
}
