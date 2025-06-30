// بيانات المساجد والأماكن الدينية
export interface Mosque {
  id: string;
  name: string;
  arabicName: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number;
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  features: string[];
  rating: number;
  reviews: Review[];
  imam: string;
  phone?: string;
  website?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// مساجد تجريبية (في التطبيق الحقيقي ستأتي من API)
export const sampleMosques: Mosque[] = [
  {
    id: 'mosque1',
    name: 'Grand Mosque',
    arabicName: 'المسجد الكبير',
    address: 'شارع الملك فهد، الرياض',
    latitude: 24.7136,
    longitude: 46.6753,
    prayerTimes: {
      fajr: '05:30',
      dhuhr: '12:30',
      asr: '15:45',
      maghrib: '18:15',
      isha: '19:45'
    },
    features: ['مكيف', 'مواقف سيارات', 'مكتبة', 'دروس دينية'],
    rating: 4.8,
    reviews: [
      {
        id: 'review1',
        userName: 'أحمد محمد',
        rating: 5,
        comment: 'مسجد جميل ونظيف، الإمام صوته رائع',
        date: '2024-01-15'
      }
    ],
    imam: 'الشيخ محمد العثيمين',
    phone: '+966123456789'
  },
  {
    id: 'mosque2',
    name: 'Al-Noor Mosque',
    arabicName: 'مسجد النور',
    address: 'حي الملز، الرياض',
    latitude: 24.6877,
    longitude: 46.7219,
    prayerTimes: {
      fajr: '05:32',
      dhuhr: '12:32',
      asr: '15:47',
      maghrib: '18:17',
      isha: '19:47'
    },
    features: ['مكيف', 'مصلى نساء', 'دروس تحفيظ'],
    rating: 4.6,
    reviews: [],
    imam: 'الشيخ عبدالله السديس'
  }
];