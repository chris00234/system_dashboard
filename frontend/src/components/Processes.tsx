import React from 'react';
import type { Process } from '../types/metrics';
import { Activity } from 'lucide-react';

interface ProcessesProps {
  processes: Process[];
}

const Processes: React.FC<ProcessesProps> = ({ processes }) => {
  return (
    <div className="metric-card h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Activity className="w-6 h-6 text-blue-600" />
        Top Processes by CPU Usage
      </h2>
      
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="space-y-2">
          {processes.map((process, index) => (
            <div
              key={`${process.pid}-${index}`}
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 hover:bg-blue-100 transition-colors duration-200"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900 truncate max-w-xs">
                  {process.name || 'Unknown Process'}
                </div>
                <div className="text-sm text-gray-500">PID: {process.pid}</div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-right">
                  <div className="font-semibold text-red-600">
                    {(process.cpu_percent || 0).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">CPU</div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-green-600">
                    {(process.memory_percent || 0).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500">Memory</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {processes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No processes data available
          </div>
        )}
      </div>
    </div>
  );
};

export default Processes;