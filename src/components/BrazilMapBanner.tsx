"use client";

const CITIES: { name: string; cx: number; cy: number; delay: number }[] = [
  { name: "Manaus", cx: 32, cy: 35, delay: 0 },
  { name: "Brasília", cx: 56, cy: 62, delay: 0.4 },
  { name: "BH", cx: 67, cy: 73, delay: 0.8 },
  { name: "Rio", cx: 72, cy: 80, delay: 1.2 },
  { name: "São Paulo", cx: 65, cy: 85, delay: 1.6 },
  { name: "Florianópolis", cx: 60, cy: 96, delay: 2.0 },
  { name: "Campo Grande", cx: 45, cy: 78, delay: 2.4 },
];

export function BrazilMapBanner() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <svg
        viewBox="0 0 100 110"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="pin-glow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="brazil-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Brazil silhouette (simplified) */}
        <path
          d="M 30,8 Q 45,5 60,7 Q 72,10 80,18 Q 88,28 90,40 Q 92,55 87,68 Q 82,80 73,90 Q 65,100 55,107 Q 45,108 38,103 Q 28,95 22,82 Q 14,68 10,52 Q 8,38 14,25 Q 22,14 30,8 Z"
          fill="url(#brazil-fill)"
          stroke="#ffffff"
          strokeOpacity="0.25"
          strokeWidth="0.4"
        />

        {/* Connecting lines between pins (route feel) */}
        <g stroke="#ffffff" strokeOpacity="0.18" strokeWidth="0.25" strokeDasharray="0.8 0.8" fill="none">
          <path d="M 32,35 L 56,62 L 67,73 L 72,80 L 65,85 L 60,96" />
          <path d="M 56,62 L 45,78" />
        </g>

        {/* City pins with pulsing glow */}
        {CITIES.map((c) => (
          <g key={c.name}>
            <circle
              cx={c.cx}
              cy={c.cy}
              r="6"
              fill="url(#pin-glow)"
              style={{
                animation: `mapPulse 3s ease-in-out ${c.delay}s infinite`,
                transformOrigin: `${c.cx}px ${c.cy}px`,
              }}
            />
            <circle cx={c.cx} cy={c.cy} r="1.1" fill="#ffffff" />
          </g>
        ))}
      </svg>

      <style jsx>{`
        @keyframes mapPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}
