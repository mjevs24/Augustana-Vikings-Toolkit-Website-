import React, { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  Save,
  Sparkles,
  FileDown,
  RotateCcw,
  MessageSquare,
  Lightbulb,
  Shield,
  FileText
} from 'lucide-react';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

const initialFormData = {
  situation: '',
  automaticThought: '',
  evidenceFor: '',
  evidenceAgainst: '',
  balancedThought: '',
  actionIControl: '',
};

export const CognitiveReframingTool: React.FC = () => {
  const [situation, setSituation] = useState<string>(initialFormData.situation);
  const [automaticThought, setAutomaticThought] = useState<string>(initialFormData.automaticThought);
  const [evidenceFor, setEvidenceFor] = useState<string>(initialFormData.evidenceFor);
  const [evidenceAgainst, setEvidenceAgainst] = useState<string>(initialFormData.evidenceAgainst);
  const [balancedThought, setBalancedThought] = useState<string>(initialFormData.balancedThought);
  const [actionIControl, setActionIControl] = useState<string>(initialFormData.actionIControl);

  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [notification, setNotification] = useState<{ type: 'save' | 'clear' | 'pdf'; message: string } | null>(null);

  const handleConfirmReset = () => {
    setSituation(initialFormData.situation);
    setAutomaticThought(initialFormData.automaticThought);
    setEvidenceFor(initialFormData.evidenceFor);
    setEvidenceAgainst(initialFormData.evidenceAgainst);
    setBalancedThought(initialFormData.balancedThought);
    setActionIControl(initialFormData.actionIControl);

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
        title: 'Practice Cognitive Reframing (CBT 3-Step) Worksheet',
        subtitle: 'Student-Athlete Mental Performance Reframing Reflection',
        dateStr: currentDate,
        filename: `Augustana_Cognitive_Reframing_${todayIso}.pdf`,
        sections: [
          { label: '1. Situation ("What happened?")', value: situation, highlight: 'gray' },
          { label: '2. Automatic Thought ("First thought?")', value: automaticThought, highlight: 'red' },
          { label: '3. Evidence For', value: evidenceFor, highlight: 'gray' },
          { label: '4. Evidence Against', value: evidenceAgainst, highlight: 'emerald' },
          { label: '5. More Balanced Thought', value: balancedThought, highlight: 'red' },
          { label: '6. Action I Can Control', value: actionIControl, highlight: 'emerald' }
        ],
        coachNote: 'One difficult performance does not define your season. Focus on the next controllable step.'
      });

      setNotification({
        type: 'save',
        message: `Downloaded PDF: Augustana_Cognitive_Reframing_${todayIso}.pdf`
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
            AUGUSTANA VIKINGS ATHLETICS • CBT TOOLKIT
          </div>

          <h1 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tight text-neutral-900 font-athletic">
            PRACTICE COGNITIVE REFRAMING (CBT 3-STEP) WORKSHEET
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 font-medium mt-2 leading-relaxed max-w-3xl">
            Catch, challenge, and reframe unhelpful high-stress thought patterns into objective evidence and controllable action steps.
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
      <div className="bg-[#F5F5F3] p-5 sm:p-6 rounded-3xl border border-gray-300 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C8102E]" />
            Cognitive Reframe Reflection Form • {currentDate}
          </h3>
          <span className="text-[11px] font-bold text-neutral-500 uppercase">Local Device Storage</span>
        </div>

        <div className="space-y-4">
          {/* 1. Situation */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-300 shadow-xs space-y-2">
            <label className="block text-xs font-bold text-neutral-900">
              1. Situation: <span className="text-neutral-600 font-medium">"What happened?"</span>
            </label>
            <textarea
              rows={2}
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Describe the objective event without emotional judgements..."
              className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>

          {/* 2. Automatic Thought */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-300 shadow-xs space-y-2">
            <label className="block text-xs font-bold text-neutral-900">
              2. Automatic Thought: <span className="text-neutral-600 font-medium">"What was your first thought?"</span>
            </label>
            <textarea
              rows={2}
              value={automaticThought}
              onChange={(e) => setAutomaticThought(e.target.value)}
              placeholder="Write down your unfiltered reaction or fear..."
              className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>

          {/* 3 & 4. Evidence Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-300 shadow-xs space-y-2">
              <label className="block text-xs font-bold text-neutral-900">
                3. Evidence For
              </label>
              <textarea
                rows={3}
                value={evidenceFor}
                onChange={(e) => setEvidenceFor(e.target.value)}
                placeholder="What facts support your automatic thought?"
                className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              />
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-300 shadow-xs space-y-2">
              <label className="block text-xs font-bold text-neutral-900">
                4. Evidence Against
              </label>
              <textarea
                rows={3}
                value={evidenceAgainst}
                onChange={(e) => setEvidenceAgainst(e.target.value)}
                placeholder="What facts contradict or challenge your fear?"
                className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              />
            </div>
          </div>

          {/* 5. More Balanced Thought */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-300 shadow-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <label className="text-xs font-bold text-neutral-900">
                5. More Balanced Thought
              </label>
              <span className="text-[11px] font-semibold text-[#C8102E] flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                Prompt: "If your teammate experienced this instead of you, what would you tell them?"
              </span>
            </div>
            <textarea
              rows={3}
              value={balancedThought}
              onChange={(e) => setBalancedThought(e.target.value)}
              placeholder="If your teammate experienced this instead of you, what would you tell them?"
              className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>

          {/* 6. Action I Can Control */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-300 shadow-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <label className="text-xs font-bold text-neutral-900">
                6. Action I Can Control
              </label>
              <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                Prompt: "What is one small action I can take today?"
              </span>
            </div>
            <input
              type="text"
              value={actionIControl}
              onChange={(e) => setActionIControl(e.target.value)}
              placeholder="What is one small action I can take today?"
              className="w-full p-3 bg-[#F5F5F3] border border-gray-300 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>
        </div>

        {/* Coach's Perspective Summary */}
        <div className="mt-4 p-5 rounded-2xl bg-black text-white border border-neutral-800 space-y-1.5 shadow-md">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
            <Sparkles className="w-4 h-4 text-[#C8102E]" />
            Coach's Perspective
          </div>
          <p className="text-sm font-medium italic text-neutral-100 leading-relaxed">
            "One difficult performance does not define your season. Focus on the next controllable step."
          </p>
        </div>
      </div>
    </div>
  );
};

