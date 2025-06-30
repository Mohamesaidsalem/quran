// Sample Quran data - In production, this would come from a comprehensive API
export interface Verse {
  number: number;
  arabic: string;
  translation: string;
  transliteration: string;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfVerses: number;
  verses: Verse[];
}

export const sampleSurahs: Surah[] = [
  {
    number: 1,
    name: 'الفاتحة',
    englishName: 'Al-Fatihah',
    revelationType: 'Meccan',
    numberOfVerses: 7,
    verses: [
      {
        number: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        transliteration: 'Bismillahir-Rahmanir-Raheem'
      },
      {
        number: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        translation: '[All] praise is [due] to Allah, Lord of the worlds -',
        transliteration: 'Alhamdu lillahi rabbil-alameen'
      },
      {
        number: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        translation: 'The Entirely Merciful, the Especially Merciful,',
        transliteration: 'Ar-Rahmanir-Raheem'
      },
      {
        number: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        translation: 'Sovereign of the Day of Recompense.',
        transliteration: 'Maliki yawmid-deen'
      },
      {
        number: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        translation: 'It is You we worship and You we ask for help.',
        transliteration: 'Iyyaka na\'budu wa iyyaka nasta\'een'
      },
      {
        number: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        translation: 'Guide us to the straight path -',
        transliteration: 'Ihdinaṣ-ṣiraṭal-mustaqeem'
      },
      {
        number: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
        transliteration: 'Ṣiraṭ alladhina an\'amta \'alayhim ghayril-maghḍubi \'alayhim wa laḍ-ḍalleen'
      }
    ]
  },
  {
    number: 2,
    name: 'البقرة',
    englishName: 'Al-Baqarah',
    revelationType: 'Medinan',
    numberOfVerses: 286,
    verses: [
      {
        number: 1,
        arabic: 'الم',
        translation: 'Alif, Lam, Meem.',
        transliteration: 'Alif-Lam-Meem'
      },
      {
        number: 2,
        arabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
        translation: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah -',
        transliteration: 'Dhalika al-kitabu la rayba feehi hudan lil-muttaqeen'
      }
    ]
  }
];

export const reciters = [
  { id: 'mishary', name: 'مشاري العفاسي', englishName: 'Mishary Alafasy' },
  { id: 'sudais', name: 'عبد الرحمن السديس', englishName: 'Abdul Rahman Al-Sudais' },
  { id: 'shuraim', name: 'سعود الشريم', englishName: 'Saud Al-Shuraim' },
  { id: 'husary', name: 'محمود خليل الحصري', englishName: 'Mahmoud Khalil Al-Husary' }
];