import { NextRequest, NextResponse } from "next/server";
import { getYear, readStore, writeStore } from "@/lib/live-data";
import { getLiveDashboard, setLiveDashboard } from "@/lib/supabase";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const defaultYear = new Date().getFullYear().toString();
  const year = req.nextUrl.searchParams.get("year") || defaultYear;
  // Try Supabase first, fallback to local JSON
  const sbData = await getLiveDashboard(year);
  if (sbData && sbData.overview) {
    // strip supabase meta
    const { updatedAt, ...data } = sbData;
    if ((data as any).overview) return NextResponse.json({ year, data, source: "supabase", updatedAt }, { headers: { "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization, Cache-Control, Pragma" } });
  }
  const data = getYear(year);
  return NextResponse.json({ year, data, source: "local" }, { headers: { "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization, Cache-Control, Pragma" } });
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("authorization")?.replace("Bearer ","") || req.nextUrl.searchParams.get("key");
  const expected = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY || process.env.ADMIN_SECRET_KEY || "gosemsas-admin-2025";
  if (secret !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const defaultYear = new Date().getFullYear().toString();
  const year = req.nextUrl.searchParams.get("year") || defaultYear;
  const body = await req.json();

  // Save to Supabase
  await setLiveDashboard(year, body);

  // Always persist to local JSON as fallback / mock backend
  const store = readStore();
  store[year] = body;
  writeStore(store);

  return NextResponse.json({ ok: true, year, saved: "supabase+local" });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Cache-Control, Pragma",
    },
  });
}
