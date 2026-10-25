import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  ExternalLink,
  Bookmark,
  CheckCircle,
  Star,
  Scale,
  Sparkles,
  GitBranch,
  BookOpen,
} from 'lucide-react';
import { AITool } from '../types/tool';
import { CATEGORY_LABELS } from '../utils/filterAndSearch';
import { getGuidesForTool } from '../data/guides';

interface ToolCardProps {
  tool: AITool;
  onSelectTool: (tool: AITool) => void;
  onToggleCompare: (toolId: string) => void;
  isCompared: boolean;
  onToggleFavorite: (toolId: string) => void;
  isFavorite: boolean;
  onSelectAlternative?: (altId: string) => void;
  onSelectGuide?: (slug: string) => void;
  viewMode?: 'grid' | 'list';
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onSelectTool,
  onToggleCompare,
  isCompared,
  onToggleFavorite,
  isFavorite,
  onSelectAlternative,
  onSelectGuide,
  viewMode = 'grid',
}) => {
  const categoryLabel = CATEGORY_LABELS[tool.category] || tool.category;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const relevantGuides = getGuidesForTool(tool.id);
  const primaryGuide = relevantGuides[0];

  // Spring physics for buttery-smooth magnetic motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 320, damping: 24, mass: 0.6 };
  const mouseXSpring = useSpring(mouseX, { ...springConfig });
  const mouseYSpring = useSpring(mouseY, { ...springConfig });

  // Magnetic translation (subtle cursor follow)
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-7, 7]);

  // Subtle 3D tilt for grid mode
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const xPct = currentX / width - 0.5;
    const yPct = currentY / height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
    setGlarePos({
      x: Math.round((currentX / width) * 100),
      y: Math.round((currentY / height) * 100),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          x: translateX,
          y: translateY,
        }}
        animate={{
          scale: isHovered ? 1.01 : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 350, damping: 25 },
        }}
        className="relative ios-glass-card rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 group overflow-hidden will-change-transform"
      >
        {/* Specular Liquid Glare highlight spot */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 75%)`,
            }}
          />
        )}

        {/* Left: Identity and Summary */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0 relative z-20">
          <div
            onClick={() => onSelectTool(tool)}
            className="w-12 h-12 ios-app-icon flex items-center justify-center font-black text-slate-800 dark:text-slate-100 text-sm shrink-0 cursor-pointer group-hover:scale-105 transition-transform"
          >
            {tool.initials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3
                onClick={() => onSelectTool(tool)}
                className="text-base font-bold text-slate-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                {tool.name}
              </h3>
              {tool.isVerified && (
                <CheckCircle
                  className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0"
                  title="Verified Information"
                />
              )}
              {tool.isOpenSource && (
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/90 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200/60 dark:border-emerald-800/40">
                  <GitBranch className="w-3 h-3" />
                  <span>Open Source</span>
                </span>
              )}
            </div>

            {/* Zero-pill unboxed metadata */}
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-800 dark:text-slate-200">{tool.pricingModel}</span>
              <span aria-hidden="true">·</span>
              <span>{categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{tool.platforms.slice(0, 3).join(', ')}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-800 dark:text-slate-200 font-bold">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="tabular-nums">{tool.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({tool.reviewCount})</span>
              </span>
            </div>

            {tool.tags.includes('edit-names-in-pdf') && (
              <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300 border border-emerald-500/25">
                <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
                <span>Purpose: PDF Text & Name Editing</span>
              </div>
            )}

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-1 font-medium">{tool.tagline}</p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center relative z-20">
          <button
            onClick={() => onToggleCompare(tool.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              isCompared
                ? 'bg-blue-600 text-white border-blue-500 shadow-[0_2px_8px_rgba(37,99,235,0.3)]'
                : 'bg-white/80 dark:bg-slate-800/80 border-white/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:border-blue-400'
            }`}
            title="Toggle Compare"
            aria-label={`Compare ${tool.name}`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isCompared ? 'Compared' : 'Compare'}</span>
          </button>

          <button
            onClick={() => onToggleFavorite(tool.id)}
            className={`p-2 rounded-xl border transition-all hover:scale-115 active:scale-90 cursor-pointer ${
              isFavorite
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 shadow-2xs'
                : 'bg-white/80 dark:bg-slate-800/80 border-white/80 dark:border-white/10 text-slate-400 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-white dark:hover:bg-slate-700 hover:border-rose-300'
            }`}
            title={isFavorite ? 'Remove from saved' : 'Save tool'}
            aria-label={`Save ${tool.name}`}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
          </button>

          {primaryGuide && onSelectGuide && (
            <button
              onClick={() => onSelectGuide(primaryGuide.slug)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/60 hover:bg-blue-100/90 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-800/60 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
              title={`Learn Step by Step: ${primaryGuide.title}`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Learn Step by Step</span>
            </button>
          )}

          <button
            onClick={() => onSelectTool(tool)}
            className="px-3.5 py-1.5 text-xs font-bold text-white ios-gloss-btn rounded-xl hover:scale-105 active:scale-95 gloss-sheen cursor-pointer"
          >
            Details
          </button>

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 rounded-xl border border-white/80 dark:border-white/10 hover:border-blue-300 transition-all hover:scale-115 active:scale-90 cursor-pointer"
            title={`Visit official site for ${tool.name}`}
            aria-label={`Visit official site for ${tool.name}`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    );
  }

  // Grid View with 3D perspective magnetic tilt and scale
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: translateX,
        y: translateY,
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 800,
      }}
      animate={{
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        scale: { type: 'spring', stiffness: 350, damping: 25 },
      }}
      className="relative ios-glass-card rounded-2xl p-5 flex flex-col justify-between h-full group overflow-hidden will-change-transform"
    >
      {/* Specular Liquid Glare highlight spot */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle 260px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 80%)`,
          }}
        />
      )}

      <div className="relative z-20">
        {/* Top bar of card */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              onClick={() => onSelectTool(tool)}
              className="w-12 h-12 ios-app-icon flex items-center justify-center font-black text-slate-800 dark:text-slate-100 text-base shrink-0 cursor-pointer group-hover:scale-105 transition-transform"
            >
              {tool.initials}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3
                  onClick={() => onSelectTool(tool)}
                  className="text-base font-extrabold text-slate-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {tool.name}
                </h3>
                {tool.isVerified && (
                  <CheckCircle
                    className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0"
                    title="Verified Information"
                  />
                )}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">{tool.company}</div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onToggleFavorite(tool.id)}
              className={`p-1.5 rounded-xl transition-all ${
                isFavorite
                  ? 'text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/40 shadow-2xs'
                  : 'text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/80'
              }`}
              title={isFavorite ? 'Saved in favorites' : 'Bookmark tool'}
              aria-label={`Save ${tool.name}`}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Zero-pill unboxed metadata */}
        <div className="text-xs text-slate-500 dark:text-slate-400 mt-3.5 flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-800 dark:text-slate-200">{tool.pricingModel}</span>
          <span aria-hidden="true">·</span>
          <span>{categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>Est. {tool.launchYear}</span>
        </div>

        {tool.tags.includes('edit-names-in-pdf') && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300 border border-emerald-500/25">
            <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
            <span>PDF Text & Name Editing</span>
          </div>
        )}

        {/* Tagline & short description */}
        <p className="mt-2 text-xs font-semibold text-slate-900 dark:text-white line-clamp-1">{tool.tagline}</p>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>

        {/* Key capabilities bullet strip */}
        <div className="mt-3.5 pt-3 border-t border-white/60 dark:border-white/10">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Key Highlights
          </div>
          <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
            {tool.keyFeatures.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="line-clamp-1 flex items-start gap-1.5">
                <span className="text-blue-500 font-bold shrink-0">•</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Free Alternative hint if tool is paid or freemium */}
        {tool.freeAlternatives && tool.freeAlternatives.length > 0 && onSelectAlternative && (
          <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 bg-white/60 dark:bg-slate-800/60 p-2 rounded-xl border border-white/80 dark:border-white/10 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="truncate">
              Free alternative:{' '}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectAlternative(tool.freeAlternatives[0]);
                }}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Explore options →
              </button>
            </span>
          </div>
        )}

        {/* Step-by-Step Tutorial Link if available */}
        {primaryGuide && onSelectGuide && (
          <div className="mt-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectGuide(primaryGuide.slug);
              }}
              className="w-full py-2 px-3 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/60 hover:bg-blue-100/90 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-800/60 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group/guide"
              title={`Open Tutorial: ${primaryGuide.title}`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover/guide:rotate-6 transition-transform" />
              <span>Learn Step by Step ({primaryGuide.estimatedDuration})</span>
            </button>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="mt-5 pt-3 border-t border-white/60 dark:border-white/10 flex items-center justify-between gap-2 relative z-20">
        <div className="flex items-center gap-1 text-xs text-slate-800 dark:text-slate-200">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="font-bold tabular-nums">{tool.rating.toFixed(1)}</span>
          <span className="text-slate-400 font-normal">({tool.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleCompare(tool.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1 transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              isCompared
                ? 'bg-blue-600 text-white border-blue-500 shadow-[0_2px_8px_rgba(37,99,235,0.3)]'
                : 'bg-white/70 dark:bg-slate-800/70 border-white/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:border-blue-400'
            }`}
            title="Add to side-by-side comparison"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isCompared ? 'Added' : 'Compare'}</span>
          </button>

          <button
            onClick={() => onSelectTool(tool)}
            className="px-3.5 py-1.5 text-xs font-bold text-white ios-gloss-btn rounded-xl hover:scale-105 active:scale-95 gloss-sheen cursor-pointer"
          >
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};
