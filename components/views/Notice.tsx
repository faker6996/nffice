import React, { useState } from 'react';
import { Card, Button, Badge, Input } from '../ui';
import { MOCK_NOTICES } from '../../constants';
import { Search, Bell, Filter, ChevronRight, FileText, Megaphone } from 'lucide-react';

export const Notice = () => {
  const [filter, setFilter] = useState('All');
  
  const filteredNotices = filter === 'All' 
    ? MOCK_NOTICES 
    : MOCK_NOTICES.filter(n => n.category === filter);

  const categories = ['All', 'HR', 'IT', 'General', 'Finance'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1">Company Notices</h1>
           <p className="text-zinc-400 text-sm">Stay updated with the latest news and regulations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Admin View</Button>
          <Button>
             <Megaphone size={16} /> New Notice
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                filter === cat 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
           <Input placeholder="Search notices..." className="pl-9 py-1.5 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          {filteredNotices.map((notice) => (
            <Card key={notice.id} className={`p-5 hover:border-zinc-700 transition-all cursor-pointer group relative overflow-hidden ${!notice.isRead ? 'bg-zinc-900/80 border-l-4 border-l-primary' : ''}`}>
              {!notice.isRead && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
              )}
              
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                   <Badge color={notice.category === 'IT' ? 'blue' : notice.category === 'HR' ? 'purple' : 'yellow'}>
                     {notice.category}
                   </Badge>
                   {notice.priority === 'High' && (
                     <span className="text-xs font-medium text-red-400 flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded">
                       <Bell size={10} /> Important
                     </span>
                   )}
                </div>
                <span className="text-xs text-zinc-500 font-mono">{notice.date}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-zinc-200 mb-2 group-hover:text-primary transition-colors">
                {notice.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                {notice.content}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                 <div className="text-xs text-zinc-500">
                   Posted by <span className="text-zinc-300">{notice.author}</span>
                 </div>
                 <button className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
                   Read more <ChevronRight size={12} />
                 </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
           <Card className="p-4 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <FileText size={18} />
                 </div>
                 <div className="font-semibold text-white">Regulations</div>
              </div>
              <p className="text-xs text-zinc-400 mb-4">Quick access to company policies and regulation documents.</p>
              <div className="space-y-2">
                 {['Code of Conduct', 'IT Security Policy', 'Leave Policy'].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-zinc-900/50 hover:bg-zinc-800 transition-colors cursor-pointer text-xs">
                       <span className="text-zinc-300">{doc}</span>
                       <span className="text-zinc-600">PDF</span>
                    </div>
                 ))}
              </div>
              <Button variant="ghost" className="w-full mt-3 text-xs">View All Regulations</Button>
           </Card>

           <Card className="p-4">
              <h4 className="text-sm font-semibold text-zinc-200 mb-3">Pinned Notices</h4>
               <div className="space-y-3">
                  <div className="p-3 rounded bg-zinc-900/50 border border-zinc-800">
                     <div className="text-xs text-primary font-medium mb-1">HR • High Priority</div>
                     <div className="text-sm text-zinc-300 font-medium">Year-end Performance Review</div>
                  </div>
               </div>
           </Card>
        </div>
      </div>
    </div>
  );
};
