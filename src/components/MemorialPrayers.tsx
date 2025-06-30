import React, { useState } from 'react';
import { Heart, Plus, Clock, Calendar, User, Trash2, Edit, BarChart3 } from 'lucide-react';
import { useMemorialPrayers } from '../hooks/useMemorialPrayers';
import { DeceasedPerson, Supplication } from '../data/memorial';

interface MemorialPrayersProps {
  isDarkMode: boolean;
}

export const MemorialPrayers: React.FC<MemorialPrayersProps> = ({ isDarkMode }) => {
  const {
    memorialState,
    selectedPerson,
    currentSupplication,
    setSelectedPerson,
    setCurrentSupplication,
    addDeceasedPerson,
    updateDeceasedPerson,
    removeDeceasedPerson,
    recordPrayer,
    getRandomSupplication,
    getDailyStats,
    getWeeklyStats,
    memorialSupplications
  } = useMemorialPrayers();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [newPerson, setNewPerson] = useState({
    name: '',
    relationship: '',
    dateOfDeath: ''
  });

  const handleAddPerson = () => {
    if (newPerson.name && newPerson.relationship && newPerson.dateOfDeath) {
      addDeceasedPerson({
        ...newPerson,
        favoriteSupplications: [],
        customReminders: []
      });
      setNewPerson({ name: '', relationship: '', dateOfDeath: '' });
      setShowAddForm(false);
    }
  };

  const handlePrayerComplete = (supplication: Supplication) => {
    if (selectedPerson) {
      recordPrayer(selectedPerson.id, supplication.id);
      
      // اهتزاز تأكيدي
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }

      // إظهار دعاء جديد بعد 3 ثوان
      setTimeout(() => {
        setCurrentSupplication(getRandomSupplication());
      }, 3000);
    }
  };

  const startPrayerSession = (person: DeceasedPerson) => {
    setSelectedPerson(person);
    setCurrentSupplication(getRandomSupplication());
  };

  if (selectedPerson && currentSupplication) {
    const dailyStats = getDailyStats(selectedPerson.id);
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className={`p-6 rounded-xl ${
          isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'
        } border ${
          isDarkMode ? 'border-purple-700' : 'border-purple-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Heart className={`w-8 h-8 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`} />
              <div>
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  الدعاء لـ {selectedPerson.name}
                </h2>
                <p className={`${
                  isDarkMode ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  {selectedPerson.relationship}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => {
                setSelectedPerson(null);
                setCurrentSupplication(null);
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              إنهاء الجلسة
            </button>
          </div>

          {/* Daily Progress */}
          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-purple-800/30' : 'bg-purple-100'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${
                isDarkMode ? 'text-purple-300' : 'text-purple-700'
              }`}>
                أدعية اليوم
              </span>
              <span className={`text-2xl font-bold ${
                isDarkMode ? 'text-purple-200' : 'text-purple-800'
              }`}>
                {dailyStats.count}
              </span>
            </div>
          </div>
        </div>

        {/* Current Supplication */}
        <div className={`p-8 rounded-xl text-center ${
          isDarkMode ? 'bg-slate-800/50' : 'bg-white/70'
        } border ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          {/* Arabic Text */}
          <div 
            className={`text-2xl leading-relaxed mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
            dir="rtl"
            style={{ lineHeight: '2.2' }}
          >
            {currentSupplication.arabic}
          </div>

          {/* Translation */}
          <div className={`text-lg mb-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {currentSupplication.translation}
          </div>

          {/* Transliteration */}
          <div className={`text-sm italic mb-6 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {currentSupplication.transliteration}
          </div>

          {/* Source & Reward */}
          <div className={`text-xs mb-6 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            <div className="mb-1">{currentSupplication.reward}</div>
            {currentSupplication.source && (
              <div>المصدر: {currentSupplication.source}</div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => handlePrayerComplete(currentSupplication)}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors font-medium"
            >
              تم الدعاء ✨
            </button>
            
            <button
              onClick={() => setCurrentSupplication(getRandomSupplication())}
              className={`px-6 py-3 rounded-xl transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              دعاء آخر
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCurrentSupplication(memorialSupplications[0])}
            className={`p-4 rounded-xl transition-colors ${
              isDarkMode 
                ? 'bg-emerald-900/30 hover:bg-emerald-800/30 border-emerald-700' 
                : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
            } border`}
          >
            <div className={`text-sm font-medium ${
              isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
            }`}>
              الدعاء الشامل
            </div>
          </button>
          
          <button
            onClick={() => setCurrentSupplication(memorialSupplications[2])}
            className={`p-4 rounded-xl transition-colors ${
              isDarkMode 
                ? 'bg-blue-900/30 hover:bg-blue-800/30 border-blue-700' 
                : 'bg-blue-50 hover:bg-blue-100 border-blue-200'
            } border`}
          >
            <div className={`text-sm font-medium ${
              isDarkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              دعاء قرآني
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Heart className={`w-8 h-8 ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`} />
          <div>
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              الورد والأدعية للمتوفين
            </h2>
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              أدعية وأذكار تصل للأموات بإذن الله
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setShowStats(!showStats)}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-slate-700 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة متوفي</span>
          </button>
        </div>
      </div>

      {/* Add Person Form */}
      {showAddForm && (
        <div className={`p-6 rounded-xl ${
          isDarkMode ? 'bg-slate-800/50' : 'bg-white/70'
        } border ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <h3 className={`text-lg font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            إضافة متوفي جديد
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="الاسم"
              value={newPerson.name}
              onChange={(e) => setNewPerson({...newPerson, name: e.target.value})}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700 text-white border-slate-600' 
                  : 'bg-white text-gray-900 border-gray-300'
              } border focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
            />
            
            <input
              type="text"
              placeholder="صلة القرابة (والد، والدة، جد...)"
              value={newPerson.relationship}
              onChange={(e) => setNewPerson({...newPerson, relationship: e.target.value})}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700 text-white border-slate-600' 
                  : 'bg-white text-gray-900 border-gray-300'
              } border focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
            />
          </div>
          
          <input
            type="date"
            placeholder="تاريخ الوفاة"
            value={newPerson.dateOfDeath}
            onChange={(e) => setNewPerson({...newPerson, dateOfDeath: e.target.value})}
            className={`w-full px-4 py-3 rounded-lg mb-4 transition-colors ${
              isDarkMode 
                ? 'bg-slate-700 text-white border-slate-600' 
                : 'bg-white text-gray-900 border-gray-300'
            } border focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
          />
          
          <div className="flex space-x-3">
            <button
              onClick={handleAddPerson}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              إضافة
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Deceased Persons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {memorialState.deceasedPersons.map((person) => {
          const dailyStats = getDailyStats(person.id);
          const weeklyStats = getWeeklyStats(person.id);
          const weeklyTotal = weeklyStats.reduce((sum, day) => sum + day.count, 0);
          
          return (
            <div
              key={person.id}
              className={`p-6 rounded-xl transition-all duration-200 ${
                isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'
              } border hover:shadow-lg`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
                  }`}>
                    <User className={`w-6 h-6 ${
                      isDarkMode ? 'text-purple-300' : 'text-purple-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {person.name}
                    </h3>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {person.relationship}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => removeDeceasedPerson(person.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-red-900/30 text-red-400 hover:text-red-300' 
                      : 'hover:bg-red-50 text-red-500 hover:text-red-600'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'
                }`}>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    اليوم
                  </div>
                  <div className={`text-xl font-bold ${
                    isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                  }`}>
                    {dailyStats.count}
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
                }`}>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    هذا الأسبوع
                  </div>
                  <div className={`text-xl font-bold ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-700'
                  }`}>
                    {weeklyTotal}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={() => startPrayerSession(person)}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
              >
                بدء جلسة الدعاء 🤲
              </button>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {memorialState.deceasedPersons.length === 0 && (
        <div className={`text-center p-12 rounded-xl ${
          isDarkMode ? 'bg-slate-800/30' : 'bg-white/70'
        } border ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <Heart className={`w-16 h-16 mx-auto mb-4 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <h3 className={`text-xl font-medium mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            لا يوجد أشخاص مضافين بعد
          </h3>
          <p className={`mb-4 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            أضف الأشخاص المتوفين لتبدأ في الدعاء لهم
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            إضافة أول متوفي
          </button>
        </div>
      )}
    </div>
  );
};