// بيانات التسبيح والأذكار
export interface DhikrItem {
  id: string;
  arabic: string;
  translation: string;
  transliteration: string;
  count: number;
  category: 'morning' | 'evening' | 'afterPrayer' | 'general' | 'sleep';
  reward: string;
  source?: string;
}

export interface DhikrSession {
  id: string;
  dhikrId: string;
  currentCount: number;
  targetCount: number;
  startTime: number;
  isCompleted: boolean;
}

// أذكار الصباح
export const morningAdhkar: DhikrItem[] = [
  {
    id: 'morning1',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    translation: 'We have reached the morning and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner.',
    transliteration: 'Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illa Allah wahdahu la sharika lah',
    count: 1,
    category: 'morning',
    reward: 'حماية من الشيطان طوال اليوم',
    source: 'صحيح مسلم'
  },
  {
    id: 'morning2',
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    translation: 'O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.',
    transliteration: 'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaykan-nushur',
    count: 1,
    category: 'morning',
    reward: 'توكل على الله في جميع الأمور'
  }
];

// أذكار المساء
export const eveningAdhkar: DhikrItem[] = [
  {
    id: 'evening1',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
    translation: 'We have reached the evening and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner.',
    transliteration: 'Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illa Allah wahdahu la sharika lah',
    count: 1,
    category: 'evening',
    reward: 'حماية من الشيطان طوال الليل'
  }
];

// أذكار بعد الصلاة
export const afterPrayerAdhkar: DhikrItem[] = [
  {
    id: 'afterPrayer1',
    arabic: 'سُبْحَانَ اللَّهِ',
    translation: 'Glory be to Allah',
    transliteration: 'Subhan Allah',
    count: 33,
    category: 'afterPrayer',
    reward: 'تسبيح بعد كل صلاة'
  },
  {
    id: 'afterPrayer2',
    arabic: 'الْحَمْدُ لِلَّهِ',
    translation: 'All praise is due to Allah',
    transliteration: 'Alhamdu lillah',
    count: 33,
    category: 'afterPrayer',
    reward: 'حمد بعد كل صلاة'
  },
  {
    id: 'afterPrayer3',
    arabic: 'اللَّهُ أَكْبَرُ',
    translation: 'Allah is the Greatest',
    transliteration: 'Allahu Akbar',
    count: 34,
    category: 'afterPrayer',
    reward: 'تكبير بعد كل صلاة'
  }
];

// التسبيح العام
export const generalDhikr: DhikrItem[] = [
  {
    id: 'general1',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    translation: 'There is no god but Allah',
    transliteration: 'La ilaha illa Allah',
    count: 100,
    category: 'general',
    reward: 'أفضل الذكر'
  },
  {
    id: 'general2',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    translation: 'Glory be to Allah and praise be to Him',
    transliteration: 'Subhan Allah wa bihamdihi',
    count: 100,
    category: 'general',
    reward: 'غرس نخلة في الجنة'
  }
];