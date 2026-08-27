import React from 'react';
import vikingsLogoImg from '../assets/images/augustana_vikings_logo_1786556852728.jpg';

interface AugustanaVikingsLogoProps {
  className?: string;
  height?: number;
}

export const AugustanaVikingsLogo: React.FC<AugustanaVikingsLogoProps> = ({ className = "h-16 sm:h-20 md:h-24", height }) => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200/90 shadow-xs flex items-center justify-center">
      <img
        src={vikingsLogoImg}
        alt="Augustana Vikings Logo"
        className={`object-contain select-none ${className}`}
        style={height ? { height: `${height}px` } : undefined}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
