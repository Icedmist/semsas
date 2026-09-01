import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export function getBrowserSupabase() {
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

// Only create client if URL is available, otherwise lazy-load
let supabaseClient: any = null;

export function getSupabase() {
  if (!supabaseClient && supabaseUrl && supabaseKey) {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
}

// Backwards compatibility export
export const supabase = { channel: () => ({ on: () => ({ subscribe: () => {} }) }) } as any;

// Database helpers for live-dashboard
export async function getLiveDashboard(year: string) {
  try {
    const client = getSupabase();
    if (!client) {
      console.warn("Supabase not configured");
      return null;
    }
    
    const { data, error } = await client
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
    const client = getSupabase();
    if (!client) {
      console.warn("Supabase not configured");
      return false;
    }
    const { error } = await client
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
    const client = getSupabase();
    if (!client) {
      console.warn("Supabase not configured for subscription");
      return () => {};
    }
    
    const subscription = client
      .channel(`live_dashboard:${year}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "live_dashboard",
          filter: `year=eq.${year}`,
        },
        (payload: any) => {
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
