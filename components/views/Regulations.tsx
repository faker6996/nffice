
import React, { useState } from 'react';
import { Card, Button, Input, Modal, Badge } from '../ui';
import { 
  BookOpen, 
  Search, 
  FileText, 
  Shield, 
  Download, 
  Eye, 
  Clock, 
  Filter,
  FolderOpen,
  ChevronRight,
  File,
  Info
} from 'lucide-react';

interface RegulationDoc {
  id: string;
  title: string;
  code: string;
  category: 'HR' | 'IT' | 'Finance' | 'Legal' | 'General';
  type: 'pdf' | 'docx' | 'xlsx';
  size: string;
  updatedAt: string;
  version: string;
  description: string;
  isNew?: boolean;
}

const MOCK_DOCS: RegulationDoc[] = [
  {
    id: 'reg-1',
    title: 'Employee Code of Conduct 2024',
    code: 'HR-2024-001',
    category: 'HR',
    type: 'pdf',
    size: '2.4 MB',
    updatedAt: 'Jan 10, 2024',
    version: 'v2.1',
    description: 'Comprehensive guidelines on professional behavior, ethics, and workplace standards.',
    isNew: true
  },
  {
    id: 'reg-2',
    title: 'Information Security Policy',
    code: 'IT-SEC-05',
    category: 'IT',
    type: 'pdf',
    size: '1.8 MB',
    updatedAt: 'Dec 15, 2023',
    version: 'v4.0',
    description: 'Rules regarding data protection, password management, and device security.',
  },
  {
    id: 'reg-3',
    title: 'Expense Reimbursement Guidelines',
    code: 'FIN-EXP-02',
    category: 'Finance',
    type: 'xlsx',
    size: '450 KB',
    updatedAt: 'Feb 01, 2024',
    version: 'v1.2',
    description: 'Instructions and limits for travel, meals, and operational expenses.',
    isNew: true
  },
  {
    id: 'reg-4',
    title: 'Remote Work & Hybrid Policy',
    code: 'HR-REM-09',
    category: 'HR',
    type: 'docx',
    size: '800 KB',
    updatedAt: 'Nov 20, 2023',
    version: 'v1.0',
    description: 'Eligibility and expectations for working from home or remote locations.',
  },
  {
    id: 'reg-5',
    title: 'Brand Identity Assets',
    code: 'MKT-001',
    category: 'General',
    type: 'pdf',
    size: '15 MB',
    updatedAt: 'Jan 05, 2024',
    version: 'v3.5',
    description: 'Official logos, color palettes, and typography usage guide.',
  },
  {
    id: 'reg-6',
    title: 'Non-Disclosure Agreement (NDA)',
    code: 'LEG-003',
    category: 'Legal',
    type: 'docx',
    size: '120 KB',
    updatedAt: 'Oct 10, 2023',
    version: 'v1.0',
    description: 'Standard template for third-party vendors and partners.',
  }
];

export const Regulations = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewDoc, setPreviewDoc] = useState<RegulationDoc | null>(null);

  const categories = ['All', 'HR', 'IT', 'Finance', 'Legal', 'General'];

  const filteredDocs = MOCK_DOCS.filter(doc => {
     const matchCategory = selectedCategory === 'All' || doc.category === selectedCategory;
     const matchSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.code.toLowerCase().includes(searchTerm.toLowerCase());
     return matchCategory && matchSearch;
  });

  const getFileIcon = (type: string) => {
     switch(type) {
        case 'pdf': return <FileText size={24} className="text-red-400" />;
        case 'docx': return <FileText size={24} className="text-blue-400" />;
        case 'xlsx': return <FileText size={24} className="text-emerald-400" />;
        default: return <File size={24} className="text-zinc-400" />;
     }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0">
         <div>
            <h1 className="text-2xl font-bold text-white mb-1">Regulations & Policies</h1>
            <p className="text-zinc-400 text-sm">Central repository for company standards and forms.</p>
         </div>
         <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-80">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
               <Input 
                  placeholder="Search by title or code..." 
                  className="pl-9 bg-zinc-900/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <Button><FolderOpen size={16} /> Suggest New</Button>
         </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
         
         {/* Sidebar Navigation */}
         <div className="hidden lg:block w-64 shrink-0 space-y-6 overflow-y-auto pr-2 scrollbar-thin">
            <Card className="p-2 bg-zinc-900/20 border-zinc-800/50">
               <div className="px-3 py-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">Categories</div>
               <div className="space-y-1">
                  {categories.map(cat => (
                     <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between items-center ${
                           selectedCategory === cat 
                           ? 'bg-primary/10 text-primary font-medium border border-primary/20' 
                           : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                        }`}
                     >
                        {cat}
                        <span className="text-xs opacity-50 bg-zinc-800 px-1.5 py-0.5 rounded">
                           {cat === 'All' ? MOCK_DOCS.length : MOCK_DOCS.filter(d => d.category === cat).length}
                        </span>
                     </button>
                  ))}
               </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/10">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><Shield size={18} /></div>
                  <h3 className="font-bold text-white text-sm">Compliance</h3>
               </div>
               <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
                  Ensure you have read the updated 2024 Security Policy by end of this month.
               </p>
               <Button variant="outline" className="w-full text-xs h-8">View Required</Button>
            </Card>
         </div>

         {/* Main Content List */}
         <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
               {filteredDocs.map(doc => (
                  <Card key={doc.id} className="group p-5 hover:border-zinc-600 transition-all cursor-pointer relative overflow-hidden" onClick={() => setPreviewDoc(doc)}>
                     {doc.isNew && (
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg shadow-sm">
                           NEW
                        </div>
                     )}
                     
                     <div className="flex gap-4">
                        {/* File Icon */}
                        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-zinc-800 transition-colors">
                           {getFileIcon(doc.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                           <div className="flex justify-between items-start mb-1">
                              <div>
                                 <h3 className="font-bold text-white group-hover:text-primary transition-colors truncate pr-8">{doc.title}</h3>
                                 <div className="text-xs text-zinc-500 font-mono mt-0.5 flex items-center gap-2">
                                    <span>{doc.code}</span>
                                    <span className="w-1 h-1 bg-zinc-700 rounded-full"/>
                                    <span>{doc.version}</span>
                                 </div>
                              </div>
                           </div>
                           
                           <p className="text-xs text-zinc-400 line-clamp-2 mb-3 mt-2">{doc.description}</p>
                           
                           <div className="flex items-center justify-between pt-3 border-t border-zinc-800/50">
                              <div className="flex items-center gap-3 text-xs text-zinc-500">
                                 <span className="flex items-center gap-1"><Clock size={12} /> {doc.updatedAt}</span>
                                 <span>{doc.size}</span>
                              </div>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded transition-colors" title="Preview">
                                    <Eye size={16} />
                                 </button>
                                 <button className="p-1.5 text-zinc-400 hover:text-primary hover:bg-primary/10 rounded transition-colors" title="Download">
                                    <Download size={16} />
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </Card>
               ))}
            </div>
            
            {filteredDocs.length === 0 && (
               <div className="flex flex-col items-center justify-center h-64 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                  <Search size={48} className="mb-4 opacity-20" />
                  <p>No documents found matching "{searchTerm}"</p>
               </div>
            )}
         </div>
      </div>

      {/* Document Preview Modal */}
      <Modal
         isOpen={!!previewDoc}
         onClose={() => setPreviewDoc(null)}
         title="Document Preview"
         footer={
            <>
               <Button variant="ghost" onClick={() => setPreviewDoc(null)}>Close</Button>
               <Button><Download size={16} /> Download {previewDoc?.type.toUpperCase()}</Button>
            </>
         }
      >
         {previewDoc && (
            <div className="space-y-6">
               <div className="flex items-start gap-4 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="w-14 h-14 rounded-lg bg-zinc-950 flex items-center justify-center shrink-0">
                     {getFileIcon(previewDoc.type)}
                  </div>
                  <div>
                     <h2 className="text-lg font-bold text-white mb-1">{previewDoc.title}</h2>
                     <div className="flex items-center gap-3 text-sm text-zinc-400">
                        <Badge color="blue">{previewDoc.category}</Badge>
                        <span>Version {previewDoc.version}</span>
                        <span>•</span>
                        <span>{previewDoc.size}</span>
                     </div>
                  </div>
               </div>

               <div>
                  <h3 className="text-sm font-bold text-white mb-2 uppercase flex items-center gap-2">
                     <Info size={16} className="text-primary" /> Abstract
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                     {previewDoc.description}. This document outlines the company's official stance and procedures. 
                     Employees are expected to read and understand these guidelines to ensure compliance with company standards.
                     Failure to comply may result in disciplinary action.
                  </p>
               </div>

               <div className="h-64 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-col items-center justify-center text-zinc-500 relative overflow-hidden group">
                  {/* Fake Document Preview UI */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <BookOpen size={48} className="mb-4 opacity-50" />
                  <p className="text-sm">Preview not available in demo mode.</p>
                  <p className="text-xs mt-1">Please download the file to view full content.</p>
               </div>
            </div>
         )}
      </Modal>

    </div>
  );
};
