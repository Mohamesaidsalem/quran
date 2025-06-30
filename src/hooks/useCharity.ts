import { useState, useEffect } from 'react';

export interface Donation {
  id: string;
  amount: number;
  organizationId: string;
  organizationName: string;
  projectId?: string;
  type: 'zakat' | 'sadaqah' | 'general';
  date: string;
  notes?: string;
}

export interface ZakatCalculation {
  type: 'money' | 'gold' | 'silver' | 'trade' | 'livestock' | 'crops';
  amount: number;
  zakatAmount: number;
  nisab: number;
  rate: number;
}

export interface CharityOrganization {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  website: string;
  categories: string[];
  rating: number;
  verified: boolean;
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
  endDate: string;
}

interface CharityState {
  donations: Donation[];
  totalDonated: number;
  zakatPaid: number;
}

export const useCharity = () => {
  const [charityState, setCharityState] = useState<CharityState>({
    donations: [],
    totalDonated: 0,
    zakatPaid: 0
  });

  useEffect(() => {
    loadCharityData();
  }, []);

  const loadCharityData = () => {
    const saved = localStorage.getItem('charityData');
    if (saved) {
      setCharityState(JSON.parse(saved));
    }
  };

  const saveCharityData = (data: CharityState) => {
    localStorage.setItem('charityData', JSON.stringify(data));
    setCharityState(data);
  };

  const zakatRates = {
    money: { rate: 0.025, nisab: 85 * 2000 }, // 85 جرام ذهب × سعر الجرام
    gold: { rate: 0.025, nisab: 85 * 2000 },
    silver: { rate: 0.025, nisab: 595 * 30 }, // 595 جرام فضة
    trade: { rate: 0.025, nisab: 85 * 2000 },
    livestock: { rate: 0.025, nisab: 5 },
    crops: { rate: 0.1, nisab: 653 }
  };

  const calculateZakat = (type: keyof typeof zakatRates, amount: number): ZakatCalculation => {
    const config = zakatRates[type];
    const zakatAmount = amount >= config.nisab ? amount * config.rate : 0;
    
    return {
      type,
      amount,
      zakatAmount,
      nisab: config.nisab,
      rate: config.rate
    };
  };

  const addDonation = (donation: Omit<Donation, 'id' | 'date'>) => {
    const newDonation: Donation = {
      ...donation,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };

    const newState = {
      ...charityState,
      donations: [...charityState.donations, newDonation],
      totalDonated: charityState.totalDonated + donation.amount,
      zakatPaid: donation.type === 'zakat' ? 
        charityState.zakatPaid + donation.amount : 
        charityState.zakatPaid
    };

    saveCharityData(newState);
  };

  const getMonthlyTotal = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return charityState.donations
      .filter(donation => {
        const donationDate = new Date(donation.date);
        return donationDate.getMonth() === currentMonth && 
               donationDate.getFullYear() === currentYear;
      })
      .reduce((total, donation) => total + donation.amount, 0);
  };

  const getYearlyTotal = () => {
    const currentYear = new Date().getFullYear();
    
    return charityState.donations
      .filter(donation => new Date(donation.date).getFullYear() === currentYear)
      .reduce((total, donation) => total + donation.amount, 0);
  };

  // Sample data
  const charityOrganizations: CharityOrganization[] = [
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
    },
    {
      id: 'org3',
      name: 'Water Foundation',
      arabicName: 'مؤسسة المياه الخيرية',
      description: 'متخصصة في مشاريع المياه والآبار',
      website: 'https://water-foundation.org',
      categories: ['مياه', 'آبار', 'صحة'],
      rating: 4.7,
      verified: true
    }
  ];

  const featuredProjects: CharityProject[] = [
    {
      id: 'project1',
      organizationId: 'org1',
      title: 'Water Wells Project',
      arabicTitle: 'مشروع حفر الآبار',
      description: 'حفر آبار مياه في المناطق المحتاجة لتوفير المياه النظيفة',
      targetAmount: 50000,
      currentAmount: 32000,
      category: 'مياه',
      endDate: '2024-12-31'
    },
    {
      id: 'project2',
      organizationId: 'org2',
      title: 'Orphan Sponsorship',
      arabicTitle: 'كفالة الأيتام',
      description: 'برنامج كفالة شاملة للأيتام يشمل التعليم والرعاية الصحية',
      targetAmount: 100000,
      currentAmount: 75000,
      category: 'كفالة',
      endDate: '2024-12-31'
    },
    {
      id: 'project3',
      organizationId: 'org3',
      title: 'Food Distribution',
      arabicTitle: 'توزيع الطعام',
      description: 'توزيع وجبات غذائية للأسر المحتاجة خلال شهر رمضان',
      targetAmount: 25000,
      currentAmount: 18000,
      category: 'غذاء',
      endDate: '2024-04-30'
    }
  ];

  return {
    charityState,
    calculateZakat,
    addDonation,
    getMonthlyTotal,
    getYearlyTotal,
    charityOrganizations,
    featuredProjects
  };
};