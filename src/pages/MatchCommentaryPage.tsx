import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { liveMatches, featuredMatchStats } from '@/data/sportsData';
import MatchTimeline from '@/components/sports/MatchTimeline';
import MatchStats from '@/components/sports/MatchStats';
import PossessionChart from '@/components/charts/PossessionChart';
import ShotsChart from '@/components/charts/ShotsChart';
import AppLayout from '@/components/AppLayout';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MatchCommentaryPage: React.FC = () => {
  const { matchId } = useParams();
  const [activeTab, setActiveTab] = useState<'timeline' | 'stats'>('timeline');

  const id = matchId ? parseInt(matchId) : 3; // Default to Manchester City vs Liverpool
  const match = liveMatches.find(m => m.id === id);

  if (!match) {
    return <Navigate to="/live-scores" replace />;
  }

  return (
    <AppLayout>
      <div className="bg-[#0d1117] min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#161b22] to-[#0d1117] border-b border-[#30363d] px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/live-scores"
              className="flex items-center gap-2 text-[#8b949e] hover:text-white transition-colors mb-4 w-fit"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Live Scores
            </Link>

            <div className="flex items-center justify-between">
              <div className="flex-1 text-right">
                <p className="text-white font-semibold text-xl">{match.homeTeam}</p>
                <p className="text-[#8b949e] text-sm">{match.league}</p>
              </div>

              <div className="px-6 text-center">
                <p className="text-4xl font-bold text-white">
                  <span style={{ color: match.homeColor }}>{match.homeScore}</span>
                  <span className="text-[#8b949e] mx-2">-</span>
                  <span style={{ color: match.awayColor }}>{match.awayScore}</span>
                </p>
                <p className="text-[#00d4ff] text-sm font-semibold mt-1">{match.time}</p>
                <p className="text-[#8b949e] text-sm">{match.status}</p>
              </div>

              <div className="flex-1 text-left">
                <p className="text-white font-semibold text-xl">{match.awayTeam}</p>
                <p className="text-[#8b949e] text-sm">{match.league}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#161b22] border-b border-[#30363d] sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex">
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === 'timeline'
                    ? 'border-[#00d4ff] text-[#00d4ff]'
                    : 'border-transparent text-[#8b949e] hover:text-white'
                }`}
              >
                Match Timeline
              </button>
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
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'timeline' && (
            <div className="space-y-8">
              <MatchTimeline
                events={featuredMatchStats.timeline}
                homeTeamName={match.homeTeam}
                awayTeamName={match.awayTeam}
                homeTeamColor={match.homeColor}
                awayTeamColor={match.awayColor}
              />
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-8">
              <MatchStats
                homeTeamName={match.homeTeam}
                awayTeamName={match.awayTeam}
                stats={featuredMatchStats}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PossessionChart
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                  possession={featuredMatchStats.possession}
                />

                <ShotsChart
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                  shots={featuredMatchStats.shots}
                  shotsOnTarget={featuredMatchStats.shotsOnTarget}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default MatchCommentaryPage;
