import React, { useState } from 'react';
import {
  Zap,
  RotateCcw,
  FileDown,
  Sparkles,
  CheckCircle2,
  Wind,
  Target,
  Eye,
  Activity,
  Award
} from 'lucide-react';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

const GROUNDING_OPTIONS = [
  { id: 'box-breathing', label: 'Box Breathing', desc: 'Inhale 4s, Hold 4s, Exhale 4s, Hold 4s (Calms nervous system)' },
  { id: 'slow-exhale', label: 'Slow Exhale Breathing', desc: 'Inhale 4s, Exhale 8s (Lowers heart rate & anxiety)' },
  { id: 'five-senses', label: 'Five-Senses Grounding', desc: 'Notice 5 things you see, 4 feel, 3 hear, 2 smell, 1 taste' },
  { id: 'body-scan', label: 'Brief Body Scan', desc: 'Scan jaw, shoulders, and hands to release physical tension' },
  { id: 'custom', label: 'Custom Option', desc: 'Enter your own grounding or breathing technique' },
];

const CUE_PRESETS = [
  'One play at a time.',
  'Calm and ready.',
  'Trust my preparation.',
  'Focus on the next action.',
];

const SITUATION_EXAMPLES = [
  'Exam / Midterm',
  'Game / Competition',
  'Race / Meet',
  'Class Presentation',
  'Varsity Tryout',
  'High-Intensity Practice',
];

const VISUALIZATION_EXAMPLES = [
  'Answering the first exam question calmly and methodically',
  'Completing the first pass cleanly and accurately',
  'Settling into race pace with strong posture',
  'Beginning a presentation clearly with steady breath',
];

export const PrePerformanceResetTool: React.FC = () => {
  const [situation, setSituation] = useState('');
  const [groundingChoice, setGroundingChoice] = useState('box-breathing');
  const [customGrounding, setCustomGrounding] = useState('');
  const [cuePhrase, setCuePhrase] = useState('');
  const [confidenceStatement, setConfidenceStatement] = useState('');
  const [visualization, setVisualization] = useState('');
  const [firstControllable, setFirstControllable] = useState('');
  
  const [notification, setNotification] = useState<string | null>(null);

  const getActiveGroundingText = () => {
    if (groundingChoice === 'custom') {
      return customGrounding.trim() || 'Custom grounding technique';
    }
    const found = GROUNDING_OPTIONS.find((g) => g.id === groundingChoice);
    return found ? `${found.label} (${found.desc})` : 'Breathing / Grounding technique';
  };

  const handleReset = () => {
    setSituation('');
    setGroundingChoice('box-breathing');
    setCustomGrounding('');
    setCuePhrase('');
    setConfidenceStatement('');
    setVisualization('');
    setFirstControllable('');
    
    setNotification('Worksheet reset to default.');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSavePdf = async () => {
    const todayFormatted = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const todayIso = new Date().toISOString().split('T')[0];

    const groundingText = getActiveGroundingText();
    const finalCue = cuePhrase.trim() || 'Trust my preparation.';
    const finalConfidence = confidenceStatement.trim() || 'I have put in the work and am ready to execute.';
    const finalVis = visualization.trim() || 'Executing the first action calmly and confidently.';
    const finalFirstAction = firstControllable.trim() || 'Focusing on my immediate assignment.';
    const finalSituation = situation.trim() || 'Upcoming High-Pressure Event';

    const generatedSummary = 
      `1. Grounding: ${groundingText}\n` +
      `2. Cue Phrase: "${finalCue}"\n` +
      `3. Confidence Statement: "${finalConfidence}"\n` +
      `4. Visualization: ${finalVis}\n` +
      `5. First Action: ${finalFirstAction}`;

    await downloadWorksheetPdf({
      title: 'Pre-Performance Reset Builder',
      subtitle: 'Personalized 2–5 Minute Routine for High-Pressure Situations',
      dateStr: todayFormatted,
      filename: `Augustana_Pre_Performance_Reset_${todayIso}.pdf`,
      sections: [
        {
          heading: 'Upcoming Situation',
          content: finalSituation,
          highlight: 'gray',
        },
        {
          heading: 'Breathing or Grounding Technique',
          content: groundingText,
          highlight: 'gray',
        },
        {
          heading: 'Cue Phrase',
          content: `"${finalCue}"`,
          highlight: 'red',
        },
        {
          heading: 'Confidence Statement',
          content: `"${finalConfidence}"`,
          highlight: 'gray',
        },
        {
          heading: 'Visualization',
          content: finalVis,
          highlight: 'gray',
        },
        {
          heading: 'First Controllable Action',
          content: finalFirstAction,
          highlight: 'emerald',
        },
        {
          heading: 'Generated Routine Summary',
          content: generatedSummary,
          highlight: 'emerald',
        },
      ],
      coachHeading: 'Planning Reminder',
      coachNote:
        'The goal of a pre-performance routine is not to eliminate nerves, but to direct your focus toward controllable actions. Use this 2-5 minute reset consistently before high-stakes moments.',
      footerNote:
        'Augustana Vikings Student-Athlete Well-Being Toolkit — Pre-Performance Reset Routine',
    });

    setNotification('PDF generated successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-stone-900 text-white rounded-2xl p-6 sm:p-8 border-l-4 border-l-[#C8102E] shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4 text-[#C8102E]" /> Interactive Mental Performance Tool
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            Pre-Performance Reset Builder
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 max-w-3xl leading-relaxed">
            Build a personalized 2–5 minute routine for games, exams, presentations, tryouts, and other high-pressure situations. A consistent reset routine helps reduce mental clutter and directs your focus toward controllable actions.
          </p>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Form Fields */}
      <div className="space-y-6">
        {/* 1. Upcoming Situation */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#C8102E] font-bold text-sm uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>1. Upcoming Situation</span>
          </div>
          <label className="block text-base font-bold text-neutral-900">
            What are you preparing for?
          </label>
          <p className="text-xs text-neutral-500">
            Select an example below or type your specific situation (e.g., midterm exam, game, race, presentation, tryout, difficult practice).
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {SITUATION_EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setSituation(ex)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  situation === ex
                    ? 'bg-[#C8102E] text-white border-[#C8102E]'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                + {ex}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="e.g., CHEM 101 Midterm, Championship Game vs. Concordia..."
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#C8102E] focus:ring-2 focus:ring-red-100 outline-none text-sm text-neutral-900"
          />
        </div>

        {/* 2. Breathing or Grounding Choice */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#C8102E] font-bold text-sm uppercase tracking-wider">
            <Wind className="w-4 h-4" />
            <span>2. Breathing or Grounding Choice</span>
          </div>
          <label className="block text-base font-bold text-neutral-900">
            Select your preferred 1-2 minute calming technique
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {GROUNDING_OPTIONS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGroundingChoice(g.id)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  groundingChoice === g.id
                    ? 'bg-red-50/50 border-[#C8102E] text-neutral-900 ring-2 ring-red-100'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <div className="font-bold text-sm text-neutral-900 flex items-center justify-between mb-1">
                  <span>{g.label}</span>
                  {groundingChoice === g.id && (
                    <CheckCircle2 className="w-4 h-4 text-[#C8102E]" />
                  )}
                </div>
                <p className="text-xs text-neutral-600">{g.desc}</p>
              </button>
            ))}
          </div>
          {groundingChoice === 'custom' && (
            <input
              type="text"
              value={customGrounding}
              onChange={(e) => setCustomGrounding(e.target.value)}
              placeholder="Describe your custom breathing or grounding technique..."
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#C8102E] focus:ring-2 focus:ring-red-100 outline-none text-sm text-neutral-900 mt-2"
            />
          )}
        </div>

        {/* 3. Cue Phrase */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#C8102E] font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>3. Cue Phrase</span>
          </div>
          <label className="block text-base font-bold text-neutral-900">
            Choose or write a short 2-4 word focal phrase
          </label>
          <p className="text-xs text-neutral-500">
            Select an example phrase or type your own custom focal phrase.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {CUE_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setCuePhrase(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  cuePhrase === preset
                    ? 'bg-[#C8102E] text-white border-[#C8102E]'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                "{preset}"
              </button>
            ))}
          </div>
          <input
            type="text"
            value={cuePhrase}
            onChange={(e) => setCuePhrase(e.target.value)}
            placeholder='e.g., "One play at a time.", "Calm and ready.", "Trust my preparation."'
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#C8102E] focus:ring-2 focus:ring-red-100 outline-none text-sm text-neutral-900"
          />
        </div>

        {/* 4. Confidence Statement */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#C8102E] font-bold text-sm uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>4. Confidence Statement</span>
          </div>
          <label className="block text-base font-bold text-neutral-900">
            A short statement based on preparation, effort, or past success
          </label>
          <textarea
            rows={2}
            value={confidenceStatement}
            onChange={(e) => setConfidenceStatement(e.target.value)}
            placeholder='e.g., "I have studied consistently all week and know how to answer these questions." or "My team has trained hard for this moment."'
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#C8102E] focus:ring-2 focus:ring-red-100 outline-none text-sm text-neutral-900"
          />
        </div>

        {/* 5. Visualization */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#C8102E] font-bold text-sm uppercase tracking-wider">
            <Eye className="w-4 h-4" />
            <span>5. Visualization</span>
          </div>
          <label className="block text-base font-bold text-neutral-900">
            What is the first successful action you want to picture?
          </label>
          <p className="text-xs text-neutral-500">
            Pick a quick example or write your own vivid first action image.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {VISUALIZATION_EXAMPLES.map((vis) => (
              <button
                key={vis}
                type="button"
                onClick={() => setVisualization(vis)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all text-left ${
                  visualization === vis
                    ? 'bg-[#C8102E] text-white border-[#C8102E]'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                + {vis}
              </button>
            ))}
          </div>
          <textarea
            rows={2}
            value={visualization}
            onChange={(e) => setVisualization(e.target.value)}
            placeholder="e.g., Answering the first exam question calmly, completing the first pass cleanly..."
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#C8102E] focus:ring-2 focus:ring-red-100 outline-none text-sm text-neutral-900"
          />
        </div>

        {/* 6. First Controllable Action */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#C8102E] font-bold text-sm uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>6. First Controllable Action</span>
          </div>
          <label className="block text-base font-bold text-neutral-900">
            What will you focus on immediately when the event begins?
          </label>
          <p className="text-xs text-neutral-500">
            Focus purely on something 100% within your direct control (e.g., breathing rhythm, communicating clearly, body language, reading the first question carefully).
          </p>
          <textarea
            rows={2}
            value={firstControllable}
            onChange={(e) => setFirstControllable(e.target.value)}
            placeholder="e.g., Focusing on communicating loudly with teammates on the first defensive possession..."
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#C8102E] focus:ring-2 focus:ring-red-100 outline-none text-sm text-neutral-900"
          />
        </div>

        {/* 7. Generated Personalized Routine Summary */}
        <div className="bg-neutral-900 text-white rounded-2xl p-6 border-l-4 border-l-[#C8102E] shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C8102E]" />
              <span>Generated Pre-Performance Reset Routine</span>
            </div>
            <span className="text-xs text-neutral-400 font-medium">2–5 Min Execution</span>
          </div>

          <div className="space-y-3 text-sm leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="flex-none w-6 h-6 rounded-full bg-red-900/60 border border-red-700 text-red-300 flex items-center justify-center font-bold text-xs">
                1
              </span>
              <div>
                <span className="font-bold text-neutral-200">Grounding / Breathing: </span>
                <span className="text-neutral-300">{getActiveGroundingText()}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-none w-6 h-6 rounded-full bg-red-900/60 border border-red-700 text-red-300 flex items-center justify-center font-bold text-xs">
                2
              </span>
              <div>
                <span className="font-bold text-neutral-200">Repeat Cue Phrase: </span>
                <span className="text-red-300 font-semibold italic">
                  "{cuePhrase.trim() || 'Trust my preparation.'}"
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-none w-6 h-6 rounded-full bg-red-900/60 border border-red-700 text-red-300 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <div>
                <span className="font-bold text-neutral-200">Confidence Statement: </span>
                <span className="text-neutral-300">
                  "{confidenceStatement.trim() || 'I have put in the work and am ready to execute.'}"
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-none w-6 h-6 rounded-full bg-red-900/60 border border-red-700 text-red-300 flex items-center justify-center font-bold text-xs">
                4
              </span>
              <div>
                <span className="font-bold text-neutral-200">Visualization: </span>
                <span className="text-neutral-300">
                  {visualization.trim() || 'Executing the first action calmly and confidently.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-none w-6 h-6 rounded-full bg-red-900/60 border border-red-700 text-red-300 flex items-center justify-center font-bold text-xs">
                5
              </span>
              <div>
                <span className="font-bold text-neutral-200">First Controllable Action: </span>
                <span className="text-emerald-400 font-semibold">
                  {firstControllable.trim() || 'Focusing on my immediate assignment.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons ONLY: Save as PDF & Reset */}
      <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>

        <button
          type="button"
          onClick={handleSavePdf}
          className="px-6 py-2.5 rounded-xl bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
        >
          <FileDown className="w-4 h-4" />
          <span>Save as PDF</span>
        </button>
      </div>
    </div>
  );
};
