import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PossessionChartProps {
  homeTeam: string;
  awayTeam: string;
  possession: { home: number; away: number };
}

const PossessionChart: React.FC<PossessionChartProps> = ({
  homeTeam,
  awayTeam,
  possession,
}) => {
  const data = [
    { name: homeTeam, value: possession.home },
    { name: awayTeam, value: possession.away },
  ];

  const COLORS = ['#00d4ff', '#8b949e'];

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Ball Possession</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PossessionChart;
