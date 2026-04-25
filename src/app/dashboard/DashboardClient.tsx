"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LogOut, MousePointerClick, Smartphone, TrendingUp, Trophy } from "lucide-react";
import type { Click } from "@/lib/supabase";
import type {
  CountryStat,
  DayBucket,
  DeviceStat,
  LinkStat,
  Period,
} from "@/lib/analytics";

type Summary = {
  total: number;
  todayCount: number;
  topLink: string;
  topLinkClicks: number;
  topDevice: string;
};

type Props = {
  period: Period;
  periodLabel: string;
  summary: Summary;
  byLink: LinkStat[];
  byDay: DayBucket[];
  byDevice: DeviceStat[];
  byCountry: CountryStat[];
  recent: Click[];
};

const TURQUESA = "#03A0CD";
const MARINHO = "#02097D";
const DEVICE_COLORS: Record<string, string> = {
  mobile: "#03A0CD",
  desktop: "#02097D",
  tablet: "#7DD3FC",
};

const fmtDay = (iso: string) => {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
};
const fmtTime = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const flag = (cc: string | null) => {
  if (!cc || cc.length !== 2) return "🌐";
  return String.fromCodePoint(...[...cc.toUpperCase()].map((c) => 0x1f1e6 - 65 + c.charCodeAt(0)));
};

export function DashboardClient({
  period,
  periodLabel,
  summary,
  byLink,
  byDay,
  byDevice,
  byCountry,
  recent,
}: Props) {
  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#03A0CD]">
            Filipe Abdalla
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-[#F4F4F4]">
            Dashboard de cliques
          </h1>
          <p className="mt-1 text-sm text-[#F4F4F4]/60">{periodLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/leads"
            className="glass flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#03A0CD] transition-colors hover:bg-[#03A0CD]/15"
          >
            <Users className="h-3.5 w-3.5" />
            Leads Bootcamp
          </Link>
          <PeriodTabs current={period} />
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              aria-label="Sair"
              className="glass flex h-10 w-10 items-center justify-center rounded-xl text-[#F4F4F4]/70 transition-colors hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </header>

      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi
          icon={<MousePointerClick className="h-4 w-4" />}
          label="Total de cliques"
          value={summary.total.toLocaleString("pt-BR")}
        />
        <Kpi
          icon={<TrendingUp className="h-4 w-4" />}
          label="Hoje"
          value={summary.todayCount.toLocaleString("pt-BR")}
        />
        <Kpi
          icon={<Trophy className="h-4 w-4" />}
          label="Link mais clicado"
          value={summary.topLink}
          sub={`${summary.topLinkClicks} cliques`}
        />
        <Kpi
          icon={<Smartphone className="h-4 w-4" />}
          label="Dispositivo top"
          value={summary.topDevice}
        />
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card title="Cliques por dia" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={byDay} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={MARINHO} />
                    <stop offset="100%" stopColor={TURQUESA} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(244,244,244,0.07)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={fmtDay}
                  stroke="rgba(244,244,244,0.5)"
                  fontSize={11}
                />
                <YAxis stroke="rgba(244,244,244,0.5)" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelFormatter={(v) => fmtDay(String(v))}
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="url(#lineGrad)"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: TURQUESA }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Por dispositivo">
          {byDevice.length === 0 ? (
            <Empty />
          ) : (
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={byDevice}
                    dataKey="clicks"
                    nameKey="device"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {byDevice.map((d) => (
                      <Cell
                        key={d.device}
                        fill={DEVICE_COLORS[d.device] ?? TURQUESA}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    wrapperStyle={{ fontSize: 12, color: "#F4F4F4" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card title="Cliques por link" className="lg:col-span-2">
          {byLink.length === 0 ? (
            <Empty />
          ) : (
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart
                  data={byLink}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke="rgba(244,244,244,0.07)" horizontal={false} />
                  <XAxis type="number" stroke="rgba(244,244,244,0.5)" fontSize={11} allowDecimals={false} />
                  <YAxis
                    type="category"
                    dataKey="label"
                    stroke="rgba(244,244,244,0.7)"
                    fontSize={11}
                    width={170}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="clicks" fill={TURQUESA} radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card title="Top países">
          {byCountry.length === 0 ? (
            <Empty />
          ) : (
            <ul className="space-y-2.5">
              {byCountry.map((c) => {
                const max = byCountry[0].clicks;
                const pct = (c.clicks / max) * 100;
                return (
                  <li key={c.country} className="text-sm">
                    <div className="mb-1 flex items-center justify-between text-[#F4F4F4]/80">
                      <span>
                        <span className="mr-2">{flag(c.country)}</span>
                        {c.country}
                      </span>
                      <span className="font-mono text-xs text-[#F4F4F4]/60">
                        {c.clicks}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#02097D] to-[#03A0CD]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </section>

      <section className="mt-4">
        <Card title={`Últimos ${recent.length} cliques`}>
          {recent.length === 0 ? (
            <Empty />
          ) : (
            <div className="-mx-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase tracking-wider text-[#F4F4F4]/50">
                  <tr>
                    <th className="px-2 py-2 text-left font-semibold">Quando</th>
                    <th className="px-2 py-2 text-left font-semibold">Link</th>
                    <th className="px-2 py-2 text-left font-semibold">Device</th>
                    <th className="px-2 py-2 text-left font-semibold">País</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[#F4F4F4]/85">
                  {recent.map((c) => (
                    <tr key={c.id}>
                      <td className="px-2 py-2 whitespace-nowrap font-mono text-xs text-[#F4F4F4]/70">
                        {fmtTime(c.created_at)}
                      </td>
                      <td className="px-2 py-2">{c.link_id}</td>
                      <td className="px-2 py-2 capitalize">{c.device}</td>
                      <td className="px-2 py-2">
                        {flag(c.country)} {c.country ?? "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </section>
    </main>
  );
}

function Kpi({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center gap-2 text-[#03A0CD]">
        {icon}
        <span className="text-[11px] font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-2 font-display text-xl font-bold text-[#F4F4F4] sm:text-2xl line-clamp-1">
        {value}
      </p>
      {sub && <p className="text-xs text-[#F4F4F4]/50">{sub}</p>}
    </div>
  );
}

function Card({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`glass rounded-2xl p-5 ${className ?? ""}`}>
      <h2 className="mb-4 font-display text-sm font-semibold tracking-wide text-[#F4F4F4]">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Empty() {
  return (
    <div className="flex h-48 items-center justify-center text-sm text-[#F4F4F4]/40">
      Sem dados ainda neste período.
    </div>
  );
}

function PeriodTabs({ current }: { current: Period }) {
  const opts: { value: Period; label: string }[] = [
    { value: "24h", label: "24h" },
    { value: "7d", label: "7 dias" },
    { value: "30d", label: "30 dias" },
  ];
  return (
    <div className="glass flex rounded-xl p-1">
      {opts.map((o) => {
        const active = o.value === current;
        return (
          <Link
            key={o.value}
            href={`/dashboard?p=${o.value}`}
            className={[
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
              active ? "bg-[#03A0CD] text-white" : "text-[#F4F4F4]/70 hover:text-white",
            ].join(" ")}
          >
            {o.label}
          </Link>
        );
      })}
    </div>
  );
}

const tooltipStyle = {
  background: "#000330",
  border: "1px solid rgba(3,160,205,0.4)",
  borderRadius: 12,
  color: "#F4F4F4",
  fontSize: 12,
};
