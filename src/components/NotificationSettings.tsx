import React, { useState } from 'react';
import { Bell, BellOff, Clock, Calendar } from 'lucide-react';

interface NotificationSettingsProps {
  isDarkMode: boolean;
  onScheduleReminder: (title: string, body: string, delay: number) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  isDarkMode,
  onScheduleReminder
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('18:00');

  const enableNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
      
      if (permission === 'granted') {
        // Schedule daily reminder
        const now = new Date();
        const [hours, minutes] = reminderTime.split(':').map(Number);
        const reminderDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        
        if (reminderDate < now) {
          reminderDate.setDate(reminderDate.getDate() + 1);
        }
        
        const delay = reminderDate.getTime() - now.getTime();
        onScheduleReminder(
          'تذكير قراءة القرآن',
          'حان وقت قراءة القرآن الكريم 📖',
          delay
        );
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-bold ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        إعدادات التنبيهات
      </h3>

      {/* Enable Notifications */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {notificationsEnabled ? (
            <Bell className={`w-5 h-5 ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`} />
          ) : (
            <BellOff className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
          )}
          <span className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            تفعيل التنبيهات
          </span>
        </div>
        
        <button
          onClick={enableNotifications}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            notificationsEnabled 
              ? 'bg-emerald-600' 
              : isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Reminder Time */}
      {notificationsEnabled && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Clock className={`w-4 h-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <label className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              وقت التذكير اليومي
            </label>
          </div>
          
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg text-sm transition-colors ${
              isDarkMode 
                ? 'bg-slate-700 text-white border-slate-600' 
                : 'bg-white text-gray-900 border-gray-300'
            } border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
          />
        </div>
      )}

      {/* Quick Reminders */}
      <div className="space-y-2">
        <h4 className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          تذكيرات سريعة
        </h4>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onScheduleReminder(
              'تذكير قراءة',
              'وقت قراءة سورة قصيرة 📖',
              5 * 60 * 1000 // 5 minutes
            )}
            className={`p-2 rounded-lg text-xs transition-colors ${
              isDarkMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            بعد 5 دقائق
          </button>
          
          <button
            onClick={() => onScheduleReminder(
              'تذكير قراءة',
              'حان وقت قراءة القرآن 🕌',
              30 * 60 * 1000 // 30 minutes
            )}
            className={`p-2 rounded-lg text-xs transition-colors ${
              isDarkMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            بعد 30 دقيقة
          </button>
        </div>
      </div>
    </div>
  );
};