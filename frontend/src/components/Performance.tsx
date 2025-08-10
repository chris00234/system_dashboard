import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import type { SystemMetrics } from '../types/metrics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

interface PerformanceProps {
  metrics: SystemMetrics;
}

const Performance: React.FC<PerformanceProps> = ({ metrics }) => {
  const [cpuHistory, setCpuHistory] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  useEffect(() => {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString();
    
    setCpuHistory(prev => {
      const newHistory = [...prev, metrics.cpu.usage];
      return newHistory.length > 20 ? newHistory.slice(-20) : newHistory;
    });
    
    setTimeLabels(prev => {
      const newLabels = [...prev, timeLabel];
      return newLabels.length > 20 ? newLabels.slice(-20) : newLabels;
    });
  }, [metrics.cpu.usage]);

  const cpuLineData = useMemo(() => ({
    labels: timeLabels,
    datasets: [
      {
        label: 'CPU Usage %',
        data: cpuHistory,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }), [cpuHistory, timeLabels]);

  const memoryDoughnutData = useMemo(() => ({
    labels: ['Used', 'Available'],
    datasets: [
      {
        data: [metrics.memory.used, metrics.memory.available],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(34, 197, 94)',
        ],
        borderWidth: 2,
      },
    ],
  }), [metrics.memory.used, metrics.memory.available]);

  const loadAverageBarData = useMemo(() => ({
    labels: ['1 min', '5 min', '15 min'],
    datasets: [
      {
        label: 'Load Average',
        data: metrics.system.load_average,
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(139, 92, 246)',
          'rgb(168, 85, 247)',
        ],
        borderWidth: 2,
      },
    ],
  }), [metrics.system.load_average]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed} GB`;
          }
        }
      }
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="metric-card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Performance Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">CPU Usage History</h3>
            <div className="h-64">
              <Line data={cpuLineData} options={chartOptions} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Memory Distribution</h3>
            <div className="h-64">
              <Doughnut data={memoryDoughnutData} options={doughnutOptions} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-red-600">{metrics.memory.used} GB</div>
                <div className="text-gray-600">Used</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">{metrics.memory.available} GB</div>
                <div className="text-gray-600">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="metric-card">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">System Load Average</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="h-64">
            <Bar data={loadAverageBarData} options={barOptions} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                {metrics.system.load_average[0].toFixed(2)}
              </div>
              <div className="text-gray-600">1 minute</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {metrics.system.load_average[1].toFixed(2)}
              </div>
              <div className="text-gray-600">5 minutes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-violet-600">
                {metrics.system.load_average[2].toFixed(2)}
              </div>
              <div className="text-gray-600">15 minutes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="metric-card">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Disk Usage Overview</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Disk Usage</span>
              <span className="text-sm font-bold text-gray-900">{metrics.disk.usage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  metrics.disk.usage < 70 ? 'bg-green-500' : 
                  metrics.disk.usage < 90 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${metrics.disk.usage}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-800">{metrics.disk.free} GB</div>
                <div className="text-gray-600">Free Space</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-800">{metrics.disk.total} GB</div>
                <div className="text-gray-600">Total Space</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;