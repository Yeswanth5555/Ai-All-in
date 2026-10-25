import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Bookmark,
  Scale,
  Star,
  GitBranch,
  ShieldCheck,
  Code,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  MessageSquarePlus,
  BookOpen,
  Copy,
  Check,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { AITool, UserReview } from '../types/tool';
import { CATEGORY_LABELS, generateToolSchemaJsonLd, getFreeAlternatives } from '../utils/filterAndSearch';
import { getGuidesForTool } from '../data/guides';
import { copyToClipboard } from '../utils/clipboard';

interface ToolDetailModalProps {
  tool: AITool | null;
  onClose: () => void;
  onSelectTool: (tool: AITool) => void;
  onToggleCompare: (toolId: string) => void;
  isCompared: boolean;
  onToggleFavorite: (toolId: string) => void;
  isFavorite: boolean;
  allTools: AITool[];
  reviews: UserReview[];
  onAddReview: (review: Omit<UserReview, 'id' | 'date'>) => void;
  onSelectGuide?: (slug: string) => void;
  onViewAllGuidesForTool?: (toolId: string) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  onClose,
  onSelectTool,
  onToggleCompare,
  isCompared,
  onToggleFavorite,
  isFavorite,
  allTools,
  reviews,
  onAddReview,
}) => {
  const [showJsonLd, setShowJsonLd] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Review Form State
  const [reviewName, setReviewName] = useState('');
  const [reviewRole, setReviewRole] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewPros, setReviewPros] = useState('');
  const [reviewCons, setReviewCons] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [copiedStarterPrompt, setCopiedStarterPrompt] = useState(false);

  if (!tool) return null;

  const freeAlternatives = getFreeAlternatives(tool, allTools);
  const toolReviews = reviews.filter((r) => r.toolId === tool.id);
  const categoryLabel = CATEGORY_LABELS[tool.category] || tool.category;
  const jsonLdString = generateToolSchemaJsonLd(tool);
  const toolGuides = getGuidesForTool(tool.id);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    onAddReview({
      toolId: tool.id,
      userName: reviewName.trim(),
      userRole: reviewRole.trim() || 'AI Practitioner',
      rating: reviewRating,
      title: reviewTitle.trim() || 'Tool Review',
      comment: reviewComment.trim(),
      pros: reviewPros.trim(),
      cons: reviewCons.trim(),
      verifiedUser: true,
    });

    setReviewName('');
    setReviewRole('');
    setReviewTitle('');
    setReviewComment('');
    setReviewPros('');
    setReviewCons('');
    setShowReviewForm(false);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-[0_25px_70px_rgba(0,0,0,0.4)] border border-white/80 dark:border-white/10 relative flex flex-col text-slate-900 dark:text-slate-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tool-detail-title"
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl px-6 py-4 border-b border-white/60 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>{categoryLabel}</span>
            <span aria-hidden="true">/</span>
            <span className="font-bold text-slate-900 dark:text-white">{tool.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(tool.id)}
              className={`p-2 rounded-xl border transition-all ${
                isFavorite
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400'
                  : 'bg-white/80 dark:bg-slate-800/80 border-white/80 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700'
              }`}
              title={isFavorite ? 'Saved in favorites' : 'Save tool'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>

            <button
              onClick={() => onToggleCompare(tool.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all ${
                isCompared
                  ? 'bg-blue-600 text-white border-blue-500 shadow-[0_2px_8px_rgba(37,99,235,0.3)]'
                  : 'bg-white/80 dark:bg-slate-800/80 border-white/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? 'Compared' : 'Compare'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800 rounded-xl border border-transparent hover:border-white/80 dark:hover:border-white/10 transition-all ml-1"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-7">
          {/* Top Identity Block */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 ios-app-icon flex items-center justify-center font-black text-slate-800 dark:text-white text-2xl shrink-0">
                {tool.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 id="tool-detail-title" className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {tool.name}
                  </h2>
                  {tool.isVerified && (
                    <span className="inline-flex items-center gap-1 text-xs text-blue-700 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full font-bold border border-blue-200/60 dark:border-blue-800/60 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  )}
                  {tool.isOpenSource && (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200/60 dark:border-emerald-800/60 shadow-2xs">
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Open Source</span>
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">{tool.tagline}</p>

                {/* Zero-pill metadata */}
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex flex-wrap items-center gap-2">
                  <span className="font-medium">{tool.company}</span>
                  <span aria-hidden="true">·</span>
                  <span>Launched {tool.launchYear}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-bold text-slate-900 dark:text-white">{tool.pricingModel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-slate-900 dark:text-white font-bold">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{tool.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({tool.reviewCount} reviews)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Official Website CTA */}
            <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-bold text-white ios-gloss-btn rounded-xl flex items-center justify-center gap-2"
              >
                <span>Visit Official Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {tool.repositoryUrl && (
                <a
                  href={tool.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 rounded-xl border border-white/80 dark:border-white/10 transition-all flex items-center justify-center gap-2 shadow-2xs"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Executive Overview & Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Tool Overview & Purpose
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-4 rounded-2xl border border-white/80 dark:border-white/10 shadow-2xs">
              {tool.description}
            </p>
          </div>

          {/* Pricing Model & Exact Details */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Verified Pricing & Free Tier Terms
            </h3>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Model: {tool.pricingModel}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">{tool.pricingDetails}</div>
              </div>
              <div className="shrink-0">
                <span
                  className={`inline-block text-xs font-bold px-3 py-1 rounded-full border shadow-2xs ${
                    tool.hasFreeTier || tool.pricingModel === 'Free' || tool.isOpenSource
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-300/60 dark:border-emerald-800/60'
                      : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-300/60 dark:border-amber-800/60'
                  }`}
                >
                  {tool.hasFreeTier
                    ? 'Free Plan Available'
                    : tool.pricingModel === 'Free'
                    ? '100% Free'
                    : tool.isOpenSource
                    ? 'Free Open Source'
                    : 'Paid / Subscription'}
                </span>
              </div>
            </div>
          </div>

          {/* Key Capabilities */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Key Features & Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tool.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-xl p-3 shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50/60 dark:bg-emerald-950/40 backdrop-blur-xl border border-emerald-200/80 dark:border-emerald-800/40 rounded-2xl p-4.5 shadow-2xs">
              <h4 className="text-xs font-bold text-emerald-950 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <ThumbsUp className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Strengths & Pros</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200">
                {tool.pros.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/60 dark:bg-rose-950/40 backdrop-blur-xl border border-rose-200/80 dark:border-rose-800/40 rounded-2xl p-4.5 shadow-2xs">
              <h4 className="text-xs font-bold text-rose-950 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <ThumbsDown className="w-4 h-4 text-rose-700 dark:text-rose-400" />
                <span>Trade-offs & Cons</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-rose-950 dark:text-rose-200">
                {tool.cons.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 dark:text-rose-400 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Supported Platforms */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Supported Platforms
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {tool.platforms.map((plat) => (
                <span
                  key={plat}
                  className="px-3 py-1 bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-xl font-semibold shadow-2xs"
                >
                  {plat}
                </span>
              ))}
            </div>
          </div>

          {/* How to Use This Tool Section */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    How to Use {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Step-by-step tutorials, verified prompts, and practical workflows
                  </p>
                </div>
              </div>

              {toolGuides.length > 0 && onViewAllGuidesForTool && (
                <button
                  onClick={() => {
                    onClose();
                    onViewAllGuidesForTool(tool.id);
                  }}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <span>View all {tool.name} tutorials</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Step-by-Step Tutorials for this tool */}
            {toolGuides.length > 0 ? (
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Featured Step-by-Step Tutorials ({toolGuides.length})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {toolGuides.map((guide) => (
                    <div
                      key={guide.slug}
                      className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 hover:border-blue-400/50 flex flex-col justify-between transition-all hover:scale-[1.01] shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{guide.difficulty}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{guide.estimatedDuration}</span>
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                          {guide.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 font-medium">
                          {guide.task}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          {guide.pricingStatus}
                        </span>
                        {onSelectGuide && (
                          <button
                            onClick={() => {
                              onClose();
                              onSelectGuide(guide.slug);
                            }}
                            className="px-2.5 py-1 text-[11px] font-bold text-white ios-gloss-btn rounded-lg flex items-center gap-1 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          >
                            <span>Start Tutorial</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Need a dedicated walkthrough?
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Explore step-by-step guides across 11 disciplines in the How-To tutorial library.
                  </div>
                </div>
                {onViewAllGuidesForTool && (
                  <button
                    onClick={() => {
                      onClose();
                      onViewAllGuidesForTool('all');
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-700 rounded-xl border border-blue-200 dark:border-blue-800 hover:scale-102 transition-all cursor-pointer shrink-0"
                  >
                    Browse How-To Library
                  </button>
                )}
              </div>
            )}

            {/* Practical Real-World Use Cases */}
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Practical Use Cases & Workflows
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {tool.keyFeatures.slice(0, 4).map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-white/5 flex items-start gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Copyable Starter Prompt */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Copyable Starter Prompt for {tool.name}</span>
                </span>
                <button
                  onClick={async () => {
                    const starterText = `Act as an expert in ${categoryLabel}. I want to use ${tool.name} to accomplish the following task: "${tool.tagline}". Provide a detailed step-by-step plan, configuration guidelines, and best practices.`;
                    await copyToClipboard(starterText);
                    setCopiedStarterPrompt(true);
                    setTimeout(() => setCopiedStarterPrompt(false), 2500);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-blue-400 hover:scale-102 active:scale-95 transition-all cursor-pointer shadow-2xs"
                >
                  {copiedStarterPrompt ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-500" />
                      <span>Copy Starter Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] leading-relaxed border border-slate-800 select-all">
                {`Act as an expert in ${categoryLabel}. I want to use ${tool.name} to accomplish the following task: "${tool.tagline}". Provide a detailed step-by-step plan, configuration guidelines, and best practices.`}
              </div>
            </div>

            {/* Official Documentation Link */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5">
              <span>Official Reference Documentation:</span>
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Visit {tool.name} Docs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Free Alternatives Section */}
          {freeAlternatives.length > 0 && (
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Recommended Free & Open-Source Alternatives
                  </h3>
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {freeAlternatives.length} options found
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                If you want to avoid recurring subscription costs or need on-device privacy, consider these verified alternatives:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {freeAlternatives.map((alt) => (
                  <div
                    key={alt.id}
                    onClick={() => onSelectTool(alt)}
                    className="bg-white/80 dark:bg-slate-800/80 border border-white/80 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500 p-3.5 rounded-xl cursor-pointer transition-all hover:scale-[1.01] hover:shadow-xs group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {alt.name}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
                        {alt.pricingModel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{alt.tagline}</p>
                    <div className="mt-2 text-[11px] text-blue-600 dark:text-blue-400 font-bold group-hover:underline">
                      View Alternative Details →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community Reviews & Ratings */}
          <div className="pt-2 border-t border-white/60 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Community Reviews ({toolReviews.length})
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Grounded user ratings and real deployment experiences
                </div>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50/80 dark:bg-blue-950/60 hover:bg-blue-100/80 dark:hover:bg-blue-900/60 rounded-xl border border-blue-200/50 dark:border-blue-800/60 transition-all shadow-2xs"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>{showReviewForm ? 'Cancel' : 'Write a Review'}</span>
              </button>
            </div>

            {reviewSubmitted && (
              <div className="mb-4 p-3 bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs rounded-xl font-semibold shadow-2xs">
                Thank you! Your verified review has been submitted and published.
              </div>
            )}

            {/* Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleSubmitReview}
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-5 mb-5 space-y-3.5 shadow-2xs"
              >
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  Submit a review for {tool.name}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Maya Patel"
                      className="w-full text-xs bg-white/90 dark:bg-slate-900/90 border border-white/90 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Role / Discipline
                    </label>
                    <input
                      type="text"
                      value={reviewRole}
                      onChange={(e) => setReviewRole(e.target.value)}
                      placeholder="e.g. Frontend Engineer, Researcher"
                      className="w-full text-xs bg-white/90 dark:bg-slate-900/90 border border-white/90 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Rating (1 to 5 Stars)
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="p-1 text-amber-500 hover:scale-110 transition-transform"
                          aria-label={`${star} Stars`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-slate-300 dark:text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 ml-2">
                        {reviewRating} / 5
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Headline / Title
                    </label>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="e.g. Excellent for team workflows"
                      className="w-full text-xs bg-white/90 dark:bg-slate-900/90 border border-white/90 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Experience & Feedback *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Describe your actual use cases, performance, cost-efficiency, and output quality..."
                    className="w-full text-xs bg-white/90 dark:bg-slate-900/90 border border-white/90 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Top Pro (Optional)
                    </label>
                    <input
                      type="text"
                      value={reviewPros}
                      onChange={(e) => setReviewPros(e.target.value)}
                      placeholder="What you loved most"
                      className="w-full text-xs bg-white/90 dark:bg-slate-900/90 border border-white/90 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Top Con (Optional)
                    </label>
                    <input
                      type="text"
                      value={reviewCons}
                      onChange={(e) => setReviewCons(e.target.value)}
                      placeholder="What could be improved"
                      className="w-full text-xs bg-white/90 dark:bg-slate-900/90 border border-white/90 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold text-white ios-gloss-btn rounded-xl"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            )}

            {/* Existing Reviews */}
            {toolReviews.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500 bg-white/50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-white/80 dark:border-white/10">
                No user reviews yet for {tool.name}. Be the first to share your experience!
              </div>
            ) : (
              <div className="space-y-3">
                {toolReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4 space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.userName}</span>
                        {rev.userRole && (
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">· {rev.userRole}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.rating}</span>
                      </div>
                    </div>

                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{rev.title}</div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rev.comment}</p>

                    {(rev.pros || rev.cons) && (
                      <div className="pt-2 text-[11px] space-y-1">
                        {rev.pros && (
                          <div className="text-emerald-700 dark:text-emerald-400">
                            <span className="font-semibold">Pro:</span> {rev.pros}
                          </div>
                        )}
                        {rev.cons && (
                          <div className="text-rose-700 dark:text-rose-400">
                            <span className="font-semibold">Con:</span> {rev.cons}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SEO Structured Data Schema.org Viewer */}
          <div className="pt-2 border-t border-white/60 dark:border-white/10 flex items-center justify-between">
            <button
              onClick={() => setShowJsonLd(!showJsonLd)}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              <span>{showJsonLd ? 'Hide SEO Schema.org JSON-LD' : 'View SEO Schema.org JSON-LD'}</span>
            </button>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Validated SoftwareApplication Schema
            </div>
          </div>

          {showJsonLd && (
            <pre className="bg-slate-950 text-slate-200 text-[11px] p-4 rounded-2xl overflow-x-auto font-mono border border-white/10">
              {jsonLdString}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
