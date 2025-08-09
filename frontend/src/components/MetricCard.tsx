import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  type: 'cpu' | 'memory' | 'disk' | 'network';
  className?: string;
  details?: string[];
  chartData?: {
    value: number;
    max: number;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  type,
  className = '',
  details = [],
  chartData
}) => {
  const getStatusColor = (value: number, type: string): string => {
    switch (type) {
      case 'cpu':
      case 'memory':
        if (value < 50) return 'text-green-400';
        if (value < 80) return 'text-yellow-400';
        return 'text-red-400';
      case 'disk':
        if (value < 70) return 'text-green-400';
        if (value < 90) return 'text-yellow-400';
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  const renderChart = () => {
    if (!chartData) return null;

    const percentage = (chartData.value / chartData.max) * 100;
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-24 h-24 mx-auto mb-4">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-sm">{Math.round(chartData.value)}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`metric-card ${className} flex flex-col h-full`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
          <Icon className="w-5 h-5" />
          {title}
        </h3>
        {value && (
          <div className={`text-2xl font-bold ${chartData ? getStatusColor(chartData.value, type) : 'text-white'}`}>
            {value}
          </div>
        )}
      </div>

      {renderChart()}

      {details.length > 0 && (
        <div className="mt-auto space-y-2">
          {details.map((detail, index) => (
            <div key={index} className="text-white/80 text-sm flex items-center gap-2">
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              {detail}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MetricCard;