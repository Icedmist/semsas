import { NextRequest, NextResponse } from "next/server";
import { getYear, readStore, writeStore } from "@/lib/live-data";
import { getLiveDashboard, setLiveDashboard } from "@/lib/firebase";

export async function GET(req: NextRequest) {
  const year = req.nextUrl.searchParams.get("year") || "2025";
  // Try Firebase first, fallback to local JSON
  const fb = await getLiveDashboard(year);
  if (fb && fb.overview) {
    // strip firebase meta
    const { updatedAt, ...data } = fb;
    // if fb data has nested structure, return it
    if ((data as any).overview) return NextResponse.json({ year, data, source: "firebase", updatedAt }, { headers: { "Cache-Control": "no-store" } });
  }
  const data = getYear(year);
  return NextResponse.json({ year, data, source: "local" }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("authorization")?.replace("Bearer ","") || req.nextUrl.searchParams.get("key");
  const expected = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY || process.env.ADMIN_SECRET_KEY || "gosemsas-admin-2025";
  if (secret !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const year = req.nextUrl.searchParams.get("year") || "2025";
  const body = await req.json();

  // Save to Firebase (mock will no-op but keep)
  await setLiveDashboard(year, body);

  // Always persist to local JSON as fallback / mock backend
  const store = readStore();
  store[year] = body;
  writeStore(store);

  return NextResponse.json({ ok: true, year, saved: "firebase+local" });
}
