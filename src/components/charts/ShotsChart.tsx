import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ShotsChartProps {
  homeTeam: string;
  awayTeam: string;
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
}

const ShotsChart: React.FC<ShotsChartProps> = ({
  homeTeam,
  awayTeam,
  shots,
  shotsOnTarget,
}) => {
  const data = [
    {
      name: 'Total Shots',
      [homeTeam]: shots.home,
      [awayTeam]: shots.away,
    },
    {
      name: 'Shots on Target',
      [homeTeam]: shotsOnTarget.home,
      [awayTeam]: shotsOnTarget.away,
    },
  ];

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Shots Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
          <XAxis dataKey="name" stroke="#8b949e" />
          <YAxis stroke="#8b949e" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff' }}
          />
          <Legend />
          <Bar dataKey={homeTeam} fill="#00d4ff" />
          <Bar dataKey={awayTeam} fill="#8b949e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShotsChart;
