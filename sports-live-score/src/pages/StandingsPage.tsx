import React, { useState } from 'react';
import { standings } from '@/data/sportsData';
import Header from '@/components/sports/Header';
import Standings from '@/components/sports/Standings';
import Footer from '@/components/sports/Footer';

const StandingsPage: React.FC = () => {
  const [activeSport, setActiveSport] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Header
        activeSport={activeSport as any}
        onSportChange={setActiveSport as any}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">League Standings</h1>
        <Standings standings={standings} />
      </div>

      <Footer />
    </div>
  );
};

export default StandingsPage;
