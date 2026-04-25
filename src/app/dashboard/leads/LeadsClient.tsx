"use client";

import { Download, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { CityStat, Lead } from "@/lib/leads";

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const fmtPhone = (raw: string) => {
  const d = raw.replace(/\D/g, "");
  if (d.length === 13) {
    // 55 DD 9XXXXXXXX
    return `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, 9)}-${d.slice(9)}`;
  }
  if (d.length === 11) {
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }
  return raw;
};

const waLink = (raw: string, nome: string) => {
  const d = raw.replace(/\D/g, "");
  const msg = encodeURIComponent(
    `Olá ${nome.split(" ")[0]}! Aqui é o Dr. Filipe. Tudo bem?`,
  );
  return `https://wa.me/${d}?text=${msg}`;
};

export function LeadsClient({
  leads,
  byCity,
}: {
  leads: Lead[];
  byCity: CityStat[];
}) {
  const [filter, setFilter] = useState("");
  const [cityFilter, setCityFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let res = leads;
    if (cityFilter) res = res.filter((l) => l.cidade === cityFilter);
    if (filter.trim()) {
      const q = filter.toLowerCase();
      res = res.filter(
        (l) =>
          l.nome.toLowerCase().includes(q) ||
          l.whatsapp.includes(q.replace(/\D/g, "")) ||
          l.cidade.toLowerCase().includes(q),
      );
    }
    return res;
  }, [leads, cityFilter, filter]);

  const exportCsv = () => {
    const header = ["nome", "whatsapp", "cidade", "data"];
    const rows = filtered.map((l) => [
      l.nome,
      l.whatsapp,
      l.cidade,
      l.created_at,
    ]);
    const csv = [header, ...rows]
      .map((r) =>
        r
          .map((cell) => {
            const s = String(cell ?? "").replace(/"/g, '""');
            return /[",\n]/.test(s) ? `"${s}"` : s;
          })
          .join(","),
      )
      .join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bootcamp-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr]">
      {/* SIDEBAR - cidades */}
      <aside className="glass rounded-2xl p-4">
        <h2 className="mb-3 font-display text-sm font-semibold tracking-wide text-[#F4F4F4]">
          Por cidade
        </h2>
        {byCity.length === 0 ? (
          <p className="text-xs text-[#F4F4F4]/40">Sem leads ainda.</p>
        ) : (
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setCityFilter(null)}
                className={[
                  "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  cityFilter === null
                    ? "bg-[#03A0CD]/15 text-white"
                    : "text-[#F4F4F4]/75 hover:bg-white/5",
                ].join(" ")}
              >
                Todas{" "}
                <span className="ml-1 text-xs text-[#F4F4F4]/50">
                  ({leads.length})
                </span>
              </button>
            </li>
            {byCity.map((c) => (
              <li key={c.cidade}>
                <button
                  onClick={() => setCityFilter(c.cidade)}
                  className={[
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    cityFilter === c.cidade
                      ? "bg-[#03A0CD]/15 text-white"
                      : "text-[#F4F4F4]/75 hover:bg-white/5",
                  ].join(" ")}
                >
                  <span className="truncate">{c.cidade}</span>
                  <span className="ml-2 shrink-0 font-mono text-xs text-[#F4F4F4]/55">
                    {c.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* MAIN - tabela */}
      <section>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#F4F4F4]/40" />
            <input
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar por nome, telefone ou cidade..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-9 text-sm text-white placeholder:text-white/40 focus:border-[#03A0CD]/60 focus:outline-none"
            />
            {filter && (
              <button
                onClick={() => setFilter("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#F4F4F4]/40 hover:bg-white/10"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {cityFilter && (
            <button
              onClick={() => setCityFilter(null)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#03A0CD]/15 px-3 py-1.5 text-xs font-semibold text-[#03A0CD] hover:bg-[#03A0CD]/25"
            >
              {cityFilter}
              <X className="h-3 w-3" />
            </button>
          )}

          <button
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#03A0CD]/40 bg-[#03A0CD]/10 px-4 py-2 text-xs font-semibold text-[#03A0CD] transition-colors hover:bg-[#03A0CD]/20 disabled:opacity-40"
          >
            <Download className="h-3.5 w-3.5" />
            Exportar CSV ({filtered.length})
          </button>
        </div>

        <div className="glass overflow-hidden rounded-2xl">
          {filtered.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-sm text-[#F4F4F4]/40">
              Nenhum lead encontrado.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase tracking-wider text-[#F4F4F4]/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Nome</th>
                    <th className="px-4 py-3 text-left font-semibold">
                      WhatsApp
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Cidade
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Quando
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[#F4F4F4]/85">
                  {filtered.map((l) => (
                    <tr key={l.id} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-semibold text-white">
                        {l.nome}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={waLink(l.whatsapp, l.nome)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-300 hover:underline"
                        >
                          {fmtPhone(l.whatsapp)}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-[#F4F4F4]/75">
                        {l.cidade}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-xs text-[#F4F4F4]/65">
                        {fmtTime(l.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
