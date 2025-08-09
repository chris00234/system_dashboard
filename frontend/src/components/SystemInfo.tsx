import React from 'react';
import type { SystemMetrics } from '../types/metrics';
import { Monitor, Cpu, HardDrive, Wifi, Clock, Power, BarChart } from 'lucide-react';

interface SystemInfoProps {
  metrics: SystemMetrics;
}

const SystemInfo: React.FC<SystemInfoProps> = ({ metrics }) => {
  const infoItems = [
    {
      icon: Monitor,
      label: 'Operating System',
      value: metrics.system.os,
      color: 'text-blue-600'
    },
    {
      icon: Cpu,
      label: 'Architecture',
      value: metrics.system.architecture,
      color: 'text-green-600'
    },
    {
      icon: HardDrive,
      label: 'Processor',
      value: metrics.system.processor.substring(0, 50) + '...',
      color: 'text-purple-600'
    },
    {
      icon: Wifi,
      label: 'Hostname',
      value: metrics.system.hostname,
      color: 'text-cyan-600'
    },
    {
      icon: Clock,
      label: 'Uptime',
      value: metrics.system.uptime,
      color: 'text-orange-600'
    },
    {
      icon: BarChart,
      label: 'Load Average',
      value: metrics.system.load_average.map(x => x.toFixed(2)).join(', '),
      color: 'text-yellow-600'
    },
    {
      icon: BarChart,
      label: 'Running Processes',
      value: metrics.system.processes.toString(),
      color: 'text-indigo-600'
    },
    {
      icon: Power,
      label: 'Boot Time',
      value: metrics.system.boot_time,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="metric-card h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <Monitor className="w-7 h-7 text-blue-600" />
        System Information
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <div
              key={index}
              className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-200"
            >
              <div className={`p-3 rounded-full bg-white shadow-sm ${item.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <div className="ml-4 flex-1">
                <div className="text-sm font-medium text-gray-600">
                  {item.label}
                </div>
                <div className="text-lg font-semibold text-gray-900 mt-1" title={item.value}>
                  {item.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemInfo;