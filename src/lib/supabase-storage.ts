import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "";

export function getStorageClient() {
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function upsertAssetReference(payload: {
  slug: string;
  bucket: string;
  path: string;
  url?: string;
  mime_type?: string;
  size_bytes?: number;
  kind?: string;
}) {
  const client = getStorageClient();
  if (!client) return null;

  const { data, error } = await client
    .from("asset_references")
    .upsert(
      {
        slug: payload.slug,
        bucket: payload.bucket,
        path: payload.path,
        url: payload.url || null,
        mime_type: payload.mime_type || null,
        size_bytes: payload.size_bytes || null,
        kind: payload.kind || "image",
      },
      { onConflict: "slug" }
    )
    .select()
    .single();

  if (error) {
    console.warn("Asset reference upsert failed:", error);
    return null;
  }

  return data;
}
