import React, { useState } from 'react';
import { HeartPulse, Sparkles, FileDown, RotateCcw, CheckCircle2, Activity } from 'lucide-react';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

export const SleepRecoveryCheckinTool: React.FC = () => {
  const [sleepHours, setSleepHours] = useState('7.5');
  const [sleepQuality, setSleepQuality] = useState('7');
  const [fatigueLevel, setFatigueLevel] = useState('5');
  const [muscleSoreness, setMuscleSoreness] = useState('4');
  const [notes, setNotes] = useState('');

  const [notification, setNotification] = useState<string | null>(null);

  const getRecoveryAssessment = () => {
    const qual = parseInt(sleepQuality, 10);
    const fat = parseInt(fatigueLevel, 10);
    const hrs = parseFloat(sleepHours);

    if (hrs >= 8 && qual >= 7 && fat <= 5) {
      return {
        status: 'Optimal Recovery',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        recommendation: 'Your body is well-rested and prepared for full physical training and high cognitive focus.'
      };
    } else if (hrs >= 7 && (qual >= 5 || fat <= 7)) {
      return {
        status: 'Moderate Recovery',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        recommendation: 'Baseline recovery met. Consider prioritizing an extra 30 minutes of sleep or a light wind-down tonight.'
      };
    } else {
      return {
        status: 'High Fatigue / Recovery Focus Needed',
        color: 'text-red-700 bg-red-50 border-red-200',
        recommendation: 'Elevated fatigue or reduced sleep detected. Focus on hydration, active cooling, and protecting tonight\'s bedtime window.'
      };
    }
  };

  const assessment = getRecoveryAssessment();

  const handleReset = () => {
    setSleepHours('7.5');
    setSleepQuality('7');
    setFatigueLevel('5');
    setMuscleSoreness('4');
    setNotes('');
    setNotification('Check-in reset to default.');
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

    await downloadWorksheetPdf({
      title: 'Student-Athlete Sleep & Recovery Check-In',
      subtitle: 'Daily Self-Assessment & Recovery Readiness Log',
      dateStr: todayFormatted,
      filename: `Augustana_Sleep_Recovery_Checkin_${todayIso}.pdf`,
      sections: [
        {
          heading: 'Sleep Duration & Quality Metrics',
          content: `Sleep Duration: ${sleepHours} Hours\nSleep Quality Rating: ${sleepQuality} / 10\nFatigue Level: ${fatigueLevel} / 10 | Muscle Soreness: ${muscleSoreness} / 10`,
          highlight: 'gray',
        },
        {
          heading: 'Recovery Readiness Assessment',
          content: `Status: ${assessment.status}\nGuidance: ${assessment.recommendation}`,
          highlight: 'emerald',
        },
        {
          heading: 'Self-Reflection & Recovery Notes',
          content: notes.trim() || 'No additional recovery notes entered.',
          highlight: 'gray',
        },
      ],
      coachHeading: 'Check-In Coaching Tip',
      coachNote:
        'Daily check-ins help you spot trends in fatigue before they turn into overtraining, illness, or burnout. Listen to your body and adjust sleep habits proactively.',
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
            <HeartPulse className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl">Student-Athlete Sleep & Recovery Check-In</h3>
            <p className="text-xs text-red-100">Self-assess sleep quality, physical soreness, and readiness for training and academics</p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sleep & Fatigue Inputs */}
        <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-4">
          <h4 className="font-bold text-xs uppercase text-neutral-800 tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#C8102E]" /> Daily Recovery Indicators
          </h4>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Hours Slept Last Night</label>
            <input
              type="number"
              step="0.5"
              min="4"
              max="12"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2 text-sm font-bold text-neutral-900"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">Sleep Quality (1-10)</label>
              <select
                value={sleepQuality}
                onChange={(e) => setSleepQuality(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl px-2 py-2 text-xs font-bold text-neutral-900"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} / 10
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">Fatigue Level (1-10)</label>
              <select
                value={fatigueLevel}
                onChange={(e) => setFatigueLevel(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl px-2 py-2 text-xs font-bold text-neutral-900"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} / 10
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">Muscle Soreness</label>
              <select
                value={muscleSoreness}
                onChange={(e) => setMuscleSoreness(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-xl px-2 py-2 text-xs font-bold text-neutral-900"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} / 10
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Assessment */}
        <div className={`p-6 rounded-2xl border flex flex-col justify-center ${assessment.color}`}>
          <div className="text-xs uppercase font-bold tracking-wider mb-1">Recovery Readiness Status</div>
          <div className="text-2xl font-black mb-2">{assessment.status}</div>
          <p className="text-xs leading-relaxed font-medium">{assessment.recommendation}</p>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-2">
        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C8102E]" /> Recovery Notes & Observations
        </label>
        <p className="text-xs text-neutral-500">Record any factors affecting sleep or recovery (late competition, exam stress, travel, illness, etc.).</p>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g., Felt groggy waking up after late return from away game; muscle tightness in hamstrings..."
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
