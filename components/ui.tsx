import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-surface/50 border border-border backdrop-blur-sm rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'outline' }> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary hover:bg-primaryDark text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]",
    ghost: "text-zinc-400 hover:text-white hover:bg-white/5",
    outline: "border border-border text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: 'green' | 'blue' | 'yellow' | 'red' | 'purple' }> = ({ children, color = 'blue' }) => {
  const colors = {
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    yellow: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    className="w-full bg-zinc-950/50 border border-border rounded-lg px-4 py-2 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
    {...props} 
  />
);
