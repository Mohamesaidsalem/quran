import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Smartphone, CheckCircle, AlertTriangle } from 'lucide-react';
import { usePrayerCounter } from '../hooks/usePrayerCounter';
import { PrayerTime, prayerDuas } from '../data/prayer';

interface PrayerCounterProps {
  prayer: PrayerTime;
  isDarkMode: boolean;
  onClose: () => void;
}

export const PrayerCounter: React.FC<PrayerCounterProps> = ({
  prayer,
  isDarkMode,
  onClose
}) => {
  const {
    prayerState,
    isTracking,
    isCalibrated,
    deviceOrientation,
    startPrayer,
    stopPrayer,
    resetPrayer,
    calibrateDevice,
    getSujoodWarning
  } = usePrayerCounter(prayer);

  const [showDuas, setShowDuas] = useState(false);

  const getProgressPercentage = () => {
    const totalExpectedSujoods = prayer.rakaat * prayer.sujood;
    return (prayerState.totalSujoods / totalExpectedSujoods) * 100;
  };

  const getCurrentDua = () => {
    if (prayerState.isInSujood) return prayerDuas.sujood;
    if (prayerState.isInRuku) return prayerDuas.ruku;
    return prayerDuas.opening;
  };

  const warning = getSujoodWarning();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-md mx-auto p-6 rounded-2xl ${
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
      } border shadow-xl max-h-[90vh] overflow-y-auto`}>
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            صلاة {prayer.arabicName}
          </h2>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {prayer.rakaat} ركعات - {prayer.sujood} سجدات لكل ركعة
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className={`w-full h-3 rounded-full ${
            isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
          }`}>
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <p className={`text-center text-sm mt-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {prayerState.totalSujoods} من {prayer.rakaat * prayer.sujood} سجدة
          </p>
        </div>

        {/* Current Status */}
        <div className={`p-4 rounded-xl mb-6 ${
          prayerState.isCompleted
            ? isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50'
            : isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
        }`}>
          {prayerState.isCompleted ? (
            <div className="text-center">
              <CheckCircle className={`w-12 h-12 mx-auto mb-2 ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
              <h3 className={`text-lg font-bold ${
                isDarkMode ? 'text-emerald-300' : 'text-emerald-800'
              }`}>
                تمت الصلاة بحمد الله
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                {prayerState.totalSujoods} سجدة في المجموع
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h3 className={`text-xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                الركعة {prayerState.currentRakah} من {prayer.rakaat}
              </h3>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                السجدة {prayerState.currentSujood} من {prayer.sujood}
              </p>
              
              {/* Current Position */}
              <div className="flex justify-center space-x-4 mt-3">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  prayerState.isInSujood
                    ? 'bg-emerald-600 text-white'
                    : isDarkMode ? 'bg-slate-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                }`}>
                  سجود
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  prayerState.isInRuku
                    ? 'bg-blue-600 text-white'
                    : isDarkMode ? 'bg-slate-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                }`}>
                  ركوع
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Warning */}
        {warning && (
          <div className={`p-3 rounded-lg mb-4 ${
            isDarkMode ? 'bg-amber-900/30 border-amber-700' : 'bg-amber-50 border-amber-200'
          } border`}>
            <div className="flex items-center space-x-2">
              <AlertTriangle className={`w-5 h-5 ${
                isDarkMode ? 'text-amber-400' : 'text-amber-600'
              }`} />
              <p className={`text-sm ${
                isDarkMode ? 'text-amber-300' : 'text-amber-800'
              }`}>
                {warning}
              </p>
            </div>
          </div>
        )}

        {/* Calibration */}
        {!isCalibrated && isTracking && (
          <div className={`p-4 rounded-xl mb-6 ${
            isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
          } border ${
            isDarkMode ? 'border-blue-700' : 'border-blue-200'
          }`}>
            <div className="text-center">
              <Smartphone className={`w-8 h-8 mx-auto mb-2 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <h4 className={`font-bold mb-2 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-800'
              }`}>
                معايرة الجهاز
              </h4>
              <p className={`text-sm mb-3 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                ضع الهاتف أمامك في وضع الوقوف الطبيعي واضغط معايرة
              </p>
              <button
                onClick={calibrateDevice}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                معايرة الآن
              </button>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex space-x-3 mb-6">
          {!isTracking ? (
            <button
              onClick={startPrayer}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>بدء الصلاة</span>
            </button>
          ) : (
            <button
              onClick={stopPrayer}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
            >
              <Pause className="w-5 h-5" />
              <span>إيقاف</span>
            </button>
          )}
          
          <button
            onClick={resetPrayer}
            className={`px-4 py-3 rounded-xl transition-colors ${
              isDarkMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Duas */}
        <div className="mb-6">
          <button
            onClick={() => setShowDuas(!showDuas)}
            className={`w-full p-3 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {showDuas ? 'إخفاء الأدعية' : 'إظهار الأدعية'}
          </button>
          
          {showDuas && (
            <div className={`mt-3 p-4 rounded-lg ${
              isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
            }`}>
              <div className="text-center">
                <p className={`text-lg mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`} dir="rtl">
                  {getCurrentDua().arabic}
                </p>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {getCurrentDua().translation}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`w-full py-3 rounded-xl transition-colors ${
            isDarkMode 
              ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          إغلاق
        </button>
      </div>
    </div>
  );
};