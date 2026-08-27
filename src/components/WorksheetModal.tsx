import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { PomodoroTool } from './interactive/PomodoroTool';
import { EisenhowerMatrixTool } from './interactive/EisenhowerMatrixTool';
import { TimeAuditTool } from './interactive/TimeAuditTool';
import { WeeklyGamePlanTool } from './interactive/WeeklyGamePlanTool';
import { SemesterGamePlanTool } from './interactive/SemesterGamePlanTool';
import { ExamWeekGamePlanTool } from './interactive/ExamWeekGamePlanTool';
import { BalanceWheelTool } from './interactive/BalanceWheelTool';
import { SleepPlannerTool } from './interactive/SleepPlannerTool';
import { WindDownBuilderTool } from './interactive/WindDownBuilderTool';
import { AwayGamePlannerTool } from './interactive/AwayGamePlannerTool';
import { SleepRecoveryCheckinTool } from './interactive/SleepRecoveryCheckinTool';
import { BoxBreathingTool } from './interactive/BoxBreathingTool';
import { StressCopingReflectionTool } from './interactive/StressCopingReflectionTool';
import { CognitiveReframingTool } from './interactive/CognitiveReframingTool';
import { PrePerformanceResetTool } from './interactive/PrePerformanceResetTool';
import { BuildMyFuelTool } from './interactive/BuildMyFuelTool';
import { PackMyGameBagTool } from './interactive/PackMyGameBagTool';

interface WorksheetModalProps {
  toolId: string | null;
  onClose: () => void;
}

export const WorksheetModal: React.FC<WorksheetModalProps> = ({ toolId, onClose }) => {
  if (!toolId) return null;

  const renderTool = () => {
    switch (toolId) {
      case 'pomodoro-timer':
        return <PomodoroTool />;
      case 'eisenhower-matrix':
        return <EisenhowerMatrixTool />;
      case 'time-audit-tool':
        return <TimeAuditTool />;
      case 'weekly-game-plan':
        return <WeeklyGamePlanTool />;
      case 'semester-game-plan':
        return <SemesterGamePlanTool />;
      case 'assignment-micro-breakdown':
      case 'exam-week-plan':
        return <ExamWeekGamePlanTool />;
      case 'weekly-energy-allocation':
      case 'balance-wheel':
        return <BalanceWheelTool />;
      case 'sleep-planner':
      case 'sleep-calculator':
        return <SleepPlannerTool />;
      case 'wind-down-builder':
        return <WindDownBuilderTool />;
      case 'away-game-planner':
      case 'travel-sleep-planner':
        return <AwayGamePlannerTool />;
      case 'sleep-recovery-checkin':
      case 'cbti-sleep-audit':
      case 'post-game-recovery-audit':
        return <SleepRecoveryCheckinTool />;
      case 'meal-builder':
      case 'pack-my-game-bag':
        return <PackMyGameBagTool />;
      case 'build-my-fuel':
        return <BuildMyFuelTool />;
      case 'box-breathing':
        return <BoxBreathingTool />;
      case 'stress-reflection':
        return <StressCopingReflectionTool />;
      case 'cbt-reframe':
        return <CognitiveReframingTool />;
      case 'pre-performance-reset':
        return <PrePerformanceResetTool />;
      default:
        return <WeeklyGamePlanTool />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-neutral-200 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto text-neutral-900 p-4 sm:p-6 shadow-2xl relative my-auto">
        {/* Close button */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4 no-print">
          <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-red-700" /> Interactive Student Tool
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 text-neutral-600 hover:text-neutral-900 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Render tool component */}
        <div>{renderTool()}</div>
      </div>
    </div>
  );
};
