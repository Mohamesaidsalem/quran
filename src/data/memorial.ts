// بيانات الأدعية والورد للمتوفين
export interface DeceasedPerson {
  id: string;
  name: string;
  relationship: string;
  dateOfDeath: string;
  photoUrl?: string;
  favoriteSupplications: string[];
  customReminders: ReminderSchedule[];
}

export interface ReminderSchedule {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'anniversary';
  time: string;
  days?: number[]; // للتذكير الأسبوعي (0 = الأحد)
  date?: number; // للتذكير الشهري
  isActive: boolean;
}

export interface Supplication {
  id: string;
  arabic: string;
  translation: string;
  transliteration: string;
  category: 'general' | 'quran' | 'hadith' | 'personal';
  reward: string;
  source?: string;
}

// الأدعية للمتوفين
export const memorialSupplications: Supplication[] = [
  {
    id: 'dua1',
    arabic: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مُدْخَلَهُ وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ',
    translation: 'O Allah, forgive him, have mercy on him, grant him strength, and pardon him. Be generous to him, cause his entrance to be wide and wash him with water, snow and hail.',
    transliteration: 'Allahumma-ghfir lahu warhamhu wa \'afihi wa\'fu \'anhu wa akrim nuzulahu wa wassi\' mudkhalahu waghsilhu bil-ma\'i wath-thalji wal-barad',
    category: 'hadith',
    reward: 'دعاء شامل للميت من السنة النبوية',
    source: 'صحيح مسلم'
  },
  {
    id: 'dua2',
    arabic: 'اللَّهُمَّ أَنْتَ رَبُّهَا وَأَنْتَ خَلَقْتَهَا وَأَنْتَ هَدَيْتَهَا لِلْإِسْلَامِ وَأَنْتَ قَبَضْتَ رُوحَهَا وَأَنْتَ أَعْلَمُ بِسِرِّهَا وَعَلَانِيَتِهَا',
    translation: 'O Allah, You are her Lord, You created her, You guided her to Islam, You took her soul, and You know best her secrets and what she did openly.',
    transliteration: 'Allahumma anta rabbuha wa anta khalaqtaha wa anta hadaytaha lil-Islam wa anta qabadta ruhaha wa anta a\'lamu bi sirriha wa \'alaniyatiha',
    category: 'hadith',
    reward: 'دعاء عند دفن الميت',
    source: 'سنن أبي داود'
  },
  {
    id: 'dua3',
    arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا',
    translation: 'Our Lord, forgive us and our brothers who preceded us in faith and put not in our hearts [any] resentment toward those who have believed.',
    transliteration: 'Rabbana-ghfir lana wa li-ikhwanina alladhina sabaquna bil-iman wa la taj\'al fi qulubina ghillan lilladhina amanu',
    category: 'quran',
    reward: 'دعاء قرآني للمؤمنين الأموات',
    source: 'سورة الحشر آية 10'
  },
  {
    id: 'dua4',
    arabic: 'اللَّهُمَّ اجْعَلْهُ فِي الْفِرْدَوْسِ الْأَعْلَى مِنَ الْجَنَّةِ وَاجْعَلْ قَبْرَهُ رَوْضَةً مِنْ رِيَاضِ الْجَنَّةِ',
    translation: 'O Allah, place him in the highest level of Paradise and make his grave a garden from the gardens of Paradise.',
    transliteration: 'Allahumma-j\'alhu fil-firdawsil-a\'la minal-jannah waj\'al qabrahu rawdatan min riyadil-jannah',
    category: 'general',
    reward: 'دعاء لرفع درجة الميت في الجنة'
  },
  {
    id: 'dua5',
    arabic: 'اللَّهُمَّ أَنْزِلْ عَلَى قَبْرِهِ الضِّيَاءَ وَالنُّورَ وَالْفُسْحَةَ وَالسُّرُورَ',
    translation: 'O Allah, send down upon his grave light, illumination, spaciousness and joy.',
    transliteration: 'Allahumma anzil \'ala qabrihi ad-diya\'a wan-nura wal-fuschata was-surur',
    category: 'general',
    reward: 'دعاء لإنارة قبر الميت وتوسيعه'
  },
  {
    id: 'dua6',
    arabic: 'اللَّهُمَّ بَلِّغْهُ مِنَّا السَّلَامَ وَاجْعَلْ مَا نَقُولُ وَمَا نَدْعُو بِهِ زَادًا لَهُ إِلَى يَوْمِ نَلْقَاهُ',
    translation: 'O Allah, convey our greetings to him and make what we say and pray for provisions for him until the day we meet him.',
    transliteration: 'Allahumma ballighhu minnas-salama waj\'al ma naqulu wa ma nad\'u bihi zadan lahu ila yawmi nalqahu',
    category: 'general',
    reward: 'دعاء لإيصال الثواب للميت'
  }
];

// أذكار وتسابيح مفيدة للميت
export const beneficialDhikr = [
  {
    id: 'dhikr1',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    translation: 'There is no god but Allah',
    transliteration: 'La ilaha illa Allah',
    count: 100,
    reward: 'كل تهليلة تصل للميت كحسنة'
  },
  {
    id: 'dhikr2',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    translation: 'Glory be to Allah and praise be to Him',
    transliteration: 'Subhan Allah wa bihamdihi',
    count: 100,
    reward: 'تسبيح يصل ثوابه للميت'
  },
  {
    id: 'dhikr3',
    arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
    translation: 'O Allah, send prayers and peace upon our Prophet Muhammad',
    transliteration: 'Allahumma salli wa sallim \'ala nabiyyina Muhammad',
    count: 10,
    reward: 'الصلاة على النبي تنفع الميت'
  }
];

// قراءات قرآنية مستحبة للميت
export const beneficialSurahs = [
  {
    name: 'الفاتحة',
    arabicName: 'سورة الفاتحة',
    number: 1,
    reward: 'ثوابها يصل للميت كاملاً',
    recommended: true
  },
  {
    name: 'البقرة',
    arabicName: 'سورة البقرة',
    number: 2,
    reward: 'حماية وبركة للميت',
    recommended: true
  },
  {
    name: 'يس',
    arabicName: 'سورة يس',
    number: 36,
    reward: 'تخفف عن الميت وترفع درجته',
    recommended: true
  },
  {
    name: 'الملك',
    arabicName: 'سورة الملك',
    number: 67,
    reward: 'تشفع للميت في القبر',
    recommended: true
  }
];