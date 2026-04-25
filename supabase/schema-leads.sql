-- Tabela de leads do bootcamp (lista de espera por cidade)
-- Rodar uma única vez no Supabase SQL Editor.

create table if not exists public.bootcamp_leads (
  id uuid primary key default uuid_generate_v4(),
  nome text not null,
  whatsapp text not null,
  cidade text not null,
  source text default 'proximas-turmas',
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.bootcamp_leads (created_at desc);
create index if not exists leads_cidade_idx on public.bootcamp_leads (cidade);

-- Mesma estratégia da tabela clicks: RLS on, sem policies = só backend acessa.
alter table public.bootcamp_leads enable row level security;
