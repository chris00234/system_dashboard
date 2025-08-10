import React, { useState, useEffect } from 'react';
import type { SystemMetrics } from '../types/metrics';
import MetricCard from './MetricCard';
import { Cpu, MemoryStick, HardDrive, Network, TrendingUp, TrendingDown } from 'lucide-react';

interface OverviewProps {
  metrics: SystemMetrics;
}

const Overview: React.FC<OverviewProps> = ({ metrics }) => {
  const [cpuHistory, setCpuHistory] = useState<number[]>([]);
  const [memoryHistory, setMemoryHistory] = useState<number[]>([]);
  const [diskHistory, setDiskHistory] = useState<number[]>([]);
  const [networkActivity, setNetworkActivity] = useState<{sent: number[], received: number[]}>({
    sent: [],
    received: []
  });

  useEffect(() => {
    setCpuHistory(prev => {
      const newHistory = [...prev, metrics.cpu.usage];
      return newHistory.length > 10 ? newHistory.slice(-10) : newHistory;
    });
    
    setMemoryHistory(prev => {
      const newHistory = [...prev, metrics.memory.usage];
      return newHistory.length > 10 ? newHistory.slice(-10) : newHistory;
    });
    
    setDiskHistory(prev => {
      const newHistory = [...prev, metrics.disk.usage];
      return newHistory.length > 10 ? newHistory.slice(-10) : newHistory;
    });

    setNetworkActivity(prev => ({
      sent: [...prev.sent, metrics.network.bytes_sent].slice(-10),
      received: [...prev.received, metrics.network.bytes_recv].slice(-10)
    }));
  }, [metrics]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getNetworkTrend = () => {
    if (networkActivity.sent.length < 2) return 'stable';
    const current = networkActivity.sent[networkActivity.sent.length - 1];
    const previous = networkActivity.sent[networkActivity.sent.length - 2];
    return current > previous ? 'up' : current < previous ? 'down' : 'stable';
  };

  const networkTrend = getNetworkTrend();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard
          title="CPU Usage"
          value={`${metrics.cpu.usage}%`}
          icon={Cpu}
          type="cpu"
          className="metric-card-gradient-cpu"
          details={[
            `${metrics.cpu.count} cores`,
            `${Math.round(metrics.cpu.frequency.current)} MHz`
          ]}
          chartData={{
            value: metrics.cpu.usage,
            max: 100
          }}
          trendData={cpuHistory}
        />

        <MetricCard
          title="Memory Usage"
          value={`${metrics.memory.usage}%`}
          icon={MemoryStick}
          type="memory"
          className="metric-card-gradient-memory"
          details={[
            `${metrics.memory.used}/${metrics.memory.total} GB`,
            `Available: ${metrics.memory.available} GB`
          ]}
          chartData={{
            value: metrics.memory.usage,
            max: 100
          }}
          trendData={memoryHistory}
        />

        <MetricCard
          title="Disk Usage"
          value={`${metrics.disk.usage}%`}
          icon={HardDrive}
          type="disk"
          className="metric-card-gradient-disk"
          details={[
            `Free: ${metrics.disk.free} GB`,
            `Total: ${metrics.disk.total} GB`
          ]}
          chartData={{
            value: metrics.disk.usage,
            max: 100
          }}
          trendData={diskHistory}
        />

        <MetricCard
          title="Network Activity"
          value=""
          icon={networkTrend === 'up' ? TrendingUp : networkTrend === 'down' ? TrendingDown : Network}
          type="network"
          className="metric-card-gradient-network"
          details={[
            `↑ ${formatBytes(metrics.network.bytes_sent)}`,
            `↓ ${formatBytes(metrics.network.bytes_recv)}`,
            `Packets: ${metrics.network.packets_sent.toLocaleString()}/${metrics.network.packets_recv.toLocaleString()}`
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="metric-card bg-white p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">System Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">System Load</span>
              <div className="flex space-x-2 text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  1m: {metrics.system.load_average[0].toFixed(2)}
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
                  5m: {metrics.system.load_average[1].toFixed(2)}
                </span>
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded">
                  15m: {metrics.system.load_average[2].toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">CPU Cores</span>
              <span className="text-gray-900 font-semibold">{metrics.cpu.count} cores</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">CPU Frequency</span>
              <span className="text-gray-900 font-semibold">{Math.round(metrics.cpu.frequency.current)} MHz</span>
            </div>
          </div>
        </div>

        <div className="metric-card bg-white p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Resource Health</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">CPU Health</span>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${
                  metrics.cpu.usage < 50 ? 'bg-green-100 text-green-800' :
                  metrics.cpu.usage < 80 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {metrics.cpu.usage < 50 ? 'Good' : metrics.cpu.usage < 80 ? 'Moderate' : 'High'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    metrics.cpu.usage < 50 ? 'bg-green-500' : 
                    metrics.cpu.usage < 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${metrics.cpu.usage}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Memory Health</span>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${
                  metrics.memory.usage < 50 ? 'bg-green-100 text-green-800' :
                  metrics.memory.usage < 80 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {metrics.memory.usage < 50 ? 'Good' : metrics.memory.usage < 80 ? 'Moderate' : 'High'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    metrics.memory.usage < 50 ? 'bg-green-500' : 
                    metrics.memory.usage < 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${metrics.memory.usage}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Disk Health</span>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${
                  metrics.disk.usage < 70 ? 'bg-green-100 text-green-800' :
                  metrics.disk.usage < 90 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {metrics.disk.usage < 70 ? 'Good' : metrics.disk.usage < 90 ? 'Moderate' : 'Critical'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    metrics.disk.usage < 70 ? 'bg-green-500' : 
                    metrics.disk.usage < 90 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${metrics.disk.usage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;