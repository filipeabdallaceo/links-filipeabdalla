"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Gift,
  GraduationCap,
  MapPin,
  MessageCircle,
  Sparkles,
  Stethoscope,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { IconName, Product } from "@/lib/links";
import { BrazilMapBanner } from "@/components/BrazilMapBanner";

const ICONS: Record<IconName, LucideIcon> = {
  message: MessageCircle,
  map: MapPin,
  calendar: Calendar,
  sparkles: Sparkles,
  graduation: GraduationCap,
  stethoscope: Stethoscope,
  zap: Zap,
  gift: Gift,
};

type Props = { product: Product; index: number };

export function ProductCard({ product, index }: Props) {
  const Icon = ICONS[product.iconName];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 + index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col gap-3 rounded-3xl"
    >
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
        <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
        {product.eyebrow}
      </span>

      <a
        href={`/api/click?id=${product.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 rounded-3xl"
      >
        <div
          className={[
            "relative aspect-[5/4] overflow-hidden rounded-3xl",
            "bg-gradient-to-br",
            product.bannerGradient,
            "ring-1 ring-white/10 transition-all duration-300",
            "group-hover:ring-white/30 group-hover:shadow-[0_20px_60px_-20px_rgba(255,255,255,0.15)]",
          ].join(" ")}
        >
          {product.customBanner === "brazil-map" ? (
            <>
              <div className="absolute inset-0">
                <BrazilMapBanner />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />
            </>
          ) : product.image ? (
            <>
              <Image
                src={product.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={[
                  "object-cover transition-transform duration-700 group-hover:scale-105",
                  product.imagePosition ?? "object-center",
                ].join(" ")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/30 to-zinc-950/10" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-zinc-950/40" />
              <Icon
                className="absolute -right-6 -bottom-6 h-44 w-44 sm:h-52 sm:w-52 text-white/10"
                strokeWidth={1}
              />
            </>
          )}

          <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-5">
            <h3 className="font-display text-[15px] sm:text-base font-bold leading-tight tracking-tight text-white drop-shadow-lg">
              {product.headline}
            </h3>
          </div>
        </div>

        <div className="mt-2.5 overflow-hidden rounded-full">
          <div
            className={[
              "btn-shine relative flex items-center justify-center gap-2 px-4 py-3",
              "bg-gradient-to-r",
              product.ctaGradient,
              "font-display font-semibold text-white text-[13px] sm:text-sm",
              "transition-all duration-300",
              "group-hover:brightness-110 group-hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.3)]",
            ].join(" ")}
          >
            <span>{product.ctaLabel}</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.5}
            />
          </div>
        </div>
      </a>
    </motion.article>
  );
}
