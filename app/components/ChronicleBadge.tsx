import type { SVGProps } from 'react';

interface ChronicleBadgeProps extends SVGProps<SVGSVGElement> {
  number: string;
  year: string;
}

export function ChronicleBadge({ number, year, ...props }: ChronicleBadgeProps) {
  // Extract gradient color based on number
  const num = parseInt(number.replace(/\D/g, ''));
  const hue = (num * 15) % 360; // Creates different hues for each chronicle
  
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={`grad-${num}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: `hsl(${hue}, 70%, 45%)`, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: `hsl(${hue + 30}, 70%, 35%)`, stopOpacity: 1 }} />
        </linearGradient>
        
        <filter id={`shadow-${num}`}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Background circle */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill={`url(#grad-${num})`}
        filter={`url(#shadow-${num})`}
      />
      
      {/* Decorative ring */}
      <circle
        cx="100"
        cy="100"
        r="85"
        fill="none"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
      />
      
      {/* HD text */}
      <text
        x="100"
        y="75"
        textAnchor="middle"
        fill="white"
        fontSize="24"
        fontWeight="300"
        letterSpacing="4"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        HD
      </text>
      
      {/* Kronika text */}
      <text
        x="100"
        y="95"
        textAnchor="middle"
        fill="rgba(255, 255, 255, 0.9)"
        fontSize="16"
        fontWeight="300"
        letterSpacing="2"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        KRONIKA
      </text>
      
      {/* Chronicle number */}
      <text
        x="100"
        y="130"
        textAnchor="middle"
        fill="white"
        fontSize="42"
        fontWeight="700"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        #{number}
      </text>
      
      {/* Year */}
      <text
        x="100"
        y="155"
        textAnchor="middle"
        fill="rgba(255, 255, 255, 0.8)"
        fontSize="14"
        fontWeight="300"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        {year}
      </text>
      
      {/* Bottom decorative line */}
      <line
        x1="60"
        y1="170"
        x2="140"
        y2="170"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1"
      />
    </svg>
  );
}
