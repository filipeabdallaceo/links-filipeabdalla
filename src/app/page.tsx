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
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 py-3 sm:px-6 sm:py-12">
      <header className="flex flex-col items-center text-center">
        <Avatar />

        <div className="relative mt-1.5 sm:mt-5 flex flex-col items-center">
          <Image
            src="/img/logo.png"
            alt="Filipe Abdalla - Fisioterapeuta Esportivo"
            width={280}
            height={280}
            priority
            className="h-auto w-20 sm:w-52"
          />
          <span className="-mt-0.5 sm:-mt-1 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-1.5 py-px sm:px-2 sm:py-0.5 text-[7px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            PhD
          </span>
        </div>

        <p className="mt-1.5 sm:mt-4 max-w-[260px] sm:max-w-[340px] text-[10.5px] sm:text-sm leading-snug sm:leading-relaxed text-white/75">
          <span className="font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(251,191,36,0.25)]">
            Resolvo dores e lesões
          </span>{" "}
          com tecnologia avançada.
          <br />
          <span className="text-white/55">
            Ensino Fisioterapeutas a fazerem o mesmo.
          </span>
        </p>
      </header>

      <section
        ref={sectionRef}
        aria-label="Produtos e atendimento"
        className="relative mt-3 sm:mt-10 grid w-full grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-5 sm:gap-y-8"
      >
        <ScrollLines sectionRef={sectionRef} />
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </section>

      <div className="mt-6 sm:mt-12">
        <SocialIcons />
      </div>

      <footer className="mt-auto pt-6 pb-2 text-center text-[9px] sm:text-[11px] text-white/35">
        <p>© {new Date().getFullYear()} Dr. Filipe Abdalla</p>
        <p className="mt-0.5 sm:mt-1">CREFITO · Fisioterapia Esportiva</p>
      </footer>
    </main>
  );
}
