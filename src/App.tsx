/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { RoadmapView } from './components/views/RoadmapView';
import { LibraryView } from './components/views/LibraryView';
import { AuditView } from './components/views/AuditView';
import { ContentView } from './components/views/ContentView';
import { 
  ReverseEngineeringView, 
  CaseStudiesView, 
  ConsultingProductsView, 
  TrackerView 
} from './components/views/ExtraViews';
import { AnimatePresence, motion } from 'motion/react';
import { OperatorProvider } from './context/OperatorContext';

export default function App() {
  const [activeView, setActiveView] = React.useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'roadmap': return <RoadmapView />;
      case 'library': return <LibraryView />;
      case 'audit': return <AuditView />;
      case 'content': return <ContentView />;
      case 'reverse': return <ReverseEngineeringView />;
      case 'cases': return <CaseStudiesView />;
      case 'products': return <ConsultingProductsView />;
      case 'tracker': return <TrackerView />;
      default: return <DashboardView />;
    }
  };

  return (
    <OperatorProvider>
      <div className="flex h-screen bg-[#0f0f0f] text-[#f0f0f0] selection:bg-white selection:text-black font-sans overflow-hidden">
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
        
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Header - High Density Pattern */}
          <header className="h-14 border-b border-[#2e2e2e] flex items-center justify-between px-6 bg-[#0f0f0f]/80 backdrop-blur shrink-0 md:bg-black/50">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-[#888888] hover:text-white transition-colors"
              >
                <div className="w-5 h-0.5 bg-current mb-1" />
                <div className="w-5 h-0.5 bg-current mb-1" />
                <div className="w-5 h-0.5 bg-current" />
              </button>
              <div className="flex items-center gap-2 text-[#6e6e6e] font-medium text-[13px]">
                <span className="hidden md:inline opacity-40">/</span>
                <span className="capitalize font-bold text-[#f0f0f0] md:text-[#6e6e6e] md:font-medium">{activeView}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] text-[#6e6e6e] font-mono tracking-tight uppercase">op_001</p>
              </div>
              <button className="w-8 h-8 rounded bg-[#1f1f1f] border border-[#3a3a3a] flex items-center justify-center text-[#888888] hover:text-white transition-colors">
                 <div className="w-1.5 h-1.5 bg-[#6e6e6e] rounded-full" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#0f0f0f] pb-24 md:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="min-h-full"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Info Bar */}
          <footer className="h-10 border-t border-[#2e2e2e] px-6 flex items-center justify-between bg-black text-[#6e6e6e] shrink-0">
            <div className="flex gap-4 sm:gap-8 text-[11px] font-medium overflow-hidden">
              <span className="flex items-center gap-2 whitespace-nowrap"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> <span className="hidden xs:inline">Systems:</span> Active</span>
              <span className="flex items-center gap-2 opacity-60 whitespace-nowrap">DB: <span className="hidden xs:inline">Connected</span><span className="xs:hidden">OK</span></span>
            </div>
            <div className="text-[10px] font-mono opacity-30 uppercase tracking-widest whitespace-nowrap ml-4">© 2026 Growth Lab</div>
          </footer>
        </main>
      </div>
    </OperatorProvider>
  );
}

