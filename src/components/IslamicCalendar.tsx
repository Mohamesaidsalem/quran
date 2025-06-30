import React from 'react';
import { Calendar, Star, Gift, Clock } from 'lucide-react';
import { useIslamicCalendar } from '../hooks/useIslamicCalendar';

interface IslamicCalendarProps {
  isDarkMode: boolean;
}

export const IslamicCalendar: React.FC<IslamicCalendarProps> = ({ isDarkMode }) => {
  const {
    currentHijriDate,
    todayEvents,
    upcomingEvents,
    isRecommendedFastingDay
  } = useIslamicCalendar();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Calendar className={`w-8 h-8 ${
          isDarkMode ? 'text-purple-400' : 'text-purple-600'
        }`} />
        <div>
          <h2 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            التقويم الإسلامي
          </h2>
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            المناسبات والأيام المباركة
          </p>
        </div>
      </div>

      {/* Current Date */}
      {currentHijriDate && (
        <div className={`p-6 rounded-xl ${
          isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'
        } border ${
          isDarkMode ? 'border-purple-700' : 'border-purple-200'
        }`}>
          <div className="text-center">
            <h3 className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-purple-200' : 'text-purple-800'
            }`}>
              {currentHijriDate.day} {currentHijriDate.monthName} {currentHijriDate.year} هـ
            </h3>
            <p className={`text-lg ${
              isDarkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>
              {currentHijriDate.weekDay}
            </p>
            
            {isRecommendedFastingDay && (
              <div className={`mt-4 p-3 rounded-lg ${
                isDarkMode ? 'bg-amber-900/30 border-amber-700' : 'bg-amber-50 border-amber-200'
              } border`}>
                <div className="flex items-center justify-center space-x-2">
                  <Star className={`w-5 h-5 ${
                    isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  }`} />
                  <span className={`font-medium ${
                    isDarkMode ? 'text-amber-300' : 'text-amber-700'
                  }`}>
                    يوم صيام مستحب
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Today's Events */}
      {todayEvents.length > 0 && (
        <div className={`p-6 rounded-xl ${
          isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'
        } border ${
          isDarkMode ? 'border-emerald-700' : 'border-emerald-200'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            isDarkMode ? 'text-emerald-300' : 'text-emerald-800'
          }`}>
            مناسبات اليوم
          </h3>
          
          {todayEvents.map((event) => (
            <div key={event.id} className="mb-4 last:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <Gift className={`w-6 h-6 ${
                  event.type === 'eid' ? 'text-yellow-500' :
                  event.type === 'holy' ? 'text-green-500' :
                  'text-blue-500'
                }`} />
                <h4 className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {event.arabicName}
                </h4>
              </div>
              
              <p className={`text-sm mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {event.description}
              </p>
              
              <div className="space-y-1">
                <h5 className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  الأعمال المستحبة:
                </h5>
                {event.recommendations.map((rec, index) => (
                  <div key={index} className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    • {rec}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Events */}
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-white/70'
      } border ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <h3 className={`text-xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          المناسبات القادمة
        </h3>
        
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    event.type === 'eid' ? 'bg-yellow-500' :
                    event.type === 'holy' ? 'bg-green-500' :
                    'bg-blue-500'
                  }`} />
                  <div>
                    <h4 className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {event.arabicName}
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {event.description}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {event.hijriDay} {hijriMonths[event.hijriMonth - 1]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fasting Recommendations */}
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-amber-900/30' : 'bg-amber-50'
      } border ${
        isDarkMode ? 'border-amber-700' : 'border-amber-200'
      }`}>
        <h3 className={`text-xl font-bold mb-4 ${
          isDarkMode ? 'text-amber-300' : 'text-amber-800'
        }`}>
          أيام الصيام المستحبة
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-amber-800/30' : 'bg-amber-100'
          }`}>
            <h4 className={`font-bold mb-2 ${
              isDarkMode ? 'text-amber-200' : 'text-amber-800'
            }`}>
              أسبوعياً
            </h4>
            <p className={`text-sm ${
              isDarkMode ? 'text-amber-300' : 'text-amber-700'
            }`}>
              الاثنين والخميس من كل أسبوع
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-amber-800/30' : 'bg-amber-100'
          }`}>
            <h4 className={`font-bold mb-2 ${
              isDarkMode ? 'text-amber-200' : 'text-amber-800'
            }`}>
              شهرياً
            </h4>
            <p className={`text-sm ${
              isDarkMode ? 'text-amber-300' : 'text-amber-700'
            }`}>
              الأيام البيض (13، 14، 15)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};