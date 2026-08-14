import { NextResponse } from "next/server";
import { getLiveDashboardData } from "@/lib/live-data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getLiveDashboardData());
}
