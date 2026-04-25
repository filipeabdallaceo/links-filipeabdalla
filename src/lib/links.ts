export type IconName =
  | "message"
  | "map"
  | "calendar"
  | "sparkles"
  | "graduation"
  | "stethoscope";

export type Product = {
  id: string;
  size: "hero" | "large" | "small";
  eyebrow: string;
  headline: string;
  description: string;
  bullets?: string[];
  ctaLabel: string;
  href: string;
  iconName: IconName;
  image?: string;
  highlight?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "bootcamp-atual",
    size: "hero",
    eyebrow: "🔥 TURMA ATUAL · PRESENCIAL",
    headline: "Bootcamp Eletroterapia · Florianópolis",
    description:
      "3 dias intensivos pra você dominar eletroterapia com evidência, segurança e prática hands-on. Pare de apertar botão.",
    bullets: [
      "Metodologia PULSE — passo a passo replicável na clínica",
      "Prática supervisionada em pacientes reais",
      "Certificação + comunidade vitalícia",
    ],
    ctaLabel: "Quero garantir minha vaga",
    href: "https://bootcamp.filipeabdalla.com/",
    iconName: "sparkles",
    highlight: true,
  },
  {
    id: "bootcamp-proximas",
    size: "large",
    eyebrow: "🗓️ PRÓXIMAS DATAS",
    headline: "Bootcamp em outras cidades",
    description:
      "Não consegue ir agora a Florianópolis? Veja as próximas turmas e entre na lista de espera da sua cidade.",
    bullets: [
      "Datas e cidades confirmadas",
      "Lista de espera prioritária",
    ],
    ctaLabel: "Ver próximas datas",
    href: "https://bootcamp.filipeabdalla.com/",
    iconName: "calendar",
  },
  {
    id: "cursos-online",
    size: "large",
    eyebrow: "💻 100% ONLINE",
    headline: "Cursos Online",
    description:
      "Capacitação a distância pra fisioterapeutas que querem se especializar com a metodologia que já formou centenas de profissionais.",
    bullets: [
      "Acesso vitalício às aulas",
      "Conteúdo prático aplicável amanhã",
    ],
    ctaLabel: "Ver todos os cursos",
    href: "https://filipeabdalla.com.br/cursos/",
    iconName: "graduation",
  },
  {
    id: "agendar-avaliacao",
    size: "large",
    eyebrow: "🩺 PARA PACIENTES",
    headline: "Agendar avaliação com Dr. Filipe Abdalla",
    description:
      "Avaliação completa e plano de tratamento individualizado pra atletas, esportistas e quem busca recuperação de alta performance.",
    bullets: [
      "Atendimento com fisioterapeuta esportivo PhD",
      "Diagnóstico funcional + plano personalizado",
      "Agendamento direto pelo WhatsApp",
    ],
    ctaLabel: "Agendar minha avaliação",
    href: "https://wa.me/5567992076011?text=Ol%C3%A1%21+Gostaria+de+agendar+uma+avalia%C3%A7%C3%A3o+com+o+Dr.+Filipe+Abdalla.",
    iconName: "stethoscope",
  },
  {
    id: "whatsapp-clinica",
    size: "small",
    eyebrow: "💬 OUTRAS DÚVIDAS",
    headline: "Falar com a clínica",
    description:
      "Dúvidas gerais, parcerias e informações administrativas.",
    ctaLabel: "Chamar no WhatsApp",
    href: "https://wa.me/5567992076011",
    iconName: "message",
  },
  {
    id: "como-chegar",
    size: "small",
    eyebrow: "📍 LOCALIZAÇÃO",
    headline: "Como chegar à clínica",
    description: "R. Dr. Michel Scaff, 93 · Chácara Cachoeira · Campo Grande/MS",
    ctaLabel: "Abrir rota no Maps",
    href: "https://www.google.com/maps/dir/?api=1&destination=Rua+Dr.+Michel+Scaff%2C+93%2C+Ch%C3%A1cara+Cachoeira%2C+Campo+Grande+-+MS%2C+79040-860",
    iconName: "map",
  },
];

export function getLinkById(id: string): Product | undefined {
  return PRODUCTS.find((l) => l.id === id);
}

// Backward-compat alias for the dashboard analytics
export const LINKS = PRODUCTS.map((p) => ({
  id: p.id,
  label: p.headline,
  description: p.description,
  href: p.href,
}));
