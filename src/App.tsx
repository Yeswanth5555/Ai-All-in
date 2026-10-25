/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Scale,
  Sparkles,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
  Bookmark,
} from 'lucide-react';
import { AITool, FilterOptions, ToolCategory, ToolSubmission, UserReview } from './types/tool';
import { AI_TOOLS_DATA } from './data/tools';
import { INITIAL_REVIEWS } from './data/reviews';
import {
  searchAndFilterTools,
  getCategoryCounts,
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
} from './utils/filterAndSearch';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { FilterBar } from './components/FilterBar';
import { ToolCard } from './components/ToolCard';
import { ToolDetailModal } from './components/ToolDetailModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { FreeAlternativesFinderModal } from './components/FreeAlternativesFinderModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { SubmitToolModal } from './components/SubmitToolModal';
import { UserProfileModal } from './components/UserProfileModal';
import { GuideLibraryView } from './components/GuideLibraryView';
import { GuideDetailView } from './components/GuideDetailView';
import { Footer } from './components/Footer';
import { getGuideBySlug } from './data/guides';

export type AppRoute =
  | { page: 'home' }
  | { page: 'guides'; toolSlug?: string }
  | { page: 'guide-detail'; slug: string };

function parseRouteFromLocation(): AppRoute {
  if (typeof window === 'undefined') return { page: 'home' };
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const hash = window.location.hash;

  if (pathname === '/guides' || hash === '#guides') {
    return { page: 'guides' };
  }
  const guideDetailMatch = pathname.match(/^\/guides\/([a-zA-Z0-9_-]+)$/);
  if (guideDetailMatch) {
    return { page: 'guide-detail', slug: guideDetailMatch[1] };
  }
  if (hash.startsWith('#guide=')) {
    return { page: 'guide-detail', slug: hash.replace('#guide=', '') };
  }
  const toolGuidesMatch = pathname.match(/^\/tools\/([a-zA-Z0-9_-]+)\/guides$/);
  if (toolGuidesMatch) {
    return { page: 'guides', toolSlug: toolGuidesMatch[1] };
  }
  if (hash.startsWith('#tool-guides=')) {
    return { page: 'guides', toolSlug: hash.replace('#tool-guides=', '') };
  }
  return { page: 'home' };
}

export default function App() {
  // 1. Core Data State with localStorage persistence
  const [tools, setTools] = useState<AITool[]>(() => {
    try {
      const savedCustom = localStorage.getItem('ai_finder_custom_tools');
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        return [...AI_TOOLS_DATA, ...parsed];
      }
    } catch (e) {
      console.error(e);
    }
    return AI_TOOLS_DATA;
  });

  const [reviews, setReviews] = useState<UserReview[]>(() => {
    try {
      const saved = localStorage.getItem('ai_finder_reviews');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REVIEWS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ai_finder_favorites');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['cursor', 'flux-1', 'deepseek', 'suno-ai'];
  });

  const [userSubmissions, setUserSubmissions] = useState<ToolSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('ai_finder_submissions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('ai_finder_username') || 'Alex Rivera';
  });

  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('ai_finder_useremail') || 'alex@example.com';
  });

  // Global Mouse tracking for interactive cursor-following ambient spotlight
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  // Dark Mode Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ai_finder_theme');
      if (saved) return saved === 'dark';
      return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ai_finder_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // 2. Comparison State
  const [comparedToolIds, setComparedToolIds] = useState<string[]>(['cursor', 'github-copilot']);

  // 3. Filter Options State
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    category: 'all',
    pricingModel: 'all',
    onlyFreeOrFreemium: false,
    onlyOpenSource: false,
    onlyVerified: false,
    platform: 'all',
    sortBy: 'popular',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 4. Modal Overlays State
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAlternativesFinderOpen, setIsAlternativesFinderOpen] = useState(false);
  const [isDeploymentGuideOpen, setIsDeploymentGuideOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // 5. Active Route State & Navigation
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(parseRouteFromLocation);

  // 6. How-To Guides State with localStorage persistence
  const [bookmarkedGuideSlugs, setBookmarkedGuideSlugs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ai_finder_bookmarked_guides');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['building-website-google-ai-studio', 'creating-ai-generated-images'];
  });

  const [guideProgressMap, setGuideProgressMap] = useState<
    Record<string, { currentStepIndex: number; completedStepIndices: number[]; isCompleted: boolean }>
  >(() => {
    try {
      const saved = localStorage.getItem('ai_finder_guides_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('ai_finder_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('ai_finder_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('ai_finder_submissions', JSON.stringify(userSubmissions));
  }, [userSubmissions]);

  useEffect(() => {
    localStorage.setItem('ai_finder_bookmarked_guides', JSON.stringify(bookmarkedGuideSlugs));
  }, [bookmarkedGuideSlugs]);

  useEffect(() => {
    localStorage.setItem('ai_finder_guides_progress', JSON.stringify(guideProgressMap));
  }, [guideProgressMap]);

  // URL Path & Hash Navigation listener
  useEffect(() => {
    const handleLocationChange = () => {
      const route = parseRouteFromLocation();
      setCurrentRoute(route);

      const hash = window.location.hash;
      if (hash.startsWith('#tool=')) {
        const toolId = hash.replace('#tool=', '');
        const found = tools.find((t) => t.id === toolId);
        if (found) setSelectedTool(found);
      } else if (hash.startsWith('#category=')) {
        const cat = hash.replace('#category=', '') as ToolCategory;
        if (cat in CATEGORY_LABELS || cat === 'all') {
          setFilters((prev) => ({ ...prev, category: cat }));
        }
      } else if (hash === '#compare') {
        setIsCompareOpen(true);
      } else if (hash === '#alternatives') {
        setIsAlternativesFinderOpen(true);
      } else if (hash === '#deploy') {
        setIsDeploymentGuideOpen(true);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [tools]);

  // Navigation Helpers
  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentRoute({ page: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToGuides = (toolSlug?: string) => {
    const path = toolSlug ? `/tools/${toolSlug}/guides` : '/guides';
    window.history.pushState({}, '', path);
    setCurrentRoute({ page: 'guides', toolSlug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToGuideDetail = (slug: string) => {
    window.history.pushState({}, '', `/guides/${slug}`);
    setCurrentRoute({ page: 'guide-detail', slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmarkGuide = (slug: string) => {
    setBookmarkedGuideSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleUpdateGuideProgress = (
    slug: string,
    currentStepIndex: number,
    completedStepIndices: number[],
    isCompleted: boolean
  ) => {
    setGuideProgressMap((prev) => ({
      ...prev,
      [slug]: {
        currentStepIndex,
        completedStepIndices,
        isCompleted,
      },
    }));
  };

  // Handlers
  const handleToggleFavorite = (toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const handleToggleCompare = (toolId: string) => {
    setComparedToolIds((prev) => {
      if (prev.includes(toolId)) {
        return prev.filter((id) => id !== toolId);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 tools side-by-side.');
        return prev;
      }
      return [...prev, toolId];
    });
  };

  const handleRemoveCompareTool = (toolId: string) => {
    setComparedToolIds((prev) => prev.filter((id) => id !== toolId));
  };

  const handleClearCompareAll = () => {
    setComparedToolIds([]);
  };

  const handleFilterChange = (updates: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      pricingModel: 'all',
      onlyFreeOrFreemium: false,
      onlyOpenSource: false,
      onlyVerified: false,
      platform: 'all',
      sortBy: 'popular',
    });
  };

  const handleSelectTool = (tool: AITool) => {
    setSelectedTool(tool);
    window.history.pushState(null, '', `#tool=${tool.id}`);
  };

  const handleCloseToolModal = () => {
    setSelectedTool(null);
    if (window.location.hash.startsWith('#tool=')) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleSelectAlternative = (altId: string) => {
    const found = tools.find((t) => t.id === altId);
    if (found) {
      handleSelectTool(found);
    }
  };

  const handleAddReview = (newReview: Omit<UserReview, 'id' | 'date'>) => {
    const fullReview: UserReview = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => [fullReview, ...prev]);
  };

  const handleSubmitNewTool = (submission: ToolSubmission) => {
    setUserSubmissions((prev) => [submission, ...prev]);

    // Synthesize AITool object so it appears instantly in the current applet session
    const synthesizedTool: AITool = {
      id: submission.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: submission.name,
      tagline: submission.tagline,
      description: submission.description,
      category: submission.category,
      pricingModel: submission.pricingModel,
      pricingDetails: submission.pricingDetails,
      hasFreeTier: submission.hasFreeTier,
      isOpenSource: submission.isOpenSource,
      isVerified: true,
      websiteUrl: submission.websiteUrl,
      rating: 4.8,
      reviewCount: 1,
      launchYear: new Date().getFullYear(),
      company: 'Community Submission',
      platforms: ['Web'],
      keyFeatures: [submission.tagline],
      pros: ['Community validated submission'],
      cons: ['New addition to index'],
      freeAlternatives: [],
      tags: [submission.category, 'new'],
      initials: submission.name.slice(0, 2).toUpperCase(),
    };

    setTools((prev) => [synthesizedTool, ...prev]);

    try {
      const existing = localStorage.getItem('ai_finder_custom_tools');
      const list = existing ? JSON.parse(existing) : [];
      list.push(synthesizedTool);
      localStorage.setItem('ai_finder_custom_tools', JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateProfile = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    localStorage.setItem('ai_finder_username', name);
    localStorage.setItem('ai_finder_useremail', email);
  };

  // Filtered Tools calculation
  const filteredTools = useMemo(() => {
    return searchAndFilterTools(tools, filters);
  }, [tools, filters]);

  // Derived Counts
  const categoryCounts = useMemo(() => {
    return getCategoryCounts(tools);
  }, [tools]);

  const openSourceCount = useMemo(() => {
    return tools.filter((t) => t.isOpenSource).length;
  }, [tools]);

  const freeCount = useMemo(() => {
    return tools.filter((t) => t.hasFreeTier || t.pricingModel === 'Free' || t.isOpenSource).length;
  }, [tools]);

  const comparedTools = useMemo(() => {
    return tools.filter((t) => comparedToolIds.includes(t.id));
  }, [tools, comparedToolIds]);

  return (
    <div className="relative min-h-screen bg-slate-50/70 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-300 overflow-x-hidden">
      {/* Interactive Ambient Cursor Follower / Spotlight */}
      <div
        className="mouse-spotlight pointer-events-none"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: mousePos.x > 0 ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Top Bar Contract Navigation */}
      <Navbar
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
        onOpenAlternativesFinder={() => setIsAlternativesFinderOpen(true)}
        onOpenComparison={() => setIsCompareOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        compareCount={comparedToolIds.length}
        favoritesCount={favorites.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        onNavigateHome={navigateToHome}
        onNavigateGuides={() => navigateToGuides()}
        activeRoute={currentRoute.page}
        onSelectCategory={(cat) => {
          if (currentRoute.page !== 'home') {
            navigateToHome();
          }
          handleFilterChange({ category: cat as ToolCategory });
        }}
      />

      <main className="flex-1">
        {currentRoute.page === 'guides' ? (
          <GuideLibraryView
            onSelectGuide={navigateToGuideDetail}
            onSelectTool={(toolId) => {
              const found = tools.find((t) => t.id === toolId);
              if (found) setSelectedTool(found);
            }}
            toolFilterSlug={currentRoute.toolSlug}
            onClearToolFilter={() => navigateToGuides()}
            allTools={tools}
            bookmarkedGuideSlugs={bookmarkedGuideSlugs}
            onToggleBookmarkGuide={handleToggleBookmarkGuide}
            guideProgressMap={guideProgressMap}
            onNavigateHome={navigateToHome}
          />
        ) : currentRoute.page === 'guide-detail' ? (
          (() => {
            const currentGuide = getGuideBySlug(currentRoute.slug);
            if (!currentGuide) {
              return (
                <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Guide not found</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    The requested tutorial &quot;{currentRoute.slug}&quot; could not be located.
                  </p>
                  <button
                    onClick={() => navigateToGuides()}
                    className="mt-4 px-4 py-2 text-xs font-bold text-white ios-gloss-btn rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    Back to How-To Guides
                  </button>
                </div>
              );
            }
            return (
              <GuideDetailView
                guide={currentGuide}
                onBackToLibrary={() => navigateToGuides(currentRoute.slug ? undefined : undefined)}
                onSelectGuide={navigateToGuideDetail}
                onSelectTool={(toolId) => {
                  const found = tools.find((t) => t.id === toolId);
                  if (found) setSelectedTool(found);
                }}
                allTools={tools}
                isBookmarked={bookmarkedGuideSlugs.includes(currentGuide.slug)}
                onToggleBookmark={handleToggleBookmarkGuide}
                onUpdateProgress={handleUpdateGuideProgress}
                savedProgress={guideProgressMap[currentGuide.slug]}
              />
            );
          })()
        ) : (
          /* Directory Home */
          <>
            {/* Hero Section */}
            <Hero
              searchQuery={filters.searchQuery}
              onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
              onClearSearch={() => handleFilterChange({ searchQuery: '' })}
              totalToolsCount={tools.length}
              openSourceCount={openSourceCount}
              freeCount={freeCount}
              filteredCount={filteredTools.length}
            />

            {/* Category Navigation Bar */}
            <CategoryNav
              selectedCategory={filters.category}
              onSelectCategory={(cat) => handleFilterChange({ category: cat })}
              categoryCounts={categoryCounts}
            />

            {/* Filter Controls Bar */}
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              filteredCount={filteredTools.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* Category Description Banner (if single category selected) */}
            {filters.category !== 'all' && (
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 py-4 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {CATEGORY_LABELS[filters.category]}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {CATEGORY_DESCRIPTIONS[filters.category]}
                    </p>
                  </div>
                  <button
                    onClick={() => handleFilterChange({ category: 'all' })}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold self-start sm:self-auto"
                  >
                    Show All Categories
                  </button>
                </div>
              </div>
            )}

            {/* Directory Listing Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {filteredTools.length === 0 ? (
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-xs">
                  <SlidersHorizontal className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    No matching AI tools found
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    No tools matched your current search query or combination of filters.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onSelectTool={handleSelectTool}
                      onToggleCompare={handleToggleCompare}
                      isCompared={comparedToolIds.includes(tool.id)}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.includes(tool.id)}
                      onSelectAlternative={handleSelectAlternative}
                      onSelectGuide={navigateToGuideDetail}
                      viewMode="grid"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onSelectTool={handleSelectTool}
                      onToggleCompare={handleToggleCompare}
                      isCompared={comparedToolIds.includes(tool.id)}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={favorites.includes(tool.id)}
                      onSelectAlternative={handleSelectAlternative}
                      onSelectGuide={navigateToGuideDetail}
                      viewMode="list"
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Free Alternatives Matcher Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white bg-slate-900/90 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 blur-3xl -z-10 rounded-full" />
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 bg-sky-950/60 backdrop-blur-md px-3 py-1 rounded-full border border-sky-400/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Zero Subscription Bills</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    Tired of Paying $20–$50/Month for AI Tools?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Use our automated Free Alternative Matcher to replace expensive tools like Midjourney, Jasper, Synthesia, and Copilot with vetted open-source and free equivalents.
                  </p>
                </div>

                <button
                  onClick={() => setIsAlternativesFinderOpen(true)}
                  className="group px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-2xl transition-all shadow-[0_4px_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>Launch Free Alternatives Matcher</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Floating Bottom Comparison Dock (iOS Dynamic Island Style) */}
      {comparedToolIds.length > 0 && !isCompareOpen && (
        <aside
          aria-label="Active Comparison Dock"
          className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-40 ios-dynamic-island text-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] px-5 py-3 flex items-center justify-between sm:justify-start gap-4 border border-white/20 animate-in slide-in-from-bottom-5 hover:scale-[1.03] hover:border-white/35 transition-all duration-200"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
              <Scale className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-xs font-semibold">
              <span className="text-blue-400 font-black tabular-nums">{comparedToolIds.length}</span> / 4 tools
              selected
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="group px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full transition-all shadow-[0_4px_14px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Compare</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleClearCompareAll}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Clear
            </button>
          </div>
        </aside>
      )}

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => handleFilterChange({ category: cat })}
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
        onOpenAlternativesFinder={() => setIsAlternativesFinderOpen(true)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
        onNavigateGuides={() => navigateToGuides()}
      />

      {/* Modals */}
      <ToolDetailModal
        tool={selectedTool}
        onClose={handleCloseToolModal}
        onSelectTool={handleSelectTool}
        onToggleCompare={handleToggleCompare}
        isCompared={selectedTool ? comparedToolIds.includes(selectedTool.id) : false}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedTool ? favorites.includes(selectedTool.id) : false}
        allTools={tools}
        reviews={reviews}
        onAddReview={handleAddReview}
        onSelectGuide={navigateToGuideDetail}
        onViewAllGuidesForTool={(toolId) =>
          toolId === 'all' ? navigateToGuides() : navigateToGuides(toolId)
        }
      />

      <ComparisonDrawer
        comparedTools={comparedTools}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemoveTool={handleRemoveCompareTool}
        onClearAll={handleClearCompareAll}
        onSelectTool={handleSelectTool}
      />

      <FreeAlternativesFinderModal
        isOpen={isAlternativesFinderOpen}
        onClose={() => setIsAlternativesFinderOpen(false)}
        allTools={tools}
        onSelectTool={handleSelectTool}
        onToggleCompare={handleToggleCompare}
      />

      <DeploymentGuideModal
        isOpen={isDeploymentGuideOpen}
        onClose={() => setIsDeploymentGuideOpen(false)}
      />

      <SubmitToolModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmit={handleSubmitNewTool}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        favorites={favorites}
        allTools={tools}
        onRemoveFavorite={handleToggleFavorite}
        onSelectTool={handleSelectTool}
        userReviews={reviews.filter((r) => r.userName === userName)}
        userSubmissions={userSubmissions}
        userName={userName}
        userEmail={userEmail}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}
