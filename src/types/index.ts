export interface Gift {
  id: number;
  title: string;
  /** Valor em reais (número, usado no Pix). Exibição via formatBRL. */
  price: number;
  image: string;
}

export interface TimelineEntry {
  index: string;
  date: string;
  label: string;
  /** Duas fotos que alternam com a animação de flip (como no site original). */
  images: string[];
}

export interface ScrollPanel {
  title: string;
  cta: string;
  href: string;
  image: string;
  theme: "light" | "dark";
  address?: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

/** Estado retornado pelas Server Actions de formulário. */
export interface FormState {
  ok: boolean;
  message: string;
}
