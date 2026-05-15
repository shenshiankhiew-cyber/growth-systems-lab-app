import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Library, 
  ClipboardCheck, 
  PenTool, 
  Search, 
  BookOpen, 
  Briefcase, 
  CheckCircle2,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'roadmap', label: 'Roadmap', icon: Map },
  { id: 'library', label: 'Knowledge Library', icon: Library },
  { id: 'audit', label: 'Funnel Audit', icon: ClipboardCheck },
  { id: 'content', label: 'Content Lab', icon: PenTool },
  { id: 'reverse', label: 'Reverse Engineering', icon: Search },
  { id: 'cases', label: 'Case Studies', icon: BookOpen },
  { id: 'products', label: 'Consulting Products', icon: Briefcase },
  { id: 'tracker', label: 'Learning Tracker', icon: CheckCircle2 },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isMobileOpen, onCloseMobile }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <>
      {/* Mobile Overlay Background */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? 64 : 240,
          x: isMobileOpen ? 0 : (window.innerWidth < 768 ? -240 : 0)
        }}
        className={`h-screen bg-black border-r border-[#2e2e2e] flex flex-col shrink-0 transition-all duration-300 ease-in-out fixed md:relative z-[70] ${
          isMobileOpen ? 'w-[280px] shadow-2xl' : 'w-auto'
        } ${!isMobileOpen && 'md:translate-x-0'}`}
      >
        <div className="p-6 flex items-center justify-between">
          {( !isCollapsed || isMobileOpen ) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="text-white font-bold text-xs tracking-[0.25em] uppercase">
                Growth Lab
              </h1>
              <p className="text-[9px] text-[#6e6e6e] mt-1 uppercase font-mono tracking-tighter text-nowrap">v2.0 OPERATOR COMMAND</p>
            </motion.div>
          )}
          <button 
            onClick={() => isMobileOpen ? onCloseMobile?.() : setIsCollapsed(!isCollapsed)}
            className="p-1 text-[#888888] hover:text-white transition-colors h-[44px] w-[44px] flex items-center justify-center rounded-sm"
          >
            {isMobileOpen ? <CheckCircle2 size={18} className="rotate-45" /> : (isCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />)}
          </button>
        </div>

        <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  onCloseMobile?.();
                }}
                className={`w-full flex items-center gap-3 px-3 min-h-[44px] rounded-sm transition-all group relative ${
                  isActive 
                    ? 'nav-item-active' 
                    : 'nav-item-inactive'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-[#6e6e6e] group-hover:text-zinc-400'} />
                {( !isCollapsed || isMobileOpen ) && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[14px] md:text-[12px] whitespace-nowrap font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#2e2e2e]">
          <div className={`flex flex-col gap-2 ${isCollapsed && !isMobileOpen ? 'items-center' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
              {( !isCollapsed || isMobileOpen ) && <span className="text-[11px] text-[#6e6e6e] font-bold uppercase tracking-widest">Operator Online</span>}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
