# OBSIDIAN — Estética Automotiva de Alta Performance

Landing page da OBSIDIAN Auto Detailing: vitrificação cerâmica, PPF, polimento técnico e proteção automotiva de nível concours.

## Tecnologias

- [TanStack Start](https://tanstack.com/start) (SSR + roteamento por arquivo, sobre Vite)
- [TanStack Router](https://tanstack.com/router) / [TanStack Query](https://tanstack.com/query)
- React 19 + TypeScript
- Tailwind CSS v4
- [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives)
- [motion](https://motion.dev) (Framer Motion) para animações
- Nitro (build/deploy adapter)

## Como instalar

```bash
npm install
# ou, se preferir bun (há um bun.lock no repo):
bun install
```

## Como executar (desenvolvimento)

```bash
npm run dev
```

Abre em `http://localhost:3000` (ou porta indicada no terminal), com hot reload.

## Como fazer build

```bash
npm run build
```

Gera o build de produção via Vite/Nitro em `.output`.

Para pré-visualizar o build localmente:

```bash
npm run preview
```

## Scripts disponíveis

| Script              | Descrição                            |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Inicia o servidor de desenvolvimento |
| `npm run build`     | Build de produção                    |
| `npm run build:dev` | Build em modo development (debug)    |
| `npm run preview`   | Serve o build de produção localmente |
| `npm run lint`      | Roda o ESLint                        |
| `npm run format`    | Formata o código com Prettier        |

## Estrutura do projeto

```
src/
├── assets/images/       Imagens usadas nas seções (hero, galeria, before/after, cta)
├── components/
│   ├── ui/               Componentes shadcn/ui (base, não editar à mão)
│   ├── common/           Primitivos: Reveal, Counter, GlowButton, Eyebrow,
│   │                     ScrollProgressBar, CustomCursor
│   ├── layout/           Navbar (com menu mobile e scroll-spy) e Footer
│   └── sections/         Cada seção da landing page (Hero, Services, Gallery,
│                         Differentiators, MidCta, Location, ...)
├── constants/            Dados estáticos das seções (services, packages, faq, etc.)
├── types/                Interfaces TypeScript compartilhadas (ServiceItem, FaqItem, ...)
├── hooks/                Hooks customizados (use-mobile, use-scroll-progress)
├── lib/                  Utilitários e tratamento de erros (cn, error-capture, ...)
├── styles/global.css     Estilos globais, tema (Tailwind v4 via @theme) e utilities customizadas
├── routes/               Rotas do TanStack Router (roteamento por arquivo: index.tsx = "/")
├── router.tsx            Configuração do router + QueryClient
├── server.ts / start.ts  Entrypoint SSR e middleware de erro do TanStack Start
└── routeTree.gen.ts      Árvore de rotas gerada automaticamente (não editar)
```

> Este projeto não usa `pages/`, `context/` ou `App.tsx` porque o roteamento já é por
> arquivo (`src/routes/`, convenção do TanStack Router) e não há estado global ou
> chamadas de API hoje — se isso mudar, `context/` (para providers) e `services/`
> (para chamadas HTTP) são os lugares naturais para crescer.

## Publicando

### Fluxo atual (Lovable / Cloudflare)

O build usa o preset padrão do Nitro configurado por `@lovable.dev/vite-tanstack-config`
(ver `vite.config.ts`), voltado para Cloudflare. O projeto está conectado ao
[Lovable](https://lovable.dev) — commits enviados para a branch conectada sincronizam
automaticamente com o editor do Lovable. **Não force push, rebase ou amend em commits
já publicados** (ver `AGENTS.md`), isso reescreve o histórico do lado do Lovable.

### Publicando na Vercel

Para publicar na Vercel em vez do fluxo Cloudflare/Lovable, troque o preset do Nitro em
`vite.config.ts`:

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server", preset: "vercel" },
  },
});
```

Depois:

1. Importe o repositório na Vercel (Framework Preset: "Other" — o Nitro cuida do build).
2. Build Command: `npm run build`. Output: gerenciado pelo adapter Vercel do Nitro (`.vercel/output`).
3. Configure variáveis de ambiente (se houver) em Project Settings → Environment Variables.

Como isso desacopla o deploy do fluxo padrão do Lovable, confirme com o time se a
sincronização automática do Lovable ainda é necessária antes de migrar.

## Notas

- Há dois lockfiles no repositório (`package-lock.json` e `bun.lock`). Escolha um
  gerenciador de pacotes e remova o outro lockfile para evitar divergência de versões.
