import React from 'react';
import {
  X,
  BarChart2,
  ArrowRight,
  Clock,
  Zap,
  Moon,
  Utensils,
  GraduationCap,
  Trophy,
  Info
} from 'lucide-react';

interface WhatWeHeardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatWeHeardModal: React.FC<WhatWeHeardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#FAF9F6] border border-neutral-300 rounded-3xl max-w-5xl w-full max-h-[94vh] overflow-y-auto text-neutral-900 shadow-2xl relative my-auto flex flex-col">
        
        {/* STICKY TOP APP BAR */}
        <div className="sticky top-0 z-30 bg-black text-white px-5 sm:px-8 py-4 flex items-center justify-between border-b border-neutral-800 rounded-t-3xl shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C8102E] text-white flex items-center justify-center font-black shadow-xs">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block leading-tight">
                AUGUSTANA STUDENT-ATHLETE WELLNESS SURVEY
              </span>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight uppercase leading-tight font-athletic">
                “What We Heard” Student Athlete Report
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close What We Heard report"
              className="p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* REPORT BODY CONTENT */}
        <div className="p-5 sm:p-8 md:p-10 space-y-8 text-neutral-900 leading-relaxed font-sans">

          {/* REPORT COVER / TITLE BLOCK */}
          <div className="bg-white border-2 border-stone-200 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-xs border-t-8 border-t-[#C8102E]">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
              “What We Heard” Student Athlete Report
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-[#C8102E]">
              Vikings Student Athlete Wellness Survey Summary
            </p>
            <div className="pt-2 text-xs sm:text-sm text-neutral-600 font-medium space-y-0.5">
              <p>Augustana Vikings April 2026</p>
              <p>Created by: MSc. OT Students - Augustana Cohort</p>
              <p>April 2026</p>
            </div>
          </div>

          {/* SECTION: INTRODUCTION */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 pb-2 border-b border-stone-200">
              Introduction
            </h2>
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
              This report summarizes findings from the Augustana Student-Athlete Wellness Survey
              conducted as part of the Occupational Therapy capstone project focused on lifestyle balance and
              student-athlete wellness. Of the 150 student-athletes, our survey had a 22% response rate. The
              survey explored student-athletes' experiences balancing academics, athletics, recovery, and
              personal well-being. The purpose of this report is to identify common themes and experiences
              among the student-athlete population to inform future wellness initiatives, educational resources,
              and supports for Augustana athletes. Overall, the findings suggest that student-athletes are
              balancing significant academic, athletic, and personal demands with limited time for
              recovery and wellness.
            </p>
            <div className="pt-2">
              <p className="text-sm sm:text-base font-semibold text-neutral-900 mb-2">
                Four major themes emerged from the survey data:
              </p>
              <ul className="space-y-1.5 pl-2 text-sm sm:text-base text-neutral-800">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span className="font-semibold">Time Management &amp; Academic Balance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span className="font-semibold">Stress Management</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span className="font-semibold">Sleep &amp; Recovery</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span className="font-semibold">Nutrition</span>
                </li>
              </ul>
            </div>
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed pt-2">
              These themes were interconnected and consistently reflected the challenges student-athletes face
              while balancing multiple responsibilities and expectations.
            </p>
          </div>

          {/* SECTION: WHO WE HEARD FROM */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 pb-2 border-b border-stone-200">
              Who We Heard From
            </h2>
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
              The survey included responses from student-athletes across multiple Vikings teams and years of
              study, including: Volleyball, Hockey, Soccer, Basketball, Curling, Track/XC/Nordic. Athletes
              from both in-season and off-season participation completed the survey, representing a range of
              experiences and perspectives.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Volleyball', 'Hockey', 'Soccer', 'Basketball', 'Curling', 'Track/XC/Nordic'].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 bg-[#FAF9F6] border border-stone-300 rounded-full text-xs sm:text-sm font-bold text-neutral-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* SECTION: KEY FINDINGS / SURVEY HIGHLIGHTS */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4 border-l-6 border-l-[#C8102E]">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 pb-2 border-b border-stone-200">
              Key Findings/ Survey Highlights
            </h2>
            <ul className="space-y-2.5 text-sm sm:text-base text-neutral-800">
              <li className="flex items-start gap-2.5">
                <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                <span>
                  <strong className="text-neutral-950">42% of athletes</strong> reported feeling often or always overwhelmed
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                <span>
                  <strong className="text-neutral-950">33%</strong> reported that academics and athletics frequently interfere with sleep
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                <span>
                  <strong className="text-neutral-950">30%</strong> reported difficulty balancing responsibilities
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                <span>Many athletes identified time constraints as their biggest challenge</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                <span>Nutrition barriers were commonly linked to limited time, travel, and scheduling demands</span>
              </li>
            </ul>
          </div>

          {/* SECTION: THEME 1: TIME MANAGEMENT & ACADEMIC BALANCE */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 pb-2 border-b border-stone-200 flex items-center gap-2.5">
              <Clock className="w-6 h-6 text-[#C8102E]" />
              <span>Theme 1: Time Management &amp; Academic Balance</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
              Time management emerged as one of the most consistent themes throughout the survey, with
              over 33% of athletes identifying it as an area where they would like additional support or
              resources. Time management challenges were also closely linked to difficulties maintaining
              academic balance, with over 45% of athletes identifying academics as a major concern. Athletes
              frequently described challenges balancing academic responsibilities alongside athletics, recovery,
              social life, and personal activities. Many student-athletes reported that there was simply “not
              enough time” to fully manage all of their responsibilities during the season. Academic work,
              sleep, and self-care were commonly identified as the areas hardest to prioritize, particularly
              during periods of travel, competition, and high training demands.
            </p>

            <div className="bg-[#FAF9F6] border border-stone-200 p-4 sm:p-5 rounded-xl space-y-2">
              <p className="text-sm sm:text-base font-semibold text-neutral-900">
                Athletes frequently discussed:
              </p>
              <ul className="space-y-1.5 pl-2 text-sm sm:text-base text-neutral-800">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>difficulty keeping up with assignments and studying</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>falling behind during busy competition periods</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>balancing school work after practices or games</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>maintaining routines during travel schedules</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>balancing academic expectations with athletic performance demands</span>
                </li>
              </ul>
            </div>

            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
              Several athletes described feeling as though academics and athletics were constantly competing
              for their time and energy. While many athletes valued success in both roles, maintaining both
              simultaneously was often described as stressful and exhausting.
            </p>

            <div className="bg-[#FAF9F6] border border-stone-200 p-4 sm:p-5 rounded-xl space-y-2">
              <p className="text-sm sm:text-base font-semibold text-neutral-900">
                Academic strain appeared particularly noticeable:
              </p>
              <ul className="space-y-1.5 pl-2 text-sm sm:text-base text-neutral-800">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>During in-season periods</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>Among athletes in demanding academic programs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>During the transition into university athletics</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>When travel disrupts routines and study time</span>
                </li>
              </ul>
            </div>

            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
              The findings suggest that many student-athletes are struggling to maintain balance across
              academics, athletics, recovery, and personal life. When time demands increase in one area, it
              often becomes difficult to prioritize sleep, recovery, academics, social connection, and other
              important aspects of well-being.
            </p>
          </div>

          {/* SECTION: THEME 2: STRESS MANAGEMENT */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 pb-2 border-b border-stone-200 flex items-center gap-2.5">
              <Zap className="w-6 h-6 text-[#C8102E]" />
              <span>Theme 2: Stress Management</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
              Stress and mental load were commonly reported across teams
              and years of study, with over 42% of student-athletes who completed the survey citing these as
              major concerns for which they would like more support or resources. Many athletes described
              feeling overwhelmed by the combined demands of academics and athletics.
            </p>

            <div className="bg-[#FAF9F6] border border-stone-200 p-4 sm:p-5 rounded-xl space-y-2">
              <p className="text-sm sm:text-base font-semibold text-neutral-900">
                Stress appeared connected to:
              </p>
              <ul className="space-y-1.5 pl-2 text-sm sm:text-base text-neutral-800">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>academic pressure</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>performance expectations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>time demands</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>limited recovery</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>uncertainty about future planning</span>
                </li>
              </ul>
            </div>

            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
              Several athletes also described barriers to accessing support, including lack of time, uncertainty
              about available resources, and difficulty prioritizing help-seeking. While stress was present
              across all teams, the intensity and experience of stress varied depending on team culture,
              schedules, and individual circumstances.
            </p>
          </div>

          {/* SECTION: THEME 3: SLEEP & RECOVERY */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 pb-2 border-b border-stone-200 flex items-center gap-2.5">
              <Moon className="w-6 h-6 text-[#C8102E]" />
              <span>Theme 3: Sleep &amp; Recovery</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
              Sleep and recovery emerged as major concerns for many
              student-athletes, with over 30% of those who completed this survey indicating this as an area
              where they would like more support/resources. Academic demands, practices, games, travel, and
              scheduling conflicts frequently interfered with athletes’ ability to get enough rest. Many athletes
              reported averaging approximately 6–7 hours of sleep per night during the season, with several
              describing this as insufficient for recovery and performance.
            </p>

            <div className="bg-[#FAF9F6] border border-stone-200 p-4 sm:p-5 rounded-xl space-y-2">
              <p className="text-sm sm:text-base font-semibold text-neutral-900">
                Athletes commonly link sleep disruption to:
              </p>
              <ul className="space-y-1.5 pl-2 text-sm sm:text-base text-neutral-800">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>late practices or games</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>early morning training</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>travel</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>completing school work after athletics</span>
                </li>
              </ul>
            </div>
          </div>

          {/* SECTION: THEME 4: NUTRITION */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 pb-2 border-b border-stone-200 flex items-center gap-2.5">
              <Utensils className="w-6 h-6 text-[#C8102E]" />
              <span>Theme 4: Nutrition</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed">
              Nutrition challenges were another important theme identified throughout
              the survey, with over 42% of the student-athletes who completed the survey indicating that this
              is an area where they would like more support and resources. Many athletes reported difficulty
              maintaining consistent or balanced eating habits while managing athletics and academics. The
              most common nutrition barriers included limited time to prepare meals, travel schedules that
              disrupt routines, financial barriers, and limited access to convenient food options.
            </p>
          </div>

          {/* SECTION: TRENDS ACROSS TEAMS & YEARS */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 pb-2 border-b border-stone-200">
                Trends Across Teams &amp; Years
              </h2>
              <p className="text-sm sm:text-base text-neutral-800 leading-relaxed mt-3">
                Although the themes were consistent across the student-athlete
                population, some differences emerged across teams and years of study.
              </p>
            </div>

            {/* Team Trends */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#C8102E]" />
                <span>Team Trends</span>
              </h3>
              <ul className="space-y-2 text-sm sm:text-base text-neutral-800 pl-1">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>Soccer athletes reported higher levels of stress and sleep disruption</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>Hockey athletes reported greater lifestyle imbalance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>Basketball athletes frequently identified recovery and fatigue concerns</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>Track/XC athletes described more independent, well-managed techniques for managing well-being and more experiences of isolation compared to other teams.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                  <span>Curling athletes reported comparatively lower overall lifestyle strain</span>
                </li>
              </ul>
            </div>

            {/* Year of Study Trends */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#C8102E]" />
                <span>Year of Study Trends:</span>
              </h3>
              <div className="space-y-3 text-sm sm:text-base text-neutral-800 leading-relaxed">
                <p>
                  First-year athletes frequently described the transition to university athletics as challenging,
                  particularly as they adjusted to increased independence, academic expectations, and athletic
                  demands.
                </p>
                <p>
                  Second-year students reported the highest frequency of stress, sleep disruption, and balance
                  difficulties.
                </p>
                <p>
                  Athletes in Years 3–5+ generally described improved coping strategies and stronger routines
                  developed over time. Many upper-year athletes reported becoming better at scheduling,
                  prioritizing responsibilities, and managing expectations. However, despite improved experience
                  and coping skills, workload strain, fatigue, and difficulty balancing responsibilities remained
                  ongoing concerns for many athletes.
                </p>
                <p>
                  Additionally, several upper-year athletes also discussed increased leadership expectations,
                  preparing for graduation or future careers, concerns about transition out of sport, and maintaining
                  wellness while managing long-term demands.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION: PREFERRED SUPPORT FORMATS */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 pb-2 border-b border-stone-200">
              Preferred support formats for the previously identified themes include:
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-neutral-800 pl-1">
              <li className="flex items-start gap-2.5">
                <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                <span><strong>33%</strong> preferred short online resources on Canva</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                <span><strong>27%</strong> preferred having one-on-one support</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                <span><strong>25%</strong> preferred having team workshops or presentations</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#C8102E] font-bold text-base leading-none pt-1">●</span>
                <span><strong>9.1%</strong> preferred practical tip sheets posted on Canva</span>
              </li>
            </ul>

            <div className="space-y-3 pt-2 text-sm sm:text-base text-neutral-800 leading-relaxed">
              <p>
                Athletes emphasized that support should be practical, accessible, easy to use, and realistic
                within their athletic schedules. Moving forward, the findings from this survey helped inform
                future wellness initiatives, practical athlete resources, recommendations for athletics and Student
                Services, and the creation of an Occupational Balance Toolkit, which will be available on Canvas
                in the fall. The occupational balance toolkit will be posted on Canvas in the fall and will
                comprise various interventions based on the major themes found in the survey regarding
                academics, time management, stress management, nutrition, and mental health.
              </p>
            </div>
          </div>

          {/* SECTION: CLOSING REFLECTION */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 pb-2 border-b border-stone-200">
              Closing Reflection
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-neutral-800 leading-relaxed">
              <p>
                Thank you again to everyone who participated in the student-athlete
                wellness survey. The information and experiences shared through this project will help guide the
                next phase of our capstone work. Based on the themes identified in the data, our next steps will
                involve developing a Student Occupational Balance Toolkit to support student-athlete wellness
                in realistic, accessible ways. We also plan to develop several practical interventions and resource
                ideas related to the main themes identified within the survey, including time management, stress
                management, sleep and recovery, and nutrition. Because many athletes identified mental health
                as an area where they would like more support, the Occupational Balance Toolkit will also
                include accessible mental health and wellness resources specific to Camrose and Augustana. The
                goal is to improve awareness of available supports and make resources easier for student-athletes
                to access within their schedules. The goal of these resources is to help support sustainable
                routines, occupational balance, and overall well-being among student-athletes at Augustana.
              </p>

              <p>
                The findings highlight that student-athletes are balancing much more than sport and
                academics alone. Many are navigating overlapping pressures related to performance, recovery,
                routines, and personal well-being. Supporting student-athlete wellness means recognizing
                athletes as whole people and creating supports that promote sustainable participation across all
                areas of life.
              </p>

              <p>
                Thank you for your time and for participating in the survey and in the creation of these wellness
                resources. We truly appreciate it.
              </p>
            </div>
          </div>

          {/* SECTION: AI STATEMENT */}
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-neutral-700 space-y-1">
            <div className="flex items-center gap-2 font-bold text-neutral-900">
              <Info className="w-4 h-4 text-neutral-600" />
              <span>AI Statement</span>
            </div>
            <p className="leading-relaxed text-neutral-700">
              <strong>AI Statement:</strong> OpenAI (ChatGPT) was used as an editing tool for this report, assisting with
              grammar correction, general formatting, and data synthesis, including organizing qualitative
              data.
            </p>
          </div>

          {/* SECTION: FROM FEEDBACK TO ACTION & ACTIONS */}
          <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-2xl border-t-4 border-t-[#C8102E] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-extrabold text-base sm:text-lg text-white font-athletic uppercase tracking-tight">
                From Feedback to Action
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
                These survey findings directly informed the 5 core compartments of the Augustana Vikings Student-Athlete Well-Being Toolkit.
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto flex justify-center sm:justify-end">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-[#C8102E] hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>Explore the Toolkit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

