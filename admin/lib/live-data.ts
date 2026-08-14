import fs from "fs";
import path from "path";

export interface LiveDashboardData {
  updatedAt: string;
  dashboard: {
    emergencyCalls: number;
    livesSaved: number;
    patientsMoved: number;
    totalAmbulances: number;
  };
  hero: {
    ambulances: number;
    personnel: number;
    communities: number;
    responses: number;
  };
  status: {
    message: string;
    status: "operational" | "degraded" | "offline";
  };
}

const DEFAULT_DATA: LiveDashboardData = {
  updatedAt: new Date().toISOString(),
  dashboard: {
    emergencyCalls: 0,
    livesSaved: 0,
    patientsMoved: 0,
    totalAmbulances: 0,
  },
  hero: {
    ambulances: 25,
    personnel: 180,
    communities: 110,
    responses: 4500,
  },
  status: {
    message: "All Systems Working",
    status: "operational",
  },
};

function getDataPath(): string {
  if (process.env.LIVE_DATA_PATH) {
    return process.env.LIVE_DATA_PATH;
  }
  return path.join(process.cwd(), "..", "data", "live-dashboard.json");
}

export function getLiveDashboardData(): LiveDashboardData {
  try {
    const raw = fs.readFileSync(getDataPath(), "utf-8");
    return JSON.parse(raw) as LiveDashboardData;
  } catch (error) {
    console.error("Failed to read live dashboard data:", error);
    return DEFAULT_DATA;
  }
}

export function saveLiveDashboardData(
  data: LiveDashboardData
): LiveDashboardData {
  const saved = {
    ...data,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(getDataPath(), JSON.stringify(saved, null, 2), "utf-8");
  return saved;
}
