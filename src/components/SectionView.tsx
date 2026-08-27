import React, { useState } from 'react';
import { ToolkitSection } from '../types';
import { CognitiveReframingExercise } from './interactive/CognitiveReframingExercise';
import timeManagementEditorialImg from '../assets/images/time_management_editorial_1786555212937.jpg';
import academicBalanceEditorialImg from '../assets/images/academic_balance_editorial_1786555501759.jpg';
import stressManagementEditorialImg from '../assets/images/stress_management_editorial_1786555925061.jpg';
import sleepRecoveryEditorialImg from '../assets/images/sleep_recovery_editorial_1786556160337.jpg';
import nutritionEditorialImg from '../assets/images/nutrition_editorial_1786556406595.jpg';
import {
  ExternalLink,
  Download,
  Sparkles,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  ChevronLeft,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SectionViewProps {
  section: ToolkitSection;
  onBackToHome: () => void;
  onOpenInteractiveTool: (toolId: string) => void;
}

export const SectionView: React.FC<SectionViewProps> = ({
  section,
  onBackToHome,
  onOpenInteractiveTool,
}) => {
  const [expandedStrategyId, setExpandedStrategyId] = useState<string | null>(null);

  const toggleStrategy = (id: string) => {
    setExpandedStrategyId(expandedStrategyId === id ? null : id);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10 bg-[#F5F5F3] text-neutral-900 min-h-screen">
      {/* Back Button */}
      <div>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-neutral-900 hover:text-[#C8102E] hover:border-[#C8102E] border border-gray-300 text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
        >
          <ChevronLeft className="w-4 h-4 text-[#C8102E]" />
          <span>Back to All Toolkit Sections</span>
        </button>
      </div>

      {/* TIME MANAGEMENT EDITORIAL HERO BANNER */}
      {section.id === 'time-management' && (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-300 shadow-md bg-neutral-900">
          <img
            src={timeManagementEditorialImg}
            alt="Student-Athlete Time Management Editorial Visual"
            className="w-full h-[180px] sm:h-[220px] md:h-[260px] object-cover object-center grayscale contrast-105"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* ACADEMIC BALANCE EDITORIAL HERO BANNER */}
      {section.id === 'academic-balance' && (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-300 shadow-md bg-neutral-900">
          <img
            src={academicBalanceEditorialImg}
            alt="Academic Balance Court to Notebook Lines Transition Visual"
            className="w-full h-[180px] sm:h-[220px] md:h-[260px] object-cover object-center grayscale contrast-105"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* STRESS MANAGEMENT EDITORIAL HERO BANNER */}
      {section.id === 'stress-management' && (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-300 shadow-md bg-neutral-900">
          <img
            src={stressManagementEditorialImg}
            alt="Stress Management Tangled to Untangled Shoelace Visual"
            className="w-full h-[180px] sm:h-[220px] md:h-[260px] object-cover object-center grayscale contrast-105"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* SLEEP & RECOVERY EDITORIAL HERO BANNER */}
      {section.id === 'sleep-recovery' && (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-300 shadow-md bg-neutral-900">
          <img
            src={sleepRecoveryEditorialImg}
            alt="Sleep and Recovery Empty Gymnasium After Practice Visual"
            className="w-full h-[180px] sm:h-[220px] md:h-[260px] object-cover object-center grayscale contrast-105"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* PERFORMANCE NUTRITION EDITORIAL HERO BANNER */}
      {section.id === 'nutrition' && (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-300 shadow-md bg-neutral-900">
          <img
            src={nutritionEditorialImg}
            alt="Performance Nutrition Game Day Packing Editorial Flat-Lay Visual"
            className="w-full h-[180px] sm:h-[220px] md:h-[260px] object-cover object-center grayscale contrast-105"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* 1. SECTION BANNER */}
      <div className="rounded-2xl p-6 sm:p-8 border border-gray-300 bg-black text-white shadow-md relative overflow-hidden border-b-4 border-b-[#C8102E]">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded bg-[#C8102E] text-white text-[11px] font-black uppercase tracking-widest mb-3">
            STUDENT-ATHLETE WELL-BEING TOOLKIT
          </div>

          <h1 className="text-3xl sm:text-5xl font-black italic uppercase font-athletic tracking-tight text-white mb-3">
            {section.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
            {section.subtitle}
          </p>
        </div>
      </div>

      {/* 2. WHY THIS MATTERS FOR STUDENT-ATHLETES */}
      <section className="bg-white border border-gray-300 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="p-2 rounded-xl bg-red-50 text-[#C8102E] border border-red-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Why This Matters For Student-Athletes
          </h2>
        </div>

        <p className="text-neutral-800 text-base leading-relaxed font-normal">
          {section.whyThisMatters}
        </p>

        {section.evidenceHighlight && (
          <div className="bg-[#F5F5F3] p-4 rounded-xl border-l-4 border-[#C8102E] border-gray-300 text-sm text-neutral-900 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block mb-0.5">Evidence Insight:</span>
              <span className="text-neutral-700">{section.evidenceHighlight}</span>
            </div>
          </div>
        )}
      </section>

      {/* 3. PRACTICAL STRATEGIES */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Practical Strategies
          </h2>
          <p className="text-base text-gray-700 mt-1 font-normal">Evidence-informed frameworks for university athletic schedules</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.strategies.map((strat, idx) => {
            const isExpanded = expandedStrategyId === strat.id;
            const visiblePoints = isExpanded ? strat.keyPoints : strat.keyPoints.slice(0, 3);

            return (
              <div
                key={strat.id}
                className="bg-white border border-gray-300 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-400 transition-all shadow-xs border-t-4 border-t-[#C8102E]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded bg-red-50 text-[#C8102E] font-bold text-xs flex items-center justify-center border border-red-200">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Strategy</span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 mb-2 leading-snug">{strat.title}</h3>
                  <p className="text-base text-gray-700 mb-4 leading-relaxed font-normal">{strat.summary}</p>

                  <ul className="space-y-2 mb-4 text-base text-neutral-800 font-normal">
                    {visiblePoints.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#C8102E] shrink-0 mt-2"></span>
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {strat.keyPoints.length > 3 && (
                    <button
                      onClick={() => toggleStrategy(strat.id)}
                      className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1 mb-3"
                    >
                      <span>{isExpanded ? 'Show less' : 'Learn more'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>

                <div>
                  {strat.athleteTip && (
                    <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-neutral-800 bg-[#F5F5F3] p-3 rounded-xl border border-gray-300">
                      <strong className="text-[#C8102E]">Athlete Tip: </strong>
                      <span className="text-neutral-800">{strat.athleteTip}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. WORKSHEETS & INTERACTIVE TOOLS */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Worksheets
          </h2>
          <p className="text-base text-gray-700 mt-1 font-normal">Use interactive tools directly or download printable PDF templates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.worksheets.map((ws) => (
            <div
              key={ws.id}
              className="bg-white border border-gray-300 rounded-2xl p-6 flex flex-col justify-between hover:border-[#C8102E] transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#F5F5F3] text-neutral-800 text-xs font-semibold border border-gray-300">
                    {ws.category}
                  </span>
                  {ws.isInteractive && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      Interactive Tool
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-neutral-900 mb-2">{ws.name}</h3>
                <p className="text-base text-gray-700 mb-4 leading-relaxed font-normal">{ws.description}</p>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-gray-200 flex flex-col gap-2.5 w-full">
                {ws.isInteractive && ws.interactiveToolId && (
                  <button
                    onClick={() => onOpenInteractiveTool(ws.interactiveToolId!)}
                    className="w-full py-2.5 px-4 bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Open Tool</span>
                  </button>
                )}

                {ws.links && ws.links.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                    {ws.links.map((lnk, lIdx) => (
                      <a
                        key={lIdx}
                        href={lnk.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2.5 px-3 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 group text-center ${
                          lnk.isPrimary
                            ? 'bg-[#C8102E] hover:bg-red-800 text-white'
                            : 'bg-[#F5F5F3] hover:bg-gray-200 text-neutral-900 border border-gray-300'
                        }`}
                      >
                        <span className="truncate">{lnk.label}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    ))}
                  </div>
                )}

                {ws.externalUrl && (
                  <a
                    href={ws.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 group"
                  >
                    <span>{ws.externalButtonText || 'Open Resource'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </a>
                )}

                {ws.pdfUrl && !ws.pdfUrl.startsWith('#') && (
                  <a
                    href={ws.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-[#F5F5F3] hover:bg-gray-200 text-neutral-900 font-bold text-xs uppercase tracking-wider rounded-xl border border-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-neutral-700" />
                    <span>Download PDF</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. APPS AND ONLINE RESOURCES */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Apps and Online Resources
          </h2>
          <p className="text-base text-gray-700 mt-1 font-normal">Free evidence-informed mobile applications and clinical web resources</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.appsAndResources.map((res) => (
            <div
              key={res.id}
              className="bg-white border border-gray-300 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-400 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-[#F5F5F3] text-neutral-800 text-xs font-semibold border border-gray-300">
                    {res.type === 'app' ? 'Mobile App' : 'Online Portal'}
                  </span>
                  {res.badge && (
                    <span className="px-2.5 py-0.5 rounded bg-red-50 text-[#C8102E] text-xs font-bold border border-red-200">
                      {res.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-neutral-900 mb-2">{res.name}</h3>
                <p className="text-base text-gray-700 leading-relaxed mb-4 font-normal">{res.description}</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#F5F5F3] hover:bg-[#C8102E] text-neutral-900 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-gray-300 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. UNIVERSITY & COMMUNITY SUPPORT */}
      <section className="bg-white text-neutral-900 border border-gray-300 rounded-2xl p-6 sm:p-8 shadow-xs border-t-4 border-t-[#C8102E]">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div className="p-2.5 rounded-xl bg-red-50 text-[#C8102E] border border-red-200">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              {section.id === 'nutrition'
                ? 'Augustana Food & Nutrition Support'
                : 'Augustana Campus & Community Support'}
            </h2>
            <p className="text-sm text-gray-700 font-normal">
              {section.id === 'nutrition'
                ? 'Connect with practical campus and university resources when food access, cost, or wellness are affecting your ability to fuel yourself.'
                : 'Connect with health, wellness, and student support resources.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.supportResources.map((sup, idx) => (
            <div
              key={idx}
              className="bg-[#F5F5F3] border border-gray-300 rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-neutral-900">{sup.name}</h3>
                  {sup.isAugustanaSpecific && (
                    <span className="px-2 py-0.5 rounded bg-red-100 text-[#C8102E] text-[11px] font-bold border border-red-200">
                      Augustana Campus
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-[#C8102E] mb-2">{sup.role}</div>
                <p className="text-base text-gray-700 leading-relaxed mb-4 font-normal">{sup.description}</p>

                <div className="space-y-1.5 text-xs text-neutral-800 font-medium">
                  {sup.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      <span>{sup.location}</span>
                    </div>
                  )}
                  {sup.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      <a href={`mailto:${sup.email}`} className="text-[#C8102E] font-bold hover:underline">
                        {sup.email}
                      </a>
                    </div>
                  )}
                  {sup.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      <a href={`tel:+1${sup.phone.replace(/[^0-9]/g, '')}`} className="text-[#C8102E] font-bold hover:underline">
                        {sup.phone}
                      </a>
                    </div>
                  )}
                  {sup.contact && !sup.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                      <span>{sup.contact}</span>
                    </div>
                  )}
                </div>
              </div>

              {sup.link && (
                <div className="mt-4 pt-3 border-t border-gray-300">
                  <a
                    href={sup.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-2 px-3.5 bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs group"
                  >
                    <span>{sup.buttonText || 'Visit Support Page'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

