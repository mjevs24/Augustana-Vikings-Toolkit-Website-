import React, { useState } from 'react';
import { SectionId } from '../types';
import { Menu, X, BarChart2 } from 'lucide-react';

interface HeaderProps {
  activeSection: SectionId | 'home';
  onSelectSection: (section: SectionId | 'home') => void;
  onOpenSurvey: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  onOpenSurvey,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: SectionId | 'home' | 'worksheets' | 'emergency'; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'time-management', label: 'TOOLKIT' },
    { id: 'academic-balance', label: 'WORKSHEETS' },
    { id: 'stress-management', label: 'EMERGENCY' },
  ];

  const handleNavClick = (id: SectionId | 'home') => {
    onSelectSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-neutral-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Branding */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded bg-[#C8102E] text-white font-black text-lg flex items-center justify-center shadow-xs">
              A
            </div>
            <div className="flex items-center gap-1.5 font-extrabold tracking-tight text-lg">
              <span className="text-white">AUGUSTANA</span>
              <span className="text-[#C8102E] italic">VIKINGS</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 sm:space-x-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-xs font-bold tracking-widest transition-colors ${
                activeSection === 'home' ? 'text-[#C8102E]' : 'text-white hover:text-red-400'
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => handleNavClick('time-management')}
              className={`text-xs font-bold tracking-widest transition-colors ${
                activeSection !== 'home' ? 'text-[#C8102E]' : 'text-white hover:text-red-400'
              }`}
            >
              TOOLKIT
            </button>
            <button
              onClick={() => handleNavClick('academic-balance')}
              className="text-xs font-bold tracking-widest text-white hover:text-red-400 transition-colors"
            >
              WORKSHEETS
            </button>
            <button
              onClick={onOpenSurvey}
              className="text-xs font-bold tracking-widest text-white hover:text-red-400 transition-colors flex items-center gap-1.5"
            >
              <BarChart2 className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>WHAT WE HEARD</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-red-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 py-4 space-y-3">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 text-sm font-bold tracking-wider text-white hover:text-red-400"
          >
            HOME
          </button>
          <button
            onClick={() => handleNavClick('time-management')}
            className="block w-full text-left py-2 text-sm font-bold tracking-wider text-white hover:text-red-400"
          >
            TOOLKIT
          </button>
          <button
            onClick={() => handleNavClick('academic-balance')}
            className="block w-full text-left py-2 text-sm font-bold tracking-wider text-white hover:text-red-400"
          >
            WORKSHEETS
          </button>
          <button
            onClick={() => {
              onOpenSurvey();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-bold tracking-wider text-[#C8102E] hover:text-red-400 flex items-center gap-2"
          >
            <BarChart2 className="w-4 h-4" />
            <span>WHAT WE HEARD REPORT</span>
          </button>
        </div>
      )}
    </header>
  );
};

