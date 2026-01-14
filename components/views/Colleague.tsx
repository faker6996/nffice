
import React, { useState, useMemo } from 'react';
import { Card, Button, Input, Badge } from '../ui';
import { MOCK_USERS } from '../../constants';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Search, 
  LayoutGrid, 
  List, 
  Filter,
  MoreHorizontal,
  MessageSquare,
  Github,
  Linkedin,
  Globe,
  CheckCircle2,
  Clock
} from 'lucide-react';

// --- Extended Mock Data & Types for UI ---
// Adding extra visual data that wasn't in the base user type for a richer UI
interface ColleagueProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  email: string;
  status: 'online' | 'away' | 'offline';
  skills: string[];
  location: string;
}

// Generate richer mock data based on existing MOCK_USERS
const EXTENDED_USERS: ColleagueProfile[] = MOCK_USERS.map((u, i) => ({
  ...u,
  status: i === 0 ? 'online' : i === 1 ? 'away' : i === 2 ? 'online' : 'offline',
  location: 'Hanoi HQ',
  skills: 
    u.department === 'Engineering' ? ['React', 'Node.js', 'System Design'] :
    u.department === 'Product' ? ['Product Strategy', 'Figma', 'Agile'] :
    u.department === 'Quality' ? ['Automation', 'Jest', 'Cypress'] : ['Management', 'HR'],
}));

export const Colleague = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const departments = ['All', ...Array.from(new Set(EXTENDED_USERS.map(u => u.department)))];

  const filteredUsers = useMemo(() => {
    return EXTENDED_USERS.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            u.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = deptFilter === 'All' || u.department === deptFilter;
      const matchesStatus = statusFilter === 'All' || 
                            (statusFilter === 'Online' && u.status === 'online') ||
                            (statusFilter === 'Offline' && u.status !== 'online');
      
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [searchTerm, deptFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]';
      case 'away': return 'bg-amber-500';
      default: return 'bg-zinc-500';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-300">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0">
         <div>
            <h1 className="text-2xl font-bold text-white mb-1">Colleagues</h1>
            <p className="text-zinc-400 text-sm">Discover and connect with the team.</p>
         </div>

         <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* View Toggles */}
            <div className="bg-zinc-900 p-1 rounded-lg border border-zinc-800 flex gap-1">
               <button 
                 onClick={() => setViewMode('grid')}
                 className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                  <LayoutGrid size={18} />
               </button>
               <button 
                 onClick={() => setViewMode('list')}
                 className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                  <List size={18} />
               </button>
            </div>

            {/* Search */}
            <div className="relative flex-1 md:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
               <Input 
                  placeholder="Search name, role..." 
                  className="pl-9 h-10 bg-zinc-900/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>

            <Button variant="outline" className="h-10 px-3"><Filter size={16} /> Filter</Button>
         </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
         
         {/* Sidebar Filters (Desktop) */}
         <div className="hidden lg:block w-64 shrink-0 space-y-6 overflow-y-auto pr-2 scrollbar-thin">
            <Card className="p-4 space-y-4 bg-zinc-900/20 border-zinc-800/50">
               <div>
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Department</h3>
                  <div className="space-y-1">
                     {departments.map(dept => (
                        <button
                           key={dept}
                           onClick={() => setDeptFilter(dept)}
                           className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between items-center ${
                              deptFilter === dept 
                              ? 'bg-primary/10 text-primary font-medium border border-primary/20' 
                              : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                           }`}
                        >
                           {dept}
                           {dept === 'All' && <span className="text-xs opacity-50">{EXTENDED_USERS.length}</span>}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="pt-4 border-t border-zinc-800">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Availability</h3>
                  <div className="space-y-1">
                     {['All', 'Online', 'Offline'].map(status => (
                        <div key={status} className="flex items-center gap-2">
                           <input 
                              type="radio" 
                              name="status" 
                              id={`status-${status}`}
                              checked={statusFilter === status}
                              onChange={() => setStatusFilter(status)}
                              className="accent-primary cursor-pointer" 
                           />
                           <label htmlFor={`status-${status}`} className="text-sm text-zinc-300 cursor-pointer select-none">{status}</label>
                        </div>
                     ))}
                  </div>
               </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-4 bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/10">
               <h3 className="text-sm font-bold text-white mb-1">New Hires</h3>
               <p className="text-xs text-zinc-500 mb-3">Welcome our new members this week.</p>
               <div className="flex -space-x-2">
                  {EXTENDED_USERS.slice(0, 3).map(u => (
                     <img key={u.id} src={u.avatar} className="w-8 h-8 rounded-full border-2 border-zinc-900" alt="" />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[10px] text-zinc-400 font-bold">+2</div>
               </div>
            </Card>
         </div>

         {/* Main Content Area */}
         <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
            {viewMode === 'grid' ? (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredUsers.map(user => (
                     <div key={user.id} className="group relative bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 backdrop-blur-sm flex flex-col">
                        {/* Decorative Header Pattern */}
                        <div className="h-24 bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-950 relative overflow-hidden">
                           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                           <div className="absolute top-2 right-2 flex gap-1">
                              <button className="p-1.5 bg-black/20 backdrop-blur rounded hover:bg-white/10 text-white transition-colors" title="Message">
                                 <MessageSquare size={14} />
                              </button>
                              <button className="p-1.5 bg-black/20 backdrop-blur rounded hover:bg-white/10 text-white transition-colors">
                                 <MoreHorizontal size={14} />
                              </button>
                           </div>
                        </div>

                        {/* Avatar & Status */}
                        <div className="px-6 relative flex-1 flex flex-col items-center -mt-10">
                           <div className="relative mb-3">
                              <div className="w-20 h-20 rounded-2xl p-1 bg-zinc-900 shadow-lg">
                                 <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-xl" />
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-zinc-900 ${getStatusColor(user.status)}`} />
                           </div>

                           <div className="text-center mb-4">
                              <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors flex items-center justify-center gap-1">
                                 {user.name}
                                 {user.id === 'u1' && <Badge color="purple" >Admin</Badge>}
                              </h3>
                              <p className="text-sm text-zinc-400 font-medium">{user.role}</p>
                              <p className="text-xs text-zinc-500 mt-0.5">{user.department}</p>
                           </div>

                           {/* Skills Chips */}
                           <div className="flex flex-wrap justify-center gap-1.5 mb-6 w-full">
                              {user.skills.map((skill, i) => (
                                 <span key={i} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                                    {skill}
                                 </span>
                              ))}
                           </div>

                           {/* Spacer to push footer down */}
                           <div className="flex-1" />

                           {/* Contact Grid */}
                           <div className="w-full grid grid-cols-2 gap-2 mb-4">
                              <a href={`mailto:${user.email}`} className="flex items-center justify-center gap-2 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs transition-colors border border-transparent hover:border-zinc-700">
                                 <Mail size={14} /> Email
                              </a>
                              <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs transition-colors border border-transparent hover:border-zinc-700">
                                 <Phone size={14} /> Call
                              </button>
                           </div>
                        </div>

                        {/* Footer Socials */}
                        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center text-zinc-500">
                           <div className="flex gap-3">
                              <Github size={16} className="hover:text-white cursor-pointer transition-colors" />
                              <Linkedin size={16} className="hover:text-blue-400 cursor-pointer transition-colors" />
                              <Globe size={16} className="hover:text-emerald-400 cursor-pointer transition-colors" />
                           </div>
                           <span className="text-[10px] flex items-center gap-1">
                              <MapPin size={10} /> {user.location}
                           </span>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               /* List View Layout */
               <div className="space-y-2">
                  {filteredUsers.map(user => (
                     <div key={user.id} className="group flex items-center gap-4 p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl hover:border-primary/30 hover:bg-zinc-900/80 transition-all cursor-pointer">
                        <div className="relative shrink-0">
                           <img src={user.avatar} className="w-12 h-12 rounded-lg object-cover bg-zinc-800" alt="" />
                           <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-zinc-900 ${getStatusColor(user.status)}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                           <div className="md:col-span-1">
                              <div className="font-bold text-white text-sm group-hover:text-primary transition-colors">{user.name}</div>
                              <div className="text-xs text-zinc-500">{user.role}</div>
                           </div>
                           
                           <div className="hidden md:block">
                              <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                                 <Building2 size={12} /> {user.department}
                              </div>
                           </div>

                           <div className="hidden md:block">
                              <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                                 <Mail size={12} /> {user.email}
                              </div>
                           </div>

                           <div className="flex justify-end gap-2">
                              <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700">
                                 <MessageSquare size={16} />
                              </Button>
                              <Button variant="outline" className="h-8 text-xs">View Profile</Button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {filteredUsers.length === 0 && (
               <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                  <Search size={48} className="mb-4 opacity-20" />
                  <p>No colleagues found matching your filters.</p>
                  <Button variant="ghost" className="mt-2 text-primary" onClick={() => {setSearchTerm(''); setDeptFilter('All');}}>Clear Filters</Button>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};
