import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileCheck, 
  Bell, 
  Users, 
  Settings, 
  LogOut, 
  Search,
  BookOpen,
  CalendarClock,
  UserCog,
  Building2,
  Shield,
  Key,
  ScrollText,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser: User;
}

const NavItem = ({ icon: Icon, label, id, active, onClick, collapsed, className = '' }: any) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${className}
      ${active 
        ? 'bg-primary/10 text-primary border border-primary/20' 
        : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
      }`}
    title={collapsed ? label : undefined}
  >
    <Icon size={20} className={`shrink-0 ${active ? 'text-primary' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
    {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
    {active && !collapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />}
  </button>
);

const NavGroup: React.FC<{ label: string; children: React.ReactNode; collapsed: boolean }> = ({ label, children, collapsed }) => {
  if (collapsed) {
    return (
      <div className="py-2 border-t border-zinc-800/50 mt-2">
        {children}
      </div>
    );
  }
  return (
    <div className="py-2 mt-2">
      <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
        {label}
      </div>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, currentUser }) => {
  const [collapsed, setCollapsed] = useState(false);

  // Main Menu Items
  const mainItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'talkbox', label: 'Talkbox', icon: MessageSquare },
    { id: 'approvals', label: 'Approvals', icon: FileCheck },
    { id: 'notice', label: 'Notice', icon: Bell },
    { id: 'regulations', label: 'Regulations', icon: BookOpen },
    { id: 'attendance', label: 'Attendance', icon: CalendarClock },
  ];

  // Management Group
  const managementItems = [
    { id: 'users', label: 'Users', icon: UserCog },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'colleague', label: 'Colleague', icon: Users },
  ];

  // Settings Group
  const settingsItems = [
    { id: 'roles', label: 'Roles', icon: Shield },
    { id: 'permissions', label: 'Permissions', icon: Key },
    { id: 'rules', label: 'Rules', icon: ScrollText },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 flex font-sans selection:bg-primary/30 selection:text-white">
      {/* Sidebar */}
      <aside 
        className={`${collapsed ? 'w-20' : 'w-64'} fixed h-screen z-40 bg-zinc-950/80 backdrop-blur-md border-r border-border transition-all duration-300 flex flex-col overflow-y-auto overflow-x-hidden`}
      >
        <div className="h-16 shrink-0 flex items-center px-6 border-b border-border/50 sticky top-0 bg-zinc-950/90 z-10 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-white font-bold text-xl tracking-tight">
             {/* N-Logo SVG */}
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-purple-400 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white w-5 h-5">
                 <path d="M4 20h4l12-16h-4L4 20z" />
               </svg>
            </div>
            {!collapsed && <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 animate-in fade-in duration-300">NFFICE</span>}
          </div>
        </div>

        <div className="flex-1 py-4 px-3 space-y-1">
          {mainItems.map((item) => (
            <NavItem 
              key={item.id}
              {...item}
              active={activeTab === item.id}
              onClick={onTabChange}
              collapsed={collapsed}
            />
          ))}

          <NavGroup label="Management" collapsed={collapsed}>
            {managementItems.map((item) => (
              <NavItem 
                key={item.id}
                {...item}
                active={activeTab === item.id}
                onClick={onTabChange}
                collapsed={collapsed}
              />
            ))}
          </NavGroup>

          <NavGroup label="Settings" collapsed={collapsed}>
            {settingsItems.map((item) => (
              <NavItem 
                key={item.id}
                {...item}
                active={activeTab === item.id}
                onClick={onTabChange}
                collapsed={collapsed}
              />
            ))}
          </NavGroup>
        </div>

        <div className="p-3 border-t border-border/50 sticky bottom-0 bg-zinc-950/90 backdrop-blur-sm">
          <div className="flex items-center gap-2">
             {!collapsed ? (
                <>
                  <button 
                     onClick={() => onTabChange('profile')}
                     className="flex items-center gap-3 flex-1 p-2 rounded-lg hover:bg-white/5 text-left transition-colors group"
                  >
                     <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700 shrink-0 group-hover:border-primary transition-colors">
                        <img src={currentUser.avatar} alt="User" className="w-full h-full object-cover" />
                     </div>
                     <div className="min-w-0">
                        <div className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">{currentUser.name}</div>
                        <div className="text-xs text-zinc-500 truncate">{currentUser.role}</div>
                     </div>
                  </button>
                  <button 
                     onClick={() => setCollapsed(true)}
                     className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-zinc-200"
                  >
                     <ChevronRight size={18} className="rotate-180" />
                  </button>
                </>
             ) : (
                <button 
                   onClick={() => setCollapsed(false)}
                   className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                >
                   <ChevronRight size={18} />
                </button>
             )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Header */}
        <header className="h-16 sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-md border-b border-border/50 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1">
             <div className="relative w-full max-w-md hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
               <input 
                 type="text" 
                 placeholder="Search colleagues, documents, or posts..." 
                 className="w-full bg-surface border border-border/50 rounded-full pl-10 pr-4 py-1.5 text-sm text-zinc-300 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
               />
             </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-zinc-950"></span>
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
};
