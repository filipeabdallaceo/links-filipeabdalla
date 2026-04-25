"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

type Props = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function ScrollLines({ sectionRef }: Props) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Line height grows with scroll position through the section.
  const height = useTransform(scrollYProgress, [0, 0.85], ["0%", "100%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      <Line height={height} leftClass="left-1/3" />
      <Line height={height} leftClass="left-2/3" />
    </div>
  );
}

function Line({
  height,
  leftClass,
}: {
  height: ReturnType<typeof useTransform<number, string>>;
  leftClass: string;
}) {
  return (
    <motion.div
      style={{ height }}
      className={`absolute top-0 ${leftClass} w-px -translate-x-1/2 overflow-visible`}
    >
      {/* The line itself — solid trail */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/35 to-white/70" />

      {/* Glowing head at the leading edge */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
        <div className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-md" />
        <div className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[1px]" />
        <div className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </div>
    </motion.div>
  );
}
