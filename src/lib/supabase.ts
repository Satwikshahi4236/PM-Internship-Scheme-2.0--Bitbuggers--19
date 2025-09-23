import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Auth helpers
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database helpers
export const getInternships = async (filters: any = {}) => {
  let query = supabase
    .from('internships')
    .select(`
      *,
      companies (
        id,
        name,
        logo,
        sector
      )
    `);

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,companies.name.ilike.%${filters.search}%`);
  }

  if (filters.sector) {
    query = query.eq('sector', filters.sector);
  }

  if (filters.location) {
    query = query.eq('location', filters.location);
  }

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
};

export const applyForInternship = async (internshipId: string, userId: string) => {
  const { data, error } = await supabase
    .from('applications')
    .insert({
      internship_id: internshipId,
      user_id: userId,
      status: 'pending',
    });
  return { data, error };
};

export const getUserApplications = async (userId: string) => {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      internships (
        *,
        companies (
          name,
          logo
        )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
};