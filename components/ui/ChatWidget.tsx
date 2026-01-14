
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Minus, 
  Search, 
  Send, 
  Phone, 
  Video, 
  Smile, 
  ChevronLeft,
  MoreVertical,
  Image as ImageIcon,
  Paperclip,
  Check,
  CheckCheck
} from 'lucide-react';
import { MOCK_USERS } from '../../constants';

// --- Types ---
interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  status: 'sent' | 'delivered' | 'read';
}

// --- Mock Initial Data ---
const INITIAL_MESSAGES: Record<string, Message[]> = {
  'u2': [ 
    { id: 'm1', senderId: 'u2', text: 'Hey Bach, have you checked the new design update?', timestamp: '10:30 AM', isMe: false, status: 'read' },
    { id: 'm2', senderId: 'me', text: 'Yeah, looks fantastic! I love the new dark mode palette.', timestamp: '10:32 AM', isMe: true, status: 'read' },
    { id: 'm3', senderId: 'u2', text: 'Great. Can we sync later to discuss the implementation?', timestamp: '10:33 AM', isMe: false, status: 'read' },
  ],
  'u3': [ 
    { id: 'm4', senderId: 'u3', text: 'Server maintenance is scheduled for tonight at 2 AM.', timestamp: '09:00 AM', isMe: false, status: 'read' },
  ]
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false); // Mock typing state

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeUser = activeChatId ? MOCK_USERS.find(u => u.id === activeChatId) : null;
  const currentMessages = activeChatId ? (messages[activeChatId] || []) : [];

  // Auto-scroll logic
  useEffect(() => {
    if (activeChatId && isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentMessages, activeChatId, isOpen, isMinimized]);

  // Focus input when chat opens
  useEffect(() => {
      if(activeChatId && isOpen && !isMinimized) {
          setTimeout(() => inputRef.current?.focus(), 300);
      }
  }, [activeChatId]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activeChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage]
    }));
    setInputValue('');

    // Simulate "Typing..." and Reply
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        const reply: Message = {
            id: Date.now().toString() + 'r',
            senderId: activeChatId,
            text: "Got it! Thanks for the update.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: false,
            status: 'read'
        };
        setMessages(prev => ({
            ...prev,
            [activeChatId]: [...(prev[activeChatId] || []), reply]
        }));
    }, 2000);
  };

  const toggleOpen = () => {
    if (isMinimized) {
      setIsMinimized(false);
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Main Chat Container */}
      {isOpen && !isMinimized && (
        <div className="mb-4 w-[360px] h-[550px] bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 ring-1 ring-white/5 origin-bottom-right">
          
          {/* 1. Header Area */}
          <div className="h-16 bg-zinc-900/50 border-b border-zinc-800/50 flex items-center justify-between px-4 shrink-0 backdrop-blur-md sticky top-0 z-10">
            {activeChatId ? (
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button 
                    onClick={() => setActiveChatId(null)} 
                    className="p-1 -ml-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <ChevronLeft size={22} />
                </button>
                
                <div className="relative cursor-pointer group">
                  <img src={activeUser?.avatar} className="w-9 h-9 rounded-full border border-zinc-700 object-cover" alt="" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-900 ring-1 ring-zinc-900"></div>
                </div>
                
                <div className="flex-1 min-w-0 cursor-pointer">
                  <div className="text-sm font-bold text-white leading-none truncate">{activeUser?.name}</div>
                  <div className="text-xs text-emerald-400 mt-1 font-medium truncate">Active now</div>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                 <h2 className="text-lg font-bold text-white tracking-tight">Messages</h2>
              </div>
            )}

            <div className="flex items-center gap-1">
                {activeChatId && (
                   <>
                    <button className="p-2 text-zinc-400 hover:text-primary hover:bg-zinc-800/50 rounded-full transition-colors"><Phone size={18} /></button>
                    <button className="p-2 text-zinc-400 hover:text-primary hover:bg-zinc-800/50 rounded-full transition-colors"><Video size={18} /></button>
                   </>
                )}
              <div className="h-4 w-px bg-zinc-700 mx-1"></div>
              <button onClick={() => setIsMinimized(true)} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-full transition-colors">
                <Minus size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* 2. Body Content */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-950/50 to-zinc-900/50 relative custom-scrollbar">
            
            {activeChatId ? (
              /* --- Conversation View --- */
              <div className="p-4 space-y-1 min-h-full flex flex-col">
                 <div className="flex-1"></div> {/* Spacer to push messages down if few */}
                 
                 <div className="flex justify-center mb-6 mt-2">
                    <span className="text-[10px] font-medium text-zinc-500 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-zinc-800">
                        Today, {new Date().toLocaleDateString()}
                    </span>
                 </div>

                 {currentMessages.map((msg, index) => {
                    // Check if next message is from same sender to group bubbles
                    const isLast = index === currentMessages.length - 1;
                    const nextMsg = currentMessages[index + 1];
                    const isSequence = nextMsg && nextMsg.senderId === msg.senderId;

                    return (
                        <div key={msg.id} className={`group flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} mb-1`}>
                           <div className="flex items-end max-w-[85%]">
                              {!msg.isMe && !isSequence && (
                                 <img src={activeUser?.avatar} className="w-6 h-6 rounded-full border border-zinc-800 mr-2 mb-1" alt="" />
                              )}
                              {!msg.isMe && isSequence && <div className="w-8" />} {/* Spacer for alignment */}

                              <div 
                                className={`px-4 py-2.5 text-sm shadow-sm relative transition-all duration-200 ${
                                  msg.isMe 
                                  ? 'bg-gradient-to-br from-primary to-purple-600 text-white rounded-2xl rounded-tr-md' 
                                  : 'bg-zinc-800 text-zinc-100 rounded-2xl rounded-tl-md border border-zinc-700/50'
                                }`}
                              >
                                 {msg.text}
                              </div>
                           </div>
                           
                           {/* Message Metadata (Time/Status) - Only show for last in sequence or on hover */}
                           <div className={`text-[10px] text-zinc-500 mt-1 px-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${isLast ? 'opacity-100' : ''}`}>
                               {msg.timestamp}
                               {msg.isMe && (
                                   <span>
                                       {msg.status === 'read' ? <CheckCheck size={12} className="text-primary" /> : <Check size={12} />}
                                   </span>
                               )}
                           </div>
                        </div>
                    );
                 })}
                 
                 {/* Typing Indicator */}
                 {isTyping && (
                     <div className="flex items-end gap-2 mt-2">
                         <img src={activeUser?.avatar} className="w-6 h-6 rounded-full border border-zinc-800 mb-1" alt="" />
                         <div className="bg-zinc-800 px-3 py-2.5 rounded-2xl rounded-tl-md border border-zinc-700/50 flex gap-1">
                             <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                             <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                             <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
                         </div>
                     </div>
                 )}
                 <div ref={messagesEndRef} className="h-2" />
              </div>
            ) : (
              /* --- Contact List View --- */
              <div className="p-2">
                <div className="px-3 pt-2 pb-4">
                  <div className="relative group">
                     <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" />
                     <input 
                        className="w-full bg-zinc-900 border border-zinc-800 group-focus-within:border-primary/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 focus:outline-none transition-all placeholder:text-zinc-600"
                        placeholder="Search colleagues..."
                     />
                  </div>
                </div>
                
                {/* Horizontal Active Users (Stories Style) */}
                <div className="mb-4 pl-3">
                   <h3 className="text-xs font-bold text-zinc-500 uppercase mb-3 px-1">Online Now</h3>
                   <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
                      {MOCK_USERS.slice(0,5).map((u, idx) => (
                         <div key={u.id} className="flex flex-col items-center gap-1.5 cursor-pointer group snap-start" onClick={() => setActiveChatId(u.id)}>
                            <div className="relative">
                               <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-primary to-purple-500 group-hover:scale-105 transition-transform">
                                  <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-zinc-800">
                                      <img src={u.avatar} className="w-full h-full object-cover" alt="" />
                                  </div>
                               </div>
                               <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-zinc-950"></div>
                            </div>
                            <div className="text-[10px] font-medium text-zinc-400 truncate w-14 text-center group-hover:text-white transition-colors">
                                {u.name.split(' ')[0]}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* Recent Chats List */}
                <h3 className="text-xs font-bold text-zinc-500 uppercase mb-2 px-4">Recent</h3>
                <div className="space-y-0.5 mx-2">
                   {MOCK_USERS.slice(1).map(u => (
                      <div 
                        key={u.id} 
                        onClick={() => setActiveChatId(u.id)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/60 cursor-pointer transition-colors group"
                      >
                         <div className="relative shrink-0">
                            <img src={u.avatar} className="w-12 h-12 rounded-full border border-zinc-800 object-cover" alt="" />
                            {/* Online status logic mock */}
                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-zinc-950 ${u.id === 'u2' || u.id === 'u3' ? 'bg-emerald-500' : 'bg-zinc-600'}`}></div>
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <div className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{u.name}</div>
                                <div className="text-[10px] text-zinc-500">10m</div>
                            </div>
                            <div className="text-xs text-zinc-500 truncate flex items-center gap-1 group-hover:text-zinc-400 transition-colors">
                               {messages[u.id] ? (
                                  <span className={!messages[u.id][messages[u.id].length-1].isMe ? 'text-zinc-300 font-medium' : ''}>
                                     {messages[u.id][messages[u.id].length-1].isMe ? 'You: ' : ''}
                                     {messages[u.id][messages[u.id].length-1].text}
                                  </span>
                               ) : (
                                  <span className="italic opacity-80">Start a conversation</span>
                               )}
                            </div>
                         </div>
                         {!messages[u.id]?.[messages[u.id].length-1].isMe && messages[u.id] && (
                            <div className="w-2.5 h-2.5 bg-primary rounded-full shrink-0 shadow-lg shadow-primary/40"></div>
                         )}
                      </div>
                   ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Footer / Input Area */}
          {activeChatId && (
            <div className="p-3 bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800 shrink-0">
               <div className="flex items-end gap-2 bg-zinc-950 border border-zinc-800/80 rounded-3xl p-1.5 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all shadow-sm">
                  <button className="p-2 text-zinc-400 hover:text-white bg-transparent hover:bg-zinc-800 rounded-full transition-colors shrink-0">
                     <MoreVertical size={18} />
                  </button>
                  
                  <div className="flex-1 min-w-0 py-2">
                      <input 
                        ref={inputRef}
                        className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-zinc-600 max-h-20 overflow-y-auto"
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        autoComplete="off"
                      />
                  </div>

                  <div className="flex items-center gap-1 shrink-0 pb-0.5">
                      {!inputValue && (
                        <>
                            <button className="p-2 text-zinc-400 hover:text-primary transition-colors" title="Attach"><Paperclip size={18} /></button>
                            <button className="p-2 text-zinc-400 hover:text-yellow-400 transition-colors" title="Emoji"><Smile size={18} /></button>
                        </>
                      )}
                      
                      {inputValue && (
                          <button 
                             onClick={handleSendMessage}
                             className="p-2 bg-primary hover:bg-primaryDark text-white rounded-full transition-all shadow-lg shadow-primary/30 animate-in zoom-in duration-200"
                          >
                             <Send size={16} className="ml-0.5" />
                          </button>
                      )}
                  </div>
               </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Toggle Button */}
      <div className="relative group z-50">
          <button 
            onClick={toggleOpen}
            className={`w-14 h-14 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10 ${
               isOpen && !isMinimized 
               ? 'bg-zinc-800 text-white rotate-90' 
               : 'bg-gradient-to-tr from-primary to-violet-600 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]'
            }`}
          >
            {isOpen && !isMinimized ? (
               <ChevronLeft size={28} className="-rotate-90" />
            ) : (
               <div className="relative">
                  <MessageCircle size={28} className="fill-current" />
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-zinc-900"></span>
                  </span>
               </div>
            )}
          </button>
          
          {/* Label Tooltip */}
          {(!isOpen || isMinimized) && (
             <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
                Messaging <span className="text-zinc-500 ml-1">⌘J</span>
             </div>
          )}
      </div>

    </div>
  );
};
