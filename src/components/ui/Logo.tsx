'use client';

export function Logo({ className = "", variant = "default" }: { className?: string, variant?: "default" | "light" }) {
  const isLight = variant === "light";
  
  return (
    <div className={`flex items-center hover:opacity-90 transition-opacity ${className}`}>
      <svg 
        width="250" 
        height="60" 
        viewBox="0 0 250 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-12 sm:h-14"
      >
        <defs>
          <linearGradient id="premiumGoldFix" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#BF953F" />
            <stop offset="25%" stopColor="#FCF6BA" />
            <stop offset="50%" stopColor="#B38728" />
            <stop offset="75%" stopColor="#FBF5B7" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
          
          <filter id="goldGlowFix" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
            <feOffset dx="0" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- ICON: ICONIC SOFA --- */}
        <g filter="url(#goldGlowFix)">
          {/* Detailed Sofa Backrest (Two distinct cushions) */}
          <path d="M12 28C12 24.6863 14.6863 22 18 22H31V33H12V28Z" fill="url(#premiumGoldFix)" />
          <path d="M33 22H46C49.3137 22 52 24.6863 52 28V33H33V22Z" fill="url(#premiumGoldFix)" />
          
          {/* Main Seat */}
          <path d="M10 33H54C56.2091 33 58 34.7909 58 37V42C58 44.2091 56.2091 46 54 46H10C7.79086 46 6 44.2091 6 42V37C6 34.7909 7.79086 33 10 33Z" fill="url(#premiumGoldFix)" />
          
          {/* Slimmer Armrests */}
          <rect x="5" y="29" width="7" height="14" rx="3.5" fill="url(#premiumGoldFix)" />
          <rect x="53" y="29" width="7" height="14" rx="3.5" fill="url(#premiumGoldFix)" />
          
          {/* Feet */}
          <path d="M14 46L12 50H16L14 46Z" fill="#AA771C" />
          <path d="M50 46L52 50H48L50 46Z" fill="#AA771C" />
          
          {/* Elegant Cleaning Swoosh (Higher arc to avoid cluttering the sofa) */}
          <path 
            d="M65 15C55 10 30 15 15 35" 
            stroke="url(#premiumGoldFix)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            opacity="0.5"
          />
          {/* Sparkles outside the main text area */}
          <path d="M65 10L67 14L71 16L67 18L65 22L63 18L59 16L63 14L65 10Z" fill="url(#premiumGoldFix)" />
        </g>

        {/* --- TYPOGRAPHY: MAX SPACE --- */}
        <g transform="translate(75, 42)">
          <text 
            fontFamily="Outfit, sans-serif" 
            fontSize="32" 
            fontWeight="900" 
            letterSpacing="-0.03em" 
            fill={isLight ? "white" : "#0F172A"}
          >
            Limpia
          </text>
          <text 
            x="102" 
            fontFamily="Outfit, sans-serif" 
            fontSize="32" 
            fontWeight="900" 
            letterSpacing="-0.03em" 
            fill="url(#premiumGoldFix)"
          >
            Max
          </text>
        </g>
        
        {/* Supporting Line (Decorative) */}
        <rect x="75" y="48" width="150" height="1.5" rx="0.75" fill="url(#premiumGoldFix)" opacity="0.15" />
      </svg>
    </div>
  );
}
