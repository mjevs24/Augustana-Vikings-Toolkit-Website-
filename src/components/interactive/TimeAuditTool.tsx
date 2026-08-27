import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, Calendar, Clock, Save, FileDown } from 'lucide-react';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

interface CategoryItem {
  key: string;
  label: string;
  group: 'rest' | 'academics' | 'athletics' | 'life';
  groupName: string;
  defaultHours: number;
  hint: string;
}

const CATEGORIES: CategoryItem[] = [
  { key: 'sleep', label: 'Sleep', group: 'rest', groupName: 'Rest & Recovery', defaultHours: 56, hint: 'Target ~8 hrs/night' },
  { key: 'classes', label: 'Classes and labs', group: 'academics', groupName: 'Academics', defaultHours: 15, hint: 'In-person lecture & lab hours' },
  { key: 'studying', label: 'Studying and assignments', group: 'academics', groupName: 'Academics', defaultHours: 20, hint: 'Independent study & writing' },
  { key: 'practices', label: 'Practices and training', group: 'athletics', groupName: 'Athletics', defaultHours: 12, hint: 'On-court, ice, field, or weight room' },
  { key: 'competitions', label: 'Competitions', group: 'athletics', groupName: 'Athletics', defaultHours: 4, hint: 'Varsity games, meets & events' },
  { key: 'meetings', label: 'Team meetings and film', group: 'athletics', groupName: 'Athletics', defaultHours: 3, hint: 'Tactical sessions & film review' },
  { key: 'treatment', label: 'Athletic treatment and recovery', group: 'athletics', groupName: 'Athletics', defaultHours: 3, hint: 'Physio, ice, stretching & rehab' },
  { key: 'travel', label: 'Travel and commuting', group: 'athletics', groupName: 'Athletics', defaultHours: 5, hint: 'Bus, van, or daily commute' },
  { key: 'work', label: 'Paid work', group: 'life', groupName: 'Personal & Work', defaultHours: 0, hint: 'Part-time or campus employment' },
  { key: 'meals', label: 'Meals and meal preparation', group: 'life', groupName: 'Personal & Work', defaultHours: 14, hint: 'Cooking, eating & groceries' },
  { key: 'personalCare', label: 'Personal care and household responsibilities', group: 'life', groupName: 'Personal & Work', defaultHours: 7, hint: 'Hygiene, laundry & chores' },
  { key: 'social', label: 'Social time and leisure', group: 'life', groupName: 'Personal & Work', defaultHours: 10, hint: 'Friends, family & non-screen relaxation' },
  { key: 'screenTime', label: 'Screen time and social media', group: 'life', groupName: 'Personal & Work', defaultHours: 7, hint: 'Social media, gaming & TV' },
  { key: 'other', label: 'Other', group: 'life', groupName: 'Personal & Work', defaultHours: 2, hint: 'Miscellaneous obligations' },
];

const BLANK_HOURS: Record<string, number> = CATEGORIES.reduce((acc, cat) => {
  acc[cat.key] = 0;
  return acc;
}, {} as Record<string, number>);

const BLANK_BUFFERS = {
  academic: { day: 'Wednesday', startTime: '', durationHours: 0 },
  recovery: { day: 'Sunday', startTime: '', durationHours: 0 },
  unexpected: { day: 'Friday', startTime: '', durationHours: 0 },
};

const BLANK_REFLECTIONS = {
  unexpected: '',
  biggestCommitment: '',
  createOneHour: '',
  protectingSleep: '',
  highBufferWeek: '',
};

export const TimeAuditTool: React.FC = () => {
  const [hours, setHours] = useState<Record<string, number>>(BLANK_HOURS);
  const [buffers, setBuffers] = useState(BLANK_BUFFERS);
  const [reflections, setReflections] = useState(BLANK_REFLECTIONS);

  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [notification, setNotification] = useState<{ type: 'save' | 'clear' | 'pdf'; message: string } | null>(null);

  // Helper for updating hour inputs
  const handleHourChange = (key: string, valStr: string) => {
    const val = parseFloat(valStr);
    const safeVal = isNaN(val) ? 0 : Math.max(0, val);
    setHours((prev) => ({ ...prev, [key]: safeVal }));
  };

  // Calculations
  const totalAccounted: number = (Object.values(hours) as number[]).reduce((sum: number, h: number) => sum + h, 0);
  const remainingHours: number = 168 - totalAccounted;
  const avgUnscheduledPerDay = remainingHours > 0 ? (remainingHours / 7).toFixed(1) : '0.0';
  const pctUsed = Math.min(100, Math.round((totalAccounted / 168) * 100));

  // Group Totals for Breakdown Chart
  const groupTotals = {
    rest: hours.sleep || 0,
    academics: (hours.classes || 0) + (hours.studying || 0),
    athletics: (hours.practices || 0) + (hours.competitions || 0) + (hours.meetings || 0) + (hours.treatment || 0) + (hours.travel || 0),
    life: (hours.work || 0) + (hours.meals || 0) + (hours.personalCare || 0) + (hours.social || 0) + (hours.screenTime || 0) + (hours.other || 0),
  };

  const handleConfirmReset = () => {
    setHours(BLANK_HOURS);
    setBuffers(BLANK_BUFFERS);
    setReflections(BLANK_REFLECTIONS);

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
        title: 'Weekly 168-Hour Time Audit Worksheet',
        subtitle: 'Augustana Vikings Student-Athlete Time Audit',
        dateStr: currentDate,
        filename: `Augustana_Time_Audit_${todayIso}.pdf`,
        sections: [
          {
            label: '1. Summary of 168 Hours',
            value: `Total Accounted: ${totalAccounted} hrs (${pctUsed}% of week)\nRemaining Unscheduled: ${remainingHours} hrs (~${avgUnscheduledPerDay} hrs/day)`,
            highlight: 'red'
          },
          {
            label: '2. Time Breakdown By Domain',
            value: `Rest & Recovery (Sleep): ${groupTotals.rest} hrs\nAcademics: ${groupTotals.academics} hrs\nAthletics: ${groupTotals.athletics} hrs\nLife & Personal: ${groupTotals.life} hrs`,
            highlight: 'gray'
          },
          {
            label: '3. Strategic Buffer Blocks',
            value: `Academic Buffer: ${buffers.academic.day} @ ${buffers.academic.startTime} (${buffers.academic.durationHours} hrs)\nRecovery Buffer: ${buffers.recovery.day} @ ${buffers.recovery.startTime} (${buffers.recovery.durationHours} hrs)\nFlex Buffer: ${buffers.unexpected.day} @ ${buffers.unexpected.startTime} (${buffers.unexpected.durationHours} hrs)`,
            highlight: 'emerald'
          }
        ],
        coachNote: 'Be honest with your 168 hours. Unscheduled time gives you room to adapt when travel or deadlines pile up.'
      });

      setNotification({
        type: 'save',
        message: `Downloaded PDF: Augustana_Time_Audit_${todayIso}.pdf`
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
    <div className="space-y-8 bg-[#F5F5F3] p-4 sm:p-6 rounded-2xl border border-gray-300 text-neutral-900 font-sans print:bg-white print:p-0 print:border-none print:shadow-none relative">
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

      {/* Tool Header */}
      <div className="border-b border-gray-300 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <div className="inline-block px-3 py-1 rounded bg-[#C8102E] text-white text-[10px] font-black uppercase tracking-widest mb-2">
              TIME MANAGEMENT TOOL
            </div>
            <h2 className="text-2xl sm:text-4xl font-black italic uppercase font-athletic text-neutral-900 tracking-tight">
              Weekly 168-Hour Time Audit
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 no-print shrink-0">
            <button
              onClick={handleSaveAsPdf}
              className="px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-white" />
              <span>Save as PDF</span>
            </button>
            <button
              onClick={() => setShowResetConfirmation(true)}
              className="px-3.5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-neutral-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neutral-700" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {notification && (
          <div
            className={`mt-3 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 border ${
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

        {/* Intro Banner */}
        <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs">
          <h3 className="text-lg font-bold text-neutral-900 mb-1 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#C8102E]" />
            <span>Where does your week go?</span>
          </h3>
          <p className="text-sm text-neutral-700 leading-relaxed font-normal">
            Every week contains exactly <strong>168 hours</strong>. Enter the approximate number of hours you spend in each area below. The calculator will total your commitments, show your remaining unallocated time, and help you identify whether your current schedule is realistic and sustainable.
          </p>
        </div>
      </div>

      {/* Results Dashboard Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Hours Accounted For */}
        <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
            Hours Accounted For
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-extrabold italic font-athletic ${totalAccounted > 168 ? 'text-red-600' : 'text-neutral-900'}`}>
              {totalAccounted % 1 === 0 ? totalAccounted : totalAccounted.toFixed(1)}
            </span>
            <span className="text-xs font-bold text-neutral-500 uppercase">/ 168 hrs</span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-600 font-medium">
            {pctUsed}% of total weekly time committed
          </div>
        </div>

        {/* Unallocated / Remaining Hours */}
        <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
            {remainingHours >= 0 ? 'Unallocated / Flexible Hours' : 'Overcommitted Hours'}
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-extrabold italic font-athletic ${remainingHours < 0 ? 'text-red-600 font-bold' : remainingHours === 0 ? 'text-amber-600' : 'text-[#C8102E]'}`}>
              {remainingHours >= 0 ? (remainingHours % 1 === 0 ? remainingHours : remainingHours.toFixed(1)) : Math.abs(remainingHours).toFixed(1)}
            </span>
            <span className="text-xs font-bold text-neutral-500 uppercase">
              {remainingHours >= 0 ? 'hrs remaining' : 'hrs over limit'}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-600 font-medium">
            {remainingHours >= 0 ? 'Essential for rest & unexpected delays' : 'Mathematically unsustainable!'}
          </div>
        </div>

        {/* Avg Unscheduled Hours / Day */}
        <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
            Avg Unscheduled Buffer / Day
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold italic font-athletic text-neutral-900">
              {avgUnscheduledPerDay}
            </span>
            <span className="text-xs font-bold text-neutral-500 uppercase">hrs / day</span>
          </div>
          <div className="mt-2 text-[11px] text-neutral-600 font-medium">
            Spread evenly across 7 days
          </div>
        </div>
      </div>

      {/* Progress Bar & Visual Feedback Box */}
      <div className="bg-white p-6 rounded-2xl border border-gray-300 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
          <span>Weekly Hours Allocation Gauge</span>
          <span>{totalAccounted} / 168 Hours</span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
          {totalAccounted <= 168 ? (
            <>
              <div
                style={{ width: `${(groupTotals.rest / 168) * 100}%` }}
                className="bg-indigo-600 h-full"
                title={`Sleep & Rest: ${groupTotals.rest} hrs`}
              ></div>
              <div
                style={{ width: `${(groupTotals.academics / 168) * 100}%` }}
                className="bg-blue-600 h-full"
                title={`Academics: ${groupTotals.academics} hrs`}
              ></div>
              <div
                style={{ width: `${(groupTotals.athletics / 168) * 100}%` }}
                className="bg-[#C8102E] h-full"
                title={`Athletics: ${groupTotals.athletics} hrs`}
              ></div>
              <div
                style={{ width: `${(groupTotals.life / 168) * 100}%` }}
                className="bg-amber-500 h-full"
                title={`Personal & Work: ${groupTotals.life} hrs`}
              ></div>
            </>
          ) : (
            <div className="w-full bg-red-600 h-full animate-pulse"></div>
          )}
        </div>

        {/* Category Legend */}
        <div className="flex flex-wrap items-center justify-between text-xs font-bold gap-3 pt-1 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-indigo-600"></span>
            <span>Sleep & Rest: {groupTotals.rest}h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-600"></span>
            <span>Academics: {groupTotals.academics}h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#C8102E]"></span>
            <span>Athletics: {groupTotals.athletics}h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500"></span>
            <span>Personal & Work: {groupTotals.life}h</span>
          </div>
        </div>

        {/* Dynamic Contextual Feedback Banner */}
        {remainingHours > 0 && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-emerald-950 mb-0.5">
                Realistic & Balanced Schedule ({remainingHours % 1 === 0 ? remainingHours : remainingHours.toFixed(1)} Flexible Hours Remaining)
              </strong>
              <span>
                You have {remainingHours % 1 === 0 ? remainingHours : remainingHours.toFixed(1)} unallocated or flexible hours remaining in your week (approx. {avgUnscheduledPerDay} hours/day). Label these as unallocated hours—they are essential for transition time between classes and practice, unexpected schedule delays, extra recovery, and spontaneous personal needs.
              </span>
            </div>
          </div>
        )}

        {remainingHours === 0 && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-amber-950 mb-0.5">
                100% Fully Allocated Schedule (0 Hours Remaining)
              </strong>
              <span>
                Your week is fully allocated down to the exact minute (168/168 hours). Note that a 100% scheduled week leaves zero buffer for unexpected demands, game travel disruptions, or extra physical recovery. Any unexpected delay in one area will force difficult trade-offs in sleep or study time.
              </span>
            </div>
          </div>
        )}

        {remainingHours < 0 && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-sm flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-red-950 mb-0.5">
                Overcommitted Schedule (Exceeds Week by {Math.abs(remainingHours).toFixed(1)} Hours!)
              </strong>
              <span>
                Your current weekly commitments total <strong>{totalAccounted} hours</strong>, which exceeds the available 168 hours in a week by <strong>{Math.abs(remainingHours).toFixed(1)} hours</strong>. This plan is mathematically impossible and will force sacrifices in sleep or performance. Please revise your estimates above to create a sustainable baseline.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input Categories Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-300 shadow-xs space-y-6">
        <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
          <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
            1. Enter Your Weekly Hours
          </h3>
          <span className="text-xs font-bold text-neutral-500 uppercase">
            14 Categories
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className="flex items-center justify-between p-3 rounded-xl bg-[#F5F5F3] border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="pr-2">
                <label htmlFor={`input-${cat.key}`} className="block text-sm font-bold text-neutral-900">
                  {cat.label}
                </label>
                <span className="block text-[11px] text-neutral-500 font-normal">
                  {cat.hint}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <input
                  id={`input-${cat.key}`}
                  type="number"
                  step="0.5"
                  min="0"
                  max="168"
                  value={hours[cat.key] === 0 ? '' : hours[cat.key]}
                  placeholder="0"
                  onChange={(e) => handleHourChange(cat.key, e.target.value)}
                  className="w-20 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-right text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                />
                <span className="text-xs font-semibold text-neutral-500 w-12 text-left">
                  hrs/wk
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Protect Your Buffer Time Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-300 shadow-xs space-y-6 border-t-4 border-t-[#C8102E]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-50 text-[#C8102E] border border-red-200 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Strategic Scheduling</span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
            2. Protect Your Buffer Time
          </h3>
          <p className="text-sm text-neutral-600 mt-1 font-normal">
            “Buffer time is intentionally unassigned time that can absorb delays, changing deadlines, travel disruptions, or additional recovery needs. It is not wasted time.”
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Academic Buffer Block */}
          <div className="p-4 rounded-xl bg-[#F5F5F3] border border-gray-300 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C8102E]">
              Academic Buffer Block
            </div>
            <p className="text-xs text-neutral-600">Reserved for unexpected assignment extensions or tough study topics.</p>

            <div>
              <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">Day of Week</label>
              <select
                value={buffers.academic.day}
                onChange={(e) => setBuffers({ ...buffers, academic: { ...buffers.academic, day: e.target.value } })}
                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">Start Time</label>
                <input
                  type="time"
                  value={buffers.academic.startTime}
                  onChange={(e) => setBuffers({ ...buffers, academic: { ...buffers.academic, startTime: e.target.value } })}
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">Duration</label>
                <select
                  value={buffers.academic.durationHours}
                  onChange={(e) => setBuffers({ ...buffers, academic: { ...buffers.academic, durationHours: parseFloat(e.target.value) } })}
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                >
                  <option value={1.0}>1.0 hour</option>
                  <option value={1.5}>1.5 hours</option>
                  <option value={2.0}>2.0 hours</option>
                  <option value={3.0}>3.0 hours</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recovery Buffer Block */}
          <div className="p-4 rounded-xl bg-[#F5F5F3] border border-gray-300 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Recovery Buffer Block
            </div>
            <p className="text-xs text-neutral-600">Dedicated downtime for physical therapy, sleep recharge, or relaxation.</p>

            <div>
              <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">Day of Week</label>
              <select
                value={buffers.recovery.day}
                onChange={(e) => setBuffers({ ...buffers, recovery: { ...buffers.recovery, day: e.target.value } })}
                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">Start Time</label>
                <input
                  type="time"
                  value={buffers.recovery.startTime}
                  onChange={(e) => setBuffers({ ...buffers, recovery: { ...buffers.recovery, startTime: e.target.value } })}
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">Duration</label>
                <select
                  value={buffers.recovery.durationHours}
                  onChange={(e) => setBuffers({ ...buffers, recovery: { ...buffers.recovery, durationHours: parseFloat(e.target.value) } })}
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                >
                  <option value={1.0}>1.0 hour</option>
                  <option value={1.5}>1.5 hours</option>
                  <option value={2.0}>2.0 hours</option>
                  <option value={3.0}>3.0 hours</option>
                </select>
              </div>
            </div>
          </div>

          {/* Flexible Block for Unexpected Demands */}
          <div className="p-4 rounded-xl bg-[#F5F5F3] border border-gray-300 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Flexible Buffer Block
            </div>
            <p className="text-xs text-neutral-600">Absorbs bus travel delays, sudden team changes, or life errands.</p>

            <div>
              <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">Day of Week</label>
              <select
                value={buffers.unexpected.day}
                onChange={(e) => setBuffers({ ...buffers, unexpected: { ...buffers.unexpected, day: e.target.value } })}
                className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">Start Time</label>
                <input
                  type="time"
                  value={buffers.unexpected.startTime}
                  onChange={(e) => setBuffers({ ...buffers, unexpected: { ...buffers.unexpected, startTime: e.target.value } })}
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">Duration</label>
                <select
                  value={buffers.unexpected.durationHours}
                  onChange={(e) => setBuffers({ ...buffers, unexpected: { ...buffers.unexpected, durationHours: parseFloat(e.target.value) } })}
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                >
                  <option value={1.0}>1.0 hour</option>
                  <option value={1.5}>1.5 hours</option>
                  <option value={2.0}>2.0 hours</option>
                  <option value={3.0}>3.0 hours</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reflection Prompts Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-300 shadow-xs space-y-6">
        <div className="border-b border-gray-200 pb-3">
          <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
            3. Weekly Reflection Prompts
          </h3>
          <p className="text-sm text-neutral-600 mt-0.5">
            Reflect on your time allocation to identify opportunities for growth and sustainable performance.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-1">
              • What took more time than you expected?
            </label>
            <textarea
              rows={2}
              value={reflections.unexpected}
              onChange={(e) => setReflections({ ...reflections, unexpected: e.target.value })}
              placeholder="e.g. Travel to away games, group projects, commuting..."
              className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-1">
              • Which commitment currently uses the most time?
            </label>
            <textarea
              rows={2}
              value={reflections.biggestCommitment}
              onChange={(e) => setReflections({ ...reflections, biggestCommitment: e.target.value })}
              placeholder="e.g. In-person lectures, team practices, sleep..."
              className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-1">
              • Where could you realistically create one additional hour?
            </label>
            <textarea
              rows={2}
              value={reflections.createOneHour}
              onChange={(e) => setReflections({ ...reflections, createOneHour: e.target.value })}
              placeholder="e.g. Reducing social media scrolling from 7h to 6h, streamlining meal prep..."
              className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-1">
              • Are you protecting enough sleep and recovery?
            </label>
            <textarea
              rows={2}
              value={reflections.protectingSleep}
              onChange={(e) => setReflections({ ...reflections, protectingSleep: e.target.value })}
              placeholder="e.g. Getting ~8 hours per night, using wind-down routines..."
              className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-neutral-900 mb-1">
              • Which week of the semester may require more buffer time?
            </label>
            <textarea
              rows={2}
              value={reflections.highBufferWeek}
              onChange={(e) => setReflections({ ...reflections, highBufferWeek: e.target.value })}
              placeholder="e.g. Midterm week (Week 7), playoff road trip weekend..."
              className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
