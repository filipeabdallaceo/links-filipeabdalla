"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Clock,
  HeadphonesIcon,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useRef } from "react";

const ASAAS_CHECKOUT = "https://www.asaas.com/c/try7q3swklbizxy3";
const ASAAS_COMBO = "https://www.asaas.com/c/9vvbjacfe43c253l";

const PRICE = "R$ 897";
const ANCHOR = "R$ 1.497";
const INSTALLMENTS = "12x de R$ 89,90";

const trackedHref = (id: string, dest: string) =>
  `/api/click?id=${id}&dest=${encodeURIComponent(dest)}`;

// ───────────────────────────────────────────────────────────────────────────
// PAGE
// ───────────────────────────────────────────────────────────────────────────

export default function MentoriaExpressPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#000330] text-white">
      <AnimatedBackground />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Comparison />
      <ValueStack />
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
// ANIMATED BACKGROUND
// ───────────────────────────────────────────────────────────────────────────

function AnimatedBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
    >
      {/* Grid sutil de fundo */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(167, 139, 250, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(167, 139, 250, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, transparent 75%)",
        }}
      />

      {/* Aurora orbs flutuantes */}
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full bg-violet-500/25 blur-[140px]"
        style={{ top: "5%", left: "10%" }}
        animate={
          reduced
            ? undefined
            : { x: [0, 80, -40, 0], y: [0, 40, 60, 0] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[140px]"
        style={{ top: "35%", right: "5%" }}
        animate={
          reduced
            ? undefined
            : { x: [0, -60, 40, 0], y: [0, 50, -30, 0] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[450px] w-[450px] rounded-full bg-purple-600/22 blur-[140px]"
        style={{ bottom: "10%", left: "30%" }}
        animate={
          reduced
            ? undefined
            : { x: [0, 40, -50, 0], y: [0, -40, 30, 0] }
        }
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Linhas horizontais que varrem a tela de cima pra baixo */}
      {!reduced && <SweepLines />}
    </div>
  );
}

function SweepLines() {
  return (
    <div className="absolute inset-0">
      {[
        { color: "rgba(196, 181, 253, 0.6)", duration: 9, delay: 0 },
        { color: "rgba(165, 180, 252, 0.4)", duration: 12, delay: 3 },
        { color: "rgba(196, 181, 253, 0.5)", duration: 10, delay: 6.5 },
      ].map((line, i) => (
        <motion.div
          key={i}
          className="absolute -inset-x-1/4 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${line.color}, transparent)`,
            top: 0,
          }}
          initial={{ y: "-10vh", opacity: 0 }}
          animate={{
            y: ["-10vh", "110vh"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.06, 0.94, 1],
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
    <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-violet-300 backdrop-blur">
      {children}
    </span>
  );
}

function PrimaryCta({
  trackId,
  children,
  size = "lg",
  className = "",
}: {
  trackId: string;
  children: React.ReactNode;
  size?: "lg" | "md";
  className?: string;
}) {
  const padding = size === "lg" ? "px-5 sm:px-8 py-3.5 sm:py-4" : "px-4 sm:px-5 py-2.5 sm:py-3";
  const text = size === "lg" ? "text-[13.5px] sm:text-lg" : "text-xs sm:text-base";
  return (
    <a
      href={trackedHref(trackId, ASAAS_CHECKOUT)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600 ${padding} font-display font-bold ${text} text-white shadow-[0_15px_50px_-15px_rgba(139,92,246,0.6)] transition-all hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.8)] hover:brightness-110 ${className}`}
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
    <Section className="pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Eyebrow>Mentoria Express · 1:1 com PhD</Eyebrow>

          <h1 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[44px]">
            Acesso direto ao raciocínio clínico que{" "}
            <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
              poucos têm no Brasil.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Você manda o caso. Eu respondo por áudio no WhatsApp. <strong className="text-white/90">3 perguntas, 45 dias, zero burocracia.</strong> Consultoria de PhD na palma da sua mão.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryCta trackId="mentoria-hero-cta">
              Quero a mentoria · {PRICE}
            </PrimaryCta>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 backdrop-blur transition-all hover:border-white/30 hover:bg-white/10"
            >
              Ver como funciona
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-violet-300" />
              Garantia tripla
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-violet-300" />
              Resposta em até 48h
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              Vagas limitadas
            </span>
          </div>
        </motion.div>

        {/* Foto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-500/30 via-purple-500/20 to-transparent blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <Image
              src="/img/mentoria.jpg"
              alt="Dr. Filipe Abdalla respondendo mentoria pelo WhatsApp"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover object-[50%_30%]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000330] via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// PROBLEM
// ───────────────────────────────────────────────────────────────────────────

function Problem() {
  return (
    <Section className="py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>O problema</Eyebrow>
          <h2 className="mt-5 font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            Você já travou no meio de um caso e não soube continuar?
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-white/70">
            <p>
              Aquele paciente complexo que não responde aos protocolos clássicos.
            </p>
            <p>
              O atleta com história clínica que não fecha. O exame que você precisa interpretar com confiança e o tempo aperta.
            </p>
            <p>
              Você abre 7 abas, lê 3 papers, consulta um colega — e ainda fica com aquela dúvida no fundo: <strong className="text-white/90">"será que é isso mesmo?"</strong>
            </p>
            <p className="text-white/85">
              Esse é o momento em que você precisa de uma mente sênior pensando junto. Não amanhã. Hoje.
            </p>
          </div>
        </motion.div>

        {/* Mockup WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative rounded-3xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur-md shadow-2xl">
            <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500" />
              <div>
                <p className="text-xs font-semibold text-white">Dr. Filipe Abdalla</p>
                <p className="text-[10px] text-emerald-400">online</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="ml-8 rounded-2xl rounded-tr-sm bg-violet-600/30 p-3 text-xs text-white">
                Dr., paciente com lesão crônica de patelar. Já fiz 6 sessões e não vejo progresso. Mando o exame?
              </div>
              <div className="text-right text-[10px] text-white/40">você · 14:22</div>

              <div className="mr-8 rounded-2xl rounded-tl-sm bg-zinc-800 p-3 text-xs text-white/90">
                Manda. Vou ouvir e te respondo em áudio com plano completo.
              </div>
              <div className="text-[10px] text-white/40">Dr. Filipe · 14:24</div>

              <div className="mr-8 inline-flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-2">
                <HeadphonesIcon className="h-3 w-3 text-violet-300" />
                <span className="text-[10px] text-white/70">áudio · 4:32</span>
                <TypingDots />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function TypingDots() {
  return (
    <span className="ml-1 flex gap-1">
      {[0, 0.2, 0.4].map((delay) => (
        <span
          key={delay}
          className="h-1 w-1 rounded-full bg-violet-300"
          style={{
            animation: `typingBounce 1.4s ease-in-out ${delay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes typingBounce {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-2px); }
        }
      `}</style>
    </span>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// SOLUTION
// ───────────────────────────────────────────────────────────────────────────

function Solution() {
  const items = [
    {
      step: "01",
      title: "VOCÊ MANDA",
      desc: "Foto, vídeo ou exame do paciente direto pelo meu WhatsApp pessoal. Sem agenda, sem espera.",
      icon: MessageSquare,
    },
    {
      step: "02",
      title: "EU PENSO",
      desc: "Analiso o caso aplicando a metodologia que uso na clínica há mais de 15 anos. Raciocínio clínico de PhD em fisio esportiva.",
      icon: Sparkles,
    },
    {
      step: "03",
      title: "VOCÊ EXECUTA",
      desc: "Recebe áudio personalizado com plano de ação. Aplica no próximo atendimento. Resultado pro paciente em dias, não semanas.",
      icon: Zap,
    },
  ];

  return (
    <Section className="py-16 sm:py-24">
      <div className="text-center">
        <Eyebrow>A solução</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          Acesso direto ao meu raciocínio clínico — em áudio, no seu WhatsApp.
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:border-violet-400/30 hover:bg-violet-500/5"
            >
              <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 px-3 py-0.5 text-xs font-mono font-bold text-white">
                {item.step}
              </span>
              <Icon className="h-7 w-7 text-violet-300" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
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
// HOW IT WORKS
// ───────────────────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      n: "1",
      title: "Compre seu acesso",
      desc: `Pagamento seguro pelo Asaas. ${PRICE} à vista ou ${INSTALLMENTS}.`,
    },
    {
      n: "2",
      title: "Adicione meu WhatsApp pessoal",
      desc: "Você recebe meu contato direto. Não é com a secretária. É comigo.",
    },
    {
      n: "3",
      title: "Use suas 3 perguntas em até 45 dias",
      desc: "Manda quando quiser. Sem fila, sem agenda. Respondo em até 48h.",
    },
  ];

  return (
    <Section id="como-funciona" className="py-16 sm:py-24">
      <div className="text-center">
        <Eyebrow>Como funciona</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          3 passos. Zero fricção.
        </h2>
      </div>

      <div className="mt-12 space-y-4 sm:space-y-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 font-display text-xl font-bold text-white">
              {s.n}
            </span>
            <div className="pt-1">
              <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70 sm:text-base">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// COMPARISON
// ───────────────────────────────────────────────────────────────────────────

function Comparison() {
  const rows = [
    {
      label: "Tempo até decidir conduta",
      alone: "2 a 5 dias",
      withMe: "Algumas horas",
    },
    {
      label: "Confiança no plano de tratamento",
      alone: "Você decide e torce",
      withMe: "Validado por PhD",
    },
    {
      label: "Risco de erro clínico",
      alone: "Alto",
      withMe: "Mitigado",
    },
    {
      label: "Resultado pro seu paciente",
      alone: "Lento, com tentativa e erro",
      withMe: "Direto ao ponto",
    },
    {
      label: "Sua autoridade na clínica",
      alone: "Só seu repertório",
      withMe: "Multiplicada por PhD esportivo",
    },
  ];

  return (
    <Section className="py-16 sm:py-24">
      <div className="text-center">
        <Eyebrow>O que muda</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          Você sozinho vs. você com Mentoria Express.
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
      >
        {/* Header */}
        <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.03] px-4 py-4 text-[10px] font-bold uppercase tracking-wider sm:px-6 sm:text-xs">
          <div className="text-white/50">&nbsp;</div>
          <div className="flex items-center gap-1.5 text-white/50">
            <X className="h-3 w-3" /> Você sozinho
          </div>
          <div className="flex items-center gap-1.5 text-violet-300">
            <Check className="h-3 w-3" /> Você + Mentoria
          </div>
        </div>

        {/* Rows */}
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`grid grid-cols-3 items-center px-4 py-4 text-xs sm:px-6 sm:text-sm ${
              i % 2 === 0 ? "bg-white/[0.01]" : ""
            }`}
          >
            <div className="font-semibold text-white/85">{r.label}</div>
            <div className="text-white/55">{r.alone}</div>
            <div className="font-medium text-white">{r.withMe}</div>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// VALUE STACK
// ───────────────────────────────────────────────────────────────────────────

function ValueStack() {
  const items = [
    { label: "3 perguntas em áudio personalizado com Dr. Filipe", value: "R$ 1.497" },
    { label: "45 dias de validade — usa quando precisar", value: "incluso" },
    { label: "BÔNUS #1: Análise extra de 1 protocolo seu", value: "R$ 297" },
    { label: "BÔNUS #2: Acesso ao Banco de Casos do Dr. Filipe", value: "R$ 197" },
    { label: "GARANTIA TRIPLA blindada", value: "incluso" },
  ];

  return (
    <Section className="py-16 sm:py-24">
      <div className="text-center">
        <Eyebrow>O que está incluso</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          Você leva tudo isso por <span className="text-violet-300">{PRICE}</span>.
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-10 max-w-2xl space-y-3"
      >
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 sm:px-6 sm:py-4"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-sm font-medium text-white/85 sm:text-[15px]">
                {item.label}
              </span>
            </div>
            <span className="shrink-0 font-mono text-xs text-white/55 sm:text-sm">
              {item.value}
            </span>
          </div>
        ))}

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-violet-400/30 bg-violet-500/10 px-5 py-4 sm:px-6 sm:py-5">
          <span className="font-display text-base font-bold text-white sm:text-lg">
            Valor total
          </span>
          <span className="font-display text-xl font-bold text-white line-through opacity-50 sm:text-2xl">
            R$ 1.991
          </span>
        </div>
      </motion.div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// PRICING
// ───────────────────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <Section className="py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-violet-400/30 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-indigo-600/10 p-8 sm:p-12 text-center backdrop-blur-md"
      >
        <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[80px]" />

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
            <PrimaryCta trackId="mentoria-pricing-cta" size="lg">
              Quero minha mentoria agora
            </PrimaryCta>
          </div>

          <p className="mt-4 text-xs text-white/50">
            Pagamento processado pelo Asaas · Pix ou cartão de crédito
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
          💡 <strong className="text-white">Quer levar a Aula Bônus junto?</strong>{" "}
          Combo Mentoria + Aula sai por <strong className="text-violet-300">R$ 997</strong>{" "}
          (você economiza R$ 197 vs. comprar separado).
        </p>
        <a
          href={trackedHref("mentoria-combo-upsell", ASAAS_COMBO)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-violet-300 underline-offset-4 hover:underline"
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
    <Section className="py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl rounded-3xl border-2 border-emerald-400/30 bg-emerald-500/5 p-6 backdrop-blur-md sm:p-10"
      >
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)]">
            <ShieldCheck className="h-8 w-8 text-white" strokeWidth={2} />
          </div>
          <div>
            <Eyebrow>Garantia Tripla</Eyebrow>
            <h3 className="mt-3 font-display text-xl font-bold sm:text-2xl">
              Você não tem nada a perder.
            </h3>
          </div>
        </div>

        <ul className="mt-8 space-y-4">
          <li className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
              1
            </span>
            <p className="text-sm text-white/80 sm:text-base">
              <strong className="text-white">Resposta em até 48h</strong> — se eu demorar mais que isso pra responder qualquer pergunta sua, devolvo o valor + R$ 100 de cortesia.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
              2
            </span>
            <p className="text-sm text-white/80 sm:text-base">
              <strong className="text-white">Reembolso integral em 7 dias</strong> — se não usar nenhuma pergunta na primeira semana e mudar de ideia, devolvo 100%.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
              3
            </span>
            <p className="text-sm text-white/80 sm:text-base">
              <strong className="text-white">Confidencialidade total</strong> — seus casos clínicos ficam 100% sigilosos. Nunca uso pra exemplos públicos sem sua autorização explícita.
            </p>
          </li>
        </ul>
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
      q: "Em quanto tempo recebo a resposta de cada pergunta?",
      a: "Em até 48h após você me mandar o caso completo. Na prática, 80% das respostas saem no mesmo dia ou em até 24h.",
    },
    {
      q: "Posso mandar mais de uma pergunta de uma vez?",
      a: "Sim. Pode mandar as 3 logo de cara, espaçar pelos 45 dias, ou usar 1 e guardar 2 pra depois. É seu pacote, você decide.",
    },
    {
      q: "Vale pra qualquer área da fisioterapia?",
      a: "A mentoria é otimizada pra fisio esportiva e ortopédica (minha especialidade). Casos neurológicos, respiratórios ou pediátricos eu posso comentar mas não é meu forte — vou ser honesto se não for minha praia.",
    },
    {
      q: "Como funciona a confidencialidade do paciente?",
      a: "Seus casos são tratados como prontuário: total sigilo. Não compartilho exames, fotos ou áudios. Nunca uso pra exemplos públicos sem sua autorização escrita.",
    },
    {
      q: "Posso renovar o pacote depois dos 45 dias?",
      a: "Sim. No fim do pacote, você recebe oferta exclusiva de renovação (com desconto pra alunos ativos).",
    },
    {
      q: "Atende fisios de qualquer estado ou país?",
      a: "Sim. Como tudo é via WhatsApp e áudio, atendo Brasil inteiro e fisios brasileiros morando fora.",
    },
    {
      q: "E se eu pedir reembolso?",
      a: "Sem perguntas. Se você ainda não usou nenhuma pergunta nos primeiros 7 dias, basta me chamar no WhatsApp e devolvo 100% via Pix.",
    },
    {
      q: "Vou falar diretamente com você ou com algum assistente?",
      a: "Diretamente comigo. Sem filtro, sem secretária respondendo no meu lugar. Quem grava o áudio sou eu.",
    },
  ];

  return (
    <Section className="py-16 sm:py-24">
      <div className="text-center">
        <Eyebrow>Perguntas frequentes</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
          Tira sua dúvida antes de comprar.
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-2xl divide-y divide-white/10">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group py-4 sm:py-5"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-[15px] font-semibold text-white sm:text-base">
              {f.q}
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-300 transition-transform group-open:rotate-45">
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
// FINAL CTA
// ───────────────────────────────────────────────────────────────────────────

function FinalCta() {
  return (
    <Section className="pt-16 pb-32 sm:pt-24 sm:pb-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <Eyebrow>Última chamada</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
          Pare de torcer pra dar certo.{" "}
          <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
            Comece a saber.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          Cada caso resolvido é um paciente fidelizado. Cada paciente fidelizado é uma indicação. Cada indicação aumenta sua autoridade.
        </p>
        <div className="mt-10">
          <PrimaryCta trackId="mentoria-final-cta" size="lg">
            Quero a Mentoria · {PRICE}
          </PrimaryCta>
        </div>
        <p className="mt-4 text-xs text-white/50">
          ou {INSTALLMENTS} no cartão · Garantia de 7 dias
        </p>
      </motion.div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-4 py-8 text-center text-[11px] text-white/40">
      <p>© {new Date().getFullYear()} Dr. Filipe Abdalla — Fisioterapeuta Esportivo · PhD</p>
      <p className="mt-1">CREFITO · Mentoria Express</p>
    </footer>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// STICKY CTA — appears after scrolling past hero
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
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-violet-400/30 bg-[#000330]/95 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-5 sm:py-4">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold uppercase tracking-wider text-violet-300 sm:text-xs">
            Mentoria Express
          </p>
          <p className="truncate font-display text-sm font-bold text-white sm:text-base">
            {PRICE} <span className="text-xs font-normal text-white/55">· {INSTALLMENTS}</span>
          </p>
        </div>
        <a
          href={trackedHref("mentoria-sticky-cta", ASAAS_CHECKOUT)}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:brightness-110 sm:text-sm"
        >
          Quero
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
        </a>
      </div>
    </motion.div>
  );
}
