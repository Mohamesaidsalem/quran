import React from 'react';
import { X, Type, Eye, EyeOff, Volume2 } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  isDarkMode: boolean;
  fontSize: number;
  showTranslation: boolean;
  showTransliteration: boolean;
  onClose: () => void;
  onFontSizeChange: (size: number) => void;
  onToggleTranslation: () => void;
  onToggleTransliteration: () => void;
  extraContent?: React.ReactNode;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  isDarkMode,
  fontSize,
  showTranslation,
  showTransliteration,
  onClose,
  onFontSizeChange,
  onToggleTranslation,
  onToggleTransliteration,
  extraContent
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={`relative w-full max-w-md mx-4 p-6 rounded-2xl max-h-[90vh] overflow-y-auto ${
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
      } border shadow-xl`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            الإعدادات
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-slate-700 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Font Size */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Type className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <label className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                حجم الخط
              </label>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>ص</span>
              <input
                type="range"
                min="14"
                max="24"
                value={fontSize}
                onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
                className="flex-1 accent-emerald-500"
              />
              <span className={`text-lg ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>ص</span>
            </div>
            <p className={`text-xs mt-1 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              الحالي: {fontSize}px
            </p>
          </div>

          {/* Translation Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                إظهار الترجمة
              </span>
            </div>
            <button
              onClick={onToggleTranslation}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showTranslation 
                  ? 'bg-emerald-600' 
                  : isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showTranslation ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Transliteration Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                إظهار النطق بالإنجليزية
              </span>
            </div>
            <button
              onClick={onToggleTransliteration}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showTransliteration 
                  ? 'bg-emerald-600' 
                  : isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showTransliteration ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Reading Preferences */}
          <div>
            <h3 className={`text-sm font-medium mb-3 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              تفضيلات القراءة
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  defaultChecked
                />
                <span className={`ml-2 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  التمرير التلقائي للآية الحالية
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className={`ml-2 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  تذكيرات القراءة اليومية
                </span>
              </label>
            </div>
          </div>

          {/* Extra Content (Notifications) */}
          {extraContent && (
            <div className={`pt-4 border-t ${
              isDarkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
              {extraContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};