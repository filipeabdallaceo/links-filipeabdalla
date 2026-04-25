"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  FileText,
  Globe,
  PlayCircle,
  Radio,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";
import { useRef } from "react";

const ASAAS_AULA = "https://www.asaas.com/c/yhehf47wkz9406x1";
const ASAAS_COMBO = "https://www.asaas.com/c/9vvbjacfe43c253l";

const PRICE = "R$ 297";
const ANCHOR = "R$ 597";
const INSTALLMENTS = "6x de R$ 56,40";
const NEXT_EDITION = "MAIO · 2026";

const trackedHref = (id: string, dest: string) =>
  `/api/click?id=${id}&dest=${encodeURIComponent(dest)}`;

// ───────────────────────────────────────────────────────────────────────────
// PAGE
// ───────────────────────────────────────────────────────────────────────────

export default function AulaBonusPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-black text-white">
      <AnimatedBackground />
      <Hero />
      <WhatYouLearn />
      <AboutFilipe />
      <Inclusos />
      <Pricing />
      <Guarantee />
      <FAQ />
      <FinalCta />
      <Footer />
      <StickyCta />
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// ANIMATED BACKGROUND — partículas subindo (faíscas) + glows rosa/pink
// ───────────────────────────────────────────────────────────────────────────

function AnimatedBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
    >
      {/* Glows pink/rose flutuantes */}
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full bg-pink-500/15 blur-[150px]"
        style={{ top: "-10%", left: "10%" }}
        animate={
          reduced ? undefined : { x: [0, 60, -30, 0], y: [0, 50, 30, 0] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[150px]"
        style={{ top: "40%", right: "5%" }}
        animate={
          reduced ? undefined : { x: [0, -50, 30, 0], y: [0, 40, -30, 0] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[450px] w-[450px] rounded-full bg-rose-500/15 blur-[150px]"
        style={{ bottom: "0%", left: "40%" }}
        animate={
          reduced ? undefined : { x: [0, 40, -50, 0], y: [0, -30, 20, 0] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Partículas subindo */}
      {!reduced && <RisingParticles />}
    </div>
  );
}

function RisingParticles() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${(i * 7.3 + 4) % 96}%`,
    duration: 14 + ((i * 3) % 8),
    delay: (i * 1.1) % 14,
    size: i % 3 === 0 ? "h-1.5 w-1.5" : "h-1 w-1",
    color:
      i % 3 === 0
        ? "bg-pink-300/70"
        : i % 3 === 1
          ? "bg-rose-200/60"
          : "bg-fuchsia-300/50",
  }));

  return (
    <div className="absolute inset-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${p.size} rounded-full ${p.color} shadow-[0_0_8px_currentColor]`}
          style={{ left: p.left, bottom: 0 }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "-110vh"],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.08, 0.92, 1],
          }}
        />
      ))}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SHARED
// ───────────────────────────────────────────────────────────────────────────

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 ${className}`}
    >
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-400/30 bg-pink-500/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-pink-300 backdrop-blur">
      {children}
    </span>
  );
}

function PrimaryCta({
  trackId,
  dest = ASAAS_AULA,
  children,
  size = "lg",
  className = "",
}: {
  trackId: string;
  dest?: string;
  children: React.ReactNode;
  size?: "lg" | "md";
  className?: string;
}) {
  const padding = size === "lg" ? "px-5 sm:px-8 py-3.5 sm:py-4" : "px-4 sm:px-5 py-2.5 sm:py-3";
  const text = size === "lg" ? "text-[13.5px] sm:text-lg" : "text-xs sm:text-base";
  return (
    <a
      href={trackedHref(trackId, dest)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-600 ${padding} font-display font-bold ${text} text-white shadow-[0_15px_50px_-15px_rgba(236,72,153,0.6)] transition-all hover:shadow-[0_20px_60px_-15px_rgba(236,72,153,0.8)] hover:brightness-110 ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight
        className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2.5}
      />
    </a>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// HERO
// ───────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <Section className="pt-8 pb-12 sm:pt-12 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* Badge data */}
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
          </span>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-pink-200">
            Próxima edição · {NEXT_EDITION}
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-6 font-display text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          <span className="block text-white/90">Aula Bônus</span>
          <span className="mt-1 block bg-gradient-to-r from-rose-300 via-pink-300 to-fuchsia-400 bg-clip-text text-transparent">
            ao vivo com Dr. Filipe
          </span>
        </h1>

        {/* Sub */}
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          90 minutos de eletroterapia aplicada — direto ao ponto. Casos clínicos reais, Q&A ao vivo e protocolos que você usa <strong className="text-white/90">no próximo atendimento</strong>.
        </p>

        {/* Quick info */}
        <div className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1.5 text-white/75">
            <Clock className="h-3.5 w-3.5 text-pink-300" />
            90 minutos
          </span>
          <span className="inline-flex items-center gap-1.5 text-white/75">
            <Radio className="h-3.5 w-3.5 text-pink-300" />
            Online ao vivo
          </span>
          <span className="inline-flex items-center gap-1.5 text-white/75">
            <Video className="h-3.5 w-3.5 text-pink-300" />
            Gravação 30 dias
          </span>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <PrimaryCta trackId="aula-hero-cta">
            Quero participar · {PRICE}
          </PrimaryCta>
        </div>

        <p className="mt-3 text-xs text-white/50">
          ou {INSTALLMENTS} no cartão · vagas limitadas
        </p>
      </motion.div>

      {/* Photo banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative mx-auto mt-12 max-w-4xl"
      >
        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-pink-500/30 via-fuchsia-500/20 to-transparent blur-2xl" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] ring-1 ring-pink-400/20">
          <Image
            src="/img/aula.jpg"
            alt="Dr. Filipe Abdalla apresentando aula presencial"
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover object-[50%_25%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Floating "AO VIVO" badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-[0_8px_30px_-5px_rgba(244,63,94,0.6)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Ao vivo
            </span>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// WHAT YOU LEARN
// ───────────────────────────────────────────────────────────────────────────

function WhatYouLearn() {
  const items = [
    "Como aplicar eletroterapia com confiança — sem mais 'apertar botão no escuro'",
    "Os 5 erros mais comuns que travam seus resultados clínicos",
    "Protocolos práticos pra dores crônicas e lesões esportivas",
    "Casos clínicos reais analisados ao vivo, do início ao plano de tratamento",
    "Q&A aberto de 30 minutos — pergunte qualquer coisa direto pro Dr. Filipe",
  ];

  return (
    <Section className="py-12 sm:py-20">
      <div className="text-center">
        <Eyebrow>O que você vai levar</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          90 minutos de prática clínica que você aplica{" "}
          <span className="bg-gradient-to-r from-rose-300 to-fuchsia-400 bg-clip-text text-transparent">
            no próximo paciente.
          </span>
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-2xl space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur-sm sm:px-5"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-fuchsia-500 text-white">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <p className="text-sm leading-relaxed text-white/85 sm:text-[15px]">
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// ABOUT FILIPE
// ───────────────────────────────────────────────────────────────────────────

function AboutFilipe() {
  return (
    <Section className="py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-10"
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
          {/* Foto */}
          <div className="relative h-28 w-28 shrink-0 sm:h-36 sm:w-36">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-400/40 to-fuchsia-500/40 blur-xl" />
            <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-pink-400/40">
              <Image
                src="/img/filipe.jpg"
                alt="Dr. Filipe Abdalla"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="text-center sm:text-left">
            <Eyebrow>Quem dá a aula</Eyebrow>
            <h3 className="mt-3 font-display text-xl font-bold sm:text-2xl">
              Dr. Filipe Abdalla, PhD
            </h3>
            <p className="mt-1 text-sm text-pink-200/85 sm:text-base">
              Fisioterapeuta Esportivo · 15+ anos de clínica
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-[15px]">
              Doutor em Fisioterapia, professor de pós-graduação e referência nacional em eletroterapia aplicada. Já formou centenas de fisioterapeutas presencialmente. Agora abrindo uma janela ao vivo pra quem não pode ir aos bootcamps.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge>PhD</Badge>
              <Badge>15+ anos clínica</Badge>
              <Badge>Bootcamp Eletroterapia</Badge>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// INCLUSOS — 3 cards
// ───────────────────────────────────────────────────────────────────────────

function Inclusos() {
  const items = [
    {
      icon: PlayCircle,
      title: "Aula ao vivo",
      sub: "90 minutos",
      desc: "Apresentação + casos clínicos reais + 30min de Q&A direto comigo.",
    },
    {
      icon: Video,
      title: "Gravação por 30 dias",
      sub: "Acesso vitalício à edição",
      desc: "Não vai conseguir assistir ao vivo? Sem problema — assista no seu tempo.",
    },
    {
      icon: FileText,
      title: "Material PDF",
      sub: "Slides + checklists",
      desc: "Tudo que apresento na aula, organizado pra você imprimir e usar na clínica.",
    },
  ];

  return (
    <Section className="py-12 sm:py-20">
      <div className="text-center">
        <Eyebrow>O que está incluso</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          Tudo isso por {PRICE}.
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:border-pink-400/30 hover:bg-pink-500/5 sm:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400/20 to-fuchsia-500/20 text-pink-300">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-white sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-pink-300/80">
                {item.sub}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// PRICING
// ───────────────────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <Section className="py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-pink-400/30 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-fuchsia-600/10 p-8 text-center backdrop-blur-md sm:p-12"
      >
        <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-500/20 blur-[80px]" />

        <div className="relative">
          <Eyebrow>Investimento</Eyebrow>

          <div className="mt-6 flex items-baseline justify-center gap-3">
            <span className="font-display text-2xl font-bold text-white/40 line-through sm:text-3xl">
              {ANCHOR}
            </span>
            <span className="font-display text-5xl font-black text-white sm:text-6xl">
              {PRICE}
            </span>
          </div>
          <p className="mt-2 text-sm text-white/60 sm:text-base">
            ou {INSTALLMENTS} no cartão
          </p>

          <div className="mt-8">
            <PrimaryCta trackId="aula-pricing-cta" size="lg">
              Quero minha vaga agora
            </PrimaryCta>
          </div>

          <p className="mt-4 text-xs text-white/50">
            Pagamento seguro pelo Asaas · Pix ou cartão
          </p>
        </div>
      </motion.div>

      {/* Combo upsell */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mt-6 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur-sm sm:p-6"
      >
        <p className="text-sm text-white/70">
          ⚡ <strong className="text-white">Quer levar a Mentoria Express junto?</strong>{" "}
          Combo Aula + Mentoria sai por <strong className="text-pink-300">R$ 997</strong>{" "}
          (você economiza R$ 197 vs. comprar separado).
        </p>
        <a
          href={trackedHref("aula-combo-upsell", ASAAS_COMBO)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-pink-300 underline-offset-4 hover:underline"
        >
          Ver combo
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </motion.div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// GUARANTEE
// ───────────────────────────────────────────────────────────────────────────

function Guarantee() {
  return (
    <Section className="py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-2xl items-center gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/5 p-5 backdrop-blur-md sm:gap-5 sm:p-6"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_8px_25px_-5px_rgba(16,185,129,0.4)] sm:h-14 sm:w-14">
          <ShieldCheck className="h-6 w-6 text-white" strokeWidth={2} />
        </div>
        <div>
          <p className="font-display text-sm font-bold text-white sm:text-base">
            Garantia de 30 minutos
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/70 sm:text-sm">
            Se nos primeiros 30min da aula você sentir que não vale o que pagou, me chama no WhatsApp e devolvo 100% via Pix. Sem perguntas.
          </p>
        </div>
      </motion.div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// FAQ
// ───────────────────────────────────────────────────────────────────────────

function FAQ() {
  const faqs = [
    {
      q: "Quando exatamente é a próxima aula?",
      a: `A próxima edição rola em ${NEXT_EDITION}. A data exata é votada pela turma — você recebe 3 opções por email e a maioria decide. Se não puder ao vivo, fica a gravação por 30 dias.`,
    },
    {
      q: "Posso assistir depois se não puder ao vivo?",
      a: "Sim. A gravação fica disponível por 30 dias após a aula. Você assiste quando quiser, no seu tempo, quantas vezes precisar.",
    },
    {
      q: "Vai ter mesmo Q&A ao vivo?",
      a: "Sim. Reservo os últimos 30 minutos pra responder perguntas dos participantes ao vivo. Pode mandar caso clínico, dúvida sobre equipamento, gestão da clínica — o que precisar.",
    },
    {
      q: "É pra fisio iniciante ou experiente?",
      a: "Pra ambos. Iniciante sai com base sólida pra parar de 'apertar botão no escuro'. Experiente sai com refinamentos de protocolo que só PhD na área entrega.",
    },
    {
      q: "Como funciona o reembolso?",
      a: "Garantia dos primeiros 30min: se não valer o que pagou, me chama no WhatsApp e devolvo 100% via Pix. Sem burocracia.",
    },
    {
      q: "Recebo certificado?",
      a: "Sim, certificado digital de 90 minutos enviado por email após o encerramento da aula ao vivo.",
    },
  ];

  return (
    <Section className="py-12 sm:py-20">
      <div className="text-center">
        <Eyebrow>Perguntas frequentes</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          Tira sua dúvida.
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-2xl divide-y divide-white/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-4 sm:py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-[15px] font-semibold text-white sm:text-base">
              {f.q}
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-pink-300 transition-transform group-open:rotate-45">
                <span className="text-lg leading-none">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-[15px]">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// FINAL CTA — com escassez
// ───────────────────────────────────────────────────────────────────────────

function FinalCta() {
  return (
    <Section className="pt-12 pb-32 sm:pt-20 sm:pb-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-1.5 backdrop-blur-md">
          <Users className="h-3.5 w-3.5 text-pink-300" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-pink-200">
            Vagas limitadas · {NEXT_EDITION}
          </span>
        </div>

        <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
          Não fique de fora.{" "}
          <span className="bg-gradient-to-r from-rose-300 via-pink-300 to-fuchsia-400 bg-clip-text text-transparent">
            Vagas se esgotam rápido.
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          Última edição lotou em poucas horas. Garante a sua antes que feche.
        </p>

        <div className="mt-10">
          <PrimaryCta trackId="aula-final-cta" size="lg">
            Garantir minha vaga · {PRICE}
          </PrimaryCta>
        </div>
        <p className="mt-4 text-xs text-white/50">
          ou {INSTALLMENTS} · Garantia dos 30min
        </p>
      </motion.div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-4 py-8 text-center text-[11px] text-white/40">
      <p>© {new Date().getFullYear()} Dr. Filipe Abdalla — Fisioterapeuta Esportivo · PhD</p>
      <p className="mt-1">CREFITO · Aula Bônus Online</p>
    </footer>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// STICKY CTA
// ───────────────────────────────────────────────────────────────────────────

function StickyCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [400, 600], [0, 1]);
  const y = useTransform(scrollY, [400, 600], [20, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-md sm:bottom-5 sm:left-5 sm:right-5 sm:max-w-lg"
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-pink-400/30 bg-black/95 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-5 sm:py-4">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold uppercase tracking-wider text-pink-300 sm:text-xs">
            Aula Bônus · {NEXT_EDITION}
          </p>
          <p className="truncate font-display text-sm font-bold text-white sm:text-base">
            {PRICE}{" "}
            <span className="text-xs font-normal text-white/55">
              · {INSTALLMENTS}
            </span>
          </p>
        </div>
        <a
          href={trackedHref("aula-sticky-cta", ASAAS_AULA)}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:brightness-110 sm:text-sm"
        >
          Garantir
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
        </a>
      </div>
    </motion.div>
  );
}
