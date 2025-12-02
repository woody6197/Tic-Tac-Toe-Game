"use client";

import React, { useEffect, useState } from "react";
import { getStats } from "@/app/actions/getStats";

export default function Scoreboard({ refreshKey }) {
  const [stats, setStats] = useState({
    aiWins: 0,
    playerWins: 0,
    draws: 0,
    aiPercent: 0,
    drawPercent: 0,
    playerPercent: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getStats();
      setStats(data);
    };
    fetchStats();
  }, [refreshKey]);

  return (
    <div className="text-white flex justify-between items-center text-2xl mt-4 p-4 rounded-lg bg-slate-800 shadow-lg">
      <h2 className="font-bold text-left">God Mode Scoreboard</h2>
      <p>
        Player Wins: <span className="text-green-400">{stats.playerWins}</span> ({stats.playerPercent}%)
      </p>
      <p>
        AI Wins: <span className="text-red-400">{stats.aiWins}</span> ({stats.aiPercent}%)
      </p>
      <p>
        Draws: <span className="text-yellow-400">{stats.draws}</span> ({stats.drawPercent}%)
      </p>
    </div>
  );
}
