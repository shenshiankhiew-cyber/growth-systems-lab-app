
export type Category = 
  | 'Business fundamentals' 
  | 'Marketing funnel' 
  | 'Sales funnel' 
  | 'Account management' 
  | 'CRM and lifecycle' 
  | 'Psychology and behavior' 
  | 'CRO' 
  | 'Paid ads' 
  | 'SEO/SEM' 
  | 'Content strategy' 
  | 'Retention and LTV' 
  | 'Product growth' 
  | 'Growth operations' 
  | 'Ethical marketing'
  | 'Consulting';

export type SkillType = 
  | 'Funnel Strategy' 
  | 'CRM' 
  | 'Sales' 
  | 'Content' 
  | 'Analytics' 
  | 'Psychology' 
  | 'Consulting'
  | 'Ads'
  | 'Retention';

export interface SkillLevel {
  skill: SkillType;
  level: number; // 1-10
}

export interface RoadmapItem {
  id: string;
  period: '1-6' | '6-12' | '12-18' | '18-24';
  title: string;
  what: string;
  why: string;
  concepts: string[];
  exercises: string[];
  resources: string[];
  contentIdeas: string[];
  completed?: boolean;
  mentorNote?: string;
}

export interface LibraryCard {
  id: string;
  category: Category;
  title: string;
  explanation: string;
  example: string;
  application: string;
  contentAngle: string;
  consultingUseCase: string;
  isBookmarked?: boolean;
  lastViewedAt?: string;
}

export interface AuditLeak {
  id: string;
  issue: string;
  priority: 'Critical' | 'High' | 'Medium';
  fix: string;
}

export interface AuditSubmission {
  id: string;
  date: string;
  offer: string;
  audience: string;
  leadSources: string;
  postSubmission: string;
  responseTime: string;
  qualification: string;
  salesProcess: string;
  conversionRate: string;
  postPurchase: string;
  dropOffPoints: string;
  healthScore?: number; // 0-100
  leaks?: AuditLeak[];
  quickWins?: string[];
  contentIdeas?: string[];
  consultingOpportunity?: string;
}

export interface ContentIdea {
  id: string;
  title: string;
  pillar: string;
  hook: string;
  mainPoint: string;
  breakdown: string;
  example: string;
  cta: string;
  platforms: string[];
  languages: ('English' | 'Mandarin')[];
  isDraft?: boolean;
  templateType?: 'LinkedIn Post' | 'Instagram Carousel' | 'Short Video Script' | 'Educational Thread' | 'Case Study Post';
}

export interface TopicLogEntry {
  id: string;
  date: string;
  topic: string;
  source: string;
  insight: string;
  application: string;
  contentIdea: string;
  consultingIdea: string;
}

export interface BookEntry {
  id: string;
  title: string;
  author: string;
  lessons: string;
  rating: number;
}

export interface QuestionEntry {
  id: string;
  question: string;
  answer: string;
  solved: boolean;
}

export interface WeeklyCommitment {
  hoursStudied: number;
  contentCreatedCount: number;
  insightsCaptured: number;
}

export interface ConsultingProduct {
  id: string;
  name: string;
  problem: string;
  audience: string;
  deliverables: string[];
  process: string[];
  priceRange: string;
  questionnaire: string[];
  reportStructure: string;
  revenueTarget?: number;
  revenueActual?: number;
}

export type ClientStatus = 'Prospect' | 'Contacted' | 'Proposal Sent' | 'Closed' | 'Lost';

export interface ClientPipeline {
  id: string;
  name: string;
  problem: string;
  budget: string;
  status: ClientStatus;
  notes: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  lessons: string;
  impactTags: ('Revenue' | 'Retention' | 'Conversion' | 'Brand' | 'Efficiency')[];
  isDraft?: boolean;
}

export type ReverseCategory = 
  | 'Ads' | 'Landing Pages' | 'Funnels' | 'Emails' | 'Apps' | 'Ecommerce' | 'Recruitment' | 'Gaming';

export interface ReverseEngineeringItem {
  id: string;
  category: ReverseCategory;
  title: string;
  url?: string;
  imageUrl?: string;
  scores: {
    offerClarity: number; // 1-10
    friction: number; // 1-10
  };
  attention: string;
  emotion: string;
  trustSignal: string;
  offer: string;
  friction: string;
  improvement: string;
  learning: string;
  patterns: ('Urgency' | 'Social Proof' | 'Scarcity' | 'Authority' | 'Curiosity' | 'Loss Aversion')[];
}
