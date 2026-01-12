
import React, { useState } from 'react';
import { MOCK_USER_PROFILE, PROJECT_PLAN, MOCK_POSTS, MOCK_ATTENDANCE, MOCK_SYSTEM_LOGS } from '../../constants';
import { Card, Button, Badge, Input } from '../ui';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Edit3, 
  Award, 
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  FileUp,
  LogIn,
  Shield,
  FileCheck,
  Activity,
  CalendarCheck,
  Save,
  X,
  Clock,
  AlertCircle
} from 'lucide-react';

export const Profile = () => {
  const [user, setUser] = useState(MOCK_USER_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(MOCK_USER_PROFILE);
  const [activeTab, setActiveTab] = useState<'timeline' | 'attendance' | 'tasks'>('timeline');

  // Stats from profile data
  const userTasks = PROJECT_PLAN.filter(t => t.assignee === 'bachtv'); // Mock filter by username
  const completedTasks = userTasks.filter(t => t.status === 'Done').length;
  const userPosts = MOCK_POSTS.filter(p => p.author.id === user.id);

  const handleSave = () => {
    setUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(user);
    setIsEditing(false);
  };

  const handleChange = (field: keyof typeof editForm, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  // Helper for icons based on system log type
  const getLogIcon = (type: string) => {
    switch(type) {
      case 'file': return <FileUp size={16} />;
      case 'auth': return <LogIn size={16} />;
      case 'approval': return <FileCheck size={16} />;
      case 'system': return <Shield size={16} />;
      default: return <Activity size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Done': return 'green';
      case 'InProgress': return 'blue';
      case 'Pending': return 'yellow';
      default: return 'blue';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Profile Header & Cover */}
      <div className="relative mb-20">
        {/* Cover Image */}
        <div className="h-64 w-full rounded-2xl overflow-hidden bg-gradient-to-r from-violet-900 to-indigo-900 relative">
           <img 
             src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop" 
             className="w-full h-full object-cover opacity-40 mix-blend-overlay"
             alt="Cover"
           />
           <div className="absolute top-4 right-4">
              <Button variant="ghost" className="bg-black/20 hover:bg-black/40 text-white border border-white/10 backdrop-blur-md">
                 <Edit3 size={16} /> Edit Cover
              </Button>
           </div>
        </div>

        {/* User Info Card (Floating) */}
        <div className="absolute -bottom-16 left-6 right-6 md:left-10 md:right-10 flex flex-col md:flex-row items-end gap-6">
           <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-[#09090b] bg-zinc-800 overflow-hidden shadow-2xl">
                 <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-[#09090b] rounded-full" title="Online"></div>
           </div>
           
           <div className="flex-1 pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                    <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
                       {user.name}
                       <span className="text-blue-400" title="Verified Employee"><CheckCircle2 size={20} fill="currentColor" className="text-[#09090b]" /></span>
                    </h1>
                    <p className="text-zinc-400 font-medium text-lg">{user.role} at <span className="text-zinc-200">{user.department}</span></p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
                       <span className="flex items-center gap-1"><MapPin size={14} /> {user.address.split(',')[1]?.trim() || 'Vietnam'}</span>
                       <span className="flex items-center gap-1"><Briefcase size={14} /> Full-time</span>
                       <span className="flex items-center gap-1"><Calendar size={14} /> Joined {user.joinedDate}</span>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    {isEditing ? (
                       <>
                          <Button variant="outline" onClick={handleCancel} className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                             <X size={16} /> Cancel
                          </Button>
                          <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                             <Save size={16} /> Save Changes
                          </Button>
                       </>
                    ) : (
                       <Button onClick={() => setIsEditing(true)}>
                          <Edit3 size={16} /> Edit Profile
                       </Button>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        
        {/* Left Column: Stats & Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
           {/* Key Stats */}
           <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 bg-zinc-900/50 text-center hover:border-zinc-700 transition-colors">
                 <div className="text-2xl font-bold text-white mb-1">{user.stats.projects}</div>
                 <div className="text-xs text-zinc-500 uppercase font-semibold">Projects</div>
              </Card>
              <Card className="p-4 bg-zinc-900/50 text-center hover:border-zinc-700 transition-colors">
                 <div className="text-2xl font-bold text-white mb-1">{user.stats.uploads}</div>
                 <div className="text-xs text-zinc-500 uppercase font-semibold">Files</div>
              </Card>
              <Card className="p-4 bg-zinc-900/50 text-center hover:border-zinc-700 transition-colors">
                 <div className="text-2xl font-bold text-white mb-1">{completedTasks}</div>
                 <div className="text-xs text-zinc-500 uppercase font-semibold">Tasks Done</div>
              </Card>
              <Card className="p-4 bg-zinc-900/50 text-center hover:border-zinc-700 transition-colors">
                 <div className="text-2xl font-bold text-white mb-1">{user.stats.yearsExperience}</div>
                 <div className="text-xs text-zinc-500 uppercase font-semibold">Years Exp</div>
              </Card>
           </div>

           {/* About / Bio */}
           <Card className="p-6">
              <h3 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">About Me</h3>
              {isEditing ? (
                 <textarea 
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 focus:outline-none focus:border-primary/50 min-h-[120px]"
                    value={editForm.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                 />
              ) : (
                 <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {user.bio}
                 </p>
              )}
              
              <h3 className="text-sm font-bold text-white uppercase mb-4 mt-6 flex items-center gap-2">Contact Info</h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-sm group">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                       <Mail size={16} />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs text-zinc-500">Email</div>
                        <span className="text-zinc-300">{user.email}</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 text-sm group">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                       <Phone size={16} />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs text-zinc-500">Phone</div>
                        {isEditing ? (
                           <Input 
                              value={editForm.phone} 
                              onChange={(e) => handleChange('phone', e.target.value)}
                              className="h-8 py-1 text-sm"
                           />
                        ) : (
                           <span className="text-zinc-300">{user.phone}</span>
                        )}
                    </div>
                 </div>
                 <div className="flex items-center gap-3 text-sm group">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                       <MapPin size={16} />
                    </div>
                    <div className="flex-1">
                        <div className="text-xs text-zinc-500">Address</div>
                        {isEditing ? (
                           <Input 
                              value={editForm.address} 
                              onChange={(e) => handleChange('address', e.target.value)}
                              className="h-8 py-1 text-sm"
                           />
                        ) : (
                           <span className="text-zinc-300">{user.address}</span>
                        )}
                    </div>
                 </div>
              </div>

               {!isEditing && (
                  <div className="mt-6 pt-6 border-t border-zinc-800 flex justify-center gap-4">
                     {user.socialLinks.map(link => (
                           <a key={link.platform} href={`https://${link.url}`} className="text-zinc-500 hover:text-white transition-colors" title={link.platform}>
                              {link.icon === 'github' && <Github size={20} />}
                              {link.icon === 'linkedin' && <Linkedin size={20} />}
                              {link.icon === 'twitter' && <Twitter size={20} />}
                           </a>
                     ))}
                  </div>
               )}
           </Card>
        </div>

        {/* Right Column: Dynamic Tabs (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
            {/* Tab Navigation */}
            <div className="flex items-center border-b border-zinc-800 bg-zinc-900/20 backdrop-blur rounded-t-xl px-2">
                <button 
                    onClick={() => setActiveTab('timeline')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${activeTab === 'timeline' ? 'border-primary text-white bg-zinc-800/50' : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'}`}
                >
                    <Activity size={16} /> Timeline
                </button>
                <button 
                    onClick={() => setActiveTab('attendance')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${activeTab === 'attendance' ? 'border-primary text-white bg-zinc-800/50' : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'}`}
                >
                    <CalendarCheck size={16} /> Attendance
                </button>
                <button 
                    onClick={() => setActiveTab('tasks')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2 ${activeTab === 'tasks' ? 'border-primary text-white bg-zinc-800/50' : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30'}`}
                >
                    <CheckCircle2 size={16} /> Tasks
                </button>
            </div>

            {/* Timeline View (Posts + System Logs) */}
            {activeTab === 'timeline' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <Card className="p-0 overflow-hidden">
                        <div className="p-4 bg-zinc-900/50 border-b border-zinc-800 font-bold text-sm text-zinc-300 flex items-center gap-2">
                           <Shield size={16} className="text-zinc-500" /> Recent System Activity
                        </div>
                        <div className="divide-y divide-zinc-800/50">
                            {MOCK_SYSTEM_LOGS.map(log => (
                                <div key={log.id} className="p-4 flex items-center gap-4 hover:bg-zinc-900/30 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                                        {getLogIcon(log.iconType)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-white truncate">{log.action}</div>
                                        <div className="text-xs text-zinc-500 truncate">{log.target}</div>
                                    </div>
                                    <span className="text-xs text-zinc-500 whitespace-nowrap bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{log.timestamp}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider px-1">My Posts</h3>
                    {userPosts.length > 0 ? (
                        userPosts.map(post => (
                            <Card key={post.id} className="p-5 hover:border-zinc-700 transition-colors group">
                                <div className="flex gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700">
                                        <img src={post.author.avatar} alt="Author" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">{post.author.name}</div>
                                        <div className="text-xs text-zinc-500">{post.timestamp}</div>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-300 mb-3 pl-13">{post.content}</p>
                                {post.images && (
                                    <div className="mb-3 rounded-lg overflow-hidden border border-zinc-800">
                                        <img src={post.images[0]} className="w-full h-48 object-cover" alt="Post content" />
                                    </div>
                                )}
                                <div className="flex gap-4 text-xs text-zinc-500">
                                    <span className="flex items-center gap-1 group-hover:text-pink-500 transition-colors"><Award size={14} /> {post.likes} Likes</span>
                                    <span className="flex items-center gap-1 group-hover:text-blue-500 transition-colors"><MessageSquare size={14} /> {post.commentsCount} Comments</span>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="p-8 text-center text-zinc-500 border border-zinc-800 border-dashed rounded-xl">
                            No posts yet.
                        </div>
                    )}
                </div>
            )}

            {/* Attendance View */}
            {activeTab === 'attendance' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <Card className="p-4 bg-emerald-500/5 border-emerald-500/20">
                            <div className="text-xs text-emerald-400 uppercase font-bold mb-1">Attendance Rate</div>
                            <div className="text-2xl font-bold text-white">98%</div>
                        </Card>
                        <Card className="p-4 bg-blue-500/5 border-blue-500/20">
                            <div className="text-xs text-blue-400 uppercase font-bold mb-1">Avg. Hours</div>
                            <div className="text-2xl font-bold text-white">8.4 hrs</div>
                        </Card>
                        <Card className="p-4 bg-amber-500/5 border-amber-500/20">
                            <div className="text-xs text-amber-400 uppercase font-bold mb-1">Late Arrivals</div>
                            <div className="text-2xl font-bold text-white">1</div>
                        </Card>
                    </div>

                    <Card className="overflow-hidden">
                        <div className="grid grid-cols-5 p-4 bg-zinc-900/50 border-b border-zinc-800 text-xs font-bold text-zinc-400 uppercase">
                            <div>Date</div>
                            <div>Check In</div>
                            <div>Check Out</div>
                            <div>Hours</div>
                            <div className="text-right">Status</div>
                        </div>
                        <div className="divide-y divide-zinc-800/50">
                            {MOCK_ATTENDANCE.map(record => (
                                <div key={record.id} className="grid grid-cols-5 p-4 hover:bg-zinc-900/30 transition-colors items-center text-sm">
                                    <div className="font-medium text-zinc-200">{record.date}</div>
                                    <div className="text-zinc-400">{record.checkIn}</div>
                                    <div className="text-zinc-400">{record.checkOut}</div>
                                    <div className="text-zinc-300 font-mono">{record.workingHours}</div>
                                    <div className="text-right">
                                        <Badge color={record.status === 'Late' ? 'yellow' : 'green'}>{record.status}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}

            {/* Tasks View */}
            {activeTab === 'tasks' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <Card className="overflow-hidden">
                         <div className="grid grid-cols-12 p-4 bg-zinc-900/50 border-b border-zinc-800 text-xs font-bold text-zinc-400 uppercase">
                            <div className="col-span-6">Task Details</div>
                            <div className="col-span-2">Module</div>
                            <div className="col-span-2">Priority</div>
                            <div className="col-span-2 text-right">Status</div>
                        </div>
                        <div className="divide-y divide-zinc-800/50">
                            {userTasks.map(task => (
                                <div key={task.id} className="grid grid-cols-12 p-4 hover:bg-zinc-900/30 transition-colors items-center text-sm group">
                                    <div className="col-span-6 pr-4">
                                        <div className="font-medium text-white group-hover:text-primary transition-colors">{task.task}</div>
                                        <div className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{task.description}</div>
                                    </div>
                                    <div className="col-span-2 text-zinc-400 text-xs">{task.module}</div>
                                    <div className="col-span-2">
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                                            task.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                                            task.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                                            'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                        }`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <Badge color={getStatusColor(task.status)}>{task.status}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
