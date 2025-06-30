// بيانات الصدقة والزكاة
export interface CharityOrganization {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  website: string;
  categories: string[];
  rating: number;
  verified: boolean;
  logo?: string;
}

export interface CharityProject {
  id: string;
  organizationId: string;
  title: string;
  arabicTitle: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  imageUrl?: string;
  endDate: string;
}

export interface ZakatCalculation {
  type: 'money' | 'gold' | 'silver' | 'trade' | 'livestock' | 'crops';
  amount: number;
  zakatAmount: number;
  nisab: number;
  rate: number;
}

// الجمعيات الخيرية
export const charityOrganizations: CharityOrganization[] = [
  {
    id: 'org1',
    name: 'Islamic Relief',
    arabicName: 'الإغاثة الإسلامية',
    description: 'منظمة خيرية دولية تعمل في مجال الإغاثة والتنمية',
    website: 'https://islamic-relief.org',
    categories: ['إغاثة', 'تعليم', 'صحة', 'مياه'],
    rating: 4.8,
    verified: true
  },
  {
    id: 'org2',
    name: 'Local Charity',
    arabicName: 'الجمعية الخيرية المحلية',
    description: 'جمعية خيرية محلية تخدم المجتمع',
    website: 'https://local-charity.org',
    categories: ['كفالة أيتام', 'مساعدات غذائية', 'علاج'],
    rating: 4.5,
    verified: true
  }
];

// مشاريع خيرية
export const charityProjects: CharityProject[] = [
  {
    id: 'project1',
    organizationId: 'org1',
    title: 'Water Wells Project',
    arabicTitle: 'مشروع حفر الآبار',
    description: 'حفر آبار مياه في المناطق المحتاجة',
    targetAmount: 50000,
    currentAmount: 32000,
    category: 'مياه',
    endDate: '2024-12-31'
  }
];

// حاسبة الزكاة
export const zakatRates = {
  money: { rate: 0.025, nisab: 85 }, // 85 جرام ذهب
  gold: { rate: 0.025, nisab: 85 },
  silver: { rate: 0.025, nisab: 595 },
  trade: { rate: 0.025, nisab: 85 },
  livestock: { rate: 0.025, nisab: 5 }, // للإبل
  crops: { rate: 0.1, nisab: 653 } // 653 كيلو
};