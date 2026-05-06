import React from 'react';
import { Player } from '@/data/sportsData';
import { Award } from 'lucide-react';

interface PlayerAchievementsProps {
  player: Player;
}

const PlayerAchievements: React.FC<PlayerAchievementsProps> = ({ player }) => {
  if (player.achievements.length === 0) {
    return (
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Achievements
        </h3>
        <p className="text-[#8b949e]">No major achievements recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <Award className="w-5 h-5 text-yellow-500" />
        Achievements & Awards
      </h3>
      
      <div className="space-y-3">
        {player.achievements.map((achievement, idx) => (
          <div
            key={idx}
            className="bg-[#0d1117] border border-yellow-500/30 rounded p-4 flex items-start gap-3"
          >
            <div className="text-yellow-500 mt-1 flex-shrink-0">★</div>
            <p className="text-white">{achievement}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerAchievements;
