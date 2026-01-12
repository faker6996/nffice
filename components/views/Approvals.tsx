
import React, { useState } from 'react';
import { Card, Button, Badge, Input } from '../ui';
import { MOCK_APPROVALS, MOCK_USERS } from '../../constants';
import { 
  Plus, 
  Filter, 
  FileText, 
  Plane, 
  Receipt, 
  ShoppingBag,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Paperclip,
  Calendar,
  AlertCircle,
  UserPlus,
  ChevronLeft,
  X
} from 'lucide-react';

export const Approvals = () => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  
  // Create Form State
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [workflowUsers, setWorkflowUsers] = useState<string[]>([MOCK_USERS[0].id]); // Default 1st approver

  const filteredApprovals = filter === 'All' 
    ? MOCK_APPROVALS 
    : MOCK_APPROVALS.filter(req => req.status === filter);

  // Helper for status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'green';
      case 'Rejected': return 'red';
      case 'Pending': return 'yellow';
      default: return 'blue';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Vacation': return <Plane size={18} />;
      case 'Expense': return <Receipt size={18} />;
      case 'Procurement': return <ShoppingBag size={18} />;
      default: return <FileText size={18} />;
    }
  };

  // --- Create Request View ---
  if (view === 'create') {
    return (
      <div className="animate-in slide-in-from-right duration-300 space-y-6 max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
           <Button variant="ghost" onClick={() => setView('list')} className="p-2 h-auto text-zinc-400 hover:text-white">
              <ChevronLeft size={24} />
           </Button>
           <div>
              <h1 className="text-2xl font-bold text-white">Create Request</h1>
              <p className="text-zinc-400 text-sm">Submit a new approval request to your department.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left: Form Fields */}
           <div className="lg:col-span-2 space-y-6">
              {/* Type Selection */}
              <Card className="p-5">
                 <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">1. Select Template</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Vacation', 'Expense', 'Report', 'Procurement'].map(type => (
                       <button 
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                             selectedType === type 
                             ? 'bg-primary/10 border-primary text-white ring-1 ring-primary' 
                             : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800'
                          }`}
                       >
                          <div className={`mb-2 ${selectedType === type ? 'text-primary' : ''}`}>
                             {getTypeIcon(type)}
                          </div>
                          <span className="text-xs font-medium">{type}</span>
                       </button>
                    ))}
                 </div>
              </Card>

              {/* General Info */}
              <Card className="p-5 space-y-4">
                 <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">2. Request Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-xs font-medium text-zinc-400">Request Title</label>
                       <Input placeholder="e.g. Q1 Marketing Budget" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-medium text-zinc-400">Urgency</label>
                       <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary">
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                       </select>
                    </div>
                 </div>
                 <div className="space-y-2">
                     <label className="text-xs font-medium text-zinc-400">Description</label>
                     <textarea 
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary min-h-[100px]" 
                        placeholder="Provide details about your request..."
                     />
                 </div>
                 
                 {/* File Upload Mock */}
                 <div className="pt-2">
                    <div className="border border-dashed border-zinc-700 rounded-xl p-6 flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-900/50 transition-colors cursor-pointer">
                       <Paperclip size={24} className="mb-2" />
                       <span className="text-sm font-medium">Click to attach files</span>
                       <span className="text-xs text-zinc-600">PDF, DOCX, JPG up to 10MB</span>
                    </div>
                 </div>
              </Card>
           </div>

           {/* Right: Workflow Config */}
           <div className="space-y-6">
              <Card className="p-5">
                 <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center justify-between">
                    3. Workflow
                    <span className="text-xs font-normal normal-case bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">Sequence</span>
                 </h3>
                 
                 <div className="space-y-4 relative">
                    {/* Line connector */}
                    <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-zinc-800" />
                    
                    {workflowUsers.map((uid, index) => {
                       const user = MOCK_USERS.find(u => u.id === uid);
                       return (
                          <div key={index} className="relative flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400 z-10">
                                {index + 1}
                             </div>
                             <div className="flex-1 bg-zinc-900/50 border border-zinc-800 p-2.5 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                   <div className="w-6 h-6 rounded-full overflow-hidden bg-zinc-800">
                                      <img src={user?.avatar} alt="" className="w-full h-full object-cover" />
                                   </div>
                                   <div className="text-xs">
                                      <div className="text-zinc-200 font-medium">{user?.name}</div>
                                      <div className="text-zinc-500">{user?.role}</div>
                                   </div>
                                </div>
                                <button 
                                  onClick={() => setWorkflowUsers(workflowUsers.filter((_, i) => i !== index))}
                                  className="text-zinc-600 hover:text-red-400 transition-colors"
                                >
                                   <X size={14} />
                                </button>
                             </div>
                          </div>
                       );
                    })}

                    <button 
                       onClick={() => setWorkflowUsers([...workflowUsers, MOCK_USERS[1].id])} // Mock add logic
                       className="relative flex items-center gap-3 w-full group"
                    >
                       <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 border-dashed flex items-center justify-center text-zinc-500 group-hover:text-primary group-hover:border-primary transition-colors z-10">
                          <Plus size={14} />
                       </div>
                       <span className="text-xs font-medium text-zinc-500 group-hover:text-primary transition-colors">Add Approver</span>
                    </button>
                 </div>
              </Card>

              <div className="flex gap-3">
                 <Button variant="outline" onClick={() => setView('list')} className="flex-1">Cancel</Button>
                 <Button className="flex-1" onClick={() => setView('list')}>Submit Request</Button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- List View ---
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1">Approvals</h1>
           <p className="text-zinc-400 text-sm">Manage your requests and pending approvals</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline">
            <Filter size={16} /> Filter
          </Button>
          <Button onClick={() => setView('create')}>
            <Plus size={16} /> New Request
          </Button>
        </div>
      </div>

      {/* Quick Stats/Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
         {['Vacation', 'Expense', 'Report', 'Procurement'].map((type) => (
            <div key={type} onClick={() => { setView('create'); setSelectedType(type); }} className="group cursor-pointer bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800 rounded-xl p-4 transition-all">
               <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-800 text-zinc-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors`}>
                     {getTypeIcon(type)}
                  </div>
                  <span className="font-medium text-zinc-300 text-sm group-hover:text-white">{type}</span>
               </div>
               <div className="text-xs text-zinc-500 flex items-center gap-1">
                  Create new <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
               </div>
            </div>
         ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800/50">
        {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
           <button
             key={status}
             onClick={() => setFilter(status as any)}
             className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                filter === status 
                ? 'text-white bg-zinc-800' 
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
             }`}
           >
              {status} {status !== 'All' && <span className="ml-1 opacity-50 text-xs">({MOCK_APPROVALS.filter(a => a.status === status).length})</span>}
           </button>
        ))}
      </div>

      {/* Approval List */}
      <div className="space-y-4">
        {filteredApprovals.length > 0 ? filteredApprovals.map((req) => (
           <Card key={req.id} className="p-0 overflow-hidden group hover:border-zinc-600 transition-colors">
              <div className="p-5 flex flex-col md:flex-row gap-5">
                 {/* Icon Column */}
                 <div className="hidden md:block">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                       {getTypeIcon(req.type)}
                    </div>
                 </div>

                 {/* Main Content */}
                 <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                       <div>
                          <h3 className="font-bold text-base text-zinc-200 group-hover:text-primary transition-colors truncate pr-4">
                             {req.title}
                          </h3>
                          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{req.description}</p>
                       </div>
                       <Badge color={getStatusColor(req.status)}>{req.status}</Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs text-zinc-400">
                       <span className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full overflow-hidden border border-zinc-700">
                             <img src={req.author.avatar} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-zinc-300">{req.author.name}</span>
                       </span>
                       <span className="flex items-center gap-1">
                          <Calendar size={12} /> {req.date}
                       </span>
                       <span className={`px-1.5 py-0.5 rounded border flex items-center gap-1 ${getUrgencyColor(req.urgency)}`}>
                          <AlertCircle size={10} /> {req.urgency} Priority
                       </span>
                       {req.attachments && req.attachments.length > 0 && (
                          <span className="flex items-center gap-1 text-zinc-500">
                             <Paperclip size={12} /> {req.attachments.length} files
                          </span>
                       )}
                    </div>
                 </div>

                 {/* Workflow Status Visualization */}
                 <div className="md:w-64 shrink-0 pt-4 md:pt-0 md:pl-6 md:border-l border-zinc-800 flex flex-col justify-center">
                    <div className="text-xs font-semibold text-zinc-500 uppercase mb-3">Workflow Progress</div>
                    <div className="space-y-3">
                       {req.workflow.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                             {step.status === 'Approved' ? <CheckCircle2 size={16} className="text-emerald-500" /> : 
                              step.status === 'Rejected' ? <XCircle size={16} className="text-red-500" /> :
                              <div className="w-4 h-4 rounded-full border-2 border-zinc-600 border-t-transparent animate-spin" />}
                             
                             <div className="flex-1 flex items-center justify-between">
                                <span className={`text-xs font-medium ${step.status === 'Pending' ? 'text-zinc-500' : 'text-zinc-300'}`}>
                                   {step.approver.name}
                                </span>
                                {step.timestamp && <span className="text-[10px] text-zinc-600">{step.timestamp.split(' ')[0]}</span>}
                             </div>
                          </div>
                       ))}
                       {req.workflow.length === 0 && <div className="text-xs text-zinc-600 italic">Pending assignment...</div>}
                    </div>
                 </div>
              </div>
           </Card>
        )) : (
           <div className="text-center py-12 border border-zinc-800 border-dashed rounded-xl">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-600">
                 <FileText size={24} />
              </div>
              <h3 className="text-lg font-medium text-white mb-1">No requests found</h3>
              <p className="text-zinc-500 text-sm">Try adjusting your filters or create a new request.</p>
           </div>
        )}
      </div>
    </div>
  );
};
