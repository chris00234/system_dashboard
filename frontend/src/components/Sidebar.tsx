import React from 'react';
import { Monitor, BarChart3, Activity, Info, Gauge } from 'lucide-react';

type ActiveSection = 'overview' | 'performance' | 'processes' | 'system';

interface SidebarProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'overview' as const, icon: Monitor, label: 'Overview' },
    { id: 'performance' as const, icon: BarChart3, label: 'Performance' },
    { id: 'processes' as const, icon: Activity, label: 'Processes' },
    { id: 'system' as const, icon: Info, label: 'System Info' },
  ];

  return (
    <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Gauge className="w-8 h-8 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Dashboard</h2>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`sidebar-nav-item w-full text-left ${
                    isActive ? 'active' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;