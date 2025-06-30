import React, { useState } from 'react';
import { RotateCcw, Play, Pause, Target, Award } from 'lucide-react';
import { useDhikrCounter } from '../hooks/useDhikrCounter';
import { morningAdhkar, eveningAdhkar, afterPrayerAdhkar, generalDhikr, DhikrItem } from '../data/dhikr';

interface DhikrCounterProps {
  isDarkMode: boolean;
}

export const DhikrCounter: React.FC<DhikrCounterProps> = ({ isDarkMode }) => {
  const {
    currentSession,
    dailyProgress,
    totalCount,
    startDhikrSession,
    incrementCount,
    resetSession,
    getDhikrProgress
  } = useDhikrCounter();

  const [selectedCategory, setSelectedCategory] = useState<'morning' | 'evening' | 'afterPrayer' | 'general'>('general');

  const getDhikrByCategory = () => {
    switch (selectedCategory) {
      case 'morning': return morningAdhkar;
      case 'evening': return eveningAdhkar;
      case 'afterPrayer': return afterPrayerAdhkar;
      case 'general': return generalDhikr;
      default: return generalDhikr;
    }
  };

  const getCategoryName = () => {
    switch (selectedCategory) {
      case 'morning': return 'أذكار الصباح';
      case 'evening': return 'أذكار المساء';
      case 'afterPrayer': return 'أذكار بعد الصلاة';
      case 'general': return 'التسبيح العام';
      default: return 'التسبيح';
    }
  };

  if (currentSession) {
    const dhikr = getDhikrByCategory().find(d => d.id === currentSession.dhikrId);
    const progress = (currentSession.currentCount / currentSession.targetCount) * 100;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className={`p-6 rounded-xl ${
          isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'
        } border ${
          isDarkMode ? 'border-emerald-700' : 'border-emerald-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-emerald-300' : 'text-emerald-800'
            }`}>
              عداد التسبيح
            </h2>
            
            <button
              onClick={resetSession}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-slate-700 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className={`w-full h-4 rounded-full ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
            }`}>
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className={isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}>
                {currentSession.currentCount}
              </span>
              <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>
                {currentSession.targetCount}
              </span>
            </div>
          </div>

          {currentSession.isCompleted && (
            <div className={`text-center p-4 rounded-lg ${
              isDarkMode ? 'bg-emerald-800/50' : 'bg-emerald-100'
            }`}>
              <Award className={`w-12 h-12 mx-auto mb-2 ${
                isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
              }`} />
              <h3 className={`text-lg font-bold ${
                isDarkMode ? 'text-emerald-200' : 'text-emerald-800'
              }`}>
                بارك الله فيك! 🎉
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                تم إكمال التسبيح بنجاح
              </p>
            </div>
          )}
        </div>

        {/* Current Dhikr */}
        {dhikr && (
          <div className={`p-8 rounded-xl text-center ${
            isDarkMode ? 'bg-slate-800/50' : 'bg-white/70'
          } border ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}>
            {/* Arabic Text */}
            <div 
              className={`text-3xl leading-relaxed mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              dir="rtl"
              style={{ lineHeight: '2.2' }}
            >
              {dhikr.arabic}
            </div>

            {/* Translation */}
            <div className={`text-lg mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {dhikr.translation}
            </div>

            {/* Transliteration */}
            <div className={`text-sm italic mb-6 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {dhikr.transliteration}
            </div>

            {/* Counter Button */}
            <button
              onClick={incrementCount}
              disabled={currentSession.isCompleted}
              className={`w-32 h-32 rounded-full text-4xl font-bold transition-all duration-200 ${
                currentSession.isCompleted
                  ? isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl active:scale-95'
              }`}
            >
              {currentSession.currentCount}
            </button>

            <p className={`text-sm mt-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              اضغط للعد
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Target className={`w-8 h-8 ${
            isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
          }`} />
          <div>
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              عداد التسبيح والأذكار
            </h2>
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              اختر الذكر المناسب وابدأ التسبيح
            </p>
          </div>
        </div>

        {/* Daily Stats */}
        <div className={`p-4 rounded-xl ${
          isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'
        }`}>
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
            }`}>
              {totalCount}
            </div>
            <div className={`text-xs ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              اليوم
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className={`flex space-x-1 p-1 rounded-xl ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-white/70'
      } backdrop-blur-sm border ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        {[
          { key: 'general', label: 'عام' },
          { key: 'morning', label: 'الصباح' },
          { key: 'evening', label: 'المساء' },
          { key: 'afterPrayer', label: 'بعد الصلاة' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedCategory(tab.key as any)}
            className={`flex-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm ${
              selectedCategory === tab.key
                ? isDarkMode
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-emerald-600 text-white shadow-lg'
                : isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-slate-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dhikr List */}
      <div className="space-y-4">
        <h3 className={`text-lg font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {getCategoryName()}
        </h3>

        {getDhikrByCategory().map((dhikr) => {
          const progress = getDhikrProgress(dhikr.id);
          const isCompleted = progress >= dhikr.count;

          return (
            <div
              key={dhikr.id}
              className={`p-6 rounded-xl transition-all duration-200 ${
                isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'
              } border`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div 
                    className={`text-xl mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                    dir="rtl"
                  >
                    {dhikr.arabic}
                  </div>
                  
                  <div className={`text-sm mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {dhikr.translation}
                  </div>

                  <div className={`text-xs ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {dhikr.reward}
                  </div>
                </div>

                <div className="text-center ml-4">
                  <div className={`text-2xl font-bold ${
                    isCompleted 
                      ? isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                      : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {progress}/{dhikr.count}
                  </div>
                  {isCompleted && (
                    <div className="text-xs text-emerald-500">مكتمل ✓</div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`flex-1 h-2 rounded-full mr-4 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                }`}>
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((progress / dhikr.count) * 100, 100)}%` }}
                  />
                </div>

                <button
                  onClick={() => startDhikrSession(dhikr)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isCompleted
                      ? isDarkMode 
                        ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-700'
                        : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isCompleted ? 'مكتمل' : 'ابدأ'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};