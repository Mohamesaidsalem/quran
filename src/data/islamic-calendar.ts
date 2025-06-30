// التقويم الإسلامي والمناسبات
export interface IslamicEvent {
  id: string;
  name: string;
  arabicName: string;
  hijriMonth: number;
  hijriDay: number;
  type: 'eid' | 'holy' | 'recommended' | 'historical';
  description: string;
  recommendations: string[];
}

export interface HijriDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  weekDay: string;
}

export const hijriMonths = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة',
  'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
];

export const islamicEvents: IslamicEvent[] = [
  {
    id: 'muharram1',
    name: 'Islamic New Year',
    arabicName: 'رأس السنة الهجرية',
    hijriMonth: 1,
    hijriDay: 1,
    type: 'holy',
    description: 'بداية السنة الهجرية الجديدة',
    recommendations: ['الدعاء', 'التوبة', 'العزم على الخير']
  },
  {
    id: 'ashura',
    name: 'Day of Ashura',
    arabicName: 'يوم عاشوراء',
    hijriMonth: 1,
    hijriDay: 10,
    type: 'recommended',
    description: 'يوم صيام مستحب',
    recommendations: ['الصيام', 'الدعاء', 'الصدقة']
  },
  {
    id: 'mawlid',
    name: 'Prophet\'s Birthday',
    arabicName: 'المولد النبوي',
    hijriMonth: 3,
    hijriDay: 12,
    type: 'historical',
    description: 'ذكرى مولد النبي محمد ﷺ',
    recommendations: ['الصلاة على النبي', 'قراءة السيرة', 'الأعمال الخيرية']
  },
  {
    id: 'isra',
    name: 'Isra and Mi\'raj',
    arabicName: 'الإسراء والمعراج',
    hijriMonth: 7,
    hijriDay: 27,
    type: 'holy',
    description: 'ذكرى رحلة الإسراء والمعراج',
    recommendations: ['قيام الليل', 'الدعاء', 'قراءة القرآن']
  },
  {
    id: 'ramadan',
    name: 'Ramadan',
    arabicName: 'شهر رمضان',
    hijriMonth: 9,
    hijriDay: 1,
    type: 'holy',
    description: 'شهر الصيام والقرآن',
    recommendations: ['الصيام', 'قيام الليل', 'قراءة القرآن', 'الصدقة']
  },
  {
    id: 'eid-fitr',
    name: 'Eid al-Fitr',
    arabicName: 'عيد الفطر',
    hijriMonth: 10,
    hijriDay: 1,
    type: 'eid',
    description: 'عيد الفطر المبارك',
    recommendations: ['صلاة العيد', 'زكاة الفطر', 'التهنئة', 'الفرح']
  },
  {
    id: 'hajj',
    name: 'Hajj Season',
    arabicName: 'موسم الحج',
    hijriMonth: 12,
    hijriDay: 8,
    type: 'holy',
    description: 'موسم الحج المبارك',
    recommendations: ['الحج لمن استطاع', 'الدعاء', 'الصيام', 'الذكر']
  },
  {
    id: 'eid-adha',
    name: 'Eid al-Adha',
    arabicName: 'عيد الأضحى',
    hijriMonth: 12,
    hijriDay: 10,
    type: 'eid',
    description: 'عيد الأضحى المبارك',
    recommendations: ['صلاة العيد', 'الأضحية', 'التكبير', 'الفرح']
  }
];

// أيام الصيام المستحبة
export const recommendedFastingDays = [
  { type: 'weekly', days: [1, 4], description: 'الاثنين والخميس' },
  { type: 'monthly', days: [13, 14, 15], description: 'الأيام البيض' },
  { type: 'special', month: 1, days: [9, 10], description: 'تاسوعاء وعاشوراء' },
  { type: 'special', month: 12, days: [1, 2, 3, 4, 5, 6, 7, 8, 9], description: 'العشر الأوائل من ذي الحجة' }
];