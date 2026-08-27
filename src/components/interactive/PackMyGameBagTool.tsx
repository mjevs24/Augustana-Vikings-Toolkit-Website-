import React, { useState } from 'react';
import {
  ShoppingBag,
  Check,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Download,
  RotateCcw,
  AlertCircle,
  Clock,
  Utensils,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  Car,
  Moon,
  Trophy,
  Activity,
  Flame,
  Coffee,
  PackageCheck
} from 'lucide-react';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

type EventType =
  | 'Practice'
  | 'Home game'
  | 'Away game / day trip'
  | 'Overnight trip'
  | 'Tournament / multi-day competition';

type Duration =
  | 'A few hours'
  | 'Most of the day'
  | 'Overnight'
  | 'Multiple days';

type FoodAccess =
  | 'Fridge'
  | 'Cooler'
  | 'Microwave'
  | 'Grocery or convenience-store stop'
  | 'Restaurant / cafeteria'
  | 'Not sure / very limited access';

type Preference =
  | 'No preference'
  | 'Vegetarian'
  | 'Vegan'
  | 'Dairy-free options'
  | 'Gluten-free options';

interface ChecklistItem {
  id: string;
  section: string;
  title: string;
  visibleExamples?: string;
  isCustom?: boolean;
  checked: boolean;
  ideas?: string[];
}

export const PackMyGameBagTool: React.FC = () => {
  // Wizard state
  const [step, setStep] = useState<number>(1);

  // Form Selections
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [duration, setDuration] = useState<Duration | null>(null);
  const [access, setAccess] = useState<FoodAccess[]>([]);
  const [preferences, setPreferences] = useState<Preference[]>(['No preference']);

  // Checklist state
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [customItemText, setCustomItemText] = useState<string>('');
  const [customItemSection, setCustomItemSection] = useState<string>('FOR THE ROAD / BETWEEN EVENTS');
  
  // Accordion state for ideas dropdowns
  const [expandedIdeas, setExpandedIdeas] = useState<Record<string, boolean>>({});

  // Toggle access multi-select
  const toggleAccess = (option: FoodAccess) => {
    if (option === 'Not sure / very limited access') {
      setAccess(['Not sure / very limited access']);
      return;
    }
    const filtered = access.filter((a) => a !== 'Not sure / very limited access');
    if (filtered.includes(option)) {
      const next = filtered.filter((a) => a !== option);
      setAccess(next);
    } else {
      setAccess([...filtered, option]);
    }
  };

  // Toggle preferences multi-select
  const togglePreference = (pref: Preference) => {
    if (pref === 'No preference') {
      setPreferences(['No preference']);
      return;
    }
    const filtered = preferences.filter((p) => p !== 'No preference');
    if (filtered.includes(pref)) {
      const next = filtered.filter((p) => p !== pref);
      setPreferences(next.length === 0 ? ['No preference'] : next);
    } else {
      setPreferences([...filtered, pref]);
    }
  };

  const isVegetarian = preferences.includes('Vegetarian') || preferences.includes('Vegan');
  const isVegan = preferences.includes('Vegan');
  const isDairyFree = preferences.includes('Dairy-free options') || preferences.includes('Vegan');
  const isGlutenFree = preferences.includes('Gluten-free options');

  // Filter food ideas based on preferences and access
  const filterIdeas = (rawIdeas: { text: string; isMeat?: boolean; isDairy?: boolean; isGluten?: boolean; requiresFridge?: boolean; requiresMicrowave?: boolean }[]) => {
    const hasFridge = access.includes('Fridge') || access.includes('Cooler');
    const hasMicro = access.includes('Microwave');

    return rawIdeas
      .filter((idea) => {
        if (isVegetarian && idea.isMeat) return false;
        if (isVegan && (idea.isMeat || idea.isDairy)) return false;
        if (isDairyFree && idea.isDairy) return false;
        if (isGlutenFree && idea.isGluten) return false;
        if (idea.requiresFridge && !hasFridge) return false;
        if (idea.requiresMicrowave && !hasMicro) return false;
        return true;
      })
      .map((idea) => idea.text);
  };

  // Generate checklist on "BUILD MY BAG"
  const handleBuildBag = () => {
    if (!eventType || !duration) return;

    const generated: ChecklistItem[] = [];

    // Helper to add checklist items
    const addItem = (
      id: string,
      section: string,
      title: string,
      visibleExamples?: string,
      rawIdeas?: { text: string; isMeat?: boolean; isDairy?: boolean; isGluten?: boolean; requiresFridge?: boolean; requiresMicrowave?: boolean }[]
    ) => {
      let filtered: string[] | undefined = undefined;
      if (rawIdeas) {
        filtered = filterIdeas(rawIdeas);
      }
      generated.push({
        id,
        section,
        title,
        visibleExamples,
        checked: false,
        ideas: filtered && filtered.length > 0 ? filtered : undefined,
      });
    };

    // SECTION: BEFORE YOU LEAVE
    addItem(
      'byl-water',
      'BEFORE YOU LEAVE',
      'Filled reusable water bottle / electrolyte bottle',
      'water, electrolyte drink, refillable shaker'
    );

    addItem(
      'byl-snack',
      'BEFORE YOU LEAVE',
      'Familiar pre-practice or pre-game snack',
      'banana, granola bar, applesauce pouch, bagel, dry cereal',
      [
        { text: 'Rice cakes with honey or jam', isGluten: false },
        { text: 'Pretzels or graham crackers', isGluten: true },
        { text: 'Toast or bagel with jam', isGluten: true, isDairy: false },
        { text: 'Fruit leather or dried mango slices', isGluten: false },
        { text: 'Oat bar or fig bar', isGluten: true },
      ]
    );

    if (eventType === 'Away game / day trip' || eventType === 'Overnight trip' || eventType === 'Tournament / multi-day competition' || duration === 'Most of the day' || duration === 'Overnight' || duration === 'Multiple days') {
      addItem(
        'byl-meal',
        'BEFORE YOU LEAVE',
        'Food for the trip if you’ll be away over a usual mealtime',
        'sandwich or wrap, bagel + peanut butter, yogurt + fruit, leftovers in a travel container',
        [
          { text: 'Turkey or hummus & veggie wrap', isGluten: true },
          { text: 'PB & jelly on whole grain bagel', isGluten: true },
          { text: 'Cold pasta salad in a reusable container', isGluten: true },
          { text: 'Cold quinoa or rice bowl with edamame', isGluten: false },
          { text: 'Greek yogurt + granola & berries (if cooler available)', isDairy: true, requiresFridge: true },
        ]
      );
    }

    // SECTION: FOR THE ROAD / BETWEEN EVENTS
    addItem(
      'road-carb',
      'FOR THE ROAD / BETWEEN EVENTS',
      'Easy energy snack for the road or between events',
      'banana, pretzels, granola bar, applesauce pouch, bagel',
      [
        { text: 'Dried fruit (raisins, mango, dates)', isGluten: false },
        { text: 'Rice cakes or corn thin cakes', isGluten: false },
        { text: 'Fruit leather or fig bars', isGluten: true },
        { text: 'Graham crackers or animal crackers', isGluten: true },
        { text: 'Dry cereal mix or oat bar', isGluten: true },
      ]
    );

    addItem(
      'road-protein',
      'FOR THE ROAD / BETWEEN EVENTS',
      'Protein-rich snack',
      'Greek yogurt, cheese + crackers, trail mix, roasted chickpeas, protein bar',
      [
        { text: 'Nut or seed butter squeeze packet', isGluten: false },
        { text: 'Edamame or roasted fava beans', isGluten: false },
        { text: 'Shelf-stable soy milk or ultra-filtered milk box', isDairy: true },
        { text: 'Tuna or salmon foil pouch + crackers', isMeat: true },
        { text: 'String cheese or Babybel (if cooler available)', isDairy: true, requiresFridge: true },
        { text: 'Hard-boiled eggs (if cooler available)', isMeat: false, requiresFridge: true },
      ]
    );

    addItem(
      'road-fruit',
      'FOR THE ROAD / BETWEEN EVENTS',
      'Fruit or another easy grab-and-go option',
      'apple, banana, clementines, grapes, berries',
      [
        { text: 'Unsweetened applesauce pouch' },
        { text: 'Dried mango slices or raisins' },
        { text: 'Freeze-dried berries or bananas' },
        { text: 'Fruit cup packed in 100% juice' },
      ]
    );

    addItem(
      'road-backup',
      'FOR THE ROAD / BETWEEN EVENTS',
      'Extra snack in case the day runs longer than planned',
      'granola/protein bar, trail mix, crackers, dried fruit',
      [
        { text: 'Nut butter + cracker pack', isGluten: true },
        { text: 'Beef or turkey jerky / vegan mushroom jerky', isMeat: true },
        { text: 'Mixed nuts & seed trail mix', isGluten: false },
        { text: 'Shelf-stable protein shake', isDairy: true },
      ]
    );

    // SECTION: FOR AFTER PRACTICE OR COMPETITION
    addItem(
      'after-recovery',
      'FOR AFTER PRACTICE OR COMPETITION',
      'Recovery snack or post-event fuel option',
      'chocolate milk, sandwich/wrap, Greek yogurt + granola, protein bar',
      [
        { text: 'Chocolate soy milk or ultra-filtered milk + banana', isDairy: true },
        { text: 'Microwave rice bowl with beans or tuna', requiresMicrowave: true },
        { text: 'Protein bar + fresh apple' },
        { text: 'Turkey & cheese or tofu wrap', isGluten: true },
        { text: 'Cottage cheese or yogurt with berries', isDairy: true, requiresFridge: true },
      ]
    );

    addItem(
      'after-water',
      'FOR AFTER PRACTICE OR COMPETITION',
      'Water / refill for the trip home',
      'cold water, electrolyte refill'
    );

    if (eventType === 'Away game / day trip' || eventType === 'Overnight trip' || eventType === 'Tournament / multi-day competition') {
      addItem(
        'after-trip-home',
        'FOR AFTER PRACTICE OR COMPETITION',
        'Food for the trip home if a full meal will be delayed',
        'sandwich, chocolate milk, trail mix, fruit + protein bar',
        [
          { text: 'PB&J sandwich on high-protein bread', isGluten: true },
          { text: 'Pre-made pasta or grain salad in container', isGluten: true },
          { text: 'Nut butter packet + banana + oat bar' },
        ]
      );
    }

    // SECTION: OVERNIGHT / MULTI-DAY EXTRAS
    if (eventType === 'Overnight trip' || eventType === 'Tournament / multi-day competition' || duration === 'Overnight' || duration === 'Multiple days') {
      addItem(
        'extra-snacks',
        'OVERNIGHT / MULTI-DAY EXTRAS',
        'Extra snacks for hotel room or bus downtime',
        'pretzels, popcorn, trail mix, fruit, granola bars',
        [
          { text: 'Rice cakes or whole grain crackers', isGluten: false },
          { text: 'Nut butter jars / squeeze packs' },
          { text: 'Whole fruit (apples, oranges) that keep at room temperature' },
        ]
      );

      addItem(
        'extra-breakfast',
        'OVERNIGHT / MULTI-DAY EXTRAS',
        'Simple breakfast option',
        'instant oatmeal + PB, bagel + spread, cereal + milk, yogurt + granola',
        [
          { text: 'Instant oatmeal packets (just add hot water)', requiresMicrowave: true },
          { text: 'Bagels with peanut butter or cream cheese', isGluten: true },
          { text: 'Single-serve cereal cup with shelf-stable milk' },
          { text: 'Yogurt + granola cup (if hotel mini-fridge available)', requiresFridge: true },
        ]
      );

      addItem(
        'extra-utensils',
        'OVERNIGHT / MULTI-DAY EXTRAS',
        'Reusable utensils, napkins, or wet wipes',
        'fork, spoon, napkins, ziplock bags'
      );

      addItem(
        'extra-containers',
        'OVERNIGHT / MULTI-DAY EXTRAS',
        'Food-storage containers or ziplock bags',
        'tupperware, sandwich bags, ice pack'
      );

      if (access.includes('Cooler') || access.includes('Not sure / very limited access')) {
        addItem(
          'extra-cooler',
          'OVERNIGHT / MULTI-DAY EXTRAS',
          'Cooler / insulated bag + ice packs if carrying perishable food',
          'small insulated cooler bag, reusable ice packs'
        );
      }
    }

    setItems(generated);
    setStep(2);
  };

  // Toggle item check
  const toggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // Delete item
  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Add custom item
  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemText.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      section: customItemSection,
      title: customItemText.trim(),
      isCustom: true,
      checked: false,
    };

    setItems((prev) => [...prev, newItem]);
    setCustomItemText('');
  };

  // Toggle idea dropdown
  const toggleIdeaDropdown = (id: string) => {
    setExpandedIdeas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // PDF Export
  const handleExportPdf = () => {
    const sections: { heading: string; items: string[] }[] = [];

    const grouped: Record<string, ChecklistItem[]> = {};
    items.forEach((item) => {
      if (!grouped[item.section]) grouped[item.section] = [];
      grouped[item.section].push(item);
    });

    Object.entries(grouped).forEach(([secTitle, secItems]) => {
      sections.push({
        heading: secTitle,
        items: secItems.map(
          (it) =>
            `[${it.checked ? 'X' : ' '}] ${it.title}${
              it.visibleExamples ? ` (e.g. ${it.visibleExamples})` : ''
            }${it.isCustom ? ' (Custom Item)' : ''}`
        ),
      });
    });

    const accessStr = access.length > 0 ? access.join(', ') : 'Not specified';
    const prefStr = preferences.join(', ');

    downloadWorksheetPdf(
      {
        title: 'PACK MY GAME BAG — CHECKLIST',
        subtitle: `Event: ${eventType || 'N/A'} | Duration: ${duration || 'N/A'} | Access: ${accessStr} | Preferences: ${prefStr}`,
        filename: 'Pack_My_Game_Bag_Checklist.pdf',
        sections: sections.map((s) => ({
          heading: s.heading,
          items: s.items,
        })),
        footerNote:
          'Generated via Augustana Vikings Student-Athlete Well-Being Toolkit. Food options are suggestions only.',
      },
      'Pack_My_Game_Bag_Checklist.pdf'
    );
  };

  // Reset tool
  const handleReset = () => {
    setStep(1);
    setEventType(null);
    setDuration(null);
    setAccess([]);
    setPreferences(['No preference']);
    setItems([]);
    setCustomItemText('');
    setExpandedIdeas({});
  };

  // Group items by section for rendering
  const sectionsList = [
    'BEFORE YOU LEAVE',
    'FOR THE ROAD / BETWEEN EVENTS',
    'FOR AFTER PRACTICE OR COMPETITION',
    'OVERNIGHT / MULTI-DAY EXTRAS',
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* TOOL HEADER */}
      <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-3xl border-t-4 border-t-[#C8102E] shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
          <ShoppingBag className="w-4 h-4 text-[#C8102E]" />
          <span>PERFORMANCE NUTRITION CHECKLIST BUILDER</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          PACK MY GAME BAG
        </h2>
        <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
          Build a personalized food and hydration checklist so you have practical options with you when practices, games, or travel make regular meals harder.
        </p>
      </div>

      {/* STEP 1: FORM WIZARD */}
      {step === 1 && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
          {/* STEP 1 QUESTION: EVENT TYPE */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C8102E] text-white text-xs font-bold">
                1
              </span>
              <h3 className="text-base font-extrabold text-neutral-900">
                What are you heading to?
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(
                [
                  'Practice',
                  'Home game',
                  'Away game / day trip',
                  'Overnight trip',
                  'Tournament / multi-day competition',
                ] as EventType[]
              ).map((type) => {
                const selected = eventType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEventType(type)}
                    className={`p-4 rounded-2xl border text-left transition-all text-xs font-bold flex items-center justify-between gap-2 ${
                      selected
                        ? 'border-[#C8102E] bg-red-50/80 text-[#C8102E] ring-1 ring-[#C8102E] shadow-2xs'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-neutral-800'
                    }`}
                  >
                    <span>{type}</span>
                    {selected && <CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2 QUESTION: DURATION */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C8102E] text-white text-xs font-bold">
                2
              </span>
              <h3 className="text-base font-extrabold text-neutral-900">
                How long will you be away?
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(
                [
                  'A few hours',
                  'Most of the day',
                  'Overnight',
                  'Multiple days',
                ] as Duration[]
              ).map((dur) => {
                const selected = duration === dur;
                return (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setDuration(dur)}
                    className={`p-3.5 rounded-2xl border text-center transition-all text-xs font-bold flex flex-col items-center justify-center gap-1.5 ${
                      selected
                        ? 'border-[#C8102E] bg-red-50/80 text-[#C8102E] ring-1 ring-[#C8102E] shadow-2xs'
                        : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-neutral-800'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>{dur}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3 QUESTION: FOOD ACCESS */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C8102E] text-white text-xs font-bold">
                3
              </span>
              <h3 className="text-base font-extrabold text-neutral-900">
                What will you have access to? <span className="text-stone-400 font-normal text-xs">(Select all that apply)</span>
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(
                [
                  'Fridge',
                  'Cooler',
                  'Microwave',
                  'Grocery or convenience-store stop',
                  'Restaurant / cafeteria',
                  'Not sure / very limited access',
                ] as FoodAccess[]
              ).map((acc) => {
                const selected = access.includes(acc);
                return (
                  <button
                    key={acc}
                    type="button"
                    onClick={() => toggleAccess(acc)}
                    className={`p-3 rounded-xl border text-left transition-all text-xs font-bold flex items-center justify-between gap-2 ${
                      selected
                        ? 'border-[#C8102E] bg-red-50/80 text-[#C8102E] ring-1 ring-[#C8102E]'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-neutral-700'
                    }`}
                  >
                    <span className="truncate">{acc}</span>
                    {selected && <CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4 QUESTION: OPTIONAL FOOD PREFERENCES */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-stone-200 text-stone-700 text-xs font-bold">
                4
              </span>
              <h3 className="text-base font-extrabold text-neutral-900">
                Any food preferences we should consider? <span className="text-stone-400 font-normal text-xs">(Optional)</span>
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  'No preference',
                  'Vegetarian',
                  'Vegan',
                  'Dairy-free options',
                  'Gluten-free options',
                ] as Preference[]
              ).map((pref) => {
                const selected = preferences.includes(pref);
                return (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => togglePreference(pref)}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selected
                        ? 'border-stone-800 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-neutral-700'
                    }`}
                  >
                    <span>{pref}</span>
                    {selected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>

            {/* DISCLAIMER */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 text-amber-900 text-[11px] leading-relaxed flex items-start gap-2.5 mt-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                These filters help narrow suggestions but do not guarantee that a food is free from allergens or cross-contact. Always check ingredient labels and follow your own medical or dietary requirements.
              </span>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 border-t border-stone-200 flex justify-end">
            <button
              type="button"
              disabled={!eventType || !duration}
              onClick={handleBuildBag}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
                eventType && duration
                  ? 'bg-[#C8102E] hover:bg-red-800 text-white cursor-pointer'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>BUILD MY BAG</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: GENERATED CHECKLIST */}
      {step === 2 && (
        <div className="space-y-6">
          {/* ACTION BAR AT TOP */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="text-xs font-bold text-neutral-700">
              <span className="text-[#C8102E] uppercase font-black">{eventType}</span> • {duration}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 sm:flex-none px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET</span>
              </button>

              <button
                type="button"
                onClick={handleExportPdf}
                className="flex-1 sm:flex-none px-5 py-2 bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>SAVE AS PDF</span>
              </button>
            </div>
          </div>

          {/* CHECKLIST SECTIONS */}
          <div className="space-y-6">
            {sectionsList.map((sectionTitle) => {
              const sectionItems = items.filter((it) => it.section === sectionTitle);
              if (sectionItems.length === 0) return null;

              return (
                <div
                  key={sectionTitle}
                  className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E]" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-neutral-800">
                      {sectionTitle}
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {sectionItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          item.checked
                            ? 'bg-stone-50 border-stone-200 opacity-60'
                            : 'bg-stone-50/50 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <label className="flex items-start gap-3 cursor-pointer select-none flex-1">
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => toggleCheck(item.id)}
                              className="mt-0.5 w-4 h-4 rounded text-[#C8102E] focus:ring-[#C8102E] border-stone-300 accent-[#C8102E] cursor-pointer"
                            />
                            <div className="space-y-0.5">
                              <span
                                className={`text-xs font-extrabold block leading-snug ${
                                  item.checked ? 'line-through text-stone-500' : 'text-neutral-900'
                                }`}
                              >
                                {item.title}
                                {item.isCustom && (
                                  <span className="ml-2 px-2 py-0.5 bg-red-100 text-[#C8102E] rounded-md text-[10px] font-bold uppercase">
                                    Custom
                                  </span>
                                )}
                              </span>
                              {item.visibleExamples && (
                                <p
                                  className={`text-[11px] font-medium leading-snug ${
                                    item.checked ? 'line-through text-stone-400' : 'text-stone-500'
                                  }`}
                                >
                                  <span className="font-bold text-stone-600">Examples:</span>{' '}
                                  {item.visibleExamples}
                                </p>
                              )}
                            </div>
                          </label>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {item.ideas && item.ideas.length > 0 && (
                              <button
                                type="button"
                                onClick={() => toggleIdeaDropdown(item.id)}
                                className="px-2.5 py-1 bg-stone-200/80 hover:bg-stone-300 text-stone-800 font-bold text-[10px] uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1"
                              >
                                <span>Give me ideas</span>
                                {expandedIdeas[item.id] ? (
                                  <ChevronUp className="w-3 h-3" />
                                ) : (
                                  <ChevronDown className="w-3 h-3" />
                                )}
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => deleteItem(item.id)}
                              title="Remove item"
                              className="p-1 text-stone-400 hover:text-red-600 transition-colors rounded-lg hover:bg-stone-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* EXPANDABLE IDEAS */}
                        {item.ideas && item.ideas.length > 0 && expandedIdeas[item.id] && (
                          <div className="mt-3 pt-2.5 border-t border-stone-200 bg-white p-3 rounded-xl space-y-1.5 text-xs text-stone-700">
                            <span className="font-bold text-[10px] uppercase tracking-wider text-stone-400 block mb-1">
                              Suggested Examples:
                            </span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {item.ideas.map((ideaText, idx) => (
                                <li key={idx} className="flex items-center gap-2 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-100 text-[11px] font-medium text-stone-800">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] shrink-0" />
                                  <span>{ideaText}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ADD CUSTOM ITEM FORM */}
          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-5 sm:p-6 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-800 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#C8102E]" />
              <span>Add A Custom Item To Your Checklist</span>
            </h4>

            <form onSubmit={handleAddCustomItem} className="flex flex-col sm:flex-row gap-2.5">
              <select
                value={customItemSection}
                onChange={(e) => setCustomItemSection(e.target.value)}
                className="px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs font-bold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
              >
                {sectionsList.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={customItemText}
                onChange={(e) => setCustomItemText(e.target.value)}
                placeholder="e.g. Extra pair of socks, electrolyte tablets..."
                className="flex-1 px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs font-bold text-neutral-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
              />

              <button
                type="submit"
                className="px-5 py-2.5 bg-stone-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </form>
          </div>

          {/* ACTION BAR AT BOTTOM */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>START OVER</span>
            </button>

            <button
              type="button"
              onClick={handleExportPdf}
              className="px-6 py-3 bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>SAVE CHECKLIST AS PDF</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
