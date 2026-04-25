"use client";

import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

const SOCIALS = [
  {
    id: "instagram",
    href: "https://instagram.com/filipeabdalla",
    icon: FaInstagram,
    label: "Instagram",
  },
];

export function SocialIcons() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="flex items-center justify-center gap-3"
    >
      {SOCIALS.map((s) => {
        const Icon = s.icon;
        return (
          <a
            key={s.id}
            href={`/api/click?id=social-${s.id}&dest=${encodeURIComponent(s.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#03A0CD]/30 bg-white/5 text-[#F4F4F4]/80 transition-all hover:border-[#03A0CD] hover:bg-[#03A0CD]/15 hover:text-white hover:scale-110"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </motion.div>
  );
}
