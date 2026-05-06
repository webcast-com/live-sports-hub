import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  teamName: string;
  data: Array<{
    match: string;
    goals: number;
    assists: number;
  }>;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ teamName, data }) => {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
          <XAxis dataKey="match" stroke="#8b949e" />
          <YAxis stroke="#8b949e" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="goals" 
            stroke="#00d4ff" 
            strokeWidth={2}
            dot={{ fill: '#00d4ff' }}
          />
          <Line 
            type="monotone" 
            dataKey="assists" 
            stroke="#00ff88" 
            strokeWidth={2}
            dot={{ fill: '#00ff88' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
