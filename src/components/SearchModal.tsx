import React, { useState } from 'react';
import { toolkitSectionsData } from '../data/toolkitData';
import { SectionId } from '../types';
import { Search, X, ChevronRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: SectionId) => void;
  onOpenInteractiveTool: (toolId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  onOpenInteractiveTool,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search results matching worksheets, resources, strategies
  const results = toolkitSectionsData.flatMap((section) => {
    const matches: {
      type: 'worksheet' | 'resource' | 'strategy' | 'support';
      title: string;
      description: string;
      sectionTitle: string;
      sectionId: SectionId;
      interactiveToolId?: string;
      url?: string;
    }[] = [];

    if (!q) return matches;

    section.worksheets.forEach((ws) => {
      if (
        ws.name.toLowerCase().includes(q) ||
        ws.description.toLowerCase().includes(q) ||
        ws.tags.some((t) => t.toLowerCase().includes(q))
      ) {
        matches.push({
          type: 'worksheet',
          title: ws.name,
          description: ws.description,
          sectionTitle: section.title,
          sectionId: section.id,
          interactiveToolId: ws.interactiveToolId,
        });
      }
    });

    section.appsAndResources.forEach((res) => {
      if (res.name.toLowerCase().includes(q) || res.description.toLowerCase().includes(q)) {
        matches.push({
          type: 'resource',
          title: res.name,
          description: res.description,
          sectionTitle: section.title,
          sectionId: section.id,
          url: res.url,
        });
      }
    });

    section.strategies.forEach((strat) => {
      if (strat.title.toLowerCase().includes(q) || strat.summary.toLowerCase().includes(q)) {
        matches.push({
          type: 'strategy',
          title: strat.title,
          description: strat.summary,
          sectionTitle: section.title,
          sectionId: section.id,
        });
      }
    });

    section.supportResources.forEach((sup) => {
      if (
        sup.name.toLowerCase().includes(q) ||
        sup.description.toLowerCase().includes(q) ||
        sup.role.toLowerCase().includes(q)
      ) {
        matches.push({
          type: 'support',
          title: sup.name,
          description: `${sup.role} - ${sup.description}`,
          sectionTitle: section.title,
          sectionId: section.id,
          url: sup.link,
        });
      }
    });

    return matches;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white border border-neutral-200 rounded-2xl max-w-2xl w-full text-neutral-900 shadow-2xl overflow-hidden relative">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-neutral-200 bg-stone-50">
          <Search className="w-5 h-5 text-red-700 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search worksheets, Pomodoro, sleep guides, nutrition, counselling..."
            className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none placeholder:text-neutral-500 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {!q && (
            <div className="text-center py-8 text-neutral-500 text-xs font-normal">
              Type keywords above like <span className="text-red-700 font-bold">"Pomodoro"</span>, <span className="text-red-700 font-bold">"Eisenhower"</span>, <span className="text-red-700 font-bold">"Sleep"</span>, or <span className="text-red-700 font-bold">"Weekly Game Plan"</span>.
            </div>
          )}

          {q && results.length === 0 && (
            <div className="text-center py-8 text-neutral-500 text-xs font-normal">
              No matching resources found for "{query}". Try checking another term or browse sections directly.
            </div>
          )}

          {results.map((res, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-stone-50 border border-neutral-200 hover:border-red-600 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold uppercase border border-red-200">
                    {res.sectionTitle}
                  </span>
                  <span className="text-[10px] text-neutral-500 uppercase font-medium">{res.type}</span>
                </div>
                <div className="text-sm font-bold text-neutral-900 group-hover:text-red-700 transition-colors">
                  {res.title}
                </div>
                <div className="text-xs text-neutral-600 line-clamp-1 mt-0.5">
                  {res.description}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {res.interactiveToolId && (
                  <button
                    onClick={() => {
                      onOpenInteractiveTool(res.interactiveToolId!);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Tool
                  </button>
                )}

                <button
                  onClick={() => {
                    if (res.url) {
                      window.open(res.url, '_blank');
                    } else {
                      onSelectSection(res.sectionId);
                      onClose();
                    }
                  }}
                  className="p-2 rounded-lg bg-white hover:bg-stone-200 text-neutral-700 border border-neutral-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
