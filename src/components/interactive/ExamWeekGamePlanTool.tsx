import React, { useState } from 'react';
import { Calendar, Clock, CheckSquare, Heart, Sparkles, BookOpen, Activity, Save, FileDown, RotateCcw, CheckCircle2, ShieldAlert, Users } from 'lucide-react';
import { downloadWorksheetPdf, WorksheetPdfSection } from '../../lib/pdfExporter';

interface StudyBlock {
  time: string;
  course: string;
  strategy: string;
  breakPlan: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

const DEFAULT_RECOVERY_ITEMS: ChecklistItem[] = [
  { id: 'r1', label: '8 hours sleep target locked', done: false },
  { id: 'r2', label: '2.5L daily hydration target', done: false },
  { id: 'r3', label: 'Pre-exam fueling meals & snacks prepped', done: false },
  { id: 'r4', label: '20-min active recovery walk or stretching', done: false },
  { id: 'r5', label: '30-min screen-free wind-down before bed', done: false },
  { id: 'r6', label: 'One restorative recovery activity planned', done: false },
];

const DEFAULT_EXAM_CHECKLIST: ChecklistItem[] = [
  { id: 'c1', label: 'Student ID (OneCard / Photo ID)', done: false },
  { id: 'c2', label: 'Approved calculator (with spare batteries)', done: false },
  { id: 'c3', label: 'Writing supplies (pens, pencils, erasers)', done: false },
  { id: 'c4', label: 'Water bottle & quiet exam snacks', done: false },
  { id: 'c5', label: 'Course materials downloaded for offline study', done: false },
  { id: 'c6', label: 'Travel letter sent to professors & SAS (if applicable)', done: false },
  { id: 'c7', label: 'Transportation or bus departure time confirmed', done: false },
  { id: 'c8', label: 'Recovery food & post-game snacks packed', done: false },
];

export const ExamWeekGamePlanTool: React.FC = () => {
  // A. Next Exam & Stress Rating
  const [nextExam, setNextExam] = useState({
    courseCode: '',
    examDate: '',
    examTime: '',
    location: '',
    examFormat: '',
    weight: '',
  });

  const [stressLevel, setStressLevel] = useState<number>(5);

  // B. Top Three Priorities
  const [priority1, setPriority1] = useState<string>('');
  const [priority2, setPriority2] = useState<string>('');
  const [priority3, setPriority3] = useState<string>('');

  // C. Study Blocks (up to 3)
  const [studyBlocks, setStudyBlocks] = useState<StudyBlock[]>([
    { time: '', course: '', strategy: '', breakPlan: '' },
    { time: '', course: '', strategy: '', breakPlan: '' },
    { time: '', course: '', strategy: '', breakPlan: '' },
  ]);

  // D. Recovery Plan Checklist
  const [recoveryChecklist, setRecoveryChecklist] = useState<ChecklistItem[]>(DEFAULT_RECOVERY_ITEMS);

  // E. Exam and Travel Checklist
  const [examChecklist, setExamChecklist] = useState<ChecklistItem[]>(DEFAULT_EXAM_CHECKLIST);

  // F. Brain Dump & Support Plan
  const [brainDump, setBrainDump] = useState<string>('');
  const [supportPlan, setSupportPlan] = useState<string>('');

  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [notification, setNotification] = useState<{ type: 'save' | 'clear' | 'pdf'; message: string } | null>(null);

  const handleConfirmReset = () => {
    setNextExam({
      courseCode: '',
      examDate: '',
      examTime: '',
      location: '',
      examFormat: '',
      weight: '',
    });
    setStressLevel(5);
    setPriority1('');
    setPriority2('');
    setPriority3('');
    setStudyBlocks([
      { time: '', course: '', strategy: '', breakPlan: '' },
      { time: '', course: '', strategy: '', breakPlan: '' },
      { time: '', course: '', strategy: '', breakPlan: '' },
    ]);
    setRecoveryChecklist(DEFAULT_RECOVERY_ITEMS.map(i => ({ ...i, done: false })));
    setExamChecklist(DEFAULT_EXAM_CHECKLIST.map(i => ({ ...i, done: false })));
    setBrainDump('');
    setSupportPlan('');

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
      const pdfSections: WorksheetPdfSection[] = [];

      // A. Next Exam Details
      const nextExamLines: string[] = [];
      if (nextExam.courseCode) nextExamLines.push(`Course Code: ${nextExam.courseCode}`);
      if (nextExam.examDate || nextExam.examTime) {
        nextExamLines.push(`Date & Time: ${nextExam.examDate || ''} ${nextExam.examTime ? 'at ' + nextExam.examTime : ''}`.trim());
      }
      if (nextExam.location) nextExamLines.push(`Location: ${nextExam.location}`);
      if (nextExam.examFormat || nextExam.weight) {
        nextExamLines.push(`Format & Weight: ${nextExam.examFormat || 'N/A'} ${nextExam.weight ? `(${nextExam.weight})` : ''}`.trim());
      }
      nextExamLines.push(`Stress & Fatigue Level: ${stressLevel}/10`);

      pdfSections.push({
        heading: 'A. Next Exam Focus & Stress Level',
        value: nextExamLines.length > 0 ? nextExamLines.join('\n') : 'None recorded',
        highlight: 'red'
      });

      // B. Top Three Priorities
      const prioritiesList = [priority1, priority2, priority3].filter(p => p.trim() !== '');
      pdfSections.push({
        heading: 'B. Top Three Priorities',
        value: prioritiesList.length > 0 
          ? prioritiesList.map((p, i) => `${i + 1}. ${p}`).join('\n')
          : 'None recorded',
        highlight: 'gray'
      });

      // C. Focused Study Blocks
      const activeBlocks = studyBlocks.filter(b => b.time || b.course || b.strategy || b.breakPlan);
      const studyBlocksText = activeBlocks.length > 0
        ? activeBlocks.map((b, i) => 
            `Block ${i + 1} (${b.time || 'TBD'}): ${b.course || 'General Study'}\n  • Strategy: ${b.strategy || 'N/A'}\n  • Break Plan: ${b.breakPlan || 'N/A'}`
          ).join('\n\n')
        : 'None recorded';

      pdfSections.push({
        heading: 'C. Focused Study Blocks',
        value: studyBlocksText,
        highlight: 'gray'
      });

      // D. Recovery Plan
      const completedRecovery = recoveryChecklist.filter(i => i.done).map(i => i.label);
      const pendingRecovery = recoveryChecklist.filter(i => !i.done).map(i => i.label);

      let recoveryText = '';
      if (completedRecovery.length > 0) {
        recoveryText += `Completed Recovery Items:\n` + completedRecovery.map(i => `  ✓ ${i}`).join('\n');
      }
      if (pendingRecovery.length > 0) {
        if (recoveryText) recoveryText += '\n\n';
        recoveryText += `Planned Recovery Items:\n` + pendingRecovery.map(i => `  ○ ${i}`).join('\n');
      }

      pdfSections.push({
        heading: 'D. Recovery Plan',
        value: recoveryText || 'None recorded',
        highlight: 'emerald'
      });

      // E. Exam and Travel Checklist
      const completedChecklist = examChecklist.filter(i => i.done).map(i => i.label);
      const pendingChecklist = examChecklist.filter(i => !i.done).map(i => i.label);

      if (completedChecklist.length > 0) {
        pdfSections.push({
          heading: 'Completed Preparation Items',
          value: completedChecklist.map(i => `✓ ${i}`).join('\n'),
          highlight: 'emerald'
        });
      }

      if (pendingChecklist.length > 0) {
        pdfSections.push({
          heading: 'Items Still to Prepare',
          value: pendingChecklist.map(i => `○ ${i}`).join('\n'),
          highlight: 'gray'
        });
      }

      if (completedChecklist.length === 0 && pendingChecklist.length === 0) {
        pdfSections.push({
          heading: 'Exam and Travel Checklist',
          value: 'None recorded',
          highlight: 'gray'
        });
      }

      // F. Brain Dump
      pdfSections.push({
        heading: 'F. Final Exam Brain Dump & Formulas',
        value: brainDump.trim() !== '' ? brainDump : 'None recorded',
        highlight: 'gray'
      });

      // Support Plan
      pdfSections.push({
        heading: 'Support Plan & Contacts',
        value: supportPlan.trim() !== '' ? supportPlan : 'None recorded',
        highlight: 'gray'
      });

      await downloadWorksheetPdf({
        title: 'Exam Week & Post-Season Game Plan',
        subtitle: 'Augustana Vikings One-Week Exam & Competition Survival Plan',
        dateStr: currentDate,
        filename: `Augustana_Exam_Week_Plan_${todayIso}.pdf`,
        sections: pdfSections,
        coachNote: 'Focus on process over pressure. Protect your sleep, hydrate, and execute one study block at a time.'
      });

      setNotification({
        type: 'save',
        message: `Downloaded PDF: Augustana_Exam_Week_Plan_${todayIso}.pdf`
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

  const toggleRecoveryItem = (id: string) => {
    setRecoveryChecklist(recoveryChecklist.map(i => i.id === id ? { ...i, done: !i.done } : i));
  };

  const toggleExamChecklistItem = (id: string) => {
    setExamChecklist(examChecklist.map(i => i.id === id ? { ...i, done: !i.done } : i));
  };

  const updateStudyBlock = (index: number, field: keyof StudyBlock, val: string) => {
    const updated = [...studyBlocks];
    updated[index] = { ...updated[index], [field]: val };
    setStudyBlocks(updated);
  };

  return (
    <div className="space-y-6 bg-[#F5F5F3] p-4 sm:p-6 rounded-2xl border border-gray-300 text-neutral-900 font-sans print:bg-white print:p-0 print:border-none relative">
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

      {/* Header Banner */}
      <div className="border-b border-gray-300 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <div className="inline-block px-3 py-1 rounded bg-[#C8102E] text-white text-[10px] font-black uppercase tracking-widest mb-2">
              FINALS WEEK & POST-SEASON PLAN
            </div>
            <h2 className="text-2xl sm:text-3xl font-black italic uppercase font-athletic text-neutral-900 tracking-tight">
              Exam Week & Post-Season Game Plan
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1">
              A concise one-week survival plan to manage exam prep, study blocks, fueling, sleep, and travel.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleSaveAsPdf}
              className="px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-white" />
              <span>Save as PDF</span>
            </button>
            <button
              type="button"
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
      </div>

      {/* SECTION A: Next Exam */}
      <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-4 border-l-4 border-l-[#C8102E]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C8102E]" />
            A. Next Exam
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-600 uppercase">Stress / Fatigue Level:</span>
            <span className={`text-xs font-black px-2.5 py-1 rounded-full text-white ${
              stressLevel >= 8 ? 'bg-[#C8102E]' : stressLevel >= 5 ? 'bg-amber-500' : 'bg-emerald-600'
            }`}>
              {stressLevel}/10
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Course Code</label>
            <input
              type="text"
              placeholder="e.g. AUPSY 103"
              value={nextExam.courseCode}
              onChange={(e) => setNextExam({ ...nextExam, courseCode: e.target.value })}
              className="w-full text-xs font-bold text-neutral-900 bg-[#F5F5F3] border border-gray-300 rounded-xl p-2 focus:ring-1 focus:ring-[#C8102E] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Exam Date</label>
            <input
              type="text"
              placeholder="e.g. Dec 14 or 2026-12-14"
              value={nextExam.examDate}
              onChange={(e) => setNextExam({ ...nextExam, examDate: e.target.value })}
              className="w-full text-xs font-medium text-neutral-900 bg-[#F5F5F3] border border-gray-300 rounded-xl p-2 focus:ring-1 focus:ring-[#C8102E] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Exam Time</label>
            <input
              type="text"
              placeholder="e.g. 09:00 AM"
              value={nextExam.examTime}
              onChange={(e) => setNextExam({ ...nextExam, examTime: e.target.value })}
              className="w-full text-xs font-medium text-neutral-900 bg-[#F5F5F3] border border-gray-300 rounded-xl p-2 focus:ring-1 focus:ring-[#C8102E] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Location</label>
            <input
              type="text"
              placeholder="e.g. Gymnasium Court A"
              value={nextExam.location}
              onChange={(e) => setNextExam({ ...nextExam, location: e.target.value })}
              className="w-full text-xs font-medium text-neutral-900 bg-[#F5F5F3] border border-gray-300 rounded-xl p-2 focus:ring-1 focus:ring-[#C8102E] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Exam Format</label>
            <input
              type="text"
              placeholder="e.g. 80 MC Questions"
              value={nextExam.examFormat}
              onChange={(e) => setNextExam({ ...nextExam, examFormat: e.target.value })}
              className="w-full text-xs font-medium text-neutral-900 bg-[#F5F5F3] border border-gray-300 rounded-xl p-2 focus:ring-1 focus:ring-[#C8102E] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Weight</label>
            <input
              type="text"
              placeholder="e.g. 35%"
              value={nextExam.weight}
              onChange={(e) => setNextExam({ ...nextExam, weight: e.target.value })}
              className="w-full text-xs font-medium text-neutral-900 bg-[#F5F5F3] border border-gray-300 rounded-xl p-2 focus:ring-1 focus:ring-[#C8102E] focus:bg-white"
            />
          </div>
        </div>

        {/* Stress selector */}
        <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-neutral-700">Rate Mental Pressure / Physical Stress (1-10):</span>
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setStressLevel(num)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  stressLevel === num
                    ? num >= 8
                      ? 'bg-[#C8102E] text-white scale-110 shadow-sm'
                      : num >= 5
                      ? 'bg-amber-500 text-white scale-110 shadow-sm'
                      : 'bg-emerald-600 text-white scale-110 shadow-sm'
                    : 'bg-gray-100 text-neutral-700 hover:bg-gray-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION B: Top Three Priorities */}
      <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#C8102E]" />
            B. Top Three Priorities
          </h3>
          <span className="text-[10px] font-bold text-neutral-500 uppercase">Immediate Focus</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 p-2 bg-[#F5F5F3] rounded-xl border border-gray-200">
            <span className="text-xs font-bold text-[#C8102E] shrink-0">#1</span>
            <input
              type="text"
              placeholder="e.g. Review units 4–6"
              value={priority1}
              onChange={(e) => setPriority1(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-neutral-900 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 p-2 bg-[#F5F5F3] rounded-xl border border-gray-200">
            <span className="text-xs font-bold text-[#C8102E] shrink-0">#2</span>
            <input
              type="text"
              placeholder="e.g. Practice cardiac output formulas"
              value={priority2}
              onChange={(e) => setPriority2(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-neutral-900 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 p-2 bg-[#F5F5F3] rounded-xl border border-gray-200">
            <span className="text-xs font-bold text-[#C8102E] shrink-0">#3</span>
            <input
              type="text"
              placeholder="e.g. Outline take-home essay thesis"
              value={priority3}
              onChange={(e) => setPriority3(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-neutral-900 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION C: Study Blocks */}
      <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-700" />
            C. Study Blocks (Up to 3)
          </h3>
          <span className="text-xs font-bold text-neutral-500 uppercase">Structured Revision</span>
        </div>

        <div className="space-y-3">
          {studyBlocks.map((block, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 p-3 bg-[#F5F5F3] rounded-xl border border-gray-200">
              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Time</label>
                <input
                  type="text"
                  placeholder="e.g. 6:00–7:00 PM"
                  value={block.time}
                  onChange={(e) => updateStudyBlock(idx, 'time', e.target.value)}
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-neutral-900 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Course / Topic</label>
                <input
                  type="text"
                  placeholder="e.g. AUPSY 103 / Ch. 4"
                  value={block.course}
                  onChange={(e) => updateStudyBlock(idx, 'course', e.target.value)}
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-[#C8102E] focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Study Strategy</label>
                <input
                  type="text"
                  placeholder="e.g. active recall flashcards"
                  value={block.strategy}
                  onChange={(e) => updateStudyBlock(idx, 'strategy', e.target.value)}
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-neutral-800 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Planned Break</label>
                <input
                  type="text"
                  placeholder="e.g. 15-min walk & water"
                  value={block.breakPlan}
                  onChange={(e) => updateStudyBlock(idx, 'breakPlan', e.target.value)}
                  className="w-full p-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-emerald-800 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION D & E: Recovery Plan & Exam/Travel Checklist side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SECTION D: Recovery Plan */}
        <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-700" />
              D. Recovery Plan
            </h3>
            <span className="text-[10px] font-bold text-neutral-500 uppercase">Sleep & Fueling</span>
          </div>

          <div className="space-y-2">
            {recoveryChecklist.map((item) => (
              <label key={item.id} className="flex items-center gap-2.5 text-xs font-semibold text-neutral-800 cursor-pointer p-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleRecoveryItem(item.id)}
                  className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                />
                <span className={item.done ? 'line-through text-gray-400' : ''}>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SECTION E: Exam and Travel Checklist */}
        <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-[#C8102E]" />
              E. Exam and Travel Checklist
            </h3>
            <span className="text-[10px] font-bold text-neutral-500 uppercase">Packing & Logistics</span>
          </div>

          <div className="space-y-2">
            {examChecklist.map((item) => (
              <label key={item.id} className="flex items-center gap-2.5 text-xs font-semibold text-neutral-800 cursor-pointer p-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleExamChecklistItem(item.id)}
                  className="w-4 h-4 text-[#C8102E] rounded border-gray-300 focus:ring-[#C8102E] cursor-pointer"
                />
                <span className={item.done ? 'line-through text-gray-400' : ''}>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION F: Brain Dump and Support Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Brain Dump */}
        <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-neutral-900 border-b border-gray-100 pb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>F1. Formulas, Memory Triggers & Essay Points</span>
          </div>
          <p className="text-[11px] text-neutral-500">
            Jot down key equations, acronyms, essay points, or quick reminders:
          </p>
          <textarea
            rows={4}
            placeholder="e.g. TEST EXAM PDF, formulas, key essay points..."
            value={brainDump}
            onChange={(e) => setBrainDump(e.target.value)}
            className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
          />
        </div>

        {/* Support Plan */}
        <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-neutral-900 border-b border-gray-100 pb-2">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>F2. Support Plan & Key Contacts</span>
          </div>
          <p className="text-[11px] text-neutral-500">
            Who I can contact if I need help (Professors, SAS Forum L1-085, Counselling):
          </p>
          <textarea
            rows={4}
            placeholder="e.g. Prof. Smith (Office Hours Wed 2-4pm), SAS Forum L1-085 (780-679-1132), Augustana Counselling..."
            value={supportPlan}
            onChange={(e) => setSupportPlan(e.target.value)}
            className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
          />
        </div>
      </div>
    </div>
  );
};
