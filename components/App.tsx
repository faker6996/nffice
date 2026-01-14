
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/views/Dashboard';
import { Talkbox } from './components/views/Talkbox';
import { Approvals } from './components/views/Approvals';
import { Colleague } from './components/views/Colleague';
import { Notice } from './components/views/Notice';
import { Settings } from './components/views/Settings';
import { Profile } from './components/views/Profile';
import { Department } from './components/views/Department';
import { Regulations } from './components/views/Regulations';
import { Attendance } from './components/views/Attendance';
import { UserManagement } from './components/views/UserManagement';
import { MOCK_USERS } from './constants';
import { Construction } from 'lucide-react';

// Simplified Placeholder for the few remaining settings
const PlaceholderView = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-zinc-900/30 rounded-xl border border-zinc-800 border-dashed animate-in fade-in zoom-in-95 duration-300">
    <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6 shadow-xl">
      <Construction size={32} className="text-zinc-500" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
    <p className="text-zinc-500 max-w-md mx-auto">
      This advanced configuration module is currently under development. 
      Please check back in the next sprint release.
    </p>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const currentUser = MOCK_USERS[0]; // Simulating logged-in user

  const renderContent = () => {
    switch (activeTab) {
      // Main
      case 'dashboard': return <Dashboard />;
      case 'talkbox': return <Talkbox />;
      case 'approvals': return <Approvals />;
      case 'notice': return <Notice />;
      
      // Features
      case 'regulations': return <Regulations />;
      case 'attendance': return <Attendance />;
      
      // Management
      case 'users': return <UserManagement />;
      case 'departments': return <Department />;
      case 'colleague': return <Colleague />;
      
      // Settings (Minor placeholders remaining for very specific configs)
      case 'roles': return <PlaceholderView title="Role Based Access Control" />;
      case 'permissions': return <PlaceholderView title="Permission Matrix" />;
      case 'rules': return <PlaceholderView title="Business Logic Rules" />;
      
      // Legacy/Fallback
      case 'settings': return <Settings />;
      case 'profile': return <Profile />;
      
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} currentUser={currentUser}>
      {renderContent()}
    </Layout>
  );
}
