"use client";

// Silhueta simplificada do Brasil (viewBox 0 0 100 110)
// Aproximação reconhecível: protrusão NE de Fortaleza, RS na ponta sul, Acre no oeste
const BRAZIL_PATH =
  "M 50,4 Q 62,2 72,4 Q 82,7 87,13 Q 93,20 96,30 Q 98,38 96,42 L 99,46 Q 95,52 90,52 Q 94,60 87,66 Q 84,73 77,78 Q 80,86 72,92 L 65,99 Q 56,108 48,108 Q 38,104 32,94 Q 26,86 21,78 Q 15,70 10,60 Q 5,48 4,38 Q 6,28 14,20 Q 24,13 35,9 Q 42,6 50,4 Z";

const CITIES: { name: string; cx: number; cy: number; delay: number }[] = [
  { name: "Manaus", cx: 30, cy: 24, delay: 0 },
  { name: "Fortaleza", cx: 80, cy: 22, delay: 0.3 },
  { name: "Recife", cx: 88, cy: 36, delay: 0.6 },
  { name: "Salvador", cx: 82, cy: 50, delay: 0.9 },
  { name: "Brasília", cx: 60, cy: 58, delay: 1.2 },
  { name: "BH", cx: 70, cy: 70, delay: 1.5 },
  { name: "Rio", cx: 75, cy: 80, delay: 1.8 },
  { name: "São Paulo", cx: 64, cy: 82, delay: 2.1 },
  { name: "Campo Grande", cx: 45, cy: 75, delay: 2.4 },
  { name: "Florianópolis", cx: 62, cy: 96, delay: 2.7 },
];

export function BrazilMapBanner() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Grid sutil de fundo */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <svg
        viewBox="0 0 100 110"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="pin-glow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="brazil-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Silhueta do Brasil */}
        <path
          d={BRAZIL_PATH}
          fill="url(#brazil-fill)"
          stroke="#ffffff"
          strokeOpacity="0.45"
          strokeWidth="0.5"
        />

        {/* Conexões hub-and-spoke saindo de São Paulo */}
        <g
          stroke="#ffffff"
          strokeOpacity="0.18"
          strokeWidth="0.25"
          strokeDasharray="0.8 1.2"
          fill="none"
        >
          <line x1="64" y1="82" x2="30" y2="24" />
          <line x1="64" y1="82" x2="80" y2="22" />
          <line x1="64" y1="82" x2="88" y2="36" />
          <line x1="64" y1="82" x2="82" y2="50" />
          <line x1="64" y1="82" x2="60" y2="58" />
          <line x1="64" y1="82" x2="70" y2="70" />
          <line x1="64" y1="82" x2="75" y2="80" />
          <line x1="64" y1="82" x2="45" y2="75" />
          <line x1="64" y1="82" x2="62" y2="96" />
        </g>

        {/* Pins das cidades pulsando */}
        {CITIES.map((c) => (
          <g key={c.name}>
            <circle
              cx={c.cx}
              cy={c.cy}
              r="4.5"
              fill="url(#pin-glow)"
              style={{
                animation: `mapPulse 3s ease-in-out ${c.delay}s infinite`,
                transformOrigin: `${c.cx}px ${c.cy}px`,
              }}
            />
            <circle cx={c.cx} cy={c.cy} r="0.9" fill="#ffffff" />
          </g>
        ))}

        {/* Watermark BRASIL */}
        <text
          x="50"
          y="13"
          textAnchor="middle"
          fontSize="3.2"
          fontWeight="700"
          letterSpacing="2"
          fill="#ffffff"
          fillOpacity="0.32"
        >
          BRASIL
        </text>
      </svg>

      <style jsx>{`
        @keyframes mapPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}
