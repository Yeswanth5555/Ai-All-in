import React from 'react';
import { Bookmark, Sparkles, Scale, Sun, Moon, BookOpen } from 'lucide-react';

interface NavbarProps {
  onOpenSubmit: () => void;
  onOpenDeploymentGuide: () => void;
  onOpenAlternativesFinder: () => void;
  onOpenComparison: () => void;
  onOpenProfile: () => void;
  compareCount: number;
  favoritesCount: number;
  onNavigateHome: () => void;
  onNavigateGuides: () => void;
  activeRoute?: 'home' | 'guides' | 'guide-detail';
  onSelectCategory: (category: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSubmit,
  onOpenDeploymentGuide,
  onOpenAlternativesFinder,
  onOpenComparison,
  onOpenProfile,
  compareCount,
  favoritesCount,
  onNavigateHome,
  onNavigateGuides,
  activeRoute = 'home',
  isDarkMode,
  onToggleDarkMode,
}) => {
  const isGuidesActive = activeRoute === 'guides' || activeRoute === 'guide-detail';

  return (
    <header className="sticky top-0 z-40 ios-glass border-b border-white/50 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left font-extrabold text-xl tracking-tight whitespace-nowrap shrink-0 group cursor-pointer transition-transform hover:scale-[1.02]"
          aria-label="AI Finder Home"
        >
          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-base shadow-[0_4px_12px_rgba(37,99,235,0.35)] border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            AI
          </span>
          <span className="text-slate-900 dark:text-white font-extrabold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            AI Finder
          </span>
        </button>

        {/* Zone 2: Clean single-line nav links including How-To Guides */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/40 dark:bg-slate-800/40 p-1 rounded-2xl border border-white/60 dark:border-white/10 shadow-2xs">
          <button
            onClick={onNavigateHome}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeRoute === 'home'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                : 'hover:bg-white/90 dark:hover:bg-slate-700/80 hover:text-slate-950 dark:hover:text-white hover:scale-[1.04] active:scale-95'
            }`}
          >
            Directory
          </button>

          <button
            onClick={onNavigateGuides}
            className={`group px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              isGuidesActive
                ? 'bg-blue-600 text-white font-bold shadow-[0_2px_10px_rgba(37,99,235,0.35)]'
                : 'hover:bg-white/90 dark:hover:bg-slate-700/80 hover:text-slate-950 dark:hover:text-white hover:scale-[1.04] active:scale-95'
            }`}
          >
            <BookOpen className={`w-3.5 h-3.5 ${isGuidesActive ? 'text-white' : 'text-blue-600 dark:text-blue-400 group-hover:rotate-6 transition-transform'}`} />
            <span>How-To Guides</span>
          </button>

          <button
            onClick={onOpenAlternativesFinder}
            className="group px-3 py-1.5 rounded-xl hover:bg-white/90 dark:hover:bg-slate-700/80 hover:text-slate-950 dark:hover:text-white hover:scale-[1.04] active:scale-95 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-none hover:shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:rotate-12 group-hover:scale-115 transition-transform duration-200" />
            <span>Free Alternatives</span>
          </button>
          <button
            onClick={onOpenComparison}
            className="group px-3 py-1.5 rounded-xl hover:bg-white/90 dark:hover:bg-slate-700/80 hover:text-slate-950 dark:hover:text-white hover:scale-[1.04] active:scale-95 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-none hover:shadow-xs"
          >
            <Scale className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-115 transition-all duration-200" />
            <span>Compare {compareCount > 0 && `(${compareCount})`}</span>
          </button>
          <button
            onClick={onOpenDeploymentGuide}
            className="px-3 py-1.5 rounded-xl hover:bg-white/90 dark:hover:bg-slate-700/80 hover:text-slate-950 dark:hover:text-white hover:scale-[1.04] active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-none hover:shadow-xs"
          >
            Free Hosting Guide
          </button>
        </nav>

        {/* Zone 3: Dark Mode toggle + Profile + Submit */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Dark / Light Mode Switch */}
          <button
            onClick={onToggleDarkMode}
            className="group p-2 sm:p-2.5 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 rounded-2xl border border-white/60 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:scale-108 active:scale-90 transition-all cursor-pointer"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>

          {/* Saved bookmarks */}
          <button
            onClick={onOpenProfile}
            className="group relative p-2 sm:p-2.5 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 rounded-2xl border border-white/60 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md hover:scale-108 active:scale-90 transition-all cursor-pointer"
            title="Saved Tools & Collections"
            aria-label="Saved Tools and Profile"
          >
            <Bookmark className="w-4 h-4 group-hover:scale-115 group-hover:text-rose-500 transition-all duration-200" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-xs group-hover:scale-125 transition-transform duration-200">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Submit Tool */}
          <button
            onClick={onOpenSubmit}
            className="px-3.5 sm:px-4 py-2 text-xs font-bold text-white ios-gloss-btn rounded-xl whitespace-nowrap shrink-0 hover:scale-105 active:scale-95 gloss-sheen cursor-pointer"
          >
            Submit Tool
          </button>
        </div>
      </div>
    </header>
  );
};
