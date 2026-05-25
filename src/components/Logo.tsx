import React from 'react';

interface LogoProps {
  className?: string; // Additional classes
  size?: number; // width/height in px
  variant?: 'light' | 'dark' | 'adaptive'; // color modes
  showText?: boolean; // whether to show "БСС МЕДИЦИНСКИЙ ХОЛДИНГ" text
  isSticky?: boolean; // header state tracker to adapt stroke colors
  onClick?: () => void; // Click callback
  lang?: 'RU' | 'EN'; // Language selector
}

export default function Logo({
  className = '',
  size = 40,
  variant = 'adaptive',
  showText = false,
  isSticky = false,
  onClick,
  lang = 'RU',
}: LogoProps) {
  // Determine color bases based on variant
  // The official logo color is #009F9C (corporate medical teal)
  const getColors = () => {
    if (variant === 'light') {
      return {
        tree: '#009F9C',
        arc: '#009F9C',
        text_bss: '#FFFFFF',
        text_sub: '#D1D5DB', // gray-300
      };
    }
    if (variant === 'dark' || variant === 'adaptive') {
      return {
        tree: '#009F9C',
        arc: '#009F9C',
        text_bss: '#002B5B',
        text_sub: '#4B5563', // gray-600
      };
    }
    return {
      tree: '#009F9C',
      arc: '#009F9C',
      text_bss: '#009F9C',
      text_sub: '#009F9C',
    };
  };

  const colors = getColors();

  return (
    <div onClick={onClick} className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Official BSS Tree Logo SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Main organic branching dome of the BSS tree */}
        <g id="bss-tree-branches" stroke={colors.tree} strokeLinecap="round" strokeLinejoin="round">
          {/* Main Trunk */}
          <path d="M60 81 L60 62" strokeWidth="6.5" />
          
          {/* Primary Massive Splitting Branches (Trunk flares) */}
          <path d="M60 70 Q51 61 44 55" strokeWidth="5" fill="none" />
          <path d="M60 70 Q69 61 76 55" strokeWidth="5" fill="none" />
          
          {/* Inner Left and Right branches */}
          <path d="M60 62 Q55 52 50 44" strokeWidth="4" fill="none" />
          <path d="M60 62 Q65 52 70 44" strokeWidth="4" fill="none" />

          {/* Symmetrical Middle Core Branch Upwards */}
          <path d="M60 62 L60 48" strokeWidth="3.5" />

          {/* Left Core Branch Network */}
          <path d="M44 55 Q33 50 24 50" strokeWidth="4" fill="none" />
          <path d="M44 55 Q41 42 35 34" strokeWidth="3.5" fill="none" />
          <path d="M44 55 Q46 45 50 40" strokeWidth="3" fill="none" />

          {/* Right Core Branch Network */}
          <path d="M76 55 Q87 50 96 50" strokeWidth="4" fill="none" />
          <path d="M76 55 Q79 42 85 34" strokeWidth="3.5" fill="none" />
          <path d="M76 55 Q74 45 70 40" strokeWidth="3" fill="none" />

          {/* Outer Extensions - Left */}
          <path d="M24 50 C18 49 14 43 12 36" strokeWidth="3" fill="none" />
          <path d="M24 50 Q24 40 21 32" strokeWidth="2.8" fill="none" />
          <path d="M24 50 Q29 45 32 38" strokeWidth="2.8" fill="none" />

          {/* Outer Extensions - Right */}
          <path d="M96 50 C102 49 106 43 108 36" strokeWidth="3" fill="none" />
          <path d="M96 50 Q96 40 99 32" strokeWidth="2.8" fill="none" />
          <path d="M96 50 Q91 45 88 38" strokeWidth="2.8" fill="none" />

          {/* Upper Canopy Twigs Subsplitting (Deep intricate dome detail) */}
          {/* Left Wing Twigs */}
          <path d="M12 36 C10 30 11 25 14 19" strokeWidth="2" fill="none" />
          <path d="M12 36 C14 31 18 31 20 25" strokeWidth="2" fill="none" />
          
          <path d="M21 32 C18 25 19 21 22 15" strokeWidth="2" fill="none" />
          <path d="M21 32 C22 26 26 26 28 20" strokeWidth="2" fill="none" />

          <path d="M32 38 C31 31 32 27 34 21" strokeWidth="2" fill="none" />
          <path d="M32 38 C34 32 38 32 40 26" strokeWidth="2" fill="none" />

          {/* Mid Left Twigs */}
          <path d="M35 34 C33 28 34 24 37 17" strokeWidth="2.1" fill="none" />
          <path d="M35 34 C36 28 41 28 43 22" strokeWidth="2.1" fill="none" />

          <path d="M50 40 C48 33 49 29 51 23" strokeWidth="2.1" fill="none" />
          <path d="M50 40 C51 34 55 34 57 28" strokeWidth="2.1" fill="none" />

          <path d="M50 44 C46 36 45 31 47 24" strokeWidth="2.1" fill="none" />
          <path d="M50 44 C51 38 54 38 56 31" strokeWidth="2.1" fill="none" />

          {/* Center Upper Canopy Twigs */}
          <path d="M60 48 Q55 38 53 30" strokeWidth="2.2" fill="none" />
          <path d="M60 48 Q65 38 67 30" strokeWidth="2.2" fill="none" />
          <path d="M53 30 Q49 24 51 16" strokeWidth="1.8" fill="none" />
          <path d="M53 30 Q54 22 57 15" strokeWidth="1.8" fill="none" />
          <path d="M67 30 Q66 22 63 15" strokeWidth="1.8" fill="none" />
          <path d="M67 30 Q71 24 69 16" strokeWidth="1.8" fill="none" />

          {/* Right Wing Twigs */}
          <path d="M108 36 C110 30 109 25 106 19" strokeWidth="2" fill="none" />
          <path d="M108 36 C106 31 102 31 100 25" strokeWidth="2" fill="none" />

          <path d="M99 32 C102 25 101 21 98 15" strokeWidth="2" fill="none" />
          <path d="M99 32 C98 26 94 26 92 20" strokeWidth="2" fill="none" />

          <path d="M88 38 C89 31 88 27 86 21" strokeWidth="2" fill="none" />
          <path d="M88 38 C86 32 82 32 80 26" strokeWidth="2" fill="none" />

          {/* Mid Right Twigs */}
          <path d="M85 34 C87 28 86 24 83 17" strokeWidth="2.1" fill="none" />
          <path d="M85 34 C84 28 79 28 77 22" strokeWidth="2.1" fill="none" />

          <path d="M70 40 C72 33 71 29 69 23" strokeWidth="2.1" fill="none" />
          <path d="M70 40 C69 34 65 34 63 28" strokeWidth="2.1" fill="none" />

          <path d="M70 44 C74 36 75 31 73 24" strokeWidth="2.1" fill="none" />
          <path d="M70 44 C69 38 66 38 64 31" strokeWidth="2.1" fill="none" />

          {/* Symmetrical fine capillary tips at the very top of outer limits */}
          <path d="M14 19 Q11 13 13 8" strokeWidth="1.5" />
          <path d="M14 19 Q16 13 18 9" strokeWidth="1.5" />
          <path d="M22 15 Q19 9 22 5" strokeWidth="1.5" />
          <path d="M22 15 Q24 10 27 6" strokeWidth="1.5" />
          <path d="M34 21 Q31 15 33 10" strokeWidth="1.5" />
          <path d="M34 21 Q36 15 39 11" strokeWidth="1.5" />
          <path d="M37 17 Q34 11 36 7" strokeWidth="1.5" />
          <path d="M37 17 Q39 12 42 8" strokeWidth="1.5" />
          <path d="M51 23 Q48 16 50 11" strokeWidth="1.5" />
          <path d="M51 23 Q53 16 55 12" strokeWidth="1.5" />

          <path d="M106 19 Q109 13 107 8" strokeWidth="1.5" />
          <path d="M106 19 Q104 13 102 9" strokeWidth="1.5" />
          <path d="M98 15 Q101 9 98 5" strokeWidth="1.5" />
          <path d="M98 15 Q96 10 93 6" strokeWidth="1.5" />
          <path d="M86 21 Q89 15 87 10" strokeWidth="1.5" />
          <path d="M86 21 Q84 15 81 11" strokeWidth="1.5" />
          <path d="M83 17 Q86 11 84 7" strokeWidth="1.5" />
          <path d="M83 17 Q81 12 78 8" strokeWidth="1.5" />
          <path d="M69 23 Q72 16 70 11" strokeWidth="1.5" />
          <path d="M69 23 Q67 16 65 12" strokeWidth="1.5" />
        </g>

        {/* Supporting Horizon Arc just below the trunk */}
        <path
          d="M10 92 C35 77 85 77 110 92"
          stroke={colors.arc}
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
          id="bss-logo-horizon-arc"
        />

        {/* Small embedded BSS lettering inside SVG itself if requested */}
        {size >= 80 && (
          <g id="internal-svg-branding" fill="currentColor">
            <text
              x="60"
              y="112"
              textAnchor="middle"
              className="font-display font-black"
              style={{ fontSize: '18px', fill: colors.text_bss }}
            >
              {lang === 'RU' ? 'БСС' : 'BSS'}
            </text>
          </g>
        )}
      </svg>

      {/* Accompanying textual branding elements (standard HTML flow next to the SVG image/icon) */}
      {showText && (
        <div className="flex items-center">
          <span
            className="font-display font-extrabold text-3xl tracking-widest"
            style={{
              color: colors.text_bss,
            }}
          >
            {lang === 'RU' ? 'БСС' : 'BSS'}
          </span>
        </div>
      )}
    </div>
  );
}
