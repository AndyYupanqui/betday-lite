import { NextResponse } from "next/server";
import betsData from "@/data/bets_me_50.json";

export async function GET() {
  return NextResponse.json(betsData);
}
