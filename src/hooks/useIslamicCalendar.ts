import { useState, useEffect } from 'react';
import { HijriDate, IslamicEvent, islamicEvents, hijriMonths } from '../data/islamic-calendar';

export const useIslamicCalendar = () => {
  const [currentHijriDate, setCurrentHijriDate] = useState<HijriDate | null>(null);
  const [todayEvents, setTodayEvents] = useState<IslamicEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<IslamicEvent[]>([]);

  useEffect(() => {
    calculateHijriDate();
    findTodayEvents();
    findUpcomingEvents();
  }, []);

  const calculateHijriDate = () => {
    // تحويل تقريبي من الميلادي للهجري
    const today = new Date();
    const gregorianYear = today.getFullYear();
    const gregorianMonth = today.getMonth() + 1;
    const gregorianDay = today.getDate();

    // معادلة تقريبية للتحويل
    const hijriYear = Math.floor((gregorianYear - 622) * 1.030684);
    const hijriMonth = Math.floor(Math.random() * 12) + 1; // مؤقت
    const hijriDay = Math.floor(Math.random() * 29) + 1; // مؤقت

    const hijriDate: HijriDate = {
      year: hijriYear,
      month: hijriMonth,
      day: hijriDay,
      monthName: hijriMonths[hijriMonth - 1],
      weekDay: today.toLocaleDateString('ar', { weekday: 'long' })
    };

    setCurrentHijriDate(hijriDate);
  };

  const findTodayEvents = () => {
    if (!currentHijriDate) return;

    const events = islamicEvents.filter(event => 
      event.hijriMonth === currentHijriDate.month && 
      event.hijriDay === currentHijriDate.day
    );

    setTodayEvents(events);
  };

  const findUpcomingEvents = () => {
    if (!currentHijriDate) return;

    const upcoming = islamicEvents
      .filter(event => {
        if (event.hijriMonth > currentHijriDate.month) return true;
        if (event.hijriMonth === currentHijriDate.month && event.hijriDay > currentHijriDate.day) return true;
        return false;
      })
      .slice(0, 5);

    setUpcomingEvents(upcoming);
  };

  const isRecommendedFastingDay = () => {
    if (!currentHijriDate) return false;

    const today = new Date();
    const dayOfWeek = today.getDay();

    // الاثنين والخميس
    if (dayOfWeek === 1 || dayOfWeek === 4) return true;

    // الأيام البيض (13، 14، 15)
    if ([13, 14, 15].includes(currentHijriDate.day)) return true;

    return false;
  };

  return {
    currentHijriDate,
    todayEvents,
    upcomingEvents,
    isRecommendedFastingDay: isRecommendedFastingDay()
  };
};