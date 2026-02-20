"use client";
import Link from "next/link";
import { cn, formatOdd, formatTime, pickLabel, statusColor } from "@/lib/utils";
import type { BetWithMatch } from "@/types";

export function BetCard({ bet }: { bet: BetWithMatch }) {
  const match = bet.match;
  const label = pickLabel(bet.pick, match);

  const statusIcon = bet.status === "WON" ? "🏆" : bet.status === "LOST" ? "❌" : "⏳";
  const statusBg =
    bet.status === "WON"
      ? "border-brand/30 bg-brand/5"
      : bet.status === "LOST"
      ? "border-red-500/20 bg-red-500/5"
      : "border-yellow-500/20 bg-yellow-500/5";

  return (
    <Link href={`/bets/${bet.id}`} className="block">
      <div
        className={cn(
          "group border rounded-2xl p-4 transition-all duration-200 hover:scale-[1.01] cursor-pointer",
          statusBg
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[11px] text-gray-500 font-medium">
              {match?.league.name ?? "Premier League"}
            </p>
            <p className="text-sm font-semibold text-white mt-0.5">
              {match ? `${match.homeTeam.name} vs ${match.awayTeam.name}` : bet.matchId}
            </p>
          </div>
          <span className="text-xl">{statusIcon}</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 bg-surface-3 rounded-lg px-3 py-1.5">
            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Pick</span>
            <span className="text-sm font-bold text-white">{label}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-3 rounded-lg px-3 py-1.5">
            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Cuota</span>
            <span className="text-sm font-bold text-brand">{formatOdd(bet.odd)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-surface-3 rounded-lg px-3 py-1.5">
            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Stake</span>
            <span className="text-sm font-bold text-white">${bet.stake}</span>
          </div>
          {bet.return !== null && (
            <div className="flex items-center gap-1.5 bg-surface-3 rounded-lg px-3 py-1.5">
              <span className="text-[10px] text-gray-500 uppercase tracking-wide">Retorno</span>
              <span className={cn("text-sm font-bold", bet.return > 0 ? "text-brand" : "text-red-400")}>
                ${bet.return?.toFixed(2)}
              </span>
            </div>
          )}
          <div className="ml-auto">
            <span className={cn("text-xs font-semibold uppercase tracking-wider", statusColor(bet.status))}>
              {bet.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
