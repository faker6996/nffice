import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/views/Dashboard';
import { Talkbox } from './components/views/Talkbox';
import { Approvals } from './components/views/Approvals';
import { Colleague } from './components/views/Colleague';
import { Notice } from './components/views/Notice';
import { Settings } from './components/views/Settings';
import { Profile } from './components/views/Profile';
import { MOCK_USERS } from './constants';

// Placeholder for views that are not yet fully implemented in the demo
const PlaceholderView = ({ title, icon }: { title: string, icon?: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-zinc-900/30 rounded-xl border border-zinc-800 border-dashed">
    <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
      <div className="w-8 h-8 border-2 border-zinc-600 border-t-primary rounded-full animate-spin" />
    </div>
    <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
    <p className="text-zinc-500 max-w-sm">This module is part of the "Management" or "Settings" groups and is currently under development.</p>
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
      
      // Regulations (Mapped to Notice for demo or Placeholder)
      case 'regulations': return <Notice />; // Reusing Notice view for now as it contains regulations
      case 'attendance': return <PlaceholderView title="Attendance Management" />;
      
      // Management
      case 'users': return <PlaceholderView title="User Management" />;
      case 'departments': return <PlaceholderView title="Department Management" />;
      case 'colleague': return <Colleague />;
      
      // Settings
      case 'roles': return <PlaceholderView title="Role Management" />;
      case 'permissions': return <PlaceholderView title="Permission Settings" />;
      case 'rules': return <PlaceholderView title="Business Rules" />;
      
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
