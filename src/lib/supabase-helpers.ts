
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];
type Claim = Tables['claims']['Row'];
type Vote = Tables['votes']['Row'];
type Duel = Tables['duels']['Row'];

// Profile management
export const createProfile = async (userData: {
  wallet_address: string;
  username?: string;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .insert({
      user_id: user.id,
      wallet_address: userData.wallet_address,
      username: userData.username,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getProfile = async (userId?: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  const targetUserId = userId || user?.id;
  
  if (!targetUserId) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', targetUserId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const updateProfile = async (updates: Partial<Profile>) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Claims management
export const createClaim = async (claimData: {
  title: string;
  description?: string;
  category: string;
  resolution_method: 'oracle' | 'timeout' | 'dao';
  deadline: string;
  creator_stake?: number;
  is_creator_moderated?: boolean;
  required_veri_stake?: number;
}) => {
  const profile = await getProfile();
  if (!profile) throw new Error('Profile not found');

  const { data, error } = await supabase
    .from('claims')
    .insert({
      ...claimData,
      creator_id: profile.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getClaims = async (limit = 20, offset = 0) => {
  const { data, error } = await supabase
    .from('claims')
    .select(`
      *,
      creator:profiles!claims_creator_id_fkey(username, truth_score, wallet_address)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
};

export const getClaim = async (id: string) => {
  const { data, error } = await supabase
    .from('claims')
    .select(`
      *,
      creator:profiles!claims_creator_id_fkey(username, truth_score, wallet_address),
      votes(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// Voting
export const createVote = async (voteData: {
  claim_id: string;
  side: boolean;
  stake_amount: number;
  transaction_signature?: string;
}) => {
  const profile = await getProfile();
  if (!profile) throw new Error('Profile not found');

  const { data, error } = await supabase
    .from('votes')
    .insert({
      ...voteData,
      user_id: profile.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Duels
export const createDuel = async (duelData: {
  challenged_id?: string;
  statement: string;
  challenger_side: boolean;
  stake_amount: number;
}) => {
  const profile = await getProfile();
  if (!profile) throw new Error('Profile not found');

  const { data, error } = await supabase
    .from('duels')
    .insert({
      ...duelData,
      challenger_id: profile.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getLeaderboard = async (limit = 50) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('username, wallet_address, truth_score, total_volume, predictions_count, win_rate')
    .order('truth_score', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
};

// Real-time subscriptions
export const subscribeToClaimsUpdates = (callback: (payload: any) => void) => {
  return supabase
    .channel('claims-updates')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'claims'
    }, callback)
    .subscribe();
};

export const subscribeToVotesUpdates = (claimId: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`votes-${claimId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'votes',
      filter: `claim_id=eq.${claimId}`
    }, callback)
    .subscribe();
};
