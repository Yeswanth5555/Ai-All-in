import React, { useState } from 'react';
import {
  X,
  User,
  Bookmark,
  Star,
  FolderPlus,
  Send,
  Trash2,
  Check,
} from 'lucide-react';
import { AITool, ToolSubmission, UserReview } from '../types/tool';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  allTools: AITool[];
  onRemoveFavorite: (toolId: string) => void;
  onSelectTool: (tool: AITool) => void;
  userReviews: UserReview[];
  userSubmissions: ToolSubmission[];
  userName: string;
  userEmail: string;
  onUpdateProfile: (name: string, email: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  favorites,
  allTools,
  onRemoveFavorite,
  onSelectTool,
  userReviews,
  userSubmissions,
  userName,
  userEmail,
  onUpdateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'collections' | 'reviews' | 'submissions' | 'settings'>('favorites');
  const [nameInput, setNameInput] = useState(userName);
  const [emailInput, setEmailInput] = useState(userEmail);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Custom Collections state
  const [collections, setCollections] = useState<{ id: string; name: string; toolIds: string[] }[]>([
    { id: 'col-1', name: 'My Daily Coding Stack', toolIds: ['cursor', 'continue-dev', 'deepseek'] },
    { id: 'col-2', name: 'Video & Audio Production', toolIds: ['runway-gen3', 'elevenlabs', 'suno-ai'] },
  ]);
  const [newCollectionName, setNewCollectionName] = useState('');

  if (!isOpen) return null;

  const favoriteTools = allTools.filter((t) => favorites.includes(t.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(nameInput.trim(), emailInput.trim());
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2000);
  };

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    setCollections([
      ...collections,
      {
        id: `col-${Date.now()}`,
        name: newCollectionName.trim(),
        toolIds: [],
      },
    ]);
    setNewCollectionName('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-[0_25px_70px_rgba(0,0,0,0.4)] border border-white/80 dark:border-white/10 relative flex flex-col text-slate-900 dark:text-slate-100 transition-colors"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-profile-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl px-6 py-4 border-b border-white/60 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-[0_4px_12px_rgba(37,99,235,0.35)] border border-white/30">
              {userName.slice(0, 2).toUpperCase() || 'US'}
            </div>
            <div>
              <h2 id="user-profile-title" className="text-base font-extrabold text-slate-900 dark:text-white">
                {userName || 'User Workspace'}
              </h2>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{userEmail || 'Active Local Session'}</div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Profile"
            className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-white/60 dark:border-white/10 flex flex-wrap gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Favorites ({favorites.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('collections')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'collections'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>Custom Collections ({collections.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>My Reviews ({userReviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'submissions'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>My Submissions ({userSubmissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile Settings</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {/* Favorites */}
          {activeTab === 'favorites' && (
            <div>
              {favoriteTools.length === 0 ? (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500">
                  <Bookmark className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                  <p className="text-xs">No saved favorites yet.</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    Click the bookmark icon on any tool card in the directory to save it here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {favoriteTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-2xs hover:bg-white dark:hover:bg-slate-750 transition-all"
                    >
                      <div
                        onClick={() => {
                          onClose();
                          onSelectTool(tool);
                        }}
                        className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
                      >
                        <div className="w-10 h-10 ios-app-icon flex items-center justify-center font-black text-xs text-slate-800 dark:text-white shrink-0">
                          {tool.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400">
                            {tool.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-medium">
                            {tool.pricingModel} · {tool.category}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onRemoveFavorite(tool.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Collections */}
          {activeTab === 'collections' && (
            <div className="space-y-6">
              <form onSubmit={handleCreateCollection} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="Create new collection (e.g., Marketing Stack, Client Tools)..."
                  className="flex-1 text-xs bg-white/80 dark:bg-slate-800/90 border border-white/80 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white ios-gloss-btn rounded-xl"
                >
                  Create Collection
                </button>
              </form>

              <div className="space-y-4">
                {collections.map((col) => {
                  const toolsInCol = allTools.filter((t) => col.toolIds.includes(t.id));
                  return (
                    <div key={col.id} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4.5 shadow-2xs">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{col.name}</h4>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{toolsInCol.length} tools</span>
                      </div>

                      {toolsInCol.length === 0 ? (
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">Empty collection.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {toolsInCol.map((t) => (
                            <button
                              key={t.id}
                              onClick={() => {
                                onClose();
                                onSelectTool(t);
                              }}
                              className="px-2.5 py-1 bg-white/90 dark:bg-slate-700/80 border border-white/80 dark:border-white/10 hover:border-blue-400 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-xl"
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <div>
              {userReviews.length === 0 ? (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs">
                  You haven't submitted any tool reviews yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {userReviews.map((rev) => (
                    <div key={rev.id} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4 shadow-2xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.title}</span>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{rev.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Submissions */}
          {activeTab === 'submissions' && (
            <div>
              {userSubmissions.length === 0 ? (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs">
                  No tool submissions on record.
                </div>
              ) : (
                <div className="space-y-3">
                  {userSubmissions.map((sub) => (
                    <div key={sub.id} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/80 dark:border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{sub.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{sub.category} · {sub.pricingModel}</div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200/50 dark:border-emerald-800/50">
                        {sub.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full text-xs bg-white/80 dark:bg-slate-800/90 border border-white/80 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full text-xs bg-white/80 dark:bg-slate-800/90 border border-white/80 dark:border-white/10 text-slate-900 dark:text-white rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white ios-gloss-btn rounded-xl"
                >
                  Save Profile Settings
                </button>
                {isSavedNotice && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
