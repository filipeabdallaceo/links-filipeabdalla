"use client";

import type { Product } from "@/lib/links";

/**
 * Each card has a unique typographic treatment for its title — emulating
 * the brand-asset-per-product look of bio sites like Rafael Kiso's, but using
 * pure CSS typography (we don't have unique logos per product).
 */
export function CardTitle({ product }: { product: Product }) {
  const Render = TITLE_STYLES[product.titleStyle ?? "default"] ?? Default;
  return <Render product={product} />;
}

type TitleProps = { product: Product };

const TITLE_STYLES: Record<string, (p: TitleProps) => React.ReactElement> = {
  // ───────── BOOTCAMP ELETROTERAPIA — split com ênfase no "Eletroterapia"
  "bootcamp-eletro": () => (
    <h3 className="font-display drop-shadow-lg">
      <span className="block text-[9px] sm:text-[10px] font-light tracking-[0.4em] text-orange-200/85 uppercase">
        Bootcamp
      </span>
      <span className="mt-0.5 block text-[18px] sm:text-2xl font-black italic leading-none tracking-tight bg-gradient-to-br from-white via-orange-100 to-orange-300 bg-clip-text text-transparent">
        Eletroterapia
      </span>
    </h3>
  ),

  // ───────── BOOTCAMP BRASIL — palavra "BRASIL" gigante + "inteiro" italic
  "bootcamp-brasil": () => (
    <h3 className="font-display drop-shadow-lg">
      <span className="block text-[9px] sm:text-[10px] font-medium tracking-[0.32em] text-cyan-200/80 uppercase">
        Bootcamp · 2026
      </span>
      <span className="mt-0.5 flex items-baseline gap-1.5">
        <span className="text-[22px] sm:text-3xl font-black tracking-tighter leading-none bg-gradient-to-b from-white to-cyan-200 bg-clip-text text-transparent">
          BRASIL
        </span>
        <span className="text-[11px] sm:text-xs font-light italic tracking-wide text-white/75">
          inteiro
        </span>
      </span>
    </h3>
  ),

  // ───────── MENTORIA EXPRESS — "MENTORIA" thin + "EXPRESS" massive bold
  "mentoria-express": () => (
    <h3 className="font-display drop-shadow-lg">
      <span className="block text-[9px] sm:text-[10px] font-light tracking-[0.5em] text-violet-200/80 uppercase">
        Mentoria
      </span>
      <span className="mt-0.5 block text-[20px] sm:text-[26px] font-black tracking-tight leading-none uppercase bg-gradient-to-r from-white via-violet-100 to-fuchsia-200 bg-clip-text text-transparent">
        Express<span className="text-fuchsia-300">⚡</span>
      </span>
    </h3>
  ),

  // ───────── CURSOS ONLINE — "Capacitação" italic flowing + "100% ONLINE" stamp
  "cursos-online": () => (
    <h3 className="font-display drop-shadow-lg">
      <span className="block text-[18px] sm:text-2xl font-bold italic leading-none tracking-tight text-white">
        Capacitação
      </span>
      <span className="mt-1 inline-block rounded-sm border border-fuchsia-300/40 bg-fuchsia-500/10 px-1.5 py-px text-[8px] sm:text-[9px] font-bold tracking-[0.25em] text-fuchsia-200 uppercase">
        100% Online
      </span>
    </h3>
  ),

  // ───────── AULA BÔNUS — "AULA" stencil + "Bônus" italic com asterisco
  "aula-bonus": () => (
    <h3 className="font-display drop-shadow-lg">
      <span className="flex items-baseline gap-1.5">
        <span className="text-[20px] sm:text-[26px] font-black tracking-[0.08em] leading-none text-white">
          AULA
        </span>
        <span className="text-[16px] sm:text-xl font-bold italic leading-none bg-gradient-to-r from-rose-200 to-fuchsia-300 bg-clip-text text-transparent">
          bônus
        </span>
        <span className="text-rose-300 text-base sm:text-lg leading-none">✦</span>
      </span>
      <span className="mt-1 block text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.3em] text-rose-200/75 uppercase">
        Online · ao vivo
      </span>
    </h3>
  ),

  // ───────── AGENDAR AVALIAÇÃO — "agendar" lowercase thin + "AVALIAÇÃO" massive
  avaliacao: () => (
    <h3 className="font-display drop-shadow-lg">
      <span className="block text-[12px] sm:text-sm font-light italic leading-none text-emerald-100/80 lowercase">
        agendar uma
      </span>
      <span className="mt-0.5 block text-[19px] sm:text-2xl font-black tracking-tight leading-none uppercase bg-gradient-to-r from-emerald-100 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
        Avaliação
      </span>
    </h3>
  ),

  // ───────── FALAR COM A CLÍNICA — typewriter / chat bubble feel
  clinica: () => (
    <h3 className="font-display drop-shadow-lg">
      <span className="block text-[9.5px] sm:text-[11px] font-medium tracking-[0.25em] text-lime-200/75 uppercase">
        WhatsApp
      </span>
      <span className="mt-0.5 block text-[16px] sm:text-xl font-bold leading-tight text-white">
        Falar com a{" "}
        <span className="italic font-light bg-gradient-to-r from-lime-200 to-green-300 bg-clip-text text-transparent">
          clínica
        </span>
      </span>
    </h3>
  ),

  // ───────── COMO CHEGAR — coordinates / map vibe
  "como-chegar": () => (
    <h3 className="font-display drop-shadow-lg">
      <span className="block text-[8.5px] sm:text-[10px] font-mono font-medium tracking-[0.3em] text-amber-200/75 uppercase">
        20°27&apos;S · 54°36&apos;W
      </span>
      <span className="mt-0.5 flex items-center gap-1.5 text-[18px] sm:text-2xl font-black tracking-tight leading-none uppercase">
        <span className="text-white">Como</span>
        <span className="bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
          chegar
        </span>
        <span className="text-amber-300 text-base sm:text-lg">→</span>
      </span>
    </h3>
  ),

  default: ({ product }: TitleProps) => <Default product={product} />,
};

function Default({ product }: TitleProps) {
  return (
    <h3 className="font-display text-[12.5px] sm:text-base font-bold leading-tight tracking-tight text-white drop-shadow-lg">
      {product.headline}
    </h3>
  );
}
