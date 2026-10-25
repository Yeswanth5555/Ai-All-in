import React from 'react';
import { ShieldCheck, Sparkles, Server, BookOpen } from 'lucide-react';
import { ToolCategory } from '../types/tool';
import { CATEGORY_LABELS } from '../utils/filterAndSearch';

interface FooterProps {
  onSelectCategory: (category: ToolCategory | 'all') => void;
  onOpenDeploymentGuide: () => void;
  onOpenAlternativesFinder: () => void;
  onOpenSubmit: () => void;
  onNavigateGuides?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenDeploymentGuide,
  onOpenAlternativesFinder,
  onOpenSubmit,
  onNavigateGuides,
}) => {
  const categories = Object.keys(CATEGORY_LABELS) as ToolCategory[];

  return (
    <footer className="bg-white/60 dark:bg-slate-950/70 backdrop-blur-2xl border-t border-white/60 dark:border-white/10 mt-16 text-xs text-slate-500 dark:text-slate-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-base tracking-tight">
              <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                AI
              </span>
              <span>AI Finder</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs font-medium">
              A comprehensive global directory of 100+ verified artificial intelligence tools and free open-source alternatives.
            </p>
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 text-[11px] pt-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Zero sponsored or hallucinated information</span>
            </div>
          </div>

          {/* Categories 1 */}
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Core Categories
            </div>
            <ul className="space-y-2 font-medium">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1.5 transition-all text-left cursor-pointer inline-block"
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories 2 */}
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Specialized Disciplines
            </div>
            <ul className="space-y-2 font-medium">
              {categories.slice(6).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1.5 transition-all text-left cursor-pointer inline-block"
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Resources */}
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Platform Features
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={onNavigateGuides}
                  className="group hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1.5 transition-all text-left flex items-center gap-1.5 cursor-pointer font-bold text-slate-800 dark:text-slate-200"
                >
                  <BookOpen className="w-3 h-3 text-blue-600 dark:text-blue-400 group-hover:rotate-6 transition-transform" />
                  <span>How-To Guides & Tutorials</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAlternativesFinder}
                  className="group hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1.5 transition-all text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
                  <span>Free Alternatives Matcher</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDeploymentGuide}
                  className="group hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1.5 transition-all text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <Server className="w-3 h-3 text-slate-600 dark:text-slate-400 group-hover:scale-115 transition-transform" />
                  <span>Free Hosting & Deployment Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSubmit}
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1.5 transition-all text-left cursor-pointer inline-block"
                >
                  Submit a New AI Tool
                </button>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500">Schema.org JSON-LD SEO Enabled</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-white/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium">
          <div>
            © {new Date().getFullYear()} AI Finder. Independent, community-oriented AI tool index.
          </div>
          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
            <span>Verified Links</span>
            <span>·</span>
            <span>No Affiliate Bias</span>
            <span>·</span>
            <span>MIT Open Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
