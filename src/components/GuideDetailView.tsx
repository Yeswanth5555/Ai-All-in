import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Bookmark,
  RotateCcw,
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  PartyPopper,
  Share2,
  Clock,
  Layers,
  BookOpen,
} from 'lucide-react';
import { HowToGuide, GuideStep } from '../types/guide';
import { GUIDE_CATEGORIES, HOW_TO_GUIDES } from '../data/guides';
import { AITool } from '../types/tool';
import { copyToClipboard } from '../utils/clipboard';

interface GuideDetailViewProps {
  guide: HowToGuide;
  onBackToLibrary: () => void;
  onSelectGuide: (slug: string) => void;
  onSelectTool: (toolId: string) => void;
  allTools: AITool[];
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  onUpdateProgress: (slug: string, currentStepIndex: number, completedStepIndices: number[], isCompleted: boolean) => void;
  savedProgress?: {
    currentStepIndex: number;
    completedStepIndices: number[];
    isCompleted: boolean;
  };
}

export const GuideDetailView: React.FC<GuideDetailViewProps> = ({
  guide,
  onBackToLibrary,
  onSelectGuide,
  onSelectTool,
  allTools,
  isBookmarked,
  onToggleBookmark,
  onUpdateProgress,
  savedProgress,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    return savedProgress ? savedProgress.currentStepIndex : 0;
  });

  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    return savedProgress ? savedProgress.completedStepIndices : [];
  });

  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  // Sync state whenever guide slug changes
  useEffect(() => {
    if (savedProgress) {
      setCurrentStepIndex(savedProgress.currentStepIndex);
      setCompletedSteps(savedProgress.completedStepIndices);
    } else {
      setCurrentStepIndex(0);
      setCompletedSteps([]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [guide.slug]);

  // Persist progress to parent (which saves to localStorage)
  const saveProgress = (newIndex: number, newCompleted: number[]) => {
    const isCompleted = newCompleted.length === guide.steps.length;
    onUpdateProgress(guide.slug, newIndex, newCompleted, isCompleted);
  };

  const handleStepCompleteToggle = (stepIdx: number) => {
    let updated: number[];
    if (completedSteps.includes(stepIdx)) {
      updated = completedSteps.filter((idx) => idx !== stepIdx);
    } else {
      updated = [...completedSteps, stepIdx];
    }
    setCompletedSteps(updated);
    saveProgress(currentStepIndex, updated);
  };

  const handleNextStep = () => {
    // Automatically mark current step as complete if not yet marked
    const newCompleted = completedSteps.includes(currentStepIndex)
      ? completedSteps
      : [...completedSteps, currentStepIndex];
    setCompletedSteps(newCompleted);

    const nextIndex = Math.min(currentStepIndex + 1, guide.steps.length - 1);
    setCurrentStepIndex(nextIndex);
    saveProgress(nextIndex, newCompleted);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handlePreviousStep = () => {
    const prevIndex = Math.max(currentStepIndex - 1, 0);
    setCurrentStepIndex(prevIndex);
    saveProgress(prevIndex, completedSteps);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleRestartTutorial = () => {
    if (window.confirm('Restart this tutorial from Step 1? This will reset your checked progress for this guide.')) {
      setCurrentStepIndex(0);
      setCompletedSteps([]);
      saveProgress(0, []);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyPrompt = async (text: string, stepId: number) => {
    await copyToClipboard(text);
    setCopiedPromptId(stepId);
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  const handleShareGuide = async () => {
    const url = `${window.location.origin}/guides/${guide.slug}`;
    await copyToClipboard(url);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2500);
  };

  const categoryMeta = GUIDE_CATEGORIES.find((c) => c.id === guide.category);
  const primaryTool = allTools.find((t) => t.id === guide.primaryToolId);
  const relatedTools = allTools.filter((t) => guide.relatedToolIds.includes(t.id));
  const relatedGuides = HOW_TO_GUIDES.filter(
    (g) => g.slug !== guide.slug && (guide.relatedGuideSlugs?.includes(g.slug) || g.category === guide.category)
  ).slice(0, 3);

  const currentStep: GuideStep = guide.steps[currentStepIndex] || guide.steps[0];
  const totalSteps = guide.steps.length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0;
  const isAllCompleted = completedSteps.length === totalSteps;

  return (
    <div className="w-full pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb Navigation */}
      <div className="pt-8 pb-4 flex items-center justify-between gap-4">
        <button
          onClick={onBackToLibrary}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 border border-white/60 dark:border-white/10 transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All How-To Guides</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 border border-white/60 dark:border-white/10 transition-all cursor-pointer shadow-2xs"
            title="Share this guide URL"
          >
            {copiedShareLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedShareLink ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={() => onToggleBookmark(guide.slug)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
              isBookmarked
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400'
                : 'bg-white/70 dark:bg-slate-800/70 border-white/60 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>
      </div>

      {/* Hero Overview Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 blur-3xl -z-10 rounded-full" />

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-white/60 dark:border-white/10">
            {categoryMeta?.label || guide.category}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/30">
            {guide.difficulty}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50 px-2.5 py-1 rounded-lg border border-white/60 dark:border-white/10">
            <Clock className="w-3.5 h-3.5" />
            <span>{guide.estimatedDuration}</span>
          </span>
          {guide.isVerified && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified ({guide.verifiedDate})</span>
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
          {guide.title}
        </h1>

        {/* 1. What the user will accomplish */}
        <div className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          <strong className="text-slate-900 dark:text-white font-semibold">Goal: </strong>
          {guide.task}
        </div>

        {/* 2. Official Tool Website & Links */}
        <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Primary Tool:</span>
            {primaryTool ? (
              <button
                onClick={() => onSelectTool(primaryTool.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-blue-600/10 text-blue-700 dark:text-blue-400 hover:bg-blue-600/20 transition-all cursor-pointer border border-blue-500/20"
              >
                <span>{primaryTool.name}</span>
                <span className="text-[10px] text-blue-500">→ Inspect Details</span>
              </button>
            ) : (
              <span className="text-xs font-bold text-slate-900 dark:text-white">{guide.primaryToolName}</span>
            )}
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 ml-1">
              • {guide.pricingStatus}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={guide.officialWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 bg-white/70 dark:bg-slate-800/70 px-3 py-1.5 rounded-xl border border-white/60 dark:border-white/10 shadow-2xs hover:scale-102 transition-all"
            >
              <span>Official Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={guide.officialDocumentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>Documentation</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. Prerequisites & Requirements Section */}
      <div className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-2xl rounded-2xl p-5 border border-white/80 dark:border-white/10 shadow-xs mb-8">
        <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Prerequisites & Account Requirements</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {guide.prerequisites.map((prereq, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{prereq.label}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    prereq.isPaid
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25'
                      : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25'
                  }`}
                >
                  {prereq.isPaid ? 'Paid Required' : '100% Free'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {prereq.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar & Step Tracker */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 border border-white/80 dark:border-white/10 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Tutorial Progress</span>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold tabular-nums">
                Step {currentStepIndex + 1} of {totalSteps}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {completedSteps.length} of {totalSteps} completed ({progressPercent}%)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRestartTutorial}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1"
              title="Restart tutorial from step 1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restart Tutorial</span>
            </button>
          </div>
        </div>

        {/* Liquid progress track */}
        <div className="w-full bg-slate-200/80 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full transition-all duration-300 ${
              isAllCompleted
                ? 'bg-emerald-500'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step clickable pills for quick navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {guide.steps.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = completedSteps.includes(idx);

            return (
              <button
                key={step.stepNumber}
                onClick={() => {
                  setCurrentStepIndex(idx);
                  saveProgress(idx, completedSteps);
                }}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md scale-102 font-bold'
                    : isCompleted
                    ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                    : 'bg-slate-100/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-white/60 dark:border-white/10 hover:bg-white dark:hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-0.5">
                  <span className="uppercase tracking-wider">Step {idx + 1}</span>
                  {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />}
                </div>
                <div className="text-[11px] truncate font-medium">{step.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Instruction Card */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-white/80 dark:border-white/10 shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/60 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
              {currentStepIndex + 1}
            </span>
            <div>
              <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Step {currentStepIndex + 1} of {totalSteps}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {currentStep.title}
              </h2>
            </div>
          </div>

          {/* Mark Complete Checkbox */}
          <button
            onClick={() => handleStepCompleteToggle(currentStepIndex)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-xs ${
              completedSteps.includes(currentStepIndex)
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-emerald-400'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                completedSteps.includes(currentStepIndex)
                  ? 'bg-white border-white text-emerald-600'
                  : 'border-slate-400'
              }`}
            >
              {completedSteps.includes(currentStepIndex) && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span>
              {completedSteps.includes(currentStepIndex) ? 'Completed!' : 'Mark Step Complete'}
            </span>
          </button>
        </div>

        {/* 4. Ordered Instructions Body */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Instructions
            </h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-line">
              {currentStep.instructions}
            </p>

            {currentStep.actionUrl && (
              <div className="mt-3">
                <a
                  href={currentStep.actionUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white ios-gloss-btn shadow-xs hover:scale-102 transition-all"
                >
                  <span>{currentStep.actionUrl.label}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* 5. Copyable Prompts and Commands */}
          {currentStep.codePrompt && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>{currentStep.codePrompt.label || 'Copyable Prompt / Code Block:'}</span>
                </span>

                <button
                  onClick={() => handleCopyPrompt(currentStep.codePrompt!.prompt, currentStepIndex)}
                  className="group flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  {copiedPromptId === currentStepIndex ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-2xl bg-slate-950 text-slate-100 p-4 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                <pre className="whitespace-pre-wrap leading-relaxed select-all">
                  {currentStep.codePrompt.prompt}
                </pre>
              </div>
            </div>
          )}

          {/* 6. Expected Results */}
          {currentStep.expectedResult && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  Expected Result
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-200 mt-0.5 leading-relaxed font-medium">
                  {currentStep.expectedResult}
                </div>
              </div>
            </div>
          )}

          {/* 7. Troubleshooting Advice */}
          {currentStep.troubleshootingAdvice && (
            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  Troubleshooting Tip
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-200 mt-0.5 leading-relaxed font-medium">
                  {currentStep.troubleshootingAdvice}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation Controls */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-4">
          <button
            onClick={handlePreviousStep}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentStepIndex === 0
                ? 'opacity-40 pointer-events-none text-slate-400 bg-slate-100 dark:bg-slate-800'
                : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 hover:scale-102 active:scale-95'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold tabular-nums">
            {currentStepIndex + 1} / {totalSteps}
          </div>

          {currentStepIndex < totalSteps - 1 ? (
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white ios-gloss-btn shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (!completedSteps.includes(currentStepIndex)) {
                  handleStepCompleteToggle(currentStepIndex);
                }
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <PartyPopper className="w-4 h-4" />
              <span>Finish Tutorial</span>
            </button>
          )}
        </div>
      </div>

      {/* Completion Celebratory View (when all steps completed) */}
      {isAllCompleted && (
        <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-blue-500/10 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-blue-950/40 backdrop-blur-3xl rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-xl mb-8 animate-in fade-in duration-300">
          <div className="flex items-center gap-3 mb-3">
            <span className="p-2 rounded-2xl bg-emerald-500 text-white shadow-md">
              <PartyPopper className="w-6 h-6" />
            </span>
            <div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Tutorial Completed!
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                You have successfully mastered this workflow.
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            All {totalSteps} steps have been executed and validated. Your progress has been automatically saved to your local browser profile.
          </p>

          {/* 8. Instructions for Testing, Exporting, or Publishing */}
          <div className="mt-5 p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-emerald-500/20">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Next Steps: Testing, Exporting & Production Launch</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {guide.testingExportInstructions}
            </p>
          </div>
        </div>
      )}

      {/* 9. Official References & Documentation */}
      <div className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-2xl rounded-2xl p-5 border border-white/80 dark:border-white/10 shadow-xs mb-8">
        <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-blue-500" />
          <span>Official References & Documentation</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {guide.officialReferences.map((ref, idx) => (
            <a
              key={idx}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/5 hover:border-blue-400/50 hover:bg-white dark:hover:bg-slate-700/80 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
            >
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                {ref.title}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 shrink-0 ml-1.5" />
            </a>
          ))}
        </div>
      </div>

      {/* 10. Relevant Alternative Tools & Related Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alternative Tools */}
        <div className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-2xl rounded-2xl p-5 border border-white/80 dark:border-white/10 shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
            Alternative Tools for This Workflow
          </h3>

          <div className="space-y-2">
            {relatedTools.length > 0 ? (
              relatedTools.map((alt) => (
                <div
                  key={alt.id}
                  onClick={() => onSelectTool(alt.id)}
                  className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/5 hover:border-blue-400/50 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 ios-app-icon flex items-center justify-center font-bold text-slate-800 dark:text-white text-xs shrink-0">
                      {alt.initials}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {alt.name}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {alt.pricingModel} • {alt.company}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                    View Tool →
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No direct alternatives listed.</p>
            )}
          </div>
        </div>

        {/* Related Guides */}
        <div className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-2xl rounded-2xl p-5 border border-white/80 dark:border-white/10 shadow-xs">
          <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
            Related How-To Tutorials
          </h3>

          <div className="space-y-2">
            {relatedGuides.map((relGuide) => (
              <div
                key={relGuide.slug}
                onClick={() => onSelectGuide(relGuide.slug)}
                className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/5 hover:border-blue-400/50 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                    {relGuide.title}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {relGuide.estimatedDuration} • {relGuide.difficulty}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
