import React from 'react';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { FilterOptions, Platform, PricingModel } from '../types/tool';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (updates: Partial<FilterOptions>) => void;
  onResetFilters: () => void;
  filteredCount: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const PLATFORMS: { id: Platform | 'all'; label: string }[] = [
  { id: 'all', label: 'All Devices & OS' },
  { id: 'Web', label: 'Web Browser' },
  { id: 'Mac', label: 'macOS' },
  { id: 'Windows', label: 'Windows' },
  { id: 'Linux', label: 'Linux' },
  { id: 'API', label: 'API / Dev' },
  { id: 'iOS', label: 'iOS Mobile' },
  { id: 'Android', label: 'Android' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  filteredCount,
  viewMode,
  onViewModeChange,
}) => {
  const isFiltered =
    filters.pricingModel !== 'all' ||
    filters.onlyFreeOrFreemium ||
    filters.onlyOpenSource ||
    filters.onlyVerified ||
    filters.platform !== 'all' ||
    filters.searchQuery !== '' ||
    filters.category !== 'all';

  // Quick Pricing Segments: All, Free & Open Source, Free Plan (Freemium), Paid Only
  const currentPricingTab = () => {
    if (filters.onlyOpenSource || filters.pricingModel === 'Open Source') return 'opensource';
    if (filters.pricingModel === 'Free') return 'free';
    if (filters.onlyFreeOrFreemium || filters.pricingModel === 'Freemium') return 'freemium';
    if (filters.pricingModel === 'Paid') return 'paid';
    return 'all';
  };

  const handleSelectPricingTab = (tab: 'all' | 'free' | 'opensource' | 'freemium' | 'paid') => {
    if (tab === 'all') {
      onFilterChange({
        pricingModel: 'all',
        onlyFreeOrFreemium: false,
        onlyOpenSource: false,
      });
    } else if (tab === 'free') {
      onFilterChange({
        pricingModel: 'Free',
        onlyFreeOrFreemium: false,
        onlyOpenSource: false,
      });
    } else if (tab === 'opensource') {
      onFilterChange({
        pricingModel: 'all',
        onlyOpenSource: true,
        onlyFreeOrFreemium: false,
      });
    } else if (tab === 'freemium') {
      onFilterChange({
        pricingModel: 'Freemium',
        onlyFreeOrFreemium: true,
        onlyOpenSource: false,
      });
    } else if (tab === 'paid') {
      onFilterChange({
        pricingModel: 'Paid',
        onlyFreeOrFreemium: false,
        onlyOpenSource: false,
      });
    }
  };

  const activeTab = currentPricingTab();

  return (
    <div className="py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/75 dark:bg-slate-900/80 backdrop-blur-2xl rounded-2xl border border-white/80 dark:border-white/10 p-3 sm:px-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
          {/* Left: Clear, Simple Pricing Segmented Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Pricing:</span>
            </span>

            {/* Clear, intuitive segmented tabs */}
            <div className="inline-flex items-center p-1 bg-slate-200/50 dark:bg-slate-800/70 rounded-xl border border-white/40 dark:border-white/5 gap-0.5">
              <button
                onClick={() => handleSelectPricingTab('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all hover:scale-[1.04] active:scale-95 cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-750'
                }`}
              >
                All Tools
              </button>

              <button
                onClick={() => handleSelectPricingTab('free')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all hover:scale-[1.04] active:scale-95 cursor-pointer ${
                  activeTab === 'free'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-750'
                }`}
              >
                100% Free
              </button>

              <button
                onClick={() => handleSelectPricingTab('opensource')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all hover:scale-[1.04] active:scale-95 cursor-pointer ${
                  activeTab === 'opensource'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-750'
                }`}
              >
                Open Source
              </button>

              <button
                onClick={() => handleSelectPricingTab('freemium')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all hover:scale-[1.04] active:scale-95 cursor-pointer ${
                  activeTab === 'freemium'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-750'
                }`}
              >
                Free Tier
              </button>

              <button
                onClick={() => handleSelectPricingTab('paid')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all hover:scale-[1.04] active:scale-95 cursor-pointer ${
                  activeTab === 'paid'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-750'
                }`}
              >
                Paid Only
              </button>
            </div>

            {/* Platform Selector */}
            <select
              value={filters.platform}
              onChange={(e) =>
                onFilterChange({
                  platform: e.target.value as Platform | 'all',
                })
              }
              className="text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 border border-white/80 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400 hover:scale-[1.02] rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs cursor-pointer transition-all"
              aria-label="Filter by Platform or Device"
            >
              {PLATFORMS.map((plat) => (
                <option key={plat.id} value={plat.id} className="dark:bg-slate-800 dark:text-slate-200">
                  {plat.label}
                </option>
              ))}
            </select>

            {/* Verified Only Toggle */}
            <button
              onClick={() =>
                onFilterChange({
                  onlyVerified: !filters.onlyVerified,
                })
              }
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:scale-[1.04] active:scale-95 cursor-pointer ${
                filters.onlyVerified
                  ? 'bg-purple-600 text-white border-purple-500 shadow-[0_2px_8px_rgba(147,51,234,0.3)]'
                  : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-white/80 dark:border-white/10 hover:bg-white dark:hover:bg-slate-700 hover:border-purple-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-current group-hover:scale-115 transition-transform" />
              <span>Verified Only</span>
              {filters.onlyVerified && <Check className="w-3 h-3 text-white" />}
            </button>

            {/* Reset Filters button if any active */}
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="group flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50/70 dark:hover:bg-rose-950/40 rounded-xl transition-all hover:scale-105 active:scale-90 cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3 group-hover:-rotate-90 transition-transform duration-300" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Right: Results Count, Sort, & View Mode */}
          <div className="flex items-center justify-between lg:justify-end gap-3.5 shrink-0">
            <div className="text-xs text-slate-500 dark:text-slate-400 tabular-nums font-medium whitespace-nowrap">
              Showing <span className="font-bold text-slate-900 dark:text-white">{filteredCount}</span> tools
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  onFilterChange({
                    sortBy: e.target.value as FilterOptions['sortBy'],
                  })
                }
                className="text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 border border-white/80 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400 hover:scale-[1.02] rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 shadow-xs cursor-pointer transition-all"
                aria-label="Sort Tools By"
              >
                <option value="popular" className="dark:bg-slate-800 dark:text-slate-200">Most Popular</option>
                <option value="rating" className="dark:bg-slate-800 dark:text-slate-200">Highest Rated</option>
                <option value="newest" className="dark:bg-slate-800 dark:text-slate-200">Newest Launch</option>
                <option value="name" className="dark:bg-slate-800 dark:text-slate-200">Name (A-Z)</option>
              </select>
            </div>

            {/* Grid vs List view toggle */}
            <div className="flex items-center border border-white/80 dark:border-white/10 rounded-xl p-0.5 bg-white/50 dark:bg-slate-800/50 shadow-2xs">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer hover:scale-110 active:scale-90 ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer hover:scale-110 active:scale-90 ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Compact List View"
                aria-label="Compact List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
