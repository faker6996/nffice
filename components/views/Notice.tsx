
import React, { useState, useMemo } from 'react';
import { Card, Button, Badge, Input, Modal } from '../ui';
import { MOCK_NOTICES, MOCK_USERS } from '../../constants';
import { Notice as NoticeType } from '../../types';
import { 
  Search, 
  Megaphone, 
  Plus, 
  User, 
  AlertTriangle, 
  Paperclip,
  Share2,
  Printer,
  MoreVertical,
  Inbox,
  Clock
} from 'lucide-react';

export const Notice = () => {
  const currentUser = MOCK_USERS[0]; // Simulating logged-in user
  const isAdmin = currentUser.role.includes('Admin');

  const [selectedId, setSelectedId] = useState<string>(MOCK_NOTICES[0]?.id);
  const [filterTab, setFilterTab] = useState<'all' | 'unread' | 'important'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Create Form State
  const [formData, setFormData] = useState<Partial<NoticeType>>({
    title: '',
    category: 'General',
    priority: 'Normal',
    content: ''
  });

  const filteredNotices = useMemo(() => {
    return MOCK_NOTICES.filter(notice => {
      const matchSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          notice.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchTab = true;
      if (filterTab === 'unread') matchTab = !notice.isRead;
      if (filterTab === 'important') matchTab = notice.priority === 'High';

      return matchSearch && matchTab;
    });
  }, [filterTab, searchTerm]);

  const selectedNotice = MOCK_NOTICES.find(n => n.id === selectedId);

  const handleCreate = () => {
    console.log("Creating notice:", formData);
    setIsCreateModalOpen(false);
    setFormData({ title: '', category: 'General', priority: 'Normal', content: '' });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-300">
      
      {/* Header Area */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
             <Megaphone className="text-primary" size={24} /> Notices & Announcements
           </h1>
           <p className="text-zinc-400 text-sm">Stay updated with the latest company news.</p>
        </div>
        
        {isAdmin && (
          <Button onClick={() => setIsCreateModalOpen(true)} className="shadow-lg shadow-primary/20">
             <Plus size={16} /> Compose Notice
          </Button>
        )}
      </div>

      <div className="flex flex-1 gap-6 min-h-0 overflow-hidden">
        
        {/* Left Pane: List */}
        <Card className="w-full lg:w-[400px] flex flex-col p-0 border-zinc-800 bg-zinc-900/30 flex-shrink-0">
            {/* Search & Tabs */}
            <div className="p-4 border-b border-zinc-800 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <input 
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-primary/50 transition-all placeholder:text-zinc-600"
                        placeholder="Search notices..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex p-1 bg-zinc-950 rounded-lg border border-zinc-800">
                    {[
                        { id: 'all', label: 'All' },
                        { id: 'unread', label: 'Unread' },
                        { id: 'important', label: 'Important' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setFilterTab(tab.id as any)}
                            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                                filterTab === tab.id 
                                ? 'bg-zinc-800 text-white shadow-sm' 
                                : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* List Items */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
                <div className="divide-y divide-zinc-800/50">
                    {filteredNotices.length > 0 ? filteredNotices.map(notice => (
                        <div 
                            key={notice.id}
                            onClick={() => setSelectedId(notice.id)}
                            className={`p-4 cursor-pointer transition-all hover:bg-zinc-800/30 border-l-2 ${
                                selectedId === notice.id 
                                ? 'bg-zinc-800/50 border-l-primary' 
                                : notice.priority === 'High' 
                                    ? 'border-l-red-500/50' 
                                    : !notice.isRead 
                                        ? 'border-l-blue-500/50'
                                        : 'border-l-transparent'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <Badge color={
                                    notice.category === 'HR' ? 'purple' : 
                                    notice.category === 'IT' ? 'blue' : 
                                    notice.category === 'Finance' ? 'green' : 'yellow'
                                }>
                                    {notice.category}
                                </Badge>
                                <span className="text-[10px] text-zinc-500 whitespace-nowrap ml-2">{notice.date}</span>
                            </div>
                            <h3 className={`text-sm font-bold mb-1 line-clamp-1 ${!notice.isRead ? 'text-white' : 'text-zinc-300'}`}>
                                {notice.title}
                            </h3>
                            <p className="text-xs text-zinc-500 line-clamp-2">
                                {notice.content}
                            </p>
                        </div>
                    )) : (
                        <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
                            <Inbox size={32} className="mb-2 opacity-20" />
                            <p className="text-xs">No notices found</p>
                        </div>
                    )}
                </div>
            </div>
        </Card>

        {/* Right Pane: Reading View */}
        <Card className="flex-1 p-0 flex flex-col border-zinc-800 overflow-hidden bg-zinc-900/30 relative">
            {selectedNotice ? (
                <>
                    {/* Reading Header */}
                    <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-start">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-3">
                                <Badge color={
                                    selectedNotice.category === 'HR' ? 'purple' : 
                                    selectedNotice.category === 'IT' ? 'blue' : 
                                    selectedNotice.category === 'Finance' ? 'green' : 'yellow'
                                }>
                                    {selectedNotice.category}
                                </Badge>
                                {selectedNotice.priority === 'High' && (
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                                        <AlertTriangle size={10} /> HIGH PRIORITY
                                    </span>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
                                {selectedNotice.title}
                            </h2>
                            <div className="flex items-center gap-4 text-sm text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 border border-zinc-700">
                                        <User size={14} />
                                    </div>
                                    <span className="text-zinc-300">{selectedNotice.author}</span>
                                </div>
                                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                <div className="flex items-center gap-1.5">
                                    <Clock size={14} /> {selectedNotice.date}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white" title="Print">
                                <Printer size={16} />
                            </Button>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white" title="Share">
                                <Share2 size={16} />
                            </Button>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
                                <MoreVertical size={16} />
                            </Button>
                        </div>
                    </div>

                    {/* Reading Content */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                         <div className="prose prose-invert prose-sm max-w-none text-zinc-300">
                            {selectedNotice.content.split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4 leading-relaxed text-base">
                                    {paragraph}
                                </p>
                            ))}
                            <p className="mb-4 leading-relaxed text-base">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p className="mb-4 leading-relaxed text-base">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                         </div>

                         {/* Attachments Area */}
                         <div className="mt-8 pt-6 border-t border-zinc-800">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Paperclip size={14} /> Attachments (2)
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                <div className="group flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-lg cursor-pointer transition-all min-w-[200px]">
                                    <div className="w-8 h-8 rounded bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                                        <div className="text-[10px] font-bold">PDF</div>
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium text-zinc-300 truncate group-hover:text-primary transition-colors">Policy_Update_v2.pdf</div>
                                        <div className="text-xs text-zinc-500">2.4 MB</div>
                                    </div>
                                </div>
                                <div className="group flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-lg cursor-pointer transition-all min-w-[200px]">
                                    <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                                        <div className="text-[10px] font-bold">DOC</div>
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium text-zinc-300 truncate group-hover:text-primary transition-colors">Meeting_Notes.docx</div>
                                        <div className="text-xs text-zinc-500">1.1 MB</div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                    <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                        <Inbox size={32} className="opacity-50" />
                    </div>
                    <p className="text-sm">Select a notice from the list to read.</p>
                </div>
            )}
        </Card>

      </div>

      {/* --- Create Modal --- */}
      <Modal
         isOpen={isCreateModalOpen}
         onClose={() => setIsCreateModalOpen(false)}
         title="Compose Announcement"
         footer={
            <>
               <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Discard</Button>
               <Button onClick={handleCreate} disabled={!formData.title || !formData.content}>
                 <Megaphone size={16} /> Publish Now
               </Button>
            </>
         }
      >
         <div className="space-y-5">
            <div className="space-y-2">
               <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Subject Line</label>
               <Input 
                  placeholder="e.g. Important: Office Maintenance Schedule" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="font-medium"
               />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Category</label>
                  <select 
                     className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-primary appearance-none"
                     value={formData.category}
                     onChange={e => setFormData({...formData, category: e.target.value as any})}
                  >
                     <option>General</option>
                     <option>HR</option>
                     <option>IT</option>
                     <option>Finance</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Priority Level</label>
                  <select 
                     className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-primary appearance-none"
                     value={formData.priority}
                     onChange={e => setFormData({...formData, priority: e.target.value as any})}
                  >
                     <option value="Normal">Normal</option>
                     <option value="High">High Priority</option>
                  </select>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Message Content</label>
               <textarea 
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-primary min-h-[200px] resize-none leading-relaxed"
                  placeholder="Type your announcement details here..."
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
               />
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex items-start gap-3">
               <div className="pt-0.5"><AlertTriangle size={16} className="text-amber-500" /></div>
               <div>
                  <h4 className="text-sm font-bold text-zinc-200">Notification Settings</h4>
                  <p className="text-xs text-zinc-500 mb-2">Choose how employees will be notified about this update.</p>
                  <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="accent-primary" defaultChecked />
                          <span className="text-sm text-zinc-300">Send push notification to mobile app</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="accent-primary" />
                          <span className="text-sm text-zinc-300">Send summary email to all staff</span>
                      </label>
                  </div>
               </div>
            </div>
         </div>
      </Modal>

    </div>
  );
};
