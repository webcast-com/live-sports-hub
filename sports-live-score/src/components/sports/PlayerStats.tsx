import React from 'react';
import { Player } from '@/data/sportsData';

interface PlayerStatsProps {
  player: Player;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ player }) => {
  const stats = player.stats;
  const goalsPerMatch = (stats.goals / stats.appearances).toFixed(2);
  const assistsPerMatch = (stats.assists / stats.appearances).toFixed(2);

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Career Statistics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Appearances</p>
          <p className="text-3xl font-bold text-[#00d4ff]">{stats.appearances}</p>
          <p className="text-xs text-[#6e7681] mt-2">{stats.minutes} mins</p>
        </div>
        
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Goals</p>
          <p className="text-3xl font-bold text-green-500">{stats.goals}</p>
          <p className="text-xs text-[#6e7681] mt-2">{goalsPerMatch} per match</p>
        </div>
        
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Assists</p>
          <p className="text-3xl font-bold text-cyan-500">{stats.assists}</p>
          <p className="text-xs text-[#6e7681] mt-2">{assistsPerMatch} per match</p>
        </div>
        
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Yellow Cards</p>
          <p className="text-3xl font-bold text-yellow-500">{stats.yellowCards}</p>
        </div>
        
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Red Cards</p>
          <p className="text-3xl font-bold text-red-600">{stats.redCards}</p>
        </div>

        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Minutes Played</p>
          <p className="text-2xl font-bold text-[#00d4ff]">
            {(stats.minutes / 60).toFixed(0)}h
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
