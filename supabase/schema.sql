-- Schema do dashboard de cliques — links.filipeabdalla.com
-- Rodar uma única vez no Supabase SQL Editor após criar o projeto.

create extension if not exists "uuid-ossp";

create table if not exists public.clicks (
  id uuid primary key default uuid_generate_v4(),
  link_id text not null,
  device text not null check (device in ('mobile','tablet','desktop')),
  country text,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists clicks_created_at_idx on public.clicks (created_at desc);
create index if not exists clicks_link_id_idx on public.clicks (link_id);

-- Row Level Security: a tabela só é acessada pelo backend (service_role key).
-- Bloqueamos acesso anônimo/autenticado pra evitar leitura/escrita pelo client.
alter table public.clicks enable row level security;

-- Sem policies = ninguém via anon/authenticated key consegue acessar.
-- O service_role key (usado só no servidor) bypassa RLS automaticamente.
