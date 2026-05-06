import React from 'react';
import { Player, getTeamById } from '@/data/sportsData';
import { Globe, Calendar } from 'lucide-react';

interface PlayerHeaderProps {
  player: Player;
}

const PlayerHeader: React.FC<PlayerHeaderProps> = ({ player }) => {
  const team = getTeamById(player.teamId);

  return (
    <div className="bg-gradient-to-r from-[#161b22] to-[#0d1117] border-b border-[#30363d] px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-8">
          {/* Player Number Badge */}
          <div 
            className="w-28 h-28 rounded-lg flex items-center justify-center border-4 flex-shrink-0"
            style={{ borderColor: team?.color || '#00d4ff', backgroundColor: `${team?.color || '#00d4ff'}15` }}
          >
            <span className="text-5xl font-bold" style={{ color: team?.color || '#00d4ff' }}>
              {player.number}
            </span>
          </div>
          
          <div className="flex-1">
            <p className="text-[#8b949e] text-sm font-medium mb-2">{team?.name} • {team?.league}</p>
            <h1 className="text-4xl font-bold text-white mb-2">{player.name}</h1>
            <p className="text-xl text-[#00d4ff] mb-4">{player.position}</p>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-[#8b949e]">
                <Globe className="w-4 h-4" />
                <span>{player.nationality}</span>
              </div>
              {player.dateOfBirth && (
                <div className="flex items-center gap-2 text-[#8b949e]">
                  <Calendar className="w-4 h-4" />
                  <span>DOB: {player.dateOfBirth}</span>
                </div>
              )}
              {player.height && (
                <div className="text-[#8b949e]">
                  Height: {player.height}
                </div>
              )}
              {player.weight && (
                <div className="text-[#8b949e]">
                  Weight: {player.weight}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHeader;
