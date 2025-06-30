import React, { useState } from 'react';
import { Gift, Calculator, Heart, TrendingUp, DollarSign, Users, Target, Award } from 'lucide-react';
import { useCharity } from '../hooks/useCharity';

interface CharitySectionProps {
  isDarkMode: boolean;
}

export const CharitySection: React.FC<CharitySectionProps> = ({ isDarkMode }) => {
  const {
    charityState,
    calculateZakat,
    addDonation,
    getMonthlyTotal,
    getYearlyTotal,
    charityOrganizations,
    featuredProjects
  } = useCharity();

  const [activeTab, setActiveTab] = useState<'zakat' | 'donate' | 'track'>('zakat');
  const [zakatForm, setZakatForm] = useState({
    type: 'money',
    amount: '',
    goldPrice: '2000' // سعر الجرام
  });

  const handleZakatCalculation = () => {
    const result = calculateZakat(zakatForm.type as any, parseFloat(zakatForm.amount));
    return result;
  };

  const zakatResult = zakatForm.amount ? handleZakatCalculation() : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Gift className={`w-8 h-8 ${
            isDarkMode ? 'text-rose-400' : 'text-rose-600'
          }`} />
          <div>
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              الصدقة والزكاة
            </h2>
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              أدِ زكاتك وتبرع للخير
            </p>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className={`p-4 rounded-xl ${
          isDarkMode ? 'bg-rose-900/30' : 'bg-rose-50'
        }`}>
          <div className="text-center">
            <div className={`text-2xl font-bold ${
              isDarkMode ? 'text-rose-300' : 'text-rose-700'
            }`}>
              {getMonthlyTotal().toLocaleString()} ر.س
            </div>
            <div className={`text-xs ${
              isDarkMode ? 'text-rose-400' : 'text-rose-600'
            }`}>
              هذا الشهر
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`flex space-x-1 p-1 rounded-xl ${
        isDarkMode ? 'bg-slate-800/50' : 'bg-white/70'
      } backdrop-blur-sm border ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        {[
          { key: 'zakat', label: 'حاسبة الزكاة', icon: Calculator },
          { key: 'donate', label: 'التبرعات', icon: Heart },
          { key: 'track', label: 'المتابعة', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                activeTab === tab.key
                  ? isDarkMode
                    ? 'bg-rose-600 text-white shadow-lg'
                    : 'bg-rose-600 text-white shadow-lg'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-white hover:bg-slate-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Zakat Calculator */}
      {activeTab === 'zakat' && (
        <div className="space-y-6">
          <div className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-slate-800/50' : 'bg-white/70'
          } border ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              حاسبة الزكاة
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  نوع المال
                </label>
                <select
                  value={zakatForm.type}
                  onChange={(e) => setZakatForm({...zakatForm, type: e.target.value})}
                  className={`w-full px-4 py-3 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-700 text-white border-slate-600' 
                      : 'bg-white text-gray-900 border-gray-300'
                  } border focus:ring-2 focus:ring-rose-500 focus:border-rose-500`}
                >
                  <option value="money">النقود</option>
                  <option value="gold">الذهب</option>
                  <option value="silver">الفضة</option>
                  <option value="trade">عروض التجارة</option>
                  <option value="livestock">الماشية</option>
                  <option value="crops">الزروع</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  المبلغ (ريال سعودي)
                </label>
                <input
                  type="number"
                  value={zakatForm.amount}
                  onChange={(e) => setZakatForm({...zakatForm, amount: e.target.value})}
                  placeholder="أدخل المبلغ"
                  className={`w-full px-4 py-3 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-700 text-white border-slate-600' 
                      : 'bg-white text-gray-900 border-gray-300'
                  } border focus:ring-2 focus:ring-rose-500 focus:border-rose-500`}
                />
              </div>
            </div>

            {zakatResult && (
              <div className={`mt-6 p-4 rounded-lg ${
                isDarkMode ? 'bg-emerald-900/30 border-emerald-700' : 'bg-emerald-50 border-emerald-200'
              } border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-bold ${
                      isDarkMode ? 'text-emerald-300' : 'text-emerald-800'
                    }`}>
                      مقدار الزكاة المستحقة
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      النصاب: {zakatResult.nisab.toLocaleString()} ريال
                    </p>
                  </div>
                  <div className={`text-2xl font-bold ${
                    isDarkMode ? 'text-emerald-200' : 'text-emerald-700'
                  }`}>
                    {zakatResult.zakatAmount.toLocaleString()} ر.س
                  </div>
                </div>
                
                {zakatResult.amount < zakatResult.nisab && (
                  <div className={`mt-2 text-sm ${
                    isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  }`}>
                    ⚠️ المبلغ أقل من النصاب - لا زكاة عليه
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Zakat Info */}
          <div className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
          } border ${
            isDarkMode ? 'border-blue-700' : 'border-blue-200'
          }`}>
            <h4 className={`font-bold mb-3 ${
              isDarkMode ? 'text-blue-300' : 'text-blue-800'
            }`}>
              معلومات مهمة عن الزكاة
            </h4>
            <ul className={`space-y-2 text-sm ${
              isDarkMode ? 'text-blue-200' : 'text-blue-700'
            }`}>
              <li>• الزكاة واجبة على كل مسلم بالغ عاقل يملك النصاب</li>
              <li>• يجب أن يحول على المال الحول (سنة كاملة)</li>
              <li>• نصاب النقود يعادل 85 جرام من الذهب</li>
              <li>• مقدار الزكاة 2.5% من المال</li>
            </ul>
          </div>
        </div>
      )}

      {/* Donations */}
      {activeTab === 'donate' && (
        <div className="space-y-6">
          {/* Featured Projects */}
          <div>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              مشاريع مميزة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => {
                const progress = (project.currentAmount / project.targetAmount) * 100;
                return (
                  <div
                    key={project.id}
                    className={`p-6 rounded-xl transition-all duration-200 ${
                      isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'
                    } border hover:shadow-lg`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className={`text-lg font-bold mb-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {project.arabicTitle}
                        </h4>
                        <p className={`text-sm mb-3 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className={`w-full h-3 rounded-full ${
                        isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                      }`}>
                        <div 
                          className="h-full bg-rose-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className={isDarkMode ? 'text-rose-400' : 'text-rose-600'}>
                          {project.currentAmount.toLocaleString()} ر.س
                        </span>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                          {project.targetAmount.toLocaleString()} ر.س
                        </span>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors font-medium">
                      تبرع الآن
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Charity Organizations */}
          <div>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              الجمعيات الخيرية
            </h3>
            <div className="space-y-4">
              {charityOrganizations.map((org) => (
                <div
                  key={org.id}
                  className={`p-6 rounded-xl transition-all duration-200 ${
                    isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'
                  } border hover:shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isDarkMode ? 'bg-rose-900' : 'bg-rose-100'
                      }`}>
                        <Heart className={`w-6 h-6 ${
                          isDarkMode ? 'text-rose-300' : 'text-rose-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className={`text-lg font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {org.arabicName}
                        </h4>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {org.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-full ${
                                  i < Math.floor(org.rating) ? 'bg-yellow-500' : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {org.rating}
                          </span>
                          {org.verified && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              موثقة
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <button className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors">
                      تبرع
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tracking */}
      {activeTab === 'track' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'
            } border ${
              isDarkMode ? 'border-emerald-700' : 'border-emerald-200'
            }`}>
              <div className="flex items-center space-x-3 mb-3">
                <DollarSign className={`w-8 h-8 ${
                  isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                }`} />
                <div>
                  <h3 className={`text-lg font-bold ${
                    isDarkMode ? 'text-emerald-300' : 'text-emerald-800'
                  }`}>
                    إجمالي التبرعات
                  </h3>
                  <p className={`text-2xl font-bold ${
                    isDarkMode ? 'text-emerald-200' : 'text-emerald-700'
                  }`}>
                    {getYearlyTotal().toLocaleString()} ر.س
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
            } border ${
              isDarkMode ? 'border-blue-700' : 'border-blue-200'
            }`}>
              <div className="flex items-center space-x-3 mb-3">
                <Target className={`w-8 h-8 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <div>
                  <h3 className={`text-lg font-bold ${
                    isDarkMode ? 'text-blue-300' : 'text-blue-800'
                  }`}>
                    هذا الشهر
                  </h3>
                  <p className={`text-2xl font-bold ${
                    isDarkMode ? 'text-blue-200' : 'text-blue-700'
                  }`}>
                    {getMonthlyTotal().toLocaleString()} ر.س
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'
            } border ${
              isDarkMode ? 'border-purple-700' : 'border-purple-200'
            }`}>
              <div className="flex items-center space-x-3 mb-3">
                <Award className={`w-8 h-8 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`} />
                <div>
                  <h3 className={`text-lg font-bold ${
                    isDarkMode ? 'text-purple-300' : 'text-purple-800'
                  }`}>
                    عدد التبرعات
                  </h3>
                  <p className={`text-2xl font-bold ${
                    isDarkMode ? 'text-purple-200' : 'text-purple-700'
                  }`}>
                    {charityState.donations.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Donations */}
          <div className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-slate-800/50' : 'bg-white/70'
          } border ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              آخر التبرعات
            </h3>
            
            {charityState.donations.length === 0 ? (
              <div className="text-center py-8">
                <Gift className={`w-16 h-16 mx-auto mb-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  لم تقم بأي تبرعات بعد
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {charityState.donations.slice(-5).reverse().map((donation) => (
                  <div
                    key={donation.id}
                    className={`p-4 rounded-lg ${
                      isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {donation.organizationName}
                        </h4>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {new Date(donation.date).toLocaleDateString('ar')}
                        </p>
                      </div>
                      <div className={`text-lg font-bold ${
                        isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                      }`}>
                        {donation.amount.toLocaleString()} ر.س
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};