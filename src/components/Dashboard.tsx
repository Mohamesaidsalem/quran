import React from 'react';
import { BookOpen, Clock, Heart, Target, Calendar, MapPin, Gift, TrendingUp } from 'lucide-react';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { useQuranReader } from '../hooks/useQuranReader';
import { sampleSurahs } from '../data/quran';

interface DashboardProps {
  isDarkMode: boolean;
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ isDarkMode, onNavigate }) => {
  const { nextPrayer, timeToNext } = usePrayerTimes();
  const { readingProgress } = useQuranReader();

  const quickStats = [
    {
      icon: BookOpen,
      title: 'تقدم القراءة',
      value: `${readingProgress.completedSurahs.size}/${sampleSurahs.length}`,
      subtitle: 'سورة مكتملة',
      color: 'emerald',
      action: () => onNavigate('quran')
    },
    {
      icon: Clock,
      title: 'الصلاة القادمة',
      value: nextPrayer?.arabicName || 'لا توجد',
      subtitle: timeToNext ? `خلال ${timeToNext}` : '',
      color: 'blue',
      action: () => onNavigate('prayer')
    },
    {
      icon: Target,
      title: 'سلسلة القراءة',
      value: `${readingProgress.readingStreak}`,
      subtitle: 'يوم متتالي',
      color: 'amber',
      action: () => onNavigate('quran')
    },
    {
      icon: Heart,
      title: 'الأدعية اليوم',
      value: '12',
      subtitle: 'دعاء للمتوفين',
      color: 'purple',
      action: () => onNavigate('memorial')
    }
  ];

  const quickActions = [
    {
      icon: BookOpen,
      title: 'متابعة القراءة',
      subtitle: `سورة ${sampleSurahs.find(s => s.number === readingProgress.currentSurah)?.name || 'الفاتحة'}`,
      color: 'emerald',
      action: () => onNavigate('quran')
    },
    {
      icon: Clock,
      title: 'عداد الصلاة',
      subtitle: 'ابدأ صلاتك الآن',
      color: 'blue',
      action: () => onNavigate('prayer')
    },
    {
      icon: Target,
      title: 'التسبيح',
      subtitle: 'أذكار وتسابيح',
      color: 'green',
      action: () => onNavigate('dhikr')
    },
    {
      icon: Gift,
      title: 'التبرعات',
      subtitle: 'صدقة وزكاة',
      color: 'rose',
      action: () => onNavigate('charity')
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className={`text-center p-8 rounded-2xl ${
        isDarkMode ? 'bg-gradient-to-r from-emerald-900/30 to-blue-900/30' : 'bg-gradient-to-r from-emerald-50 to-blue-50'
      } border ${
        isDarkMode ? 'border-emerald-700/50' : 'border-emerald-200/50'
      }`}>
        <h1 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          أهلاً وسهلاً بك
        </h1>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          في رحلتك الروحانية اليومية
        </p>
        <div className={`mt-4 text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {new Date().toLocaleDateString('ar', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className={`text-xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          إحصائياتك اليوم
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <button
                key={index}
                onClick={stat.action}
                className={`p-4 rounded-xl transition-all duration-200 hover:scale-105 ${
                  isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'
                } border`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                  stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                  'bg-purple-100 text-purple-600'
                } ${isDarkMode ? 'bg-opacity-20' : ''}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.title}
                  </div>
                  {stat.subtitle && (
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {stat.subtitle}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className={`text-xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          إجراءات سريعة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`p-6 rounded-xl transition-all duration-200 hover:scale-105 text-left ${
                  isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'
                } border`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    action.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                    action.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    action.color === 'green' ? 'bg-green-100 text-green-600' :
                    'bg-rose-100 text-rose-600'
                  } ${isDarkMode ? 'bg-opacity-20' : ''}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {action.title}
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {action.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Recommendations */}
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30' : 'bg-gradient-to-r from-purple-50 to-pink-50'
      } border ${
        isDarkMode ? 'border-purple-700/50' : 'border-purple-200/50'
      }`}>
        <h2 className={`text-xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          توصيات اليوم
        </h2>
        <div className="space-y-3">
          <div className={`flex items-center space-x-3 p-3 rounded-lg ${
            isDarkMode ? 'bg-purple-800/30' : 'bg-purple-100'
          }`}>
            <BookOpen className={`w-5 h-5 ${
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <span className={`${
              isDarkMode ? 'text-purple-200' : 'text-purple-800'
            }`}>
              اقرأ سورة الكهف - إنه يوم الجمعة
            </span>
          </div>
          <div className={`flex items-center space-x-3 p-3 rounded-lg ${
            isDarkMode ? 'bg-green-800/30' : 'bg-green-100'
          }`}>
            <Target className={`w-5 h-5 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`} />
            <span className={`${
              isDarkMode ? 'text-green-200' : 'text-green-800'
            }`}>
              أذكار المساء - الوقت مناسب الآن
            </span>
          </div>
          <div className={`flex items-center space-x-3 p-3 rounded-lg ${
            isDarkMode ? 'bg-blue-800/30' : 'bg-blue-100'
          }`}>
            <Gift className={`w-5 h-5 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <span className={`${
              isDarkMode ? 'text-blue-200' : 'text-blue-800'
            }`}>
              تذكير: حان وقت الصدقة الأسبوعية
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};