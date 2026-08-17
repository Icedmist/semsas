import { NextResponse } from "next/server";
import { getLiveDashboardData, saveLiveDashboardData } from "@/lib/live-data";

export const dynamic = "force-dynamic";

function getCorsHeaders(request: Request) {
  const origin = request.headers.get("origin") || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(request),
  });
}

export async function GET(request: Request) {
  const data = getLiveDashboardData();
  return NextResponse.json(data, {
    headers: getCorsHeaders(request),
  });
}

export async function POST(request: Request) {
  const corsHeaders = getCorsHeaders(request);

  try {
    // Basic Auth Check (optional secure token check via ADMIN_SECRET_KEY env)
    const token = request.headers.get("Authorization")?.split(" ")[1];
    const secretKey = process.env.ADMIN_SECRET_KEY;
    if (secretKey && token !== secretKey) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401, headers: corsHeaders }
      );
    }

    const body = await request.json();
    const saved = saveLiveDashboardData(body);
    return NextResponse.json({ success: true, data: saved }, {
      headers: corsHeaders
    });
  } catch (error) {
    console.error("Failed to save live dashboard data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save data" },
      { status: 500, headers: corsHeaders }
    );
  }
}
