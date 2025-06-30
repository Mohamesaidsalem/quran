import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';

interface OfflineIndicatorProps {
  isOnline: boolean;
  isDarkMode: boolean;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  isOnline,
  isDarkMode
}) => {
  if (isOnline) return null;

  return (
    <div className={`fixed top-16 left-4 right-4 z-40 p-3 rounded-lg shadow-lg border ${
      isDarkMode 
        ? 'bg-amber-900/90 border-amber-700 text-amber-200' 
        : 'bg-amber-50 border-amber-200 text-amber-800'
    } backdrop-blur-sm`}>
      <div className="flex items-center space-x-2">
        <WifiOff className="w-4 h-4" />
        <span className="text-sm font-medium">
          وضع عدم الاتصال - بعض المميزات قد لا تعمل
        </span>
      </div>
    </div>
  );
};