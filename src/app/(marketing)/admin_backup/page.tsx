"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LogOut, Save } from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabase";

const EMPTY_DASHBOARD_DATA = {
  year: new Date().getFullYear().toString(),
  lgas: [
    { name: "DUKKU", months: [67, 109, 169, 23, 4, 6, 9] },
    { name: "FUNAKA", months: [59, 89, 113, 7, 29, 50, 26] },
    { name: "KWAMI", months: [14, 103, 123, 31, 3, 6, 7] },
    { name: "NAFADA", months: [67, 93, 207, 41, 6, 7, 11] },
    { name: "SHONGO", months: [91, 184, 131, 4, 4, 4, 5] },
    { name: "BILLIRI", months: [67, 0, 109, 8, 3, 7, 0] },
    { name: "YAMALT", months: [102, 124, 105, 9, 0, 0, 0] },
    { name: "KALTUN", months: [98, 103, 238, 33, 4, 3, 0] },
    { name: "STATE TOTAL", months: [565, 805, 1195, 156, 53, 83, 58] },
  ],
  months: ["Jan-26", "Feb-26", "Mar-26", "Apr-26", "May-26", "Jun-26", "Jul-26"],
};

export default function AdminDashboard() {
  const supabase = getBrowserSupabase();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState(EMPTY_DASHBOARD_DATA);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setError("Supabase not configured");
      return;
    }

    const checkSession = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        setSession(sessionData.session);
        if (sessionData.session?.user?.id) {
          await loadDashboardData();
        }
      } catch (err) {
        console.error("Session check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      if (nextSession?.user?.id) {
        await loadDashboardData();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const loadDashboardData = async () => {
    if (!supabase) return;
    try {
      const { data: dashboardData } = await supabase
        .from("live_dashboard")
        .select("*")
        .order("year", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (dashboardData?.data) {
        setData(dashboardData.data);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    }
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase || !email || !password) return;

    try {
      setError("");
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
      }
    } catch (err: any) {
      setError(err.message || "Sign in failed");
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleSaveDashboard = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setSaving(true);
    setError("");

    try {
      const { error: upsertError } = await supabase.from("live_dashboard").upsert({
        year: data.year,
        data: data,
        updated_at: new Date().toISOString(),
      });

      if (upsertError) {
        setError(upsertError.message);
      } else {
        alert("Dashboard data saved successfully!");
      }
    } catch (err: any) {
      setError(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const updateLgaData = (lgaIndex: number, monthIndex: number, value: string) => {
    const newData = { ...data };
    newData.lgas[lgaIndex].months[monthIndex] = parseInt(value) || 0;
    setData(newData);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="w-full max-w-md p-8 border border-gray-200 rounded-2xl">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b">
          <h1 className="text-3xl font-bold">Live Dashboard Editor</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <form onSubmit={handleSaveDashboard} className="space-y-6">
          {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}

          <div>
            <label className="block text-sm font-semibold mb-2">Year</label>
            <input
              type="text"
              value={data.year}
              onChange={(e) => setData({ ...data, year: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">LGA</th>
                  {data.months.map((month, i) => (
                    <th key={i} className="border border-gray-300 px-4 py-2 font-semibold">
                      {month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.lgas.map((lga, lgaIdx) => (
                  <tr key={lgaIdx} className={lgaIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">{lga.name}</td>
                    {lga.months.map((value, monthIdx) => (
                      <td key={monthIdx} className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => updateLgaData(lgaIdx, monthIdx, e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-center"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Dashboard Data"}
          </button>
        </form>
      </div>
    </div>
  );
}
