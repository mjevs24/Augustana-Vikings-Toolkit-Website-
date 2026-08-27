import React, { useState } from 'react';
import { Bus, Clock, CheckSquare, Sparkles, FileDown, RotateCcw, CheckCircle2 } from 'lucide-react';
import { downloadWorksheetPdf } from '../../lib/pdfExporter';

export const AwayGamePlannerTool: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState('Team Bus / Highway Travel');
  const [plannedRestWindows, setPlannedRestWindows] = useState('');

  const [travelKitChecklist, setTravelKitChecklist] = useState([
    { id: '1', text: 'Comfortable blackout eye mask', done: false },
    { id: '2', text: 'Noise-canceling earplugs or headphones', done: false },
    { id: '3', text: 'Personal neck support pillow or travel blanket', done: false },
    { id: '4', text: 'Breathable travel clothing & temperature layers', done: false },
    { id: '5', text: 'Hydration bottle & post-game recovery snack', done: false },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setTravelKitChecklist(
      travelKitChecklist.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleReset = () => {
    setDestination('');
    setTravelMode('Team Bus / Highway Travel');
    setPlannedRestWindows('');
    setTravelKitChecklist([
      { id: '1', text: 'Comfortable blackout eye mask', done: false },
      { id: '2', text: 'Noise-canceling earplugs or headphones', done: false },
      { id: '3', text: 'Personal neck support pillow or travel blanket', done: false },
      { id: '4', text: 'Breathable travel clothing & temperature layers', done: false },
      { id: '5', text: 'Hydration bottle & post-game recovery snack', done: false },
    ]);
    setNotification('Travel planner reset to default.');
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

    const finalDest = destination.trim() || 'Away Game / Road Trip';
    const kitSummary = travelKitChecklist
      .map((item) => `${item.done ? '[X]' : '[ ]'} ${item.text}`)
      .join('\n');

    await downloadWorksheetPdf({
      title: 'Away-Game Sleep & Recovery Planner',
      subtitle: 'Travel Sleep Hygiene & Practical Rest Strategy',
      dateStr: todayFormatted,
      filename: `Augustana_Away_Game_Planner_${todayIso}.pdf`,
      sections: [
        {
          heading: 'Travel Details & Itinerary',
          content: `Destination / Opponent: ${finalDest}\nTravel Mode: ${travelMode}`,
          highlight: 'gray',
        },
        {
          heading: 'Identified Rest & Recovery Windows',
          content: plannedRestWindows.trim() || 'Identify opportunities for quiet rest during bus rides, hotel downtimes, or between competition sessions.',
          highlight: 'emerald',
        },
        {
          heading: 'Travel Sleep Kit Checklist',
          content: kitSummary,
          highlight: 'gray',
        },
      ],
      coachHeading: 'Travel Recovery Coaching Tip',
      coachNote:
        'Road trip schedules and bus travel inevitably disrupt typical sleep routines. Focus on controlling what you can: creating a quiet environment, getting rest when opportunities arise, and keeping hydrated.',
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
            <Bus className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xl">Away-Game Sleep & Recovery Planner</h3>
            <p className="text-xs text-red-100">Identify realistic rest windows, pack travel essentials, and maintain recovery on the road</p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Travel Itinerary */}
        <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-4">
          <h4 className="font-bold text-xs uppercase text-neutral-800 tracking-wider flex items-center gap-2">
            <Bus className="w-4 h-4 text-[#C8102E]" /> Travel Itinerary & Context
          </h4>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Destination / Opponent</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., ACAC Weekend Away Series at Red Deer / Calgary..."
              className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2 text-sm text-neutral-900 focus:border-[#C8102E] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Travel Mode</label>
            <select
              value={travelMode}
              onChange={(e) => setTravelMode(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2 text-sm font-bold text-neutral-900"
            >
              <option value="Team Bus / Highway Travel">Team Bus / Highway Travel</option>
              <option value="Passenger Vans">Passenger Vans</option>
              <option value="Flight & Hotel Stay">Flight & Hotel Stay</option>
              <option value="Same-Day Round Trip">Same-Day Round Trip</option>
            </select>
          </div>
        </div>

        {/* Realistic Rest Opportunities */}
        <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-2">
          <h4 className="font-bold text-xs uppercase text-neutral-800 tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C8102E]" /> Rest & Recovery Opportunities
          </h4>
          <p className="text-xs text-neutral-500">
            Travel can disrupt schedules. Identify practical windows for quiet rest, relaxation, or short sleep during bus rides, hotel downtimes, or between games.
          </p>
          <textarea
            rows={4}
            value={plannedRestWindows}
            onChange={(e) => setPlannedRestWindows(e.target.value)}
            placeholder="e.g., Use the 2-hour bus ride after lunch for quiet rest with headphones; schedule a 30-min relaxation window in hotel room before pre-game meal..."
            className="w-full bg-white border border-neutral-200 rounded-xl p-3 text-sm text-neutral-900 focus:border-[#C8102E] outline-none"
          />
        </div>
      </div>

      {/* Travel Kit Checklist */}
      <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200">
        <h4 className="font-bold text-xs uppercase text-neutral-800 tracking-wider mb-3 flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-[#C8102E]" /> Travel Sleep & Recovery Kit Checklist
        </h4>
        <div className="space-y-2">
          {travelKitChecklist.map((item) => (
            <label
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                item.done
                  ? 'bg-neutral-100 border-neutral-200 text-neutral-400 line-through'
                  : 'bg-white border-neutral-200 text-neutral-800 hover:border-[#C8102E] font-medium'
              }`}
            >
              <input type="checkbox" checked={item.done} onChange={() => {}} className="rounded border-neutral-300 text-[#C8102E] focus:ring-[#C8102E]" />
              <span>{item.text}</span>
            </label>
          ))}
        </div>
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
