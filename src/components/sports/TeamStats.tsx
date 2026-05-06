import React from 'react';
import { Team } from '@/data/sportsData';

interface TeamStatsProps {
  team: Team;
  stats: {
    wins: number;
    losses: number;
    draws: number;
    goalsFor: number;
    goalsAgainst: number;
    matches: number;
  };
}

const TeamStats: React.FC<TeamStatsProps> = ({ team, stats }) => {
  const winPercentage = ((stats.wins / stats.matches) * 100).toFixed(0);
  const goalDifference = stats.goalsFor - stats.goalsAgainst;

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Season Statistics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Matches</p>
          <p className="text-3xl font-bold text-[#00d4ff]">{stats.matches}</p>
        </div>
        
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Wins</p>
          <p className="text-3xl font-bold text-green-500">{stats.wins}</p>
        </div>
        
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Draws</p>
          <p className="text-3xl font-bold text-yellow-500">{stats.draws}</p>
        </div>
        
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Losses</p>
          <p className="text-3xl font-bold text-red-500">{stats.losses}</p>
        </div>
        
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Goals For</p>
          <p className="text-3xl font-bold text-[#00d4ff]">{stats.goalsFor}</p>
        </div>
        
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Goals Against</p>
          <p className="text-3xl font-bold text-[#00d4ff]">{stats.goalsAgainst}</p>
        </div>
        
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Goal Diff</p>
          <p className={`text-3xl font-bold ${goalDifference >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {goalDifference > 0 ? '+' : ''}{goalDifference}
          </p>
        </div>
        
        <div className="bg-[#0d1117] rounded p-4">
          <p className="text-[#8b949e] text-sm mb-2">Win Rate</p>
          <p className="text-3xl font-bold text-[#00d4ff]">{winPercentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;
