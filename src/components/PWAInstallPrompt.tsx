import React from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface PWAInstallPromptProps {
  isVisible: boolean;
  isDarkMode: boolean;
  onInstall: () => void;
  onDismiss: () => void;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({
  isVisible,
  isDarkMode,
  onInstall,
  onDismiss
}) => {
  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-20 left-4 right-4 z-50 p-4 rounded-xl shadow-2xl border ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
    } backdrop-blur-sm animate-slide-up`}>
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${
          isDarkMode ? 'bg-emerald-900' : 'bg-emerald-100'
        }`}>
          <Smartphone className={`w-5 h-5 ${
            isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
          }`} />
        </div>
        
        <div className="flex-1">
          <h3 className={`font-bold text-sm mb-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            ثبت التطبيق على هاتفك
          </h3>
          <p className={`text-xs mb-3 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            احصل على تجربة أفضل مع التطبيق المثبت
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={onInstall}
              className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-lg transition-colors"
            >
              <Download className="w-3 h-3" />
              <span>تثبيت</span>
            </button>
            
            <button
              onClick={onDismiss}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-white hover:bg-slate-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              لاحقاً
            </button>
          </div>
        </div>
        
        <button
          onClick={onDismiss}
          className={`p-1 rounded transition-colors ${
            isDarkMode 
              ? 'text-gray-400 hover:text-white hover:bg-slate-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};