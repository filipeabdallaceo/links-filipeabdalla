import Image from "next/image";

export function Avatar() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute inset-0 -m-2 rounded-full bg-[radial-gradient(circle,rgba(3,160,205,0.55)_0%,transparent_70%)] blur-xl"
      />
      <div className="relative h-16 w-16 sm:h-28 sm:w-28 rounded-full ring-2 ring-[#03A0CD]/70 ring-offset-2 sm:ring-offset-4 ring-offset-[#000000] overflow-hidden bg-gradient-to-br from-[#02097D] to-[#03A0CD]">
        <Image
          src="/img/filipe.jpg"
          alt="Dr. Filipe Abdalla — Fisioterapeuta Esportivo"
          fill
          sizes="120px"
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 h-4 w-4 sm:h-6 sm:w-6 rounded-full bg-[#03A0CD] ring-2 sm:ring-4 ring-[#000000] flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-white" aria-hidden>
          <path d="M9 16.17 4.83 12l-1.42 1.41L9 19l12-12-1.41-1.41z" />
        </svg>
      </div>
    </div>
  );
}
