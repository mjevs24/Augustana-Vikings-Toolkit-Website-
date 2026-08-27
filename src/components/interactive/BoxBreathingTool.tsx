import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Shield } from 'lucide-react';

export const BoxBreathingTool: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)'>('Inhale');
  const [count, setCount] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 1) {
            return prevCount - 1;
          } else {
            setPhase((prevPhase) => {
              if (prevPhase === 'Inhale') return 'Hold (Full)';
              if (prevPhase === 'Hold (Full)') return 'Exhale';
              if (prevPhase === 'Exhale') return 'Hold (Empty)';
              setCyclesCompleted((c) => c + 1);
              return 'Inhale';
            });
            return 4;
          }
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const reset = () => {
    setIsActive(false);
    setPhase('Inhale');
    setCount(4);
  };

  const getPhaseDescription = () => {
    switch (phase) {
      case 'Inhale':
        return 'Inhale slowly through your nose into belly...';
      case 'Hold (Full)':
        return 'Hold air gently at full capacity...';
      case 'Exhale':
        return 'Exhale completely through mouth...';
      case 'Hold (Empty)':
        return 'Hold empty at bottom of breath...';
    }
  };

  const getRingScale = () => {
    if (phase === 'Inhale') return 1 + (4 - count) * 0.12;
    if (phase === 'Hold (Full)') return 1.48;
    if (phase === 'Exhale') return 1.48 - (4 - count) * 0.12;
    return 1.0;
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 text-neutral-900 shadow-xs my-4 text-center max-w-xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-2 text-red-700 font-bold text-xs uppercase tracking-wider">
        <Shield className="w-4 h-4" /> Nervous System Reset
      </div>
      <h3 className="text-xl font-bold text-neutral-900">4-4-4-4 Box Breathing Coach</h3>
      <p className="text-xs text-neutral-600 mt-1 mb-8">
        Calms stress and resets focus before games, presentations, or exams.
      </p>

      {/* Animated Circle */}
      <div className="relative flex items-center justify-center my-10 h-48">
        <div
          className="w-36 h-36 rounded-full border-4 border-red-700 bg-red-50 flex flex-col items-center justify-center transition-transform duration-1000 ease-linear shadow-sm"
          style={{ transform: `scale(${getRingScale()})` }}
        >
          <div className="text-4xl font-extrabold text-neutral-900 font-mono">{count}</div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-red-700 mt-1">{phase}</div>
        </div>
      </div>

      <p className="text-sm font-medium text-neutral-700 min-h-[24px] mb-6">
        {getPhaseDescription()}
      </p>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-xs ${
            isActive ? 'bg-amber-700 hover:bg-amber-800 text-white' : 'bg-red-700 hover:bg-red-800 text-white'
          }`}
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isActive ? 'Pause' : 'Start Reset'}
        </button>

        <button
          onClick={reset}
          className="p-3 bg-stone-100 hover:bg-stone-200 text-neutral-700 rounded-xl transition-colors border border-neutral-200"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="text-xs text-neutral-600 border-t border-neutral-200 pt-4 flex justify-between items-center px-4 font-medium">
        <span>Cycles Completed: <strong className="text-neutral-900">{cyclesCompleted}</strong></span>
        <span>Recommended: 4 Cycles</span>
      </div>
    </div>
  );
};
