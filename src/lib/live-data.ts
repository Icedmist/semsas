import fs from "fs";
import path from "path";
import { put, get } from "@vercel/blob";
import { defaultDashboardData } from "./default-dashboard-data";

export type LiveDashboardData = typeof defaultDashboardData;

const DATA_PATH = path.join(process.cwd(), "data", "live-dashboard.json");
const BLOB_PATHNAME = "live-dashboard.json";

function readLocal(): LiveDashboardData {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as LiveDashboardData;
  } catch (error) {
    console.error("Failed to read local live dashboard data:", error);
    return defaultDashboardData;
  }
}

async function readFromBlob(): Promise<LiveDashboardData | null> {
  try {
    const result = await get(BLOB_PATHNAME, { access: "public" });
    if (!result || !result.stream) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as LiveDashboardData;
  } catch (error) {
    console.error("Failed to read live dashboard data from Vercel Blob:", error);
    return null;
  }
}

function writeLocal(data: LiveDashboardData): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getLiveDashboardData(): Promise<LiveDashboardData> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blobData = await readFromBlob();
    if (blobData) return blobData;
  }
  return readLocal();
}

export async function saveLiveDashboardData(data: LiveDashboardData): Promise<LiveDashboardData> {
  const saved = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await put(BLOB_PATHNAME, JSON.stringify(saved), {
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

  writeLocal(saved);
  return saved;
}
