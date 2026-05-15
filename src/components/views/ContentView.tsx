import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ContentIdea } from '../../types';
import { useOperator } from '../../context/OperatorContext';
import { generateContentIdeas } from '../../services/geminiService';
import { 
  Sparkles, 
  Linkedin, 
  Instagram, 
  Video, 
  Globe, 
  Send,
  Loader2,
  Copy,
  CheckCircle2,
  Share2,
  PenTool,
  Bookmark,
  ChevronRight,
  Twitter,
  Layout,
  Type,
  Layers,
  Save,
  Trash2
} from 'lucide-react';

const TEMPLATES = [
  'LinkedIn Post', 
  'Instagram Carousel', 
  'Short Video Script', 
  'Educational Thread', 
  'Case Study Post'
] as const;

const PILLARS = [
  'Systems Thinking',
  'Conversion Science',
  'Psychology',
  'Operations',
  'Retention',
  'High-Ticket Sales'
];

export const ContentView: React.FC = () => {
  const { contentIdeas, addContentIdea, updateContentIdea } = useOperator();
  const [topic, setTopic] = React.useState('');
  const [activeTemplate, setActiveTemplate] = React.useState<typeof TEMPLATES[number] | 'All'>('LinkedIn Post');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [tab, setTab] = React.useState<'create' | 'drafts'>('create');
  const [tempIdeas, setTempIdeas] = React.useState<ContentIdea[]>([]);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    const result = await generateContentIdeas(topic);
    setTempIdeas(result.map(r => ({ 
      ...r as ContentIdea, 
      templateType: activeTemplate === 'All' ? 'LinkedIn Post' : activeTemplate,
      isDraft: true 
    })));
    setIsGenerating(false);
  };

  const handleSave = (idea: ContentIdea) => {
    addContentIdea({ ...idea, isDraft: true });
    setTempIdeas(prev => prev.filter(i => i.id !== idea.id));
  };

  const drafts = contentIdeas.filter(i => i.isDraft);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Content Lab</h1>
          <p className="text-[13px] text-[#a0a0a0] mt-1">Generate multi-channel content ideas based on growth primitives. Staged drafts appear in the Drafts tab.</p>
        </div>
        <div className="flex bg-[#111111] border border-[#2e2e2e] p-1 rounded-sm self-start md:self-auto">
           <button 
            onClick={() => setTab('create')} 
            className={`px-4 md:px-6 h-8 text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all ${tab === 'create' ? 'bg-white text-black' : 'text-[#888888] hover:text-white'}`}
           >
             Generate
           </button>
           <button 
            onClick={() => setTab('drafts')} 
            className={`px-4 md:px-6 h-8 text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all ${tab === 'drafts' ? 'bg-white text-black' : 'text-[#888888] hover:text-white'}`}
           >
             Drafts ({drafts.length})
           </button>
        </div>
      </header>

      {tab === 'create' && (
        <div className="space-y-12">
          {/* Generation Suite */}
          <section className="card-container p-4 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.1]" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
               <div className="lg:col-span-8 space-y-8">
                  <div className="space-y-4">
                    <label className="label-sm">System Topic or Concept</label>
                    <div className="relative group">
                      <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6e6e6e] group-focus-within:text-white transition-colors" size={18} />
                      <input 
                        type="text"
                        placeholder="e.g. Psychology of High-Ticket Retention..."
                        className="input-standard w-full h-14 pl-12 pr-6 text-[14px]"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 overflow-hidden">
                    <label className="label-sm">Asset Template</label>
                    <div className="horizontal-pill-scroll pb-2">
                      {TEMPLATES.map(t => (
                        <button 
                          key={t}
                          onClick={() => setActiveTemplate(t)}
                          className={`px-4 h-10 rounded-sm text-[11px] font-bold uppercase tracking-widest border transition-all shrink-0 ${activeTemplate === t ? 'bg-white text-black border-white' : 'bg-[#1a1a1a] text-[#888888] border-[#3a3a3a] hover:border-white hover:text-white'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
               </div>

               <div className="lg:col-span-4 lg:pb-0.5">
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !topic}
                    className="btn-action w-full h-24 flex-col gap-3 tracking-[0.3em]"
                  >
                    {isGenerating ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                    <span className="text-[10px]">{isGenerating ? 'GENERATING ASSETS...' : 'GENERATE'}</span>
                  </button>
               </div>
            </div>
          </section>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tempIdeas.map((idea, index) => (
              <ContentCard key={index} idea={idea} onSave={() => handleSave(idea)} />
            ))}
            
            {tempIdeas.length === 0 && !isGenerating && (
              <div className="col-span-full py-24 flex flex-col items-center justify-center text-center p-8 md:p-12 card-container border-dashed">
                <div className="w-20 h-20 bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm flex items-center justify-center mb-8 text-[#2e2e2e]">
                   <PenTool size={40} />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Narrative Engine Standby</h3>
                <p className="text-[14px] text-[#6e6e6e] mt-4 max-w-sm border-b border-[#2e2e2e] pb-8 mb-8">Define a growth topic and select a template above to generate strategic content assets.</p>
                <button onClick={() => document.querySelector('input')?.focus()} className="btn-standard">Start Writing</button>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'drafts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drafts.map((idea, index) => (
            <ContentCard key={index} idea={idea} isDraftView />
          ))}
          {drafts.length === 0 && (
            <div className="col-span-full py-32 border border-dashed border-[#2e2e2e] rounded-sm bg-[#0f0f0f] flex flex-col items-center justify-center text-[#6e6e6e]">
               <Layers size={32} className="mb-4 opacity-20" />
               <p className="text-[11px] font-bold uppercase tracking-widest font-mono">System memory empty. No drafts identified.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ContentCard: React.FC<{ idea: ContentIdea, onSave?: () => void, isDraftView?: boolean }> = ({ idea, onSave, isDraftView }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="card-container p-6 relative group flex flex-col h-full hover:border-white/20 transition-all overflow-hidden"
  >
    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white opacity-40 shadow-[0_0_8px_white/20]" />
    <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.08]" />

    <div className="flex items-start justify-between mb-8 overflow-hidden gap-4">
      <div className="flex flex-wrap gap-2">
        <div className="px-2 py-1 bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm text-[10px] uppercase font-bold text-[#a0a0a0] tracking-tight">
          {idea.pillar}
        </div>
        <div className="px-2 py-1 border border-white/20 rounded-sm text-[10px] uppercase font-bold text-white tracking-widest whitespace-nowrap">
          {idea.templateType || 'ASSET'}
        </div>
      </div>
      <div className="flex items-center gap-3 text-[#6e6e6e] shrink-0">
        <Linkedin size={14} className={idea.platforms?.includes('LinkedIn') ? 'text-white' : ''} />
        <Twitter size={14} className={idea.platforms?.includes('Twitter') ? 'text-white' : ''} />
        <Instagram size={14} className={idea.platforms?.includes('Instagram') ? 'text-white' : ''} />
      </div>
    </div>

    <h3 className="text-base font-bold text-[#f0f0f0] mb-6 tracking-tight leading-snug">{idea.title}</h3>
    
    <div className="bg-[#0f0f0f] rounded-sm p-5 mb-8 border border-[#2e2e2e] relative group/hook">
      <div className="label-sm mb-3 flex items-center justify-between">
        Tactical Hook
        <button className="opacity-0 group-hover/hook:opacity-100 transition-opacity">
          <Copy size={12} className="text-[#6e6e6e] hover:text-white" />
        </button>
      </div>
      <p className="body-text leading-relaxed italic">"{idea.hook}"</p>
    </div>

    <div className="space-y-8 flex-1">
      <div>
        <h4 className="label-sm mb-3 flex items-center gap-2">
          <CheckCircle2 size={12} className="text-white opacity-40" /> Narrative Delta
        </h4>
        <p className="body-text leading-relaxed">{idea.mainPoint}</p>
      </div>

      <div>
        <h4 className="label-sm mb-3 flex items-center gap-2">
          <Share2 size={12} className="text-white opacity-40" /> System Logic
        </h4>
        <p className="text-[12px] text-[#888888] font-mono leading-relaxed bg-[#111111] p-4 border border-[#2e2e2e] rounded-sm">{idea.breakdown}</p>
      </div>
    </div>

    <div className="mt-10 pt-6 border-t border-[#2e2e2e] flex items-center justify-between gap-4">
      <div className="flex gap-2 overflow-hidden">
        {idea.languages?.map(lang => (
          <span key={lang} className="text-[10px] text-[#6e6e6e] font-bold font-mono bg-[#111111] px-2 py-0.5 border border-[#2e2e2e] rounded-sm truncate">
            {lang === 'English' ? 'EN-CORE' : lang.toUpperCase()}
          </span>
        ))}
      </div>
      {!isDraftView && (
        <button onClick={onSave} className="btn-standard h-9 px-4 text-[10px] flex items-center gap-2 shrink-0">
          <Save size={14} /> Stage
        </button>
      )}
      {isDraftView && (
        <div className="text-[10px] text-[#6e6e6e] font-bold font-mono uppercase tracking-widest">Staged</div>
      )}
    </div>
  </motion.div>
);
