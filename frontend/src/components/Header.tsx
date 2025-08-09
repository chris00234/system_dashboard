import React from 'react';
import type { SystemMetrics } from '../types/metrics';
import { Cpu, MemoryStick, Clock } from 'lucide-react';

interface HeaderProps {
  metrics: SystemMetrics | null;
  lastUpdated: Date;
}

const Header: React.FC<HeaderProps> = ({ metrics, lastUpdated }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800">System Monitor</h1>
      <div className="flex items-center gap-6">
        {metrics && (
          <>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-full">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                CPU: {metrics.cpu.usage}%
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-full">
              <MemoryStick className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                RAM: {metrics.memory.usage}%
              </span>
            </div>
          </>
        )}
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;