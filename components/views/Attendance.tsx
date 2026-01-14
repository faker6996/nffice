
import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '../ui';
import { MOCK_ATTENDANCE } from '../../constants';
import { 
  Clock, 
  MapPin, 
  CalendarCheck, 
  History, 
  ChevronRight, 
  Coffee,
  AlertCircle,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

export const Attendance = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [workDuration, setWorkDuration] = useState(0); // in seconds
  
  // Real-time clock effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Work timer effect
  useEffect(() => {
    let interval: any;
    if (isCheckedIn) {
      interval = setInterval(() => {
        setWorkDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCheckAction = () => {
    setIsCheckedIn(!isCheckedIn);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-300">
      <div className="mb-6 shrink-0">
         <h1 className="text-2xl font-bold text-white mb-1">Attendance & Time Tracking</h1>
         <p className="text-zinc-400 text-sm">Manage your working hours and view attendance history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
         
         {/* Left Column: Actions & Timer */}
         <div className="lg:col-span-4 space-y-6">
            {/* Main Clock Card */}
            <Card className="p-8 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-800 relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
               
               <div className="z-10 text-center mb-8">
                  <div className="text-zinc-400 font-medium mb-1">{formatDate(currentTime)}</div>
                  <div className="text-5xl font-mono font-bold text-white tracking-wider tabular-nums">
                     {formatTime(currentTime)}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4 text-zinc-500 text-sm bg-zinc-900/50 py-1 px-3 rounded-full border border-zinc-800/50">
                     <MapPin size={14} className="text-primary" />
                     <span>Keangnam Landmark 72, Hanoi</span>
                  </div>
               </div>

               {/* Check In/Out Button */}
               <div className="z-10 relative">
                  <button 
                     onClick={handleCheckAction}
                     className={`w-48 h-48 rounded-full border-8 transition-all duration-500 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.3)] group-hover:scale-105 active:scale-95 ${
                        isCheckedIn 
                        ? 'border-red-500/20 bg-gradient-to-br from-red-500/10 to-red-900/20 hover:border-red-500/40' 
                        : 'border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-900/20 hover:border-emerald-500/40'
                     }`}
                  >
                     {isCheckedIn ? (
                        <>
                           <Coffee size={40} className="text-red-400 mb-2" />
                           <span className="text-xl font-bold text-red-100">Clock Out</span>
                           <span className="text-xs text-red-300/70 mt-1">End Shift</span>
                        </>
                     ) : (
                        <>
                           <CheckCircle2 size={40} className="text-emerald-400 mb-2" />
                           <span className="text-xl font-bold text-emerald-100">Clock In</span>
                           <span className="text-xs text-emerald-300/70 mt-1">Start Shift</span>
                        </>
                     )}
                  </button>
                  
                  {/* Pulse Effect */}
                  <div className={`absolute inset-0 rounded-full border-2 animate-ping opacity-20 ${isCheckedIn ? 'border-red-500' : 'border-emerald-500'}`} />
               </div>

               {/* Live Timer */}
               {isCheckedIn && (
                  <div className="mt-8 text-center z-10">
                     <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest mb-1">Working Duration</div>
                     <div className="text-2xl font-mono font-bold text-primary animate-pulse tabular-nums">
                        {formatDuration(workDuration)}
                     </div>
                  </div>
               )}
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
               <Card className="p-4 bg-zinc-900/50 border-zinc-800">
                  <div className="flex items-center gap-2 mb-2 text-zinc-400">
                     <Clock size={16} /> <span className="text-xs font-bold uppercase">This Week</span>
                  </div>
                  <div className="text-2xl font-bold text-white">38.5h</div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                     <TrendingUp size={12} /> +2.4h vs last week
                  </div>
               </Card>
               <Card className="p-4 bg-zinc-900/50 border-zinc-800">
                   <div className="flex items-center gap-2 mb-2 text-zinc-400">
                     <AlertCircle size={16} /> <span className="text-xs font-bold uppercase">Late Days</span>
                  </div>
                  <div className="text-2xl font-bold text-white">0</div>
                  <div className="text-xs text-zinc-500 mt-1">Keep it up!</div>
               </Card>
            </div>
         </div>

         {/* Right Column: History List */}
         <div className="lg:col-span-8 flex flex-col h-full min-h-0">
            <Card className="flex-1 flex flex-col overflow-hidden bg-zinc-900/30">
               <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                  <div className="flex items-center gap-2">
                     <History size={18} className="text-primary" />
                     <h3 className="font-bold text-white">Attendance Logs</h3>
                  </div>
                  <div className="flex gap-2">
                      <select className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-primary">
                         <option>This Month</option>
                         <option>Last Month</option>
                      </select>
                      <Button variant="outline" className="h-7 text-xs px-2">Export CSV</Button>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-left text-sm">
                     <thead className="bg-zinc-950 text-zinc-500 font-medium text-xs uppercase sticky top-0 z-10">
                        <tr>
                           <th className="px-6 py-3">Date</th>
                           <th className="px-6 py-3">Shift</th>
                           <th className="px-6 py-3">Check In</th>
                           <th className="px-6 py-3">Check Out</th>
                           <th className="px-6 py-3">Work Hours</th>
                           <th className="px-6 py-3 text-right">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-zinc-800/50">
                        {MOCK_ATTENDANCE.map((log) => (
                           <tr key={log.id} className="hover:bg-zinc-900/50 transition-colors group">
                              <td className="px-6 py-4">
                                 <div className="font-medium text-zinc-200">{log.date}</div>
                              </td>
                              <td className="px-6 py-4 text-zinc-400">Standard (8h)</td>
                              <td className="px-6 py-4">
                                 <span className="font-mono text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">{log.checkIn}</span>
                              </td>
                              <td className="px-6 py-4">
                                 <span className="font-mono text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">{log.checkOut}</span>
                              </td>
                              <td className="px-6 py-4 text-zinc-300 font-bold">{log.workingHours}h</td>
                              <td className="px-6 py-4 text-right">
                                 <Badge color={log.status === 'On Time' ? 'green' : log.status === 'Late' ? 'yellow' : 'red'}>
                                    {log.status}
                                 </Badge>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               
               <div className="p-3 border-t border-zinc-800 bg-zinc-900/50 text-center text-xs text-zinc-500">
                  Showing recent activity. Contact HR for discrepancies.
               </div>
            </Card>
         </div>
      </div>
    </div>
  );
};
