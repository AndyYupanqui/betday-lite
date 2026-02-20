import { NextResponse } from "next/server";
import matchesData from "@/data/matches_today_50.json";

export async function GET() {
  return NextResponse.json(matchesData);
}
