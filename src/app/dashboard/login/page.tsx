import { Lock } from "lucide-react";

type SearchParams = Promise<{ error?: string; from?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error, from } = await searchParams;

  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-10">
      <div className="glass w-full max-w-sm rounded-2xl p-8">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#03A0CD]/15 text-[#03A0CD]">
            <Lock className="h-5 w-5" />
          </div>
        </div>
        <h1 className="text-center font-display text-xl font-semibold text-[#F4F4F4]">
          Dashboard
        </h1>
        <p className="mt-1 text-center text-sm text-[#F4F4F4]/60">
          Acesso restrito
        </p>

        <form action="/api/auth/login" method="post" className="mt-6 space-y-3">
          <input type="hidden" name="from" value={from ?? "/dashboard"} />
          <input
            type="password"
            name="password"
            required
            autoFocus
            placeholder="Senha"
            className="w-full rounded-xl border border-[#03A0CD]/25 bg-white/5 px-4 py-3 text-[#F4F4F4] placeholder:text-[#F4F4F4]/40 focus:border-[#03A0CD] focus:outline-none focus:ring-2 focus:ring-[#03A0CD]/30"
          />
          {error && (
            <p className="text-sm text-red-400">Senha inválida. Tente novamente.</p>
          )}
          <button
            type="submit"
            className="glass-cta btn-shine relative w-full overflow-hidden rounded-xl px-4 py-3 font-display font-semibold text-white transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
