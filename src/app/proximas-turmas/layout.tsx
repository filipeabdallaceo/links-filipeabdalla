import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bootcamp · Próximas Turmas — Dr. Filipe Abdalla",
  description:
    "Bootcamp Eletroterapia chegando em 4 cidades em 2026: Florianópolis, Campo Grande, Brasília e São Paulo. Entre na lista de espera da sua cidade.",
  openGraph: {
    title: "Bootcamp · Próximas Turmas — Dr. Filipe Abdalla",
    description:
      "4 cidades confirmadas em 2026. Garante sua vaga ou entra na lista de espera.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function ProximasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
