import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getTeamById, getPlayersByTeamId } from '@/data/sportsData';
import TeamHeader from '@/components/sports/TeamHeader';
import TeamRoster from '@/components/sports/TeamRoster';
import TeamStats from '@/components/sports/TeamStats';
import AppLayout from '@/components/AppLayout';

const TeamDetailPage: React.FC = () => {
  const { teamId } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'roster'>('overview');

  const id = teamId ? parseInt(teamId) : null;
  const team = id ? getTeamById(id) : null;
  const players = id ? getPlayersByTeamId(id) : [];

  if (!team) {
    return <Navigate to="/" replace />;
  }

  // Mock stats for the team
  const teamStats = {
    wins: Math.floor(Math.random() * 20) + 10,
    losses: Math.floor(Math.random() * 15) + 3,
    draws: Math.floor(Math.random() * 10) + 2,
    goalsFor: Math.floor(Math.random() * 50) + 30,
    goalsAgainst: Math.floor(Math.random() * 40) + 15,
    matches: 28,
  };

  return (
    <AppLayout>
      <div className="bg-[#0d1117] min-h-screen">
        <TeamHeader team={team} />
        
        {/* Navigation Tabs */}
        <div className="bg-[#161b22] border-b border-[#30363d] sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-[#00d4ff] text-[#00d4ff]'
                    : 'border-transparent text-[#8b949e] hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('roster')}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'roster'
                    ? 'border-[#00d4ff] text-[#00d4ff]'
                    : 'border-transparent text-[#8b949e] hover:text-white'
                }`}
              >
                Roster
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <TeamStats team={team} stats={teamStats} />
            </div>
          )}

          {activeTab === 'roster' && (
            <div>
              <TeamRoster players={players} />
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default TeamDetailPage;
