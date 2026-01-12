import React, { useState } from 'react';
import { Card, Button, Input } from '../ui';
import { MOCK_USERS } from '../../constants';
import { User, Shield, Bell, Palette, Camera, Save, Plus, Trash2 } from 'lucide-react';

export const Settings = () => {
  const user = MOCK_USERS[0];
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'approvers', label: 'Approvers', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id 
                ? 'bg-zinc-800 text-white shadow-lg' 
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <tab.icon size={18} className={activeTab === tab.id ? 'text-primary' : 'text-zinc-500'} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3">
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white mb-4">My Profile</h2>
            
            <Card className="p-6">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative group">
                   <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-700 bg-zinc-800">
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                   </div>
                   <button className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                      <Camera size={24} className="text-white" />
                   </button>
                </div>
                <div className="flex-1">
                   <h3 className="text-lg font-bold text-white">{user.name}</h3>
                   <p className="text-zinc-400 text-sm mb-4">{user.role} • {user.department}</p>
                   <div className="flex gap-2">
                      <Button variant="outline" className="h-8 text-xs">Remove</Button>
                      <Button className="h-8 text-xs">Change Avatar</Button>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Full Name</label>
                    <Input defaultValue={user.name} />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Email Address</label>
                    <Input defaultValue={user.email} disabled className="opacity-60 cursor-not-allowed" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Phone Number</label>
                    <Input placeholder="+84 ..." />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Department</label>
                    <Input defaultValue={user.department} disabled className="opacity-60 cursor-not-allowed" />
                 </div>
                 <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Bio</label>
                    <textarea className="w-full bg-zinc-950/50 border border-border rounded-lg px-4 py-2 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm min-h-[100px]" placeholder="Tell us about yourself..." />
                 </div>
              </div>

              <div className="mt-8 flex justify-end">
                 <Button>
                    <Save size={16} /> Save Changes
                 </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'approvers' && (
           <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-bold text-white">Default Approvers</h2>
                 <Button className="text-xs h-8"><Plus size={14} /> Add Approver</Button>
              </div>
              
              <Card className="divide-y divide-zinc-800">
                 {[
                    { role: 'Line Manager', name: 'Tran Van Bach', dept: 'Engineering' },
                    { role: 'Department Head', name: 'Nguyen Van A', dept: 'Engineering' }
                 ].map((approver, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-zinc-900/50 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                             {approver.name.charAt(0)}
                          </div>
                          <div>
                             <div className="text-sm font-medium text-white">{approver.role}</div>
                             <div className="text-xs text-zinc-500">{approver.name} • {approver.dept}</div>
                          </div>
                       </div>
                       <button className="text-zinc-500 hover:text-red-400 transition-colors p-2">
                          <Trash2 size={16} />
                       </button>
                    </div>
                 ))}
              </Card>
              <p className="text-xs text-zinc-500">These approvers will be automatically added to your requests.</p>
           </div>
        )}

        {activeTab === 'preferences' && (
           <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-white mb-4">Preferences</h2>
              <Card className="p-6 space-y-6">
                 <div className="flex items-center justify-between">
                    <div>
                       <div className="text-sm font-medium text-white">Dark Mode</div>
                       <div className="text-xs text-zinc-500">Enable dark appearance</div>
                    </div>
                    <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                       <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                 </div>
                 <div className="flex items-center justify-between">
                    <div>
                       <div className="text-sm font-medium text-white">Email Notifications</div>
                       <div className="text-xs text-zinc-500">Receive updates via email</div>
                    </div>
                     <div className="w-10 h-6 bg-zinc-700 rounded-full relative cursor-pointer">
                       <div className="absolute left-1 top-1 w-4 h-4 bg-zinc-400 rounded-full shadow-sm" />
                    </div>
                 </div>
              </Card>
           </div>
        )}
      </div>
    </div>
  );
};
