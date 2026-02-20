"use client";
import { useBetsStore } from "@/store/bets";
import { BetCard } from "../components/BetCard";
import type { Match } from "@/types";
import Link from "next/link";

interface Props {
  betsMatched: Match[];
}

const matchMap: Record<string, Match> = {};

export function ProfileClient({ betsMatched }: Props) {
  const { bets } = useBetsStore();

  for (const m of betsMatched as Match[]) matchMap[m.id] = m;
  const betsWithMatch = bets.map((b) => ({ ...b, match: matchMap[b.matchId] }));

  const won = bets.filter(b => b.status === "WON").length;
  const lost = bets.filter(b => b.status === "LOST").length;
  const pending = bets.filter(b => b.status === "PENDING").length;
  const totalReturn = bets.reduce((acc, b) => acc + (b.return ?? 0), 0);
  const totalStake = bets.reduce((acc, b) => acc + b.stake, 0);

  if (bets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-xl font-bold text-white mb-2">Sin apuestas aún</h2>
        <p className="text-gray-400 text-sm mb-6">Ve a la pantalla de eventos y realiza tu primera apuesta</p>
        <Link href="/" className="px-6 py-3 bg-brand text-black font-bold rounded-xl hover:bg-brand-dark transition-all">
          Ver eventos
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Ganadas", value: won, color: "text-brand" },
          { label: "Perdidas", value: lost, color: "text-red-400" },
          { label: "Pendientes", value: pending, color: "text-yellow-400" },
          { label: "ROI", value: `${totalReturn > 0 ? "+" : ""}$${(totalReturn - totalStake).toFixed(0)}`, color: totalReturn >= totalStake ? "text-brand" : "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="bg-surface-2 border border-border rounded-2xl p-4 text-center">
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Mis Apuestas</h2>
        <span className="text-sm text-gray-500">{bets.length} total</span>
      </div>

      <div className="space-y-3">
        {betsWithMatch.map((bet) => (
          <BetCard key={bet.id} bet={bet} />
        ))}
      </div>
    </>
  );
}
