import React, { useState } from 'react';
import { upcomingMatches, Sport } from '@/data/sportsData';
import Header from '@/components/sports/Header';
import UpcomingMatches from '@/components/sports/UpcomingMatches';
import Footer from '@/components/sports/Footer';

const UpcomingPage: React.FC = () => {
  const [activeSport, setActiveSport] = useState<Sport>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Header
        activeSport={activeSport}
        onSportChange={setActiveSport}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">Upcoming Matches</h1>
        <UpcomingMatches
          matches={upcomingMatches}
          activeSport={activeSport}
        />
      </div>

      <Footer />
    </div>
  );
};

export default UpcomingPage;
