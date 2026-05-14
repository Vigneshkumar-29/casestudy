import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// --- Button ---
interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'academic' | 'outline';
  icon?: LucideIcon;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  icon: Icon,
  isLoading,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-xl font-sans font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide relative overflow-hidden";

  const variants = {
    primary: "bg-ink-900 text-white hover:bg-black shadow-lg shadow-ink-900/10 hover:shadow-xl hover:shadow-ink-900/20",
    secondary: "bg-stone-100 text-ink-900 hover:bg-stone-200 border border-stone-200/50",
    ghost: "text-stone-500 hover:text-ink-900 hover:bg-stone-100",
    academic: "border border-stone-300 text-stone-600 hover:border-academic-accent hover:text-academic-accent bg-transparent",
    outline: "bg-transparent border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : Icon && (
        <Icon className="w-4 h-4 mr-2" />
      )}
      {children as React.ReactNode}
    </motion.button>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-xs font-bold uppercase tracking-widest text-stone-400">{label}</label>}
      <input
        className={`bg-white border border-stone-200 rounded-xl px-4 py-3.5 text-ink-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-academic-accent/30 focus:border-academic-accent transition-all text-sm ${className}`}
        {...props}
      />
    </div>
  );
};

// --- Card ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = false }) => {
  return (
    <motion.div
      whileHover={hoverEffect && onClick ? { y: -6, boxShadow: "0 12px 40px rgba(15,20,25,0.1), 0 4px 12px rgba(15,20,25,0.05)" } : {}}
      onClick={onClick}
      className={`bg-white rounded-2xl border border-stone-200/80 shadow-card p-6 transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'stone' | 'gold' }> = ({ children, color = 'stone' }) => {
  const colors = {
    blue: "bg-academic-blue/10 text-academic-blue border-academic-blue/20",
    green: "bg-academic-green/10 text-academic-green border-academic-green/20",
    stone: "bg-stone-100 text-stone-500 border-stone-200",
    gold: "bg-academic-accent/10 text-academic-accent border-academic-accent/20",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] border ${colors[color]}`}>
      {children}
    </span>
  );
};