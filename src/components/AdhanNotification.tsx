import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Clock } from 'lucide-react';

interface AdhanNotificationProps {
  prayerName: string;
  prayerTime: string;
  isDarkMode: boolean;
  onDismiss: () => void;
  onSnooze: () => void;
}

export const AdhanNotification: React.FC<AdhanNotificationProps> = ({
  prayerName,
  prayerTime,
  isDarkMode,
  onDismiss,
  onSnooze
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioRef] = useState(new Audio('/adhan.mp3')); // ملف الأذان

  useEffect(() => {
    // تشغيل الأذان
    if (isPlaying) {
      audioRef.play().catch(console.error);
    } else {
      audioRef.pause();
    }

    // اهتزاز الهاتف
    if (navigator.vibrate) {
      navigator.vibrate([1000, 500, 1000, 500, 1000]);
    }

    return () => {
      audioRef.pause();
    };
  }, [isPlaying, audioRef]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div className={`relative w-full max-w-sm mx-auto p-6 rounded-2xl ${
        isDarkMode ? 'bg-emerald-900' : 'bg-emerald-600'
      } text-white shadow-2xl animate-pulse`}>
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            حان وقت الأذان
          </h2>
          
          <h3 className="text-3xl font-bold mb-2">
            {prayerName}
          </h3>
          
          <p className="text-xl font-mono">
            {prayerTime}
          </p>
        </div>

        {/* Audio Control */}
        <div className="flex justify-center mb-6">
          <button
            onClick={toggleAudio}
            className="p-4 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
          >
            {isPlaying ? (
              <Volume2 className="w-8 h-8" />
            ) : (
              <VolumeX className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onDismiss}
            className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors font-medium"
          >
            إيقاف الأذان
          </button>
          
          <button
            onClick={onSnooze}
            className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            تذكير بعد 5 دقائق
          </button>
        </div>

        {/* Islamic Decoration */}
        <div className="absolute top-2 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
        <div className="absolute bottom-2 left-2 right-2 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
      </div>
    </div>
  );
};