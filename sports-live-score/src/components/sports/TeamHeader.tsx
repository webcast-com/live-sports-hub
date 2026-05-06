import React from 'react';
import { Team } from '@/data/sportsData';
import { MapPin, Calendar } from 'lucide-react';

interface TeamHeaderProps {
  team: Team;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  return (
    <div className="bg-gradient-to-r from-[#161b22] to-[#0d1117] border-b border-[#30363d] px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end gap-6">
          {/* Team Color Circle */}
          <div 
            className="w-24 h-24 rounded-full border-4 border-[#30363d]"
            style={{ backgroundColor: team.color }}
          />
          
          <div className="flex-1">
            <p className="text-[#8b949e] text-sm font-medium mb-2">{team.league}</p>
            <h1 className="text-4xl font-bold text-white mb-4">{team.name}</h1>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-[#8b949e]">
                <MapPin className="w-4 h-4" />
                <span>{team.city} • {team.stadium}</span>
              </div>
              <div className="flex items-center gap-2 text-[#8b949e]">
                <Calendar className="w-4 h-4" />
                <span>Founded {team.founded}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;
