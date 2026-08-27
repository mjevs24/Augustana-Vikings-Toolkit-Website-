import React, { useState } from 'react';
import { Moon, CheckSquare, Sparkles, FileDown, RotateCcw, CheckCircle2 } from 'lucide-react';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

export const WindDownBuilderTool: React.FC = () => {
  const [steps, setSteps] = useState([
    { id: '1', time: '30 min before bed', text: 'Power down academic screens & turn off laptop', done: false },
    { id: '2', time: '20 min before bed', text: 'Dim room lighting & enable night/warm display mode', done: false },
    { id: '3', time: '15 min before bed', text: 'Prep backpack & athletic gear for tomorrow', done: false },
    { id: '4', time: '10 min before bed', text: 'Light stretching or 3 minutes of slow diaphragmatic breathing', done: false },
    { id: '5', time: '5 min before bed', text: 'Ensure cool room temperature (18°C / 65°F) & lights out', done: false }
  ]);

  const [customAction, setCustomAction] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const toggleStep = (id: string) => {
    setSteps(steps.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const handleReset = () => {
    setSteps([
      { id: '1', time: '30 min before bed', text: 'Power down academic screens & turn off laptop', done: false },
      { id: '2', time: '20 min before bed', text: 'Dim room lighting & enable night/warm display mode', done: false },
      { id: '3', time: '15 min before bed', text: 'Prep backpack & athletic gear for tomorrow', done: false },
      { id: '4', time: '10 min before bed', text: 'Light stretching or 3 minutes of slow diaphragmatic breathing', done: false },
      { id: '5', time: '5 min before bed', text: 'Ensure cool room temperature (18°C / 65°F) & lights out', done: false }
    ]);
    setCustomAction('');
    setNotification('Wind-down builder reset to default.');
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

    const stepsSummary = steps
      .map((s) => `${s.done ? '[X]' : '[ ]'} [${s.time}] ${s.text}`)
      .join('\n');

    await downloadWorksheetPdf({
      title: '30-Minute Wind-Down Builder',
      subtitle: 'Personalized Pre-Sleep Transition Protocol',
      dateStr: todayFormatted,
      filename: `Augustana_Wind_Down_Builder_${todayIso}.pdf`,
      sections: [
        {
          heading: '30-Minute Wind-Down Checklist',
          content: stepsSummary,
          highlight: 'emerald',
        },
        {
          heading: 'Personalized Wind-Down Habit Commitment',
          content: customAction.trim() || 'Focus on turning off screens 30 minutes before sleep.',
          highlight: 'gray',
        },
      ],
      coachHeading: 'Wind-Down Coaching Tip',
      coachNote:
        'A consistent wind-down routine signals your nervous system to down-regulate from high-stress training and academic focus into restful parasympathetic recovery.',
      footerNote:
        'Augustana Vikings Student-Athlete Well-Being Toolkit — Sleep & Recovery',
    });

    setNotification('PDF generated successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#C8102E] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-xl">
            <Moon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl">30-Minute Wind-Down Builder</h3>
            <p className="text-xs text-red-100">Design a step-by-step pre-sleep transition routine for physical and mental recovery</p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Routine Steps */}
      <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-3">
        <h4 className="font-bold text-xs uppercase text-neutral-800 tracking-wider flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-[#C8102E]" /> 30-Minute Wind-Down Protocol Steps
        </h4>
        <div className="space-y-2">
          {steps.map((item) => (
            <label
              key={item.id}
              onClick={() => toggleStep(item.id)}
              className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                item.done
                  ? 'bg-neutral-100 border-neutral-200 text-neutral-400 line-through'
                  : 'bg-white border-neutral-200 text-neutral-800 hover:border-[#C8102E] font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={item.done} onChange={() => {}} className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]" />
                <span>{item.text}</span>
              </div>
              <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md shrink-0">
                {item.time}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Personal Commitment */}
      <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-2">
        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C8102E]" /> My Wind-Down Habit Commitment
        </label>
        <p className="text-xs text-neutral-500">What specific cue or reminder will help you stick to this 30-minute wind-down routine consistently?</p>
        <textarea
          rows={2}
          value={customAction}
          onChange={(e) => setCustomAction(e.target.value)}
          placeholder="e.g., Set a nightly 10:00 PM phone alarm labeled 'Wind-Down Start'..."
          className="w-full bg-white border border-neutral-200 rounded-xl p-3 text-sm text-neutral-900 focus:border-[#C8102E] outline-none"
        />
      </div>

      {/* Action Buttons ONLY */}
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
