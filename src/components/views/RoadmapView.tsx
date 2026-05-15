import React from 'react';
import { motion } from 'motion/react';
import { RoadmapItem } from '../../types';
import { useOperator } from '../../context/OperatorContext';
import { CheckCircle, Circle, Book, Target, Lightbulb, PenTool, CheckSquare, Square } from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const { roadmap, updateRoadmap } = useOperator();

  const handleToggle = (id: string, current: boolean) => {
    updateRoadmap(id, { completed: !current });
  };

  const handleNoteChange = (id: string, note: string) => {
    updateRoadmap(id, { mentorNote: note });
  };

  const overallProgress = Math.round((roadmap.filter(i => i.completed).length / roadmap.length) * 100);

  return (
    <div className="max-w-6xl mx-auto py-6 md:py-12 px-4 md:px-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Operator Sequence</h1>
          <p className="text-[13px] text-[#a0a0a0] mt-1">Your 24-month learning sequence. Check off topics as you complete them. Progress saves automatically.</p>
        </div>
        <div className="w-full md:w-auto md:text-right">
          <div className="label-sm mb-3">Protocol Completion</div>
          <div className="w-full md:w-64 bg-[#1f1f1f] border border-[#2e2e2e] rounded-full h-[6px] relative overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${overallProgress}%` }} 
              className="h-full bg-white" 
            />
          </div>
          <p className="text-sm font-mono text-white mt-2 font-bold">{overallProgress}% COMPLETED</p>
        </div>
      </header>

      <div className="relative border-l border-[#2e2e2e] ml-2 md:ml-6 pl-6 md:pl-12 space-y-12">
        {roadmap.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`relative group ${item.completed ? 'opacity-40' : 'opacity-100'}`}
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[30px] md:-left-[54px] top-6 w-3 h-3 bg-[#0f0f0f] border-2 border-[#2e2e2e] flex items-center justify-center rounded-full group-hover:border-white transition-colors">
               <div className={`w-1 h-1 rounded-full ${item.completed ? 'bg-white' : 'bg-[#2e2e2e]'}`} />
            </div>
            
            <div className="card-container p-4 md:p-8 relative">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.08]" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#2e2e2e]">
                <div className="flex items-start gap-4">
                  <button 
                    onClick={() => handleToggle(item.id, !!item.completed)} 
                    className={`min-w-[24px] h-[24px] flex items-center justify-center border transition-all rounded-sm ${item.completed ? 'bg-white border-white text-black' : 'bg-[#1a1a1a] border-[#3a3a3a] hover:border-white'}`}
                  >
                    {item.completed && <CheckSquare size={14} strokeWidth={3} />}
                  </button>
                  <div>
                    <span className="label-sm mb-1 block">Phase {item.period} · Month {item.period}</span>
                    <h2 className={`text-lg font-bold tracking-tight leading-tight ${item.completed ? 'text-[#6e6e6e] line-through' : 'text-white'}`}>
                      {item.title}
                    </h2>
                  </div>
                </div>
                <div className={`text-[10px] font-bold tracking-widest px-3 py-1.5 border rounded-sm self-start sm:self-auto ${item.completed ? 'text-[#6e6e6e] border-[#2e2e2e]' : 'text-white border-white/20'}`}>
                  {item.completed ? 'MASTERED' : 'OPERATIONAL'}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div>
                    <h3 className="label-sm mb-3">Scope of Learning</h3>
                    <p className="body-text italic">
                      "{item.what}"
                    </p>
                  </div>

                  <div>
                    <h3 className="label-sm mb-3">System Primitives</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.concepts.map((concept, i) => (
                        <span key={i} className="text-[10px] px-2.5 py-1.5 bg-[#111111] border border-[#2e2e2e] text-[#b0b0b0] rounded-sm font-bold uppercase tracking-wider">
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="label-sm mb-3">Mentor Note</h3>
                    <textarea 
                      value={item.mentorNote || ''}
                      onChange={(e) => handleNoteChange(item.id, e.target.value)}
                      placeholder="Input strategic operational notes..."
                      className="input-standard w-full h-24 p-4 text-[13px] resize-none"
                    />
                  </div>

                  <div>
                    <h3 className="label-sm mb-3">Content Vectors</h3>
                    <div className="space-y-3">
                      {item.contentIdeas.map((idea, i) => (
                        <div key={i} className="text-[12px] text-[#888888] font-medium group cursor-pointer hover:text-white transition-colors flex items-center gap-3">
                           <div className="w-[1.5px] h-3 bg-[#2e2e2e] group-hover:bg-white transition-colors" /> {idea}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
