import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { Match } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatOdd(odd: number) {
  return odd?.toFixed(2);
}

export function formatTime(iso: string) {
  return format(parseISO(iso), "HH:mm");
}

export function formatDate(iso: string) {
  try {
    return format(parseISO(iso), "d 'de' MMMM yyyy", { locale: es });
  } catch {
    return format(new Date(iso), "d 'de' MMMM yyyy", { locale: es });
  }
}

export function groupMatchesByHour(matches: Match[]): [string, Match[]][] {
  const groups: Record<string, Match[]> = {};
  for (const match of matches) {
    const d = new Date(match.startTime);
    const hour = String(d.getHours()).padStart(2, "0") + ":00";
    if (!groups[hour]) groups[hour] = [];
    groups[hour].push(match);
  }

  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

export function pickLabel(
  pick: "HOME" | "DRAW" | "AWAY",
  match?: { homeTeam?: { shortName: string }; awayTeam?: { shortName: string } }
) {
  if (pick === "HOME") return match?.homeTeam?.shortName ?? "1";
  if (pick === "AWAY") return match?.awayTeam?.shortName ?? "2";
  return "X";
}

export function statusColor(status: string) {
  if (status === "WON") return "text-brand";
  if (status === "LOST") return "text-red-400";
  return "text-yellow-400";
}

export function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}
