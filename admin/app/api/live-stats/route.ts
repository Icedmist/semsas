import { NextResponse } from "next/server";
import {
  getLiveDashboardData,
  saveLiveDashboardData,
  type LiveDashboardData,
} from "@/lib/live-data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getLiveDashboardData());
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LiveDashboardData>;
    const current = getLiveDashboardData();

    const merged: LiveDashboardData = {
      updatedAt: current.updatedAt,
      dashboard: {
        ...current.dashboard,
        ...(body.dashboard ?? {}),
      },
      hero: {
        ...current.hero,
        ...(body.hero ?? {}),
      },
      status: {
        ...current.status,
        ...(body.status ?? {}),
      },
    };

    const saved = saveLiveDashboardData(merged);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    console.error("Failed to save live dashboard data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save data" },
      { status: 500 }
    );
  }
}
