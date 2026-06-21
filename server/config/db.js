// Supabase Database Connection
// Replaces the previous file-based mock database (services.json / bookings.json)

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

let supabase = null;

const connectDB = async () => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.warn('⚠️  SUPABASE_URL or SUPABASE_SERVICE_KEY is missing in .env');
    console.warn('   Add your Supabase credentials to server/.env to enable the database.');
    return;
  }

  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Quick connectivity test — fetch one row from services
    const { error } = await supabase.from('services').select('id').limit(1);
    if (error) throw error;

    console.log('✅  Supabase PostgreSQL connected successfully.');
  } catch (error) {
    console.error('❌  Supabase connection error:', error.message);
    process.exit(1);
  }
};

const getSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase client is not initialised. Check your .env credentials.');
  }
  return supabase;
};

module.exports = { connectDB, getSupabase };
