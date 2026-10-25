import React from 'react';
import {
  X,
  Scale,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Star,
  Trash2,
  GitBranch,
} from 'lucide-react';
import { AITool } from '../types/tool';
import { CATEGORY_LABELS } from '../utils/filterAndSearch';

interface ComparisonDrawerProps {
  comparedTools: AITool[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveTool: (toolId: string) => void;
  onClearAll: () => void;
  onSelectTool: (tool: AITool) => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  comparedTools,
  isOpen,
  onClose,
  onRemoveTool,
  onClearAll,
  onSelectTool,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-3xl max-w-6xl w-full max-h-[92vh] overflow-y-auto shadow-[0_25px_70px_rgba(0,0,0,0.4)] border border-white/80 dark:border-white/10 relative flex flex-col text-slate-900 dark:text-slate-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-dialog-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl px-6 py-4 border-b border-white/60 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 id="compare-dialog-title" className="text-base font-extrabold text-slate-900 dark:text-white">
              Side-by-Side Tool Comparison ({comparedTools.length}/4)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {comparedTools.length > 0 && (
              <button
                onClick={onClearAll}
                className="flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 bg-rose-50/80 dark:bg-rose-950/40 px-3 py-1.5 rounded-xl border border-rose-200/50 dark:border-rose-900/50 transition-all hover:scale-105 active:scale-95 shadow-2xs cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800 rounded-xl transition-all hover:scale-115 hover:rotate-90 active:scale-90 cursor-pointer"
              aria-label="Close Comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Empty state if fewer than 2 tools */}
        {comparedTools.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            <Scale className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No tools selected for comparison</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Click the "Compare" button on any tool card in the directory to add up to 4 tools side-by-side.
            </p>
          </div>
        ) : (
          <div className="p-6 overflow-x-auto">
            <div className="min-w-[700px]">
              <table className="w-full border-collapse text-left text-xs">
                {/* Tools Header Columns */}
                <thead>
                  <tr className="border-b border-white/60 dark:border-white/10">
                    <th className="py-4 px-3 w-44 font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[11px]">
                      Tool Attribute
                    </th>
                    {comparedTools.map((tool) => (
                      <th key={tool.id} className="py-4 px-3 text-slate-900 dark:text-white align-top">
                        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-3.5 rounded-2xl border border-white/80 dark:border-white/10 relative shadow-2xs hover:scale-[1.02] transition-transform">
                          <button
                            onClick={() => onRemoveTool(tool.id)}
                            className="absolute -top-2 -right-2 p-1 bg-white dark:bg-slate-800 text-slate-400 hover:text-rose-600 rounded-full border border-slate-200 dark:border-white/10 shadow-xs hover:scale-125 hover:rotate-90 transition-all cursor-pointer"
                            title="Remove tool from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 ios-app-icon flex items-center justify-center font-black text-slate-800 dark:text-white text-xs">
                              {tool.initials}
                            </div>
                            <div className="min-w-0">
                              <div
                                onClick={() => onSelectTool(tool)}
                                className="font-extrabold text-sm text-slate-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                              >
                                {tool.name}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-medium">
                                {tool.company}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <button
                              onClick={() => onSelectTool(tool)}
                              className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Inspect Details
                            </button>
                            <a
                              href={tool.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold flex items-center gap-0.5"
                            >
                              <span>Official Site</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/50 dark:divide-white/10">
                  {/* Category */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-500 dark:text-slate-400 bg-white/30 dark:bg-slate-800/40">
                      Category
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="py-3 px-3 text-slate-900 dark:text-white font-medium">
                        {CATEGORY_LABELS[tool.category] || tool.category}
                      </td>
                    ))}
                  </tr>

                  {/* Pricing Model */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-500 dark:text-slate-400 bg-white/30 dark:bg-slate-800/40">
                      Pricing Model
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="py-3 px-3">
                        <span className="font-bold text-slate-900 dark:text-white">{tool.pricingModel}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Pricing Details */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-500 dark:text-slate-400 bg-white/30 dark:bg-slate-800/40">
                      Pricing Terms
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="py-3 px-3 text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {tool.pricingDetails}
                      </td>
                    ))}
                  </tr>

                  {/* Free Tier Available */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-500 dark:text-slate-400 bg-white/30 dark:bg-slate-800/40">
                      Free Tier Available
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="py-3 px-3">
                        {tool.hasFreeTier || tool.pricingModel === 'Free' || tool.isOpenSource ? (
                          <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span>Yes, available</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
                            <XCircle className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <span>No free tier</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Open Source */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-500 dark:text-slate-400 bg-white/30 dark:bg-slate-800/40">
                      Open Source
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="py-3 px-3">
                        {tool.isOpenSource ? (
                          <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                            <GitBranch className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span>Yes (Open Weights / Code)</span>
                          </div>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400 font-medium">Proprietary</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Platforms */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-500 dark:text-slate-400 bg-white/30 dark:bg-slate-800/40">
                      Supported Platforms
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="py-3 px-3 text-slate-700 dark:text-slate-300 font-medium">
                        {tool.platforms.join(', ')}
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-500 dark:text-slate-400 bg-white/30 dark:bg-slate-800/40">
                      Rating & Reviews
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="py-3 px-3">
                        <div className="flex items-center gap-1 text-slate-900 dark:text-white font-bold">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="tabular-nums">{tool.rating.toFixed(1)}</span>
                          <span className="text-slate-400 dark:text-slate-500 font-normal">
                            ({tool.reviewCount} reviews)
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Key Capabilities */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-500 dark:text-slate-400 bg-white/30 dark:bg-slate-800/40">
                      Key Strengths
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="py-3 px-3 align-top">
                        <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                          {tool.pros.slice(0, 3).map((p, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Trade-offs */}
                  <tr>
                    <td className="py-3 px-3 font-semibold text-slate-500 dark:text-slate-400 bg-white/30 dark:bg-slate-800/40">
                      Trade-offs
                    </td>
                    {comparedTools.map((tool) => (
                      <td key={tool.id} className="py-3 px-3 align-top">
                        <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                          {tool.cons.slice(0, 3).map((c, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-rose-600 dark:text-rose-400 font-bold">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
