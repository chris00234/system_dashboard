import React from 'react';
import type { SystemMetrics } from '../types/metrics';
import MetricCard from './MetricCard';
import { Cpu, MemoryStick, HardDrive, Network } from 'lucide-react';

interface OverviewProps {
  metrics: SystemMetrics;
}

const Overview: React.FC<OverviewProps> = ({ metrics }) => {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 h-full">
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
      />

      <MetricCard
        title="Network"
        value=""
        icon={Network}
        type="network"
        className="metric-card-gradient-network"
        details={[
          `↑ ${formatBytes(metrics.network.bytes_sent)}`,
          `↓ ${formatBytes(metrics.network.bytes_recv)}`,
          `Packets: ${metrics.network.packets_sent.toLocaleString()}/${metrics.network.packets_recv.toLocaleString()}`
        ]}
      />
    </div>
  );
};

export default Overview;