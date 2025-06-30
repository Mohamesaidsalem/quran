import { useState, useEffect, useRef } from 'react';
import { PrayerTime } from '../data/prayer';

interface PrayerState {
  currentRakah: number;
  currentSujood: number;
  isInSujood: boolean;
  isInRuku: boolean;
  isCompleted: boolean;
  totalSujoods: number;
}

export const usePrayerCounter = (prayer: PrayerTime | null) => {
  const [prayerState, setPrayerState] = useState<PrayerState>({
    currentRakah: 1,
    currentSujood: 0,
    isInSujood: false,
    isInRuku: false,
    isCompleted: false,
    totalSujoods: 0
  });

  const [isTracking, setIsTracking] = useState(false);
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [isCalibrated, setIsCalibrated] = useState(false);
  const calibrationRef = useRef({ alpha: 0, beta: 0, gamma: 0 });
  const lastOrientationRef = useRef({ alpha: 0, beta: 0, gamma: 0 });
  const detectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTracking && prayer) {
      requestDeviceMotionPermission();
    }
  }, [isTracking, prayer]);

  const requestDeviceMotionPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          startOrientationTracking();
        }
      } catch (error) {
        console.log('Device orientation permission denied');
      }
    } else {
      // للأجهزة التي لا تحتاج إذن
      startOrientationTracking();
    }
  };

  const startOrientationTracking = () => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { alpha, beta, gamma } = event;
      if (alpha !== null && beta !== null && gamma !== null) {
        setDeviceOrientation({ alpha, beta, gamma });
        
        if (isCalibrated) {
          detectPrayerMovements({ alpha, beta, gamma });
        }
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  };

  const calibrateDevice = () => {
    calibrationRef.current = { ...deviceOrientation };
    lastOrientationRef.current = { ...deviceOrientation };
    setIsCalibrated(true);
  };

  const detectPrayerMovements = (orientation: { alpha: number, beta: number, gamma: number }) => {
    const { beta } = orientation;
    const lastBeta = lastOrientationRef.current.beta;
    const calibratedBeta = calibrationRef.current.beta;
    
    // حساب الفرق في الميل للأمام/الخلف
    const tiltDifference = Math.abs(beta - calibratedBeta);
    const tiltChange = Math.abs(beta - lastBeta);
    
    // اكتشاف السجود (ميل كبير للأمام)
    if (tiltDifference > 45 && !prayerState.isInSujood && tiltChange > 10) {
      enterSujood();
    }
    
    // اكتشاف الرفع من السجود (العودة للوضع الطبيعي)
    else if (tiltDifference < 20 && prayerState.isInSujood && tiltChange > 10) {
      exitSujood();
    }
    
    // اكتشاف الركوع (ميل متوسط للأمام)
    else if (tiltDifference > 25 && tiltDifference < 45 && !prayerState.isInRuku && !prayerState.isInSujood) {
      enterRuku();
    }
    
    // اكتشاف الرفع من الركوع
    else if (tiltDifference < 15 && prayerState.isInRuku) {
      exitRuku();
    }
    
    lastOrientationRef.current = orientation;
  };

  const enterSujood = () => {
    if (!prayer) return;
    
    setPrayerState(prev => ({
      ...prev,
      isInSujood: true,
      totalSujoods: prev.totalSujoods + 1
    }));

    // تنبيه صوتي/اهتزاز
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  const exitSujood = () => {
    if (!prayer) return;

    setPrayerState(prev => {
      const newSujoodCount = prev.currentSujood + 1;
      const isRakahComplete = newSujoodCount >= prayer.sujood;
      const newRakahCount = isRakahComplete ? prev.currentRakah + 1 : prev.currentRakah;
      const isPrayerComplete = newRakahCount > prayer.rakaat;

      return {
        ...prev,
        isInSujood: false,
        currentSujood: isRakahComplete ? 0 : newSujoodCount,
        currentRakah: isPrayerComplete ? prayer.rakaat : newRakahCount,
        isCompleted: isPrayerComplete
      };
    });

    // تنبيه عند اكتمال الركعة
    if (prayerState.currentSujood + 1 >= prayer.sujood) {
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    }
  };

  const enterRuku = () => {
    setPrayerState(prev => ({ ...prev, isInRuku: true }));
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const exitRuku = () => {
    setPrayerState(prev => ({ ...prev, isInRuku: false }));
  };

  const startPrayer = () => {
    if (!prayer) return;
    
    setPrayerState({
      currentRakah: 1,
      currentSujood: 0,
      isInSujood: false,
      isInRuku: false,
      isCompleted: false,
      totalSujoods: 0
    });
    
    setIsTracking(true);
    setIsCalibrated(false);
  };

  const stopPrayer = () => {
    setIsTracking(false);
    setIsCalibrated(false);
  };

  const resetPrayer = () => {
    setPrayerState({
      currentRakah: 1,
      currentSujood: 0,
      isInSujood: false,
      isInRuku: false,
      isCompleted: false,
      totalSujoods: 0
    });
  };

  // تحذير إذا كانت السجدات ناقصة
  const getSujoodWarning = () => {
    if (!prayer || !isTracking) return null;
    
    const expectedSujoods = (prayerState.currentRakah - 1) * prayer.sujood + prayerState.currentSujood;
    const actualSujoods = prayerState.totalSujoods;
    
    if (actualSujoods < expectedSujoods) {
      return `تنبيه: قد تكون فاتتك ${expectedSujoods - actualSujoods} سجدة`;
    }
    
    return null;
  };

  return {
    prayerState,
    isTracking,
    isCalibrated,
    deviceOrientation,
    startPrayer,
    stopPrayer,
    resetPrayer,
    calibrateDevice,
    getSujoodWarning
  };
};