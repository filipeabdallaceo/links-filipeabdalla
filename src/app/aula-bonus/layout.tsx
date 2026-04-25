import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aula Bônus ao Vivo · Dr. Filipe Abdalla - PhD",
  description:
    "Revisão completa de eletroterapia ao vivo com Dr. Filipe. 90 minutos de aula + casos clínicos + Q&A. Gravação disponível por 30 dias.",
  openGraph: {
    title: "Aula Bônus ao Vivo · Dr. Filipe Abdalla - PhD",
    description:
      "90 minutos de eletroterapia aplicada ao vivo. Casos clínicos reais + Q&A direto com PhD.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function AulaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
