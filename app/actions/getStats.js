'use server';

import { sql } from '../lib/db.js';

export async function getStats() {
  const aiWinsResult = await sql`
    SELECT COUNT(*) FROM game_stats WHERE mode = 'god' AND winner = 'AI';
  `;
  const playerWinsResult = await sql`
    SELECT COUNT(*) FROM game_stats WHERE mode = 'god' AND winner = 'Player';
  `;
  const drawsResult = await sql`
    SELECT COUNT(*) FROM game_stats WHERE mode = 'god' AND is_draw = TRUE;
  `;
  const totalResult = await sql`
    SELECT COUNT(*) FROM game_stats WHERE mode = 'god';
  `;

  const aiWins = Number(aiWinsResult[0].count);
  const playerWins = Number(playerWinsResult[0].count);
  const draws = Number(drawsResult[0].count);
  const totalGames = Number(totalResult[0].count);

  const aiPercent = totalGames ? ((aiWins / totalGames) * 100).toFixed(1) : 0;
  const playerPercent = totalGames ? ((playerWins / totalGames) * 100).toFixed(1) : 0;
  const drawPercent = totalGames ? ((draws / totalGames) * 100).toFixed(1) : 0;

  return {
    aiWins,
    playerWins,
    draws,
    aiPercent,
    playerPercent,
    drawPercent
  };
}
