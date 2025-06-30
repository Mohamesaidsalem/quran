import { useState, useEffect } from 'react';
import { DeceasedPerson, ReminderSchedule, Supplication, memorialSupplications } from '../data/memorial';

interface MemorialState {
  deceasedPersons: DeceasedPerson[];
  activeReminders: ReminderSchedule[];
  dailyProgress: { [personId: string]: number };
  totalPrayers: number;
}

export const useMemorialPrayers = () => {
  const [memorialState, setMemorialState] = useState<MemorialState>({
    deceasedPersons: [],
    activeReminders: [],
    dailyProgress: {},
    totalPrayers: 0
  });

  const [selectedPerson, setSelectedPerson] = useState<DeceasedPerson | null>(null);
  const [currentSupplication, setCurrentSupplication] = useState<Supplication | null>(null);

  useEffect(() => {
    loadMemorialData();
    checkReminders();
    
    // فحص التذكيرات كل دقيقة
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadMemorialData = () => {
    const saved = localStorage.getItem('memorialData');
    if (saved) {
      const data = JSON.parse(saved);
      setMemorialState(data);
    }
  };

  const saveMemorialData = (data: MemorialState) => {
    localStorage.setItem('memorialData', JSON.stringify(data));
    setMemorialState(data);
  };

  const addDeceasedPerson = (person: Omit<DeceasedPerson, 'id'>) => {
    const newPerson: DeceasedPerson = {
      ...person,
      id: Date.now().toString(),
      customReminders: [
        {
          id: 'daily-' + Date.now(),
          type: 'daily',
          time: '20:00',
          isActive: true
        }
      ]
    };

    const newState = {
      ...memorialState,
      deceasedPersons: [...memorialState.deceasedPersons, newPerson],
      dailyProgress: {
        ...memorialState.dailyProgress,
        [newPerson.id]: 0
      }
    };

    saveMemorialData(newState);
  };

  const updateDeceasedPerson = (personId: string, updates: Partial<DeceasedPerson>) => {
    const newState = {
      ...memorialState,
      deceasedPersons: memorialState.deceasedPersons.map(person =>
        person.id === personId ? { ...person, ...updates } : person
      )
    };
    saveMemorialData(newState);
  };

  const removeDeceasedPerson = (personId: string) => {
    const newState = {
      ...memorialState,
      deceasedPersons: memorialState.deceasedPersons.filter(p => p.id !== personId),
      dailyProgress: Object.fromEntries(
        Object.entries(memorialState.dailyProgress).filter(([id]) => id !== personId)
      )
    };
    saveMemorialData(newState);
  };

  const addReminder = (personId: string, reminder: Omit<ReminderSchedule, 'id'>) => {
    const newReminder: ReminderSchedule = {
      ...reminder,
      id: Date.now().toString()
    };

    const newState = {
      ...memorialState,
      deceasedPersons: memorialState.deceasedPersons.map(person =>
        person.id === personId
          ? { ...person, customReminders: [...person.customReminders, newReminder] }
          : person
      )
    };

    saveMemorialData(newState);
  };

  const checkReminders = () => {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' + 
                       now.getMinutes().toString().padStart(2, '0');
    const currentDay = now.getDay();
    const currentDate = now.getDate();

    memorialState.deceasedPersons.forEach(person => {
      person.customReminders.forEach(reminder => {
        if (!reminder.isActive) return;

        let shouldRemind = false;

        switch (reminder.type) {
          case 'daily':
            shouldRemind = reminder.time === currentTime;
            break;
          case 'weekly':
            shouldRemind = reminder.time === currentTime && 
                          reminder.days?.includes(currentDay);
            break;
          case 'monthly':
            shouldRemind = reminder.time === currentTime && 
                          reminder.date === currentDate;
            break;
          case 'anniversary':
            const deathDate = new Date(person.dateOfDeath);
            shouldRemind = reminder.time === currentTime &&
                          deathDate.getDate() === currentDate &&
                          deathDate.getMonth() === now.getMonth();
            break;
        }

        if (shouldRemind) {
          showReminderNotification(person, reminder);
        }
      });
    });
  };

  const showReminderNotification = (person: DeceasedPerson, reminder: ReminderSchedule) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`تذكير بالدعاء لـ ${person.name}`, {
        body: `حان وقت الدعاء والورد لـ ${person.name} - ${person.relationship}`,
        icon: '/icons/icon-192x192.png',
        tag: `memorial-${person.id}`,
        vibrate: [200, 100, 200]
      });
    }

    // اهتزاز الهاتف
    if (navigator.vibrate) {
      navigator.vibrate([500, 200, 500, 200, 500]);
    }
  };

  const recordPrayer = (personId: string, supplicationId: string) => {
    const today = new Date().toDateString();
    const storageKey = `prayers-${today}`;
    const todayPrayers = JSON.parse(localStorage.getItem(storageKey) || '{}');
    
    if (!todayPrayers[personId]) {
      todayPrayers[personId] = [];
    }
    
    todayPrayers[personId].push({
      supplicationId,
      timestamp: Date.now()
    });

    localStorage.setItem(storageKey, JSON.stringify(todayPrayers));

    // تحديث التقدم اليومي
    const newProgress = {
      ...memorialState.dailyProgress,
      [personId]: (memorialState.dailyProgress[personId] || 0) + 1
    };

    const newState = {
      ...memorialState,
      dailyProgress: newProgress,
      totalPrayers: memorialState.totalPrayers + 1
    };

    saveMemorialData(newState);
  };

  const getRandomSupplication = (): Supplication => {
    const randomIndex = Math.floor(Math.random() * memorialSupplications.length);
    return memorialSupplications[randomIndex];
  };

  const getDailyStats = (personId: string) => {
    const today = new Date().toDateString();
    const storageKey = `prayers-${today}`;
    const todayPrayers = JSON.parse(localStorage.getItem(storageKey) || '{}');
    
    return {
      count: todayPrayers[personId]?.length || 0,
      lastPrayer: todayPrayers[personId]?.slice(-1)[0]?.timestamp || null
    };
  };

  const getWeeklyStats = (personId: string) => {
    const stats = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      const storageKey = `prayers-${dateString}`;
      const dayPrayers = JSON.parse(localStorage.getItem(storageKey) || '{}');
      
      stats.push({
        date: dateString,
        count: dayPrayers[personId]?.length || 0
      });
    }
    return stats;
  };

  return {
    memorialState,
    selectedPerson,
    currentSupplication,
    setSelectedPerson,
    setCurrentSupplication,
    addDeceasedPerson,
    updateDeceasedPerson,
    removeDeceasedPerson,
    addReminder,
    recordPrayer,
    getRandomSupplication,
    getDailyStats,
    getWeeklyStats,
    memorialSupplications
  };
};