import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  SlidersHorizontal,
  Bookmark,
  BookOpen,
  Sparkles,
  Layers,
  Code2,
  Image as ImageIcon,
  Video,
  FileText,
  Presentation,
  Mic,
  Cpu,
  GraduationCap,
  TrendingUp,
  Briefcase,
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { GuideCategory, GuideDifficulty, HowToGuide } from '../types/guide';
import { GUIDE_CATEGORIES, HOW_TO_GUIDES, searchGuides } from '../data/guides';
import { GuideCard } from './GuideCard';
import { AITool } from '../types/tool';

interface GuideLibraryViewProps {
  onSelectGuide: (slug: string) => void;
  onSelectTool: (toolId: string) => void;
  toolFilterSlug?: string;
  onClearToolFilter?: () => void;
  allTools: AITool[];
  bookmarkedGuideSlugs: string[];
  onToggleBookmarkGuide: (slug: string) => void;
  guideProgressMap: Record<string, { currentStepIndex: number; completedStepIndices: number[]; isCompleted: boolean }>;
  onNavigateHome: () => void;
}

const CATEGORY_ICON_MAP: Record<GuideCategory, React.ElementType> = {
  'website-app-development': Layers,
  'ai-image-generation': ImageIcon,
  'ai-video-generation': Video,
  coding: Code2,
  writing: FileText,
  presentations: Presentation,
  'voice-audio': Mic,
  productivity: Cpu,
  education: GraduationCap,
  marketing: TrendingUp,
  'business-research': Briefcase,
};

export const GuideLibraryView: React.FC<GuideLibraryViewProps> = ({
  onSelectGuide,
  onSelectTool,
  toolFilterSlug,
  onClearToolFilter,
  allTools,
  bookmarkedGuideSlugs,
  onToggleBookmarkGuide,
  guideProgressMap,
  onNavigateHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<GuideDifficulty | 'all'>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  // If filtered by tool
  const currentFilteredTool = useMemo(() => {
    if (!toolFilterSlug) return null;
    return allTools.find((t) => t.id.toLowerCase() === toolFilterSlug.toLowerCase());
  }, [toolFilterSlug, allTools]);

  const filteredGuides = useMemo(() => {
    let guides = searchGuides(searchQuery, selectedCategory, selectedDifficulty);

    if (toolFilterSlug) {
      const norm = toolFilterSlug.toLowerCase();
      guides = guides.filter(
        (g) => g.primaryToolId.toLowerCase() === norm || g.relatedToolIds.some((id) => id.toLowerCase() === norm)
      );
    }

    if (onlyBookmarked) {
      guides = guides.filter((g) => bookmarkedGuideSlugs.includes(g.slug));
    }

    return guides;
  }, [searchQuery, selectedCategory, selectedDifficulty, toolFilterSlug, onlyBookmarked, bookmarkedGuideSlugs]);

  const totalCompleted = useMemo(() => {
    return Object.values(guideProgressMap).filter((p) => p.isCompleted).length;
  }, [guideProgressMap]);

  const isFiltered =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    onlyBookmarked ||
    Boolean(toolFilterSlug);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setOnlyBookmarked(false);
    if (onClearToolFilter) onClearToolFilter();
  };

  return (
    <div className="w-full pb-16">
      {/* Header Banner */}
      <section className="relative pt-10 pb-8 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-purple-500/20 dark:from-blue-600/15 dark:via-indigo-600/10 dark:to-purple-600/15 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Breadcrumb back button */}
          <div className="flex items-center justify-start mb-6">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 border border-white/60 dark:border-white/10 transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Directory</span>
            </button>
          </div>

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white/75 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-full shadow-xs mb-4">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Step-by-Step AI How-To Guides</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-slate-500 dark:text-slate-400">{HOW_TO_GUIDES.length} Verified Tutorials</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-2xl mx-auto text-balance text-slate-900 dark:text-white">
            Practical AI Tutorials & Workflows
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Follow structured, ordered instructions with copyable prompts, prerequisites, expected results, and troubleshooting tips to accomplish real-world tasks.
          </p>

          {/* Quick Metrics Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 bg-white/60 dark:bg-slate-800/60 px-3 py-1 rounded-full border border-white/60 dark:border-white/10 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <strong className="text-slate-900 dark:text-white">100% Free</strong> to browse & learn
            </span>
            <span className="flex items-center gap-1.5 bg-white/60 dark:bg-slate-800/60 px-3 py-1 rounded-full border border-white/60 dark:border-white/10 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <strong className="text-slate-900 dark:text-white">{totalCompleted}</strong> tutorials completed
            </span>
            <span className="flex items-center gap-1.5 bg-white/60 dark:bg-slate-800/60 px-3 py-1 rounded-full border border-white/60 dark:border-white/10 shadow-2xs">
              <Bookmark className="w-3.5 h-3.5 text-rose-500" />
              <strong className="text-slate-900 dark:text-white">{bookmarkedGuideSlugs.length}</strong> saved
            </span>
          </div>

          {/* Search Bar */}
          <div className="mt-7 max-w-2xl mx-auto text-left">
            <div className="retro-gloss-search rounded-2xl p-1.5 transition-all hover:border-blue-400/50">
              <div className="relative flex items-center">
                <div className="pl-3.5 pr-2.5 text-slate-400 dark:text-slate-500 shrink-0">
                  <Search className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search guides by task, tool, or prompt (e.g. website, video, React)..."
                  className="w-full py-3 pr-10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base bg-transparent focus:outline-none font-medium"
                  aria-label="Search tutorial library"
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all p-1 hover:scale-125 cursor-pointer"
                    aria-label="Clear tutorial search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specific Tool Filter Banner if on /tools/:slug/guides */}
      {toolFilterSlug && currentFilteredTool && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="p-4 rounded-2xl bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 ios-app-icon flex items-center justify-center font-black text-slate-800 dark:text-white text-xs shrink-0">
                {currentFilteredTool.initials}
              </div>
              <div>
                <div className="text-xs font-bold text-blue-700 dark:text-blue-300">
                  Targeted Tool Tutorials
                </div>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Showing tutorials for {currentFilteredTool.name}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectTool(currentFilteredTool.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:scale-102 transition-all cursor-pointer"
              >
                View Tool Details
              </button>
              {onClearToolFilter && (
                <button
                  onClick={onClearToolFilter}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer"
                >
                  View All Guides
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Category Pills Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="relative flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer hover:scale-[1.04] active:scale-95 ${
              selectedCategory === 'all'
                ? 'text-white ios-gloss-btn border border-white/30 shadow-[0_4px_16px_rgba(0,113,227,0.35)]'
                : 'bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 border border-white/70 dark:border-white/10 shadow-2xs'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>All Categories ({HOW_TO_GUIDES.length})</span>
          </button>

          {GUIDE_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICON_MAP[cat.id] || BookOpen;
            const isSelected = selectedCategory === cat.id;
            const count = HOW_TO_GUIDES.filter((g) => g.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer hover:scale-[1.04] active:scale-95 ${
                  isSelected
                    ? 'text-white ios-gloss-btn border border-white/30 shadow-[0_4px_16px_rgba(0,113,227,0.35)]'
                    : 'bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700/90 text-slate-700 dark:text-slate-200 border border-white/70 dark:border-white/10 shadow-2xs'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold tabular-nums ${
                    isSelected
                      ? 'bg-white/20 text-white'
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

      {/* Filter Options Bar: Difficulty, Saved Bookmark Toggle, Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white/75 dark:bg-slate-900/80 backdrop-blur-2xl rounded-2xl border border-white/80 dark:border-white/10 p-3 sm:px-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Filters:</span>
            </span>

            {/* Difficulty segmented tabs */}
            <div className="inline-flex items-center p-1 bg-slate-200/50 dark:bg-slate-800/70 rounded-xl border border-white/40 dark:border-white/5 gap-0.5">
              {(['all', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all hover:scale-104 active:scale-95 cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {diff === 'all' ? 'All Levels' : diff}
                </button>
              ))}
            </div>

            {/* Saved Guides Toggle */}
            <button
              onClick={() => setOnlyBookmarked(!onlyBookmarked)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:scale-104 active:scale-95 cursor-pointer ${
                onlyBookmarked
                  ? 'bg-rose-500 text-white border-rose-400 shadow-[0_2px_8px_rgba(244,63,94,0.3)]'
                  : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-white/80 dark:border-white/10 hover:bg-white dark:hover:bg-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-white' : ''}`} />
              <span>My Saved Guides</span>
              {bookmarkedGuideSlugs.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-bold">
                  {bookmarkedGuideSlugs.length}
                </span>
              )}
            </button>

            {/* Reset Filters */}
            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="group flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:bg-rose-50/70 dark:hover:bg-rose-950/40 rounded-xl transition-all cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3 group-hover:-rotate-90 transition-transform duration-300" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 tabular-nums font-medium whitespace-nowrap self-end sm:self-auto">
            Showing <span className="font-bold text-slate-900 dark:text-white">{filteredGuides.length}</span> tutorials
          </div>
        </div>
      </div>

      {/* Guide Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredGuides.length === 0 ? (
          <div className="p-12 text-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-white/80 dark:border-white/10 shadow-xs">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No matching tutorials found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find guides matching your current search query or active filter combination.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 text-xs font-bold text-white ios-gloss-btn rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => {
              const progress = guideProgressMap[guide.slug];
              const completedCount = progress?.completedStepIndices?.length || 0;
              const percent = guide.steps.length > 0 ? Math.round((completedCount / guide.steps.length) * 100) : 0;
              const isCompleted = Boolean(progress?.isCompleted);

              return (
                <GuideCard
                  key={guide.slug}
                  guide={guide}
                  onSelectGuide={onSelectGuide}
                  onSelectTool={onSelectTool}
                  isBookmarked={bookmarkedGuideSlugs.includes(guide.slug)}
                  onToggleBookmark={onToggleBookmarkGuide}
                  progressPercent={percent}
                  isCompleted={isCompleted}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
