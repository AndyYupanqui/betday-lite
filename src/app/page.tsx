import { Suspense } from "react";
import { groupMatchesByHour, formatDate } from "@/lib/utils";
import { MatchCard } from "./components/MatchCard";
import matchesData from "@/data/matches_today_50.json";
import type { Match } from "@/types";

async function getMatches(): Promise<Match[]> {
  await new Promise((r) => setTimeout(r, 0));
  return matchesData.matches as Match[];
}

export default async function HomePage() {
  const matches = await getMatches();
  const grouped = groupMatchesByHour(matches);
  const dateStr = formatDate(matches[0]?.startTime ?? new Date().toISOString());

  const leagueCount = new Set(matches.map((m) => m.league.id)).size;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-brand/10 text-brand text-xs font-semibold px-3 py-1 rounded-full border border-brand/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            EN VIVO HOY
          </span>
          <span className="text-gray-500 text-sm capitalize">{dateStr}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Eventos del{" "}
          <span className="text-gradient">Día</span>
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          {matches.length} partidos · {leagueCount} liga · Mercado 1X2
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Partidos", value: matches.length, icon: "⚽" },
          { label: "Ligas", value: leagueCount, icon: "🏆" },
          { label: "Horas activas", value: grouped.length, icon: "🕐" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-surface-2 border border-border rounded-2xl p-4 text-center"
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xl font-black text-white">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <Suspense fallback={<TimelineSkeleton />}>
        <Timeline grouped={grouped} />
      </Suspense>
    </div>
  );
}

function Timeline({ grouped }: { grouped: [string, Match[]][] }) {
  return (
    <div className="space-y-10 pb-10">
      {grouped.map(([hour, hourMatches]) => (
        <section key={hour}>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-surface-3 border border-border rounded-xl px-4 py-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-sm font-bold text-white tabular-nums">{hour}</span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-gray-600 shrink-0">
              {hourMatches.length} partido{hourMatches.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {hourMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i}>
          <div className="h-10 w-32 skeleton mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-44 skeleton" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
