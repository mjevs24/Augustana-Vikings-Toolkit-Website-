import React, { useState } from 'react';
import {
  Zap,
  CheckCircle2,
  AlertCircle,
  FileDown,
  RotateCcw,
  BookOpen,
  Trophy,
  Moon,
  Utensils,
  Brain,
  Users,
  Home,
  Sparkles,
  MessageSquare,
  Info
} from 'lucide-react';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

interface Occupation {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
}

const OCCUPATIONS: Occupation[] = [
  {
    id: 'academics',
    label: 'Academics',
    description: 'Classes, studying, labs, assignments & exams',
    icon: BookOpen,
  },
  {
    id: 'sport',
    label: 'Varsity Sport',
    description: 'Practices, games, conditioning, film & travel',
    icon: Trophy,
  },
  {
    id: 'sleep',
    label: 'Sleep & Recovery',
    description: 'Restorative sleep, downtime, naps & treatment',
    icon: Moon,
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    description: 'Meal prep, fueling, hydration & eating well',
    icon: Utensils,
  },
  {
    id: 'mental',
    label: 'Mental Health',
    description: 'Mindfulness, self-care, stress & emotional balance',
    icon: Brain,
  },
  {
    id: 'social',
    label: 'Social & Team Relationships',
    description: 'Teammate bonds, friendships & social connection',
    icon: Users,
  },
  {
    id: 'family',
    label: 'Family / Work',
    description: 'Family time, employment, chores & responsibilities',
    icon: Home,
  },
  {
    id: 'growth',
    label: 'Personal Growth',
    description: 'Hobbies, faith/spirituality & career prep',
    icon: Sparkles,
  },
];

const MAX_TOTAL_TOKENS = 10;
const MAX_TOKENS_PER_OCCUPATION = 5;

const INITIAL_ALLOCATIONS: Record<string, number> = {
  academics: 0,
  sport: 0,
  sleep: 0,
  nutrition: 0,
  mental: 0,
  social: 0,
  family: 0,
  growth: 0,
};

const INITIAL_REFLECTIONS = {
  actualFeeling: '',
  underfueledArea: '',
  adjustment: '',
};

export const BalanceWheelTool: React.FC = () => {
  const [allocations, setAllocations] = useState<Record<string, number>>(INITIAL_ALLOCATIONS);
  const [reflections, setReflections] = useState(INITIAL_REFLECTIONS);

  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  const totalAllocated = (Object.values(allocations) as number[]).reduce((sum, val) => sum + val, 0);
  const remainingTokens = MAX_TOTAL_TOKENS - totalAllocated;

  const handleSetToken = (occupationId: string, targetCount: number) => {
    setWarningMessage(null);
    const currentCount = allocations[occupationId] || 0;

    // Toggle off if clicking the exact current allocation
    const countToSet = currentCount === targetCount ? targetCount - 1 : targetCount;
    const delta = countToSet - currentCount;

    if (delta > 0 && delta > remainingTokens) {
      const occupationLabel = OCCUPATIONS.find((o) => o.id === occupationId)?.label || 'this area';
      if (remainingTokens > 0) {
        const capped = currentCount + remainingTokens;
        setAllocations((prev) => ({ ...prev, [occupationId]: capped }));
        setWarningMessage(
          `Only ${remainingTokens} token(s) remained, so ${capped} token(s) were assigned to ${occupationLabel}. All 10 energy tokens are now allocated.`
        );
      } else {
        setWarningMessage(
          `All 10 available energy tokens have already been assigned. Every token allocated to one occupation reduces what is available for others.`
        );
      }
    } else {
      setAllocations((prev) => ({
        ...prev,
        [occupationId]: Math.max(0, countToSet),
      }));
    }
  };

  const handleConfirmReset = () => {
    setAllocations(INITIAL_ALLOCATIONS);
    setReflections(INITIAL_REFLECTIONS);
    setWarningMessage(null);
    setShowResetConfirmation(false);
  };

  const handleSaveAsPdf = () => {
    const sectionAllocations: string[] = OCCUPATIONS.map((occ) => {
      const val = allocations[occ.id] || 0;
      return `• ${occ.label}: ${val} Token${val === 1 ? '' : 's'}`;
    });

    downloadWorksheetPdf({
      title: 'Weekly Energy Allocation Worksheet',
      subtitle: 'Augustana Vikings Student-Athlete Occupational Balance Tool',
      completedDate: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      filename: 'Augustana_Weekly_Energy_Allocation.pdf',
      sections: [
        {
          heading: 'Your Weekly Energy Snapshot',
          content:
            `Energy Allocated: ${totalAllocated} of ${MAX_TOTAL_TOKENS} Tokens (${remainingTokens} Remaining)\n\n` +
            `This snapshot shows where your energy is currently invested this week. Use your reflections below to decide whether this distribution reflects your priorities.\n\n` +
            `This Week's Energy Allocation:\n` +
            sectionAllocations.join('\n'),
          highlight: totalAllocated === MAX_TOTAL_TOKENS ? 'emerald' : 'gray',
        },
        {
          heading: 'Reality Check',
          label: 'Does this distribution reflect how your week actually feels?',
          content: reflections.actualFeeling?.trim() || 'No reflection recorded.',
        },
        {
          heading: 'What Needs More Attention?',
          label: 'Which occupation is receiving less energy than you would like?',
          content: reflections.underfueledArea?.trim() || 'No reflection recorded.',
        },
        {
          heading: 'One Small Change for Next Week',
          label: 'What is one small adjustment you could make next week to create a better balance?',
          content: reflections.adjustment?.trim() || 'No reflection recorded.',
        },
      ],
      coachHeading: 'Planning Reminder',
      coachNote:
        'Energy is finite. You cannot give 100% to everything at once. Be intentional with where your tokens go, protect your sleep & recovery, and communicate with your coaches and professors when your energy is stretched.',
      footerNote:
        'Remember: Occupational balance doesn\'t require giving every area equal attention. It means intentionally using your limited energy in ways that support what matters most this week.',
    });
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-6 text-neutral-900 shadow-xs my-4 space-y-6">
      {/* Header & Primary Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div>
          <span className="text-xs text-[#C8102E] font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Zap className="w-3.5 h-3.5 fill-[#C8102E]" /> Occupational Energy & Balance
          </span>
          <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
            Weekly Energy Allocation
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
            Student-athletes have finite time, energy, and attention. Allocate your 10 weekly energy tokens across core occupations to reflect your current balance.
          </p>
        </div>

        {/* 2 PRIMARY ACTIONS */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSaveAsPdf}
            className="px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-white" />
            <span>Save as PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setShowResetConfirmation(true)}
            className="px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-neutral-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 border border-neutral-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-neutral-600" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Energy Counter Section */}
      <div className="bg-stone-50 border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
              Weekly Energy Available
            </div>
            <div className="text-xl sm:text-2xl font-black text-neutral-900 flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#C8102E] fill-[#C8102E]" />
              <span>{remainingTokens} / {MAX_TOTAL_TOKENS} Tokens Remaining</span>
            </div>
          </div>

          {/* Token Dots Bar */}
          <div className="flex items-center gap-1.5 bg-white px-4 py-3 rounded-xl border border-neutral-200 shadow-2xs">
            {Array.from({ length: MAX_TOTAL_TOKENS }).map((_, i) => {
              const isAvailable = i < remainingTokens;
              return (
                <div
                  key={i}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${
                    isAvailable
                      ? 'bg-[#C8102E] text-white shadow-2xs scale-100'
                      : 'bg-stone-200 text-stone-400 scale-95'
                  }`}
                  title={isAvailable ? `Available Token ${i + 1}` : `Allocated Token`}
                >
                  {isAvailable ? (
                    <span className="text-xs font-bold">●</span>
                  ) : (
                    <span className="text-xs font-bold text-stone-400">○</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status indicator message */}
        {remainingTokens === 0 ? (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>All weekly energy has been allocated.</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-stone-100 border border-neutral-200 text-neutral-700 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium">
            <Info className="w-4 h-4 text-[#C8102E] shrink-0" />
            <span>Assign your remaining {remainingTokens} token(s) across the occupations below.</span>
          </div>
        )}

        {/* Gentle Warning Message if user attempted to allocate past 10 */}
        {warningMessage && (
          <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-xl text-xs sm:text-sm animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{warningMessage}</p>
            </div>
            <button
              onClick={() => setWarningMessage(null)}
              className="text-amber-700 hover:text-amber-900 font-bold text-xs uppercase tracking-wider ml-2"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Occupations Allocation Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-700">
            Occupational Energy Distribution
          </h4>
          <span className="text-xs text-neutral-500 font-medium">
            Click circles to allocate (Max 5 per occupation)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OCCUPATIONS.map((occ) => {
            const IconComp = occ.icon;
            const currentAlloc = allocations[occ.id] || 0;

            return (
              <div
                key={occ.id}
                className="bg-stone-50 hover:bg-white border border-neutral-200 rounded-xl p-4 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#C8102E]/10 text-[#C8102E] flex items-center justify-center shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm text-neutral-900">
                        {occ.label}
                      </span>
                    </div>

                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-stone-200/80 text-neutral-800">
                      {currentAlloc} / {MAX_TOKENS_PER_OCCUPATION} Tokens
                    </span>
                  </div>

                  <p className="text-xs text-neutral-500 mb-3 ml-10">
                    {occ.description}
                  </p>
                </div>

                {/* Token Buttons Row */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 mt-2">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: MAX_TOKENS_PER_OCCUPATION }).map((_, idx) => {
                      const tokenNumber = idx + 1;
                      const isAssigned = tokenNumber <= currentAlloc;

                      return (
                        <button
                          key={tokenNumber}
                          type="button"
                          onClick={() => handleSetToken(occ.id, tokenNumber)}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all cursor-pointer ${
                            isAssigned
                              ? 'bg-[#C8102E] text-white shadow-xs scale-100 hover:bg-red-800'
                              : 'bg-white border border-neutral-300 text-neutral-400 hover:border-neutral-400 hover:bg-stone-100'
                          }`}
                          title={`Assign ${tokenNumber} token(s) to ${occ.label}`}
                        >
                          {isAssigned ? '●' : '○'}
                        </button>
                      );
                    })}
                  </div>

                  {/* Decrement / Increment quick buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={currentAlloc === 0}
                      onClick={() => handleSetToken(occ.id, currentAlloc - 1)}
                      className="w-7 h-7 rounded-lg border border-neutral-200 text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200 font-bold text-xs flex items-center justify-center"
                      title="Remove 1 token"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      disabled={currentAlloc >= MAX_TOKENS_PER_OCCUPATION || remainingTokens === 0}
                      onClick={() => handleSetToken(occ.id, currentAlloc + 1)}
                      className="w-7 h-7 rounded-lg border border-neutral-200 text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-200 font-bold text-xs flex items-center justify-center"
                      title="Add 1 token"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reflection Prompts Section */}
      <div className="bg-stone-50 border border-neutral-200 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-neutral-900 border-b border-neutral-200 pb-3">
          <MessageSquare className="w-5 h-5 text-[#C8102E]" />
          <h4 className="text-base font-bold text-neutral-900">
            Occupational Balance Reflections
          </h4>
        </div>

        <div className="space-y-4">
          {/* Prompt 1 */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1.5">
              1. Does this distribution reflect how your week actually feels?
            </label>
            <textarea
              rows={2}
              value={reflections.actualFeeling}
              onChange={(e) => setReflections({ ...reflections, actualFeeling: e.target.value })}
              placeholder="e.g., Yes, sport and academics absorb almost 80% of my time, leaving sleep and mental health under-resourced..."
              className="w-full rounded-xl border border-neutral-300 p-3 text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#C8102E]/30 bg-white"
            />
          </div>

          {/* Prompt 2 */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1.5">
              2. Which occupation is receiving less energy than you would like?
            </label>
            <textarea
              rows={2}
              value={reflections.underfueledArea}
              onChange={(e) => setReflections({ ...reflections, underfueledArea: e.target.value })}
              placeholder="e.g., Sleep & Recovery and Personal Growth are only getting 1 token each. I feel drained by mid-week..."
              className="w-full rounded-xl border border-neutral-300 p-3 text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#C8102E]/30 bg-white"
            />
          </div>

          {/* Prompt 3 */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-neutral-800 mb-1.5">
              3. What is one small adjustment you could make next week to create a better balance?
            </label>
            <textarea
              rows={2}
              value={reflections.adjustment}
              onChange={(e) => setReflections({ ...reflections, adjustment: e.target.value })}
              placeholder="e.g., Shift 1 token to sleep by setting a strict 10:30 PM screen-off boundary on non-game nights..."
              className="w-full rounded-xl border border-neutral-300 p-3 text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#C8102E]/30 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-neutral-200 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h5 className="font-bold text-lg text-neutral-900">Reset Energy Allocations?</h5>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600">
              This will reset all 10 allocated energy tokens and clear your reflection answers for this session.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirmation(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:bg-stone-100 uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#C8102E] hover:bg-red-800 uppercase tracking-wider shadow-xs cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
