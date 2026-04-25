import {
  fetchClicks,
  periodLabel,
  statsByCountry,
  statsByDay,
  statsByDevice,
  statsByLink,
  summarize,
  type Period,
} from "@/lib/analytics";
import { DashboardClient } from "./DashboardClient";

export const dynamic = "force-dynamic";

const VALID: Period[] = ["24h", "7d", "30d"];

type SearchParams = Promise<{ p?: string }>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { p } = await searchParams;
  const period: Period = (VALID as string[]).includes(p ?? "")
    ? (p as Period)
    : "7d";

  const clicks = await fetchClicks(period);
  const summary = summarize(clicks);
  const byLink = statsByLink(clicks);
  const byDay = statsByDay(clicks, period);
  const byDevice = statsByDevice(clicks);
  const byCountry = statsByCountry(clicks);
  const recent = clicks.slice(0, 50);

  return (
    <DashboardClient
      period={period}
      periodLabel={periodLabel(period)}
      summary={summary}
      byLink={byLink}
      byDay={byDay}
      byDevice={byDevice}
      byCountry={byCountry}
      recent={recent}
    />
  );
}
