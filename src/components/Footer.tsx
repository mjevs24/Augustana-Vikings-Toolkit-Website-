import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EFEFEF] border-t border-gray-300 text-neutral-800 py-6 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold tracking-wider">
        <div className="text-neutral-600 uppercase">
          UNIVERSITY OF ALBERTA AUGUSTANA &bull; VIKINGS ATHLETICS
        </div>

        <div className="text-[#C8102E] uppercase font-extrabold">
          EVIDENCE-INFORMED RESOURCES &bull; TOOLKIT V1.0
        </div>
      </div>
    </footer>
  );
};

