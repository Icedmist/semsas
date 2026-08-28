import { NextResponse } from "next/server";
import { getLiveDashboardData, saveLiveDashboardData, getAllYearsData } from "@/lib/live-data";

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
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");
  const allYears = searchParams.get("all") === "true";
  
  const corsHeaders = getCorsHeaders(request);
  
  try {
    if (allYears) {
      const data = await getAllYearsData();
      return NextResponse.json(data, { headers: corsHeaders });
    }
    
    const year = yearParam ? parseInt(yearParam, 10) : undefined;
    const data = await getLiveDashboardData(year);
    return NextResponse.json(data, { headers: corsHeaders });
  } catch (error) {
    console.error("Failed to load live dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to load data" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: Request) {
  const corsHeaders = getCorsHeaders(request);
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");
  const year = yearParam ? parseInt(yearParam, 10) : undefined;

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
    const saved = await saveLiveDashboardData(body, year);
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