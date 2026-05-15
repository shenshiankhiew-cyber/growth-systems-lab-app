import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Target, 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  Star,
  Users,
  Layers,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Info,
  ChevronRight
} from 'lucide-react';
import { useOperator } from '../../context/OperatorContext';

export const DashboardView: React.FC = () => {
  const { 
    roadmap, 
    audits, 
    cases, 
    skillLevels, 
    weeklyCommitment,
    questions,
  } = useOperator();

  const [showWelcome, setShowWelcome] = React.useState(() => {
    return localStorage.getItem('growth_lab_welcome_dismissed') !== 'true';
  });

  const [completedSteps, setCompletedSteps] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('growth_lab_quickstart_steps');
    return saved ? JSON.parse(saved) : [];
  });

  const dismissWelcome = () => {
    localStorage.setItem('growth_lab_welcome_dismissed', 'true');
    setShowWelcome(false);
  };

  const toggleStep = (stepId: string) => {
    const newSteps = completedSteps.includes(stepId) 
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId];
    setCompletedSteps(newSteps);
    localStorage.setItem('growth_lab_quickstart_steps', JSON.stringify(newSteps));
  };

  // Growth Score Calculation
  const topicsCompleted = roadmap.filter(i => i.completed).length;
  const growthScore = Math.min(100, Math.round(
    (topicsCompleted / roadmap.length) * 40 + 
    (cases.length / 10) * 30 + 
    (audits.length / 10) * 30
  ));

  // Priorities Calculation
  const activeRoadmapItem = roadmap.find(i => !i.completed) || roadmap[roadmap.length - 1];
  const lastAudit = audits[0];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <header>
        <h1 className="text-2xl font-bold text-[#f0f0f0] tracking-tight">Operator Dashboard</h1>
        <p className="text-[13px] text-[#a0a0a0] mt-1">Growth Systems & Operation Mastery Sequence — Welcome back, Operator.</p>
      </header>

      {/* Welcome Banner */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#1a1a1a] border border-blue-500/30 p-6 rounded-sm relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <div className="flex gap-4 items-start pr-8">
              <div className="p-2 bg-blue-500/10 rounded-sm text-blue-400 shrink-0">
                <Info size={18} />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Welcome to Growth Systems Lab</h3>
                <p className="text-[13px] text-[#b0b0b0] leading-relaxed">
                  Your personal growth operator command center. Start with the <span className="text-white font-medium">Roadmap</span> to set your learning path, 
                  then use <span className="text-white font-medium">Funnel Audit</span> with a real client, and build your first <span className="text-white font-medium">Case Study</span>. 
                  All data saves automatically in your browser.
                </p>
                <button 
                  onClick={dismissWelcome}
                  className="mt-2 text-[11px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  Got it <ChevronRight size={14} />
                </button>
              </div>
            </div>
            <button 
              onClick={dismissWelcome}
              className="absolute top-4 right-4 text-[#6e6e6e] hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Growth Score Arc Card */}
        <div className="card-container p-6 relative overflow-hidden group flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.08]" />
          <h2 className="label-sm mb-6">Growth Score</h2>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="58" fill="none" stroke="#2a2a2a" strokeWidth="4" />
              <motion.circle 
                cx="64" cy="64" r="58" fill="none" stroke="white" strokeWidth="4" 
                strokeDasharray={2 * Math.PI * 58}
                initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 58 * (1 - growthScore / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white font-mono tracking-tighter">{growthScore}</span>
              <span className="text-[10px] text-[#6e6e6e] font-bold tracking-[0.2em] uppercase mt-1">Level</span>
            </div>
          </div>
        </div>

        <div className="card-container p-6 relative group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.08]" />
          <h2 className="label-sm mb-6 flex items-center gap-2">
            <Clock size={12} className="text-[#6e6e6e]" /> Session Intensity
          </h2>
          <div className="space-y-5">
            <div className="flex justify-between items-baseline">
              <span className="text-[13px] text-[#a0a0a0]">Learning Hours</span>
              <span className="text-[14px] text-white font-mono font-bold">{weeklyCommitment.hoursStudied}h</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[13px] text-[#a0a0a0]">Assets Logged</span>
              <span className="text-[14px] text-white font-mono font-bold">{weeklyCommitment.contentCreatedCount}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[13px] text-[#a0a0a0]">Insights Captured</span>
              <span className="text-[14px] text-white font-mono font-bold">{weeklyCommitment.insightsCaptured}</span>
            </div>
          </div>
        </div>

        <div className="card-container p-6 col-span-1 md:col-span-2 relative group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.08]" />
          <h2 className="label-sm mb-8">Primitive Proficiency</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {skillLevels.slice(0, 6).map((skill, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="flex justify-between text-[11px] font-bold tracking-wider">
                  <span className="text-[#888888] uppercase">{skill.skill}</span>
                  <span className="text-white">LV.{skill.level}</span>
                </div>
                <div className="h-1 bg-[#2a2a2a] w-full overflow-hidden rounded-full">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${(skill.level / 10) * 100}%` }} 
                    className="h-full bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Roadmap Focus */}
        <section className="col-span-1 md:col-span-2 card-container p-8 relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.08]" />
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-10">
            <div>
              <h2 className="text-[18px] font-bold text-[#f0f0f0] tracking-tight">Active Roadmap Sequence</h2>
              <p className="text-[13px] text-[#a0a0a0] mt-1">Month {activeRoadmapItem?.period} / 24 Cycle</p>
            </div>
            <div className="flex h-10 px-4 items-center bg-[#111111] border border-[#2e2e2e] rounded-sm text-[11px] font-bold text-white uppercase tracking-widest">
              Phase {activeRoadmapItem?.period.split('-')[0]}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="label-sm">Active Focus</span>
              <p className="text-[15px] font-bold text-white leading-tight">{activeRoadmapItem?.title}</p>
              <div className="h-1 bg-[#2a2a2a] overflow-hidden rounded-full">
                <motion.div initial={{ width: 0 }} animate={{ width: activeRoadmapItem?.completed ? '100%' : '45%' }} className="h-full bg-white"></motion.div>
              </div>
            </div>
            <div className="space-y-4">
              <span className="label-sm">Operational Task</span>
              <p className="body-text">{activeRoadmapItem?.what}</p>
            </div>
            <div className="flex flex-col justify-end">
              <button className="btn-action w-full">
                Resume
              </button>
            </div>
          </div>
        </section>

        {/* Quick Start Guide */}
        <section className="card-container p-8 relative flex flex-col border-white/10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#3b82f6] opacity-30" />
          <h2 className="label-sm mb-8 flex items-center gap-2 text-[#a0a0a0]">
            <Zap size={14} className="text-[#f0f0f0]" /> Quick Start Guide
          </h2>
          <div className="space-y-4 flex-1">
            {[
              { id: 'roadmap', label: 'Set Roadmap Phase', tip: 'Determine your next path of mastery' },
              { id: 'library', label: 'Bookmark Knowledge', tip: 'Save critical concepts to library' },
              { id: 'audit', label: 'Run Funnel Audit', tip: 'Run system diagnosis for a client' },
              { id: 'content', label: 'Create Content Idea', tip: 'Generate asset ideas from logs' }
            ].map((step, i) => (
              <button 
                key={step.id} 
                onClick={() => toggleStep(step.id)}
                className={`w-full group bg-[#111111] border p-4 rounded-sm transition-all text-left flex items-start gap-4 ${
                  completedSteps.includes(step.id) ? 'border-green-500/20 bg-green-500/5' : 'border-[#2e2e2e] hover:border-white/20'
                }`}
              >
                <div className={`mt-1 w-5 h-5 rounded-sm border flex items-center justify-center shrink-0 transition-all ${
                  completedSteps.includes(step.id) ? 'bg-green-500 border-green-500 text-black' : 'border-[#2e2e2e] text-[#6e6e6e] group-hover:border-white/40'
                }`}>
                  {completedSteps.includes(step.id) && <CheckCircle2 size={12} />}
                  {!completedSteps.includes(step.id) && <span className="text-[10px] font-bold">{i + 1}</span>}
                </div>
                <div>
                  <p className={`text-[13px] font-bold mb-1 transition-colors ${completedSteps.includes(step.id) ? 'text-zinc-500 line-through' : 'text-white'}`}>{step.label}</p>
                  <p className="text-[11px] text-[#6e6e6e] italic">{step.tip}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Latest Audit Mini View */}
      <section className="card-container p-8 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.08]" />
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-[18px] font-bold text-[#f0f0f0] tracking-tight">Latest Funnel Diagnosis</h2>
           <span className="label-sm">Verified Audits: {audits.length}</span>
        </div>
        
        {lastAudit ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="flex flex-col gap-6">
                <div className="flex justify-between items-end">
                   <div>
                      <span className="label-sm block mb-2 opacity-50">Architecture</span>
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight">{lastAudit.offer}</h3>
                   </div>
                   <div className="text-right">
                      <span className="label-sm block mb-2 opacity-50">System Health</span>
                      <span className={`text-3xl font-mono font-bold ${lastAudit.healthScore && lastAudit.healthScore < 50 ? 'text-orange-500' : 'text-white'}`}>{lastAudit.healthScore}%</span>
                   </div>
                </div>
                <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                   <div className="h-full bg-white opacity-40 shadow-[0_0_10px_white]" style={{ width: `${lastAudit.healthScore}%` }} />
                </div>
             </div>
             <div className="flex gap-8">
                <div className="flex-1">
                   <span className="label-sm mb-4 block">Critical Leaks Detected</span>
                   <ul className="space-y-3">
                     {lastAudit.leaks?.slice(0, 2).map((leak, i) => (
                       <li key={i} className="text-[13px] text-[#b0b0b0] flex items-start gap-3">
                         <div className="mt-1.5 w-1.5 h-1.5 bg-white opacity-20 shrink-0 rounded-full" />
                         <span className="line-clamp-1">{leak.issue}</span>
                       </li>
                     ))}
                   </ul>
                </div>
             </div>
          </div>
        ) : (
          <div className="py-16 border border-dashed border-[#2e2e2e] rounded-sm flex flex-col items-center justify-center text-center">
            <AlertCircle size={32} className="text-[#2e2e2e] mb-4" />
            <h3 className="text-white font-bold mb-1">No system data yet</h3>
            <p className="text-[13px] text-[#6e6e6e]">Run your first Funnel Audit to see a high-density breakdown here.</p>
            <button className="btn-standard mt-6 text-[10px] h-9">
               Initialize Diagnosis
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
