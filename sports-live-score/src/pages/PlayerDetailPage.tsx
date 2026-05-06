import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getPlayerById } from '@/data/sportsData';
import PlayerHeader from '@/components/sports/PlayerHeader';
import PlayerStats from '@/components/sports/PlayerStats';
import PlayerAchievements from '@/components/sports/PlayerAchievements';
import PerformanceChart from '@/components/charts/PerformanceChart';
import AppLayout from '@/components/AppLayout';

const PlayerDetailPage: React.FC = () => {
  const { playerId } = useParams();
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements'>('stats');

  const id = playerId ? parseInt(playerId) : null;
  const player = id ? getPlayerById(id) : null;

  if (!player) {
    return <Navigate to="/" replace />;
  }

  // Mock performance data
  const performanceData = [
    { match: 'Match 1', goals: 1, assists: 0 },
    { match: 'Match 2', goals: 0, assists: 1 },
    { match: 'Match 3', goals: 2, assists: 1 },
    { match: 'Match 4', goals: 1, assists: 2 },
    { match: 'Match 5', goals: 0, assists: 0 },
    { match: 'Match 6', goals: 3, assists: 1 },
  ];

  return (
    <AppLayout>
      <div className="bg-[#0d1117] min-h-screen">
        <PlayerHeader player={player} />
        
        {/* Navigation Tabs */}
        <div className="bg-[#161b22] border-b border-[#30363d] sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex">
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'stats'
                    ? 'border-[#00d4ff] text-[#00d4ff]'
                    : 'border-transparent text-[#8b949e] hover:text-white'
                }`}
              >
                Statistics
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'achievements'
                    ? 'border-[#00d4ff] text-[#00d4ff]'
                    : 'border-transparent text-[#8b949e] hover:text-white'
                }`}
              >
                Achievements
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'stats' && (
            <div className="space-y-8">
              <PlayerStats player={player} />
              <PerformanceChart
                teamName={player.name}
                data={performanceData}
              />
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <PlayerAchievements player={player} />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default PlayerDetailPage;
