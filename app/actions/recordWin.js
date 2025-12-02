'use server';

import { sql } from '@/lib/db';

export async function recordWin(mode, winner) {
  await sql`
    INSERT INTO game_stats (mode, winner)
    VALUES (${mode}, ${winner});
  `;
}
