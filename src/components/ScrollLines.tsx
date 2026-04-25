"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type RefObject } from "react";

type Props = {
  /** Section reference whose scroll position drives the line drawing. */
  sectionRef: RefObject<HTMLElement | null>;
};

export function ScrollLines({ sectionRef }: Props) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Line "draws" from the top down as user scrolls through the section.
  const height = useTransform(scrollYProgress, [0, 0.85], ["0%", "100%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
    >
      <motion.div
        style={{ height }}
        className="absolute top-0 left-1/3 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/40 to-transparent"
      />
      <motion.div
        style={{ height }}
        className="absolute top-0 left-2/3 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/40 to-transparent"
      />
    </div>
  );
}

/** Convenience hook: create a section ref with the right type. */
export function useSectionRef() {
  return useRef<HTMLElement>(null);
}
