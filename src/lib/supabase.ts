import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helpers for live-dashboard
export async function getLiveDashboard(year: string) {
  try {
    const { data, error } = await supabase
      .from("live_dashboard")
      .select("*")
      .eq("year", year)
      .single();

    if (error) {
      console.warn("Supabase get failed:", error);
      return null;
    }
    
    return data?.data || null;
  } catch (e) {
    console.warn("Supabase get failed:", e);
    return null;
  }
}

export async function setLiveDashboard(year: string, data: any) {
  try {
    const { error } = await supabase
      .from("live_dashboard")
      .upsert({
        year,
        data: { ...data, updatedAt: new Date().toISOString() },
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "year",
      });

    if (error) {
      console.warn("Supabase set failed:", error);
      return false;
    }
    
    return true;
  } catch (e) {
    console.warn("Supabase set failed:", e);
    return false;
  }
}

export function subscribeLiveDashboard(
  year: string,
  cb: (data: any) => void
) {
  try {
    const subscription = supabase
      .channel(`live_dashboard:${year}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "live_dashboard",
          filter: `year=eq.${year}`,
        },
        (payload) => {
          if (payload.new && (payload.new as any).data) {
            cb((payload.new as any).data);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  } catch {
    return () => {};
  }
}
