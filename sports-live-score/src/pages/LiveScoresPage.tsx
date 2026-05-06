import React, { useState } from 'react';
import { LiveMatch, liveMatches } from '@/data/sportsData';
import Header from '@/components/sports/Header';
import LiveScores from '@/components/sports/LiveScores';
import Footer from '@/components/sports/Footer';
import { useScoreSimulator } from '@/components/sports/ScoreSimulator';

const LiveScoresPage: React.FC = () => {
  const [activeSport, setActiveSport] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<LiveMatch | null>(null);
  const { matches } = useScoreSimulator();

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Header
        activeSport={activeSport as any}
        onSportChange={setActiveSport as any}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">Live Scores</h1>
        <LiveScores
          matches={matches}
          activeSport={activeSport as any}
          searchQuery={searchQuery}
          onMatchClick={setSelectedMatch}
        />
      </div>

      <Footer />
    </div>
  );
};

export default LiveScoresPage;
