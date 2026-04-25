"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  GraduationCap,
  MapPin,
  MessageCircle,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { IconName, Product } from "@/lib/links";

const ICONS: Record<IconName, LucideIcon> = {
  message: MessageCircle,
  map: MapPin,
  calendar: Calendar,
  sparkles: Sparkles,
  graduation: GraduationCap,
  stethoscope: Stethoscope,
};

type Props = { product: Product; index: number };

export function ProductCard({ product, index }: Props) {
  if (product.size === "small") return <SmallCard product={product} index={index} />;
  return <LargeCard product={product} index={index} />;
}

function LargeCard({ product, index }: Props) {
  const Icon = ICONS[product.iconName];
  const isHero = product.size === "hero";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.08, ease: "easeOut" }}
      className={[
        "relative overflow-hidden rounded-3xl",
        isHero
          ? "border border-[#03A0CD]/55 shadow-[0_20px_60px_-20px_rgba(3,160,205,0.55)]"
          : "border border-[#03A0CD]/22 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]",
      ].join(" ")}
    >
      <Banner product={product} Icon={Icon} />

      <div
        className={[
          "p-5 sm:p-6",
          isHero
            ? "bg-gradient-to-br from-[#02097D] to-[#000330]"
            : "bg-[#000a36]/90 backdrop-blur-md",
        ].join(" ")}
      >
        <h3
          className={[
            "font-display font-bold tracking-tight text-[#F4F4F4]",
            isHero ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
          ].join(" ")}
        >
          {product.headline}
        </h3>

        <p className="mt-2 text-[14px] sm:text-[15px] leading-relaxed text-[#F4F4F4]/75">
          {product.description}
        </p>

        {product.bullets && product.bullets.length > 0 && (
          <ul className="mt-4 space-y-2">
            {product.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 text-[13.5px] sm:text-sm text-[#F4F4F4]/85"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#03A0CD]/20 text-[#03A0CD]">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={`/api/click?id=${product.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "btn-shine group relative mt-5 flex items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-3.5 font-display font-semibold transition-all",
            isHero
              ? "bg-white text-[#02097D] hover:shadow-[0_8px_25px_-5px_rgba(255,255,255,0.4)]"
              : "bg-[#03A0CD] text-white hover:bg-[#0AB4E0]",
          ].join(" ")}
        >
          <span>{product.ctaLabel}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.article>
  );
}

function Banner({ product, Icon }: { product: Product; Icon: LucideIcon }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      {/* Background gradient */}
      <div
        className={
          product.highlight
            ? "absolute inset-0 bg-gradient-to-br from-[#03A0CD] via-[#02097D] to-[#000330]"
            : "absolute inset-0 bg-gradient-to-br from-[#02097D] via-[#000a36] to-[#000330]"
        }
      />

      {/* Pattern: huge blurred icon */}
      <Icon
        className="absolute -right-8 -bottom-8 h-56 w-56 sm:h-64 sm:w-64 text-white/10"
        strokeWidth={1}
      />

      {/* Optional photo (overlay over gradient when provided) */}
      {product.image && (
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 480px"
          className="object-cover opacity-60 mix-blend-luminosity"
        />
      )}

      {/* Top gradient for legibility of eyebrow */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Eyebrow chip */}
      <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-black/45 px-3 py-1 text-[10.5px] sm:text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
        {product.eyebrow}
      </span>
    </div>
  );
}

function SmallCard({ product, index }: Props) {
  const Icon = ICONS[product.iconName];
  return (
    <motion.a
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 + index * 0.07, ease: "easeOut" }}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2 }}
      href={`/api/click?id=${product.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-shine group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[#03A0CD]/22 bg-[#000a36]/70 px-4 py-3.5 backdrop-blur-md transition-all hover:border-[#03A0CD]/55 hover:bg-[#03A0CD]/10"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#03A0CD]/15 text-[#03A0CD] group-hover:bg-[#03A0CD]/25">
        <Icon className="h-5 w-5" />
      </span>

      <span className="flex-1 min-w-0">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#03A0CD]/85">
          {product.eyebrow}
        </span>
        <span className="mt-0.5 block font-display font-semibold leading-tight text-[15px] text-[#F4F4F4]">
          {product.headline}
        </span>
        <span className="mt-0.5 block truncate text-xs text-[#F4F4F4]/55">
          {product.description}
        </span>
      </span>

      <ArrowRight className="h-4 w-4 shrink-0 text-[#03A0CD] transition-transform group-hover:translate-x-1" />
    </motion.a>
  );
}
