import React from 'react';
import twoLivesHeroImg from '../assets/images/two_lives_colliding_hero_1786556840018.jpg';
import { AugustanaVikingsLogo } from './AugustanaVikingsLogo';

interface HeroProps {
  onScrollToToolbox?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <div className="bg-[#F5F5F3] pt-8 sm:pt-10 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 border-b border-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
        
        {/* 1. TOP HEADER ROW: TITLE & INTRO TEXT (LEFT) + AUGUSTANA VIKINGS LOGO (RIGHT) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* LEFT: Title & Introductory Text */}
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight italic uppercase leading-none font-athletic text-neutral-900 mb-3">
              STUDENT-ATHLETE <br />
              <span className="text-[#C8102E]">WELL-BEING</span> TOOLKIT
            </h1>

            <p className="text-base sm:text-lg text-neutral-800 font-normal leading-relaxed max-w-2xl">
              Supporting your success in academics, athletics, and everyday life.
              Manage demanding schedules while optimizing health and performance.
            </p>
          </div>

          {/* RIGHT: Augustana Vikings Logo */}
          <div className="shrink-0 self-start sm:self-center">
            <AugustanaVikingsLogo className="h-16 sm:h-20 md:h-24" />
          </div>
        </div>

        {/* 2. FULL-WIDTH ACADEMIC ↔ ATHLETIC HERO BANNER (UNCHANGED) */}
        <div className="w-full overflow-hidden rounded-2xl border border-gray-300 shadow-md bg-neutral-900">
          <img
            src={twoLivesHeroImg}
            alt="Two Lives Colliding - Academics and Athletics Coexisting"
            className="w-full h-[200px] sm:h-[260px] md:h-[320px] object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* 3. CURRENT PHASE CARD — ALIGNED TO THE LEFT BELOW BANNER */}
        <div className="flex justify-start">
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-xs shrink-0">
            <div className="text-left">
              <div className="text-[10px] font-bold text-[#C8102E] uppercase tracking-widest leading-none mb-1">
                CURRENT PHASE
              </div>
              <div className="text-xl sm:text-2xl font-black italic uppercase text-neutral-900 leading-none">
                IN-SEASON
              </div>
            </div>
            <div className="w-1.5 h-9 bg-[#C8102E] rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
};




