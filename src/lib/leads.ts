import { getSupabase } from "@/lib/supabase";

export type Lead = {
  id: string;
  nome: string;
  whatsapp: string;
  cidade: string;
  source: string | null;
  user_agent: string | null;
  created_at: string;
};

export async function fetchLeads(): Promise<Lead[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("bootcamp_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2000);
  if (error) {
    console.error("[leads] fetch failed", error.message);
    return [];
  }
  return (data ?? []) as Lead[];
}

export type CityStat = { cidade: string; count: number };

export function statsByCity(leads: Lead[]): CityStat[] {
  const counts = new Map<string, number>();
  for (const l of leads) {
    const c = (l.cidade ?? "").trim() || "(sem cidade)";
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([cidade, count]) => ({ cidade, count }))
    .sort((a, b) => b.count - a.count);
}
