import { NextResponse } from "next/server";
import betsData from "@/data/bets_me_50.json";

export async function GET(_req: Request, { params }: { params: Promise<{ betId: string }> }) {
  const { betId } = await params;
  const bet = betsData.bets.find((b) => b.id === betId);
  if (!bet) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(bet);
}
