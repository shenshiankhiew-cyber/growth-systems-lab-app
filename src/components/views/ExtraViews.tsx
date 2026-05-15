import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ReverseEngineeringItem, 
  CaseStudy, 
  ConsultingProduct, 
  TopicLogEntry,
  BookEntry,
  QuestionEntry,
  ReverseCategory,
  ClientPipeline,
  ClientStatus
} from '../../types';
import { useOperator } from '../../context/OperatorContext';
import { 
  Eye, 
  BookOpen, 
  Briefcase, 
  CheckCircle2, 
  Search, 
  Plus, 
  ExternalLink,
  MessageCircle,
  FileText,
  DollarSign,
  ArrowRight,
  Filter,
  Star,
  Tag,
  Download,
  Terminal,
  Trophy,
  History,
  TrendingUp,
  Brain,
  AlertCircle,
  Clock,
  Layout,
  PlusCircle,
  Save,
  Trash2,
  Copy,
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';

// --- REVERSE ENGINEERING VIEW ---
export const ReverseEngineeringView: React.FC = () => {
  const { reverseItems, addReverseItem } = useOperator();
  const [filter, setFilter] = useState<ReverseCategory | 'All'>('All');
  
  const filtered = reverseItems.filter(i => filter === 'All' || i.category === filter);
  
  const categories: ReverseCategory[] = ['Ads', 'Landing Pages', 'Funnels', 'Emails', 'Apps', 'Ecommerce', 'Recruitment', 'Gaming'];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Reverse Engineering</h1>
          <p className="text-[13px] text-[#a0a0a0] mt-1">Deconstruct high-performing assets to understand the underlying growth logic. Add your observations to the swipe file.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="sm:text-right flex flex-col justify-center">
             <span className="label-sm opacity-40">Swipe File Depth</span>
             <p className="text-[14px] text-white font-mono font-bold leading-none mt-1">{reverseItems.length} Assets</p>
          </div>
          <button onClick={() => addReverseItem({ id: Math.random().toString(), title: 'New Observation', category: 'Funnels', patterns: [], learning: '', scores: { offerClarity: 5, friction: 5, psychology: 5, conversion: 5 } })} className="btn-action whitespace-nowrap">
            <Plus size={16} /> New Observation
          </button>
        </div>
      </header>

      <div className="horizontal-pill-scroll pb-2">
        <button 
          onClick={() => setFilter('All')} 
          className={`h-9 px-4 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all shrink-0 border ${filter === 'All' ? 'bg-white text-black border-white' : 'bg-[#1a1a1a] text-[#888888] border-[#3a3a3a] hover:border-white hover:text-white'}`}
        >
          All Assets
        </button>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)} 
            className={`h-9 px-4 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-all shrink-0 border ${filter === cat ? 'bg-white text-black border-white' : 'bg-[#1a1a1a] text-[#888888] border-[#3a3a3a] hover:border-white hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="card-container overflow-hidden flex flex-col group hover:border-white/20 transition-all relative">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white opacity-20" />
            
            <div className="aspect-video bg-[#0a0a0a] relative overflow-hidden">
               {item.imageUrl ? (
                 <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-[#2e2e2e]">
                    <Eye size={40} />
                 </div>
               )}
               <div className="absolute top-4 left-4">
                  <span className="bg-black/80 px-2 py-0.5 rounded-sm text-[10px] text-white font-bold tracking-widest uppercase border border-white/10 backdrop-blur-sm">
                    {item.category}
                  </span>
               </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-base font-bold text-white tracking-tight mb-6 line-clamp-1">{item.title}</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                 <div className="bg-[#0f0f0f] p-3 border border-[#2e2e2e] rounded-sm text-center">
                    <div className="text-[14px] text-white font-bold font-mono">{item.scores.offerClarity}<span className="text-[10px] text-[#6e6e6e]">/10</span></div>
                    <div className="label-sm opacity-40 mt-1">Clarity</div>
                 </div>
                 <div className="bg-[#0f0f0f] p-3 border border-[#2e2e2e] rounded-sm text-center">
                    <div className="text-[14px] text-white font-bold font-mono">{item.scores.friction}<span className="text-[10px] text-[#6e6e6e]">/10</span></div>
                    <div className="label-sm opacity-40 mt-1">Friction</div>
                 </div>
              </div>

              <div className="space-y-6 mb-8 flex-1">
                <div>
                   <h4 className="label-sm opacity-40 mb-3 uppercase">Patterns Identified</h4>
                   <div className="flex flex-wrap gap-1.5 font-mono">
                      {item.patterns.length > 0 ? item.patterns.map(p => (
                        <span key={p} className="text-[9px] px-2 py-0.5 bg-[#1a1a1a] text-[#a0a0a0] border border-[#2e2e2e] rounded-sm font-bold uppercase">
                          {p}
                        </span>
                      )) : (
                        <span className="text-[9px] text-[#6e6e6e] italic">No patterns tagged</span>
                      )}
                   </div>
                </div>
                <div>
                  <h4 className="label-sm opacity-40 mb-2 uppercase">Strategic Learning</h4>
                  <p className="body-text italic leading-relaxed line-clamp-3">"{item.learning || 'Analysis pending system processing...'}"</p>
                </div>
              </div>

              <button className="btn-standard w-full text-[10px]">
                 Deconstruct Logic Matrix
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-24 text-center border border-dashed border-[#2e2e2e] rounded-sm bg-[#0f0f0f]">
            <Search size={32} className="mx-auto text-[#2e2e2e] mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">No observations found</h3>
            <p className="text-[13px] text-[#6e6e6e]">Initialize a new deconstruction to expand your swipe file.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- CASE STUDIES VIEW ---
export const CaseStudiesView: React.FC = () => {
  const { cases, addCase, updateCase } = useOperator();
  const [filterTag, setFilterTag] = useState<CaseStudy['impactTags'][number] | 'All'>('All');

  const filtered = cases.filter(c => filterTag === 'All' || c.impactTags.includes(filterTag));
  const tags: CaseStudy['impactTags'][number][] = ['Revenue', 'Retention', 'Conversion', 'Brand', 'Efficiency'];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Case Studies</h1>
          <p className="text-[13px] text-[#a0a0a0] mt-1">Proof of your skills and results. Build out detailed case studies using the STARL framework (Situation, Task, Action, Result, Lessons).</p>
        </div>
        <button onClick={() => addCase({ id: Math.random().toString(), title: 'New Case Study', situation: '', task: '', action: '', result: '', lessons: '', impactTags: ['Revenue'], isDraft: true })} className="btn-action whitespace-nowrap">
          <PlusCircle size={16} /> New Study
        </button>
      </header>

      <div className="horizontal-pill-scroll pb-2">
        <button onClick={() => setFilterTag('All')} className={`h-9 px-4 rounded-sm text-[11px] font-bold tracking-widest uppercase transition-all shrink-0 border ${filterTag === 'All' ? 'bg-white text-black border-white' : 'bg-[#1a1a1a] text-[#888888] border-[#3a3a3a] hover:border-white hover:text-white'}`}>All Impacts</button>
        {tags.map(t => (
          <button key={t} onClick={() => setFilterTag(t)} className={`h-9 px-4 rounded-sm text-[11px] font-bold tracking-widest uppercase transition-all shrink-0 border ${filterTag === t ? 'bg-white text-black border-white' : 'bg-[#1a1a1a] text-[#888888] border-[#3a3a3a] hover:border-white hover:text-white'}`}>{t}</button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((item) => (
          <div key={item.id} className="card-container p-4 md:p-10 flex flex-col lg:grid lg:grid-cols-12 gap-10 group relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white opacity-40 shadow-[0_0_8px_white/20]" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.08]" />

            <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#2e2e2e] pb-8 lg:pb-0 lg:pr-10">
               <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="px-2 py-1 bg-[#1a1a1a] text-[10px] text-[#a0a0a0] font-bold tracking-widest border border-[#2e2e2e] uppercase rounded-sm">
                       {item.isDraft ? 'Draft Asset' : 'Finalized'}
                    </div>
                    <button className="text-[#6e6e6e] hover:text-white transition-colors"><Download size={14} /></button>
                  </div>
                  <input 
                    value={item.title} 
                    onChange={(e) => updateCase(item.id, { title: e.target.value })}
                    className="w-full bg-transparent text-lg font-bold text-white tracking-tight focus:outline-none focus:border-b border-[#3a3a3a] py-1"
                  />
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.impactTags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-1 bg-white/5 text-[#a0a0a0] border border-white/10 rounded-sm font-bold uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
               </div>
               <div className="mt-10 pt-8 border-t border-[#2e2e2e]">
                  <h4 className="label-sm opacity-40 mb-4 uppercase">Primary Achievement</h4>
                  <div className="bg-[#0f0f0f] p-5 border border-[#2e2e2e] rounded-sm">
                    <p className="body-text italic leading-relaxed">"{item.result || 'Outcome pending documentation...'}"</p>
                  </div>
               </div>
            </div>
            
            <div className="lg:col-span-8 space-y-10 py-2">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div>
                    <h4 className="label-sm mb-4 flex justify-between">Situation Content <span className="opacity-20">S</span></h4>
                    <textarea value={item.situation} onChange={e => updateCase(item.id, { situation: e.target.value })} className="input-standard w-full h-24 p-4 text-[13px] resize-none" placeholder="Describe the initial state..." />
                  </div>
                  <div>
                    <h4 className="label-sm mb-4 flex justify-between">Task Parameters <span className="opacity-20">T</span></h4>
                    <textarea value={item.task} onChange={e => updateCase(item.id, { task: e.target.value })} className="input-standard w-full h-24 p-4 text-[13px] resize-none" placeholder="Identify the core objective..." />
                  </div>
                  <div>
                    <h4 className="label-sm mb-4 flex justify-between">Action Protocol <span className="opacity-20">A</span></h4>
                    <textarea value={item.action} onChange={e => updateCase(item.id, { action: e.target.value })} className="input-standard w-full h-24 p-4 text-[13px] resize-none" placeholder="Mapping the strategic steps..." />
                  </div>
                  <div>
                    <h4 className="label-sm mb-4 flex justify-between">System Lessons <span className="opacity-20">L</span></h4>
                    <textarea value={item.lessons} onChange={e => updateCase(item.id, { lessons: e.target.value })} className="input-standard w-full h-24 p-4 text-[13px] resize-none" placeholder="Tactical takeaways..." />
                  </div>
               </div>
               <div className="flex flex-wrap gap-4 pt-6 border-t border-[#2e2e2e]">
                  <button className="btn-standard text-[10px]">Export PDF Asset</button>
                  <button onClick={() => updateCase(item.id, { isDraft: !item.isDraft })} className="btn-standard text-[10px]">{item.isDraft ? 'Finalize Study' : 'Revision Mode'}</button>
               </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-24 text-center border border-dashed border-[#2e2e2e] rounded-sm bg-[#0f0f0f] flex flex-col items-center justify-center">
             <Trophy size={48} className="text-[#2e2e2e] mb-4" />
             <h3 className="text-white font-bold text-lg mb-2">No archive data</h3>
             <p className="text-[13px] text-[#6e6e6e]">Document your success milestones to build proof-of-work assets.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- CONSULTING PRODUCTS VIEW ---
export const ConsultingProductsView: React.FC = () => {
  const { products, clients, addClient, updateClient, updateProduct } = useOperator();
  const [showGenerator, setShowGenerator] = useState(false);
  const [genForm, setGenForm] = useState({ client: '', problem: '', budget: '' });

  const totalRevenue = clients.filter(c => c.status === 'Closed').reduce((acc, c) => acc + (parseFloat(c.budget.replace(/[^0-9.]/g, '')) || 0), 0);
  const targetRevenue = products.reduce((acc, p) => acc + (p.revenueTarget || 0), 0);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Growth Products</h1>
          <p className="text-[13px] text-[#a0a0a0] mt-1">Design and track your high-ticket consulting offers. Use the Proposal Engine to generate client-ready growth protocols.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
           <div className="sm:text-right">
              <span className="label-sm opacity-40">System Yield (RM)</span>
              <p className="text-xl font-bold text-white font-mono tracking-tighter mt-1">
                {totalRevenue.toLocaleString()} 
                <span className="text-[11px] text-[#6e6e6e] font-normal ml-2">/ target {targetRevenue.toLocaleString()}</span>
              </p>
           </div>
           <button onClick={() => setShowGenerator(true)} className="btn-action whitespace-nowrap">
            <Zap size={16} /> Proposal Engine
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((pkg) => (
            <div key={pkg.id} className="card-container p-4 md:p-8 flex flex-col h-full hover:border-white/20 transition-all relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white opacity-40 shadow-[0_0_8px_white/20]" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.08]" />

              <input 
                className="bg-transparent text-lg font-bold text-white mb-3 tracking-tight focus:outline-none w-full border-b border-transparent focus:border-[#3a3a3a]"
                value={pkg.name}
                onChange={e => updateProduct(pkg.id, { name: e.target.value })}
              />
              <textarea 
                className="bg-transparent text-[13px] text-[#a0a0a0] mb-8 leading-relaxed italic border-none focus:outline-none w-full h-12 resize-none opacity-80"
                value={pkg.problem}
                onChange={e => updateProduct(pkg.id, { problem: e.target.value })}
              />

              <div className="space-y-8 flex-1">
                <div>
                  <h4 className="label-sm opacity-40 mb-4 uppercase">System Components</h4>
                  <ul className="space-y-3">
                    {pkg.deliverables.map((d, i) => (
                      <li key={i} className="body-text flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-white opacity-40 rounded-full mt-2 shrink-0" /> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 border-t border-[#2e2e2e] pt-6 flex justify-between items-center">
                 <div className="flex flex-col">
                   <span className="label-sm opacity-30">Price Structure</span>
                   <input className="bg-transparent text-[14px] font-bold font-mono text-white w-32 outline-none mt-1" value={pkg.priceRange} onChange={e => updateProduct(pkg.id, { priceRange: e.target.value })} />
                 </div>
                 <span className="text-[10px] text-[#6e6e6e] font-mono">PKG-{pkg.id.substr(0,4).toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="card-container p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.1]" />
              <h3 className="label-sm mb-8 flex items-center gap-2">
                <TrendingUp size={14} className="text-[#6e6e6e]" /> Active Pipeline
              </h3>
              <div className="space-y-4">
                 {clients.map(client => (
                   <div key={client.id} className="bg-[#0f0f0f] p-4 border border-[#2e2e2e] rounded-sm group relative">
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-2/3 bg-[#2e2e2e] transition-colors group-hover:bg-white" />
                     <div className="flex justify-between items-start mb-3">
                       <span className="text-[13px] text-white font-bold tracking-tight">{client.name}</span>
                       <span className={`text-[9px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest ${
                          client.status === 'Closed' ? 'bg-white text-black' :
                          client.status === 'Lost' ? 'bg-[#1a1a1a] text-[#6e6e6e]' :
                          'bg-[#1a1a1a] text-[#a0a0a0]'
                       }`}>
                         {client.status}
                       </span>
                     </div>
                     <div className="flex justify-between items-center text-[11px] text-[#6e6e6e] font-mono">
                       <span className="font-bold text-[#a0a0a0]">{client.budget}</span>
                       <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all">
                         <button onClick={() => updateClient(client.id, { status: 'Closed' })} className="hover:text-white border-b border-transparent hover:border-white transition-all text-[9px] font-bold">WIN</button>
                         <button onClick={() => updateClient(client.id, { status: 'Lost' })} className="hover:text-white border-b border-transparent hover:border-white transition-all text-[9px] font-bold">LOSS</button>
                       </div>
                     </div>
                   </div>
                 ))}
                 <button onClick={() => addClient({ id: Math.random().toString(), name: 'New Prospect', problem: '', budget: 'RM 0', status: 'Prospect', notes: '' })} className="w-full border border-dashed border-[#2e2e2e] rounded-sm h-12 flex items-center justify-center text-[10px] text-[#6e6e6e] uppercase font-bold tracking-widest hover:bg-[#111111] hover:text-white transition-all">
                   + New Pipeline Agent
                 </button>
              </div>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {showGenerator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0f0f0f] border border-[#2e2e2e] w-full max-w-2xl p-6 md:p-10 rounded-sm relative shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.2]" />
                <header className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-bold text-white tracking-tight uppercase">Proposal Engine</h2>
                  <button onClick={() => setShowGenerator(false)} className="text-[#6e6e6e] hover:text-white transition-colors">
                    <Trash2 size={20} />
                  </button>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                   <div className="space-y-4">
                     <label className="label-sm">Client Identity</label>
                     <input value={genForm.client} onChange={e => setGenForm({...genForm, client: e.target.value})} className="input-standard w-full h-12" placeholder="e.g. Acme SaaS" />
                   </div>
                   <div className="space-y-4">
                     <label className="label-sm">Allocated Budget (RM)</label>
                     <input value={genForm.budget} onChange={e => setGenForm({...genForm, budget: e.target.value})} className="input-standard w-full h-12" placeholder="e.g. 5000" />
                   </div>
                   <div className="col-span-1 md:col-span-2 space-y-4">
                     <label className="label-sm">Core Pathological Failure</label>
                     <textarea value={genForm.problem} onChange={e => setGenForm({...genForm, problem: e.target.value})} className="input-standard w-full h-32 p-4 resize-none" placeholder="e.g. Retention drop-off at month 3..." />
                   </div>
                </div>
                <div className="p-6 md:p-8 bg-[#111111] border border-[#2e2e2e] rounded-sm font-mono text-[11px] text-[#6e6e6e] leading-relaxed relative overflow-hidden">
                   <div className="absolute top-4 right-8 label-sm opacity-20">System Payload</div>
                   <p className="text-white/40 mb-6 font-bold tracking-widest">Growth Execution Protocol v1.0</p>
                   <div className="space-y-4">
                      <p><span className="text-[#a0a0a0]">SUBJECT:</span> STRATEGIC RESTRUCTURING FOR {genForm.client?.toUpperCase() || '[IDENTIFIER]'}</p>
                      <p><span className="text-[#a0a0a0]">DIAGNOSIS:</span> {genForm.problem || '[UNDEFINED]'}</p>
                      <p><span className="text-[#a0a0a0]">INTERVENTION:</span> PHASED GROWTH OPS TRANSFORMATION</p>
                      <p><span className="text-[#a0a0a0]">SYSTEM YIELD:</span> +25-40% EFFICIENCY GAIN</p>
                      <p><span className="text-[#a0a0a0]">RESOURCES:</span> RM {genForm.budget || '0'}</p>
                   </div>
                   <p className="mt-8">SIGNATURE: SYSTEM OPERATOR @ LAB-01</p>
                </div>
                <button className="btn-action w-full mt-10 h-14 tracking-[0.2em]">
                   <Copy size={16} /> Copy Strategic Payload
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- TRACKER VIEW ---
export const TrackerView: React.FC = () => {
  const { topicLogs, books, questions, addTopicLog, addBook, addQuestion, updateQuestion, roadmap } = useOperator();
  const [activeTab, setActiveTab] = useState<'logs' | 'books' | 'questions'>('logs');

  const topicsMastered = roadmap.filter(i => i.completed).length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Growth Tracker</h1>
          <p className="text-[13px] text-[#a0a0a0] mt-1">Your personal knowledge operating system. Log insights, track your library, and manage research inquiries.</p>
        </div>
        <div className="flex items-center gap-10">
           <div className="text-right hidden sm:block">
              <span className="label-sm opacity-40">System Integration</span>
              <div className="flex items-center gap-4 mt-1">
                 <div className="w-32 h-1 bg-[#111111] rounded-full border border-[#2e2e2e] overflow-hidden">
                    <div className="h-full bg-white transition-all shadow-[0_0_8px_white/20]" style={{ width: `${(topicsMastered / roadmap.length) * 100}%` }} />
                 </div>
                 <span className="text-[12px] text-white font-mono font-bold tracking-tighter">{Math.round((topicsMastered / roadmap.length) * 100)}%</span>
              </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-8 order-2 lg:order-1">
           <nav className="flex flex-col gap-2 p-1 bg-[#111111] border border-[#2e2e2e] rounded-sm">
              {(['logs', 'books', 'questions'] as const).map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`text-left px-5 h-10 text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all ${activeTab === tab ? 'bg-white text-black shadow-lg' : 'text-[#888888] hover:text-white'}`}
                >
                  {tab === 'logs' ? 'Growth Logs' : tab === 'books' ? 'Library' : 'Inquiry Bank'}
                </button>
              ))}
           </nav>

           <div className="card-container p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.1]" />
              <h4 className="label-sm opacity-40 mb-6 uppercase">Total Primitives Integrated</h4>
              <div className="relative aspect-square w-32 mx-auto flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="60" fill="none" stroke="#0a0a0a" strokeWidth="4" />
                    <circle cx="64" cy="64" r="60" fill="none" stroke="white" strokeWidth="4" className="opacity-40" strokeDasharray={String(2 * Math.PI * 60)} strokeDashoffset={String(2 * Math.PI * 60 * (1 - topicsMastered/roadmap.length))} strokeLinecap="round" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center flex-col pt-1">
                    <span className="text-3xl font-bold text-white leading-none">{topicsMastered}</span>
                    <span className="text-[9px] text-[#6e6e6e] font-bold uppercase tracking-widest mt-1">Foundations</span>
                 </div>
              </div>
           </div>
        </aside>

        <main className="lg:col-span-9 order-1 lg:order-2">
           <AnimatePresence mode="wait">
              {activeTab === 'logs' && (
                <motion.div key="logs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                   <header className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-white tracking-tight">Growth Logs</h3>
                      <button onClick={() => addTopicLog({ id: Math.random().toString(), date: new Date().toISOString(), topic: 'Untitled Insight', source: '', insight: '', application: '', contentIdea: '', consultingIdea: '' })} className="btn-standard text-[10px]">New Entry</button>
                   </header>
                   <div className="space-y-4">
                      {topicLogs.map(log => (
                        <div key={log.id} className="card-container p-6 relative group overflow-hidden">
                           <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white opacity-40 shadow-[0_0_8px_white/20]" />
                           <div className="flex justify-between items-start mb-6 gap-4">
                              <h3 className="text-base font-bold text-white tracking-tight uppercase leading-none">{log.topic}</h3>
                              <span className="text-[10px] text-[#6e6e6e] font-mono font-bold shrink-0">{new Date(log.date).toLocaleDateString()}</span>
                           </div>
                           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              <div className="space-y-2">
                                <span className="label-sm opacity-30 block">Protocol Source</span>
                                <p className="text-[12px] text-[#a0a0a0] font-medium truncate">{log.source || 'Internal Engine'}</p>
                              </div>
                              <div className="space-y-2">
                                <span className="label-sm opacity-30 block">Core Insight</span>
                                <p className="text-[12px] text-[#f0f0f0] font-medium italic border-l border-[#2e2e2e] pl-3 leading-relaxed">{log.insight || 'Processing...'}</p>
                              </div>
                              <div className="space-y-2">
                                <span className="label-sm opacity-30 block">Content Vector</span>
                                <p className="text-[12px] text-[#a0a0a0] line-clamp-2">{log.contentIdea || 'Drafting...'}</p>
                              </div>
                              <div className="space-y-2">
                                <span className="label-sm opacity-30 block">System Impact</span>
                                <p className="text-[12px] text-white font-bold leading-tight">{log.consultingIdea || 'Analyzing...'}</p>
                              </div>
                           </div>
                        </div>
                      ))}
                      {topicLogs.length === 0 && (
                        <div className="py-24 border border-dashed border-[#2e2e2e] rounded-sm text-center bg-[#0f0f0f] flex flex-col items-center justify-center">
                           <Terminal size={32} className="text-[#2e2e2e] mb-4" />
                           <h3 className="text-white font-bold text-lg mb-2">Memory bank empty</h3>
                           <p className="text-[13px] text-[#6e6e6e]">Initialize log entry to store system insights.</p>
                        </div>
                      )}
                   </div>
                </motion.div>
              )}

              {activeTab === 'books' && (
                <motion.div key="books" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                   <header className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-white tracking-tight">Intellectual Capital</h3>
                      <button onClick={() => addBook({ id: Math.random().toString(), title: 'Protocol Base', author: 'Primary Agent', lessons: '', rating: 5 })} className="btn-standard text-[10px]">Register Asset</button>
                   </header>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {books.map(book => (
                        <div key={book.id} className="card-container p-8 relative overflow-hidden group">
                           <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white opacity-40 shadow-[0_0_8px_white/20]" />
                           <div className="flex justify-between items-start mb-6 gap-4">
                             <div>
                               <h4 className="text-lg font-bold text-white tracking-tight uppercase leading-none mb-2">{book.title}</h4>
                               <p className="label-sm opacity-40 italic">{book.author}</p>
                             </div>
                             <div className="flex text-white opacity-20 gap-0.5 shrink-0">
                                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < book.rating ? 'currentColor' : 'none'} className={i < book.rating ? 'opacity-100' : ''} />)}
                             </div>
                           </div>
                           <p className="body-text italic leading-relaxed bg-[#0f0f0f] p-4 border border-[#2e2e2e] rounded-sm">"{book.lessons || 'Parsing strategic takeaways...'}"</p>
                        </div>
                      ))}
                      {books.length === 0 && (
                        <div className="col-span-full py-24 border border-dashed border-[#2e2e2e] rounded-sm text-center bg-[#0f0f0f] flex flex-col items-center justify-center">
                          <BookOpen size={32} className="text-[#2e2e2e] mb-4" />
                          <h3 className="text-white font-bold text-lg mb-2">Library empty</h3>
                          <p className="text-[13px] text-[#6e6e6e]">Register your first knowledge asset.</p>
                        </div>
                      )}
                   </div>
                </motion.div>
              )}

              {activeTab === 'questions' && (
                <motion.div key="questions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                   <header className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-white tracking-tight">Inquiry Bank</h3>
                      <button onClick={() => addQuestion({ id: Math.random().toString(), question: 'Strategic Query?', answer: '', solved: false })} className="btn-standard text-[10px]">New Inquiry</button>
                   </header>
                   <div className="space-y-4">
                      {questions.map(q => (
                        <div key={q.id} className="card-container p-6 md:p-10 relative group overflow-hidden transition-all hover:border-white/20">
                           <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white opacity-40 shadow-[0_0_8px_white/20]" />
                           <div className="flex flex-col sm:flex-row gap-8">
                              <div className={`mt-2 flex-shrink-0 w-3 h-3 rounded-full border ${q.solved ? 'bg-[#1a1a1a] border-[#2e2e2e]' : 'bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'}`} />
                              <div className="flex-1 space-y-6">
                                 <p className="text-lg font-bold text-white tracking-tight uppercase leading-snug">{q.question}</p>
                                 <div className="space-y-3">
                                   <span className="label-sm opacity-40 block uppercase">Resolution Asset</span>
                                   <textarea 
                                      value={q.answer} 
                                      placeholder="Synthesizing solution architecture..."
                                      onChange={e => updateQuestion(q.id, { answer: e.target.value, solved: !!e.target.value })} 
                                      className="input-standard w-full h-32 p-4 resize-none leading-relaxed" 
                                   />
                                 </div>
                              </div>
                           </div>
                        </div>
                      ))}
                      {questions.length === 0 && (
                        <div className="py-24 border border-dashed border-[#2e2e2e] rounded-sm text-center bg-[#0f0f0f] flex flex-col items-center justify-center">
                          <HelpCircle size={32} className="text-[#2e2e2e] mb-4" />
                          <h3 className="text-white font-bold text-lg mb-2">Inquiry bank empty</h3>
                          <p className="text-[13px] text-[#6e6e6e]">Log questions you need to answer for your growth.</p>
                        </div>
                      )}
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
