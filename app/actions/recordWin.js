'use server';

import { sql } from '../lib/db.js';

export async function recordWin(mode, winner = null, isDraw = false) {
  await sql`
    INSERT INTO game_stats (mode, winner, is_draw)
    VALUES (${mode}, ${winner}, ${isDraw});
  `;
}
