import { useState, useEffect } from 'react';
import { PrayerTimes, defaultPrayerTimes, PrayerTime } from '../data/prayer';

export const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(defaultPrayerTimes);
  const [currentPrayer, setCurrentPrayer] = useState<PrayerTime | null>(null);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [timeToNext, setTimeToNext] = useState<string>('');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // طلب الموقع لحساب أوقات الصلاة الدقيقة
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          calculatePrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log('Location access denied, using default times');
        }
      );
    }

    // تحديث الوقت كل دقيقة
    const interval = setInterval(updateCurrentPrayer, 60000);
    updateCurrentPrayer();

    return () => clearInterval(interval);
  }, [prayerTimes]);

  const calculatePrayerTimes = async (lat: number, lng: number) => {
    try {
      // في التطبيق الحقيقي، ستستخدم API لحساب أوقات الصلاة
      // مثل: https://api.aladhan.com/v1/timings
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=4`
      );
      const data = await response.json();
      
      if (data.code === 200) {
        const timings = data.data.timings;
        setPrayerTimes({
          fajr: { ...defaultPrayerTimes.fajr, time: timings.Fajr },
          dhuhr: { ...defaultPrayerTimes.dhuhr, time: timings.Dhuhr },
          asr: { ...defaultPrayerTimes.asr, time: timings.Asr },
          maghrib: { ...defaultPrayerTimes.maghrib, time: timings.Maghrib },
          isha: { ...defaultPrayerTimes.isha, time: timings.Isha }
        });
      }
    } catch (error) {
      console.log('Failed to fetch prayer times, using defaults');
    }
  };

  const updateCurrentPrayer = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers = Object.values(prayerTimes);
    const prayerMinutes = prayers.map(prayer => {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      return hours * 60 + minutes;
    });

    let current = null;
    let next = null;

    for (let i = 0; i < prayers.length; i++) {
      if (currentTime >= prayerMinutes[i]) {
        current = prayers[i];
      } else {
        next = prayers[i];
        break;
      }
    }

    // إذا لم نجد صلاة تالية، فالتالية هي فجر اليوم التالي
    if (!next) {
      next = prayers[0];
    }

    setCurrentPrayer(current);
    setNextPrayer(next);

    // حساب الوقت المتبقي للصلاة التالية
    if (next) {
      const [nextHours, nextMinutes] = next.time.split(':').map(Number);
      let nextTime = nextHours * 60 + nextMinutes;
      
      // إذا كانت الصلاة التالية في اليوم التالي
      if (nextTime <= currentTime) {
        nextTime += 24 * 60;
      }
      
      const timeDiff = nextTime - currentTime;
      const hours = Math.floor(timeDiff / 60);
      const minutes = timeDiff % 60;
      
      setTimeToNext(`${hours}:${minutes.toString().padStart(2, '0')}`);
    }
  };

  const getQiblaDirection = () => {
    if (!location) return 0;
    
    // حساب اتجاه القبلة من الموقع الحالي
    const lat1 = location.lat * Math.PI / 180;
    const lat2 = 21.4225 * Math.PI / 180; // مكة
    const deltaLng = (39.8262 - location.lng) * Math.PI / 180;
    
    const y = Math.sin(deltaLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360;
    
    return bearing;
  };

  return {
    prayerTimes,
    currentPrayer,
    nextPrayer,
    timeToNext,
    location,
    qiblaDirection: getQiblaDirection(),
    updateCurrentPrayer
  };
};