
import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  MessageSquare, 
  FileCheck, 
  Shield, 
  Zap, 
  Clock,
  MoreHorizontal,
  Settings,
  Trash2
} from 'lucide-react';
import { Button } from '../ui'; // Assuming Button is exported from ui.tsx

// Mock Notification Types
interface NotificationItem {
  id: string;
  type: 'message' | 'approval' | 'system' | 'mention' | 'alert';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  avatar?: string; // For users
  priority?: 'high' | 'normal';
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    type: 'approval',
    title: 'New Expense Request',
    description: 'Bach TV requested approval for "Q1 Server Costs".',
    time: '2 mins ago',
    isRead: false,
    avatar: 'https://picsum.photos/seed/bach/200/200',
    priority: 'high'
  },
  {
    id: 'n2',
    type: 'mention',
    title: 'Mentioned in Talkbox',
    description: 'Duc PT mentioned you in "Database Migration Plan".',
    time: '1 hour ago',
    isRead: false,
    avatar: 'https://picsum.photos/seed/duc/200/200'
  },
  {
    id: 'n3',
    type: 'system',
    title: 'System Maintenance',
    description: 'Scheduled downtime on Sunday 2:00 AM - 4:00 AM.',
    time: '3 hours ago',
    isRead: true,
    priority: 'high'
  },
  {
    id: 'n4',
    type: 'message',
    title: 'Project Update',
    description: 'Anh NV commented on the UI design task.',
    time: '5 hours ago',
    isRead: true,
    avatar: 'https://picsum.photos/seed/anh/200/200'
  },
  {
    id: 'n5',
    type: 'alert',
    title: 'Password Expiry',
    description: 'Your password will expire in 3 days. Please update it.',
    time: '1 day ago',
    isRead: true
  }
];

export const NotificationsPopover = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'mentions'>('all');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.isRead;
    if (activeTab === 'mentions') return n.type === 'mention';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (n: NotificationItem) => {
    if (n.avatar) {
       return (
         <div className="relative">
            <img src={n.avatar} alt="" className="w-10 h-10 rounded-full border border-zinc-700 object-cover" />
            <div className="absolute -bottom-1 -right-1 bg-zinc-900 rounded-full p-0.5 border border-zinc-800">
               {n.type === 'approval' && <FileCheck size={12} className="text-blue-400" />}
               {n.type === 'message' && <MessageSquare size={12} className="text-emerald-400" />}
               {n.type === 'mention' && <span className="text-[10px] font-bold text-primary flex items-center justify-center w-3 h-3">@</span>}
            </div>
         </div>
       );
    }
    
    // System Icons
    switch(n.type) {
        case 'system': 
           return <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400"><Settings size={18} /></div>;
        case 'alert':
           return <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400"><Shield size={18} /></div>;
        default:
           return <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center"><Bell size={18} /></div>;
    }
  };

  return (
    <div className="absolute top-full right-0 mt-3 w-[400px] bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-2xl origin-top-right animate-in fade-in zoom-in-95 duration-200 z-50 overflow-hidden ring-1 ring-white/5">
       
       {/* Header */}
       <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/30">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Notifications</h3>
                {unreadCount > 0 && (
                   <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                      {unreadCount} New
                   </span>
                )}
             </div>
             <div className="flex gap-1">
                <button 
                  onClick={markAllRead}
                  className="p-1.5 text-zinc-400 hover:text-primary hover:bg-primary/10 rounded transition-colors" 
                  title="Mark all as read"
                >
                   <Check size={16} />
                </button>
                <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors">
                   <Settings size={16} />
                </button>
             </div>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-zinc-900 rounded-lg border border-zinc-800">
             {['all', 'unread', 'mentions'].map((tab) => (
                <button
                   key={tab}
                   onClick={() => setActiveTab(tab as any)}
                   className={`flex-1 py-1 text-xs font-medium rounded-md transition-all capitalize ${
                      activeTab === tab 
                      ? 'bg-zinc-800 text-white shadow-sm' 
                      : 'text-zinc-500 hover:text-zinc-300'
                   }`}
                >
                   {tab}
                </button>
             ))}
          </div>
       </div>

       {/* List */}
       <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-zinc-900/20">
          {filteredNotifications.length > 0 ? (
             <div className="divide-y divide-zinc-800/50">
                {filteredNotifications.map(item => (
                   <div 
                     key={item.id} 
                     className={`p-4 flex gap-4 hover:bg-zinc-900/40 transition-colors cursor-pointer group relative ${!item.isRead ? 'bg-zinc-900/20' : ''}`}
                   >
                      {/* Read Indicator Dot */}
                      {!item.isRead && (
                         <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_currentColor]"></div>
                      )}

                      <div className="shrink-0 pt-1">
                         {getIcon(item)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-start mb-0.5">
                            <h4 className={`text-sm truncate pr-2 ${!item.isRead ? 'font-bold text-white' : 'font-medium text-zinc-300'}`}>
                               {item.title}
                            </h4>
                            <span className="text-[10px] text-zinc-500 whitespace-nowrap">{item.time}</span>
                         </div>
                         <p className={`text-xs line-clamp-2 leading-relaxed ${!item.isRead ? 'text-zinc-300' : 'text-zinc-500'}`}>
                            {item.description}
                         </p>
                         
                         {item.type === 'approval' && (
                            <div className="flex gap-2 mt-2">
                               <button className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded text-[10px] font-bold transition-colors">
                                  Review
                               </button>
                            </div>
                         )}
                      </div>
                   </div>
                ))}
             </div>
          ) : (
             <div className="py-12 flex flex-col items-center justify-center text-zinc-500">
                <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-3">
                   <Bell size={20} className="opacity-50" />
                </div>
                <p className="text-sm">You're all caught up!</p>
             </div>
          )}
       </div>

       {/* Footer */}
       <div className="p-2 border-t border-zinc-800 bg-zinc-900/50 text-center">
          <button className="text-xs font-medium text-zinc-500 hover:text-white transition-colors py-1">
             View Notification History
          </button>
       </div>
    </div>
  );
};
