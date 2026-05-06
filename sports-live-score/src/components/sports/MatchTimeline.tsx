import React from 'react';
import { MatchEvent } from '@/data/sportsData';
import { Footprints, AlertCircle, ArrowRightLeft } from 'lucide-react';

interface MatchTimelineProps {
  events: MatchEvent[];
  homeTeamName: string;
  awayTeamName: string;
  homeTeamColor: string;
  awayTeamColor: string;
}

const getEventIcon = (event: string) => {
  switch (event.toLowerCase()) {
    case 'goal':
      return <Footprints className="w-5 h-5 text-green-500" />;
    case 'yellow card':
      return <div className="w-5 h-5 bg-yellow-500 rounded" />;
    case 'red card':
      return <div className="w-5 h-5 bg-red-600 rounded" />;
    case 'substitution':
      return <ArrowRightLeft className="w-5 h-5 text-blue-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-[#8b949e]" />;
  }
};

const MatchTimeline: React.FC<MatchTimelineProps> = ({
  events,
  homeTeamName,
  awayTeamName,
  homeTeamColor,
  awayTeamColor,
}) => {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Match Timeline</h3>
      
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#30363d] transform -translate-x-1/2" />
        
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div
              key={idx}
              className={`flex gap-4 ${event.team === 'home' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Left side (home team side) */}
              {event.team === 'home' ? (
                <div className="w-1/2 text-right">
                  <div className="bg-[#0d1117] border border-[#30363d] rounded p-3 inline-block max-w-xs">
                    <p className="font-semibold text-white text-sm">{event.player}</p>
                    <p className="text-[#8b949e] text-xs">{event.detail}</p>
                    <p className="text-[#00d4ff] text-xs font-mono mt-1">{event.time}</p>
                  </div>
                </div>
              ) : (
                <div className="w-1/2" />
              )}
              
              {/* Center indicator */}
              <div className="flex justify-center items-start pt-1">
                <div className={`w-3 h-3 rounded-full border-2 ${
                  event.team === 'home' 
                    ? 'bg-[#0d1117]' 
                    : 'bg-[#0d1117]'
                }`} style={{
                  borderColor: event.team === 'home' ? homeTeamColor : awayTeamColor
                }} />
              </div>
              
              {/* Right side (away team side) */}
              {event.team === 'away' ? (
                <div className="w-1/2 text-left">
                  <div className="bg-[#0d1117] border border-[#30363d] rounded p-3 inline-block max-w-xs">
                    <p className="font-semibold text-white text-sm">{event.player}</p>
                    <p className="text-[#8b949e] text-xs">{event.detail}</p>
                    <p className="text-[#00d4ff] text-xs font-mono mt-1">{event.time}</p>
                  </div>
                </div>
              ) : (
                <div className="w-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {events.length === 0 && (
        <p className="text-center text-[#8b949e] py-8">No events recorded yet</p>
      )}
    </div>
  );
};

export default MatchTimeline;
