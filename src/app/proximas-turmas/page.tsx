"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import { CIDADES_SUGERIDAS, PROXIMAS_TURMAS } from "@/lib/cidades";

// ───────────────────────────────────────────────────────────────────────────

export default function ProximasTurmasPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#000208] text-white">
      <AnimatedBackground />
      <Hero />
      <DateCards />
      <ComoFunciona />
      <FormSection />
      <BackupBootcamp />
      <FAQ />
      <Footer />
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// BACKGROUND — Brasil + cyan glow + scan lines
// ───────────────────────────────────────────────────────────────────────────

function AnimatedBackground() {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
    >
      {/* Grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(34, 211, 238, 0.55) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 211, 238, 0.55) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, transparent 75%)",
        }}
      />

      {/* Aurora orbs cyan/blue/indigo */}
      <motion.div
        className="absolute h-[520px] w-[520px] rounded-full bg-cyan-500/22 blur-[140px]"
        style={{ top: "5%", left: "8%" }}
        animate={
          reduced ? undefined : { x: [0, 60, -40, 0], y: [0, 40, 50, 0] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[140px]"
        style={{ top: "40%", right: "5%" }}
        animate={
          reduced ? undefined : { x: [0, -50, 30, 0], y: [0, 50, -30, 0] }
        }
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[480px] w-[480px] rounded-full bg-indigo-600/22 blur-[140px]"
        style={{ bottom: "8%", left: "32%" }}
        animate={
          reduced ? undefined : { x: [0, 50, -40, 0], y: [0, -40, 30, 0] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// HERO — mapa Brasil GIGANTE + headline
// ───────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <Section className="pt-12 pb-10 sm:pt-16 sm:pb-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Eyebrow>Bootcamp Eletroterapia · Tour Brasil 2026</Eyebrow>

        <h1 className="mx-auto mt-5 max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Chegando em{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
            sua cidade
          </span>
          .
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          4 turmas confirmadas em 2026. Garante a vaga onde já tem data — ou
          entra na lista de espera da sua cidade.
        </p>
      </motion.div>

      <BigBrazilMap />
    </Section>
  );
}

function BigBrazilMap() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mx-auto mt-10 h-[280px] w-full max-w-[640px] sm:h-[400px]"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="big-pin-glow">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="route-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Background dots / map paper */}
        {Array.from({ length: 100 }).map((_, i) => {
          const x = (i % 10) * 10 + 5;
          const y = Math.floor(i / 10) * 10 + 5;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="0.3"
              fill="#ffffff"
              fillOpacity="0.08"
            />
          );
        })}

        {/* Route lines connecting the 4 confirmed cities (Floripa → CG → Brasília → SP) */}
        <g
          stroke="url(#route-grad)"
          strokeWidth="0.4"
          strokeDasharray="1.5 1.5"
          fill="none"
        >
          <line x1="60" y1="96" x2="42" y2="78" />
          <line x1="42" y1="78" x2="56" y2="62" />
          <line x1="56" y1="62" x2="60" y2="85" />
        </g>

        {/* All BR major cities — confirmed glow brighter, others dim */}
        {CITIES.map((c, i) => (
          <g key={c.name}>
            <circle
              cx={c.cx}
              cy={c.cy}
              r={c.confirmed ? "8" : "4"}
              fill="url(#big-pin-glow)"
              style={{
                animation: c.confirmed
                  ? `bigPulse 2.5s ease-in-out ${i * 0.3}s infinite`
                  : undefined,
                transformOrigin: `${c.cx}px ${c.cy}px`,
              }}
            />
            <circle
              cx={c.cx}
              cy={c.cy}
              r={c.confirmed ? "1.4" : "0.8"}
              fill={c.confirmed ? "#67e8f9" : "#ffffff"}
              fillOpacity={c.confirmed ? "1" : "0.5"}
            />
            {c.confirmed && (
              <text
                x={c.cx}
                y={c.cy + 4.5}
                textAnchor="middle"
                fontSize="2.3"
                fontWeight="700"
                fill="#67e8f9"
                opacity="0.95"
              >
                {c.label}
              </text>
            )}
          </g>
        ))}

        <text
          x="50"
          y="10"
          textAnchor="middle"
          fontSize="3.2"
          fontWeight="700"
          letterSpacing="2"
          fill="#67e8f9"
          fillOpacity="0.5"
        >
          BRASIL · 2026
        </text>
      </svg>

      <style jsx>{`
        @keyframes bigPulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
        }
      `}</style>
    </motion.div>
  );
}

const CITIES = [
  // Confirmed (das 4 turmas)
  { name: "Florianópolis", cx: 60, cy: 96, label: "FLORIPA", confirmed: true },
  { name: "Campo Grande", cx: 42, cy: 78, label: "CG", confirmed: true },
  { name: "Brasília", cx: 56, cy: 62, label: "BRASÍLIA", confirmed: true },
  { name: "São Paulo", cx: 60, cy: 85, label: "SP", confirmed: true },
  // Atmosphere (não confirmadas, só visual)
  { name: "Manaus", cx: 28, cy: 22, label: "", confirmed: false },
  { name: "Fortaleza", cx: 78, cy: 28, label: "", confirmed: false },
  { name: "Recife", cx: 84, cy: 38, label: "", confirmed: false },
  { name: "Salvador", cx: 80, cy: 50, label: "", confirmed: false },
  { name: "BH", cx: 64, cy: 70, label: "", confirmed: false },
  { name: "Rio", cx: 70, cy: 78, label: "", confirmed: false },
];

// ───────────────────────────────────────────────────────────────────────────
// DATE CARDS
// ───────────────────────────────────────────────────────────────────────────

function DateCards() {
  return (
    <Section className="py-10 sm:py-16">
      <h2 className="mb-6 text-center font-display text-xl font-bold sm:text-2xl">
        4 turmas confirmadas em 2026
      </h2>
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROXIMAS_TURMAS.map((t, i) => (
          <DateCard key={t.cidade} turma={t} index={i} />
        ))}
      </div>
    </Section>
  );
}

function DateCard({
  turma,
  index,
}: {
  turma: (typeof PROXIMAS_TURMAS)[number];
  index: number;
}) {
  const isOpen = turma.status === "vagas-abertas";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={[
        "relative rounded-2xl border p-4 backdrop-blur-sm sm:p-5",
        isOpen
          ? "border-cyan-300/50 bg-gradient-to-br from-cyan-500/15 to-blue-600/10"
          : "border-white/10 bg-white/[0.03]",
      ].join(" ")}
    >
      {isOpen && (
        <span className="absolute -top-2 left-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
          <Sparkles className="h-2.5 w-2.5" /> Vagas Abertas
        </span>
      )}

      <div className="flex items-center gap-2 text-cyan-300/85">
        <MapPin className="h-3.5 w-3.5" />
        <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
          {turma.uf}
        </span>
      </div>

      <h3 className="mt-2 font-display text-lg font-bold text-white sm:text-xl">
        {turma.cidade}
      </h3>

      <p className="mt-1 font-mono text-[13px] text-white/85">
        {turma.dataLabel}
      </p>

      <div className="mt-4">
        {isOpen ? (
          <a
            href={`/api/click?id=proximas-${turma.uf.toLowerCase()}-cta&dest=${encodeURIComponent(turma.bookingUrl ?? "https://bootcamp.filipeabdalla.com/")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white transition-all hover:brightness-110"
          >
            Quero garantir vaga
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          <a
            href="#lista-espera"
            className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-cyan-300/30 bg-cyan-500/10 px-4 py-2.5 text-xs font-semibold text-cyan-200 transition-all hover:bg-cyan-500/20"
          >
            Lista de espera ↓
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// COMO FUNCIONA
// ───────────────────────────────────────────────────────────────────────────

function ComoFunciona() {
  const steps = [
    {
      n: "1",
      title: "Você cadastra interesse",
      desc: "Nome + WhatsApp + cidade. Leva 30s.",
      icon: Users,
    },
    {
      n: "2",
      title: "Vemos a demanda real",
      desc: "Quando uma cidade atinge massa crítica, abrimos turma.",
      icon: MapPin,
    },
    {
      n: "3",
      title: "Você é avisado primeiro",
      desc: "Lista de espera tem prioridade nas vagas e desconto.",
      icon: Calendar,
    },
  ];

  return (
    <Section className="py-12 sm:py-16">
      <div className="text-center">
        <Eyebrow>Como funciona</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
          A próxima cidade depende de quantos fisios entrarem na lista.
        </h2>
      </div>

      <div className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 font-display text-sm font-bold">
                  {s.n}
                </span>
                <Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.5} />
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-white">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm text-white/65">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// FORM
// ───────────────────────────────────────────────────────────────────────────

type FormState = "idle" | "submitting" | "success" | "error";

function FormSection() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cidadeBase = String(formData.get("cidade") ?? "");
    const cidadeOutra = String(formData.get("cidadeOutra") ?? "").trim();
    const cidade = cidadeBase === "outra" ? cidadeOutra : cidadeBase;

    if (cidadeBase === "outra" && !cidadeOutra) {
      setErrorMsg("Digite o nome da sua cidade.");
      setState("error");
      return;
    }

    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.get("nome"),
          whatsapp: formData.get("whatsapp"),
          cidade,
          source: "proximas-turmas",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao cadastrar");

      setState("success");
      // Redireciona pro WhatsApp pré-preenchido após 1.2s pra usuário ver feedback
      setTimeout(() => {
        if (data.whatsappUrl) window.location.href = data.whatsappUrl;
      }, 1200);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erro inesperado");
      setState("error");
    }
  };

  return (
    <Section id="lista-espera" className="py-12 sm:py-16">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <Eyebrow>Lista de espera</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
            Quero ser o primeiro a saber.
          </h2>
          <p className="mt-3 text-sm text-white/65 sm:text-base">
            Bootcamp na sua cidade só abre quando a lista atinge massa crítica.
            Cadastre-se em 30s e a gente te chama no WhatsApp.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 rounded-3xl border border-cyan-300/20 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8"
        >
          <Field label="Seu nome">
            <input
              name="nome"
              type="text"
              required
              autoComplete="name"
              placeholder="Como te chamamos?"
              className={INPUT_CLS}
            />
          </Field>

          <Field label="WhatsApp">
            <input
              name="whatsapp"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="(67) 99207-6011"
              className={INPUT_CLS}
            />
          </Field>

          <Field label="Sua cidade">
            <CidadeSelect />
          </Field>

          {state === "error" && (
            <p className="text-sm text-red-400">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={state === "submitting" || state === "success"}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 px-5 py-3.5 font-display text-sm font-bold text-white shadow-[0_15px_50px_-15px_rgba(6,182,212,0.6)] transition-all hover:brightness-110 disabled:opacity-60 sm:text-base"
          >
            {state === "submitting" && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {state === "success" && <CheckCircle2 className="h-4 w-4" />}
            {state === "idle" || state === "error"
              ? "Quero entrar na lista"
              : state === "submitting"
                ? "Cadastrando..."
                : "Cadastrado! Abrindo WhatsApp..."}
            {(state === "idle" || state === "error") && (
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            )}
          </button>

          <p className="text-center text-[11px] text-white/40">
            Seus dados ficam só comigo. Sem spam, sem repassar.
          </p>
        </form>
      </div>
    </Section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cyan-200/85">
        {label}
      </span>
      {children}
    </label>
  );
}

const INPUT_CLS =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 transition-colors focus:border-cyan-300/60 focus:bg-white/8 focus:outline-none";

function CidadeSelect() {
  const [cidade, setCidade] = useState<string>("");
  return (
    <div className="space-y-3">
      <div className="relative">
        <select
          name="cidade"
          required
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className={`${INPUT_CLS} appearance-none pr-10`}
        >
          <option value="" disabled>
            Selecione sua cidade...
          </option>
          {CIDADES_SUGERIDAS.map((c) => (
            <option key={c} value={c} className="bg-[#000208]">
              {c}
            </option>
          ))}
          <option value="outra" className="bg-[#000208]">
            Outra cidade...
          </option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
      </div>

      {cidade === "outra" && (
        <input
          name="cidadeOutra"
          type="text"
          autoComplete="address-level2"
          placeholder="Digite sua cidade — ex: Joinville - SC"
          className={INPUT_CLS}
        />
      )}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// BACKUP CTA — Florianópolis (vagas abertas)
// ───────────────────────────────────────────────────────────────────────────

function BackupBootcamp() {
  return (
    <Section className="py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl rounded-3xl border border-orange-400/30 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-pink-500/10 p-6 text-center backdrop-blur-md sm:p-8"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-300/85">
          🔥 Não pode esperar?
        </p>
        <h3 className="mt-3 font-display text-xl font-bold sm:text-2xl">
          Tem turma rolando AGORA em Florianópolis · 23/Mai/2026.
        </h3>
        <p className="mt-2 text-sm text-white/65">
          Vagas limitadas, encerramento em breve.
        </p>
        <a
          href="/api/click?id=proximas-backup-floripa&dest=https%3A%2F%2Fbootcamp.filipeabdalla.com%2F"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-5 py-3 text-sm font-bold text-white transition-all hover:brightness-110"
        >
          Quero garantir minha vaga em Florianópolis
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2.5}
          />
        </a>
      </motion.div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// FAQ
// ───────────────────────────────────────────────────────────────────────────

function FAQ() {
  const items = [
    {
      q: "Quanto custa o bootcamp?",
      a: "O investimento é divulgado quando abrimos a turma da sua cidade. Quem está na lista de espera recebe oferta com desconto antes do público geral.",
    },
    {
      q: "Quanto tempo dura?",
      a: "3 dias presenciais intensivos, com prática supervisionada em pacientes reais.",
    },
    {
      q: "É presencial mesmo? Não tem versão online?",
      a: "Bootcamp é só presencial — a prática hands-on é o coração do treinamento. Pra conteúdo online temos a Mentoria Express e a Aula Bônus.",
    },
    {
      q: "Quando vai ter na minha cidade se ela não está na lista?",
      a: "Quando a sua cidade atingir massa crítica de fisios na lista de espera (~30 inscritos), avaliamos abrir turma. Por isso vale cadastrar mesmo se for cidade pequena — você pode acelerar o processo.",
    },
    {
      q: "Como funciona a prioridade da lista?",
      a: "Quem está na lista de espera é avisado 7 dias antes do público geral E recebe desconto especial nas primeiras 24h.",
    },
    {
      q: "E se eu mudar de ideia?",
      a: "Sair da lista é só responder 'sair' no WhatsApp. Sem perguntas.",
    },
  ];

  return (
    <Section className="py-12 sm:py-16">
      <div className="text-center">
        <Eyebrow>Dúvidas frequentes</Eyebrow>
        <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
          O que você precisa saber.
        </h2>
      </div>

      <div className="mx-auto mt-8 max-w-2xl divide-y divide-white/10">
        {items.map((it) => (
          <details key={it.q} className="group py-4 sm:py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-[15px] font-semibold text-white sm:text-base">
              {it.q}
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 transition-transform group-open:rotate-45">
                <span className="text-lg leading-none">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-[15px]">
              {it.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// LAYOUT HELPERS
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
    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.18em] text-cyan-200 backdrop-blur">
      {children}
    </span>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-4 py-8 text-center text-[11px] text-white/40">
      <p>
        © {new Date().getFullYear()} Dr. Filipe Abdalla — Fisioterapeuta
        Esportivo · PhD
      </p>
      <p className="mt-1">CREFITO · Bootcamp Eletroterapia</p>
    </footer>
  );
}
