import React from 'react';
import { ChevronRight, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Surah } from '../data/quran';

interface SurahListProps {
  surahs: Surah[];
  isDarkMode: boolean;
  completedSurahs: Set<number>;
  currentSurah: number;
  onSelectSurah: (surah: Surah) => void;
}

export const SurahList: React.FC<SurahListProps> = ({
  surahs,
  isDarkMode,
  completedSurahs,
  currentSurah,
  onSelectSurah
}) => {
  return (
    <div className="space-y-2">
      {surahs.map((surah) => (
        <button
          key={surah.number}
          onClick={() => onSelectSurah(surah)}
          className={`w-full text-left p-4 rounded-xl transition-all duration-200 group ${
            currentSurah === surah.number
              ? isDarkMode
                ? 'bg-emerald-900/50 border-emerald-700 shadow-lg'
                : 'bg-emerald-50 border-emerald-200 shadow-lg'
              : isDarkMode
                ? 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-700'
                : 'bg-white hover:bg-gray-50 border-gray-200'
          } border`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-4 flex-1">
              {/* Surah Number */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                currentSurah === surah.number
                  ? isDarkMode
                    ? 'bg-emerald-700 text-emerald-100'
                    : 'bg-emerald-600 text-white'
                  : isDarkMode
                    ? 'bg-slate-700 text-slate-300'
                    : 'bg-gray-100 text-gray-600'
              }`}>
                {surah.number}
              </div>

              {/* Surah Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-bold text-lg ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} dir="rtl">
                    {surah.name}
                  </h3>
                  {completedSurahs.has(surah.number) && (
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  )}
                </div>
                
                <p className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {surah.englishName}
                </p>

                <div className={`flex items-center space-x-4 text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{surah.revelationType}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{surah.numberOfVerses} verses</span>
                  </div>
                </div>
              </div>
            </div>

            <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
          </div>
        </button>
      ))}
    </div>
  );
};