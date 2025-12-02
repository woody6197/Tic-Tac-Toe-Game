'use server';

import { sql } from '@/lib/db';

export async function getStats() {
  const aiWins = await sql`
    SELECT COUNT(*) FROM game_stats WHERE mode = 'god' AND winner = 'AI';
  `;
  const playerWins = await sql`
    SELECT COUNT(*) FROM game_stats WHERE mode = 'god' AND winner = 'Player';
  `;

  return {
    aiWins: Number(aiWins[0].count),
    playerWins: Number(playerWins[0].count),
  };
}