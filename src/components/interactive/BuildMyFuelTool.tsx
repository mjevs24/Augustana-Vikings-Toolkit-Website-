import React, { useState, useMemo } from 'react';
import {
  Utensils,
  Car,
  DollarSign,
  Cookie,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Download,
  AlertCircle,
  Clock,
  Layers,
  ShoppingBag,
  Flame,
  Shuffle
} from 'lucide-react';
import { FUEL_IDEA_BANK, FuelIdea } from '../../data/fuelIdeaBank';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

type NeedCategory = 'meal' | 'road' | 'cheap' | 'snack' | null;

export const BuildMyFuelTool: React.FC = () => {
  // Wizard state
  const [step, setStep] = useState<number>(1);

  // Selections
  const [need, setNeed] = useState<NeedCategory>(null);
  const [access, setAccess] = useState<string>('microwave');
  const [timing, setTiming] = useState<string>('after');
  const [dietary, setDietary] = useState<string[]>(['none']);
  const [priorities, setPriorities] = useState<string[]>(['cheap', 'fast']);

  // Results pagination
  const [resultOffset, setResultOffset] = useState<number>(0);

  // Toggle multi-select dietary
  const toggleDietary = (val: string) => {
    if (val === 'none') {
      setDietary(['none']);
      return;
    }
    const filtered = dietary.filter((d) => d !== 'none');
    if (filtered.includes(val)) {
      const next = filtered.filter((d) => d !== val);
      setDietary(next.length === 0 ? ['none'] : next);
    } else {
      setDietary([...filtered, val]);
    }
  };

  // Toggle multi-select priorities
  const togglePriority = (val: string) => {
    if (val === 'nopref') {
      setPriorities(['nopref']);
      return;
    }
    const filtered = priorities.filter((p) => p !== 'nopref');
    if (filtered.includes(val)) {
      const next = filtered.filter((p) => p !== val);
      setPriorities(next.length === 0 ? ['nopref'] : next);
    } else {
      setPriorities([...filtered, val]);
    }
  };

  // Filter and score meal bank items based on user selections
  const matchingIdeas = useMemo(() => {
    return FUEL_IDEA_BANK.map((item) => {
      let score = 0;

      // 1. Need category score
      if (need && item.category === need) {
        score += 5;
      }

      // 2. Access score
      if (item.accessTags.includes(access)) {
        score += 4;
      } else if (access === 'nocook' && item.accessTags.includes('nocook')) {
        score += 5;
      } else if (access === 'gasstation' && (item.accessTags.includes('gasstation') || item.accessTags.includes('nocook'))) {
        score += 4;
      }

      // 3. Dietary filtering and scoring
      let dietaryConflict = false;
      if (!dietary.includes('none')) {
        if (dietary.includes('vegan')) {
          if (item.dietaryTags.includes('vegan')) {
            score += 4;
          } else if (item.easySwap?.toLowerCase().includes('vegan')) {
            score += 2;
          } else {
            dietaryConflict = true;
          }
        }
        if (dietary.includes('vegetarian')) {
          if (item.dietaryTags.includes('vegetarian') || item.dietaryTags.includes('vegan')) {
            score += 3;
          } else if (item.easySwap?.toLowerCase().includes('vegetarian')) {
            score += 1;
          } else {
            dietaryConflict = true;
          }
        }
        if (dietary.includes('gluten-free')) {
          if (item.dietaryTags.includes('gluten-free')) {
            score += 3;
          } else if (item.easySwap?.toLowerCase().includes('gluten-free')) {
            score += 1;
          }
        }
        if (dietary.includes('dairy-free')) {
          if (item.dietaryTags.includes('dairy-free') || item.dietaryTags.includes('vegan')) {
            score += 3;
          } else if (item.easySwap?.toLowerCase().includes('dairy-free')) {
            score += 1;
          }
        }
      }

      // 4. Timing score
      if (item.timingTags.includes(timing) || timing === 'nospecific') {
        score += 2;
      }

      // 5. Priorities score
      priorities.forEach((p) => {
        if (p !== 'nopref' && item.preferenceTags.includes(p)) {
          score += 1;
        }
      });

      // Reduce score heavily if direct dietary conflict
      if (dietaryConflict) {
        score -= 20;
      }

      return { item, score };
    })
    .filter((entry) => entry.score > -10)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
  }, [need, access, timing, dietary, priorities]);

  // Pagination for results: 3 at a time
  const displayedIdeas = useMemo(() => {
    if (matchingIdeas.length === 0) return [];
    const startIndex = resultOffset % matchingIdeas.length;
    const items = [];
    for (let i = 0; i < 3; i++) {
      const idx = (startIndex + i) % matchingIdeas.length;
      items.push(matchingIdeas[idx]);
    }
    // Remove duplicates if matchingIdeas has < 3 total items
    const unique = items.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
    return unique;
  }, [matchingIdeas, resultOffset]);

  const handleShowMore = () => {
    setResultOffset((prev) => prev + 3);
  };

  const handleReset = () => {
    setStep(1);
    setNeed(null);
    setAccess('microwave');
    setTiming('after');
    setDietary(['none']);
    setPriorities(['cheap', 'fast']);
    setResultOffset(0);
  };

  // Save PDF
  const handleExportPdf = () => {
    const needLabel =
      need === 'meal'
        ? 'I need a meal'
        : need === 'road'
        ? 'I need food for the road'
        : need === 'cheap'
        ? 'I need cheap food ideas'
        : need === 'snack'
        ? 'I need a quick snack'
        : 'General Fueling';

    const accessLabels: Record<string, string> = {
      microwave: 'Microwave only',
      'fridge-microwave': 'Fridge + Microwave',
      kitchen: 'Full kitchen',
      nocook: 'No cooking required',
      gasstation: 'Convenience store / Gas station',
      grocerystore: 'Grocery store stop',
      hotel: 'Hotel room',
      restaurant: 'Restaurant / Fast food'
    };

    const timingLabels: Record<string, string> = {
      before: 'Before training or competition',
      after: 'After training or competition',
      between: 'Between classes / practice',
      meal: 'Regular meal time',
      snack: 'Quick snack',
      travel: 'Travel day',
      nospecific: 'No specific timing'
    };

    const dietaryStr = dietary.includes('none')
      ? 'No specific restrictions'
      : dietary.map((d) => d.toUpperCase()).join(', ');

    const prioritiesStr = priorities.includes('nopref')
      ? 'No specific preference'
      : priorities.map((p) => p.replace('-', ' ')).join(', ');

    const sections = [
      {
        heading: 'My Situation & Constraints',
        content: `What I Needed: ${needLabel}\nCooking Access: ${accessLabels[access] || access}\nTiming: ${timingLabels[timing] || timing}\nDietary Preferences: ${dietaryStr}\nPriorities: ${prioritiesStr}`,
        highlight: 'red' as const
      },
      ...displayedIdeas.map((idea, idx) => ({
        heading: `Recommended Fuel Idea #${idx + 1}: ${idea.name}`,
        content: `EQUIPMENT & TIME: ${idea.equipment} (${idea.prepTime})\n\nINGREDIENTS:\n- ${idea.ingredients.join('\n- ')}\n\nHOW TO PREPARE:\n${idea.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}${idea.easySwap ? `\n\nEASY SWAP: ${idea.easySwap}` : ''}${idea.sourceAttribution ? `\n\nSOURCE: ${idea.sourceAttribution}` : ''}`,
        highlight: 'gray' as const
      }))
    ];

    downloadWorksheetPdf(
      {
        title: 'BUILD MY FUEL - Student-Athlete Meal Ideas',
        subtitle: 'Augustana Vikings Student-Athlete Well-Being Toolkit',
        filename: 'Build_My_Fuel_Ideas.pdf',
        completedDate: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        sections,
        footerNote:
          'Ingredient needs vary by person and product. Always check individual food labels if you have an allergy, intolerance, or medical dietary requirement. This tool provides practical food ideas and is not individualized medical nutrition therapy.'
      },
      'Build_My_Fuel_Ideas.pdf'
    );
  };

  return (
    <div className="space-y-6 text-neutral-900">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-2xl border-t-4 border-t-[#C8102E] shadow-sm">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Utensils className="w-4 h-4 text-red-500" />
              <span>INTERACTIVE PERFORMANCE NUTRITION TOOL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Build My Fuel
            </h1>
            <p className="text-sm text-neutral-300 mt-1 max-w-2xl">
              Find realistic meal and snack ideas based on your schedule, cooking access, dietary needs, budget, and what your day looks like.
            </p>
          </div>
          {step <= 5 && (
            <div className="bg-stone-800 border border-stone-700 px-4 py-2 rounded-xl text-center">
              <span className="text-xs font-semibold text-neutral-400 block uppercase tracking-wider">
                Progress
              </span>
              <span className="text-lg font-black text-red-400">
                Step {step} of 5
              </span>
            </div>
          )}
        </div>
      </div>

      {/* STEP 1: WHAT DO YOU NEED? */}
      {step === 1 && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-red-100 text-[#C8102E] font-bold text-sm flex items-center justify-center shrink-0">
                1
              </span>
              What are you trying to figure out?
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Select what best matches your current food goal right now.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setNeed('meal')}
              className={`p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                need === 'meal'
                  ? 'border-[#C8102E] bg-red-50/50 shadow-sm'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className="p-3 rounded-xl bg-red-100 text-[#C8102E] text-2xl shrink-0">
                🍽️
              </div>
              <div>
                <h3 className="font-bold text-base text-neutral-900">
                  I need a meal
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Balanced breakfast, lunch, or dinner ideas for dorm or home.
                </p>
              </div>
            </button>

            <button
              onClick={() => setNeed('road')}
              className={`p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                need === 'road'
                  ? 'border-[#C8102E] bg-red-50/50 shadow-sm'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className="p-3 rounded-xl bg-amber-100 text-amber-800 text-2xl shrink-0">
                🎒
              </div>
              <div>
                <h3 className="font-bold text-base text-neutral-900">
                  I need food for the road
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Travel days, away games, bus rides, gas station & hotel ideas.
                </p>
              </div>
            </button>

            <button
              onClick={() => setNeed('cheap')}
              className={`p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                need === 'cheap'
                  ? 'border-[#C8102E] bg-red-50/50 shadow-sm'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-2xl shrink-0">
                🛒
              </div>
              <div>
                <h3 className="font-bold text-base text-neutral-900">
                  I need cheap food ideas
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Affordable staple foods for student budgets and pantry items.
                </p>
              </div>
            </button>

            <button
              onClick={() => setNeed('snack')}
              className={`p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                need === 'snack'
                  ? 'border-[#C8102E] bg-red-50/50 shadow-sm'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className="p-3 rounded-xl bg-sky-100 text-sky-800 text-2xl shrink-0">
                🥨
              </div>
              <div>
                <h3 className="font-bold text-base text-neutral-900">
                  I need a quick snack
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Fast fuel between classes, lift sessions, or before practice.
                </p>
              </div>
            </button>
          </div>

          <div className="flex justify-end pt-4 border-t border-neutral-200">
            <button
              disabled={!need}
              onClick={() => {
                // If user selected road food, default access to nocook or gasstation
                if (need === 'road') setAccess('gasstation');
                setStep(2);
              }}
              className="px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-red-800 disabled:opacity-40 disabled:hover:bg-[#C8102E] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs"
            >
              <span>Next: Cooking Access</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: COOKING ACCESS */}
      {step === 2 && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-red-100 text-[#C8102E] font-bold text-sm flex items-center justify-center shrink-0">
                2
              </span>
              What do you have access to?
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Select your primary cooking setup or food source right now.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'microwave', label: 'Microwave only', desc: 'Dorm or student lounge' },
              { id: 'fridge-microwave', label: 'Fridge + microwave', desc: 'Mini-fridge & microwave' },
              { id: 'kitchen', label: 'Full kitchen', desc: 'Stove, oven & fridge' },
              { id: 'nocook', label: 'No cooking', desc: 'No appliances needed' },
              { id: 'gasstation', label: 'Gas station / Convenience', desc: 'Quick stop on the road' },
              { id: 'grocerystore', label: 'Grocery store', desc: 'Supermarket grab & go' },
              { id: 'hotel', label: 'Hotel room', desc: 'Away games stay' },
              { id: 'restaurant', label: 'Restaurant / Fast food', desc: 'Dining out' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setAccess(opt.id)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  access === opt.id
                    ? 'border-[#C8102E] bg-red-50 text-neutral-900 font-bold shadow-xs'
                    : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                }`}
              >
                <div>
                  <span className="block font-bold text-sm text-neutral-900">{opt.label}</span>
                  <span className="block text-xs text-neutral-500 mt-0.5">{opt.desc}</span>
                </div>
                {access === opt.id && (
                  <CheckCircle2 className="w-4 h-4 text-[#C8102E] mt-2 self-end" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs"
            >
              <span>Next: Fueling Time</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: WHEN ARE YOU FUELING? */}
      {step === 3 && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-red-100 text-[#C8102E] font-bold text-sm flex items-center justify-center shrink-0">
                3
              </span>
              When are you fueling?
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Select your timing context to filter practical food ideas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: 'before', label: 'Before training / competition', tag: 'Pre-workout carbs & light options' },
              { id: 'after', label: 'After training / competition', tag: 'Recovery protein & carbohydrates' },
              { id: 'between', label: 'Between classes or practice', tag: 'Quick portable fuel' },
              { id: 'meal', label: 'Regular meal time', tag: 'Breakfast, lunch, or dinner' },
              { id: 'snack', label: 'Quick snack window', tag: 'Anytime small bite' },
              { id: 'travel', label: 'Travel day', tag: 'Bus trip / road travel' },
              { id: 'nospecific', label: 'No specific timing', tag: 'General options' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTiming(opt.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  timing === opt.id
                    ? 'border-[#C8102E] bg-red-50 text-neutral-900 font-bold shadow-xs'
                    : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                }`}
              >
                <span className="block font-bold text-sm text-neutral-900">{opt.label}</span>
                <span className="block text-xs text-neutral-500 mt-1">{opt.tag}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs"
            >
              <span>Next: Dietary Preferences</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: DIETARY NEEDS (OPTIONAL) */}
      {step === 4 && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-red-100 text-[#C8102E] font-bold text-sm flex items-center justify-center shrink-0">
                  4
                </span>
                Any dietary needs or preferences?
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Select any restrictions that apply. (Multiple allowed)
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-stone-100 text-neutral-600 text-xs font-bold uppercase tracking-wider border border-stone-200">
              Optional
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: 'none', label: 'No specific restrictions' },
              { id: 'vegetarian', label: 'Vegetarian' },
              { id: 'vegan', label: 'Vegan' },
              { id: 'gluten-free', label: 'Gluten-free' },
              { id: 'dairy-free', label: 'Dairy-free' }
            ].map((opt) => {
              const isSelected = dietary.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleDietary(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C8102E] bg-red-50 text-neutral-900 font-bold shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                  }`}
                >
                  <span className="font-bold text-sm text-neutral-900">{opt.label}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C8102E]" />}
                </button>
              );
            })}
          </div>

          {/* Safety Disclaimer Note */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Label Notice:</strong> Ingredient needs vary by person and product. Always check individual food labels if you have an allergy, intolerance, or medical dietary requirement.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(5)}
              className="px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs"
            >
              <span>Next: What Matters Most</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: WHAT MATTERS MOST? */}
      {step === 5 && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-neutral-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-red-100 text-[#C8102E] font-bold text-sm flex items-center justify-center shrink-0">
                5
              </span>
              What matters most right now?
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Select your top priorities for this meal or snack. (Multiple allowed)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: 'nopref', label: 'No specific preference', icon: '✨' },
              { id: 'cheap', label: '💲 Keep it cheap', icon: '💲' },
              { id: 'fast', label: '⚡ Make it fast', icon: '⚡' },
              { id: 'portable', label: '🎒 Make it portable', icon: '🎒' },
              { id: 'minimal-cooking', label: '🍳 Minimal cooking', icon: '🍳' },
              { id: 'minimal-cleanup', label: '🧹 Minimal cleanup', icon: '🧹' },
              { id: 'simple', label: '😌 Familiar / simple foods', icon: '😌' }
            ].map((opt) => {
              const isSelected = priorities.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => togglePriority(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C8102E] bg-red-50 text-neutral-900 font-bold shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-white'
                  }`}
                >
                  <span className="font-bold text-sm text-neutral-900">{opt.label}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C8102E]" />}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <button
              onClick={() => setStep(4)}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={() => {
                setResultOffset(0);
                setStep(6);
              }}
              className="px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>View Fuel Ideas</span>
            </button>
          </div>
        </div>
      )}

      {/* RESULTS STEP (STEP 6) */}
      {step === 6 && (
        <div className="space-y-6">
          {/* Summary Chips Header */}
          <div className="bg-stone-100 border border-neutral-300 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#C8102E] uppercase tracking-wider block mb-1">
                Selected Filters
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {need && (
                  <span className="px-2.5 py-1 rounded-full bg-white border border-neutral-300 font-bold text-neutral-800">
                    Need: {need.toUpperCase()}
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full bg-white border border-neutral-300 font-bold text-neutral-800">
                  Access: {access}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white border border-neutral-300 font-bold text-neutral-800">
                  Timing: {timing}
                </span>
                {!dietary.includes('none') && (
                  <span className="px-2.5 py-1 rounded-full bg-white border border-neutral-300 font-bold text-neutral-800">
                    Dietary: {dietary.join(', ')}
                  </span>
                )}
                {!priorities.includes('nopref') && (
                  <span className="px-2.5 py-1 rounded-full bg-white border border-neutral-300 font-bold text-neutral-800">
                    Priorities: {priorities.join(', ')}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-wider border border-neutral-300 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Change Filters</span>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black italic uppercase tracking-tight text-neutral-900">
              YOUR FUEL IDEAS
            </h2>
            <span className="text-xs text-neutral-500 font-semibold">
              Showing matching options ({displayedIdeas.length} of {matchingIdeas.length} total)
            </span>
          </div>

          {/* Cards list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedIdeas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between hover:border-[#C8102E] transition-all shadow-xs border-t-4 border-t-[#C8102E]"
              >
                <div>
                  {/* Name & Time */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-extrabold text-lg text-neutral-900 leading-snug">
                      {idea.name}
                    </h3>
                    <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 text-[11px] font-bold border border-stone-200 shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C8102E]" />
                      {idea.prepTime}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 rounded bg-red-50 text-[#C8102E] text-[10px] font-extrabold border border-red-200">
                      {idea.equipment}
                    </span>
                    {idea.dietaryTags.map((dt) => (
                      <span
                        key={dt}
                        className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 uppercase"
                      >
                        {dt}
                      </span>
                    ))}
                  </div>

                  {/* Ingredients */}
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
                      You'll Need:
                    </span>
                    <ul className="text-xs text-neutral-800 space-y-1">
                      {idea.ingredients.map((ing, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] shrink-0 mt-1.5" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How to prepare */}
                  <div className="mb-4 pt-3 border-t border-neutral-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
                      How to Prepare:
                    </span>
                    <ol className="text-xs text-neutral-800 space-y-2">
                      {idea.steps.map((stepStr, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2">
                          <span className="font-bold text-[#C8102E] text-xs shrink-0">
                            {sIdx + 1}.
                          </span>
                          <span className="leading-relaxed">{stepStr}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div>
                  {/* Easy Swap */}
                  {idea.easySwap && (
                    <div className="mt-2 pt-2.5 border-t border-neutral-200 text-xs text-neutral-700 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/80">
                      <strong className="text-amber-900 block mb-0.5">Easy Swap:</strong>
                      <span className="text-amber-950">{idea.easySwap}</span>
                    </div>
                  )}

                  {/* Attribution if present */}
                  {idea.sourceAttribution && (
                    <p className="text-[10px] text-neutral-400 italic mt-2 text-right">
                      {idea.sourceAttribution}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleShowMore}
              className="px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-neutral-900 font-bold text-xs uppercase tracking-wider border border-stone-300 transition-colors flex items-center gap-2"
            >
              <Shuffle className="w-4 h-4 text-[#C8102E]" />
              <span>Show Me More Ideas</span>
            </button>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleExportPdf}
                className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4 text-red-400" />
                <span>Save as PDF</span>
              </button>

              <button
                onClick={handleReset}
                className="px-5 py-3 rounded-xl bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start Over</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
