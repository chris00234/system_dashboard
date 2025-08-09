import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected }) => {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-lg border shadow-lg transition-all duration-300 ${
      isConnected 
        ? 'bg-green-100 border-green-200 text-green-800' 
        : 'bg-red-100 border-red-200 text-red-800'
    }`}>
      {isConnected ? (
        <>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow"></div>
          <Wifi className="w-4 h-4" />
          <span className="text-sm font-medium">Connected</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce-slow"></div>
          <WifiOff className="w-4 h-4" />
          <span className="text-sm font-medium">Disconnected</span>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;