import React from 'react';
import { MOCK_USERS, PROJECT_PLAN, MOCK_POSTS } from '../../constants';
import { Card, Button, Badge } from '../ui';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Link as LinkIcon, 
  Edit3, 
  Award, 
  CheckCircle2,
  Github,
  Linkedin,
  Clock,
  MessageSquare
} from 'lucide-react';

export const Profile = () => {
  const user = MOCK_USERS[0]; // Bach TV
  // Calculate mock stats
  const userTasks = PROJECT_PLAN.filter(t => t.assignee === 'bachtv');
  const completedTasks = userTasks.filter(t => t.status === 'Done').length;
  const userPosts = MOCK_POSTS.filter(p => p.author.id === user.id);
  
  const skills = ['React', 'TypeScript', 'Node.js', 'System Design', 'UI/UX', 'Tailwind CSS'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Profile Header & Cover */}
      <div className="relative mb-20">
        {/* Cover Image */}
        <div className="h-64 w-full rounded-2xl overflow-hidden bg-gradient-to-r from-violet-900 to-indigo-900 relative">
           <img 
             src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
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
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-[#09090b] rounded-full"></div>
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
                       <span className="flex items-center gap-1"><MapPin size={14} /> Hanoi, Vietnam</span>
                       <span className="flex items-center gap-1"><Briefcase size={14} /> Full-time</span>
                       <span className="flex items-center gap-1"><Calendar size={14} /> Joined Jan 2022</span>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <Button variant="outline">Message</Button>
                    <Button><Edit3 size={16} /> Edit Profile</Button>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        
        {/* Left Column: Stats & Info */}
        <div className="space-y-6">
           {/* Key Stats */}
           <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 bg-zinc-900/50 text-center hover:border-zinc-700 transition-colors">
                 <div className="text-2xl font-bold text-white mb-1">{completedTasks}</div>
                 <div className="text-xs text-zinc-500 uppercase font-semibold">Tasks Done</div>
              </Card>
              <Card className="p-4 bg-zinc-900/50 text-center hover:border-zinc-700 transition-colors">
                 <div className="text-2xl font-bold text-white mb-1">{userPosts.length}</div>
                 <div className="text-xs text-zinc-500 uppercase font-semibold">Posts</div>
              </Card>
              <Card className="p-4 bg-zinc-900/50 text-center hover:border-zinc-700 transition-colors">
                 <div className="text-2xl font-bold text-white mb-1">12</div>
                 <div className="text-xs text-zinc-500 uppercase font-semibold">Projects</div>
              </Card>
              <Card className="p-4 bg-zinc-900/50 text-center hover:border-zinc-700 transition-colors">
                 <div className="text-2xl font-bold text-white mb-1">2.5</div>
                 <div className="text-xs text-zinc-500 uppercase font-semibold">Years</div>
              </Card>
           </div>

           {/* About / Bio */}
           <Card className="p-6">
              <h3 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                 About Me
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                 Senior Software Engineer with a passion for building scalable web applications and intuitive user interfaces. Currently leading the frontend architecture for the new internal tools suite.
              </p>
              
              <h3 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                 Contact
              </h3>
              <div className="space-y-3">
                 <div className="flex items-center gap-3 text-sm group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                       <Mail size={16} />
                    </div>
                    <span className="text-zinc-400 group-hover:text-primary transition-colors">{user.email}</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                       <Phone size={16} />
                    </div>
                    <span className="text-zinc-400 group-hover:text-primary transition-colors">+84 987 654 321</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                       <Linkedin size={16} />
                    </div>
                    <span className="text-zinc-400 group-hover:text-primary transition-colors">linkedin.com/in/bachtv</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                       <Github size={16} />
                    </div>
                    <span className="text-zinc-400 group-hover:text-primary transition-colors">github.com/bachtv</span>
                 </div>
              </div>
           </Card>

           {/* Skills */}
           <Card className="p-6">
              <h3 className="text-sm font-bold text-white uppercase mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                 {skills.map(skill => (
                    <Badge key={skill} color="blue">{skill}</Badge>
                 ))}
              </div>
           </Card>
        </div>

        {/* Right Column: Activity & Tasks */}
        <div className="lg:col-span-2 space-y-6">
           {/* Active Tasks Widget */}
           <Card className="p-0 overflow-hidden">
              <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
                 <h3 className="font-bold text-white">Current Focus</h3>
                 <Badge color="green">{userTasks.filter(t => t.status !== 'Done').length} Active Tasks</Badge>
              </div>
              <div className="divide-y divide-zinc-800/50">
                 {userTasks.slice(0, 5).map(task => (
                    <div key={task.id} className="p-4 flex items-center gap-4 hover:bg-zinc-900/50 transition-colors">
                       <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${
                          task.status === 'Done' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
                          'bg-amber-500/10 border-amber-500/20 text-amber-500'
                       }`}>
                          {task.status === 'Done' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-zinc-200 truncate">{task.task}</h4>
                          <p className="text-xs text-zinc-500">{task.module} • {task.week}</p>
                       </div>
                       <Badge color={task.priority === 'High' ? 'red' : 'blue'}>{task.priority}</Badge>
                    </div>
                 ))}
              </div>
              <div className="p-3 bg-zinc-900/30 text-center border-t border-zinc-800">
                 <button className="text-xs font-medium text-zinc-500 hover:text-white transition-colors">View All Tasks</button>
              </div>
           </Card>

           {/* Recent Activity */}
           <div className="space-y-4">
              <h3 className="text-lg font-bold text-white px-1">Recent Activity</h3>
              {userPosts.length > 0 ? (
                 userPosts.map(post => (
                    <Card key={post.id} className="p-5 hover:border-zinc-700 transition-colors group">
                       <div className="flex gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700">
                             <img src={post.author.avatar} alt="Author" className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <div className="text-sm font-bold text-white">{post.author.name} <span className="text-zinc-500 font-normal">posted an update</span></div>
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
                    No recent activity found.
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
