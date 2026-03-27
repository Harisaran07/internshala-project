import { supabase } from './supabase';

interface DrawResult {
  winningNumbers: number[];
  winners: {
    userId: string;
    matchType: number;
    prize: number;
  }[];
  totalPrizePool: number;
}

export async function simulateDraw(month: string, year: number, type: 'random' | 'algorithmic'): Promise<DrawResult> {
  // 1. Get all active subscribers with at least 1 score this month
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('id, subscription_status')
    .eq('subscription_status', 'active');

  if (profileError) throw profileError;

  // 2. Generate Winning Numbers (5 unique numbers between 1-45)
  let winningNumbers: number[] = [];
  if (type === 'random') {
    while (winningNumbers.length < 5) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!winningNumbers.includes(num)) winningNumbers.push(num);
    }
  } else {
    // Algorithmic: Weighted by most frequent scores in the DB for this month
    const { data: frequencyData, error: freqError } = await supabase
      .from('scores')
      .select('score')
      .gte('date', `${year}-${month}-01`); // Simple check for the month

    if (freqError) throw freqError;

    const counts: Record<number, number> = {};
    frequencyData?.forEach(s => counts[s.score] = (counts[s.score] || 0) + 1);
    
    // Sort scores by frequency and take top 5 (or random if not enough)
    const sortedScores = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(e => parseInt(e[0]));
    
    winningNumbers = sortedScores.slice(0, 5);
    while (winningNumbers.length < 5) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!winningNumbers.includes(num)) winningNumbers.push(num);
    }
  }

  // 3. Calculate Prize Pool
  const ACTIVE_SUBSCRIBERS = profiles?.length || 0;
  const SUBSCRIPTION_FEE = 20; // Example
  const PRIZE_POOL_PERCENTAGE = 0.5; // 50% of subscription goes to pool
  const totalPrizePool = ACTIVE_SUBSCRIBERS * SUBSCRIPTION_FEE * PRIZE_POOL_PERCENTAGE;

  // 4. Find Winners (Match user's last 5 scores against winning numbers)
  const winners: DrawResult['winners'] = [];
  const poolShares = { 5: 0.40, 4: 0.35, 3: 0.25 };

  for (const profile of profiles || []) {
    const { data: scores } = await supabase
      .from('scores')
      .select('score')
      .eq('user_id', profile.id)
      .order('date', { ascending: false })
      .limit(5);

    if (!scores || scores.length === 0) continue;

    const userScores = scores.map(s => s.score);
    const matches = userScores.filter(s => winningNumbers.includes(s)).length;

    if (matches >= 3) {
      winners.push({
        userId: profile.id,
        matchType: matches,
        prize: 0 // Will calculate share below
      });
    }
  }

  // 5. Distribute Prizes
  [5, 4, 3].forEach(matchType => {
    const tierWinners = winners.filter(w => w.matchType === matchType);
    if (tierWinners.length > 0) {
      const tierPool = totalPrizePool * poolShares[matchType as keyof typeof poolShares];
      const prizePerWinner = tierPool / tierWinners.length;
      tierWinners.forEach(w => w.prize = prizePerWinner);
    }
  });

  return { winningNumbers, winners, totalPrizePool };
}

export async function publishDraw(month: string, year: number, drawData: DrawResult) {
  // 1. Save Draw
  const { data: draw, error: drawError } = await supabase
    .from('draws')
    .insert([{
      month,
      year,
      winning_numbers: drawData.winningNumbers,
      prize_pool: drawData.totalPrizePool,
      status: 'published'
    }])
    .select()
    .single();

  if (drawError) throw drawError;

  // 2. Save Winners
  if (drawData.winners.length > 0) {
    const winnersToInsert = drawData.winners.map(w => ({
      draw_id: draw.id,
      user_id: w.userId,
      match_type: w.matchType,
      prize_amount: w.prize,
      verification_status: 'pending',
      payout_status: 'pending'
    }));

    const { error: winnerError } = await supabase
      .from('winners')
      .insert(winnersToInsert);

    if (winnerError) throw winnerError;
  }

  return draw;
}
