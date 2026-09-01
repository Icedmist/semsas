import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing env values: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this seed script.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  realtime: {
    transport: ws,
  },
});

const seedUsers = [
  {
    email: 'admin@semsas.gombe.gov.ng',
    password: 'Password123!',
    full_name: 'SEMSAS Admin Officer',
    role: 'admin',
    permissions: ['manage:users', 'manage:content', 'manage:dashboard', 'manage:assets', 'manage:live-data', 'edit:all-content'],
  },
  {
    email: 'claims@semsas.gombe.gov.ng',
    password: 'Password123!',
    full_name: 'Claims Manager',
    role: 'claims',
    permissions: ['view:dashboard', 'manage:claims', 'review:reports'],
  },
  {
    email: 'si@semsas.gombe.gov.ng',
    password: 'Password123!',
    full_name: 'Strategic Information Lead',
    role: 'analyst',
    permissions: ['view:dashboard', 'manage:reports', 'export:data'],
  },
  {
    email: 'ict@semsas.gombe.gov.ng',
    password: 'Password123!',
    full_name: 'ICT Focal Person',
    role: 'support',
    permissions: ['view:dashboard', 'manage:assets', 'manage:users'],
  },
  {
    email: 'statecoordinator@semsas.gombe.gov.ng',
    password: 'Password123!',
    full_name: 'State Coordinator',
    role: 'manager',
    permissions: ['view:dashboard', 'manage:dashboard', 'approve:content'],
  },
];

console.log('Fetching existing auth users...');
const { data: authUsers, error: listError } = await supabase.auth.admin.listUsers();
if (listError) {
  console.error('Failed to list users:', listError.message);
  process.exit(1);
}

const authUserMap = {};
authUsers.users.forEach(user => {
  authUserMap[user.email] = user.id;
});
console.log(`Found ${authUsers.users.length} auth users\n`);

for (const user of seedUsers) {
  console.log(`\n--- Processing user: ${user.email} ---`);
  
  const userId = authUserMap[user.email];
  if (!userId) {
    console.error(`User ${user.email} not found in auth system`);
    continue;
  }
  console.log(`Using userId: ${userId}`);

  console.log(`Upserting profile for ${user.email}...`);
  const { error: profileError } = await supabase.from('profiles').upsert({
    id: userId,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    permissions: user.permissions,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' });

  if (profileError) {
    console.error(`Failed to upsert profile for ${user.email}:`, profileError.message);
    continue;
  }
  console.log(`✓ Profile upserted`);

  console.log(`Upserting user role for ${user.email}...`);
  const { error: roleError } = await supabase.from('user_roles').upsert({
    user_id: userId,
    role: user.role,
    permissions: user.permissions,
  }, { onConflict: 'user_id' });

  if (roleError) {
    console.error(`Failed to upsert user role for ${user.email}:`, roleError.message);
    continue;
  }
  console.log(`✓ Role upserted`);

  console.log(`\n✓✓✓ SUCCESS: ${user.email} (${user.role}) with permissions: ${user.permissions.join(', ')}\n`);
}

console.log('Seed script complete.');
