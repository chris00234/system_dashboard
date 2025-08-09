import React from 'react';
import type { SystemMetrics } from '../types/metrics';

interface PerformanceProps {
  metrics: SystemMetrics;
}

const Performance: React.FC<PerformanceProps> = ({ metrics }) => {
  return (
    <div className="space-y-6">
      <div className="metric-card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">CPU Usage History</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart.js integration coming soon...
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Memory Distribution</h3>
            <div className="space-y-2">
              <div>Used: {metrics.memory.used} GB</div>
              <div>Available: {metrics.memory.available} GB</div>
              <div>Total: {metrics.memory.total} GB</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="metric-card">
        <h3 className="text-lg font-semibold mb-4">Load Average</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {metrics.system.load_average[0]}
            </div>
            <div className="text-sm text-gray-600">1 min</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {metrics.system.load_average[1]}
            </div>
            <div className="text-sm text-gray-600">5 min</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {metrics.system.load_average[2]}
            </div>
            <div className="text-sm text-gray-600">15 min</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;