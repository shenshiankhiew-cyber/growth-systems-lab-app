import { RoadmapItem, LibraryCard, ConsultingProduct } from './types';

export const ROADMAP_DATA: RoadmapItem[] = [
  {
    id: 'm1-6',
    period: '1-6',
    title: 'Foundations & Systems Thinking',
    what: 'Master the core principles of how businesses actually work and how to think in systems.',
    why: 'Without systems thinking, you only see tactics. With it, you see the entire machine.',
    concepts: ['Feedback loops', 'Leverage points', 'Unit economics', 'Mental models'],
    exercises: ['Map your current company as a system', 'Calculate LTV:CAC for a known SaaS'],
    resources: ['Thinking in Systems by Donella Meadows', 'The Personal MBA'],
    contentIdeas: ['Complexity vs Simplicity in Growth', 'Why tactics fail without strategy']
  },
  {
    id: 'm6-12',
    period: '6-12',
    title: 'Operations & Lifecycle',
    what: 'Understand CRM, sales funnels, and the transition from lead to customer.',
    why: 'Growth happens in the "middle of the funnel" where most marketers stop looking.',
    concepts: ['Lead scoring', 'Sales-Marketing alignment', 'CRM architecture', 'Drip sequences'],
    exercises: ['Audit a 7-day email sequence', 'Build a lead qualification framework'],
    resources: ['HubSpot Academy', 'Predictable Revenue'],
    contentIdeas: ['The hidden cost of slow lead response', 'CRM is not just a database']
  },
  {
    id: 'm12-18',
    period: '12-18',
    title: 'Strategy & Retention',
    what: 'Deep dive into retention, pricing, and competitive advantage.',
    why: 'Acquisition is expensive. Retention is where profit is made.',
    concepts: ['Cohort analysis', 'Churn reduction', 'Value-based pricing', 'Moats'],
    exercises: ['Perform a cohort analysis on sample data', 'Redesign a pricing page'],
    resources: ['Reforge', 'Growth IQ'],
    contentIdeas: ['Why 5% increase in retention can double profit', 'Pricing as a growth lever']
  },
  {
    id: 'm18-24',
    period: '18-24',
    title: 'Advisory & Operating Systems',
    what: 'Learn to consult, build business operating systems, and finance growth.',
    why: 'Transition from operator to architect. High-level advisory requires finance and OS knowledge.',
    concepts: ['Fractional CMO/COO models', 'P&L management', 'Scaling teams', 'EOS'],
    exercises: ['Draft a growth audit proposal', 'Build a 12-month budget forecast'],
    resources: ['Traction by Gino Wickman', 'The Business of Expertise'],
    contentIdeas: ['From performance marketer to growth strategist', 'Operating systems for 7-figure businesses']
  }
];

export const INITIAL_LIBRARY: LibraryCard[] = [
  {
    id: 'lib-1',
    category: 'Business fundamentals',
    title: 'Unit Economics (LTV vs CAC)',
    explanation: 'The relationship between how much it costs to acquire a customer and how much they are worth over time.',
    example: 'A gym spends $100 on ads to get 1 member. Member stays 10 months @ $50/mo. LTV = $500. CAC = $100. Ratio = 5:1.',
    application: 'Determine if a marketing channel is sustainable or burning cash.',
    contentAngle: 'The metric that kills most startups (it is not total revenue).',
    consultingUseCase: 'Auditing marketing spend to find "leaky buckets".'
  },
  {
    id: 'lib-2',
    category: 'Psychology and behavior',
    title: 'Loss Aversion',
    explanation: 'People are more motivated to avoid a loss than to achieve an equivalent gain.',
    example: '"Save $50/month" vs "Stop losing $50/month because of inefficient software".',
    application: 'Rewrite landing page headlines to focus on the cost of inaction.',
    contentAngle: 'Why your "benefit-driven" copy is actually ignoring human biology.',
    consultingUseCase: 'Optimizing high-ticket sales scripts to highlight the risk of staying the same.'
  },
  {
    id: 'lib-3',
    category: 'Retention and LTV',
    title: 'Cohort Analysis',
    explanation: 'Grouping users by their start date to track how their behavior (usually retention) changes over time.',
    example: 'Users who joined in Jan have a 40% month-3 retention, while Feb has only 25%. What changed?',
    application: 'Identify if product updates or marketing channel shifts are improving or hurting long-term value.',
    contentAngle: 'Revenue is a vanity metric. Cohort retention is the truth.',
    consultingUseCase: 'Fixing "churn" by identifying exactly which week/month users lose interest.'
  },
  {
    id: 'lib-4',
    category: 'CRM and lifecycle',
    title: 'The Linear Onboarding Loop',
    explanation: 'The process of reducing time-to-value (TTV) by guiding users to their first "Aha!" moment as fast as possible.',
    example: 'Canva letting you design a 5-minute poster before even asking for a full profile setup.',
    application: 'Design onboarding flows to be "outcome-first" rather than "profile-first".',
    contentAngle: 'Why your signup form is killing your business.',
    consultingUseCase: 'Redesigning SaaS onboarding to double activation rates.'
  },
  {
    id: 'lib-5',
    category: 'Marketing funnel',
    title: 'The TOFU / MOFU / BOFU System',
    explanation: 'Segmenting content and strategy based on the customer awareness stage (Top, Middle, Bottom of Funnel).',
    example: 'TOFU: Educational blog. MOFU: Comparison guide. BOFU: Demo/Case Study.',
    application: 'Ensure you aren\'t asking for a "marriage" (sale) on the first "date" (click).',
    contentAngle: 'The error of selling too early.',
    consultingUseCase: 'Mapping missing content assets in a client funnel.'
  }
];

export const CONSULTING_PACKAGES: ConsultingProduct[] = [
  {
    id: 'prod-1',
    name: 'Growth Systems Audit',
    problem: 'Business is growing but feels chaotic/inefficient.',
    audience: 'Founders with $1M-$5M ARR',
    deliverables: ['Full funnel map', 'Identification of 3 major bottlenecks', 'Quick-win implementation plan'],
    process: ['1hr discovery call', 'Data access & audit', 'Final presentation'],
    priceRange: 'RM2,000 - RM5,000',
    questionnaire: ['What is your current CAC?', 'Where is the biggest drop-off?'],
    reportStructure: 'Executive Summary -> System Analysis -> Recommendations -> Timeline'
  }
];
