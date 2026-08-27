import React, { useState } from 'react';
import { Moon, Sun, Clock, Sparkles, FileDown, RotateCcw, CheckCircle2 } from 'lucide-react';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

export const SleepPlannerTool: React.FC = () => {
  const [wakeTime, setWakeTime] = useState('06:30');
  const [sleepTargetHours, setSleepTargetHours] = useState(8.5);
  const [scheduleNotes, setScheduleNotes] = useState('');

  const [notification, setNotification] = useState<string | null>(null);

  const calculateBedtime = () => {
    const [hrs, mins] = wakeTime.split(':').map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(hrs, mins, 0, 0);

    const bedDate = new Date(wakeDate.getTime() - sleepTargetHours * 3600 * 1000);
    const lightsOutDate = new Date(bedDate.getTime() - 15 * 60 * 1000);

    return {
      bedtime: lightsOutDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cycles: Math.round(sleepTargetHours / 1.5)
    };
  };

  const result = calculateBedtime();

  const handleReset = () => {
    setWakeTime('06:30');
    setSleepTargetHours(8.5);
    setScheduleNotes('');
    setNotification('Planner reset to default.');
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
      title: 'Student-Athlete Bedtime & Wake-Time Planner',
      subtitle: 'Optimal Sleep Schedule & Sleep Window Planning',
      dateStr: todayFormatted,
      filename: `Augustana_Sleep_Window_Planner_${todayIso}.pdf`,
      sections: [
        {
          heading: 'Wake-Up Schedule & Sleep Target',
          content: `Target Wake-Up Time: ${wakeTime}\nTarget Sleep Duration: ${sleepTargetHours} Hours (${result.cycles} full 90-min sleep cycles)`,
          highlight: 'gray',
        },
        {
          heading: 'Target Lights-Out Bedtime',
          content: `${result.bedtime}`,
          highlight: 'emerald',
        },
        {
          heading: 'Schedule Notes & Context',
          content: scheduleNotes.trim() || 'No specific schedule notes entered.',
          highlight: 'gray',
        },
      ],
      coachHeading: 'Sleep Coaching Tip',
      coachNote:
        'Protecting your sleep window is one of the most effective performance enhancers available. Keep your wake-up time as consistent as possible across training and academic days.',
      footerNote:
        'Augustana Vikings Student-Athlete Well-Being Toolkit — Sleep & Recovery',
    });

    setNotification('PDF generated successfully!');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#C8102E] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-xl">
            <Moon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl">Student-Athlete Bedtime & Wake-Time Planner</h3>
            <p className="text-xs text-red-100">Calculate target lights-out bedtime and establish your optimal sleep window</p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-600" /> Wake-Up Time
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-lg font-bold text-neutral-900 focus:border-[#C8102E] focus:ring-2 focus:ring-red-100 outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-neutral-800">Target Sleep Duration</span>
              <span className="text-[#C8102E] font-bold">{sleepTargetHours} Hours</span>
            </div>
            <input
              type="range"
              min="7"
              max="10"
              step="0.5"
              value={sleepTargetHours}
              onChange={(e) => setSleepTargetHours(parseFloat(e.target.value))}
              className="w-full accent-[#C8102E] h-2 bg-neutral-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 mt-1 font-medium">
              <span>7 hrs (Min)</span>
              <span>8.5 hrs (Recommended)</span>
              <span>10 hrs (Heavy Training)</span>
            </div>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="bg-neutral-900 text-white p-6 rounded-2xl border-t-4 border-t-[#C8102E] flex flex-col justify-center items-center text-center shadow-md">
          <Sparkles className="w-6 h-6 text-red-400 mb-2" />
          <div className="text-xs uppercase font-bold text-neutral-300 tracking-wider">Target Lights-Out Bedtime</div>
          <div className="text-4xl md:text-5xl font-black text-white my-2 tracking-tight">
            {result.bedtime}
          </div>
          <div className="text-xs text-red-300 font-medium">
            Yields approximately {result.cycles} full 90-minute sleep cycles
          </div>
        </div>
      </div>

      {/* Schedule Notes */}
      <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-2">
        <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C8102E]" /> Schedule Notes & Training Context
        </label>
        <p className="text-xs text-neutral-500">Note any early morning practice sessions, travel days, or academic exam commitments impacting this window.</p>
        <textarea
          rows={3}
          value={scheduleNotes}
          onChange={(e) => setScheduleNotes(e.target.value)}
          placeholder="e.g., Morning ice session at 6:00 AM on Tuesdays/Thursdays; 8:30 AM class on Mon/Wed/Fri..."
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
