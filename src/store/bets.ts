"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Bet, BetPick } from "@/types";
import betsData from "@/data/bets_me_50.json";

interface BetsStore {
  bets: Bet[];
  placeBet: (matchId: string, pick: BetPick, odd: number, stake?: number) => Bet;
  getBetsByMatch: (matchId: string) => Bet[];
  getBetById: (id: string) => Bet | undefined;
}

const initialBets = betsData.bets as Bet[];

export const useBetsStore = create<BetsStore>()(
  persist(
    (set, get) => ({
      bets: initialBets,
      placeBet: (matchId, pick, odd, stake = 10) => {
        const newBet: Bet = {
          id: `bet_${Date.now()}`,
          matchId,
          placedAt: new Date().toISOString(),
          pick,
          odd,
          stake,
          status: "PENDING",
          return: null,
        };
        set((s) => ({ bets: [newBet, ...s.bets] }));
        return newBet;
      },
      getBetsByMatch: (matchId) => get().bets.filter((b) => b.matchId === matchId),
      getBetById: (id) => get().bets.find((b) => b.id === id),
    }),
    { name: "betday-bets" }
  )
);
