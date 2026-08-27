import React, { useState } from 'react';
import {
  Save,
  Trophy,
  BookOpen,
  Dumbbell,
  UserCheck,
  FileDown,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

const BLANK_ACADEMICS = { assignments: false, quizTest: false, readings: false, groupWork: false, other: '' };
const BLANK_ATHLETICS = { practices: false, competition: false, strengthConditioning: false, recoveryTreatment: false, teamMeetingFilm: false, other: '' };
const BLANK_LIFE = { workShifts: false, appointments: false, groceriesMealPrep: false, laundryCleaning: false, familyFriends: false, other: '' };
const BLANK_PRIORITIES = { p1: '', p2: '', p3: '' };
const BLANK_TIMEBLOCKS = [
  { day: 'MONDAY', task: '', time: '' },
  { day: 'TUESDAY', task: '', time: '' },
  { day: 'WEDNESDAY', task: '', time: '' },
  { day: 'THURSDAY', task: '', time: '' },
  { day: 'FRIDAY', task: '', time: '' },
  { day: 'SATURDAY', task: '', time: '' },
  { day: 'SUNDAY', task: '', time: '' },
];
const BLANK_WELLBEING = { sleep: false, nutrition: false, hydration: false, recovery: false, movement: false, timeFriends: false, hobby: false, askHelp: false };
const BLANK_LOOKINGAHEAD = { challenge: '', plan: '', lookingForward: '' };

export const WeeklyGamePlanTool: React.FC = () => {
  // Academics checkboxes
  const [academics, setAcademics] = useState(BLANK_ACADEMICS);

  // Athletics checkboxes
  const [athletics, setAthletics] = useState(BLANK_ATHLETICS);

  // Life checkboxes
  const [life, setLife] = useState(BLANK_LIFE);

  // Top 3 Priorities
  const [priorities, setPriorities] = useState(BLANK_PRIORITIES);

  // Time Blocking Table
  const [timeBlocks, setTimeBlocks] = useState(BLANK_TIMEBLOCKS);

  // Well-being priorities
  const [wellBeing, setWellBeing] = useState(BLANK_WELLBEING);

  // Looking ahead
  const [lookingAhead, setLookingAhead] = useState(BLANK_LOOKINGAHEAD);

  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [notification, setNotification] = useState<{ type: 'save' | 'clear' | 'pdf'; message: string } | null>(null);

  const handleConfirmReset = () => {
    setAcademics(BLANK_ACADEMICS);
    setAthletics(BLANK_ATHLETICS);
    setLife(BLANK_LIFE);
    setPriorities(BLANK_PRIORITIES);
    setTimeBlocks(BLANK_TIMEBLOCKS);
    setWellBeing(BLANK_WELLBEING);
    setLookingAhead(BLANK_LOOKINGAHEAD);

    setShowResetConfirmation(false);

    setNotification({
      type: 'clear',
      message: 'Worksheet reset. Responses cleared for this session.'
    });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveAsPdf = async () => {
    const todayIso = new Date().toISOString().split('T')[0];
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    setNotification({
      type: 'pdf',
      message: 'Generating your Augustana branded PDF...'
    });

    try {
      await downloadWorksheetPdf({
        title: 'Weekly Game Plan Worksheet',
        subtitle: 'Augustana Vikings Student-Athlete Time Management Plan',
        dateStr: currentDate,
        filename: `Augustana_Weekly_Game_Plan_${todayIso}.pdf`,
        sections: [
          {
            label: '1. Top Priorities This Week',
            value: `1. ${priorities.p1 || '—'}\n2. ${priorities.p2 || '—'}\n3. ${priorities.p3 || '—'}`,
            highlight: 'red'
          },
          {
            label: '2. Time Blocking Schedule',
            value: timeBlocks.map(tb => `${tb.day}: ${tb.task || 'Open'} (${tb.time || 'Flex'})`).join('\n'),
            highlight: 'gray'
          },
          {
            label: '3. Well-Being Priorities',
            value: Object.entries(wellBeing).filter(([_, v]) => v).map(([k]) => `✓ ${k}`).join(', ') || 'None selected',
            highlight: 'emerald'
          },
          {
            label: '4. Looking Ahead',
            value: `Challenge: ${lookingAhead.challenge || '—'}\nPlan: ${lookingAhead.plan || '—'}\nLooking forward to: ${lookingAhead.lookingForward || '—'}`,
            highlight: 'gray'
          }
        ],
        coachNote: 'Focus on what you can control each day. Small consistent steps create championship results.'
      });

      setNotification({
        type: 'save',
        message: `Downloaded PDF: Augustana_Weekly_Game_Plan_${todayIso}.pdf`
      });
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      console.error(err);
      setNotification({
        type: 'clear',
        message: 'Unable to generate PDF. Please try again.'
      });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-4 md:p-8 text-neutral-900 shadow-xs my-4 max-w-5xl mx-auto relative">
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

      {/* Top Header Banner */}
      <div className="bg-stone-900 text-white p-6 rounded-2xl border-t-4 border-t-[#C8102E] mb-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#C8102E] text-white flex items-center justify-center font-extrabold text-2xl shrink-0 italic font-athletic">
            V
          </div>
          <div>
            <div className="text-red-400 text-xs font-bold tracking-wider uppercase">
              Augustana Vikings Student-Athlete Toolkit
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase italic font-athletic">
              Weekly Game Plan
            </h2>
            <p className="text-sm font-medium text-neutral-300">
              Plan your week and protect what matters.
            </p>
          </div>
        </div>

        {/* 2 PRIMARY ACTIONS */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSaveAsPdf}
            className="px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-white" />
            <span>Save as PDF</span>
          </button>

          <button
            onClick={() => setShowResetConfirmation(true)}
            className="px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-300" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {notification && (
        <div
          className={`mb-6 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 border ${
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

      <p className="text-xs text-neutral-600 mb-8 bg-stone-50 p-3.5 rounded-xl border border-neutral-200">
        Student-athletes juggle a lot. Use this worksheet to organize your priorities, plan your time, and create space for academic and athletic success. All data is saved on your local device.
      </p>

      {/* 1. WHAT'S ON MY PLATE THIS WEEK? */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 rounded-lg bg-[#C8102E] text-white font-bold text-sm flex items-center justify-center">
            1
          </span>
          <h3 className="font-bold text-lg text-neutral-900 uppercase tracking-wide">
            What's On My Plate This Week?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Academics */}
          <div className="bg-stone-50 border border-neutral-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#C8102E]">
              <BookOpen className="w-5 h-5 text-[#C8102E]" />
              <h4 className="font-bold text-sm uppercase text-neutral-900">Academics</h4>
            </div>
            <div className="space-y-2 text-xs text-neutral-800">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={academics.assignments}
                  onChange={(e) => setAcademics({ ...academics, assignments: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Assignment(s)
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={academics.quizTest}
                  onChange={(e) => setAcademics({ ...academics, quizTest: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Quiz / Test
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={academics.readings}
                  onChange={(e) => setAcademics({ ...academics, readings: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Course Readings
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={academics.groupWork}
                  onChange={(e) => setAcademics({ ...academics, groupWork: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Group Work / Meetings
              </label>
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Other academic item..."
                  value={academics.other}
                  onChange={(e) => setAcademics({ ...academics, other: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-lg px-2.5 py-1 text-xs text-neutral-900"
                />
              </div>
            </div>
          </div>

          {/* Athletics */}
          <div className="bg-stone-50 border border-neutral-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#C8102E]">
              <Dumbbell className="w-5 h-5 text-[#C8102E]" />
              <h4 className="font-bold text-sm uppercase text-neutral-900">Athletics</h4>
            </div>
            <div className="space-y-2 text-xs text-neutral-800">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={athletics.practices}
                  onChange={(e) => setAthletics({ ...athletics, practices: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Team Practices
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={athletics.competition}
                  onChange={(e) => setAthletics({ ...athletics, competition: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Competition / Game
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={athletics.strengthConditioning}
                  onChange={(e) => setAthletics({ ...athletics, strengthConditioning: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Strength & Conditioning
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={athletics.recoveryTreatment}
                  onChange={(e) => setAthletics({ ...athletics, recoveryTreatment: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Recovery / Treatment
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={athletics.teamMeetingFilm}
                  onChange={(e) => setAthletics({ ...athletics, teamMeetingFilm: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Team Meeting / Film
              </label>
            </div>
          </div>

          {/* Life & Responsibilities */}
          <div className="bg-stone-50 border border-neutral-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#C8102E]">
              <UserCheck className="w-5 h-5 text-[#C8102E]" />
              <h4 className="font-bold text-sm uppercase text-neutral-900">Life & Responsibilities</h4>
            </div>
            <div className="space-y-2 text-xs text-neutral-800">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={life.workShifts}
                  onChange={(e) => setLife({ ...life, workShifts: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Work Shift(s)
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={life.appointments}
                  onChange={(e) => setLife({ ...life, appointments: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Appointments
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={life.groceriesMealPrep}
                  onChange={(e) => setLife({ ...life, groceriesMealPrep: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Groceries / Meal Prep
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={life.laundryCleaning}
                  onChange={(e) => setLife({ ...life, laundryCleaning: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Laundry / Cleaning
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={life.familyFriends}
                  onChange={(e) => setLife({ ...life, familyFriends: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                Family / Friends
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 2 & 3: Priorities and Time Blocking */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Section 2: Top 3 Priorities */}
        <div className="md:col-span-4 bg-stone-50 border border-neutral-200 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-lg bg-[#C8102E] text-white font-bold text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-base text-neutral-900 uppercase tracking-wide">
                Top 3 Priorities
              </h3>
            </div>
            <p className="text-[11px] text-neutral-600 mb-4 font-normal">
              Focus on what makes the biggest difference this week.
            </p>

            <div className="space-y-3">
              {[
                { num: '1', key: 'p1', val: priorities.p1 },
                { num: '2', key: 'p2', val: priorities.p2 },
                { num: '3', key: 'p3', val: priorities.p3 },
              ].map((p) => (
                <div key={p.num} className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 font-bold text-xs flex items-center justify-center shrink-0 border border-red-200">
                    {p.num}
                  </span>
                  <input
                    type="text"
                    value={p.val}
                    onChange={(e) => setPriorities({ ...priorities, [p.key]: e.target.value })}
                    className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-1.5 text-xs text-neutral-900"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-2 text-xs text-[#C8102E] font-bold">
              <Trophy className="w-4 h-4" />
              <span>Vikings Motto: Balance Today. Perform Tomorrow.</span>
            </div>
          </div>
        </div>

        {/* Section 3: Time Blocking */}
        <div className="md:col-span-8 bg-stone-50 border border-neutral-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-7 rounded-lg bg-[#C8102E] text-white font-bold text-sm flex items-center justify-center">
              3
            </span>
            <h3 className="font-bold text-base text-neutral-900 uppercase tracking-wide">
              Time Blocking Schedule
            </h3>
          </div>
          <p className="text-[11px] text-neutral-600 mb-4">
            Plan when you will complete your most important academic & athletic tasks.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-red-50 text-red-900 uppercase font-bold text-[10px] tracking-wider border-b border-red-200">
                  <th className="p-2.5 w-24">Day</th>
                  <th className="p-2.5">Most Important Task</th>
                  <th className="p-2.5 w-36">Time Scheduled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {timeBlocks.map((tb, idx) => (
                  <tr key={tb.day} className="hover:bg-stone-50">
                    <td className="p-2 font-bold text-neutral-900">{tb.day}</td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={tb.task}
                        onChange={(e) => {
                          const updated = [...timeBlocks];
                          updated[idx].task = e.target.value;
                          setTimeBlocks(updated);
                        }}
                        className="w-full bg-stone-50 border border-neutral-200 rounded px-2 py-1 text-xs text-neutral-900"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={tb.time}
                        onChange={(e) => {
                          const updated = [...timeBlocks];
                          updated[idx].time = e.target.value;
                          setTimeBlocks(updated);
                        }}
                        className="w-full bg-stone-50 border border-neutral-200 rounded px-2 py-1 text-xs text-neutral-800"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4 & 5: Well-being and Looking Ahead */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Section 4: Protect My Well-Being */}
        <div className="bg-stone-50 border border-neutral-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-7 rounded-lg bg-[#C8102E] text-white font-bold text-sm flex items-center justify-center">
              4
            </span>
            <h3 className="font-bold text-base text-neutral-900 uppercase tracking-wide">
              Protect My Well-Being
            </h3>
          </div>
          <p className="text-[11px] text-neutral-600 mb-4">
            Check the areas you plan to prioritize this week:
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'sleep', label: '7–9 Hours of Sleep' },
              { id: 'nutrition', label: 'Proper Nutrition' },
              { id: 'hydration', label: 'Hydration (2-3L)' },
              { id: 'recovery', label: 'Recovery / Rest' },
              { id: 'movement', label: 'Movement / Mobility' },
              { id: 'timeFriends', label: 'Time with Friends / Family' },
              { id: 'hobby', label: 'Hobby / Enjoyment' },
              { id: 'askHelp', label: 'Ask for Help When Needed' },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 p-2 rounded-xl bg-white border border-neutral-200 cursor-pointer hover:border-red-600 font-medium"
              >
                <input
                  type="checkbox"
                  checked={wellBeing[item.id as keyof typeof wellBeing]}
                  onChange={(e) => setWellBeing({ ...wellBeing, [item.id]: e.target.checked })}
                  className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]"
                />
                <span className="text-neutral-800">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Section 5: Looking Ahead */}
        <div className="bg-stone-50 border border-neutral-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-7 rounded-lg bg-[#C8102E] text-white font-bold text-sm flex items-center justify-center">
              5
            </span>
            <h3 className="font-bold text-base text-neutral-900 uppercase tracking-wide">
              Looking Ahead
            </h3>
          </div>
          <p className="text-[11px] text-neutral-600 mb-4">Finish strong by planning ahead.</p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[10px] font-bold uppercase text-neutral-700 mb-1">
                One challenge I expect this week:
              </label>
              <input
                type="text"
                value={lookingAhead.challenge}
                onChange={(e) => setLookingAhead({ ...lookingAhead, challenge: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-1.5 text-neutral-900"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-neutral-700 mb-1">
                My plan to manage it:
              </label>
              <input
                type="text"
                value={lookingAhead.plan}
                onChange={(e) => setLookingAhead({ ...lookingAhead, plan: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-1.5 text-neutral-900"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-neutral-700 mb-1">
                One thing I'm looking forward to:
              </label>
              <input
                type="text"
                value={lookingAhead.lookingForward}
                onChange={(e) => setLookingAhead({ ...lookingAhead, lookingForward: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-1.5 text-neutral-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-stone-50 p-4 rounded-xl border border-neutral-200 text-center flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600 gap-2">
        <div className="font-bold text-[#C8102E]">FOCUS. PREPARE. PERFORM. THRIVE.</div>
        <div className="text-neutral-600">
          Remember: You don't have to be perfect—you just have to be intentional.
        </div>
      </div>
    </div>
  );
};
