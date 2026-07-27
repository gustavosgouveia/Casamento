export interface Gift {
  id: number;
  title: string;
  price: string;
  image: string;
  purchased: boolean;
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
