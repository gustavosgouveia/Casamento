import type { NavLink, TimelineEntry, ScrollPanel } from "@/types";

// Itens marcados com "TODO casal" são textos provisórios: substituam pelas informações reais.

export const navLinks: NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Presentes", href: "/presentes" },
  { label: "Dicas e Instruções", href: "/dicas" },
  { label: "Nossa história", href: "/nossa-historia" },
  { label: "Recados", href: "/recados" },
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

export const ceremony = {
  date: "01 de Agosto de 2027",
  time: "16h00", // TODO casal: horário real
  venue: "Local a confirmar", // TODO casal: nome do espaço
  address: "Taubaté - SP", // TODO casal: endereço completo (também alimenta o mapa)
  // Início/fim no fuso de Brasília (UTC-3) para o arquivo de calendário.
  startISO: "2027-08-01T16:00:00-03:00",
  endISO: "2027-08-01T23:59:00-03:00",
  notes: [
    "Pedimos que cheguem com 30 minutos de antecedência.", // TODO casal: revisar
    "A cerimônia e a recepção acontecerão no mesmo local.",
  ],
};

export const scrollPanels: ScrollPanel[] = [
  {
    title: "A Cerimônia",
    cta: "Veja informações sobre nosso Grande Dia!",
    href: "/cerimonia",
    image: "/folha2.jpg",
    theme: "light",
    address: [ceremony.address],
  },
  { title: "Lista de Presentes", cta: "Cheque nossa lista de presentes", href: "/presentes", image: "/tulipa.jpg", theme: "dark" },
  { title: "Código de Vestimenta", cta: "Confira o dresscode", href: "/dress-code", image: "/girassol.jpg", theme: "light" },
  { title: "Galeria", cta: "As fotos do nosso pré-wedding", href: "/galeria", image: "/final.jpg", theme: "dark" },
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
  // Texto completo da página /nossa-historia (um item por parágrafo). TODO casal: continuar a história.
  full: [
    "Kalmar, 1518-1519; Assim, costumávamos terminar nossos textos. Em uma cidade sonhada, onde nos encontrávamos em nossas imaginações. Talvez você encontre algumas dezenas de poemas escritos em nossas redes sociais com essa assinatura.",
    "Nos conhecemos em 10 de Abril de 2018. Gosto (eu, o noivo), de pensar que - guardadas as devidas proporções -, nos encontramos em um encontro às escuras do século XXI. Ela é meu primeiro amor.",
  ],
};

export const tips = {
  sections: [
    {
      title: "Como chegar",
      body: "Taubaté fica a cerca de 130 km de São Paulo pela Rodovia Presidente Dutra (BR-116). O endereço completo e o mapa estão na página da cerimônia.", // TODO casal: revisar
    },
    {
      title: "Hospedagem",
      body: "Em breve indicaremos hotéis próximos ao local da festa.", // TODO casal: lista de hotéis
    },
    {
      title: "Estacionamento",
      body: "Informações sobre estacionamento serão divulgadas em breve.", // TODO casal
    },
  ],
  faq: [
    { q: "Posso levar acompanhante?", a: "O convite é nominal. Em caso de dúvida, fale com a gente." }, // TODO casal
    { q: "Crianças são bem-vindas?", a: "A definir." }, // TODO casal
    { q: "Como dou um presente?", a: "Na página Presentes, escolha um item e faça o Pix com o QR Code ou o copia e cola." },
  ],
};

export const dressCode = {
  style: "Esporte fino", // TODO casal: traje
  description:
    "Queremos todos confortáveis e elegantes. Tecidos leves combinam com o clima de agosto, e sapatos confortáveis ajudam na pista!", // TODO casal
  palette: ["#a8895c", "#c9b79c", "#7d8471", "#5b6b7a", "#2f2f2f"], // TODO casal: cores sugeridas
  avoid: ["Branco e tons muito claros (reservados para a noiva)"], // TODO casal
};

// TODO casal: adicionar fotos do pré-wedding em /public/samiragustavo/ e listar aqui.
export const gallery = [
  "/samiragustavo/01.jpg",
  "/samiragustavo/02.jpg",
  "/samiragustavo/03.jpg",
  "/samiragustavo/04.jpg",
];

export const pix = {
  key: "", // TODO casal: chave Pix (e-mail, telefone +55..., CPF ou aleatória). Vazia = modal avisa "em breve".
  receiverName: "SAMIRA E GUSTAVO", // até 25 caracteres, sem acento
  receiverCity: "TAUBATE", // até 15 caracteres, sem acento
};

// Link do botão "Confirme sua presença" (ex.: https://wa.me/5512999999999). Vazio = botão oculto.
export const rsvpHref = ""; // TODO casal
