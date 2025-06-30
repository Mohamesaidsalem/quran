import React from 'react';
import { BookOpen, Target, Calendar, Award } from 'lucide-react';

interface ProgressStatsProps {
  isDarkMode: boolean;
  completedSurahs: number;
  totalSurahs: number;
  readingStreak: number;
  currentPosition: { surah: number; verse: number };
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({
  isDarkMode,
  completedSurahs,
  totalSurahs,
  readingStreak,
  currentPosition
}) => {
  const completionPercentage = (completedSurahs / totalSurahs) * 100;

  const stats = [
    {
      icon: BookOpen,
      label: 'Completed Surahs',
      value: `${completedSurahs}/${totalSurahs}`,
      color: 'emerald'
    },
    {
      icon: Target,
      label: 'Progress',
      value: `${completionPercentage.toFixed(1)}%`,
      color: 'blue'
    },
    {
      icon: Calendar,
      label: 'Reading Streak',
      value: `${readingStreak} days`,
      color: 'amber'
    },
    {
      icon: Award,
      label: 'Current Position',
      value: `${currentPosition.surah}:${currentPosition.verse}`,
      color: 'purple'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`p-6 rounded-xl transition-all duration-200 ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700' 
                : 'bg-white border-gray-200'
            } border backdrop-blur-sm`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                'bg-purple-100 text-purple-600'
              } ${isDarkMode ? 'bg-opacity-20' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </p>
                <p className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};