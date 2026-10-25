import React from 'react';
import { motion } from 'motion/react';
import {
  Video,
  Image as ImageIcon,
  Code2,
  FileText,
  Bot,
  Music,
  Mic,
  GraduationCap,
  BookOpen,
  Cpu,
  Briefcase,
  Layers,
} from 'lucide-react';
import { ToolCategory } from '../types/tool';

interface CategoryNavProps {
  selectedCategory: ToolCategory | 'all';
  onSelectCategory: (category: ToolCategory | 'all') => void;
  categoryCounts: Record<string, number>;
}

interface CategoryItem {
  id: ToolCategory | 'all';
  label: string;
  icon: React.ElementType;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'All Tools', icon: Layers },
  { id: 'video', label: 'AI Video', icon: Video },
  { id: 'image', label: 'Image Gen', icon: ImageIcon },
  { id: 'coding', label: 'Coding & Dev', icon: Code2 },
  { id: 'writing', label: 'Writing & Copy', icon: FileText },
  { id: 'chatbots', label: 'Chatbots & LLMs', icon: Bot },
  { id: 'music', label: 'Music Gen', icon: Music },
  { id: 'voice', label: 'Voice & Audio', icon: Mic },
  { id: 'research', label: 'Research & Science', icon: GraduationCap },
  { id: 'education', label: 'Education', icon: BookOpen },
  { id: 'automation', label: 'Automation & Agents', icon: Cpu },
  { id: 'business', label: 'Business & Productivity', icon: Briefcase },
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="w-full py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer focus:outline-none hover:scale-[1.04] hover:-translate-y-0.5 active:scale-95 duration-200 ${
                  isSelected
                    ? 'text-white'
                    : 'bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 border border-white/70 dark:border-white/10 shadow-[0_1px_6px_rgba(0,0,0,0.02)] hover:shadow-md'
                }`}
                aria-pressed={isSelected}
              >
                {/* Floating pill indicator with iOS glass blur and glowing aura */}
                {isSelected && (
                  <>
                    {/* Soft glowing ambient blur behind the selected filter */}
                    <motion.div
                      layoutId="category-glow"
                      className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/40 via-indigo-500/35 to-sky-400/40 blur-md -z-10"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                    />

                    {/* Floating pill body consistent with iOS liquid glass */}
                    <motion.div
                      layoutId="category-active-pill"
                      className="absolute inset-0 rounded-2xl ios-gloss-btn border border-white/30 shadow-[0_4px_16px_rgba(0,113,227,0.35),inset_0_1px_1px_rgba(255,255,255,0.45)] -z-10"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                    />

                    {/* Subtle glowing underline indicator with soft blur */}
                    <motion.div
                      layoutId="category-underline"
                      className="absolute -bottom-1.5 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-transparent via-sky-300 dark:via-sky-400 to-transparent blur-[0.5px] shadow-[0_0_8px_rgba(56,189,248,0.9)]"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                    />
                  </>
                )}

                <Icon
                  className={`w-4 h-4 transition-transform duration-200 relative z-10 group-hover:scale-115 ${
                    isSelected ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'
                  }`}
                />
                <span className="relative z-10 transition-colors">{cat.label}</span>
                <span
                  className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-bold tabular-nums transition-transform duration-200 group-hover:scale-105 ${
                    isSelected
                      ? 'bg-white/20 text-white backdrop-blur-xs'
                      : 'bg-slate-200/70 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
