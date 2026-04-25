import { getSupabase, type Click } from "@/lib/supabase";
import { LINKS } from "@/lib/links";

export type Period = "24h" | "7d" | "30d";

export function periodToHours(p: Period): number {
  return p === "24h" ? 24 : p === "7d" ? 24 * 7 : 24 * 30;
}

export function periodLabel(p: Period): string {
  return p === "24h" ? "Últimas 24h" : p === "7d" ? "Últimos 7 dias" : "Últimos 30 dias";
}

export async function fetchClicks(period: Period): Promise<Click[]> {
  const sb = getSupabase();
  if (!sb) return [];

  const since = new Date(Date.now() - periodToHours(period) * 3600 * 1000);
  const { data, error } = await sb
    .from("clicks")
    .select("*")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    console.error("[analytics] fetchClicks failed", error.message);
    return [];
  }
  return (data ?? []) as Click[];
}

export type LinkStat = { link_id: string; label: string; clicks: number };

export function statsByLink(clicks: Click[]): LinkStat[] {
  const counts = new Map<string, number>();
  for (const c of clicks) counts.set(c.link_id, (counts.get(c.link_id) ?? 0) + 1);

  const labelOf = (id: string) => {
    const known = LINKS.find((l) => l.id === id);
    if (known) return known.label;
    if (id.startsWith("social-")) return `Social · ${id.replace("social-", "")}`;
    return id;
  };

  return Array.from(counts.entries())
    .map(([link_id, clicks]) => ({ link_id, label: labelOf(link_id), clicks }))
    .sort((a, b) => b.clicks - a.clicks);
}

export type DayBucket = { date: string; clicks: number };

export function statsByDay(clicks: Click[], period: Period): DayBucket[] {
  const days = period === "24h" ? 1 : period === "7d" ? 7 : 30;
  const buckets = new Map<string, number>();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 3600 * 1000);
    buckets.set(d.toISOString().slice(0, 10), 0);
  }
  for (const c of clicks) {
    const key = c.created_at.slice(0, 10);
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }
  return Array.from(buckets.entries()).map(([date, clicks]) => ({ date, clicks }));
}

export type DeviceStat = { device: string; clicks: number };

export function statsByDevice(clicks: Click[]): DeviceStat[] {
  const counts: Record<string, number> = { mobile: 0, desktop: 0, tablet: 0 };
  for (const c of clicks) counts[c.device] = (counts[c.device] ?? 0) + 1;
  return Object.entries(counts)
    .filter(([, n]) => n > 0)
    .map(([device, clicks]) => ({ device, clicks }));
}

export type CountryStat = { country: string; clicks: number };

export function statsByCountry(clicks: Click[]): CountryStat[] {
  const counts = new Map<string, number>();
  for (const c of clicks) {
    const key = c.country ?? "??";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([country, clicks]) => ({ country, clicks }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 8);
}

export function summarize(clicks: Click[]) {
  const total = clicks.length;
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = clicks.filter((c) => c.created_at.slice(0, 10) === today).length;
  const top = statsByLink(clicks)[0];
  const dev = statsByDevice(clicks).sort((a, b) => b.clicks - a.clicks)[0];
  return {
    total,
    todayCount,
    topLink: top?.label ?? "-",
    topLinkClicks: top?.clicks ?? 0,
    topDevice: dev?.device ?? "-",
  };
}
