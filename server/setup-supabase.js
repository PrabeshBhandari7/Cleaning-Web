// Run this once to check tables and seed data in Supabase
// Usage: node setup-supabase.js

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const defaultServices = [
  { id: 'residential', title: 'Residential Cleaning', description: 'Detailed dusting, scrubbing, and sanitizing for apartments and family homes.', price: 120, image_key: 'residential', badge: 'Detailed home care', icon_id: 'home', is_active: true },
  { id: 'office', title: 'Office Cleaning', description: 'Organized and disinfected work desks, restrooms, and reception halls.', price: 250, image_key: 'office', badge: 'Sanitized workplaces', icon_id: 'office', is_active: true },
  { id: 'deep', title: 'Deep Cleaning', description: 'Heavy-duty restore cleaning targeting baseboards, filters, and behind appliances.', price: 180, image_key: 'deep', badge: 'Pristine restoration', icon_id: 'deep', is_active: true },
  { id: 'washroom', title: 'Washroom Disinfection', description: 'Complete wall-to-floor bleaching, grout scrubbing, and biological sanitization.', price: 70, image_key: 'washroom', badge: 'Hygienic restrooms', icon_id: 'washroom', is_active: true },
  { id: 'city', title: 'City & Municipal Clean', description: 'Public park sweeps, municipal trash removal, and local square power washing.', price: 450, image_key: 'city', badge: 'Community spaces', icon_id: 'city', is_active: true },
  { id: 'road', title: 'Road Sweeping & Washing', description: 'Heavy road sweeper broom cleaning and high-pressure asphalt wash.', price: 380, image_key: 'road', badge: 'Clean thoroughfares', icon_id: 'road', is_active: true },
  { id: 'construction', title: 'Post-Construction Detail', description: 'Removing brick dust, paint marks, plaster smears, and structural cleanup.', price: 320, image_key: 'deep', badge: 'Dust & debris clearance', icon_id: 'deep', is_active: true },
  { id: 'moveout', title: 'Move-In / Move-Out Clean', description: 'End-of-tenancy scrubbing to secure security deposits and welcome new tenants.', price: 220, image_key: 'residential', badge: 'Ready for tenancy', icon_id: 'home', is_active: true },
  { id: 'carpet', title: 'Carpet & Upholstery Steam', description: 'High-temp steam soil extraction for carpets, sofas, and office seating.', price: 90, image_key: 'office', badge: 'Steam soil extraction', icon_id: 'deep', is_active: true },
];

const defaultBookings = [
  { id: 'CW-84092-DEEP', name: 'John Doe', email: 'john@example.com', service_type: 'deep', size: '2-3bed', frequency: 'weekly', total_price: 204, status: 'scheduled', date: '2026-06-24', cleaner: 'Sarah Jenkins', phone: '', property_type: '', message: '', addons: [] },
  { id: 'CW-19283-MOVE', name: 'Jane Smith', email: 'jane@example.com', service_type: 'residential', size: 'studio', frequency: 'once', total_price: 96, status: 'completed', date: '2026-06-18', cleaner: 'Sarah Jenkins', phone: '', property_type: '', message: '', addons: [] },
];

async function setup() {
  console.log('🔧 Setting up Supabase tables...\n');

  // Check if services table exists
  const { error: servCheck } = await supabase.from('services').select('id').limit(1);
  const { error: bookCheck } = await supabase.from('bookings').select('id').limit(1);

  if (servCheck || bookCheck) {
    console.log('❌ Tables do not exist yet!');
    console.log('\nPlease go to: https://supabase.com/dashboard/project/qtbeoephtgmwbljnzfmd/sql/new');
    console.log('Paste and run this SQL:\n');
    console.log('─'.repeat(60));
    console.log(`
CREATE TABLE IF NOT EXISTS services (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  price       NUMERIC DEFAULT 0,
  image_key   TEXT DEFAULT 'deep',
  badge       TEXT,
  icon_id     TEXT DEFAULT 'deep',
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT,
  phone         TEXT,
  service_type  TEXT,
  property_type TEXT,
  size          TEXT,
  frequency     TEXT DEFAULT 'once',
  total_price   NUMERIC DEFAULT 0,
  status        TEXT DEFAULT 'scheduled',
  message       TEXT,
  addons        JSONB DEFAULT '[]',
  cleaner       TEXT DEFAULT 'Staff Allocated',
  date          TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
`);
    console.log('─'.repeat(60));
    console.log('\nAfter running that SQL, run this again: node setup-supabase.js\n');
    process.exit(0);
  }

  // Tables exist — seed data
  console.log('✅ Tables found!\n');

  console.log('Seeding services...');
  const { error: servErr } = await supabase
    .from('services')
    .upsert(defaultServices, { onConflict: 'id', ignoreDuplicates: true });
  if (servErr) console.error('❌ Services seed error:', servErr.message);
  else console.log(`✅ ${defaultServices.length} services seeded.`);

  console.log('Seeding bookings...');
  const { error: bookErr } = await supabase
    .from('bookings')
    .upsert(defaultBookings, { onConflict: 'id', ignoreDuplicates: true });
  if (bookErr) console.error('❌ Bookings seed error:', bookErr.message);
  else console.log(`✅ ${defaultBookings.length} bookings seeded.`);

  console.log('\n🎉 Done! Start the server with: npm run dev\n');
}

setup();
