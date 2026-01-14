
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronDown, Check, X, Search } from 'lucide-react';

export interface Category {
  id: string | number;
  name: string;
  parent_id?: string | number;
  avatar?: string; // Optional avatar for users
  type?: 'department' | 'user';
}

interface CategoryTreeSelectProps {
  categories: Category[];
  value: (string | number)[];
  onChange: (value: (string | number)[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

interface TreeNodeProps {
  node: Category;
  level: number;
  selectedIds: Set<string | number>;
  onToggle: (id: string | number, isGroup: boolean) => void;
  childNodesMap: Record<string | number, Category[]>;
}

// Recursive Tree Node Component
const TreeNode: React.FC<TreeNodeProps> = ({ 
  node, 
  level = 0, 
  selectedIds, 
  onToggle, 
  childNodesMap 
}) => {
  const [expanded, setExpanded] = useState(true);
  const children = childNodesMap[node.id] || [];
  const hasChildren = children.length > 0;
  
  // Check selection status
  const isSelected = selectedIds.has(node.id);
  
  // For groups (departments), check if all children are selected
  const isAllChildrenSelected = hasChildren && children.every(child => selectedIds.has(child.id));
  const isIndeterminate = hasChildren && children.some(child => selectedIds.has(child.id)) && !isAllChildrenSelected;

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(node.id, hasChildren);
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-2 px-2 py-1.5 hover:bg-zinc-800/50 rounded cursor-pointer transition-colors ${level > 0 ? 'ml-6' : ''}`}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {/* Expand/Collapse Icon */}
        <div className="w-4 h-4 flex items-center justify-center shrink-0 text-zinc-500">
          {hasChildren && (
            expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          )}
        </div>

        {/* Checkbox */}
        <div 
          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
            isSelected || isAllChildrenSelected
              ? 'bg-primary border-primary text-white' 
              : isIndeterminate 
                ? 'bg-primary/50 border-primary/50 text-white'
                : 'border-zinc-600 bg-zinc-900'
          }`}
          onClick={handleCheckboxClick}
        >
          {(isSelected || isAllChildrenSelected) && <Check size={10} strokeWidth={3} />}
          {isIndeterminate && <div className="w-2 h-0.5 bg-white rounded-full" />}
        </div>

        {/* Content */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
           {node.avatar && (
             <img src={node.avatar} alt="" className="w-5 h-5 rounded-full object-cover border border-zinc-700" />
           )}
           <span className={`text-sm truncate ${isSelected ? 'text-white font-medium' : 'text-zinc-300'}`}>
             {node.name}
           </span>
        </div>
      </div>

      {/* Render Children */}
      {hasChildren && expanded && (
        <div className="border-l border-zinc-800 ml-[19px]">
          {children.map(child => (
            <TreeNode 
              key={child.id} 
              node={child} 
              level={level + 1} 
              selectedIds={selectedIds} 
              onToggle={onToggle}
              childNodesMap={childNodesMap}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const CategoryTreeSelect: React.FC<CategoryTreeSelectProps> = ({
  categories,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");

  // Build tree structure map
  const { rootNodes, childNodesMap, nodeMap } = useMemo(() => {
    const rootNodes: Category[] = [];
    const childNodesMap: Record<string | number, Category[]> = {};
    const nodeMap: Record<string | number, Category> = {};

    categories.forEach(cat => {
      nodeMap[cat.id] = cat;
      if (cat.parent_id) {
        if (!childNodesMap[cat.parent_id]) childNodesMap[cat.parent_id] = [];
        childNodesMap[cat.parent_id].push(cat);
      } else {
        rootNodes.push(cat);
      }
    });
    return { rootNodes, childNodesMap, nodeMap };
  }, [categories]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (id: string | number, isGroup: boolean) => {
    const newSelected = new Set(value);
    
    // Helper to get all descendant leaf IDs (users)
    const getDescendantIds = (nodeId: string | number): (string | number)[] => {
       const children = childNodesMap[nodeId] || [];
       let ids: (string | number)[] = [];
       children.forEach(child => {
          // If it's a leaf (user), add it. If it's a group, recurse.
          // Based on mock data, only users are selectable leaves, departments are containers.
          if (!childNodesMap[child.id]) {
             ids.push(child.id);
          } else {
             ids.push(...getDescendantIds(child.id));
          }
       });
       return ids;
    };

    if (isGroup) {
       // It's a department/group
       const childrenIds = getDescendantIds(id);
       const allChildrenSelected = childrenIds.every(cid => newSelected.has(cid));

       if (allChildrenSelected) {
          // Deselect all
          childrenIds.forEach(cid => newSelected.delete(cid));
       } else {
          // Select all
          childrenIds.forEach(cid => newSelected.add(cid));
       }
    } else {
       // It's a leaf/user
       if (newSelected.has(id)) {
         newSelected.delete(id);
       } else {
         newSelected.add(id);
       }
    }
    
    onChange(Array.from(newSelected));
  };

  const removeTag = (id: string | number) => {
    const newSelected = value.filter(v => v !== id);
    onChange(newSelected);
  };

  const selectedNodes = value.map(id => nodeMap[id]).filter(Boolean);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger */}
      <div 
        className={`min-h-[42px] w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-3 py-2 flex flex-wrap gap-2 items-center cursor-pointer transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-zinc-700 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {selectedNodes.length === 0 ? (
          <span className="text-zinc-500 text-sm">{placeholder}</span>
        ) : (
          selectedNodes.map(node => (
            <span key={node.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-200">
              {node.avatar && <img src={node.avatar} className="w-3.5 h-3.5 rounded-full" alt="" />}
              {node.name}
              <div 
                 role="button"
                 className="p-0.5 hover:text-red-400 cursor-pointer"
                 onClick={(e) => { e.stopPropagation(); removeTag(node.id); }}
              >
                <X size={10} />
              </div>
            </span>
          ))
        )}
        <div className="flex-1" />
        <ChevronDown size={16} className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
           {/* Search */}
           <div className="p-2 border-b border-zinc-800">
              <div className="relative">
                 <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                 <input 
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded px-8 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-primary/50"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                 />
              </div>
           </div>
           
           {/* Tree List */}
           <div className="max-h-60 overflow-y-auto p-2 scrollbar-thin">
              {rootNodes.map(node => (
                 <TreeNode 
                   key={node.id} 
                   node={node} 
                   level={0} 
                   selectedIds={new Set(value)} 
                   onToggle={handleToggle}
                   childNodesMap={childNodesMap}
                 />
              ))}
              {rootNodes.length === 0 && <div className="text-zinc-500 text-xs text-center py-4">No data</div>}
           </div>
        </div>
      )}
    </div>
  );
};
