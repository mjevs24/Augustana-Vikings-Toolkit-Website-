import React from 'react';
import { SectionId, ToolkitSection } from '../types';
import { Plus } from 'lucide-react';

interface ToolboxGridProps {
  sections: ToolkitSection[];
  onSelectSection: (id: SectionId) => void;
}

export const ToolboxGrid: React.FC<ToolboxGridProps> = ({ sections, onSelectSection }) => {
  // Card specific visual bullet previews matching the exact screenshot
  const cardPreviews: Record<string, { num: string; title: string; bullets: string; isPopular?: boolean }> = {
    'time-management': {
      num: '01',
      title: 'TIME MANAGEMENT',
      bullets: 'POMODORO, EISENHOWER MATRIX, WEEKLY AUDITS',
    },
    'academic-balance': {
      num: '02',
      title: 'ACADEMIC BALANCE',
      bullets: 'SEMESTER GAME PLANS, STUDY PLANNERS, ENERGY CHECKS',
    },
    'stress-management': {
      num: '03',
      title: 'STRESS MANAGEMENT',
      bullets: 'MINDSHIFT CBT, SELF-HELP WORKBOOKS, RESILIENCE',
      isPopular: true,
    },
    'sleep-recovery': {
      num: '04',
      title: 'SLEEP & RECOVERY',
      bullets: 'U OF A SLEEP GUIDE, PERFORMANCE TIPS, BETTERSLEEP',
    },
    'nutrition': {
      num: '05',
      title: 'PERFORMANCE NUTRITION',
      bullets: 'BUDGET FUELING, TRAVEL KITS, MEAL PLANNING',
    },
  };

  return (
    <section id="toolkit-drawers" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-2 border-b border-gray-300">
        <h2 className="text-xs font-black uppercase tracking-widest text-neutral-900">
          INTERACTIVE TOOL STORAGE
        </h2>
        <span className="text-xs italic text-neutral-500 font-serif">
          Select a compartment to expand resources
        </span>
      </div>

      {/* 5 Vertical Black Cards Side-by-Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {sections.map((sec) => {
          const info: { num: string; title: string; bullets: string; isPopular?: boolean } = cardPreviews[sec.id] || {
            num: '01',
            title: sec.title.toUpperCase(),
            bullets: 'WORKBOOK, GUIDES, TOOLS',
            isPopular: false,
          };

          return (
            <div
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className="group bg-black rounded-lg p-5 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-all duration-200 border-b-4 border-b-[#C8102E] shadow-xl min-h-[330px] relative"
            >
              <div>
                {/* Top Number & Popular Badge */}
                <div className="flex items-start justify-between">
                  <span className="text-4xl font-extrabold italic text-[#C8102E] font-athletic leading-none">
                    {info.num}
                  </span>

                  {info.isPopular && (
                    <span className="text-[9px] font-bold text-white uppercase tracking-wider px-1.5 py-0.5 border border-white/60 rounded">
                      POPULAR
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-black italic uppercase text-white font-athletic tracking-tight mt-4 mb-2 group-hover:text-red-400 transition-colors leading-tight">
                  {info.title}
                </h3>

                {/* Short Subtext / Bullets */}
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide leading-relaxed">
                  {info.bullets}
                </p>
              </div>

              {/* Bottom Right Plus Button */}
              <div className="flex justify-end pt-6">
                <div className="w-8 h-8 rounded border border-neutral-700 bg-neutral-900 group-hover:border-[#C8102E] group-hover:bg-[#C8102E] text-white flex items-center justify-center transition-all shadow-xs">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

