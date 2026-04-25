import { Avatar } from "@/components/Avatar";
import { ProductCard } from "@/components/ProductCard";
import { SocialIcons } from "@/components/SocialIcons";
import { PRODUCTS } from "@/lib/links";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-8 sm:py-12">
      <header className="flex flex-col items-center text-center">
        <Avatar />
        <h1 className="mt-5 font-display text-[22px] sm:text-2xl font-bold tracking-tight text-[#F4F4F4]">
          Dr. Filipe Abdalla
        </h1>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#03A0CD]">
          Fisioterapeuta Esportivo · PhD
        </p>
        <p className="mt-3 max-w-[280px] text-[14px] leading-relaxed text-[#F4F4F4]/70">
          Qualificando profissionais com qualidade e excelência.
        </p>
      </header>

      <section
        aria-label="Produtos e atendimento"
        className="mt-8 flex w-full flex-col gap-4"
      >
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </section>

      <div className="mt-8">
        <SocialIcons />
      </div>

      <footer className="mt-auto pt-10 pb-2 text-center text-[11px] text-[#F4F4F4]/35">
        <p>© {new Date().getFullYear()} Dr. Filipe Abdalla</p>
        <p className="mt-1">CREFITO · Fisioterapia Esportiva</p>
      </footer>
    </main>
  );
}
