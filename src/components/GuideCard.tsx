import React from 'react';
import {
  Clock,
  Sparkles,
  Bookmark,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { HowToGuide } from '../types/guide';
import { GUIDE_CATEGORIES } from '../data/guides';

interface GuideCardProps {
  guide: HowToGuide;
  onSelectGuide: (slug: string) => void;
  onSelectTool?: (toolId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  progressPercent?: number;
  isCompleted?: boolean;
}

export const GuideCard: React.FC<GuideCardProps> = ({
  guide,
  onSelectGuide,
  onSelectTool,
  isBookmarked,
  onToggleBookmark,
  progressPercent = 0,
  isCompleted = false,
}) => {
  const categoryMeta = GUIDE_CATEGORIES.find((c) => c.id === guide.category);

  const difficultyColors = {
    Beginner: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
    Intermediate: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30',
    Advanced: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30',
  };

  return (
    <div className="relative ios-glass-card rounded-2xl p-5 flex flex-col justify-between transition-all hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl group">
      {/* Top Meta Strip */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-white/60 dark:border-white/10">
              {categoryMeta?.label || guide.category}
            </span>

            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                difficultyColors[guide.difficulty] || difficultyColors.Beginner
              }`}
            >
              {guide.difficulty}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(guide.slug);
            }}
            className={`p-1.5 rounded-xl border transition-all hover:scale-115 active:scale-90 cursor-pointer ${
              isBookmarked
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 shadow-2xs'
                : 'bg-white/80 dark:bg-slate-800/80 border-white/80 dark:border-white/10 text-slate-400 hover:text-rose-500 hover:border-rose-300'
            }`}
            title={isBookmarked ? 'Remove guide from bookmarks' : 'Bookmark guide'}
            aria-label={`Bookmark ${guide.title}`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-600 text-rose-600' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelectGuide(guide.slug)}
          className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer leading-snug line-clamp-2"
        >
          {guide.title}
        </h3>

        {/* Task description */}
        <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-medium">
          {guide.task}
        </p>

        {/* Recommended Tool & Pricing Pill */}
        <div className="mt-3.5 p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-white/60 dark:border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
              Tool:{' '}
              {onSelectTool ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTool(guide.primaryToolId);
                  }}
                  className="font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline cursor-pointer"
                >
                  {guide.primaryToolName}
                </button>
              ) : (
                <span className="font-bold text-slate-800 dark:text-slate-200">{guide.primaryToolName}</span>
              )}
            </span>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
            {guide.pricingStatus}
          </span>
        </div>

        {/* Progress Bar (if user started or completed steps) */}
        {progressPercent > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Completed</span>
                  </>
                ) : (
                  <span>Progress: {progressPercent}%</span>
                )}
              </span>
              <span className="text-[10px] text-slate-400 tabular-nums">
                {Math.round((progressPercent / 100) * guide.steps.length)} / {guide.steps.length} steps
              </span>
            </div>
            <div className="w-full bg-slate-200/80 dark:bg-slate-700/80 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Strip */}
      <div className="mt-4 pt-3 border-t border-white/60 dark:border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{guide.estimatedDuration}</span>
          </div>
          {guide.isVerified && (
            <div
              className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-semibold"
              title={`Verified by AI Finder engineering team (${guide.verifiedDate})`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Verified</span>
            </div>
          )}
        </div>

        <button
          onClick={() => onSelectGuide(guide.slug)}
          className="group/btn px-3.5 py-1.5 text-xs font-bold text-white ios-gloss-btn rounded-xl flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
        >
          <span>{isCompleted ? 'Review Tutorial' : progressPercent > 0 ? 'Resume' : 'Start Tutorial'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
