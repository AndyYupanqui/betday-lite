import { formatTime } from "@/lib/utils";
import { OddButton } from "./OddButton";
import type { Match } from "@/types";
import Link from "next/link";

export function MatchCard({ match }: { match: Match }) {
  const { homeTeam, awayTeam, market, startTime, league } = match;

  return (
    <div className="group relative bg-surface-2 border border-border hover:border-brand/30 rounded-2xl p-4 transition-all duration-200 hover:bg-surface-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse inline-block" />
          {league.name}
        </span>
        <span className="text-[11px] text-gray-500 tabular-nums">{formatTime(startTime)}</span>
      </div>

      <div className="flex items-center justify-between gap-2 mb-4">
        <TeamChip name={homeTeam.name} short={homeTeam.shortName} side="home" />
        <span className="text-gray-600 font-bold text-xs shrink-0">VS</span>
        <TeamChip name={awayTeam.name} short={awayTeam.shortName} side="away" />
      </div>

      <div className="flex items-center gap-2 justify-between">
        <OddButton matchId={match.id} pick="HOME" label="1" odd={market.odds.home} teamName={homeTeam.name} />
        <OddButton matchId={match.id} pick="DRAW" label="X" odd={market.odds.draw} />
        <OddButton matchId={match.id} pick="AWAY" label="2" odd={market.odds.away} teamName={awayTeam.name} />
      </div>
    </div>
  );
}

function TeamChip({ name, short, side }: { name: string; short: string; side: "home" | "away" }) {
  return (
    <div className={`flex flex-col ${side === "away" ? "items-end" : "items-start"} flex-1 min-w-0`}>
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1 text-xs font-black text-black shrink-0
          ${side === "home" ? "bg-gradient-to-br from-brand to-blue-400" : "bg-gradient-to-br from-purple-400 to-pink-400"}`}
      >
        {short.slice(0, 3)}
      </div>
      <span className={`text-sm font-semibold text-white truncate w-full leading-tight ${side === "home" ? "text-left" : "text-right"}`}>{name}</span>
    </div>
  );
}
