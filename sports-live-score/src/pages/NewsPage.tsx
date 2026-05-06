import React, { useState } from 'react';
import { newsArticles, Sport } from '@/data/sportsData';
import Header from '@/components/sports/Header';
import NewsFeed from '@/components/sports/NewsFeed';
import Footer from '@/components/sports/Footer';

const NewsPage: React.FC = () => {
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
        <h1 className="text-4xl font-bold mb-8">Sports News</h1>
        <NewsFeed articles={newsArticles} />
      </div>

      <Footer />
    </div>
  );
};

export default NewsPage;
