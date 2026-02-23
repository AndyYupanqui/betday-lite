import { notFound } from "next/navigation";
import Link from "next/link";
import { cn, formatOdd, formatDate, pickLabel } from "@/lib/utils";
import matchesData from "@/data/matches_today_50.json";
import betsData from "@/data/bets_me_50.json";
import type { Bet, Match } from "@/types";

function pickFullLabel(pick: "HOME" | "DRAW" | "AWAY") {
  if (pick === "HOME") return "Local";
  if (pick === "AWAY") return "Visitante";
  return "Empate";
}

const matchMap: Record<string, Match> = {};
for (const m of matchesData.matches as Match[]) matchMap[m.id] = m;

const allBets: Bet[] = betsData.bets as Bet[];
const betsMap: Record<string, Bet> = {};
for (const b of allBets) betsMap[b.id] = b;

interface PageProps {
  params: Promise<{ betId: string }>;
}

export default async function BetDetailPage({ params }: PageProps) {
  const { betId } = await params;
  const bet = betsMap[betId];

  if (!bet) notFound();

  const match = matchMap[bet.matchId];
  const profit = bet.status === "WON" ? (bet.return ?? 0) - bet.stake : bet.status === "LOST" ? -bet.stake : 0;
  const potentialReturn = (bet.stake * bet.odd).toFixed(2);

  const statusBg =
    bet.status === "WON"
      ? "bg-brand/10 border-brand/30 text-brand"
      : bet.status === "LOST"
      ? "bg-red-500/10 border-red-500/30 text-red-400"
      : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";

  const statusIcon = bet.status === "WON" ? "🏆" : bet.status === "LOST" ? "❌" : "⏳";

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-16">
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
      >
        ← Volver a mis apuestas
      </Link>

      <div className="bg-surface-2 border border-border rounded-3xl p-6 animate-fade-in">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">#{bet.id}</p>
            <h1 className="text-2xl font-black text-white">Detalle de Apuesta</h1>
          </div>
          <div className={cn("flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold", statusBg)}>
            {statusIcon} {bet.status}
          </div>
        </div>

        {match && (
          <div className="bg-surface-3 border border-border rounded-2xl p-5 mb-6">
            <p className="text-xs text-gray-500 font-medium mb-3">
              🏆 {match.league.name} · {match.league.country}
            </p>
            <div className="flex items-center justify-center gap-6 mb-5">
              <TeamBlock name={match.homeTeam.name} short={match.homeTeam.shortName} side="home" />
              <span className="text-xs font-black text-gray-600 border border-border rounded-lg px-3 py-1">VS</span>
              <TeamBlock name={match.awayTeam.name} short={match.awayTeam.shortName} side="away" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { key: "HOME", label: "1", odd: match.market.odds.home },
                  { key: "DRAW", label: "X", odd: match.market.odds.draw },
                  { key: "AWAY", label: "2", odd: match.market.odds.away },
                ] as const
              ).map(({ key, label, odd }) => {
                const isSelected = bet.pick === key;
                return (
                  <div
                    key={key}
                    className={cn(
                      "flex flex-col items-center gap-1 py-3 rounded-xl border transition-all",
                      isSelected
                        ? "bg-brand/15 border-brand/50 shadow-[0_0_12px_rgba(0,255,135,0.15)]"
                        : "bg-surface-2 border-border"
                    )}
                  >
                    <span className="text-[10px] font-bold text-gray-500">{label}</span>
                    <span className={cn("text-lg font-black", isSelected ? "text-brand" : "text-white")}>
                      {formatOdd(odd)}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] text-brand font-semibold uppercase tracking-wider">
                        Tu pick
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {[
            {
              label: "Selección",
              value: `${pickLabel(bet.pick)} – ${pickFullLabel(bet.pick)}`,
              highlight: false,
            },
            { label: "Cuota", value: formatOdd(bet.odd), highlight: true },
            { label: "Apostado", value: `$${bet.stake}`, highlight: false },
            { label: "Retorno Potencial", value: `$${potentialReturn}`, highlight: false },
            ...(bet.status !== "PENDING"
              ? [
                  {
                    label: "Retorno Real",
                    value: `$${(bet.return ?? 0).toFixed(2)}`,
                    highlight: false,
                    colorClass: bet.status === "WON" ? "text-brand" : "text-red-400",
                  },
                  {
                    label: "Ganancia Neta",
                    value: `${profit > 0 ? "+" : ""}$${profit.toFixed(2)}`,
                    highlight: false,
                    colorClass: profit > 0 ? "text-brand" : "text-red-400",
                  },
                ]
              : []),
            { label: "Fecha", value: formatDate(bet.placedAt), highlight: false },
          ].map((item) => (
            <div key={item.label} className="bg-surface-3 border border-border rounded-xl p-4">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
              <p className={cn("text-base font-bold", (item as { colorClass?: string }).colorClass ?? (item.highlight ? "text-brand" : "text-white"))}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Link
            href="/profile"
            className="flex-1 py-3 rounded-xl border border-border text-gray-400 font-semibold text-sm text-center hover:text-white hover:border-gray-500 transition-all"
          >
            Mis Apuestas
          </Link>
          <Link
            href="/"
            className="flex-1 py-3 rounded-xl bg-brand text-black font-bold text-sm text-center hover:bg-brand-dark transition-all"
          >
            Ver más eventos
          </Link>
        </div>
      </div>
    </div>
  );
}

function TeamBlock({
  name,
  short,
  side,
}: {
  name: string;
  short: string;
  side: "home" | "away";
}) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 text-center">
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black text-black",
          side === "home"
            ? "bg-gradient-to-br from-brand to-blue-400"
            : "bg-gradient-to-br from-purple-400 to-pink-400"
        )}
      >
        {short.slice(0, 3)}
      </div>
      <span className="text-sm font-semibold text-white leading-tight max-w-[80px] truncate">
        {name}
      </span>
    </div>
  );
}
