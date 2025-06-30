// بيانات الصلوات والأذان
export interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  rakaat: number;
  sujood: number; // عدد السجدات في كل ركعة
}

export interface PrayerTimes {
  fajr: PrayerTime;
  dhuhr: PrayerTime;
  asr: PrayerTime;
  maghrib: PrayerTime;
  isha: PrayerTime;
}

export const defaultPrayerTimes: PrayerTimes = {
  fajr: {
    name: 'Fajr',
    arabicName: 'الفجر',
    time: '05:30',
    rakaat: 2,
    sujood: 2
  },
  dhuhr: {
    name: 'Dhuhr',
    arabicName: 'الظهر',
    time: '12:30',
    rakaat: 4,
    sujood: 2
  },
  asr: {
    name: 'Asr',
    arabicName: 'العصر',
    time: '15:45',
    rakaat: 4,
    sujood: 2
  },
  maghrib: {
    name: 'Maghrib',
    arabicName: 'المغرب',
    time: '18:15',
    rakaat: 3,
    sujood: 2
  },
  isha: {
    name: 'Isha',
    arabicName: 'العشاء',
    time: '19:45',
    rakaat: 4,
    sujood: 2
  }
};

export const qiblaDirection = {
  latitude: 21.4225, // مكة المكرمة
  longitude: 39.8262
};

// أدعية الصلاة
export const prayerDuas = {
  opening: {
    arabic: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ',
    translation: 'O Allah, distance me from my sins as You have distanced the East from the West'
  },
  ruku: {
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    translation: 'Glory be to my Lord, the Most Great'
  },
  sujood: {
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
    translation: 'Glory be to my Lord, the Most High'
  },
  tashahhud: {
    arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
    translation: 'All greetings, prayers and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings'
  }
};