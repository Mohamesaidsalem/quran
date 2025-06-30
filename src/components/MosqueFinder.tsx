import React, { useState } from 'react';
import { MapPin, Navigation, Star, Phone, Clock, Car } from 'lucide-react';
import { useMosqueFinder } from '../hooks/useMosqueFinder';

interface MosqueFinderProps {
  isDarkMode: boolean;
}

export const MosqueFinder: React.FC<MosqueFinderProps> = ({ isDarkMode }) => {
  const {
    nearbyMosques,
    userLocation,
    loading,
    getDirections,
    addReview
  } = useMosqueFinder();

  const [selectedMosque, setSelectedMosque] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const handleAddReview = (mosqueId: string) => {
    if (newReview.comment.trim()) {
      addReview(mosqueId, newReview);
      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MapPin className={`w-8 h-8 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <div>
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              دليل المساجد القريبة
            </h2>
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              اعثر على أقرب المساجد إليك
            </p>
          </div>
        </div>

        {userLocation && (
          <div className={`p-3 rounded-lg ${
            isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'
          }`}>
            <div className="text-center">
              <Navigation className={`w-6 h-6 mx-auto mb-1 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <div className={`text-xs ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                موقعك الحالي
              </div>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className={`text-center p-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          جاري البحث عن المساجد القريبة...
        </div>
      )}

      {/* Mosques List */}
      <div className="space-y-4">
        {nearbyMosques.map((mosque) => (
          <div
            key={mosque.id}
            className={`p-6 rounded-xl transition-all duration-200 ${
              isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200'
            } border hover:shadow-lg`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className={`text-xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {mosque.arabicName}
                </h3>
                
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className={`w-4 h-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`} />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {mosque.address}
                  </span>
                  {mosque.distance && (
                    <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      ({mosque.distance.toFixed(1)} كم)
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {mosque.rating} ({mosque.reviews.length} تقييم)
                  </span>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    الإمام: {mosque.imam}
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mosque.features.map((feature, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs ${
                        isDarkMode 
                          ? 'bg-blue-900/30 text-blue-300' 
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Prayer Times */}
            <div className={`p-4 rounded-lg mb-4 ${
              isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'
            }`}>
              <h4 className={`font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                مواقيت الصلاة
              </h4>
              <div className="grid grid-cols-5 gap-2 text-sm">
                {Object.entries(mosque.prayerTimes).map(([prayer, time]) => (
                  <div key={prayer} className="text-center">
                    <div className={`font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {prayer === 'fajr' ? 'الفجر' :
                       prayer === 'dhuhr' ? 'الظهر' :
                       prayer === 'asr' ? 'العصر' :
                       prayer === 'maghrib' ? 'المغرب' : 'العشاء'}
                    </div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => getDirections(mosque)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>الاتجاهات</span>
              </button>

              {mosque.phone && (
                <a
                  href={`tel:${mosque.phone}`}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>اتصال</span>
                </a>
              )}

              <button
                onClick={() => {
                  setSelectedMosque(mosque.id);
                  setShowReviewForm(true);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                إضافة تقييم
              </button>
            </div>

            {/* Reviews */}
            {mosque.reviews.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h5 className={`font-medium mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  التقييمات
                </h5>
                <div className="space-y-2">
                  {mosque.reviews.slice(0, 2).map((review) => (
                    <div key={review.id} className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-slate-700/30' : 'bg-gray-100'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-medium text-sm ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {review.userName}
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </div>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Review Form Modal */}
      {showReviewForm && selectedMosque && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowReviewForm(false)}
          />
          
          <div className={`relative w-full max-w-md mx-auto p-6 rounded-2xl ${
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
          } border shadow-xl`}>
            <h3 className={`text-lg font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              إضافة تقييم
            </h3>

            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                التقييم
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setNewReview({...newReview, rating})}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                التعليق
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                rows={3}
                className={`w-full px-3 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-700 text-white border-slate-600' 
                    : 'bg-white text-gray-900 border-gray-300'
                } border focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="شاركنا تجربتك مع هذا المسجد..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleAddReview(selectedMosque)}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                إضافة التقييم
              </button>
              <button
                onClick={() => setShowReviewForm(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-700 hover:bg-slate-600 text-gray-300' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && nearbyMosques.length === 0 && (
        <div className={`text-center p-12 rounded-xl ${
          isDarkMode ? 'bg-slate-800/30' : 'bg-white/70'
        } border ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <MapPin className={`w-16 h-16 mx-auto mb-4 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <h3 className={`text-xl font-medium mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            لم يتم العثور على مساجد قريبة
          </h3>
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            تأكد من تفعيل خدمة الموقع للحصول على أفضل النتائج
          </p>
        </div>
      )}
    </div>
  );
};