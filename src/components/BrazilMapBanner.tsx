"use client";

const CITIES: { name: string; cx: number; cy: number; delay: number }[] = [
  { name: "Manaus",        cx: 28, cy: 22, delay: 0 },
  { name: "Fortaleza",     cx: 78, cy: 28, delay: 0.3 },
  { name: "Recife",        cx: 84, cy: 38, delay: 0.6 },
  { name: "Salvador",      cx: 80, cy: 50, delay: 0.9 },
  { name: "Brasília",      cx: 55, cy: 50, delay: 1.2 },
  { name: "BH",            cx: 64, cy: 60, delay: 1.5 },
  { name: "Rio",           cx: 70, cy: 68, delay: 1.8 },
  { name: "São Paulo",     cx: 60, cy: 70, delay: 2.1 },
  { name: "Campo Grande",  cx: 42, cy: 62, delay: 2.4 },
  { name: "Florianópolis", cx: 58, cy: 84, delay: 2.7 },
];

export function BrazilMapBanner() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Dotted grid background — suggests "map" */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="pin-glow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Connecting routes — São Paulo as central hub */}
        <g
          stroke="#ffffff"
          strokeOpacity="0.22"
          strokeWidth="0.3"
          strokeDasharray="0.8 1.2"
          fill="none"
        >
          {/* From São Paulo to all others */}
          <line x1="60" y1="70" x2="28" y2="22" />
          <line x1="60" y1="70" x2="78" y2="28" />
          <line x1="60" y1="70" x2="84" y2="38" />
          <line x1="60" y1="70" x2="80" y2="50" />
          <line x1="60" y1="70" x2="55" y2="50" />
          <line x1="60" y1="70" x2="64" y2="60" />
          <line x1="60" y1="70" x2="70" y2="68" />
          <line x1="60" y1="70" x2="42" y2="62" />
          <line x1="60" y1="70" x2="58" y2="84" />
        </g>

        {/* City pins with pulsing glow */}
        {CITIES.map((c) => (
          <g key={c.name}>
            <circle
              cx={c.cx}
              cy={c.cy}
              r="5"
              fill="url(#pin-glow)"
              style={{
                animation: `mapPulse 3s ease-in-out ${c.delay}s infinite`,
                transformOrigin: `${c.cx}px ${c.cy}px`,
              }}
            />
            <circle cx={c.cx} cy={c.cy} r="0.9" fill="#ffffff" />
          </g>
        ))}

        {/* Subtle Brazil text watermark */}
        <text
          x="50"
          y="13"
          textAnchor="middle"
          fontSize="3.2"
          fontWeight="700"
          letterSpacing="2"
          fill="#ffffff"
          fillOpacity="0.35"
        >
          BRASIL
        </text>
      </svg>

      <style jsx>{`
        @keyframes mapPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.6); }
        }
      `}</style>
    </div>
  );
}
