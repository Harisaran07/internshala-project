import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Score {
  id: string;
  user_id: string;
  score: number;
  date: string;
  created_at: string;
}

export async function getLatestScores(userId: string): Promise<Score[]> {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data || [];
}

export async function addScore(userId: string, scoreValue: number, date: string) {
  // 1. Get current scores ordered by date descending
  const { data: currentScores, error: fetchError } = await supabase
    .from('scores')
    .select('id, date')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (fetchError) throw fetchError;

  // 2. If we already have 5, delete the oldest one (by date)
  if (currentScores && currentScores.length >= 5) {
    const oldest = currentScores[currentScores.length - 1];
    const { error: deleteError } = await supabase
      .from('scores')
      .delete()
      .eq('id', oldest.id);
    
    if (deleteError) throw deleteError;
  }

  // 3. Insert the new score
  const { data, error: insertError } = await supabase
    .from('scores')
    .insert([
      { user_id: userId, score: scoreValue, date: new Date(date).toISOString() }
    ])
    .select()
    .single();

  if (insertError) throw insertError;
  return data;
}
