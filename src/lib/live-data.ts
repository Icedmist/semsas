import fs from "fs";
import path from "path";
import { put, get } from "@vercel/blob";
import { defaultDashboardData, defaultYearlyData, CURRENT_YEAR, AVAILABLE_YEARS } from "./default-dashboard-data";
import seedData from "../../data/live-dashboard.json";

export type LiveDashboardData = typeof defaultDashboardData;
export type YearlyDashboardData = Record<number, LiveDashboardData>;

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_PATH = path.join(DATA_DIR, "live-dashboard.json");
const BLOB_PATHNAME = "live-dashboard.json";

function readLocal(): YearlyDashboardData {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw) as YearlyDashboardData | LiveDashboardData;
    
    if ("overview" in data) {
      // Old format - migrate to new year-based format
      return { [CURRENT_YEAR]: data as LiveDashboardData };
    }
    
    return data as YearlyDashboardData;
  } catch (error) {
    console.error("Failed to read local live dashboard data:", error);
    return defaultYearlyData;
  }
}

async function readFromBlob(): Promise<YearlyDashboardData | null> {
  try {
    const result = await get(BLOB_PATHNAME, { access: "public" });
    if (!result || !result.stream) return null;
    const text = await new Response(result.stream).text();
    const data = JSON.parse(text) as YearlyDashboardData | LiveDashboardData;
    
    if ("overview" in data) {
      // Old format - migrate to new year-based format
      return { [CURRENT_YEAR]: data as LiveDashboardData };
    }
    
    return data as YearlyDashboardData;
  } catch (error) {
    console.error("Failed to read live dashboard data from Vercel Blob:", error);
    return null;
  }
}

function writeLocal(data: YearlyDashboardData): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getLiveDashboardData(year?: number): Promise<LiveDashboardData> {
  const targetYear = year || CURRENT_YEAR;
  
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blobData = await readFromBlob();
    if (blobData && blobData[targetYear]) return blobData[targetYear];
  }
  
  const localData = readLocal();
  if (localData[targetYear]) return localData[targetYear];
  
  // Return default data for the year if available, otherwise empty defaults
  return defaultYearlyData[targetYear] || defaultDashboardData;
}

export async function getAllYearsData(): Promise<YearlyDashboardData> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blobData = await readFromBlob();
    if (blobData) return blobData;
  }
  return readLocal();
}

export async function saveLiveDashboardData(data: LiveDashboardData, year?: number): Promise<LiveDashboardData> {
  const targetYear = year || CURRENT_YEAR;
  const saved = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  // Get all existing years data
  let allData: YearlyDashboardData;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blobData = await readFromBlob();
    allData = blobData || readLocal();
  } else {
    allData = readLocal();
  }

  // Update the specific year
  allData[targetYear] = saved;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put(BLOB_PATHNAME, JSON.stringify(allData), {
        contentType: "application/json",
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      return saved;
    } catch (error) {
      console.error("Failed to save live dashboard data to Vercel Blob:", error);
    }
  }

  writeLocal(allData);
  return saved;
}

export function getAvailableYears(): number[] {
  return AVAILABLE_YEARS;
}

export function getCurrentYear(): number {
  return CURRENT_YEAR;
}

// === Compatibility wrappers for Firebase mock (Downloads) ===
import { defaultYearlyData as _defaults } from "./default-dashboard-data";
export function readStore(): Record<string, any> {
  const all = readLocal();
  // Normalize to string keys
  const out: Record<string, any> = {};
  for (const [k,v] of Object.entries(all)) out[String(k)] = v;
  // Ensure fallback
  if (!out["2025"]) out["2025"] = (_defaults as any)["2025"];
  if (!out["2026"]) out["2026"] = (_defaults as any)["2026"];
  return out;
}
export function writeStore(data: Record<string, any>) {
  const yearly: any = {};
  for (const [k,v] of Object.entries(data)) yearly[Number(k)] = v;
  writeLocal(yearly);
}
export function getYear(year: string | null): any {
  const y = year ? parseInt(year) : CURRENT_YEAR;
  // Try getLiveDashboardData sync fallback via readLocal
  const all = readLocal();
  return all[y] || all[CURRENT_YEAR];
}
