export type IconName =
  | "message"
  | "map"
  | "calendar"
  | "sparkles"
  | "graduation"
  | "stethoscope"
  | "zap"
  | "gift";

export type CustomBanner = "brazil-map";

export type Product = {
  id: string;
  eyebrow: string;
  headline: string;
  ctaLabel: string;
  href: string;
  iconName: IconName;
  image?: string;
  /** Tailwind object-position class. Use to keep faces in frame on landscape crops. */
  imagePosition?: string;
  /** Special hand-rendered banner (overrides image). */
  customBanner?: CustomBanner;
  /** Tailwind gradient classes used on the CTA button. */
  ctaGradient: string;
  /** Gradient backdrop behind the banner image. */
  bannerGradient: string;
  /** Typographic style ID for the headline overlay (one of the keys in TITLE_STYLES). */
  titleStyle?:
    | "bootcamp-eletro"
    | "bootcamp-brasil"
    | "mentoria-express"
    | "cursos-online"
    | "aula-bonus"
    | "avaliacao"
    | "clinica"
    | "como-chegar";
};

export const PRODUCTS: Product[] = [
  {
    id: "bootcamp-atual",
    eyebrow: "Bootcamp Florianópolis",
    headline: "Bootcamp Eletroterapia",
    ctaLabel: "Quero garantir minha vaga",
    href: "https://bootcamp.filipeabdalla.com/",
    iconName: "sparkles",
    image: "/img/bootcamp.jpg",
    imagePosition: "object-[50%_25%]",
    titleStyle: "bootcamp-eletro",
    ctaGradient: "from-orange-500 via-red-500 to-pink-500",
    bannerGradient: "from-orange-500/20 via-red-500/20 to-pink-500/20",
  },
  {
    id: "bootcamp-proximas",
    eyebrow: "Próximas turmas",
    headline: "Bootcamp · Brasil inteiro",
    ctaLabel: "Quero saber as datas",
    href: "https://bootcamp.filipeabdalla.com/",
    iconName: "calendar",
    customBanner: "brazil-map",
    titleStyle: "bootcamp-brasil",
    ctaGradient: "from-cyan-400 via-blue-500 to-indigo-600",
    bannerGradient: "from-cyan-400/30 via-blue-500/30 to-indigo-600/30",
  },
  {
    id: "mentoria-express",
    eyebrow: "Mentoria 1:1",
    headline: "Mentoria Express",
    ctaLabel: "Quero a mentoria",
    href: "https://wa.me/5567992076011?text=Ol%C3%A1%21+Tenho+interesse+na+Mentoria+Express+com+o+Dr.+Filipe+Abdalla.",
    iconName: "zap",
    image: "/img/mentoria.jpg",
    imagePosition: "object-[50%_30%]",
    titleStyle: "mentoria-express",
    ctaGradient: "from-violet-500 via-purple-500 to-indigo-600",
    bannerGradient: "from-violet-500/20 via-purple-500/20 to-indigo-600/20",
  },
  {
    id: "cursos-online",
    eyebrow: "Curso Online",
    headline: "Capacitação a distância",
    ctaLabel: "Quero ver os cursos",
    href: "https://filipeabdalla.com.br/cursos/",
    iconName: "graduation",
    image: "/img/cursos.jpg",
    imagePosition: "object-[50%_30%]",
    titleStyle: "cursos-online",
    ctaGradient: "from-purple-600 via-fuchsia-500 to-pink-500",
    bannerGradient: "from-purple-600/20 via-fuchsia-500/20 to-pink-500/20",
  },
  {
    id: "aula-bonus",
    eyebrow: "Aula ao vivo",
    headline: "Aula Bônus",
    ctaLabel: "Quero participar",
    href: "https://wa.me/5567992076011?text=Ol%C3%A1%21+Quero+garantir+minha+vaga+na+Aula+B%C3%B4nus.",
    iconName: "gift",
    image: "/img/aula.jpg",
    imagePosition: "object-[50%_25%]",
    titleStyle: "aula-bonus",
    ctaGradient: "from-rose-400 via-pink-500 to-fuchsia-600",
    bannerGradient: "from-rose-400/20 via-pink-500/20 to-fuchsia-600/20",
  },
  {
    id: "agendar-avaliacao",
    eyebrow: "Para Pacientes",
    headline: "Agendar avaliação",
    ctaLabel: "Agendar minha avaliação",
    href: "https://wa.me/5567992076011?text=Ol%C3%A1%21+Gostaria+de+agendar+uma+avalia%C3%A7%C3%A3o+com+o+Dr.+Filipe+Abdalla.",
    iconName: "stethoscope",
    image: "/img/avaliacao.jpg",
    imagePosition: "object-[50%_30%]",
    titleStyle: "avaliacao",
    ctaGradient: "from-emerald-400 via-teal-500 to-cyan-500",
    bannerGradient: "from-emerald-400/20 via-teal-500/20 to-cyan-500/20",
  },
  {
    id: "whatsapp-clinica",
    eyebrow: "Outras dúvidas",
    headline: "Falar com a clínica",
    ctaLabel: "Chamar no WhatsApp",
    href: "https://wa.me/5567992076011",
    iconName: "message",
    image: "/img/filipe.jpg",
    imagePosition: "object-[50%_25%]",
    titleStyle: "clinica",
    ctaGradient: "from-lime-400 via-green-500 to-emerald-600",
    bannerGradient: "from-lime-400/20 via-green-500/20 to-emerald-600/20",
  },
  {
    id: "como-chegar",
    eyebrow: "Localização",
    headline: "Como chegar",
    ctaLabel: "Abrir rota no Maps",
    href: "https://www.google.com/maps/dir/?api=1&destination=Rua+Dr.+Michel+Scaff%2C+93%2C+Ch%C3%A1cara+Cachoeira%2C+Campo+Grande+-+MS%2C+79040-860",
    iconName: "map",
    image: "/img/clinica.jpg",
    titleStyle: "como-chegar",
    ctaGradient: "from-amber-400 via-orange-500 to-red-500",
    bannerGradient: "from-amber-400/20 via-orange-500/20 to-red-500/20",
  },
];

export function getLinkById(id: string): Product | undefined {
  return PRODUCTS.find((l) => l.id === id);
}

export const LINKS = PRODUCTS.map((p) => ({
  id: p.id,
  label: p.headline,
  description: p.eyebrow,
  href: p.href,
}));
