"use client";
import { useEffect, useState } from "react";
import { cn, formatOdd } from "@/lib/utils";
import { useBetsStore } from "@/store/bets";
import { useToast } from "./Toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { BetPick } from "@/types";

interface Props {
  matchId: string;
  pick: BetPick;
  label: string;
  odd: number;
  teamName?: string;
}

export function OddButton({ matchId, pick, label, odd, teamName }: Props) {
  const [animating, setAnimating] = useState(false);
  const { placeBet, getBetsByMatch } = useBetsStore();
  const { addToast } = useToast();
  const { data: session } = useSession();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const myBets = mounted ? getBetsByMatch(matchId) : [];
  const alreadyBet = mounted && myBets.some((b) => b.pick === pick);

  const handleClick = () => {
    if (!session) {
      addToast("Debes iniciar sesión para apostar", "error", "🔒");
      router.push("/login");
      return;
    }
    if (alreadyBet) {
      addToast("Ya tienes una apuesta en esta selección", "info", "ℹ️");
      return;
    }
    placeBet(matchId, pick, odd);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    addToast(`Apuesta colocada: ${teamName ?? label} @ ${formatOdd(odd)}`, "success", "🎯");
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl border transition-all duration-200 min-w-[64px]",
        "hover:scale-105 active:scale-95 select-none cursor-pointer",
        alreadyBet
          ? "bg-brand/20 border-brand text-brand glow-brand"
          : "bg-surface-3 border-border hover:border-brand/50 hover:bg-surface-4 text-gray-300",
        animating && "animate-bounce-in"
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{label}</span>
      <span className="text-base font-bold">{formatOdd(odd)}</span>
      {mounted && alreadyBet && (
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand animate-pulse" />
      )}
    </button>
  );
}
