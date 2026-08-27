import React, { useState } from 'react';
import { SectionId } from './types';
import { toolkitSectionsData } from './data/toolkitData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ToolboxGrid } from './components/ToolboxGrid';
import { SectionView } from './components/SectionView';
import { SearchModal } from './components/SearchModal';
import { WorksheetModal } from './components/WorksheetModal';
import { WhatWeHeardModal } from './components/WhatWeHeardModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId | 'home'>('home');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [surveyModalOpen, setSurveyModalOpen] = useState(false);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const currentSectionData = toolkitSectionsData.find((s) => s.id === activeSection);

  const scrollToToolbox = () => {
    const element = document.getElementById('toolkit-drawers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] text-neutral-900 font-sans antialiased selection:bg-[#C8102E] selection:text-white flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Header
          activeSection={activeSection}
          onSelectSection={(sec) => setActiveSection(sec)}
          onOpenSurvey={() => setSurveyModalOpen(true)}
        />

        {/* Main Content */}
        <main>
          {activeSection === 'home' ? (
            <>
              {/* Hero Banner */}
              <Hero
                onScrollToToolbox={scrollToToolbox}
              />

              {/* Athletic Toolbox Grid */}
              <ToolboxGrid
                sections={toolkitSectionsData}
                onSelectSection={(secId) => {
                  setActiveSection(secId);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </>
          ) : (
            currentSectionData && (
              <SectionView
                section={currentSectionData}
                onBackToHome={() => {
                  setActiveSection('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenInteractiveTool={(toolId) => setActiveToolId(toolId)}
              />
            )
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <WhatWeHeardModal
        isOpen={surveyModalOpen}
        onClose={() => setSurveyModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectSection={(secId) => setActiveSection(secId)}
        onOpenInteractiveTool={(toolId) => setActiveToolId(toolId)}
      />

      <WorksheetModal
        toolId={activeToolId}
        onClose={() => setActiveToolId(null)}
      />
    </div>
  );
}

