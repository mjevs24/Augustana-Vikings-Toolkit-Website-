import React, { useState } from 'react';
import {
  Sparkles,
  Brain,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Save,
  Shield,
  FileText,
  FileDown
} from 'lucide-react';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

export const StressCopingReflectionTool: React.FC = () => {
  // 1. What happened today
  const [situation, setSituation] = useState<string>('');

  // 2. Stress Slider (0-10)
  const [stressLevel, setStressLevel] = useState<number>(5);

  // 3. Thoughts
  const [thoughts, setThoughts] = useState<string>('');

  // 4. Stressors Checkboxes
  const [stressors, setStressors] = useState<string[]>([]);

  const stressorOptions = [
    'Academic workload',
    'Exam',
    'Assignment deadline',
    'Varsity practice',
    'Competition',
    'Travel',
    'Injury',
    'Sleep',
    'Relationships',
    'Finances',
    'Other',
  ];

  const toggleStressor = (item: string) => {
    setStressors((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // 5. Coping Strategies Checkboxes
  const [copingStrategies, setCopingStrategies] = useState<string[]>([]);

  const copingOptions = [
    'Box breathing',
    'Walk',
    'Talked with teammate',
    'Counselling',
    'Music',
    'Sleep',
    'Stretching',
    'Journaling',
    'Took a break',
    'Asked professor for help',
  ];

  const toggleCoping = (item: string) => {
    setCopingStrategies((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // 6. Reflection Questions
  const [reflectionHelped, setReflectionHelped] = useState<string>('');
  const [reflectionTomorrow, setReflectionTomorrow] = useState<string>('');
  const [reflectionHandledWell, setReflectionHandledWell] = useState<string>('');

  // 7. Personal Action Plan
  const [actionPlan, setActionPlan] = useState<string>('');

  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [notification, setNotification] = useState<{ type: 'save' | 'clear' | 'pdf'; message: string } | null>(null);

  const handleConfirmReset = () => {
    setSituation('');
    setStressLevel(5);
    setThoughts('');
    setStressors([]);
    setCopingStrategies([]);
    setReflectionHelped('');
    setReflectionTomorrow('');
    setReflectionHandledWell('');
    setActionPlan('');

    setShowResetConfirmation(false);

    setNotification({
      type: 'clear',
      message: 'Worksheet reset. Responses cleared for this session.'
    });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleSaveAsPdf = async () => {
    const todayIso = new Date().toISOString().split('T')[0];
    setNotification({
      type: 'pdf',
      message: 'Generating your Augustana branded PDF...'
    });

    try {
      await downloadWorksheetPdf({
        title: 'Student-Athlete Stress & Coping Reflection Log',
        subtitle: 'Student-Athlete Well-Being Toolkit • CBT Reflection Log',
        dateStr: currentDate,
        filename: `Augustana_Stress_Coping_Reflection_${todayIso}.pdf`,
        sections: [
          { label: '1. What happened today?', value: situation, highlight: 'gray' },
          { label: `2. Stress Level (${stressLevel}/10 - ${badge.label})`, value: `Self-rated stress level: ${stressLevel} out of 10.`, highlight: stressLevel >= 8 ? 'red' : 'gray' },
          { label: '3. Automatic Thoughts / Self-Talk', value: thoughts, highlight: 'red' },
          { label: '4. Contributing Stressors', value: stressors.length > 0 ? stressors.join(', ') : 'None selected', highlight: 'gray' },
          { label: '5. Coping Strategies Used', value: copingStrategies.length > 0 ? copingStrategies.join(', ') : 'None selected', highlight: 'emerald' },
          { label: '6a. What helped today?', value: reflectionHelped, highlight: 'emerald' },
          { label: '6b. What will I do differently tomorrow?', value: reflectionTomorrow, highlight: 'gray' },
          { label: '6c. One thing handled well', value: reflectionHandledWell, highlight: 'emerald' },
          { label: '7. Personal Action Plan', value: actionPlan, highlight: 'red' }
        ],
        coachNote: getAthleteInsight()
      });

      setNotification({
        type: 'save',
        message: `Downloaded PDF: Augustana_Stress_Coping_Reflection_${todayIso}.pdf`
      });
      setTimeout(() => setNotification(null), 4000);
    } catch (error) {
      console.error('PDF export failed:', error);
      setNotification({
        type: 'clear',
        message: 'Unable to generate PDF. Please try again.'
      });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  // Dynamic Athlete Insight
  const getAthleteInsight = () => {
    if (copingStrategies.length === 0) {
      return "Today presented real demands. Taking a moment to identify your stressors is the first step — consider choosing 1 or 2 small coping actions (like box breathing or a 10-minute walk) to reset your nervous system.";
    }

    if (stressLevel >= 8) {
      return `High pressure days test every student-athlete. You logged ${stressors.length} key stressors today, but by using ${copingStrategies.join(', ')}, you actively managed your response. Protect your sleep tonight and connect with SAS or Augustana Counselling if needed.`;
    }

    return "Today was demanding, but you identified what contributed to your stress and chose healthy coping strategies. Small adjustments made consistently build resilience for both sport and academics.";
  };

  const getStressBadge = (level: number) => {
    if (level <= 3) {
      return { label: 'Low / Manageable', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
    if (level <= 6) {
      return { label: 'Moderate Stress', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
    }
    if (level <= 8) {
      return { label: 'High Stress', bg: 'bg-orange-100 text-orange-800 border-orange-300' };
    }
    return { label: 'Extreme / Severe', bg: 'bg-red-100 text-[#C8102E] border-red-300 font-bold' };
  };

  const badge = getStressBadge(stressLevel);
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6 text-neutral-900 font-sans relative">
      {/* Reset Confirmation Dialog */}
      {showResetConfirmation && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-neutral-900">Reset this worksheet?</h3>
            <p className="text-sm text-neutral-600 font-medium">
              This will clear your responses for this session.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirmation(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-neutral-700 font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Reset Worksheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. HEADER & ACTION BAR */}
      <div className="bg-white rounded-3xl border border-gray-300 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="border-b border-gray-200 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C8102E] text-white text-[11px] font-black uppercase tracking-widest mb-3">
            <Brain className="w-3.5 h-3.5 text-white" />
            AUGUSTANA VIKINGS WELL-BEING TOOLKIT
          </div>

          <h1 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tight text-neutral-900 font-athletic">
            STUDENT-ATHLETE STRESS & COPING REFLECTION LOG
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 font-medium mt-2 leading-relaxed max-w-3xl">
            A CBT-inspired reflection tool designed specifically for Augustana Vikings student-athletes to process daily pressures, identify triggers, track coping habits, and protect mental well-being across high-demand university athletic seasons.
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Privacy Note: Responses exist only during your active session. Save as PDF to download a personal copy.</span>
          </div>
        </div>

        {/* 2 PRIMARY ACTIONS */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSaveAsPdf}
            className="px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-white" />
            <span>Save as PDF</span>
          </button>

          <button
            onClick={() => setShowResetConfirmation(true)}
            className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-neutral-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-600" />
            <span>Reset</span>
          </button>
        </div>

        {notification && (
          <div
            className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 border ${
              notification.type === 'save'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : notification.type === 'pdf'
                ? 'bg-blue-50 border-blue-300 text-blue-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notification.message}</span>
          </div>
        )}
      </div>

      {/* 2. INTERACTIVE WORKSPACE */}
      <div id="stress-reflection-workspace" className="space-y-6 bg-[#F5F5F3] p-4 sm:p-6 rounded-3xl border border-gray-300">
        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C8102E]" />
            Active Reflection Log • {currentDate}
          </h3>
          <span className="text-xs font-bold text-neutral-500 uppercase">CBT Reflection Workspace</span>
        </div>

        {/* Grid Layout for Reflection Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Section 1: What Happened Today */}
          <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="w-6 h-6 rounded bg-red-50 text-[#C8102E] font-bold text-xs flex items-center justify-center border border-red-200">1</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                What happened today?
              </h3>
            </div>
            <p className="text-xs text-neutral-500 font-medium">
              Describe the stressful situation. (e.g. Missed a shot, failed a quiz, difficult practice, travel fatigue)
            </p>
            <textarea
              rows={3}
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="e.g., Missed a shot, failed a quiz, difficult practice, travel fatigue..."
              className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>

          {/* Section 2: Stress Slider */}
          <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-red-50 text-[#C8102E] font-bold text-xs flex items-center justify-center border border-red-200">2</span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    How stressed do you feel?
                  </h3>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${badge.bg}`}>
                  {stressLevel} / 10 • {badge.label}
                </span>
              </div>

              <p className="text-xs text-neutral-500 font-medium mb-4">
                Slide to rate your overall stress level right now (0 = Completely calm, 10 = Severe stress).
              </p>

              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={stressLevel}
                onChange={(e) => setStressLevel(Number(e.target.value))}
                className="w-full accent-[#C8102E] cursor-pointer h-2 bg-gray-200 rounded-lg"
              />

              <div className="flex justify-between text-[10px] font-bold text-neutral-500 mt-2">
                <span>0 (Calm)</span>
                <span>5 (Moderate)</span>
                <span>10 (Severe)</span>
              </div>
            </div>

            <div className="p-2.5 bg-[#F5F5F3] rounded-xl border border-gray-200 text-xs text-neutral-700 font-medium">
              {stressLevel >= 8 ? (
                <span className="text-[#C8102E] font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  High stress alert! Consider taking 5 minutes for box breathing or contacting Augustana Counselling.
                </span>
              ) : stressLevel >= 5 ? (
                <span className="text-amber-800 font-semibold">
                  Moderate stress. A brief walk, hydration, or talking with a teammate can help lower your pulse.
                </span>
              ) : (
                <span className="text-emerald-800 font-semibold">
                  Your stress is in a manageable range. Great job maintaining equilibrium!
                </span>
              )}
            </div>
          </div>

          {/* Section 3: Thoughts */}
          <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="w-6 h-6 rounded bg-red-50 text-[#C8102E] font-bold text-xs flex items-center justify-center border border-red-200">3</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                What thoughts went through your mind?
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-medium text-neutral-600 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
              <span className="font-bold text-neutral-800">Prompt Examples:</span>
              <button
                type="button"
                onClick={() => setThoughts((t) => t + (t ? ' ' : '') + '"I\'m falling behind."')}
                className="px-2 py-0.5 bg-white border border-gray-300 rounded hover:bg-red-50 hover:text-[#C8102E] transition-colors"
              >
                "I'm falling behind."
              </button>
              <button
                type="button"
                onClick={() => setThoughts((t) => t + (t ? ' ' : '') + '"I\'m going to fail."')}
                className="px-2 py-0.5 bg-white border border-gray-300 rounded hover:bg-red-50 hover:text-[#C8102E] transition-colors"
              >
                "I'm going to fail."
              </button>
              <button
                type="button"
                onClick={() => setThoughts((t) => t + (t ? ' ' : '') + '"Coach is disappointed."')}
                className="px-2 py-0.5 bg-white border border-gray-300 rounded hover:bg-red-50 hover:text-[#C8102E] transition-colors"
              >
                "Coach is disappointed."
              </button>
            </div>
            <textarea
              rows={3}
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              placeholder="Write down the automatic thoughts or self-talk you experienced..."
              className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>

          {/* Section 4: Stressors Checkboxes */}
          <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="w-6 h-6 rounded bg-red-50 text-[#C8102E] font-bold text-xs flex items-center justify-center border border-red-200">4</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Which stressors contributed today?
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {stressorOptions.map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    stressors.includes(opt)
                      ? 'bg-red-50 border-[#C8102E] text-[#C8102E]'
                      : 'bg-[#F5F5F3] border-gray-200 text-neutral-800 hover:bg-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={stressors.includes(opt)}
                    onChange={() => toggleStressor(opt)}
                    className="w-4 h-4 text-[#C8102E] rounded border-gray-300 focus:ring-[#C8102E]"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 5: Coping Strategies Checkboxes */}
          <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="w-6 h-6 rounded bg-red-50 text-[#C8102E] font-bold text-xs flex items-center justify-center border border-red-200">5</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Which coping strategies did you use?
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {copingOptions.map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    copingStrategies.includes(opt)
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                      : 'bg-[#F5F5F3] border-gray-200 text-neutral-800 hover:bg-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={copingStrategies.includes(opt)}
                    onChange={() => toggleCoping(opt)}
                    className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 6: Reflection Questions */}
          <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="w-6 h-6 rounded bg-red-50 text-[#C8102E] font-bold text-xs flex items-center justify-center border border-red-200">6</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Daily Reflection Questions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-900 mb-1">
                  What helped today?
                </label>
                <textarea
                  rows={3}
                  value={reflectionHelped}
                  onChange={(e) => setReflectionHelped(e.target.value)}
                  placeholder="What action, mindset, or support helped relieve pressure?"
                  className="w-full p-2.5 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-900 mb-1">
                  What will I do differently tomorrow?
                </label>
                <textarea
                  rows={3}
                  value={reflectionTomorrow}
                  onChange={(e) => setReflectionTomorrow(e.target.value)}
                  placeholder="One small adjustment to improve focus or recovery..."
                  className="w-full p-2.5 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-900 mb-1">
                  One thing I handled well today.
                </label>
                <textarea
                  rows={3}
                  value={reflectionHandledWell}
                  onChange={(e) => setReflectionHandledWell(e.target.value)}
                  placeholder="Acknowledge a win, resilience moment, or positive step..."
                  className="w-full p-2.5 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                />
              </div>
            </div>
          </div>

          {/* Section 7: Personal Action Plan */}
          <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="w-6 h-6 rounded bg-red-50 text-[#C8102E] font-bold text-xs flex items-center justify-center border border-red-200">7</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Personal Action Plan
              </h3>
            </div>
            <textarea
              rows={3}
              value={actionPlan}
              onChange={(e) => setActionPlan(e.target.value)}
              placeholder="Write down 1 to 3 specific, controllable steps you will take to protect your well-being..."
              className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>

          {/* Section 8: Athlete Insight */}
          <div className="bg-gradient-to-r from-red-950 via-zinc-900 to-black text-white p-6 rounded-2xl border border-gray-300 shadow-md md:col-span-2 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-300">
              <Sparkles className="w-4 h-4 text-red-400" />
              Coach's Perspective & Athlete Insight
            </div>
            <p className="text-sm font-medium leading-relaxed italic text-gray-100">
              "{getAthleteInsight()}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
