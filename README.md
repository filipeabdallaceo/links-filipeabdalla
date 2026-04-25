# Links Filipe Abdalla

Link-in-bio + dashboard de cliques pra `links.filipeabdalla.com`.

- **Stack:** Next.js 16 · React 19 · Tailwind v4 · Supabase · Recharts · Framer Motion
- **Dashboard:** `/dashboard` (protegido por senha)

---

## 1. Salvar a foto

Salve a foto enviada como JPG aqui:

```
public/img/filipe.jpg
```

(Abrir a imagem no app **Pré-visualização** do Mac → Arquivo → Exportar → JPG → salvar nesse caminho.)

---

## 2. Criar conta no Supabase (banco)

1. Vá em https://supabase.com → **Start your project** → entre com o Google
2. **New project** → nome: `filipeabdalla-links` · senha do banco: pode gerar aleatória · região: **South America (São Paulo)**
3. Aguarde ~2 min até o projeto provisionar
4. Menu lateral → **SQL Editor** → cole TODO o conteúdo de `supabase/schema.sql` → **Run**
5. Menu lateral → **Settings** → **API**, copie:
   - `Project URL` → cola em `SUPABASE_URL` no `.env.local`
   - `service_role` (ATENÇÃO: chave secreta, nunca compartilhar) → cola em `SUPABASE_SERVICE_ROLE_KEY`

---

## 3. Rodar localmente

```bash
npm run dev
```

Abra:
- **Bio:** http://localhost:3000
- **Dashboard:** http://localhost:3000/dashboard (senha em `DASHBOARD_PASSWORD`)

---

## 4. Subir pro GitHub

Se ainda não tem conta:
1. Vá em https://github.com/signup → criar com email `filipeabdalla@icloud.com`
2. Confirma o email

Depois, na pasta do projeto:

```bash
cd ~/Desktop/links-filipeabdalla
git init
git add .
git commit -m "feat: link in bio + dashboard de cliques"
gh repo create links-filipeabdalla --private --source=. --remote=origin --push
```

(Se não tiver `gh` instalado, criar repo manualmente em github.com/new e:)

```bash
git remote add origin git@github.com:SEU-USUARIO/links-filipeabdalla.git
git branch -M main
git push -u origin main
```

---

## 5. Deploy no Vercel

1. Vá em https://vercel.com/signup → entrar com GitHub
2. **Add New** → **Project** → selecionar `links-filipeabdalla`
3. **Environment Variables** — adicionar 3:
   - `SUPABASE_URL` = (mesma do Supabase)
   - `SUPABASE_SERVICE_ROLE_KEY` = (mesma do Supabase)
   - `DASHBOARD_PASSWORD` = `91548930`
4. **Deploy** → aguardar ~1 min

---

## 6. Apontar `links.filipeabdalla.com` no Squarespace

1. No Vercel, projeto criado → **Settings** → **Domains** → adicionar `links.filipeabdalla.com`
2. Vercel vai mostrar 1 registro CNAME (algo como `cname.vercel-dns.com`)
3. Vá em https://account.squarespace.com/domains/managed/filipeabdalla.com/dns/dns-settings
4. **Add Record** → tipo **CNAME** · host **links** · data: o CNAME que o Vercel mostrou
5. Salvar e aguardar 5-15 min (DNS propaga). O Vercel detecta e emite SSL automaticamente.

---

## 7. Atualizar bio do Instagram

Substituir o link da bio por:
```
https://links.filipeabdalla.com
```

Pronto. Cada clique já cai no dashboard.

---

## Como adicionar/editar links depois

Mexer só em `src/lib/links.ts`, `git push`, e o Vercel re-deploy automaticamente.

```ts
{
  id: "novo-link",                    // único, vira ID nas métricas
  label: "Novo Botão",
  description: "subtítulo",
  href: "https://destino.com",
  iconName: "sparkles",               // ver opções em IconName
  highlight: true,                    // opcional, vira CTA destaque
}
```

---

## Estrutura

```
src/
├─ app/
│  ├─ page.tsx                  ← landing do bio
│  ├─ api/click/route.ts        ← endpoint que loga e redireciona
│  ├─ api/auth/login/route.ts   ← login do dashboard
│  ├─ api/auth/logout/route.ts
│  └─ dashboard/
│     ├─ page.tsx               ← server: busca dados
│     ├─ DashboardClient.tsx    ← client: charts (Recharts)
│     └─ login/page.tsx
├─ components/
│  ├─ Avatar.tsx
│  ├─ LinkButton.tsx
│  └─ SocialIcons.tsx
├─ lib/
│  ├─ links.ts                  ← config dos botões (editar aqui)
│  ├─ analytics.ts              ← agregações pro dashboard
│  ├─ supabase.ts
│  ├─ auth.ts
│  └─ device.ts
├─ proxy.ts                     ← protege /dashboard (Next 16: era middleware.ts)
└─ supabase/schema.sql          ← rodar 1x no SQL Editor
```
