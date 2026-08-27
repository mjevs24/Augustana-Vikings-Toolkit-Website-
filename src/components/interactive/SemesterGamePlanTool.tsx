import React, { useState } from 'react';
import {
  Calendar,
  AlertTriangle,
  Plus,
  Trash2,
  CheckCircle2,
  BookOpen,
  Luggage,
  Award,
  Sparkles,
  AlertCircle,
  RotateCcw,
  Save,
  FileDown,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Briefcase,
  User,
  Info,
  X
} from 'lucide-react';
import { downloadWorksheetPdf, WorksheetPdfSection } from '../../lib/pdfExporter';

export interface SemesterEvent {
  id: string;
  month: 'September' | 'October' | 'November' | 'December';
  weekNum: number;
  course: string; // Free-text course code or category e.g. AUENG 102, Work, Personal
  title: string;
  category: 'assignment' | 'exam' | 'travel' | 'practice' | 'work' | 'personal' | 'other';
  dateStr: string;
  isHighImpact: boolean;
  notes?: string;
  completed?: boolean;
}

export interface ReflectionsState {
  busiestWeeks: string;
  earlyPrep: string;
  supportNeeds: string;
}

export const SemesterGamePlanTool: React.FC = () => {
  // Real Worksheet State - Defaults to TRUE BLANK starting state
  const [events, setEvents] = useState<SemesterEvent[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [reflections, setReflections] = useState<ReflectionsState>({
    busiestWeeks: '',
    earlyPrep: '',
    supportNeeds: '',
  });

  // UI States
  const [newCourseInput, setNewCourseInput] = useState('');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [showExampleModal, setShowExampleModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [notification, setNotification] = useState<{ type: 'save' | 'clear' | 'pdf'; message: string } | null>(null);

  // Accordion state for months (collapsed by default)
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({
    September: false,
    October: false,
    November: false,
    December: false,
  });

  // New Event Form State
  const [newEvent, setNewEvent] = useState<Partial<SemesterEvent>>({
    month: 'September',
    weekNum: 1,
    course: '',
    title: '',
    category: 'assignment',
    dateStr: '',
    isHighImpact: false,
    notes: '',
  });

  // Expand / Collapse Accordion Helpers
  const toggleMonthExpand = (month: string) => {
    setExpandedMonths((prev) => ({ ...prev, [month]: !prev[month] }));
  };

  const handleExpandAllMonths = () => {
    setExpandedMonths({
      September: true,
      October: true,
      November: true,
      December: true,
    });
  };

  const handleCollapseAllMonths = () => {
    setExpandedMonths({
      September: false,
      October: false,
      November: false,
      December: false,
    });
  };

  // Course / Category management
  const handleAddCourse = () => {
    if (!newCourseInput.trim()) return;
    const formatted = newCourseInput.trim();
    if (!courses.includes(formatted)) {
      setCourses([...courses, formatted]);
    }
    setNewCourseInput('');
  };

  const handleRemoveCourse = (c: string) => {
    setCourses(courses.filter((item) => item !== c));
  };

  // Event creation
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.dateStr) return;

    const courseVal = (newEvent.course || '').trim() || 'General';
    const monthVal = (newEvent.month as any) || 'September';

    const created: SemesterEvent = {
      id: Date.now().toString(),
      month: monthVal,
      weekNum: Number(newEvent.weekNum) || 1,
      course: courseVal,
      title: newEvent.title.trim(),
      category: (newEvent.category as any) || 'assignment',
      dateStr: newEvent.dateStr.trim(),
      isHighImpact: Boolean(newEvent.isHighImpact),
      notes: (newEvent.notes || '').trim(),
      completed: false,
    };

    if (courseVal && !courses.includes(courseVal)) {
      setCourses((prev) => [...prev, courseVal]);
    }

    setEvents((prev) => [...prev, created]);

    // Automatically expand month that received an event
    setExpandedMonths((prev) => ({ ...prev, [monthVal]: true }));

    setShowAddModal(false);
    setNewEvent({
      month: 'September',
      weekNum: 1,
      course: '',
      title: '',
      category: 'assignment',
      dateStr: '',
      isHighImpact: false,
      notes: '',
    });
  };

  // Use Instructional Example
  const handleUseExample = () => {
    const exampleEvent: SemesterEvent = {
      id: Date.now().toString(),
      month: 'October',
      weekNum: 6,
      course: 'AUPSY 103',
      title: 'Midterm',
      category: 'exam',
      dateStr: 'October 14',
      isHighImpact: true,
      notes: 'Sample midterm exam example',
      completed: false,
    };

    if (!courses.includes('AUPSY 103')) {
      setCourses((prev) => [...prev, 'AUPSY 103']);
    }

    setEvents((prev) => [...prev, exampleEvent]);
    setExpandedMonths((prev) => ({ ...prev, October: true }));
    setShowExampleModal(false);

    setNotification({
      type: 'save',
      message: 'Example event added to your October schedule!',
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((item) => item.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setEvents(events.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  // True Reset
  const handleConfirmReset = () => {
    setEvents([]);
    setCourses([]);
    setReflections({
      busiestWeeks: '',
      earlyPrep: '',
      supportNeeds: '',
    });
    setExpandedMonths({
      September: false,
      October: false,
      November: false,
      December: false,
    });
    setNewCourseInput('');
    setNewEvent({
      month: 'September',
      weekNum: 1,
      course: '',
      title: '',
      category: 'assignment',
      dateStr: '',
      isHighImpact: false,
      notes: '',
    });

    setShowResetConfirmation(false);

    setNotification({
      type: 'clear',
      message: 'Planner reset. Worksheet returned to clean starting state.',
    });
    setTimeout(() => setNotification(null), 4000);
  };

  // Automatic Peak Workload Detection (Only genuine overlaps)
  const weekMap: Record<number, SemesterEvent[]> = {};
  events.forEach((ev) => {
    if (!weekMap[ev.weekNum]) weekMap[ev.weekNum] = [];
    weekMap[ev.weekNum].push(ev);
  });

  const highWorkloadWeeks = Object.entries(weekMap).filter(([_, evList]) => {
    const examCount = evList.filter((e) => e.category === 'exam').length;
    const assignmentCount = evList.filter((e) => e.category === 'assignment').length;
    const hasTravel = evList.some((e) => e.category === 'travel');
    const totalImpact = evList.filter((e) => e.isHighImpact).length;

    // Genuine overlap: travel + exam/assignment OR 2+ exams/assignments OR 3+ total deliverables
    return (hasTravel && (examCount > 0 || assignmentCount > 0)) || examCount >= 2 || (examCount + assignmentCount) >= 3 || totalImpact >= 2;
  });

  const monthsList = ['September', 'October', 'November', 'December'] as const;

  // Filtered Events
  const filteredEvents = events.filter((ev) => {
    const matchMonth = selectedMonthFilter === 'All' || ev.month === selectedMonthFilter;
    const matchCategory = selectedCategoryFilter === 'All' || ev.category === selectedCategoryFilter;
    return matchMonth && matchCategory;
  });

  // Export PDF using shared worksheet PDF exporter
  const handleSaveAsPdf = async () => {
    const todayIso = new Date().toISOString().split('T')[0];
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    setNotification({
      type: 'pdf',
      message: 'Generating your Augustana branded PDF...',
    });

    try {
      const pdfSections: WorksheetPdfSection[] = [];

      // Registered Courses & Categories
      pdfSections.push({
        heading: 'My Courses & Categories',
        value: courses.length > 0 ? courses.join(', ') : 'None registered',
        highlight: 'red',
      });

      // Scheduled Events by Month
      let totalEventsCount = 0;

      monthsList.forEach((m) => {
        const mEvents = events.filter((e) => e.month === m);
        if (mEvents.length > 0) {
          totalEventsCount += mEvents.length;
          const formattedEvents = mEvents
            .map((e) => {
              const statusStr = e.completed ? '[Done]' : e.isHighImpact ? '[High Priority]' : '';
              return `• ${e.dateStr} (Week ${e.weekNum}) - [${e.category.toUpperCase()}] ${e.course}: ${e.title} ${statusStr}${e.notes ? `\n   Notes: ${e.notes}` : ''}`;
            })
            .join('\n');

          pdfSections.push({
            heading: `${m} Events (${mEvents.length})`,
            value: formattedEvents,
            highlight: 'gray',
          });
        }
      });

      if (totalEventsCount === 0) {
        pdfSections.push({
          heading: 'Semester Events & Milestones',
          value: 'No events registered yet.',
          highlight: 'gray',
        });
      }

      // Conflict Analysis
      if (highWorkloadWeeks.length > 0) {
        const conflictText = highWorkloadWeeks
          .map(([wNum, evList]) => {
            const travelItems = evList.filter((e) => e.category === 'travel');
            const academicItems = evList.filter((e) => e.category === 'exam' || e.category === 'assignment');
            const monthName = evList[0]?.month || 'Semester';
            const itemsStr = evList.map((e) => `  - ${e.course}: ${e.title} (${e.dateStr})`).join('\n');
            return `Week ${wNum} (${monthName}) - ${academicItems.length} Deliverable(s)${travelItems.length > 0 ? ' + Travel' : ''}:\n${itemsStr}`;
          })
          .join('\n\n');

        pdfSections.push({
          heading: 'Peak Workload & Travel Conflicts',
          value: conflictText,
          highlight: 'red',
        });
      } else {
        pdfSections.push({
          heading: 'Peak Workload & Travel Conflicts',
          value: 'No workload or travel conflicts detected.',
          highlight: 'emerald',
        });
      }

      // Plan Ahead Reflections
      const hasReflections =
        reflections.busiestWeeks.trim() !== '' ||
        reflections.earlyPrep.trim() !== '' ||
        reflections.supportNeeds.trim() !== '';

      if (hasReflections) {
        const refLines: string[] = [];
        if (reflections.busiestWeeks.trim()) refLines.push(`Which weeks appear busiest?\n${reflections.busiestWeeks}`);
        if (reflections.earlyPrep.trim()) refLines.push(`What can I begin early?\n${reflections.earlyPrep}`);
        if (reflections.supportNeeds.trim()) refLines.push(`When might I need academic or team support?\n${reflections.supportNeeds}`);

        pdfSections.push({
          heading: 'Plan Ahead Reflections',
          value: refLines.join('\n\n'),
          highlight: 'gray',
        });
      }

      await downloadWorksheetPdf({
        title: 'Semester Game Plan',
        subtitle: 'Augustana Vikings Master Academic & Athletic Schedule',
        dateStr: currentDate,
        filename: `Augustana_Semester_Game_Plan_${todayIso}.pdf`,
        sections: pdfSections,
        coachNote: 'Map out your semester early, anticipate busy weeks, and communicate proactively with professors and coaches.',
      });

      setNotification({
        type: 'save',
        message: `Downloaded PDF: Augustana_Semester_Game_Plan_${todayIso}.pdf`,
      });
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      console.error(err);
      setNotification({
        type: 'clear',
        message: 'Unable to generate PDF. Please try again.',
      });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="space-y-6 bg-[#F5F5F3] p-4 sm:p-6 rounded-2xl border border-gray-300 text-neutral-900 font-sans print:bg-white print:p-0 print:border-none relative">
      {/* Reset Confirmation Modal */}
      {showResetConfirmation && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-neutral-900">Reset this worksheet?</h3>
            <p className="text-sm text-neutral-600 font-medium">
              This will return your planner to a clean starting state with 0 events, 0 courses, and blank reflections.
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
                Reset Planner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructional Example Modal */}
      {showExampleModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-300">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-[#C8102E]" />
                <h3 className="text-base font-bold text-neutral-900 uppercase">Instructional Example</h3>
              </div>
              <button
                onClick={() => setShowExampleModal(false)}
                className="text-gray-400 hover:text-neutral-900 font-bold text-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 font-medium">
              This example shows how a single major course milestone looks in your planner:
            </p>

            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold uppercase text-amber-900 px-2 py-0.5 bg-amber-200/60 rounded">
                  Type: Exam
                </span>
                <span className="font-bold text-[#C8102E] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  AUPSY 103
                </span>
              </div>
              <div className="pt-1">
                <div className="font-extrabold text-neutral-900 text-sm">Event: Midterm</div>
                <div className="text-neutral-600 font-medium mt-0.5">Date: October 14</div>
                <div className="text-red-700 font-bold mt-1">Priority: High</div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 italic">
              Note: Viewing this example does not add it to your planner unless you choose "Use This Example".
            </p>

            <div className="pt-2 border-t border-gray-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowExampleModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-neutral-800 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleUseExample}
                className="px-4 py-2 bg-[#C8102E] hover:bg-red-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Use This Example</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-300">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#C8102E]" />
                <h3 className="text-base font-bold text-neutral-900 uppercase">Add Semester Event</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-neutral-900 font-bold text-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Month *</label>
                  <select
                    value={newEvent.month}
                    onChange={(e) => setNewEvent({ ...newEvent, month: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-neutral-900 font-semibold focus:ring-[#C8102E]"
                  >
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Week Number (1-16) *</label>
                  <input
                    type="number"
                    min={1}
                    max={16}
                    value={newEvent.weekNum || 1}
                    onChange={(e) => setNewEvent({ ...newEvent, weekNum: Number(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-neutral-900 font-semibold focus:ring-[#C8102E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Event Type *</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-neutral-900 font-semibold focus:ring-[#C8102E]"
                  >
                    <option value="assignment">Assignment</option>
                    <option value="exam">Exam / Midterm</option>
                    <option value="travel">Varsity Travel</option>
                    <option value="practice">Practice / Competition</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Course or Category *</label>
                  <input
                    type="text"
                    placeholder="e.g., AUENG 102, Work, Personal"
                    value={newEvent.course || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, course: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-neutral-900 font-semibold focus:ring-[#C8102E]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Essay Outline, Midterm Exam, ACAC Tournament"
                  value={newEvent.title || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-neutral-900 font-semibold focus:ring-[#C8102E]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Date or Date Range *</label>
                  <input
                    type="text"
                    placeholder="e.g., October 10 or Oct 12-14"
                    value={newEvent.dateStr || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, dateStr: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-neutral-900 font-semibold focus:ring-[#C8102E]"
                    required
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 font-bold text-neutral-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(newEvent.isHighImpact)}
                      onChange={(e) => setNewEvent({ ...newEvent, isHighImpact: e.target.checked })}
                      className="w-4 h-4 text-[#C8102E] rounded border-gray-300 focus:ring-[#C8102E]"
                    />
                    <span>High Priority Deliverable</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Optional Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g., 20% of grade, travel letter required, etc."
                  value={newEvent.notes || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-neutral-900 font-medium focus:ring-[#C8102E]"
                />
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-neutral-800 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C8102E] hover:bg-red-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Header Banner */}
      <div className="border-b border-gray-300 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <div className="inline-block px-3 py-1 rounded bg-[#C8102E] text-white text-[10px] font-black uppercase tracking-widest mb-2">
              SEMESTER PLANNER
            </div>
            <h2 className="text-2xl sm:text-4xl font-black italic uppercase font-athletic text-neutral-900 tracking-tight">
              Semester Game Plan Worksheet
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1">
              <strong className="text-neutral-900">Core Goal:</strong> Map key academic, athletic, work, and personal commitments across your 4-month semester.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 no-print shrink-0">
            <button
              onClick={handleSaveAsPdf}
              className="px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
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

        {/* Optional Example Starter Card */}
        <div className="mt-3 p-4 bg-white rounded-xl border border-gray-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-neutral-900 uppercase">Not sure where to begin?</h4>
              <p className="text-xs text-neutral-600 font-medium mt-0.5">
                Start by adding one important assignment, exam, or travel weekend. You can continue building the planner throughout the semester.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 no-print">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-2 bg-[#C8102E] hover:bg-red-800 text-white text-xs font-bold uppercase rounded-lg transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add My First Event</span>
            </button>
            <button
              onClick={() => setShowExampleModal(true)}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-neutral-700 border border-gray-300 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer"
            >
              View Example
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

      {/* Workload & Travel Overlap Conflict Bar */}
      {highWorkloadWeeks.length === 0 ? (
        <div className="p-3 bg-emerald-50/90 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>No workload and travel overlaps detected yet.</span>
        </div>
      ) : (
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-300 shadow-xs space-y-3 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                Peak Workload & Travel Conflict Analysis
              </h3>
            </div>
            <span className="px-2.5 py-1 bg-amber-100 text-amber-900 text-[10px] font-black uppercase rounded-full border border-amber-300">
              {highWorkloadWeeks.length} Peak Week{highWorkloadWeeks.length === 1 ? '' : 's'} Detected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {highWorkloadWeeks.map(([weekNumStr, evList]) => {
              const weekNum = Number(weekNumStr);
              const travelItems = evList.filter((e) => e.category === 'travel');
              const academicItems = evList.filter((e) => e.category === 'exam' || e.category === 'assignment');
              const monthName = evList[0]?.month || 'Semester';

              return (
                <div key={weekNum} className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#C8102E]"></span>
                      Week {weekNum} ({monthName})
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded">
                      {academicItems.length} Deliverable{academicItems.length === 1 ? '' : 's'} {travelItems.length > 0 ? '+ Travel' : ''}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    {academicItems.map((item) => (
                      <div key={item.id} className="text-neutral-800 font-bold flex items-center gap-1">
                        <span className="text-[#C8102E]">• {item.course}:</span>
                        <span>{item.title} ({item.dateStr})</span>
                      </div>
                    ))}
                    {travelItems.map((item) => (
                      <div key={item.id} className="text-indigo-900 font-bold flex items-center gap-1">
                        <span className="text-indigo-700">• {item.course}:</span>
                        <span>{item.title} ({item.dateStr})</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1.5 border-t border-amber-200 text-[11px] text-amber-900 font-semibold italic flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>
                      {travelItems.length > 0
                        ? 'Suggestion: Provide travel letters to professors 2 weeks prior & plan travel study hours.'
                        : 'Suggestion: Begin preparation early in the preceding week.'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Enrolled Courses & Categories */}
      <div className="bg-white p-4 rounded-2xl border border-gray-300 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#C8102E]" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            My Courses & Categories:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {courses.length === 0 ? (
            <span className="text-xs text-neutral-500 italic">No courses added yet</span>
          ) : (
            courses.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F5F5F3] text-neutral-900 text-xs font-bold rounded-lg border border-gray-300"
              >
                <span>{c}</span>
                <button
                  onClick={() => handleRemoveCourse(c)}
                  className="hover:text-red-600 transition-colors text-gray-400 no-print cursor-pointer"
                  title="Remove course"
                >
                  ×
                </button>
              </span>
            ))
          )}

          <div className="flex items-center gap-1 no-print ml-1">
            <input
              type="text"
              placeholder="e.g., AUPSY 103, AUENG 102, Work, Personal"
              value={newCourseInput}
              onChange={(e) => setNewCourseInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCourse()}
              className="px-2.5 py-1 bg-gray-50 border border-gray-300 rounded text-xs font-semibold text-neutral-900 w-56 focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
            />
            <button
              onClick={handleAddCourse}
              className="px-2.5 py-1 bg-neutral-900 text-white rounded text-xs font-bold hover:bg-neutral-800 cursor-pointer"
            >
              + Add
            </button>
          </div>
        </div>
      </div>

      {/* Blank State Welcome Panel (Shown when no events exist) */}
      {events.length === 0 && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-300 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-red-50 text-[#C8102E] flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-lg font-bold text-neutral-900">Your semester plan is ready to build</h3>
            <p className="text-xs text-neutral-600 font-medium leading-relaxed">
              Add your courses and key dates from your syllabi and varsity schedule. Begin with major assignments, exams, and travel weekends.
            </p>
          </div>
          <div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-[#C8102E] hover:bg-red-800 text-white text-xs font-bold uppercase rounded-xl tracking-wider transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add First Event</span>
            </button>
          </div>
        </div>
      )}

      {/* Controls & Accordion Timeline Section */}
      <div className="space-y-4">
        {/* Section Title & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#C8102E]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              4-Month Timeline ({events.length} Total Events)
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 no-print">
            {/* Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {['All', 'September', 'October', 'November', 'December'].map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonthFilter(m)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    selectedMonthFilter === m
                      ? 'bg-neutral-900 text-white'
                      : 'bg-white text-neutral-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Expand / Collapse All */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={handleExpandAllMonths}
                className="text-neutral-600 hover:text-neutral-900 font-bold text-[11px] hover:underline cursor-pointer"
              >
                Expand All
              </button>
              <span className="text-gray-300">•</span>
              <button
                onClick={handleCollapseAllMonths}
                className="text-neutral-600 hover:text-neutral-900 font-bold text-[11px] hover:underline cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Accordion Month Sections */}
        <div className="space-y-3">
          {monthsList
            .filter((m) => selectedMonthFilter === 'All' || selectedMonthFilter === m)
            .map((monthName) => {
              const monthEvents = filteredEvents.filter((e) => e.month === monthName);
              const isExpanded = Boolean(expandedMonths[monthName]);

              return (
                <div
                  key={monthName}
                  className="bg-white rounded-2xl border border-gray-300 shadow-xs overflow-hidden transition-all"
                >
                  {/* Month Accordion Header */}
                  <div
                    onClick={() => toggleMonthExpand(monthName)}
                    className="bg-[#F5F5F3] px-5 py-3 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-200/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-neutral-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-neutral-600" />
                      )}
                      <h3 className="text-base font-black uppercase text-neutral-900 tracking-wide font-athletic italic">
                        {monthName}
                      </h3>
                      <span className="text-xs font-bold text-neutral-500 bg-white px-2.5 py-0.5 rounded-full border border-gray-300">
                        {monthEvents.length} event{monthEvents.length === 1 ? '' : 's'}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewEvent({ ...newEvent, month: monthName, course: courses[0] || '' });
                        setShowAddModal(true);
                      }}
                      className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1 no-print cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Event</span>
                    </button>
                  </div>

                  {/* Accordion Content Body */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 border-t border-gray-100">
                      {monthEvents.length === 0 ? (
                        <p className="text-xs text-neutral-500 italic py-2 text-center">
                          No events in {monthName}. Select "+ Add Event" to add key dates.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          {monthEvents.map((item) => {
                            let categoryBadge = {
                              bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
                              label: 'Assignment',
                              icon: <BookOpen className="w-3.5 h-3.5 text-emerald-700" />,
                            };

                            if (item.category === 'exam') {
                              categoryBadge = {
                                bg: 'bg-amber-100 text-amber-900 border-amber-300',
                                label: 'Midterm / Exam',
                                icon: <AlertCircle className="w-3.5 h-3.5 text-amber-700" />,
                              };
                            } else if (item.category === 'travel') {
                              categoryBadge = {
                                bg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
                                label: 'Varsity Travel',
                                icon: <Luggage className="w-3.5 h-3.5 text-indigo-700" />,
                              };
                            } else if (item.category === 'practice') {
                              categoryBadge = {
                                bg: 'bg-blue-100 text-blue-900 border-blue-300',
                                label: 'Practice / Game',
                                icon: <Award className="w-3.5 h-3.5 text-blue-700" />,
                              };
                            } else if (item.category === 'work') {
                              categoryBadge = {
                                bg: 'bg-stone-100 text-stone-900 border-stone-300',
                                label: 'Work',
                                icon: <Briefcase className="w-3.5 h-3.5 text-stone-700" />,
                              };
                            } else if (item.category === 'personal') {
                              categoryBadge = {
                                bg: 'bg-purple-100 text-purple-900 border-purple-300',
                                label: 'Personal',
                                icon: <User className="w-3.5 h-3.5 text-purple-700" />,
                              };
                            }

                            return (
                              <div
                                key={item.id}
                                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                                  item.completed
                                    ? 'bg-gray-50 border-gray-200 opacity-60'
                                    : item.isHighImpact
                                    ? 'bg-white border-2 border-[#C8102E]/40 shadow-xs'
                                    : 'bg-white border-gray-200'
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${categoryBadge.bg}`}>
                                      {categoryBadge.icon}
                                      <span>{categoryBadge.label}</span>
                                    </span>

                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-black text-[#C8102E] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                                        {item.course}
                                      </span>
                                      <span className="text-[11px] font-bold text-neutral-500">
                                        Wk {item.weekNum} ({item.dateStr})
                                      </span>
                                    </div>
                                  </div>

                                  <h4 className={`text-sm font-bold ${item.completed ? 'line-through text-gray-500' : 'text-neutral-900'}`}>
                                    {item.title}
                                  </h4>

                                  {item.notes && (
                                    <p className="text-xs text-neutral-600 mt-1 font-medium">
                                      {item.notes}
                                    </p>
                                  )}
                                </div>

                                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                                  <label className="flex items-center gap-1.5 cursor-pointer text-neutral-600 font-semibold hover:text-neutral-900 no-print">
                                    <input
                                      type="checkbox"
                                      checked={Boolean(item.completed)}
                                      onChange={() => handleToggleComplete(item.id)}
                                      className="w-3.5 h-3.5 text-[#C8102E] rounded border-gray-300 focus:ring-[#C8102E]"
                                    />
                                    <span className="text-[11px]">{item.completed ? 'Completed' : 'Mark Done'}</span>
                                  </label>

                                  {item.isHighImpact && (
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C8102E] bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                                      High Priority
                                    </span>
                                  )}

                                  <button
                                    onClick={() => handleDeleteEvent(item.id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors p-1 no-print cursor-pointer"
                                    title="Delete event"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Plan Ahead Reflection Section (Collapsible) */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-xs overflow-hidden">
        <div
          onClick={() => setShowReflection(!showReflection)}
          className="bg-[#F5F5F3] px-5 py-3 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-200/70 transition-colors"
        >
          <div className="flex items-center gap-2">
            {showReflection ? (
              <ChevronDown className="w-4 h-4 text-neutral-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            )}
            <Sparkles className="w-4 h-4 text-[#C8102E]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Plan Ahead Reflection
            </h3>
          </div>
          <span className="text-xs font-bold text-neutral-500">
            {showReflection ? 'Hide Prompts' : 'Expand Prompts'}
          </span>
        </div>

        {showReflection && (
          <div className="p-4 sm:p-5 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-neutral-800 mb-1">
                Which weeks appear busiest?
              </label>
              <textarea
                rows={2}
                placeholder="Identify 2-3 peak weeks where multiple exams, major assignments, or travel coincide."
                value={reflections.busiestWeeks}
                onChange={(e) => setReflections({ ...reflections, busiestWeeks: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 text-neutral-900 font-medium focus:ring-1 focus:ring-[#C8102E]"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">
                What can I begin early?
              </label>
              <textarea
                rows={2}
                placeholder="List specific tasks (reading, outlines, draft review) you can work on 1-2 weeks in advance."
                value={reflections.earlyPrep}
                onChange={(e) => setReflections({ ...reflections, earlyPrep: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 text-neutral-900 font-medium focus:ring-1 focus:ring-[#C8102E]"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">
                When might I need academic or team support?
              </label>
              <textarea
                rows={2}
                placeholder="Note dates to meet with professors, access tutoring, or coordinate with coaches."
                value={reflections.supportNeeds}
                onChange={(e) => setReflections({ ...reflections, supportNeeds: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-xl bg-gray-50 text-neutral-900 font-medium focus:ring-1 focus:ring-[#C8102E]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
