export type BetPick = "HOME" | "DRAW" | "AWAY";
export type BetStatus = "PENDING" | "WON" | "LOST";

export interface Team {
  id: string;
  name: string;
  shortName: string;
}

export interface League {
  id: string;
  name: string;
  country: string;
}

export interface Market {
  type: "1X2";
  odds: { home: number; draw: number; away: number };
}

export interface Match {
  id: string;
  startTime: string;
  league: League;
  homeTeam: Team;
  awayTeam: Team;
  market: Market;
}

export interface Bet {
  id: string;
  matchId: string;
  placedAt: string;
  pick: BetPick;
  odd: number;
  stake: number;
  status: BetStatus;
  return: number | null;
}

export interface BetWithMatch extends Bet {
  match?: Match;
}
