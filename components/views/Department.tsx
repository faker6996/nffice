
import React, { useState, useMemo, useEffect } from 'react';
import { Card, Button, Badge, Input, Modal } from '../ui';
import { MOCK_USERS } from '../../constants';
import { 
  Building2, 
  ChevronRight, 
  ChevronDown, 
  Users, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Briefcase,
  Layers,
  MapPin,
  Mail,
  Phone,
  LayoutTemplate,
  ListTree,
  Edit2,
  Check,
  UserPlus,
  X,
  Trash2
} from 'lucide-react';

// --- Local Types & Mock Data ---

interface DepartmentNode {
  id: string;
  name: string;
  managerId: string;
  description: string;
  location: string;
  children?: DepartmentNode[];
}

const MOCK_DEPARTMENTS: DepartmentNode[] = [
  {
    id: 'd1',
    name: 'Board of Directors',
    managerId: 'u1', // Bach TV
    description: 'Executive leadership and strategic direction.',
    location: 'Floor 72, HQ',
    children: [
      {
        id: 'd2',
        name: 'Engineering',
        managerId: 'u1', // Bach TV
        description: 'Product development, infrastructure, and QA.',
        location: 'Floor 70, HQ',
        children: [
          { 
             id: 'd2-1', 
             name: 'Backend', 
             managerId: 'u3', // Duc PT
             description: 'Server-side logic and database management.',
             location: 'Floor 70, Zone A' 
          },
          { 
             id: 'd2-2', 
             name: 'Frontend', 
             managerId: 'u2', // Anh NV
             description: 'User interface and client-side experience.',
             location: 'Floor 70, Zone B' 
          },
          { 
             id: 'd2-3', 
             name: 'Quality', 
             managerId: 'u4', // Hieu NN
             description: 'Testing and quality assurance.',
             location: 'Floor 70, Zone C' 
          },
        ]
      },
      {
        id: 'd3',
        name: 'Product',
        managerId: 'u2', // Anh NV (Mock)
        description: 'Product management and design.',
        location: 'Floor 68, HQ',
        children: [
           { id: 'd3-1', name: 'Product Design', managerId: '', description: 'UI/UX Design', location: 'Floor 68' },
           { id: 'd3-2', name: 'Product Mgmt', managerId: '', description: 'Roadmap & Strategy', location: 'Floor 68' }
        ]
      },
      {
        id: 'd4',
        name: 'Human Resources',
        managerId: '',
        description: 'Recruiting, training, and employee relations.',
        location: 'Floor 65, HQ'
      }
    ]
  }
];

interface DeptTreeItemProps {
  node: DepartmentNode;
  level: number;
  selectedId: string;
  onSelect: (node: DepartmentNode) => void;
  isExpandedDefault?: boolean;
}

// --- Recursive Tree Item Component ---
const DeptTreeItem: React.FC<DeptTreeItemProps> = ({ 
  node, 
  level = 0, 
  selectedId, 
  onSelect, 
  isExpandedDefault = true 
}) => {
  const [expanded, setExpanded] = useState(isExpandedDefault);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedId === node.id;

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all border border-transparent group ${
           isSelected 
           ? 'bg-primary/10 border-primary/20 text-white' 
           : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
        }`}
        style={{ marginLeft: `${level * 16}px` }}
        onClick={() => {
           onSelect(node);
           if (hasChildren && !isSelected) setExpanded(true);
        }}
      >
        <div 
           className={`p-1 rounded hover:bg-zinc-700/50 transition-colors ${!hasChildren ? 'opacity-0' : ''}`}
           onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
           }}
        >
           {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
        
        <div className={`w-8 h-8 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 ${isSelected ? 'border-primary/50 text-primary' : ''}`}>
           <Layers size={14} />
        </div>

        <div className="flex-1 min-w-0">
           <div className={`text-sm font-medium truncate ${isSelected ? 'text-primary' : ''}`}>{node.name}</div>
        </div>
      </div>

      {hasChildren && expanded && (
        <div className="mt-1 space-y-1 relative">
           {/* Vertical Guide Line */}
           <div 
             className="absolute bg-zinc-800 w-px top-0 bottom-2" 
             style={{ left: `${(level * 16) + 20}px` }} 
           />
           {node.children!.map(child => (
              <DeptTreeItem 
                 key={child.id} 
                 node={child} 
                 level={level + 1} 
                 selectedId={selectedId}
                 onSelect={onSelect}
              />
           ))}
        </div>
      )}
    </div>
  );
};

// --- Visual Org Chart Component (CSS-based) ---
const OrgChartNode = ({ node }: { node: DepartmentNode }) => {
   const manager = MOCK_USERS.find(u => u.id === node.managerId);

   return (
      <div className="flex flex-col items-center">
         <div className="w-64 bg-zinc-900 border border-zinc-700 rounded-xl p-4 relative hover:border-primary transition-colors cursor-pointer group shadow-lg z-10">
            {/* Connector Lines */}
            <div className="flex items-start gap-3">
               <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Building2 size={18} />
               </div>
               <div className="min-w-0">
                  <div className="font-bold text-white text-sm truncate">{node.name}</div>
                  <div className="text-xs text-zinc-500 truncate">{node.location}</div>
               </div>
            </div>
            
            {manager && (
               <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center gap-2">
                  <img src={manager.avatar} className="w-6 h-6 rounded-full border border-zinc-700" alt="" />
                  <span className="text-xs text-zinc-400">Lead: <span className="text-zinc-200">{manager.name}</span></span>
               </div>
            )}
         </div>
         
         {node.children && node.children.length > 0 && (
            <div className="flex flex-col items-center">
               <div className="h-8 w-px bg-zinc-600"></div> {/* Line down from parent */}
               <div className="flex gap-8 relative pt-4">
                   {/* Horizontal line connecting children */}
                  {node.children.length > 1 && (
                     <div className="absolute top-0 left-0 right-0 h-px bg-zinc-600 w-[calc(100%-16rem)] mx-auto"></div>
                  )}
                  
                  {node.children.map((child, idx) => (
                     <div key={child.id} className="flex flex-col items-center relative">
                        {/* Line up to horizontal connector */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-4 w-px bg-zinc-600"></div>
                        <OrgChartNode node={child} />
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

// --- Member Selector Component ---
const MemberSelector = ({ 
    selectedIds, 
    onChange,
    managerId
}: { 
    selectedIds: string[], 
    onChange: (ids: string[]) => void,
    managerId?: string
}) => {
    const [search, setSearch] = useState('');
    
    // Sort users: Selected first, then alphabet
    const sortedUsers = useMemo(() => {
        return [...MOCK_USERS].sort((a, b) => {
            const aSel = selectedIds.includes(a.id);
            const bSel = selectedIds.includes(b.id);
            if (aSel && !bSel) return -1;
            if (!aSel && bSel) return 1;
            return a.name.localeCompare(b.name);
        }).filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()));
    }, [selectedIds, search]);

    const toggleMember = (id: string) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter(mid => mid !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[300px]">
             <div className="p-3 border-b border-zinc-800 bg-zinc-900/30">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                    <input 
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-primary placeholder:text-zinc-600"
                        placeholder="Search employees..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {sortedUsers.map(u => {
                    const isSelected = selectedIds.includes(u.id);
                    const isManager = u.id === managerId;
                    return (
                        <div 
                            key={u.id}
                            onClick={() => toggleMember(u.id)}
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                                isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-zinc-900 border border-transparent'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={u.avatar} className="w-8 h-8 rounded-full bg-zinc-800 object-cover" alt="" />
                                    {isSelected && (
                                        <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5 border-2 border-zinc-950">
                                            <Check size={8} strokeWidth={4} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                                        {u.name} {isManager && <span className="text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded ml-1">LEAD</span>}
                                    </div>
                                    <div className="text-xs text-zinc-500">{u.role}</div>
                                </div>
                            </div>
                            {isSelected ? (
                                <span className="text-xs font-bold text-primary">Added</span>
                            ) : (
                                <Plus size={16} className="text-zinc-600" />
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="p-2 border-t border-zinc-800 bg-zinc-900/30 text-center text-xs text-zinc-500">
                {selectedIds.length} members selected
            </div>
        </div>
    );
};


export const Department = () => {
  const [selectedDept, setSelectedDept] = useState<DepartmentNode>(MOCK_DEPARTMENTS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'details' | 'chart'>('details');
  
  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Edit/Add Form State
  const [editFormData, setEditFormData] = useState<Partial<DepartmentNode>>({});
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

  // Find manager details based on ID
  const manager = MOCK_USERS.find(u => u.id === selectedDept.managerId);
  
  // Filter members belonging to this department (Mock Logic)
  const members = MOCK_USERS.filter(u => 
      u.department === selectedDept.name || 
      (selectedDept.name === 'Engineering' && ['Engineering', 'Backend', 'Frontend', 'Quality'].includes(u.department)) 
  );

  const openEditModal = () => {
     setEditFormData({
        name: selectedDept.name,
        description: selectedDept.description,
        location: selectedDept.location,
        managerId: selectedDept.managerId
     });
     // Pre-populate members based on mock logic
     setSelectedMemberIds(members.map(m => m.id));
     setIsEditModalOpen(true);
  };

  const openAddModal = () => {
      setEditFormData({
          name: '',
          description: '',
          location: '',
          managerId: ''
      });
      setSelectedMemberIds([]);
      setIsAddModalOpen(true);
  }

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1">Departments</h1>
           <p className="text-zinc-400 text-sm">Organization chart and hierarchy management</p>
        </div>
        <div className="flex gap-3">
           <div className="bg-zinc-900 p-1 rounded-lg border border-zinc-800 flex gap-1">
              <button 
                onClick={() => setViewMode('details')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'details' ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
                title="Details View"
              >
                 <ListTree size={16} />
              </button>
              <button 
                onClick={() => setViewMode('chart')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'chart' ? 'bg-zinc-700 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'}`}
                title="Org Chart View"
              >
                 <LayoutTemplate size={16} />
              </button>
           </div>
           <Button variant="outline"><Users size={16} /> Directory</Button>
           <Button onClick={openAddModal}><Plus size={16} /> Add Department</Button>
        </div>
      </div>

      {viewMode === 'details' ? (
         <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
            {/* Left Panel: Tree View */}
            <Card className="lg:col-span-4 flex flex-col p-4 min-h-0 bg-zinc-900/30">
               <div className="relative mb-4 shrink-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <Input 
                     placeholder="Search hierarchy..." 
                     className="pl-9 bg-zinc-950/50"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               
               <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
                  <div className="space-y-1">
                     {MOCK_DEPARTMENTS.map(dept => (
                        <DeptTreeItem 
                           key={dept.id} 
                           node={dept} 
                           level={0} 
                           selectedId={selectedDept.id}
                           onSelect={setSelectedDept}
                        />
                     ))}
                  </div>
               </div>
            </Card>

            {/* Right Panel: Details */}
            <div className="lg:col-span-8 flex flex-col gap-6 overflow-y-auto pr-1 scrollbar-thin">
               {/* Header Info */}
               <Card className="p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="relative z-10 flex justify-between items-start mb-6">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg">
                           <Building2 size={32} className="text-zinc-400" />
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold text-white">{selectedDept.name}</h2>
                           <div className="flex items-center gap-4 mt-1 text-sm text-zinc-500">
                              <span className="flex items-center gap-1"><MapPin size={14} /> {selectedDept.location}</span>
                              <span className="flex items-center gap-1"><Users size={14} /> {members.length} Members</span>
                           </div>
                        </div>
                     </div>
                     <Button variant="outline" className="h-8 text-xs gap-2" onClick={openEditModal}>
                        <Edit2 size={12} /> Edit Details
                     </Button>
                  </div>

                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="md:col-span-2">
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Description</h3>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                           {selectedDept.description}
                        </p>
                     </div>
                     
                     {/* Manager Card */}
                     <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-4">
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                           <Briefcase size={14} /> Head of Dept
                        </h3>
                        {manager ? (
                           <div className="flex items-center gap-3">
                              <img src={manager.avatar} alt="" className="w-10 h-10 rounded-full border border-zinc-700" />
                              <div className="min-w-0">
                                 <div className="text-sm font-bold text-white truncate">{manager.name}</div>
                                 <div className="text-xs text-zinc-500 truncate">{manager.email}</div>
                              </div>
                           </div>
                        ) : (
                           <div className="text-sm text-zinc-500 italic py-2">Position Vacant</div>
                        )}
                     </div>
                  </div>
               </Card>
               
               {/* Sub-departments (If any) */}
               {selectedDept.children && selectedDept.children.length > 0 && (
                  <div>
                     <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Layers size={18} className="text-primary" /> Sub-Departments
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedDept.children.map(child => (
                           <Card 
                              key={child.id} 
                              className="p-4 hover:border-zinc-600 transition-colors cursor-pointer group"
                              onClick={() => setSelectedDept(child)}
                           >
                              <div className="flex justify-between items-start mb-2">
                                 <div className="font-bold text-zinc-200 group-hover:text-primary transition-colors">{child.name}</div>
                                 <Badge color="blue">Sub</Badge>
                              </div>
                              <p className="text-xs text-zinc-500 line-clamp-1 mb-3">{child.description}</p>
                              <div className="flex items-center gap-2 text-xs text-zinc-400">
                                 <MapPin size={12} /> {child.location}
                              </div>
                           </Card>
                        ))}
                     </div>
                  </div>
               )}

               {/* Members List */}
               <div>
                  <div className="flex items-center justify-between mb-3">
                     <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Users size={18} className="text-emerald-500" /> Members
                     </h3>
                     <div className="flex gap-2">
                        <div className="relative">
                           <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                           <input className="bg-zinc-900 border border-zinc-800 rounded-md pl-8 pr-2 py-1 text-xs text-zinc-200 w-48" placeholder="Find member..." />
                        </div>
                     </div>
                  </div>
                  
                  <Card className="overflow-hidden">
                     <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-900/50 text-zinc-400 font-medium text-xs uppercase">
                           <tr>
                              <th className="px-4 py-3">Employee</th>
                              <th className="px-4 py-3">Role</th>
                              <th className="px-4 py-3">Contacts</th>
                              <th className="px-4 py-3 text-right">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                           {members.length > 0 ? members.map(member => (
                              <tr key={member.id} className="hover:bg-zinc-900/30 transition-colors group">
                                 <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                       <img src={member.avatar} alt="" className="w-8 h-8 rounded-full border border-zinc-800" />
                                       <div>
                                          <div className="font-medium text-zinc-200">{member.name}</div>
                                          <div className="text-xs text-zinc-500">{member.department}</div>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-4 py-3 text-zinc-400">{member.role}</td>
                                 <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                       <button className="p-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors" title={member.email}>
                                          <Mail size={14} />
                                       </button>
                                       <button className="p-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                                          <Phone size={14} />
                                       </button>
                                    </div>
                                 </td>
                                 <td className="px-4 py-3 text-right">
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                       <MoreHorizontal size={16} />
                                    </Button>
                                 </td>
                              </tr>
                           )) : (
                              <tr>
                                 <td colSpan={4} className="px-4 py-8 text-center text-zinc-500 italic">
                                    No members found in this department.
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </Card>
               </div>
            </div>
         </div>
      ) : (
         /* Visual Org Chart Mode */
         <div className="flex-1 bg-zinc-950/30 border border-zinc-800/50 rounded-xl overflow-auto custom-scrollbar flex items-center justify-center p-10 min-h-0 relative">
            <div className="absolute top-4 left-4 bg-zinc-900/80 p-2 rounded text-xs text-zinc-500 border border-zinc-800">
               Interactive Org Chart
            </div>
            <div className="min-w-max">
               <OrgChartNode node={MOCK_DEPARTMENTS[0]} />
            </div>
         </div>
      )}

      {/* --- Edit Department Modal --- */}
      <Modal 
         isOpen={isEditModalOpen} 
         onClose={() => setIsEditModalOpen(false)} 
         title={`Edit Department`}
         footer={
            <>
               <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>Discard</Button>
               <Button onClick={() => setIsEditModalOpen(false)}>Save Updates</Button>
            </>
         }
      >
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* General Info Column */}
             <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Building2 size={14} /> General Info
                </h4>
                <div className="space-y-2">
                   <label className="text-xs font-medium text-zinc-400">Department Name</label>
                   <Input 
                      value={editFormData.name || ''} 
                      onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                      className="bg-zinc-950/50"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-medium text-zinc-400">Description</label>
                   <textarea 
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary min-h-[100px] resize-none"
                      value={editFormData.description || ''} 
                      onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                   />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Office Location</label>
                  <Input 
                     value={editFormData.location || ''} 
                     onChange={(e) => setEditFormData({...editFormData, location: e.target.value})}
                     className="bg-zinc-950/50"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Head of Department</label>
                  <select 
                     className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 text-sm focus:outline-none focus:border-primary"
                     value={editFormData.managerId || ''}
                     onChange={(e) => setEditFormData({...editFormData, managerId: e.target.value})}
                  >
                     <option value="">Select Manager...</option>
                     {MOCK_USERS.map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                     ))}
                  </select>
               </div>
             </div>

             {/* Members Column */}
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                        <Users size={14} /> Team Composition
                    </h4>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{selectedMemberIds.length} Added</span>
                </div>
                
                {/* Custom Member Selector */}
                <MemberSelector 
                    selectedIds={selectedMemberIds} 
                    onChange={setSelectedMemberIds} 
                    managerId={editFormData.managerId}
                />
             </div>
         </div>
      </Modal>

      {/* --- Add Department Modal --- */}
      <Modal 
         isOpen={isAddModalOpen} 
         onClose={() => setIsAddModalOpen(false)} 
         title="Create New Department"
         footer={
            <>
               <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
               <Button onClick={() => setIsAddModalOpen(false)}>Create Department</Button>
            </>
         }
      >
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* General Info */}
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-xs font-medium text-zinc-400">Department Name</label>
                   <Input placeholder="e.g. Innovation Labs" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} />
                </div>
                 <div className="space-y-2">
                   <label className="text-xs font-medium text-zinc-400">Parent Department</label>
                   <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary">
                      <option value="">None (Root Level)</option>
                      {MOCK_DEPARTMENTS[0].children?.map(d => (
                         <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-medium text-zinc-400">Description</label>
                   <textarea 
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary min-h-[80px] resize-none"
                      placeholder="Brief description of responsibilities..."
                      value={editFormData.description} 
                      onChange={e => setEditFormData({...editFormData, description: e.target.value})}
                   />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Head of Department</label>
                  <select 
                     className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary"
                     value={editFormData.managerId}
                     onChange={(e) => setEditFormData({...editFormData, managerId: e.target.value})}
                  >
                     <option value="">Assign Later</option>
                     {MOCK_USERS.map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                     ))}
                  </select>
               </div>
             </div>

             {/* Members Selection */}
             <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                        <UserPlus size={14} /> Assign Members
                    </h4>
                 </div>
                 <MemberSelector 
                    selectedIds={selectedMemberIds} 
                    onChange={setSelectedMemberIds}
                    managerId={editFormData.managerId} 
                 />
             </div>
         </div>
      </Modal>

    </div>
  );
};
