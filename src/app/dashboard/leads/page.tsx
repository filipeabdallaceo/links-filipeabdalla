import Link from "next/link";
import { fetchLeads, statsByCity } from "@/lib/leads";
import { LeadsClient } from "./LeadsClient";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await fetchLeads();
  const byCity = statsByCity(leads);

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#03A0CD] hover:text-white"
          >
            ← Dashboard
          </Link>
          <h1 className="mt-2 font-display text-2xl font-bold text-[#F4F4F4]">
            Lista de espera · Bootcamp
          </h1>
          <p className="mt-1 text-sm text-[#F4F4F4]/60">
            {leads.length.toLocaleString("pt-BR")} leads cadastrados ·{" "}
            {byCity.length} cidades
          </p>
        </div>
      </header>

      <LeadsClient leads={leads} byCity={byCity} />
    </main>
  );
}
