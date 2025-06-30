// بيانات التعليم الإسلامي
export interface QuranLesson {
  id: string;
  title: string;
  arabicTitle: string;
  surahNumber: number;
  verseRange: { start: number; end: number };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // بالدقائق
  topics: string[];
  objectives: string[];
  audioUrl?: string;
  videoUrl?: string;
}

export interface TajweedRule {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  examples: {
    arabic: string;
    explanation: string;
  }[];
  audioExample?: string;
}

export interface ProphetStory {
  id: string;
  prophetName: string;
  arabicName: string;
  title: string;
  arabicTitle: string;
  summary: string;
  fullStory: string;
  lessons: string[];
  verses: {
    arabic: string;
    translation: string;
    reference: string;
  }[];
  imageUrl?: string;
}

export interface Hadith {
  id: string;
  arabic: string;
  translation: string;
  narrator: string;
  source: string;
  grade: 'sahih' | 'hasan' | 'daif';
  category: string;
  explanation: string;
  keywords: string[];
}

// دروس التجويد
export const tajweedRules: TajweedRule[] = [
  {
    id: 'rule1',
    name: 'Noon Sakinah and Tanween',
    arabicName: 'النون الساكنة والتنوين',
    description: 'أحكام النون الساكنة والتنوين أربعة: الإظهار، الإدغام، الإقلاب، الإخفاء',
    examples: [
      {
        arabic: 'مِنْ بَعْدِ',
        explanation: 'إظهار النون الساكنة عند حروف الحلق'
      },
      {
        arabic: 'مِنْ مَاءٍ',
        explanation: 'إدغام النون الساكنة في الميم'
      }
    ]
  },
  {
    id: 'rule2',
    name: 'Meem Sakinah',
    arabicName: 'الميم الساكنة',
    description: 'للميم الساكنة ثلاثة أحكام: الإخفاء الشفوي، الإدغام المثلين، الإظهار الشفوي',
    examples: [
      {
        arabic: 'هُمْ بِهِ',
        explanation: 'إخفاء الميم الساكنة عند الباء'
      }
    ]
  }
];

// قصص الأنبياء
export const prophetStories: ProphetStory[] = [
  {
    id: 'adam',
    prophetName: 'Adam',
    arabicName: 'آدم عليه السلام',
    title: 'The First Human',
    arabicTitle: 'أبو البشر',
    summary: 'قصة خلق آدم عليه السلام وبداية البشرية',
    fullStory: 'خلق الله تعالى آدم عليه السلام من تراب، ونفخ فيه من روحه، وعلمه الأسماء كلها...',
    lessons: [
      'كرامة الإنسان عند الله',
      'أهمية التوبة والاستغفار',
      'خطر الشيطان وعداوته للإنسان'
    ],
    verses: [
      {
        arabic: 'وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا',
        translation: 'And He taught Adam the names - all of them',
        reference: 'البقرة: 31'
      }
    ]
  }
];

// الأحاديث النبوية
export const hadithCollection: Hadith[] = [
  {
    id: 'hadith1',
    arabic: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    translation: 'Actions are but by intention and every man shall have only that which he intended',
    narrator: 'عمر بن الخطاب',
    source: 'صحيح البخاري',
    grade: 'sahih',
    category: 'النية والإخلاص',
    explanation: 'هذا الحديث أصل عظيم في الإسلام، يبين أن صحة العمل وفساده بحسب النية',
    keywords: ['النية', 'الإخلاص', 'العمل']
  }
];