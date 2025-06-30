import { useState, useEffect } from 'react';
import { DhikrItem, DhikrSession } from '../data/dhikr';

export const useDhikrCounter = () => {
  const [currentSession, setCurrentSession] = useState<DhikrSession | null>(null);
  const [dailyProgress, setDailyProgress] = useState<{ [dhikrId: string]: number }>({});
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    loadDailyProgress();
  }, []);

  const loadDailyProgress = () => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem(`dhikr-${today}`);
    if (saved) {
      setDailyProgress(JSON.parse(saved));
    }
  };

  const saveDailyProgress = (progress: { [dhikrId: string]: number }) => {
    const today = new Date().toDateString();
    localStorage.setItem(`dhikr-${today}`, JSON.stringify(progress));
    setDailyProgress(progress);
  };

  const startDhikrSession = (dhikr: DhikrItem) => {
    const session: DhikrSession = {
      id: Date.now().toString(),
      dhikrId: dhikr.id,
      currentCount: 0,
      targetCount: dhikr.count,
      startTime: Date.now(),
      isCompleted: false
    };
    setCurrentSession(session);
  };

  const incrementCount = () => {
    if (!currentSession) return;

    const newCount = currentSession.currentCount + 1;
    const isCompleted = newCount >= currentSession.targetCount;

    const updatedSession = {
      ...currentSession,
      currentCount: newCount,
      isCompleted
    };

    setCurrentSession(updatedSession);

    // اهتزاز عند كل عدة
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // تحديث التقدم اليومي
    const newProgress = {
      ...dailyProgress,
      [currentSession.dhikrId]: (dailyProgress[currentSession.dhikrId] || 0) + 1
    };
    saveDailyProgress(newProgress);
    setTotalCount(prev => prev + 1);

    // إشعار عند الانتهاء
    if (isCompleted) {
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
      }
      
      setTimeout(() => {
        setCurrentSession(null);
      }, 2000);
    }
  };

  const resetSession = () => {
    setCurrentSession(null);
  };

  const getDhikrProgress = (dhikrId: string) => {
    return dailyProgress[dhikrId] || 0;
  };

  return {
    currentSession,
    dailyProgress,
    totalCount,
    startDhikrSession,
    incrementCount,
    resetSession,
    getDhikrProgress
  };
};