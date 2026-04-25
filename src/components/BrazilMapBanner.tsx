"use client";

/**
 * Silhueta simplificada do Brasil (viewBox 0 0 100 110).
 * Traçada com base nos pontos extremos reais do território:
 * - NORTE: Roraima/Amapá (y ~ 2-5)
 * - NE: Cabo Branco/PB - ponto mais oriental (x ~ 99, y ~ 35)
 * - SUL: Chuí/RS - extremo sul (x ~ 50, y ~ 109)
 * - OESTE: Serra Contamana/AC - extremo oeste (x ~ 0, y ~ 38)
 * - Protrusão NE: Maranhão→Piauí→Ceará→RN→PB (bulge à direita)
 * - Protrusão Amapá: Cabo Orange (NE pequena)
 * - Triângulo sul: SC + RS afunilando
 */
const BRAZIL_PATH = [
  // Inicia no extremo norte de Roraima
  "M 35,2",
  // Topo norte → Pará (curva suave)
  "Q 45,1 55,3",
  "Q 62,4 65,6",
  // Subida pra Amapá / Cabo Orange (pequena protrusão NE no topo)
  "L 70,3 L 76,5",
  "Q 79,7 78,12",
  // Costa do Pará / Maranhão descendo
  "L 76,18 L 75,24",
  // Início da protrusão NE — Maranhão / Piauí
  "L 78,25",
  // Bulge do Ceará / RN
  "Q 87,21 93,25",
  // Cabo Branco (PB) — ponto mais oriental
  "L 98,30 L 99,35",
  // Costa leste descendo (Pernambuco → Alagoas → Sergipe)
  "Q 96,42 92,48",
  // Bahia (Salvador / Recôncavo)
  "L 89,55 L 86,62",
  // Espírito Santo / Vitória
  "Q 84,68 80,73",
  // Rio de Janeiro coast
  "L 76,78",
  // SP coast
  "L 70,82",
  // Paraná / SC coast
  "L 65,89",
  // Florianópolis / costa SC
  "L 62,95",
  // RS coast
  "L 58,103",
  // Chuí - extremo sul
  "L 52,109 L 47,108",
  // RS interior subindo
  "Q 42,103 38,98",
  // Fronteira PR / SC com Argentina (Foz do Iguaçu)
  "L 33,90",
  // MS / fronteira Paraguai
  "L 26,82 L 22,75",
  // Mato Grosso / fronteira Bolívia
  "L 16,68 L 12,60",
  // Rondônia
  "L 8,52 L 5,45",
  // Acre — extremo oeste (Serra Contamana)
  "L 1,40 L 0,36",
  // Subida pela Amazonas (oeste)
  "Q 3,28 8,22",
  // Roraima oeste
  "L 16,15 L 22,9",
  // Volta ao topo (NW de Roraima)
  "L 28,4",
  "Z",
].join(" ");

const CITIES: { name: string; cx: number; cy: number; delay: number }[] = [
  { name: "Manaus", cx: 25, cy: 28, delay: 0 },
  { name: "Fortaleza", cx: 86, cy: 25, delay: 0.3 },
  { name: "Recife", cx: 95, cy: 36, delay: 0.6 },
  { name: "Salvador", cx: 87, cy: 55, delay: 0.9 },
  { name: "Brasília", cx: 60, cy: 60, delay: 1.2 },
  { name: "BH", cx: 70, cy: 70, delay: 1.5 },
  { name: "Rio", cx: 75, cy: 78, delay: 1.8 },
  { name: "São Paulo", cx: 65, cy: 82, delay: 2.1 },
  { name: "Campo Grande", cx: 42, cy: 76, delay: 2.4 },
  { name: "Florianópolis", cx: 60, cy: 96, delay: 2.7 },
];

export function BrazilMapBanner() {
  return (
    <div className="relative h-full w-full overflow-hidden">
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

        <path
          d={BRAZIL_PATH}
          fill="url(#brazil-fill)"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="0.45"
          strokeLinejoin="round"
        />

        <g
          stroke="#ffffff"
          strokeOpacity="0.18"
          strokeWidth="0.25"
          strokeDasharray="0.8 1.2"
          fill="none"
        >
          <line x1="65" y1="82" x2="25" y2="28" />
          <line x1="65" y1="82" x2="86" y2="25" />
          <line x1="65" y1="82" x2="95" y2="36" />
          <line x1="65" y1="82" x2="87" y2="55" />
          <line x1="65" y1="82" x2="60" y2="60" />
          <line x1="65" y1="82" x2="70" y2="70" />
          <line x1="65" y1="82" x2="75" y2="78" />
          <line x1="65" y1="82" x2="42" y2="76" />
          <line x1="65" y1="82" x2="60" y2="96" />
        </g>

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
