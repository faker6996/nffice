import React, { useState } from 'react';
import { Card, Input } from '../ui';
import { MOCK_USERS } from '../../constants';
import { Mail, Phone, MapPin, Building2, Search } from 'lucide-react';

export const Colleague = () => {
  const [search, setSearch] = useState('');

  const filteredUsers = MOCK_USERS.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1">Colleague Directory</h1>
           <p className="text-zinc-400 text-sm">Find and connect with {MOCK_USERS.length} employees</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <Input 
            placeholder="Search by name or department..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="group relative overflow-hidden border-zinc-800 hover:border-zinc-700 transition-all duration-300">
             {/* Header Background */}
             <div className="h-24 bg-gradient-to-r from-zinc-900 to-zinc-800 group-hover:from-primary/10 group-hover:to-purple-900/20 transition-all" />
             
             <div className="px-6 pb-6">
               <div className="relative -mt-10 mb-4">
                 <div className="w-20 h-20 rounded-xl border-4 border-[#18181b] overflow-hidden bg-zinc-800 shadow-lg">
                   <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                 </div>
                 <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-[#18181b] bg-emerald-500`} title="Online" />
               </div>

               <div className="mb-4">
                 <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{user.name}</h3>
                 <div className="text-sm text-zinc-400">{user.role}</div>
               </div>

               <div className="space-y-2.5 text-sm text-zinc-500">
                 <div className="flex items-center gap-3">
                   <Building2 size={16} className="text-zinc-600" />
                   <span>{user.department}</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <MapPin size={16} className="text-zinc-600" />
                   <span>Hanoi HQ</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <Mail size={16} className="text-zinc-600" />
                   <span className="truncate">{user.email}</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <Phone size={16} className="text-zinc-600" />
                   <span>+84 987 654 321</span>
                 </div>
               </div>
             </div>

             <div className="px-6 py-4 bg-zinc-900/50 border-t border-zinc-800 flex gap-2">
                <button className="flex-1 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors">View Profile</button>
                <button className="flex-1 py-1.5 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded transition-colors">Message</button>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
