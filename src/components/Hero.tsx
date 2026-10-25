import React from 'react';
import { Search, X, Sparkles, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';
import { detectSearchIntent } from '../utils/filterAndSearch';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  totalToolsCount: number;
  openSourceCount: number;
  freeCount: number;
  filteredCount?: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  totalToolsCount,
  openSourceCount,
  freeCount,
  filteredCount,
}) => {
  const detectedIntent = searchQuery ? detectSearchIntent(searchQuery) : null;

  const sampleTasks = [
    { label: 'Edit names in PDF', query: 'editing names in the pdf' },
    { label: 'Remove video background', query: 'remove background from video' },
    { label: 'Separate song stems', query: 'separate vocals from song' },
    { label: 'Unit test code', query: 'generate unit tests for code' },
    { label: 'Clone voice', query: 'clone my voice' },
    { label: 'Excel formulas', query: 'spreadsheet formulas' },
  ];

  return (
    <section className="relative pt-12 pb-10 overflow-hidden">
      {/* Ambient Cyber-Gloss Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-gradient-to-tr from-cyan-400/20 via-blue-500/15 to-emerald-400/20 dark:from-cyan-500/15 dark:via-blue-600/10 dark:to-emerald-500/15 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Retro-Minimal Trust Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white/75 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.4)] mb-5 hover:scale-105 hover:border-blue-400/40 transition-all duration-200 cursor-default">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="tracking-wide">AI Directory & Intent-Based Search</span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="text-slate-500 dark:text-slate-400">{totalToolsCount}+ Indexed</span>
        </div>

        {/* Clear Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl mx-auto text-balance text-slate-900 dark:text-white">
          Find the Exact AI for Any Task
        </h1>

        {/* Minimal Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          Type your goal in plain English — like <span className="font-semibold text-slate-800 dark:text-slate-100">&quot;editing names in the pdf&quot;</span> or <span className="font-semibold text-slate-800 dark:text-slate-100">&quot;remove video background&quot;</span> — and see the verified tools built for that purpose.
        </p>

        {/* Retro-Glossy Search Container */}
        <div className="mt-7 max-w-2xl mx-auto text-left">
          <div className="retro-gloss-search rounded-2xl p-1.5 transition-all hover:border-sky-400/50">
            <div className="relative flex items-center">
              <div className="pl-3.5 pr-2.5 text-slate-400 dark:text-slate-500 shrink-0">
                <Search className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="What do you want to accomplish? (e.g. editing names in the pdf)..."
                className="w-full py-3 pr-10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base bg-transparent focus:outline-none font-medium"
                aria-label="Search AI Tools by intent or keyword"
              />

              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all p-1 hover:scale-125 hover:rotate-90 active:scale-95 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Retro-Glossy Intent Indicator HUD */}
            {detectedIntent && (
              <div className="mt-1.5 pt-2 border-t border-slate-200/70 dark:border-white/10 px-3 pb-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-start sm:items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300 border border-emerald-500/25 shrink-0 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {detectedIntent.badge}
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {detectedIntent.label}
                    </span>
                  </div>

                  {filteredCount !== undefined && (
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono text-[11px] self-end sm:self-auto">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{filteredCount} matching {filteredCount === 1 ? 'tool' : 'tools'}</span>
                    </div>
                  )}
                </div>

                <p className="mt-1.5 text-slate-600 dark:text-slate-300 text-[11px] sm:text-xs leading-relaxed font-normal">
                  {detectedIntent.summary}
                </p>
              </div>
            )}
          </div>

          {/* Minimal Retro Task Suggestions Chips */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span className="font-semibold text-slate-500 dark:text-slate-400 mr-0.5 flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3 h-3 text-cyan-500 animate-pulse" />
              <span>Try task:</span>
            </span>

            {sampleTasks.map((item) => {
              const isActive = searchQuery.toLowerCase() === item.query.toLowerCase();
              return (
                <button
                  key={item.label}
                  onClick={() => onSearchChange(item.query)}
                  className={`retro-chip px-2.5 py-1 text-[11px] sm:text-xs font-medium rounded-xl transition-all hover:scale-106 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                    isActive
                      ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimal High-Clarity Stats Strip */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl p-3 rounded-2xl border border-white/80 dark:border-white/10 shadow-2xs hover:scale-[1.04] hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-md transition-all duration-200 cursor-default group">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {totalToolsCount}+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Verified Tools</div>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl p-3 rounded-2xl border border-white/80 dark:border-white/10 shadow-2xs hover:scale-[1.04] hover:-translate-y-1 hover:border-indigo-400/40 hover:shadow-md transition-all duration-200 cursor-default group">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">11</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Categories</div>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl p-3 rounded-2xl border border-white/80 dark:border-white/10 shadow-2xs hover:scale-[1.04] hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-md transition-all duration-200 cursor-default group">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums group-hover:scale-105 transition-transform">
              {openSourceCount}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Open Source</div>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl p-3 rounded-2xl border border-white/80 dark:border-white/10 shadow-2xs hover:scale-[1.04] hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-md transition-all duration-200 cursor-default group">
            <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 tabular-nums group-hover:scale-105 transition-transform">
              {freeCount}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Free or Freemium</div>
          </div>
        </div>
      </div>
    </section>
  );
};
