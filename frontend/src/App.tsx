import { useState, useEffect } from 'react';
import type { SystemMetrics, Process } from './types/metrics';
import { apiService } from './services/api';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Overview';
import Performance from './components/Performance';
import Processes from './components/Processes';
import SystemInfo from './components/SystemInfo';
import ConnectionStatus from './components/ConnectionStatus';

type ActiveSection = 'overview' | 'performance' | 'processes' | 'system';

function App() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const metricsData = await apiService.getMetrics();
        setMetrics(metricsData);
        setIsConnected(true);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
        setIsConnected(false);
      }
    };

    const fetchProcesses = async () => {
      try {
        const processData = await apiService.getProcesses();
        setProcesses(processData);
      } catch (error) {
        console.error('Failed to fetch processes:', error);
      }
    };

    // Initial fetch
    fetchMetrics();
    fetchProcesses();

    // Set up intervals
    const metricsInterval = setInterval(fetchMetrics, 2000);
    const processInterval = setInterval(fetchProcesses, 5000);

    return () => {
      clearInterval(metricsInterval);
      clearInterval(processInterval);
    };
  }, []);

  const renderActiveSection = () => {
    if (!metrics) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-xl">Loading...</div>
        </div>
      );
    }

    switch (activeSection) {
      case 'overview':
        return <Overview metrics={metrics} />;
      case 'performance':
        return <Performance metrics={metrics} />;
      case 'processes':
        return <Processes processes={processes} />;
      case 'system':
        return <SystemInfo metrics={metrics} />;
      default:
        return <Overview metrics={metrics} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-shrink-0 flex justify-between items-center px-6 py-4 bg-white/95 backdrop-blur-lg shadow-lg border-b border-white/20">
          <Header metrics={metrics} lastUpdated={lastUpdated} />
          <ConnectionStatus isConnected={isConnected} />
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
}

export default App;