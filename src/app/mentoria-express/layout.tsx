import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentoria Express · Dr. Filipe Abdalla — PhD",
  description:
    "Acesso direto ao raciocínio clínico do Dr. Filipe. 3 perguntas em áudio personalizado pelo WhatsApp. 45 dias para usar. Garantia tripla.",
  openGraph: {
    title: "Mentoria Express · Dr. Filipe Abdalla — PhD",
    description:
      "Você manda o caso. Eu respondo por áudio. Consultoria de PhD na palma da sua mão.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function MentoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
