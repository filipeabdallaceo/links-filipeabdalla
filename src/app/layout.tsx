import type { Metadata, Viewport } from "next";
import { Comfortaa, Nunito_Sans } from "next/font/google";
import "./globals.css";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://links.filipeabdalla.com"),
  title: "Filipe Abdalla — Fisioterapeuta Esportivo",
  description:
    "Resolvo dores e lesões com tecnologia avançada. Ensino Fisioterapeutas a fazerem o mesmo.",
  openGraph: {
    title: "Filipe Abdalla — Fisioterapeuta Esportivo",
    description:
      "Resolvo dores e lesões com tecnologia avançada. Ensino Fisioterapeutas a fazerem o mesmo.",
    url: "https://links.filipeabdalla.com",
    siteName: "Filipe Abdalla",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filipe Abdalla — Fisioterapeuta Esportivo",
    description:
      "Resolvo dores e lesões com tecnologia avançada. Ensino Fisioterapeutas a fazerem o mesmo.",
    images: ["/img/og.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#000330",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${comfortaa.variable} ${nunito.variable} antialiased`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
