require('dotenv').config();

/**
 * Conexión básica a Supabase (PostgreSQL).
 * Necesita la variable DATABASE_URL y opcionalmente SUPABASE_ANON_KEY.
 * En entornos sin Supabase, esta capa puede quedar inactiva.
 */
let supabase = null;

if (process.env.DATABASE_URL) {
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabaseUrl = process.env.DATABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client inicializado');
  } catch (e) {
    console.warn('No se pudo cargar @supabase/supabase-js; la capa de DB está deshabilitada.');
  }
} else {
  console.warn('DATABASE_URL no está configurada; la capa de DB está deshabilitada.');
}

module.exports = { supabase };
