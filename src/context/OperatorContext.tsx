import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  RoadmapItem, 
  LibraryCard, 
  AuditSubmission, 
  ContentIdea, 
  TopicLogEntry, 
  BookEntry, 
  QuestionEntry, 
  WeeklyCommitment, 
  SkillLevel,
  ConsultingProduct,
  ClientPipeline,
  CaseStudy,
  ReverseEngineeringItem
} from '../types';
import { ROADMAP_DATA, INITIAL_LIBRARY, CONSULTING_PACKAGES } from '../constants';

interface OperatorStore {
  roadmap: RoadmapItem[];
  library: LibraryCard[];
  audits: AuditSubmission[];
  contentIdeas: ContentIdea[];
  topicLogs: TopicLogEntry[];
  books: BookEntry[];
  questions: QuestionEntry[];
  weeklyCommitment: WeeklyCommitment;
  skillLevels: SkillLevel[];
  products: ConsultingProduct[];
  clients: ClientPipeline[];
  cases: CaseStudy[];
  reverseItems: ReverseEngineeringItem[];
  
  // Actions
  updateRoadmap: (id: string, updates: Partial<RoadmapItem>) => void;
  toggleLibraryBookmark: (id: string) => void;
  addAudit: (audit: AuditSubmission) => void;
  addContentIdea: (idea: ContentIdea) => void;
  updateContentIdea: (id: string, updates: Partial<ContentIdea>) => void;
  addTopicLog: (log: TopicLogEntry) => void;
  addBook: (book: BookEntry) => void;
  addQuestion: (q: QuestionEntry) => void;
  updateQuestion: (id: string, updates: Partial<QuestionEntry>) => void;
  updateSkill: (skill: SkillLevel['skill'], level: number) => void;
  updateProduct: (id: string, updates: Partial<ConsultingProduct>) => void;
  addClient: (client: ClientPipeline) => void;
  updateClient: (id: string, updates: Partial<ClientPipeline>) => void;
  addCase: (caseItem: CaseStudy) => void;
  updateCase: (id: string, updates: Partial<CaseStudy>) => void;
  addReverseItem: (item: ReverseEngineeringItem) => void;
  resetData: () => void;
}

const OperatorContext = createContext<OperatorStore | undefined>(undefined);

const STORAGE_KEY = 'growth_lab_operator_data_v1';

export const OperatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    
    return {
      roadmap: ROADMAP_DATA,
      library: INITIAL_LIBRARY,
      audits: [],
      contentIdeas: [],
      topicLogs: [],
      books: [],
      questions: [],
      weeklyCommitment: { hoursStudied: 0, contentCreatedCount: 0, insightsCaptured: 0 },
      skillLevels: [
        { skill: 'Funnel Strategy', level: 1 },
        { skill: 'CRM', level: 1 },
        { skill: 'Sales', level: 1 },
        { skill: 'Content', level: 1 },
        { skill: 'Analytics', level: 1 },
        { skill: 'Psychology', level: 1 },
        { skill: 'Consulting', level: 1 },
        { skill: 'Ads', level: 1 },
        { skill: 'Retention', level: 1 },
      ],
      products: CONSULTING_PACKAGES,
      clients: [],
      cases: [],
      reverseItems: []
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateState = (key: string, value: any) => {
    setData((prev: any) => ({ ...prev, [key]: value }));
  };

  const store: OperatorStore = {
    ...data,
    updateRoadmap: (id, updates) => {
      updateState('roadmap', data.roadmap.map((item: any) => item.id === id ? { ...item, ...updates } : item));
    },
    toggleLibraryBookmark: (id) => {
      updateState('library', data.library.map((item: any) => item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item));
    },
    addAudit: (audit) => updateState('audits', [audit, ...data.audits]),
    addContentIdea: (idea) => updateState('contentIdeas', [idea, ...data.contentIdeas]),
    updateContentIdea: (id, updates) => {
      updateState('contentIdeas', data.contentIdeas.map((item: any) => item.id === id ? { ...item, ...updates } : item));
    },
    addTopicLog: (log) => {
      setData((prev: any) => ({
        ...prev,
        topicLogs: [log, ...prev.topicLogs],
        weeklyCommitment: {
          ...prev.weeklyCommitment,
          insightsCaptured: prev.weeklyCommitment.insightsCaptured + 1
        }
      }));
    },
    addBook: (book) => updateState('books', [book, ...data.books]),
    addQuestion: (q) => updateState('questions', [q, ...data.questions]),
    updateQuestion: (id, updates) => {
      updateState('questions', data.questions.map((item: any) => item.id === id ? { ...item, ...updates } : item));
    },
    updateSkill: (skill, level) => {
      updateState('skillLevels', data.skillLevels.map((s: any) => s.skill === skill ? { ...s, level } : s));
    },
    updateProduct: (id, updates) => {
      updateState('products', data.products.map((p: any) => p.id === id ? { ...p, ...updates } : p));
    },
    addClient: (client) => updateState('clients', [client, ...data.clients]),
    updateClient: (id, updates) => {
      updateState('clients', data.clients.map((c: any) => c.id === id ? { ...c, ...updates } : c));
    },
    addCase: (caseItem) => updateState('cases', [caseItem, ...data.cases]),
    updateCase: (id, updates) => {
      updateState('cases', data.cases.map((c: any) => c.id === id ? { ...c, ...updates } : c));
    },
    addReverseItem: (item) => updateState('reverseItems', [item, ...data.reverseItems]),
    resetData: () => {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  return <OperatorContext.Provider value={store}>{children}</OperatorContext.Provider>;
};

export const useOperator = () => {
  const context = useContext(OperatorContext);
  if (!context) throw new Error('useOperator must be used within OperatorProvider');
  return context;
};
