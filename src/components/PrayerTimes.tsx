import React from 'react';
import { Clock, MapPin, Compass, Bell } from 'lucide-react';
import { usePrayerTimes } from '../hooks/usePrayerTimes';

interface PrayerTimesProps {
  isDarkMode: boolean;
  onPrayerSelect: (prayer: any) => void;
}

export const PrayerTimes: React.FC<PrayerTimesProps> = ({
  isDarkMode,
  onPrayerSelect
}) => {
  const {
    prayerTimes,
    currentPrayer,
    nextPrayer,
    timeToNext,
    qiblaDirection
  } = usePrayerTimes();

  const prayers = Object.values(prayerTimes);

  return (
    <div className="space-y-6">
      {/* Current Prayer Status */}
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'
      } border ${
        isDarkMode ? 'border-emerald-700' : 'border-emerald-200'
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-emerald-300' : 'text-emerald-800'
          }`}>
            {nextPrayer ? `الصلاة القادمة: ${nextPrayer.arabicName}` : 'لا توجد صلاة قادمة'}
          </h2>
          
          {nextPrayer && (
            <>
              <p className={`text-3xl font-mono mb-2 ${
                isDarkMode ? 'text-emerald-200' : 'text-emerald-700'
              }`}>
                {nextPrayer.time}
              </p>
              
              <p className={`text-lg ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                متبقي: {timeToNext}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Qibla Direction */}
      <div className={`p-4 rounded-xl ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-white/70'
      } border ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Compass className={`w-6 h-6 ${
              isDarkMode ? 'text-amber-400' : 'text-amber-600'
            }`} />
            <div>
              <h3 className={`font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                اتجاه القبلة
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {qiblaDirection.toFixed(0)}° شمال شرق
              </p>
            </div>
          </div>
          
          <div 
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
              isDarkMode ? 'border-amber-400' : 'border-amber-600'
            }`}
            style={{ transform: `rotate(${qiblaDirection}deg)` }}
          >
            <div className={`w-1 h-4 ${
              isDarkMode ? 'bg-amber-400' : 'bg-amber-600'
            } rounded-full`} />
          </div>
        </div>
      </div>

      {/* Prayer Times List */}
      <div className="space-y-3">
        <h3 className={`text-lg font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          مواقيت الصلاة
        </h3>
        
        {prayers.map((prayer, index) => {
          const isCurrent = currentPrayer?.name === prayer.name;
          const isNext = nextPrayer?.name === prayer.name;
          
          return (
            <button
              key={prayer.name}
              onClick={() => onPrayerSelect(prayer)}
              className={`w-full p-4 rounded-xl transition-all duration-200 ${
                isCurrent
                  ? isDarkMode
                    ? 'bg-emerald-900/50 border-emerald-600'
                    : 'bg-emerald-100 border-emerald-300'
                  : isNext
                    ? isDarkMode
                      ? 'bg-amber-900/30 border-amber-600'
                      : 'bg-amber-50 border-amber-200'
                    : isDarkMode
                      ? 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-700'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
              } border`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isCurrent
                      ? isDarkMode ? 'bg-emerald-700' : 'bg-emerald-600'
                      : isNext
                        ? isDarkMode ? 'bg-amber-700' : 'bg-amber-600'
                        : isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                  }`}>
                    <Clock className={`w-6 h-6 ${
                      isCurrent || isNext ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div className="text-right">
                    <h4 className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {prayer.arabicName}
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {prayer.rakaat} ركعات
                    </p>
                  </div>
                </div>
                
                <div className="text-left">
                  <p className={`text-xl font-mono font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {prayer.time}
                  </p>
                  {isCurrent && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-emerald-700 text-emerald-200' : 'bg-emerald-600 text-white'
                    }`}>
                      الحالية
                    </span>
                  )}
                  {isNext && !isCurrent && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-amber-700 text-amber-200' : 'bg-amber-600 text-white'
                    }`}>
                      القادمة
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};