import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { PricingModel, ToolCategory, ToolSubmission } from '../types/tool';
import { CATEGORY_LABELS } from '../utils/filterAndSearch';

interface SubmitToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submission: ToolSubmission) => void;
}

export const SubmitToolModal: React.FC<SubmitToolModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [category, setCategory] = useState<ToolCategory>('coding');
  const [pricingModel, setPricingModel] = useState<PricingModel>('Freemium');
  const [pricingDetails, setPricingDetails] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [hasFreeTier, setHasFreeTier] = useState(true);
  const [isOpenSource, setIsOpenSource] = useState(false);
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !websiteUrl.trim() || !tagline.trim() || !description.trim()) {
      return;
    }

    const submission: ToolSubmission = {
      id: `sub-${Date.now()}`,
      name: name.trim(),
      websiteUrl: websiteUrl.trim().startsWith('http') ? websiteUrl.trim() : `https://${websiteUrl.trim()}`,
      category,
      pricingModel,
      pricingDetails: pricingDetails.trim() || `${pricingModel} tier details`,
      tagline: tagline.trim(),
      description: description.trim(),
      hasFreeTier,
      isOpenSource,
      submittedAt: new Date().toISOString(),
      submitterEmail: submitterEmail.trim(),
      status: 'approved',
    };

    onSubmit(submission);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-[0_25px_70px_rgba(0,0,0,0.4)] border border-white/80 dark:border-white/10 relative flex flex-col text-slate-900 dark:text-slate-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-tool-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl px-6 py-4 border-b border-white/60 dark:border-white/10 flex items-center justify-between">
          <h2 id="submit-tool-title" className="text-base font-extrabold text-slate-900 dark:text-white">
            Submit an AI Tool for Directory Inclusion
          </h2>
          <button
            onClick={onClose}
            aria-label="Close Submit Form"
            className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tool Successfully Submitted!</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              Your tool "{name}" has been indexed and is now live in your AI Finder session.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4 text-xs text-slate-700 dark:text-slate-300 shadow-2xs">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Verification Policy</span>
              </div>
              We only accept legitimate, working AI tools with verified official websites. Please provide accurate pricing and free tier terms.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tool Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Supabase AI"
                  className="w-full text-xs bg-white/80 dark:bg-slate-800/90 border border-white/80 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Official Website URL *
                </label>
                <input
                  type="url"
                  required
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full text-xs bg-white/80 dark:bg-slate-800/90 border border-white/80 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ToolCategory)}
                  className="w-full text-xs bg-white/80 dark:bg-slate-800/90 border border-white/80 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30 font-medium"
                >
                  {(Object.keys(CATEGORY_LABELS) as ToolCategory[]).map((cat) => (
                    <option key={cat} value={cat} className="dark:bg-slate-800 dark:text-white">
                      {CATEGORY_LABELS[cat]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pricing Model *
                </label>
                <select
                  value={pricingModel}
                  onChange={(e) => setPricingModel(e.target.value as PricingModel)}
                  className="w-full text-xs bg-white/80 dark:bg-slate-800/90 border border-white/80 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30 font-medium"
                >
                  <option value="Free" className="dark:bg-slate-800 dark:text-white">100% Free</option>
                  <option value="Freemium" className="dark:bg-slate-800 dark:text-white">Freemium</option>
                  <option value="Open Source" className="dark:bg-slate-800 dark:text-white">Open Source</option>
                  <option value="Paid" className="dark:bg-slate-800 dark:text-white">Paid Only</option>
                  <option value="Free Trial" className="dark:bg-slate-800 dark:text-white">Free Trial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                One-Line Tagline *
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Open-source backend with AI vector search"
                className="w-full text-xs bg-white/80 dark:bg-slate-800/90 border border-white/80 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Detailed Purpose & Description *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the core functionality, what problem it solves, and ideal use cases..."
                className="w-full text-xs bg-white/80 dark:bg-slate-800/90 border border-white/80 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Pricing Details & Free Quota
              </label>
              <input
                type="text"
                value={pricingDetails}
                onChange={(e) => setPricingDetails(e.target.value)}
                placeholder="e.g. Free plan with 500MB storage. Pro at $25/month."
                className="w-full text-xs bg-white/80 dark:bg-slate-800/90 border border-white/80 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div className="flex flex-wrap gap-4 pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasFreeTier}
                  onChange={(e) => setHasFreeTier(e.target.checked)}
                  className="rounded-md text-blue-600 focus:ring-blue-500/30"
                />
                <span>Includes Free Plan or Free Tier</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOpenSource}
                  onChange={(e) => setIsOpenSource(e.target.checked)}
                  className="rounded-md text-blue-600 focus:ring-blue-500/30"
                />
                <span>Open Source Repository Available</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Submitter Email (for verification notifications)
              </label>
              <input
                type="email"
                value={submitterEmail}
                onChange={(e) => setSubmitterEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full text-xs bg-white/80 dark:bg-slate-800/90 border border-white/80 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div className="pt-3 border-t border-white/60 dark:border-white/10 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white ios-gloss-btn rounded-xl flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Tool</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
