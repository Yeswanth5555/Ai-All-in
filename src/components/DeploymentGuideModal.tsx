import React, { useState } from 'react';
import {
  X,
  Server,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'vercel' | 'netlify' | 'cloudflare' | 'github' | 'render'>('vercel');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-[0_25px_70px_rgba(0,0,0,0.4)] border border-white/80 dark:border-white/10 relative flex flex-col text-slate-900 dark:text-slate-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="deployment-guide-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl px-6 py-4 border-b border-white/60 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Server className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 id="deployment-guide-title" className="text-base font-extrabold text-slate-900 dark:text-white">
              Free-Tier Deployment Guide for AI Finder
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
          <div className="bg-blue-50/80 dark:bg-blue-950/50 backdrop-blur-xl border border-blue-200/80 dark:border-blue-800/50 rounded-2xl p-4.5 text-xs text-blue-950 dark:text-blue-200 leading-relaxed shadow-2xs">
            <span className="font-extrabold">Zero-Cost Infrastructure:</span> AI Finder is architected as an ultra-fast client-side React + TypeScript application with zero mandatory backend costs or paid API requirements. You can deploy and host it indefinitely on global edge networks with 100% free bandwidth.
          </div>

          {/* Platform Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/60 dark:border-white/10 pb-3">
            {[
              { id: 'vercel', label: 'Vercel (Recommended)' },
              { id: 'netlify', label: 'Netlify' },
              { id: 'cloudflare', label: 'Cloudflare Pages' },
              { id: 'github', label: 'GitHub Pages' },
              { id: 'render', label: 'Render' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'ios-gloss-btn text-white shadow-[0_4px_14px_rgba(0,113,227,0.35)] scale-[1.02]'
                    : 'bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-white/80 dark:border-white/10 shadow-2xs'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Vercel */}
          {activeTab === 'vercel' && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Deploying to Vercel (1-Click & CLI)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Vercel provides 100GB monthly bandwidth, automatic global SSL, and preview deployments for free on the Hobby tier.
              </p>

              <div className="space-y-3">
                <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4.5 shadow-2xs">
                  <div className="font-bold text-xs text-slate-900 dark:text-white mb-2">
                    Method 1: Connect GitHub repository (Zero Config)
                  </div>
                  <ol className="list-decimal list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                    <li>Push your code to GitHub.</li>
                    <li>Go to <span className="font-semibold text-slate-800 dark:text-slate-200">vercel.com</span> and click "Add New Project".</li>
                    <li>Import your AI Finder repository.</li>
                    <li>Framework preset automatically detects <span className="font-semibold text-slate-800 dark:text-slate-200">Vite</span>.</li>
                    <li>Click <span className="font-bold text-slate-900 dark:text-white">Deploy</span>. Your site will be live on a <code className="font-mono bg-white dark:bg-slate-900 px-1 rounded border border-slate-200 dark:border-white/10">.vercel.app</code> domain in under 45 seconds.</li>
                  </ol>
                </div>

                <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4.5 shadow-2xs">
                  <div className="font-bold text-xs text-slate-900 dark:text-white mb-2">
                    Method 2: Command Line Interface (CLI)
                  </div>
                  <div className="relative">
                    <pre className="bg-slate-950 text-slate-200 p-3.5 rounded-xl text-xs font-mono overflow-x-auto border border-white/10">
                      {`# Install Vercel CLI globally\nnpm i -g vercel\n\n# Deploy to production\nvercel --prod`}
                    </pre>
                    <button
                      onClick={() =>
                        copyToClipboard('npm i -g vercel\nvercel --prod', 0)
                      }
                      className="absolute top-2.5 right-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                    >
                      {copiedIndex === 0 ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Netlify */}
          {activeTab === 'netlify' && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Deploying to Netlify (Free Tier)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Netlify offers 100GB monthly bandwidth, continuous Git integration, and form handling at zero cost.
              </p>

              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4.5 shadow-2xs space-y-3">
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  Build Settings:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-white/80 dark:border-white/10">
                    <span className="text-slate-500 dark:text-slate-400">Build command:</span>
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">npm run build</div>
                  </div>
                  <div className="p-2.5 bg-white/60 dark:bg-slate-900/60 rounded-xl border border-white/80 dark:border-white/10">
                    <span className="text-slate-500 dark:text-slate-400">Publish directory:</span>
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">dist</div>
                  </div>
                </div>
                <div className="relative">
                  <pre className="bg-slate-950 text-slate-200 p-3.5 rounded-xl text-xs font-mono overflow-x-auto border border-white/10">
                    {`# Deploy using Netlify CLI\nnpm install -g netlify-cli\nnetlify deploy --prod --dir=dist`}
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard('npm install -g netlify-cli\nnetlify deploy --prod --dir=dist', 1)
                    }
                    className="absolute top-2.5 right-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                  >
                    {copiedIndex === 1 ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cloudflare Pages */}
          {activeTab === 'cloudflare' && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Deploying to Cloudflare Pages (Unlimited Bandwidth)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Cloudflare Pages features <span className="font-bold text-slate-900 dark:text-white">unlimited free bandwidth</span> and lightning-fast worldwide caching across 300+ city edge locations.
              </p>

              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4.5 shadow-2xs space-y-3">
                <ol className="list-decimal list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <li>In the Cloudflare dashboard, go to <span className="font-bold text-slate-900 dark:text-white">Compute (Workers & Pages)</span>.</li>
                  <li>Click <span className="font-bold text-slate-900 dark:text-white">Create application &gt; Pages &gt; Connect to Git</span>.</li>
                  <li>Select your repo and choose framework preset: <span className="font-bold text-slate-900 dark:text-white">Vite</span>.</li>
                  <li>Build output directory: <code className="font-mono bg-white dark:bg-slate-900 px-1 py-0.5 rounded border border-slate-200 dark:border-white/10">dist</code>.</li>
                  <li>Click <span className="font-bold text-slate-900 dark:text-white">Save and Deploy</span>.</li>
                </ol>
              </div>
            </div>
          )}

          {/* GitHub Pages */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Deploying to GitHub Pages
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Host directly from your GitHub repository with zero external services required.
              </p>

              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4.5 shadow-2xs">
                <div className="font-bold text-xs text-slate-900 dark:text-white mb-2">
                  Using gh-pages package
                </div>
                <div className="relative mb-3">
                  <pre className="bg-slate-950 text-slate-200 p-3.5 rounded-xl text-xs font-mono overflow-x-auto border border-white/10">
                    {`# Build and publish to gh-pages branch\nnpm run build\nnpx gh-pages -d dist`}
                  </pre>
                  <button
                    onClick={() =>
                      copyToClipboard('npm run build && npx gh-pages -d dist', 4)
                    }
                    className="absolute top-2.5 right-2.5 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                  >
                    {copiedIndex === 4 ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Render */}
          {activeTab === 'render' && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Deploying to Render (Free Static Site)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Render offers 100GB monthly bandwidth, free custom domains, and automatic SSL for static sites.
              </p>

              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4.5 shadow-2xs">
                <ol className="list-decimal list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <li>In your Render Dashboard, click <span className="font-bold text-slate-900 dark:text-white">New Static Site</span>.</li>
                  <li>Link your repository.</li>
                  <li>Set Build Command: <code className="font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded-md border border-slate-200 dark:border-white/10">npm run build</code></li>
                  <li>Set Publish Directory: <code className="font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded-md border border-slate-200 dark:border-white/10">dist</code></li>
                  <li>Click <span className="font-bold text-slate-900 dark:text-white">Create Static Site</span>.</li>
                </ol>
              </div>
            </div>
          )}

          {/* Production Checklist */}
          <div className="pt-4 border-t border-white/60 dark:border-white/10">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Free-Tier Production Checklist
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Zero backend server costs (Pure Static SPA)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Free custom domain SSL certificate included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>No paid AI API keys required for directory</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Local storage handles favorites & reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
