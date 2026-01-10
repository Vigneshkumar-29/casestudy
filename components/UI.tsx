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
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-sans font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide";

  const variants = {
    primary: "bg-ink-900 text-white hover:bg-black shadow-md hover:shadow-lg",
    secondary: "bg-stone-200 text-ink-900 hover:bg-stone-300",
    ghost: "text-stone-600 hover:text-ink-900 hover:bg-stone-100",
    academic: "border border-stone-300 text-stone-700 hover:border-academic-blue hover:text-academic-blue bg-transparent",
    outline: "bg-transparent border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
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
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">{label}</label>}
      <input
        className={`bg-white border border-stone-200 rounded-lg px-4 py-3 text-ink-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-academic-blue focus:border-academic-blue transition-all ${className}`}
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
      whileHover={hoverEffect && onClick ? { y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" } : {}}
      onClick={onClick}
      className={`bg-white rounded-xl border border-stone-100 shadow-paper p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Badge ---
export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'stone' }> = ({ children, color = 'stone' }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-800 border-blue-100",
    green: "bg-green-50 text-green-800 border-green-100",
    stone: "bg-stone-100 text-stone-600 border-stone-200",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[color]}`}>
      {children}
    </span>
  );
};