import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuditSubmission, AuditLeak } from '../../types';
import { useOperator } from '../../context/OperatorContext';
import { getAuditAnalysis } from '../../services/geminiService';
import { 
  AlertTriangle, 
  CheckCircle2, 
  BrainCircuit, 
  Loader2,
  ChevronRight,
  ShieldAlert,
  Zap,
  TrendingUp,
  History
} from 'lucide-react';

export const AuditView: React.FC = () => {
  const { audits, addAudit } = useOperator();
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [currentResult, setCurrentResult] = React.useState<Partial<AuditSubmission> | null>(null);
  const [form, setForm] = React.useState<Partial<AuditSubmission>>({
    offer: 'Private Growth Consulting',
    audience: 'E-commerce business owners struggling with retention',
    leadSources: 'LinkedIn Organic, Facebook Ads',
    postSubmission: 'Sent to a generic thank you page',
    responseTime: '> 12 hours',
    qualification: 'None, anyone can book a call',
    salesProcess: '60-min discovery call',
    conversionRate: '15%',
    postPurchase: 'Standard onboarding emails',
    dropOffPoints: 'After discovery call before proposal'
  });

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    const analysis = await getAuditAnalysis(form as AuditSubmission);
    
    const fullAudit: AuditSubmission = {
      ...form as AuditSubmission,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      ...analysis
    };
    
    setCurrentResult(fullAudit);
    addAudit(fullAudit);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Funnel Audit</h1>
          <p className="text-[13px] text-[#a0a0a0] mt-1">Diagnose a funnel by answering the questions on the left. Your diagnosis report appears on the right. Save audits for future reference.</p>
        </div>
        <div className="flex items-center gap-4 h-10 px-4 bg-[#111111] border border-[#2e2e2e] rounded-sm font-mono text-[11px] text-[#6e6e6e] self-start md:self-auto">
          Audits Logged: {audits.length}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-12">
          {/* Audit Form Card */}
          <section className="card-container p-4 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.1]" />
            <h2 className="label-sm mb-8 flex items-center gap-2">
              <ShieldAlert size={14} className="text-[#f0f0f0]" /> Diagnosis Parameters
            </h2>
            <form onSubmit={handleAudit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label-sm">Offer Architecture</label>
                  <input 
                    className="input-standard w-full"
                    placeholder="e.g. Premium Consulting"
                    value={form.offer}
                    onChange={e => setForm({...form, offer: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-sm">Ideal Audience</label>
                  <input 
                    className="input-standard w-full"
                    placeholder="e.g. SaaS Founders"
                    value={form.audience}
                    onChange={e => setForm({...form, audience: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-sm">Lead Acquisition</label>
                  <input 
                    className="input-standard w-full"
                    placeholder="e.g. Paid Search, SEO"
                    value={form.leadSources}
                    onChange={e => setForm({...form, leadSources: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-sm">Avg. Reactivity</label>
                  <input 
                    className="input-standard w-full"
                    placeholder="e.g. Instant, 1h, 24h"
                    value={form.responseTime}
                    onChange={e => setForm({...form, responseTime: e.target.value})}
                  />
                </div>
                <div className="space-y-2 col-span-full">
                  <label className="label-sm">Qualification Logic</label>
                  <input 
                    className="input-standard w-full"
                    placeholder="e.g. Typeform + Calendly"
                    value={form.qualification}
                    onChange={e => setForm({...form, qualification: e.target.value})}
                  />
                </div>
                <div className="space-y-2 col-span-full">
                  <label className="label-sm">Observed Drop-off Points</label>
                  <input 
                    className="input-standard w-full"
                    placeholder="e.g. Calendly Booking Page"
                    value={form.dropOffPoints}
                    onChange={e => setForm({...form, dropOffPoints: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  disabled={isAnalyzing}
                  className="btn-action w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="animate-spin" size={14} />
                      Analyzing Sequence
                    </>
                  ) : (
                    <>
                      <BrainCircuit size={16} />
                      Run Diagnosis
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* Audit History List */}
          <section>
            <h3 className="label-sm mb-4 flex items-center gap-2">
              <History size={14} className="text-[#6e6e6e]" /> Historical Logs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {audits.map(audit => (
                <div 
                  key={audit.id} 
                  onClick={() => setCurrentResult(audit)} 
                  className={`card-container p-5 cursor-pointer group hover:border-white/20 ${currentResult?.id === audit.id ? 'border-white/30' : 'border-[#2e2e2e]'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[14px] font-bold text-white truncate w-32">{audit.offer}</span>
                    <span className="text-[10px] text-[#6e6e6e] font-mono">{new Date(audit.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1 bg-[#111111] border border-[#2e2e2e] rounded-full overflow-hidden">
                      <div className="h-full bg-white transition-all shadow-[0_0_8px_white/20]" style={{ width: `${audit.healthScore}%` }} />
                    </div>
                    <span className="text-[12px] text-white font-mono font-bold">{audit.healthScore}%</span>
                  </div>
                </div>
              ))}
              {audits.length === 0 && (
                <div className="col-span-full py-12 border border-dashed border-[#2e2e2e] rounded-sm flex flex-col items-center justify-center text-[#6e6e6e] bg-[#0f0f0f]">
                  <AlertTriangle size={24} className="mb-4 opacity-20" />
                  <p className="text-[12px] font-bold uppercase tracking-widest">Registry empty. Initialize diagnostic...</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="min-h-full">
          {currentResult ? (
            <motion.div
              key={currentResult.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="card-container p-6 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-[0.08]" />
                
                <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-12 pb-8 border-b border-[#2e2e2e]">
                  <div className="space-y-2">
                    <span className="label-sm opacity-50">Diagnostic Result</span>
                    <h2 className="text-2xl font-bold text-white tracking-tight uppercase leading-tight">{currentResult.offer}</h2>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="label-sm block mb-2 opacity-50">Health Coefficient</span>
                    <div className="text-4xl font-bold text-white tracking-tighter font-mono">{currentResult.healthScore}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                  <section className="space-y-8">
                    <div>
                      <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                        <AlertTriangle size={16} className="text-orange-500" /> Detected Architecture Leaks
                      </h4>
                      <div className="space-y-4">
                        {currentResult.leaks?.map((leak: any, i: number) => (
                          <div key={i} className="bg-[#111111] p-6 border border-[#2e2e2e] rounded-sm relative group">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white opacity-20" />
                            <div className="flex items-center gap-3 mb-4">
                              <span className={`text-[10px] px-2.5 py-1 rounded-sm font-bold uppercase tracking-widest ${
                                leak.priority === 'Critical' ? 'bg-white text-black' : 'bg-[#1a1a1a] text-[#a0a0a0] border border-[#2e2e2e]'
                              }`}>
                                {leak.priority} Priority
                              </span>
                            </div>
                            <p className="text-[14px] text-[#f0f0f0] font-medium leading-relaxed mb-4">{leak.issue}</p>
                            <div className="text-[13px] text-[#b0b0b0] bg-[#0f0f0f] p-4 rounded-sm border border-[#2e2e2e] italic">
                               <span className="text-white font-bold not-italic mr-2">Tactical Fix:</span> {leak.fix}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#111111] p-8 border border-[#2e2e2e] rounded-sm">
                      <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-3">
                        <TrendingUp size={16} className="text-green-500" /> Strategic Opportunity
                      </h4>
                      <p className="text-[14px] text-[#b0b0b0] italic leading-relaxed">
                        "{currentResult.consultingOpportunity}"
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[400px] md:min-h-[600px] flex flex-col items-center justify-center text-center p-8 md:p-12 card-container border-dashed">
              <div className="w-20 h-20 bg-[#1a1a1a] border border-[#2e2e2e] rounded-sm flex items-center justify-center mb-8 text-[#2e2e2e]">
                <BrainCircuit size={48} />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">Diagnostic Pending</h3>
              <p className="text-[14px] text-[#6e6e6e] mt-4 max-w-sm border-b border-[#2e2e2e] pb-8 mb-8">Initialize the funnel audit on the left panel to map potential conversion leaks and system failures.</p>
              <button 
                onClick={() => document.querySelector('form button')?.scrollIntoView({ behavior: 'smooth' })} 
                className="btn-standard"
              >
                Start Diagnosis
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
