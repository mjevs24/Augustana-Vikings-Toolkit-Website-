import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, Flame, Clock } from 'lucide-react';

export const PomodoroTool: React.FC = () => {
  const [mode, setMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [taskLog, setTaskLog] = useState<{ id: string; name: string; completedAt: string }[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const modeDurations = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const modeLabels = {
    work: 'Focus Block (25m)',
    shortBreak: 'Short Break (5m)',
    longBreak: 'Long Break (15m)',
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);

  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {
      // Audio context fallback
    }
  };

  const handleSessionComplete = () => {
    setIsRunning(false);
    playBeep();

    if (mode === 'work') {
      const newCount = completedSessions + 1;
      setCompletedSessions(newCount);
      if (currentTask.trim()) {
        setTaskLog((prev) => [
          {
            id: Date.now().toString(),
            name: currentTask,
            completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
          ...prev,
        ]);
      }

      if (newCount % 4 === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('work');
    }
  };

  const switchMode = (newMode: 'work' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(modeDurations[newMode]);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(modeDurations[mode]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((modeDurations[mode] - timeLeft) / modeDurations[mode]) * 100;

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 text-neutral-900 shadow-sm max-w-2xl mx-auto my-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-neutral-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-50 text-red-700 rounded-xl border border-red-200">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-neutral-900">Focus Study Timer</h3>
            <p className="text-xs text-neutral-600">Break studying into structured 25-minute intervals</p>
          </div>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 rounded-lg bg-stone-100 text-neutral-600 hover:text-neutral-900 transition-colors"
          title={soundEnabled ? 'Mute sound' : 'Enable sound'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5 text-red-700" /> : <VolumeX className="w-5 h-5 text-neutral-400" />}
        </button>
      </div>

      {/* Mode Selectors */}
      <div className="flex bg-stone-100 p-1.5 rounded-xl mb-6 border border-neutral-200">
        {(['work', 'shortBreak', 'longBreak'] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              mode === m ? 'bg-red-700 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900 hover:bg-stone-200'
            }`}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      {/* Timer Circle / Counter */}
      <div className="relative flex flex-col items-center justify-center my-6">
        {/* Progress Bar background */}
        <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden mb-6 border border-neutral-200">
          <div
            className="bg-red-700 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="text-6xl md:text-7xl font-mono font-extrabold tracking-tight text-neutral-900 mb-2">
          {formatTime(timeLeft)}
        </div>

        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-6">
          {mode === 'work' ? 'Focus Session In Progress' : 'Break In Progress'}
        </p>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-xs ${
              isRunning
                ? 'bg-amber-700 hover:bg-amber-800 text-white'
                : 'bg-red-700 hover:bg-red-800 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" /> Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" /> Start Timer
              </>
            )}
          </button>

          <button
            onClick={resetTimer}
            className="p-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-neutral-700 transition-colors border border-neutral-200"
            title="Reset timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Task Input */}
      <div className="mt-8 pt-6 border-t border-neutral-200">
        <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
          Current Focus Task
        </label>
        <input
          type="text"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          placeholder="e.g. Read Biology chapter or draft paper outline..."
          className="w-full bg-stone-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-red-700 transition-colors"
        />
      </div>

      {/* Completed Sessions Stats */}
      <div className="mt-6 flex items-center justify-between bg-stone-50 p-4 rounded-xl border border-neutral-200">
        <div className="flex items-center gap-3">
          <Flame className="w-5 h-5 text-red-700" />
          <div>
            <div className="text-xs text-neutral-500">Completed Sessions Today</div>
            <div className="text-sm font-bold text-neutral-900">{completedSessions} sessions ({completedSessions * 25} mins total)</div>
          </div>
        </div>

        {taskLog.length > 0 && (
          <div className="text-xs text-red-700 font-semibold">
            {taskLog.length} task log entries
          </div>
        )}
      </div>

      {/* Task Log list */}
      {taskLog.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="text-xs font-semibold text-neutral-600">Completed In This Session:</div>
          {taskLog.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-neutral-200 text-xs text-neutral-800">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                {item.name}
              </span>
              <span className="text-neutral-500 font-mono">{item.completedAt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
