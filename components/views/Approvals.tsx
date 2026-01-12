import React from 'react';
import { Card, Button, Badge } from '../ui';
import { MOCK_APPROVALS } from '../../constants';
import { Plus, Filter, FileText, Plane, Receipt } from 'lucide-react';

export const Approvals = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-white mb-1">Approvals</h1>
           <p className="text-zinc-400 text-sm">Manage your requests and pending approvals</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter size={16} /> Filter
          </Button>
          <Button>
            <Plus size={16} /> New Request
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Vacation', icon: Plane, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Expense', icon: Receipt, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Report', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map((type) => (
          <button key={type.label} className="group p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-all text-left">
            <div className={`w-10 h-10 rounded-lg ${type.bg} ${type.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <type.icon size={20} />
            </div>
            <div className="font-medium text-zinc-200">New {type.label}</div>
            <div className="text-xs text-zinc-500 mt-1">Create a new {type.label.toLowerCase()} request</div>
          </button>
        ))}
      </div>

      <div className="bg-zinc-900/30 rounded-xl border border-border overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-zinc-900/50 border-b border-border text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          <div className="col-span-4">Request</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Author</div>
          <div className="col-span-2 text-right">Status</div>
        </div>
        
        <div className="divide-y divide-zinc-800/50">
          {MOCK_APPROVALS.map((req) => (
            <div key={req.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="col-span-4 font-medium text-zinc-200 group-hover:text-primary transition-colors">
                {req.title}
                <div className="text-xs text-zinc-500 font-mono mt-0.5">#{req.id.toUpperCase()}</div>
              </div>
              <div className="col-span-2">
                <span className="flex items-center gap-2 text-sm text-zinc-400">
                  {req.type === 'Vacation' && <Plane size={14} />}
                  {req.type === 'Expense' && <Receipt size={14} />}
                  {req.type === 'Report' && <FileText size={14} />}
                  {req.type}
                </span>
              </div>
              <div className="col-span-2 text-sm text-zinc-400">{req.date}</div>
              <div className="col-span-2 text-sm text-zinc-300">{req.author}</div>
              <div className="col-span-2 text-right">
                <Badge color={req.status === 'Approved' ? 'green' : req.status === 'Rejected' ? 'red' : 'yellow'}>
                  {req.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
