import React from 'react';
import { PROJECT_PLAN, MOCK_APPROVALS, MOCK_NOTICES, MOCK_USERS } from '../../constants';
import { Card, Button } from '../ui';
import { 
  Calendar, 
  AlertCircle, 
  FileText, 
  Plus,
  Zap,
  Briefcase,
  Users,
  Bell,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const Dashboard = () => {
  // Stats Calculation
  const taskStats = {
    total: PROJECT_PLAN.length,
    done: PROJECT_PLAN.filter(t => t.status === 'Done').length,
  };
  const taskProgress = (taskStats.done / taskStats.total) * 100;

  const pendingApprovals = MOCK_APPROVALS.filter(a => a.status === 'Pending').length;
  const unreadNotices = MOCK_NOTICES.filter(n => !n.isRead).length;

  const upcomingEvents = [
    { title: 'All Hands Meeting', time: '10:00 AM', date: 'FEB 15' },
    { title: 'Product Review', time: '2:00 PM', date: 'FEB 16' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h2 className="text-zinc-400 text-sm font-medium mb-1 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             System Online
           </h2>
           <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, Bach TV</h1>
        </div>
        <div className="flex gap-3">
            <Button variant="outline"><Calendar size={16} /> Schedule</Button>
            <Button><Plus size={16} /> New Request</Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {/* Project Progress */}
         <Card className="p-5 flex flex-col justify-between h-32 hover:border-zinc-700 transition-all bg-gradient-to-br from-zinc-900 to-zinc-900/50 group cursor-pointer">
            <div className="flex justify-between items-start">
               <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:text-purple-300 transition-colors"><Briefcase size={20} /></div>
               <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                 <ArrowRight size={10} className="-rotate-45" /> 12%
               </span>
            </div>
            <div>
               <div className="text-2xl font-bold text-white">{Math.round(taskProgress)}%</div>
               <div className="text-xs text-zinc-500 group-hover:text-zinc-400">Roadmap Completion</div>
               <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${taskProgress}%` }} />
               </div>
            </div>
         </Card>
         
         {/* Pending Approvals */}
         <Card className="p-5 flex flex-col justify-between h-32 hover:border-zinc-700 transition-all group cursor-pointer">
            <div className="flex justify-between items-start">
               <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 group-hover:text-amber-300 transition-colors"><AlertCircle size={20} /></div>
               {pendingApprovals > 0 && <span className="flex h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>}
            </div>
            <div>
               <div className="text-2xl font-bold text-white">{pendingApprovals}</div>
               <div className="text-xs text-zinc-500 group-hover:text-zinc-400">Pending Approvals</div>
            </div>
         </Card>

         {/* Unread Notices */}
         <Card className="p-5 flex flex-col justify-between h-32 hover:border-zinc-700 transition-all group cursor-pointer">
             <div className="flex justify-between items-start">
               <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors"><Bell size={20} /></div>
               {unreadNotices > 0 && <span className="text-xs font-bold text-blue-500">NEW</span>}
            </div>
            <div>
               <div className="text-2xl font-bold text-white">{unreadNotices}</div>
               <div className="text-xs text-zinc-500 group-hover:text-zinc-400">Unread Notices</div>
            </div>
         </Card>

         {/* Online Users */}
         <Card className="p-5 flex flex-col justify-between h-32 hover:border-zinc-700 transition-all group cursor-pointer">
            <div className="flex justify-between items-start">
               <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:text-emerald-300 transition-colors"><Users size={20} /></div>
               <div className="flex -space-x-2">
                  {MOCK_USERS.slice(0,3).map(u => (
                      <img key={u.id} src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full border border-zinc-900 object-cover" />
                  ))}
                  <div className="w-6 h-6 rounded-full border border-zinc-900 bg-zinc-800 flex items-center justify-center text-[8px] text-zinc-400 font-bold">+20</div>
               </div>
            </div>
            <div>
               <div className="text-2xl font-bold text-white">24</div>
               <div className="text-xs text-zinc-500 group-hover:text-zinc-400">Colleagues Online</div>
            </div>
         </Card>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Left Column (Main Feed & Tasks) */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* Active Projects Widget */}
            <Card className="p-0 overflow-hidden border-zinc-800">
               <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/30">
                  <div>
                    <h3 className="text-base font-bold text-white">Active Tasks</h3>
                    <p className="text-xs text-zinc-500">Tasks assigned to you for the current sprint</p>
                  </div>
                  <Button variant="ghost" className="text-xs h-8">View Roadmap</Button>
               </div>
               <div className="divide-y divide-zinc-800/50">
                  {PROJECT_PLAN.filter(t => t.status !== 'Done').slice(0, 4).map((task) => (
                      <div key={task.id} className="group p-4 hover:bg-zinc-900/50 transition-colors flex items-center gap-4 cursor-pointer">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${task.priority === 'High' ? 'bg-red-500' : 'bg-blue-500'}`} />
                          <div className="flex-1 min-w-0">
                             <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-zinc-200 truncate group-hover:text-primary transition-colors">{task.task}</span>
                                <span className="text-xs text-zinc-600 font-mono">{task.week}</span>
                             </div>
                             <p className="text-xs text-zinc-500 line-clamp-1">{task.description}</p>
                          </div>
                          <ChevronRight size={16} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                      </div>
                  ))}
               </div>
               <div className="p-3 bg-zinc-900/30 border-t border-zinc-800 text-center">
                  <button className="text-xs text-zinc-500 hover:text-primary transition-colors font-medium">Show all tasks</button>
               </div>
            </Card>

            {/* Recent Notices Widget */}
            <div className="space-y-4">
               <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider px-1">Latest Updates</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_NOTICES.slice(0, 2).map(notice => (
                     <Card key={notice.id} className="p-5 hover:border-zinc-600 transition-colors group cursor-pointer bg-gradient-to-br from-zinc-900/50 to-transparent">
                        <div className="flex items-start justify-between mb-3">
                           <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                              notice.category === 'HR' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                              notice.category === 'IT' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                              'bg-zinc-800 text-zinc-400 border-zinc-700'
                           }`}>
                              {notice.category}
                           </div>
                           <span className="text-xs text-zinc-500">{notice.date}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">{notice.title}</h4>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{notice.content}</p>
                     </Card>
                  ))}
               </div>
            </div>
         </div>

         {/* Right Column (Sidebar) */}
         <div className="space-y-6">
            
            {/* Quick Actions */}
            <Card className="p-5">
               <h3 className="text-sm font-bold text-white mb-4">Quick Actions</h3>
               <div className="grid grid-cols-2 gap-3">
                  {[
                      { icon: Zap, label: 'Quick Task', color: 'text-yellow-400', bg: 'hover:bg-yellow-400/10' },
                      { icon: Calendar, label: 'Meeting', color: 'text-blue-400', bg: 'hover:bg-blue-400/10' },
                      { icon: FileText, label: 'Report', color: 'text-purple-400', bg: 'hover:bg-purple-400/10' },
                      { icon: Users, label: 'Invite', color: 'text-emerald-400', bg: 'hover:bg-emerald-400/10' },
                  ].map((action, i) => (
                      <button key={i} className={`flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 transition-all gap-2 ${action.bg} hover:border-zinc-700`}>
                          <action.icon size={20} className={action.color} />
                          <span className="text-xs font-medium text-zinc-300">{action.label}</span>
                      </button>
                  ))}
               </div>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-5">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-sm font-bold text-white">Upcoming Events</h3>
                   <button className="text-zinc-500 hover:text-white transition-colors"><Calendar size={14} /></button>
                </div>
                <div className="space-y-4">
                   {upcomingEvents.map((evt, i) => (
                       <div key={i} className="flex gap-3 items-center group cursor-pointer">
                           <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-zinc-600 transition-colors flex flex-col items-center justify-center text-zinc-400 shrink-0">
                               <span className="text-[9px] font-bold uppercase text-zinc-500">{evt.date.split(' ')[0]}</span>
                               <span className="text-xs font-bold text-white">{evt.date.split(' ')[1]}</span>
                           </div>
                           <div className="min-w-0">
                               <div className="text-sm font-medium text-zinc-200 truncate group-hover:text-primary transition-colors">{evt.title}</div>
                               <div className="text-xs text-zinc-500">{evt.time}</div>
                           </div>
                       </div>
                   ))}
                </div>
                <Button variant="outline" className="w-full mt-5 text-xs h-8 border-dashed">View Full Calendar</Button>
            </Card>

             {/* Resources/Links */}
             <div className="space-y-2">
                <h3 className="px-1 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Internal Resources</h3>
                {['Employee Handbook', 'IT Helpdesk', 'Branding Assets'].map((link, i) => (
                   <button key={i} className="w-full text-left px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-between group">
                      {link}
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-600" />
                   </button>
                ))}
             </div>
         </div>
      </div>
    </div>
  );
};
