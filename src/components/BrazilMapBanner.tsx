"use client";

/**
 * Pins de cidades posicionados em % dentro do container.
 * Coordenadas calibradas pra silhueta real do /img/brazil.svg.
 */
const CITIES: { name: string; x: number; y: number; delay: number }[] = [
  { name: "Manaus", x: 30, y: 30, delay: 0 },
  { name: "Fortaleza", x: 78, y: 24, delay: 0.3 },
  { name: "Recife", x: 88, y: 36, delay: 0.6 },
  { name: "Salvador", x: 82, y: 50, delay: 0.9 },
  { name: "Brasília", x: 60, y: 56, delay: 1.2 },
  { name: "BH", x: 67, y: 66, delay: 1.5 },
  { name: "Rio", x: 72, y: 73, delay: 1.8 },
  { name: "São Paulo", x: 62, y: 76, delay: 2.1 },
  { name: "Campo Grande", x: 47, y: 70, delay: 2.4 },
  { name: "Florianópolis", x: 58, y: 88, delay: 2.7 },
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

      {/* Silhueta real do Brasil via CSS mask - cor do background "atravessa" o shape */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: "url(/img/brazil.svg)",
          maskImage: "url(/img/brazil.svg)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
        }}
      />

      {/* Stroke do Brasil - mesma SVG mas com border via filter trick */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          WebkitMaskImage: "url(/img/brazil.svg)",
          maskImage: "url(/img/brazil.svg)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          background: "transparent",
          boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.4)",
        }}
      />

      {/* Pins de cidades */}
      {CITIES.map((c) => (
        <div
          key={c.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-md"
            style={{
              width: 18,
              height: 18,
              animation: `mapPulse 3s ease-in-out ${c.delay}s infinite`,
            }}
          />
          <div className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.6)]" />
        </div>
      ))}

      {/* Watermark BRASIL */}
      <div className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-white/35">
        Brasil
      </div>

      <style jsx>{`
        @keyframes mapPulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.7); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.6); }
        }
      `}</style>
    </div>
  );
}
