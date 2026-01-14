
import React, { useState, useMemo } from 'react';
import { Card, Button, Badge, Input } from '../ui';
import { CategoryTreeSelect, Category } from '../ui/CategoryTreeSelect';
import { MOCK_APPROVALS, MOCK_USERS } from '../../constants';
import { ApprovalRequest, Comment, User } from '../../types';
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
  Paperclip,
  Calendar,
  AlertCircle,
  ChevronLeft,
  X,
  UserCheck,
  Eye,
  Trash2,
  GitCommitHorizontal,
  Users,
  DollarSign,
  Link as LinkIcon,
  MessageSquare,
  Send,
  CornerDownRight,
  MoreHorizontal
} from 'lucide-react';

// --- Sub-components for Comments ---

const CommentItem: React.FC<{ 
   comment: Comment; 
   onReply: (authorName: string) => void;
   isReply?: boolean 
}> = ({ comment, onReply, isReply = false }) => (
  <div className={`flex gap-3 ${isReply ? 'mt-3 pl-8 relative' : 'mt-4'}`}>
    {isReply && (
       <div className="absolute left-0 top-0 w-6 h-6 border-b-2 border-l-2 border-zinc-700 rounded-bl-lg" />
    )}
    
    <div className="shrink-0 z-10">
      <div className={`rounded-full overflow-hidden border border-zinc-700 ${isReply ? 'w-6 h-6' : 'w-8 h-8'}`}>
        <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full object-cover" />
      </div>
    </div>
    
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
         <span className="text-sm font-semibold text-zinc-200">{comment.author.name}</span>
         <span className="text-xs text-zinc-500">• {comment.timestamp}</span>
      </div>
      <div className="text-sm text-zinc-300 bg-zinc-800/50 rounded-lg rounded-tl-none px-3 py-2 inline-block">
        {comment.content}
      </div>
      
      <div className="flex items-center gap-3 mt-1 ml-1">
        <button onClick={() => onReply(comment.author.name)} className="text-xs font-medium text-zinc-500 hover:text-primary transition-colors flex items-center gap-1">
           Reply
        </button>
      </div>

      {comment.replies && comment.replies.map(reply => (
        <CommentItem key={reply.id} comment={reply} onReply={onReply} isReply={true} />
      ))}
    </div>
  </div>
);

export const Approvals = () => {
  const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  
  // Create Form State
  const [selectedType, setSelectedType] = useState<string>('Vacation');
  const [workflowSteps, setWorkflowSteps] = useState([{ id: '1', name: 'Step 1', approverId: '' }]);
  const [reviewerIds, setReviewerIds] = useState<(string | number)[]>([]); 
  const [consensusIds, setConsensusIds] = useState<(string | number)[]>([]);
  
  // Comment State for Detail View
  const [newComment, setNewComment] = useState('');

  // Transform MOCK_USERS into Category Tree Structure
  const userCategories = useMemo(() => {
    const departments = Array.from(new Set(MOCK_USERS.map(u => u.department)));
    const categories: Category[] = [];
    departments.forEach((dept, index) => {
       categories.push({ id: `dept-${index}`, name: dept, type: 'department' });
    });
    MOCK_USERS.forEach(user => {
       const deptIndex = departments.indexOf(user.department);
       categories.push({ id: user.id, name: user.name, parent_id: `dept-${deptIndex}`, avatar: user.avatar, type: 'user' });
    });
    return categories;
  }, []);

  const filteredApprovals = filter === 'All' 
    ? MOCK_APPROVALS 
    : MOCK_APPROVALS.filter(req => req.status === filter);

  // Helper Functions
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

  const handleReply = (authorName: string) => {
     setNewComment(`@${authorName} `);
     // In a real app, we would focus the input ref here
  };

  const handleSubmitComment = () => {
     if (!selectedRequest || !newComment.trim()) return;
     
     const newCmt: Comment = {
        id: `c-${Date.now()}`,
        author: MOCK_USERS[0], // Current User
        content: newComment,
        timestamp: 'Just now',
        likes: 0
     };

     // In a real app, this would be an API call. Here we mutate local state for demo.
     const updatedReq = { ...selectedRequest, comments: [...selectedRequest.comments, newCmt] };
     setSelectedRequest(updatedReq);
     
     // Also update the main list so it persists when going back
     const index = MOCK_APPROVALS.findIndex(r => r.id === selectedRequest.id);
     if (index !== -1) {
        MOCK_APPROVALS[index] = updatedReq;
     }

     setNewComment('');
  };

  const renderDynamicFields = () => {
     switch(selectedType) {
        case 'Vacation':
           return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Leave Type</label>
                    <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary">
                       <option>Annual Leave</option>
                       <option>Sick Leave</option>
                       <option>Unpaid Leave</option>
                       <option>Maternity/Paternity</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Duration</label>
                    <div className="flex gap-2">
                       <Input type="date" className="text-sm" />
                       <span className="self-center text-zinc-500">-</span>
                       <Input type="date" className="text-sm" />
                    </div>
                 </div>
              </div>
           );
        case 'Expense':
           return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-zinc-800">
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Total Amount</label>
                    <div className="relative">
                       <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                       <Input placeholder="0.00" className="pl-8" type="number" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Currency</label>
                    <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary">
                       <option>VND</option>
                       <option>USD</option>
                       <option>EUR</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Category</label>
                    <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary">
                       <option>Travel & Meals</option>
                       <option>Software License</option>
                       <option>Office Supplies</option>
                       <option>Training</option>
                    </select>
                 </div>
              </div>
           );
        case 'Procurement':
           return (
              <div className="space-y-4 pt-2 border-t border-zinc-800">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-xs font-medium text-zinc-400">Item Name</label>
                       <Input placeholder="e.g. MacBook Pro M3" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-medium text-zinc-400">Quantity</label>
                       <Input type="number" placeholder="1" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Vendor Link / Reference</label>
                    <div className="relative">
                       <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                       <Input placeholder="https://..." className="pl-8" />
                    </div>
                 </div>
              </div>
           );
        case 'Report':
           return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Report Period</label>
                    <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary">
                       <option>Weekly</option>
                       <option>Monthly</option>
                       <option>Quarterly</option>
                       <option>Ad-hoc</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Target Department</label>
                    <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary">
                       <option>All Departments</option>
                       <option>Engineering</option>
                       <option>Sales</option>
                       <option>Marketing</option>
                    </select>
                 </div>
              </div>
           );
        default:
           return null;
     }
  }

  // --- Detail View ---
  if (view === 'detail' && selectedRequest) {
     return (
      <div className="animate-in slide-in-from-right duration-300 space-y-6 max-w-6xl mx-auto">
         {/* Header */}
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Button variant="ghost" onClick={() => { setView('list'); setSelectedRequest(null); }} className="p-2 h-auto text-zinc-400 hover:text-white">
                  <ChevronLeft size={24} />
               </Button>
               <div>
                  <h1 className="text-xl font-bold text-white flex items-center gap-3">
                     {selectedRequest.title}
                     <Badge color={getStatusColor(selectedRequest.status)}>{selectedRequest.status}</Badge>
                  </h1>
                  <div className="flex items-center gap-3 text-sm text-zinc-500 mt-1">
                     <span className="flex items-center gap-1"><Calendar size={14} /> {selectedRequest.date}</span>
                     <span>•</span>
                     <span className={`flex items-center gap-1 px-2 rounded-full text-xs border ${getUrgencyColor(selectedRequest.urgency)}`}>
                        {selectedRequest.urgency} Priority
                     </span>
                  </div>
               </div>
            </div>
            <div className="flex gap-2">
               {/* Actions for Approver (Mock) */}
               {selectedRequest.status === 'Pending' && (
                  <>
                     <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">Reject</Button>
                     <Button className="bg-emerald-600 hover:bg-emerald-700">Approve</Button>
                  </>
               )}
               <Button variant="ghost" className="px-2"><MoreHorizontal size={20} /></Button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Details & Workflow */}
            <div className="lg:col-span-2 space-y-6">
               <Card className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                     <div className="w-12 h-12 rounded-full border border-zinc-700 overflow-hidden shrink-0">
                        <img src={selectedRequest.author.avatar} alt="" className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <div className="text-sm font-bold text-white">{selectedRequest.author.name}</div>
                        <div className="text-xs text-zinc-500">{selectedRequest.author.role} • {selectedRequest.author.department}</div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div>
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Description</h3>
                        <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/50 p-4 rounded-lg border border-zinc-800/50">
                           {selectedRequest.description}
                        </p>
                     </div>

                     {/* Attachments */}
                     {selectedRequest.attachments.length > 0 && (
                        <div>
                           <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Attachments</h3>
                           <div className="flex flex-wrap gap-2">
                              {selectedRequest.attachments.map((file, i) => (
                                 <div key={i} className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 cursor-pointer hover:border-primary/50 transition-colors">
                                    <Paperclip size={14} className="text-zinc-500" />
                                    {file}
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               </Card>

               <Card className="p-6">
                  <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                     <GitCommitHorizontal size={18} /> Approval Chain
                  </h3>
                  <div className="space-y-6 relative">
                     {/* Vertical Line */}
                     <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-zinc-800" />

                     {selectedRequest.workflow.map((step, idx) => (
                        <div key={idx} className="relative flex gap-4">
                           <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10 bg-zinc-950 ${
                              step.status === 'Approved' ? 'border-emerald-500 text-emerald-500' :
                              step.status === 'Rejected' ? 'border-red-500 text-red-500' :
                              'border-zinc-700 text-zinc-500'
                           }`}>
                              {step.status === 'Approved' ? <CheckCircle2 size={20} /> : 
                               step.status === 'Rejected' ? <XCircle size={20} /> :
                               <span className="text-sm font-bold">{idx + 1}</span>}
                           </div>
                           <div className="flex-1 pt-1">
                              <div className="flex items-center justify-between mb-1">
                                 <span className="text-sm font-bold text-white">{step.name}</span>
                                 <Badge color={getStatusColor(step.status)}>{step.status}</Badge>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                 <img src={step.approver.avatar} className="w-5 h-5 rounded-full" alt="" />
                                 <span className="text-xs text-zinc-400">{step.approver.name}</span>
                                 {step.timestamp && <span className="text-xs text-zinc-600">• {step.timestamp}</span>}
                              </div>
                              {step.comment && (
                                 <div className="text-xs text-zinc-300 bg-zinc-800/50 p-2 rounded border-l-2 border-zinc-600 italic">
                                    "{step.comment}"
                                 </div>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </Card>
            </div>

            {/* Right Col: Discussion & Groups */}
            <div className="space-y-6">
               {/* Consultation Groups */}
               {(selectedRequest.reviewers.length > 0 || selectedRequest.consensus.length > 0) && (
                  <Card className="p-5 space-y-4">
                      {selectedRequest.reviewers.length > 0 && (
                        <div>
                           <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                              <Eye size={12} /> Reviewers (Tán thành)
                           </h4>
                           <div className="flex flex-wrap gap-2">
                              {selectedRequest.reviewers.map(u => (
                                 <div key={u.id} className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 rounded border border-zinc-800 text-xs text-zinc-300">
                                    <img src={u.avatar} className="w-4 h-4 rounded-full" alt="" />
                                    {u.name}
                                 </div>
                              ))}
                           </div>
                        </div>
                      )}
                      {selectedRequest.consensus.length > 0 && (
                        <div>
                           <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                              <Users size={12} /> Consensus (Đồng thuận)
                           </h4>
                           <div className="flex flex-wrap gap-2">
                              {selectedRequest.consensus.map(u => (
                                 <div key={u.id} className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 rounded border border-zinc-800 text-xs text-zinc-300">
                                    <img src={u.avatar} className="w-4 h-4 rounded-full" alt="" />
                                    {u.name}
                                 </div>
                              ))}
                           </div>
                        </div>
                      )}
                  </Card>
               )}

               {/* Comments Section */}
               <Card className="flex flex-col h-[500px]">
                  <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
                     <MessageSquare size={16} className="text-zinc-400" />
                     <h3 className="text-sm font-bold text-white">Discussion</h3>
                     <span className="ml-auto text-xs text-zinc-500">{selectedRequest.comments.length} comments</span>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 scrollbar-thin space-y-1">
                     {selectedRequest.comments.length > 0 ? (
                        selectedRequest.comments.map(comment => (
                           <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
                        ))
                     ) : (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                           <MessageSquare size={32} className="mb-2 opacity-20" />
                           <p className="text-xs">No comments yet.</p>
                        </div>
                     )}
                  </div>

                  <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
                     <div className="relative">
                        <input 
                           value={newComment}
                           onChange={(e) => setNewComment(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && handleSubmitComment()}
                           placeholder="Write a comment..."
                           className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-4 pr-10 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-primary/50 transition-colors"
                        />
                        <button 
                           onClick={handleSubmitComment}
                           disabled={!newComment.trim()}
                           className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-colors ${newComment.trim() ? 'text-primary hover:bg-primary/10' : 'text-zinc-600'}`}
                        >
                           <Send size={16} />
                        </button>
                     </div>
                  </div>
               </Card>
            </div>
         </div>
      </div>
     );
  }

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
                 <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider flex items-center justify-between">
                    2. Request Details
                    <Badge color="blue">{selectedType} Details</Badge>
                 </h3>
                 
                 {/* Common Fields */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-xs font-medium text-zinc-400">Request Title</label>
                       <Input placeholder={`e.g. ${selectedType === 'Vacation' ? 'Annual Leave Jan' : 'Q1 Budget'}`} />
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

                 {/* Dynamic Fields based on Type */}
                 {renderDynamicFields()}

                 <div className="space-y-2">
                     <label className="text-xs font-medium text-zinc-400">Description / Note</label>
                     <textarea 
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary min-h-[100px]" 
                        placeholder="Provide additional context..."
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
                    <span className="text-xs font-normal normal-case bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">Sequential Chain</span>
                 </h3>
                 
                 {/* Workflow Steps - Chain of Command */}
                 <div className="space-y-4 relative mb-8">
                    {/* Line connector */}
                    <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-zinc-800" />
                    
                    {workflowSteps.map((step, index) => (
                       <div key={step.id} className="relative flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400 z-10 shrink-0">
                             {index + 1}
                          </div>
                          
                          <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg p-2.5 flex items-center gap-3">
                             <div className="flex-1">
                                <input 
                                   className="bg-transparent text-xs font-bold text-zinc-400 focus:outline-none mb-1 w-full"
                                   value={step.name}
                                   onChange={(e) => {
                                      const newSteps = [...workflowSteps];
                                      newSteps[index].name = e.target.value;
                                      setWorkflowSteps(newSteps);
                                   }}
                                />
                                {/* Simple User Select for Main Approver */}
                                <select 
                                   className="w-full bg-zinc-950 border border-zinc-700 rounded px-2 py-1 text-xs text-white focus:border-primary focus:outline-none"
                                   value={step.approverId}
                                   onChange={(e) => {
                                      const newSteps = [...workflowSteps];
                                      newSteps[index].approverId = e.target.value;
                                      setWorkflowSteps(newSteps);
                                   }}
                                >
                                   <option value="">Select Approver...</option>
                                   {MOCK_USERS.map(u => (
                                      <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                                   ))}
                                </select>
                             </div>
                             {workflowSteps.length > 1 && (
                                <button 
                                   onClick={() => setWorkflowSteps(workflowSteps.filter((_, i) => i !== index))}
                                   className="text-zinc-600 hover:text-red-400 p-1"
                                >
                                   <Trash2 size={14} />
                                </button>
                             )}
                          </div>
                       </div>
                    ))}

                    <button 
                       onClick={() => setWorkflowSteps([...workflowSteps, { id: Date.now().toString(), name: `Step ${workflowSteps.length + 1}`, approverId: '' }])}
                       className="relative flex items-center gap-3 w-full group pl-1"
                    >
                       <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 border-dashed flex items-center justify-center text-zinc-500 group-hover:text-primary group-hover:border-primary transition-colors z-10">
                          <Plus size={12} />
                       </div>
                       <span className="text-xs font-medium text-zinc-500 group-hover:text-primary transition-colors">Add Step</span>
                    </button>
                 </div>

                 {/* Participants Groups */}
                 <div className="pt-6 border-t border-zinc-800 space-y-5">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Consultation Groups</h3>
                    
                    {/* Tán thành / Reviewers */}
                    <div>
                        <label className="text-[10px] uppercase font-bold text-blue-400 mb-2 flex items-center gap-1">
                           <Eye size={12} /> Tán thành (Reviewers)
                        </label>
                        <CategoryTreeSelect 
                           categories={userCategories}
                           value={reviewerIds}
                           onChange={setReviewerIds}
                           placeholder="Select Reviewers..."
                        />
                    </div>

                    {/* Đồng thuận / Consensus */}
                    <div>
                        <label className="text-[10px] uppercase font-bold text-purple-400 mb-2 flex items-center gap-1">
                           <Users size={12} /> Đồng thuận (Consensus)
                        </label>
                        <CategoryTreeSelect 
                           categories={userCategories}
                           value={consensusIds}
                           onChange={setConsensusIds}
                           placeholder="Select Consensus Group..."
                        />
                    </div>
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
           <Card 
             key={req.id} 
             className="p-0 overflow-hidden group hover:border-zinc-600 transition-colors cursor-pointer"
             // Click handler to open detail view
             onClick={() => { setSelectedRequest(req); setView('detail'); }}
           >
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
                       
                       {/* Groups Display in List Item */}
                       {(req.reviewers.length > 0 || req.consensus.length > 0) && (
                          <div className="flex items-center gap-3 pl-2 border-l border-zinc-800">
                             {req.reviewers.length > 0 && (
                                <div className="flex items-center gap-1 text-blue-400" title="Reviewers">
                                   <Eye size={12} />
                                   <span className="text-zinc-500">{req.reviewers.length}</span>
                                </div>
                             )}
                             {req.consensus.length > 0 && (
                                <div className="flex items-center gap-1 text-purple-400" title="Consensus">
                                   <Users size={12} />
                                   <span className="text-zinc-500">{req.consensus.length}</span>
                                </div>
                             )}
                          </div>
                       )}
                       {req.comments.length > 0 && (
                          <div className="flex items-center gap-1 text-zinc-500 pl-2 border-l border-zinc-800">
                             <MessageSquare size={12} /> {req.comments.length}
                          </div>
                       )}
                    </div>
                 </div>

                 {/* Workflow Status Visualization */}
                 <div className="md:w-72 shrink-0 pt-4 md:pt-0 md:pl-6 md:border-l border-zinc-800 flex flex-col justify-center">
                    <div className="text-xs font-semibold text-zinc-500 uppercase mb-3 flex items-center gap-2">
                       <GitCommitHorizontal size={14} /> Workflow Chain
                    </div>
                    <div className="space-y-4">
                       {req.workflow.map((step, idx) => (
                          <div key={idx} className="relative">
                             <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                   {step.status === 'Approved' ? <CheckCircle2 size={16} className="text-emerald-500" /> : 
                                    step.status === 'Rejected' ? <XCircle size={16} className="text-red-500" /> :
                                    <div className="w-4 h-4 rounded-full border-2 border-zinc-600 border-t-transparent animate-spin" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                   <div className="text-xs font-bold text-zinc-300 mb-0.5">{step.name}</div>
                                   <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 rounded-full overflow-hidden border border-zinc-700">
                                         <img src={step.approver.avatar} alt="" className="w-full h-full object-cover" />
                                      </div>
                                      <span className="text-xs text-zinc-400 truncate">{step.approver.name}</span>
                                   </div>
                                </div>
                             </div>
                             {/* Vertical Line for Chain */}
                             {idx < req.workflow.length - 1 && (
                                <div className="absolute left-[7px] top-5 bottom-[-16px] w-0.5 bg-zinc-800" />
                             )}
                          </div>
                       ))}
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
