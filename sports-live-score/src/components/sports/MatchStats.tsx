import React from 'react';

interface MatchStatsProps {
  homeTeamName: string;
  awayTeamName: string;
  stats: {
    possession: { home: number; away: number };
    shots: { home: number; away: number };
    shotsOnTarget: { home: number; away: number };
    corners: { home: number; away: number };
    fouls: { home: number; away: number };
    yellowCards: { home: number; away: number };
    passes: { home: number; away: number };
    passAccuracy: { home: number; away: number };
  };
}

interface StatRowProps {
  label: string;
  homeValue: number | string;
  awayValue: number | string;
  showPercentage?: boolean;
}

const StatRow: React.FC<StatRowProps> = ({ label, homeValue, awayValue, showPercentage }) => {
  const homeNum = typeof homeValue === 'number' ? homeValue : parseInt(homeValue);
  const awayNum = typeof awayValue === 'number' ? awayValue : parseInt(awayValue);
  const total = homeNum + awayNum;
  const homePercent = total > 0 ? (homeNum / total) * 100 : 50;
  const awayPercent = 100 - homePercent;

  return (
    <div className="mb-4">
      <p className="text-[#8b949e] text-sm mb-2">{label}</p>
      <div className="flex items-center gap-3">
        <div className="flex-1 text-right">
          <p className="text-white font-semibold">{homeValue}{showPercentage ? '%' : ''}</p>
        </div>
        <div className="flex-1 flex h-2 gap-px bg-[#0d1117] rounded-full overflow-hidden">
          <div
            className="bg-[#00d4ff]"
            style={{ width: `${homePercent}%` }}
          />
          <div
            className="bg-[#8b949e]"
            style={{ width: `${awayPercent}%` }}
          />
        </div>
        <div className="flex-1 text-left">
          <p className="text-white font-semibold">{awayValue}{showPercentage ? '%' : ''}</p>
        </div>
      </div>
    </div>
  );
};

const MatchStats: React.FC<MatchStatsProps> = ({ homeTeamName, awayTeamName, stats }) => {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Match Statistics</h3>
      
      {/* Team names header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 text-right">
          <p className="text-white font-semibold">{homeTeamName}</p>
        </div>
        <div className="w-16 text-center text-[#8b949e] text-xs">vs</div>
        <div className="flex-1 text-left">
          <p className="text-white font-semibold">{awayTeamName}</p>
        </div>
      </div>

      <div className="space-y-2">
        <StatRow label="Possession" homeValue={stats.possession.home} awayValue={stats.possession.away} showPercentage />
        <StatRow label="Shots" homeValue={stats.shots.home} awayValue={stats.shots.away} />
        <StatRow label="Shots on Target" homeValue={stats.shotsOnTarget.home} awayValue={stats.shotsOnTarget.away} />
        <StatRow label="Corners" homeValue={stats.corners.home} awayValue={stats.corners.away} />
        <StatRow label="Fouls" homeValue={stats.fouls.home} awayValue={stats.fouls.away} />
        <StatRow label="Yellow Cards" homeValue={stats.yellowCards.home} awayValue={stats.yellowCards.away} />
        <StatRow label="Passes" homeValue={stats.passes.home} awayValue={stats.passes.away} />
        <StatRow label="Pass Accuracy" homeValue={stats.passAccuracy.home} awayValue={stats.passAccuracy.away} showPercentage />
      </div>
    </div>
  );
};

export default MatchStats;
