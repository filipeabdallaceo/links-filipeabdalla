"use client";

import Image from "next/image";
import { useRef } from "react";
import { Avatar } from "@/components/Avatar";
import { ProductCard } from "@/components/ProductCard";
import { ScrollLines } from "@/components/ScrollLines";
import { SocialIcons } from "@/components/SocialIcons";
import { PRODUCTS } from "@/lib/links";

export default function Home() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 py-8 sm:px-6 sm:py-12">
      <header className="flex flex-col items-center text-center">
        <Avatar />

        <div className="relative mt-5 flex flex-col items-center">
          <Image
            src="/img/logo.png"
            alt="Filipe Abdalla — Fisioterapeuta Esportivo"
            width={280}
            height={280}
            priority
            className="h-auto w-44 sm:w-52"
          />
          <span className="-mt-1 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            PhD
          </span>
        </div>

        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
          Qualificando profissionais com qualidade e excelência.
        </p>
      </header>

      <section
        ref={sectionRef}
        aria-label="Produtos e atendimento"
        className="relative mt-10 grid w-full grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-5 sm:gap-y-8"
      >
        <ScrollLines sectionRef={sectionRef} />
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </section>

      <div className="mt-12">
        <SocialIcons />
      </div>

      <footer className="mt-auto pt-12 pb-2 text-center text-[11px] text-white/35">
        <p>© {new Date().getFullYear()} Dr. Filipe Abdalla</p>
        <p className="mt-1">CREFITO · Fisioterapia Esportiva</p>
      </footer>
    </main>
  );
}
