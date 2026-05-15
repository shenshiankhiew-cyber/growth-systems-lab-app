import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LibraryCard, Category } from '../../types';
import { useOperator } from '../../context/OperatorContext';
import { 
  Filter, 
  Search, 
  PlusCircle, 
  BookOpen, 
  Quote, 
  Target, 
  Lightbulb, 
  MessageSquare, 
  Briefcase, 
  PenTool, 
  Bookmark, 
  ChevronDown, 
  ChevronUp,
  Clock
} from 'lucide-react';

const CATEGORIES: Category[] = [
  'Business fundamentals', 'Marketing funnel', 'Sales funnel', 'Account management',
  'CRM and lifecycle', 'Psychology and behavior', 'CRO', 'Paid ads', 'SEO/SEM',
  'Content strategy', 'Retention and LTV', 'Product growth', 'Growth operations', 'Ethical marketing', 'Consulting'
];

export const LibraryView: React.FC = () => {
  const { library, toggleLibraryBookmark } = useOperator();
  const [selectedCategory, setSelectedCategory] = React.useState<Category | 'All'>('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const filteredCards = library.filter(card => 
    (selectedCategory === 'All' || card.category === selectedCategory) &&
    (card.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     card.explanation.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Knowledge Library</h1>
          <p className="text-[13px] text-[#a0a0a0] mt-1">Browse and search core concepts. Use filters to find topics by category. Click any card to expand details.</p>
        </div>
        <button className="btn-action w-full md:w-auto h-[44px]">
          <PlusCircle size={16} /> Add Pattern
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="space-y-6 md:space-y-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6e6e6e] group-focus-within:text-white transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Query Repository..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-standard w-full pl-12 h-[44px]"
            />
          </div>

          <div>
            <h3 className="label-sm mb-4">System Categories</h3>
            {/* Mobile Horizontal Scroll */}
            <div className="flex flex-row overflow-x-auto gap-2 pb-4 scrollbar-none lg:flex-col lg:overflow-visible">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`text-left px-4 h-[44px] flex items-center shrink-0 rounded-sm transition-all text-[12px] font-bold uppercase tracking-wider ${selectedCategory === 'All' ? 'bg-white text-black' : 'bg-[#1a1a1a] text-[#888888] border border-[#2e2e2e] hover:border-white/20'}`}
              >
                All Systems
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-4 h-[44px] flex items-center shrink-0 rounded-sm transition-all text-[12px] font-bold uppercase tracking-wider whitespace-nowrap ${selectedCategory === cat ? 'bg-white text-black' : 'bg-[#1a1a1a] text-[#888888] border border-[#2e2e2e] hover:border-white/20'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 content-start">
          {filteredCards.length > 0 ? (
            filteredCards.map((card, index) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`card-container p-6 relative group overflow-hidden ${expandedId === card.id ? 'border-white/20' : 'border-[#2e2e2e]'}`}
              >
                {/* Left accent border */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white opacity-40" />

                <div className="flex items-start justify-between mb-6">
                  <div className="px-2 py-0.5 bg-[#111111] border border-[#2e2e2e] rounded-sm text-[10px] uppercase font-bold text-[#6e6e6e] tracking-tight">
                    {card.category}
                  </div>
                  <button onClick={() => toggleLibraryBookmark(card.id)} className={`${card.isBookmarked ? 'text-white' : 'text-[#2e2e2e]'} hover:text-white transition-colors`}>
                    <Bookmark size={16} fill={card.isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <h2 className="text-[15px] font-bold text-[#f0f0f0] mb-4 tracking-tight leading-snug">{card.title}</h2>
                
                <div className="space-y-6">
                  <p className="text-[13px] text-[#b0b0b0] leading-relaxed italic border-l border-[#2e2e2e] pl-4">
                    {card.explanation}
                  </p>

                  <AnimatePresence>
                    {expandedId === card.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-6 pt-6 border-t border-[#2e2e2e]"
                      >
                        <div>
                          <span className="label-sm block mb-2">Practical Scenario</span>
                          <p className="text-[13px] text-[#b0b0b0] font-light bg-[#0f0f0f] p-4 border border-[#2e2e2e] rounded-sm">{card.example}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                          <div>
                            <span className="label-sm block mb-2">Operational Logic</span>
                            <p className="text-[13px] text-[#b0b0b0] font-light leading-relaxed">{card.application}</p>
                          </div>
                          <div>
                            <span className="label-sm block mb-2">Content Narrative Vector</span>
                            <p className="text-[13px] text-[#6e6e6e] italic">"{card.contentAngle}"</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="mt-8 pt-5 border-t border-[#2e2e2e] flex justify-end">
                   <button 
                    onClick={() => setExpandedId(expandedId === card.id ? null : card.id)}
                    className="text-[11px] font-bold text-[#888888] hover:text-white uppercase tracking-widest flex items-center gap-2 transition-all min-h-[44px]"
                   >
                     {expandedId === card.id ? 'Collapse Analysis' : 'Analyze Pattern'}
                     {expandedId === card.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                   </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center card-container border-dashed">
              <Search size={48} className="mx-auto text-[#2e2e2e] mb-4" />
              <h2 className="text-white font-bold text-lg mb-2">No patterns identified</h2>
              <p className="text-[13px] text-[#6e6e6e] mb-8">Adjust your query or category filters to expand search scope.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} 
                className="btn-standard mx-auto"
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
