import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'color',
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const isDark = variant === 'dark';

  // Sizing scales
  const dimensions = {
    sm: { height: 38, iconSize: 34, titleClass: 'text-lg', subClass: 'text-xs', taglineClass: 'text-[9px]' },
    md: { height: 50, iconSize: 46, titleClass: 'text-2xl', subClass: 'text-sm', taglineClass: 'text-[10px]' },
    lg: { height: 68, iconSize: 62, titleClass: 'text-3xl', subClass: 'text-lg', taglineClass: 'text-xs' },
    xl: { height: 90, iconSize: 84, titleClass: 'text-4xl', subClass: 'text-xl', taglineClass: 'text-sm' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon: Mortarboard + Desk/Chair in "D" + Orange Crescent Swoosh */}
      <svg
        width={dimensions.iconSize}
        height={dimensions.iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform duration-300 hover:scale-105"
        aria-label="Decent School Furniture Logo Emblem"
      >
        <defs>
          {/* Blue Gradient for Cap and D chassis */}
          <linearGradient id="logoBlueGrad" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#1E6FE8" />
            <stop offset="50%" stopColor="#0B57CF" />
            <stop offset="100%" stopColor="#083E9A" />
          </linearGradient>

          {/* Orange Gradient for Swoosh, Desk surface, and Tassel */}
          <linearGradient id="logoOrangeGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FF5722" />
            <stop offset="50%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#FFA100" />
          </linearGradient>

          {/* Subtle inner shadow filter */}
          <filter id="deskShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Graduation Cap Mortarboard Top (Tilted) */}
        <path
          d="M12 36 L52 18 L90 34 L50 48 Z"
          fill="url(#logoBlueGrad)"
          stroke="#388BFD"
          strokeWidth="1.2"
        />

        {/* Cap skull cap under mortarboard */}
        <path
          d="M28 40 L50 49 L72 39 V46 C72 54 50 58 50 58 C50 58 28 54 28 46 Z"
          fill="#083E9A"
        />

        {/* Mortarboard Tassel Button */}
        <circle cx="50" cy="33" r="2.5" fill="#FFA100" />

        {/* Hanging Orange Cord & Tassel */}
        <path
          d="M50 33 Q30 34 22 42 T19 54"
          fill="none"
          stroke="url(#logoOrangeGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <polygon points="15,53 23,53 21,65 17,65" fill="url(#logoOrangeGrad)" />
        <circle cx="19" cy="53" r="3" fill="#FF5722" />

        {/* Stylized "D" Main Structural Arch */}
        <path
          d="M26 44 H48 C68 44 80 54 80 68 C80 82 66 90 46 90 H26 Z"
          fill="url(#logoBlueGrad)"
          fillOpacity="0.18"
        />
        <path
          d="M26 44 H48 C66 44 78 54 78 68 C78 81 64 88 46 88 H26 V44"
          fill="none"
          stroke="url(#logoBlueGrad)"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Inner Silhouette of Student Chair & Desk */}
        <g transform="translate(14, 28) scale(0.68)">
          {/* Student Chair Backrest & Legs */}
          <path
            d="M36 50 C36 44 42 40 48 40 C54 40 58 44 58 50 V68 H36 V50 Z"
            fill="#0B57CF"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          {/* Chair Legs */}
          <path d="M38 68 L34 94 M56 68 L60 94" stroke="#083E9A" strokeWidth="3" strokeLinecap="round" />

          {/* Student Desk Tabletop (Bright Orange angled top) */}
          <polygon
            points="55,58 92,52 88,64 53,68"
            fill="url(#logoOrangeGrad)"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
          {/* Desk frame & legs */}
          <path
            d="M56 68 V94 M86 64 V92 M56 82 H86"
            stroke="#083E9A"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* Dynamic Sweeping Orange Swoosh / Crescent underneath */}
        <path
          d="M8 82 C28 98 72 96 95 62 C82 82 46 88 16 80 Z"
          fill="url(#logoOrangeGrad)"
        />
      </svg>

      {/* Brand Wordmark & Typography */}
      <div className="flex flex-col justify-center leading-none">
        {/* Main "Decent" */}
        <div className="flex items-start">
          <span
            className={`font-display font-extrabold tracking-tight ${dimensions.titleClass} ${
              isDark ? 'text-blue-400' : 'text-[#0B60D4]'
            }`}
            style={{ letterSpacing: '-0.03em' }}
          >
            Decent
          </span>
          <span
            className={`text-[9px] font-bold ml-1 relative top-0.5 ${
              isDark ? 'text-blue-300' : 'text-[#0B60D4]'
            }`}
            title="Registered Trademark"
          >
            ®
          </span>
        </div>

        {/* "School Furniture" */}
        <div className={`font-display font-bold mt-0.5 tracking-tight ${dimensions.subClass} flex items-center gap-1.5`}>
          <span className={isDark ? 'text-white' : 'text-[#0E2954]'}>
            School
          </span>
          <span className="text-[#F97316]">
            Furniture
          </span>
        </div>

        {/* Tagline: "— BETTER STUDY BETTER FUTURE —" */}
        {showTagline && (
          <div
            className={`font-sans font-semibold tracking-wider uppercase mt-1 flex items-center gap-1.5 ${dimensions.taglineClass} ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            <span className="text-orange-500 opacity-80">—</span>
            <span className="tracking-[0.14em]">Better Study</span>
            <span className="text-slate-400">·</span>
            <span className="tracking-[0.14em]">Better Future</span>
            <span className="text-orange-500 opacity-80">—</span>
          </div>
        )}
      </div>
    </div>
  );
};
