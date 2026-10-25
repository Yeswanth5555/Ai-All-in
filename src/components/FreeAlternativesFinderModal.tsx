import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, DollarSign, ExternalLink } from 'lucide-react';
import { AITool } from '../types/tool';
import { getFreeAlternatives } from '../utils/filterAndSearch';

interface FreeAlternativesFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  allTools: AITool[];
  onSelectTool: (tool) => void;
  onToggleCompare: (toolId: string) => void;
}

export const FreeAlternativesFinderModal: React.FC<FreeAlternativesFinderModalProps> = ({
  isOpen,
  onClose,
  allTools,
  onSelectTool,
}) => {
  // Find commercial / paid tools to offer as starting points
  const commercialTools = allTools.filter(
    (t) => t.pricingModel === 'Paid' || (!t.isOpenSource && !t.hasFreeTier)
  );

  const [selectedToolId, setSelectedToolId] = useState<string>(
    commercialTools[0]?.id || 'midjourney'
  );

  if (!isOpen) return null;

  const currentTool = allTools.find((t) => t.id === selectedToolId) || commercialTools[0];
  const alternatives = currentTool ? getFreeAlternatives(currentTool, allTools) : [];

  const featuredSwitches = [
    { sourceId: 'midjourney', label: 'Midjourney ($30/mo)' },
    { sourceId: 'sora', label: 'OpenAI Sora ($20-$200/mo)' },
    { sourceId: 'synthesia', label: 'Synthesia ($22/mo)' },
    { sourceId: 'replit-agent', label: 'Replit Agent ($20/mo)' },
    { sourceId: 'jasper-ai', label: 'Jasper AI ($39/mo)' },
    { sourceId: 'superhuman-ai', label: 'Superhuman AI ($30/mo)' },
    { sourceId: 'duolingo-max', label: 'Duolingo Max ($30/mo)' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-[0_25px_70px_rgba(0,0,0,0.4)] border border-white/80 dark:border-white/10 relative flex flex-col text-slate-900 dark:text-slate-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="free-alternatives-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl px-6 py-4 border-b border-white/60 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 id="free-alternatives-title" className="text-base font-extrabold text-slate-900 dark:text-white">
              Free & Open-Source Alternative Matcher
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800 rounded-xl transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Many popular AI tools charge hefty monthly subscriptions. AI Finder indexes vetted free and open-source equivalents that offer identical or superior functionality without recurring bills.
          </p>

          {/* Quick Preset Selector */}
          <div>
            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Popular Expensive Tools to Replace
            </div>
            <div className="flex flex-wrap gap-2">
              {featuredSwitches.map((item) => (
                <button
                  key={item.sourceId}
                  onClick={() => setSelectedToolId(item.sourceId)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedToolId === item.sourceId
                      ? 'ios-gloss-btn text-white shadow-[0_4px_14px_rgba(0,113,227,0.35)] scale-[1.02]'
                      : 'bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-white/80 dark:border-white/10 shadow-2xs'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Current Tool Card */}
          {currentTool && (
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-5 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 ios-app-icon flex items-center justify-center font-black text-slate-800 dark:text-white text-base">
                    {currentTool.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-slate-900 dark:text-white">
                        {currentTool.name}
                      </span>
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/60 border border-rose-200/60 dark:border-rose-900/60 px-2 py-0.5 rounded-full">
                        {currentTool.pricingModel}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                      {currentTool.pricingDetails}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectTool(currentTool)}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 rounded-xl border border-white/80 dark:border-white/10 transition-all shadow-2xs"
                  >
                    View Tool Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results: Alternatives */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Top Free Alternatives for {currentTool?.name}
              </h3>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full font-bold border border-emerald-200/60 dark:border-emerald-800/60 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Save $100s/Year</span>
              </span>
            </div>

            {alternatives.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-800/40 rounded-2xl border border-white/80 dark:border-white/10">
                No direct alternatives mapped yet for this tool.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {alternatives.map((alt) => (
                  <div
                    key={alt.id}
                    className="ios-glass-card rounded-2xl p-4.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-sm text-slate-900 dark:text-white">{alt.name}</span>
                            {alt.isOpenSource && (
                              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 px-2 py-0.5 rounded-full">
                                Open Source
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{alt.company}</div>
                        </div>

                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                          {alt.pricingModel}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                        {alt.description}
                      </p>

                      <div className="mt-3.5 text-xs bg-white/70 dark:bg-slate-800/70 p-3 rounded-xl border border-white/80 dark:border-white/10 shadow-2xs">
                        <div className="font-bold text-slate-800 dark:text-slate-200 text-[11px] mb-1">
                          Why switch?
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 text-xs">
                          {alt.pricingDetails}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/60 dark:border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectTool(alt);
                        }}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <span>View {alt.name}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <a
                        href={alt.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold flex items-center gap-1"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
