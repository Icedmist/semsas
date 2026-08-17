import fs from "fs";
import path from "path";
import { defaultDashboardData } from "./default-dashboard-data";

export type LiveDashboardData = typeof defaultDashboardData;

const DATA_PATH = path.join(process.cwd(), "data", "live-dashboard.json");

export function getLiveDashboardData(): LiveDashboardData {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as LiveDashboardData;
  } catch (error) {
    console.error("Failed to read live dashboard data:", error);
    return defaultDashboardData;
  }
}

export function saveLiveDashboardData(data: LiveDashboardData): LiveDashboardData {
  try {
    const saved = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(DATA_PATH, JSON.stringify(saved, null, 2), "utf-8");
    return saved;
  } catch (error) {
    console.error("Failed to save live dashboard data:", error);
    throw error;
  }
}
