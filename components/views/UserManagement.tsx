
import React, { useState } from 'react';
import { Card, Button, Badge, Input, Modal } from '../ui';
import { MOCK_USERS } from '../../constants';
import { 
  UserCog, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Filter, 
  Download,
  Mail,
  Shield,
  Trash2,
  Lock,
  Edit2
} from 'lucide-react';

// Extended type for UI state
interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'Invited';
  lastActive: string;
  avatar: string;
}

const INITIAL_USERS: UserRow[] = MOCK_USERS.map((u, i) => ({
   ...u,
   status: i === 3 ? 'Invited' : 'Active',
   lastActive: i === 0 ? 'Just now' : `${i + 2} hours ago`
}));

export const UserManagement = () => {
  const [users, setUsers] = useState<UserRow[]>(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredUsers = users.filter(u => {
     const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
     const matchRole = roleFilter === 'All' || u.role.includes(roleFilter);
     return matchSearch && matchRole;
  });

  const getStatusBadge = (status: string) => {
     switch(status) {
        case 'Active': return <Badge color="green">Active</Badge>;
        case 'Inactive': return <Badge color="red">Inactive</Badge>;
        case 'Invited': return <Badge color="yellow">Pending</Badge>;
        default: return <Badge color="blue">{status}</Badge>;
     }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1">User Management</h1>
           <p className="text-zinc-400 text-sm">Manage system access, roles, and employee profiles.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline"><Download size={16} /> Export</Button>
           <Button onClick={() => setIsAddModalOpen(true)}><Plus size={16} /> Add User</Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between shrink-0">
         <div className="flex items-center gap-3 w-full md:w-auto flex-1">
            <div className="relative flex-1 md:max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
               <Input 
                  placeholder="Search by name or email..." 
                  className="pl-9 bg-zinc-950/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <div className="flex items-center gap-2 border-l border-zinc-800 pl-4">
               <Filter size={16} className="text-zinc-500" />
               <select 
                  className="bg-transparent text-sm text-zinc-300 focus:outline-none cursor-pointer"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
               >
                  <option value="All">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Dev">Developer</option>
                  <option value="Manager">Manager</option>
               </select>
            </div>
         </div>
         <div className="text-xs text-zinc-500 font-medium">
            Showing {filteredUsers.length} users
         </div>
      </Card>

      {/* Table */}
      <div className="flex-1 bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden flex flex-col min-h-0">
         <div className="overflow-auto custom-scrollbar">
            <table className="w-full text-left text-sm">
               <thead className="bg-zinc-900/80 text-zinc-400 font-medium text-xs uppercase sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                     <th className="px-6 py-4 pl-8">Employee</th>
                     <th className="px-6 py-4">Department</th>
                     <th className="px-6 py-4">Role</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Last Active</th>
                     <th className="px-6 py-4 text-right pr-8">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-zinc-800/50">
                  {filteredUsers.map((user) => (
                     <tr key={user.id} className="hover:bg-zinc-900/50 transition-colors group">
                        <td className="px-6 py-4 pl-8">
                           <div className="flex items-center gap-3">
                              <img src={user.avatar} className="w-9 h-9 rounded-full bg-zinc-800 object-cover border border-zinc-700" alt="" />
                              <div>
                                 <div className="font-bold text-white">{user.name}</div>
                                 <div className="text-xs text-zinc-500 flex items-center gap-1">
                                    <Mail size={10} /> {user.email}
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-zinc-300">{user.department}</td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-1.5">
                              <Shield size={14} className={user.role.includes('Admin') ? 'text-primary' : 'text-zinc-500'} />
                              <span className="text-zinc-300">{user.role}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           {getStatusBadge(user.status)}
                        </td>
                        <td className="px-6 py-4 text-zinc-500 text-xs font-mono">
                           {user.lastActive}
                        </td>
                        <td className="px-6 py-4 text-right pr-8">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors" title="Edit">
                                 <Edit2 size={16} />
                              </button>
                              <button className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors" title="Deactivate">
                                 <Lock size={16} />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Add User Modal */}
      <Modal 
         isOpen={isAddModalOpen} 
         onClose={() => setIsAddModalOpen(false)} 
         title="Invite New User"
         footer={
            <>
               <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
               <Button onClick={() => setIsAddModalOpen(false)}>Send Invitation</Button>
            </>
         }
      >
         <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">First Name</label>
                  <Input placeholder="John" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Last Name</label>
                  <Input placeholder="Doe" />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-xs font-medium text-zinc-400">Email Address</label>
               <Input type="email" placeholder="john.doe@nffice.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Department</label>
                  <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary">
                     <option>Engineering</option>
                     <option>Product</option>
                     <option>Sales</option>
                     <option>Marketing</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Role</label>
                  <select className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 text-sm focus:outline-none focus:border-primary">
                     <option>Employee</option>
                     <option>Manager</option>
                     <option>Admin</option>
                  </select>
               </div>
            </div>
         </div>
      </Modal>
    </div>
  );
};
