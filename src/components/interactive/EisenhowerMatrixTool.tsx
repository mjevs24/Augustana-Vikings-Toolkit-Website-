import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle, Calendar, Users, XCircle, Save, FileDown, RotateCcw } from 'lucide-react';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

interface Task {
  id: string;
  text: string;
  quadrant: 'doFirst' | 'schedule' | 'delegate' | 'eliminate';
  completed: boolean;
}

export const EisenhowerMatrixTool: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTaskText, setNewTaskText] = useState('');
  const [targetQuadrant, setTargetQuadrant] = useState<'doFirst' | 'schedule' | 'delegate' | 'eliminate'>('doFirst');
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [notification, setNotification] = useState<{ type: 'save' | 'clear' | 'pdf'; message: string } | null>(null);

  const addTask = () => {
    if (!newTaskText.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        quadrant: targetQuadrant,
        completed: false
      }
    ]);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleConfirmReset = () => {
    setTasks([]);
    setNewTaskText('');
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
        title: 'Eisenhower Decision Matrix Worksheet',
        subtitle: 'Augustana Vikings Academic & Athletic Task Prioritization',
        dateStr: currentDate,
        filename: `Augustana_Eisenhower_Matrix_${todayIso}.pdf`,
        sections: [
          {
            label: '1. DO FIRST (Urgent & Important)',
            value: tasks.filter(t => t.quadrant === 'doFirst').map(t => `[${t.completed ? '✓' : ' '}] ${t.text}`).join('\n') || 'None listed',
            highlight: 'red'
          },
          {
            label: '2. SCHEDULE (Important, Not Urgent)',
            value: tasks.filter(t => t.quadrant === 'schedule').map(t => `[${t.completed ? '✓' : ' '}] ${t.text}`).join('\n') || 'None listed',
            highlight: 'emerald'
          },
          {
            label: '3. DELEGATE / SHARE (Urgent, Not Important)',
            value: tasks.filter(t => t.quadrant === 'delegate').map(t => `[${t.completed ? '✓' : ' '}] ${t.text}`).join('\n') || 'None listed',
            highlight: 'gray'
          },
          {
            label: '4. ELIMINATE / LIMIT (Not Urgent, Not Important)',
            value: tasks.filter(t => t.quadrant === 'eliminate').map(t => `[${t.completed ? '✓' : ' '}] ${t.text}`).join('\n') || 'None listed',
            highlight: 'gray'
          }
        ],
        coachNote: 'Focus your energy on Quadrant 2 (Schedule) to prevent non-urgent priorities from turning into Quadrant 1 crises.'
      });

      setNotification({
        type: 'save',
        message: `Downloaded PDF: Augustana_Eisenhower_Matrix_${todayIso}.pdf`
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

  const quadrants = [
    {
      id: 'doFirst',
      title: '1. DO FIRST (Urgent & Important)',
      subtitle: 'Immediate attention required. High impact on goals.',
      color: 'border-red-300 bg-red-50 text-neutral-900',
      badgeBg: 'bg-red-700 text-white',
      icon: AlertCircle,
      examples: 'e.g. Midterm tomorrow, assignment due tonight, game prep'
    },
    {
      id: 'schedule',
      title: '2. SCHEDULE (Important, Not Urgent)',
      subtitle: 'Contributes to long-term success. Plan before urgent.',
      color: 'border-emerald-300 bg-emerald-50 text-neutral-900',
      badgeBg: 'bg-emerald-700 text-white',
      icon: Calendar,
      examples: 'e.g. Early paper draft, strength training, meal prep'
    },
    {
      id: 'delegate',
      title: '3. DELEGATE / SHARE (Urgent, Not Important)',
      subtitle: 'Needs doing, but may not require your sole personal focus.',
      color: 'border-amber-300 bg-amber-50 text-neutral-900',
      badgeBg: 'bg-amber-700 text-white',
      icon: Users,
      examples: 'e.g. Group project coordination, errands'
    },
    {
      id: 'eliminate',
      title: '4. ELIMINATE / LIMIT (Not Urgent, Not Important)',
      subtitle: 'Distractions that consume energy without yielding progress.',
      color: 'border-neutral-300 bg-stone-50 text-neutral-900',
      badgeBg: 'bg-neutral-600 text-white',
      icon: XCircle,
      examples: 'e.g. Phone scrolling or TV during study hours'
    }
  ] as const;

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 text-neutral-900 shadow-xs my-4 relative">
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

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-neutral-200 pb-4">
        <div>
          <h3 className="font-bold text-xl text-neutral-900 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-700 inline-block"></span>
            Eisenhower Decision Matrix
          </h3>
          <p className="text-xs text-neutral-600 mt-1">
            Prioritize what drives your academic and athletic progress.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSaveAsPdf}
            className="px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-white" />
            <span>Save as PDF</span>
          </button>
          <button
            onClick={() => setShowResetConfirmation(true)}
            className="px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-neutral-800 font-bold text-xs uppercase tracking-wider border border-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-600" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {notification && (
        <div
          className={`mb-6 p-3 rounded-xl text-xs font-bold flex items-center gap-2 border ${
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

      {/* Task Input Form */}
      <div className="bg-stone-50 p-4 rounded-xl border border-neutral-200 mb-6">
        <div className="text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
          Add New Task or Commitment
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Type task or commitment..."
            className="flex-1 bg-white border border-neutral-200 rounded-xl px-4 py-2 text-sm text-neutral-900 focus:outline-none focus:border-red-700"
          />
          <select
            value={targetQuadrant}
            onChange={(e) => setTargetQuadrant(e.target.value as unknown as typeof targetQuadrant)}
            className="bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-red-700"
          >
            <option value="doFirst">1. Do First (Urgent & Important)</option>
            <option value="schedule">2. Schedule (Important, Not Urgent)</option>
            <option value="delegate">3. Delegate (Urgent, Not Important)</option>
            <option value="eliminate">4. Eliminate (Not Urgent, Not Important)</option>
          </select>
          <button
            onClick={addTask}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>
      </div>

      {/* Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quadrants.map((quad) => {
          const QuadIcon = quad.icon;
          const quadTasks = tasks.filter((t) => t.quadrant === quad.id);

          return (
            <div
              key={quad.id}
              className={`rounded-2xl border ${quad.color} p-4 flex flex-col justify-between min-h-[220px] transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${quad.badgeBg}`}>
                    {quad.title}
                  </span>
                  <QuadIcon className="w-5 h-5 text-neutral-600" />
                </div>
                <p className="text-xs text-neutral-700 mb-1">{quad.subtitle}</p>
                <p className="text-[11px] text-neutral-500 mb-4">{quad.examples}</p>

                {/* Task List */}
                <div className="space-y-2">
                  {quadTasks.length === 0 ? (
                    <div className="text-xs text-neutral-500 py-2 text-center">
                      No tasks in this quadrant
                    </div>
                  ) : (
                    quadTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                          task.completed
                            ? 'bg-stone-100/80 border-neutral-200 text-neutral-400 line-through'
                            : 'bg-white border-neutral-200 text-neutral-900 shadow-xs'
                        }`}
                      >
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="flex items-center gap-2.5 text-left flex-1 mr-2"
                        >
                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 ${
                              task.completed ? 'text-emerald-600' : 'text-neutral-400 hover:text-neutral-600'
                            }`}
                          />
                          <span className="font-medium">{task.text}</span>
                        </button>

                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-neutral-400 hover:text-red-700 p-1 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
