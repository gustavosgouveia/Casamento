import type { NavLink, TimelineEntry, ScrollPanel } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Presentes", href: "/presentes" },
  { label: "Dicas e Instruções", href: "#" },
  { label: "Nossa história", href: "/#nossa-historia" },
];

export const hero = {
  name: "Samira & Gustavo",
  subtitle: "nas ditas linhas em que nos encontramos",
  date: "01 DE AGOSTO DE 2027",
  location: "Taubaté – SP",
  // Rótulos do contador. Antes do casamento usa "future"; depois, "past".
  countdownLabelFuture: "Faltam para o grande dia:",
  countdownLabelPast: "Casados há:",
  banners: [
    "/samiragustavo/03.jpg",
    "/samiragustavo/01.jpg",
    "/samiragustavo/04.jpg",
    "/samiragustavo/02.jpg",
  ],
  // Data do casamento. O contador conta regressivamente até ela (ou o tempo desde ela, se já passou).
  weddingDate: "2027-08-01T00:00:00",
};

export const timeline: TimelineEntry[] = [
  { index: "01.", date: "11 NOV 2022", label: "O COMEÇO", images: ["/samiragustavo/01.jpg", "/samiragustavo/04.jpg"] },
  { index: "02.", date: "12 AGO 2025", label: "O PEDIDO", images: ["/samiragustavo/02.jpg", "/samiragustavo/03.jpg"] },
  { index: "03.", date: "01 AGO 2027", label: "O CASAMENTO", images: ["/samiragustavo/04.jpg", "/samiragustavo/01.jpg"] },
];

export const scrollPanels: ScrollPanel[] = [
  {
    title: "A Cerimônia",
    cta: "Veja informações sobre nosso Grande Dia!",
    href: "#",
    image: "/folha2.jpg",
    theme: "light",
    address: ["Taubaté - SP"],
  },
  { title: "Lista de Presentes", cta: "Cheque nossa lista de presentes", href: "/presentes", image: "/tulipa.jpg", theme: "dark" },
  { title: "Código de Vestimenta", cta: "Confira o dresscode", href: "#", image: "/girassol.jpg", theme: "light" },
  { title: "Galeria", cta: "As fotos do nosso pré-wedding", href: "#", image: "/final.jpg", theme: "dark" },
];

export const story = {
  title: "Nossa história",
  body:
    "Kalmar, 1518-1519; Assim, costumávamos terminar nossos textos. Em uma cidade sonhada, " +
    "onde nos encontrávamos em nossas imaginações. Talvez você encontre algumas dezenas de poemas " +
    "escritos em nossas redes sociais com essa assinatura. Nos conhecemos em 10 de Abril de 2018. " +
    "Gosto (eu, o noivo), de pensar que - guardadas as devidas proporções -, nos encontramos em um " +
    "encontro às escuras do século XXI. Ela é meu primeiro amor.",
  cta: "Continue lendo...",
};
