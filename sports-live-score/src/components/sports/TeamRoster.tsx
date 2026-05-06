import React from 'react';
import { Player } from '@/data/sportsData';
import { Link } from 'react-router-dom';

interface TeamRosterProps {
  players: Player[];
}

const TeamRoster: React.FC<TeamRosterProps> = ({ players }) => {
  const groupByPosition = (players: Player[]) => {
    const grouped: Record<string, Player[]> = {};
    players.forEach(player => {
      if (!grouped[player.position]) {
        grouped[player.position] = [];
      }
      grouped[player.position].push(player);
    });
    return grouped;
  };

  const grouped = groupByPosition(players);
  const positionOrder = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

  return (
    <div className="space-y-8">
      {positionOrder.map(position => {
        const positionPlayers = grouped[position] || [];
        if (positionPlayers.length === 0) return null;

        return (
          <div key={position}>
            <h3 className="text-lg font-semibold text-white mb-4">{position}s ({positionPlayers.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {positionPlayers.map(player => (
                <Link
                  key={player.id}
                  to={`/player/${player.id}`}
                  className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 hover:border-[#00d4ff] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-[#00d4ff]/10 rounded-lg p-3 min-w-fit">
                      <span className="text-2xl font-bold text-[#00d4ff]">#{player.number}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white hover:text-[#00d4ff] transition-colors">
                        {player.name}
                      </h4>
                      <p className="text-sm text-[#8b949e] mb-2">{player.position}</p>
                      <div className="text-xs text-[#6e7681] space-y-1">
                        <p>Apps: <span className="text-[#00d4ff]">{player.stats.appearances}</span></p>
                        <p>Goals: <span className="text-[#00d4ff]">{player.stats.goals}</span></p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamRoster;
