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
    full_name: 'SEMSAS Super Admin',
    role: 'admin',
    permissions: ['manage:live-data'],
  },
];

console.log('Fetching existing auth users...');
const { data: authUsers, error: listError } = await supabase.auth.admin.listUsers();
if (listError) {
  console.error('Failed to list users:', listError.message);
  process.exit(1);
}

console.log(`Found ${authUsers.users.length} auth users`);
console.log('\n🗑️  Deleting non-admin users...\n');

// Delete all users except admin
for (const authUser of authUsers.users) {
  if (authUser.email !== 'admin@semsas.gombe.gov.ng') {
    const { error: deleteError } = await supabase.auth.admin.deleteUser(authUser.id);
    if (deleteError) {
      console.error(`❌ Failed to delete ${authUser.email}:`, deleteError.message);
    } else {
      console.log(`✓ Deleted user: ${authUser.email}`);
    }
  }
}

console.log('\n📋 Processing admin user...\n');

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
