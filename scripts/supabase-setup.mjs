import { readFileSync, existsSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing env values: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this setup script.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const schemaSql = existsSync('supabase/schema.sql')
  ? readFileSync('supabase/schema.sql', 'utf8')
  : null;

if (!schemaSql) {
  console.error('Could not find supabase/schema.sql');
  process.exit(1);
}

const statements = schemaSql
  .split(';')
  .map((s) => s.trim())
  .filter(Boolean);

for (const statement of statements) {
  const { error } = await supabase.rpc('sql', { query: statement });
  if (error) {
    console.warn('RPC execution not available, falling back to manual SQL instructions:', error.message);
    break;
  }
}

console.log('Schema setup script prepared. Run the SQL in Supabase SQL Editor from supabase/schema.sql to complete the database setup.');
