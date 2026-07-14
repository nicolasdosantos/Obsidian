<div align="center">

# OBSIDIAN

### Estética Automotiva de Alta Performance

Landing page institucional de alta conversão para a **OBSIDIAN Auto Detailing** — vitrificação cerâmica, PPF, polimento técnico e proteção automotiva de nível *concours*.

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-ff4154?logo=react&logoColor=white)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/license-Proprietary-lightgrey)](#licença)

</div>

---

## Visão geral

SPA/SSR de página única, construída para ser rápida, fluida e visualmente premium — coerente com o posicionamento de uma marca de detalhamento automotivo de alto padrão. Foco em performance de carregamento, microinterações (reveal on scroll, contadores animados, cursor customizado) e uma arquitetura de componentes que separa claramente **apresentação** (`sections/`), **dados** (`constants/`) e **primitivos reutilizáveis** (`common/`, `ui/`).

Sem backend, sem estado global e sem chamadas de API — é conteúdo estático servido via SSR, o que mantém o projeto simples de manter e extremamente rápido de carregar.

## Stack técnica

| Camada | Tecnologia | Por quê |
| --- | --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) | SSR + roteamento por arquivo sobre Vite, sem a complexidade de um framework full-stack |
| Roteamento / dados | [TanStack Router](https://tanstack.com/router) · [TanStack Query](https://tanstack.com/query) | Type-safety de rotas ponta a ponta; Query pronto para quando houver dados assíncronos |
| UI | React 19 + TypeScript | Base tipada, componentes de servidor/cliente do React 19 |
| Estilo | Tailwind CSS v4 (`@theme`) | Design tokens centralizados, zero CSS solto |
| Componentes | [shadcn/ui](https://ui.shadcn.com) sobre Radix UI | Acessibilidade e composição sem lock-in de biblioteca |
| Animação | [Motion](https://motion.dev) (Framer Motion) | Reveal on scroll, contadores, transições |
| Build/Deploy | Vite 8 + Nitro | Build único, múltiplos presets de deploy (Cloudflare/Vercel) |
| Qualidade | ESLint + Prettier + TypeScript strict | Consistência de código automatizada |

## Destaques de implementação

- **Arquitetura orientada a seções** — cada bloco da página (`Hero`, `Services`, `Gallery`, `Process`, `Packages`, `Testimonials`, `Faq`, etc.) é um componente isolado em `src/components/sections/`, alimentado por dados tipados em `src/constants/`. Adicionar ou reordenar seções não exige tocar em lógica de página.
- **Design system tipado** — interfaces compartilhadas (`ServiceItem`, `FaqItem`, `DifferentiatorItem`...) em `src/types/` garantem que conteúdo e UI nunca dessincronizem.
- **Microinterações sob medida** — `Reveal`, `Counter`, `GlowButton`, `CustomCursor`, `ScrollProgressBar` e `AmbientGlow` em `src/components/common/` compõem a linguagem visual da marca sem depender de libs de animação genéricas soltas pela página.
- **SSR com tratamento de erro dedicado** — `server.ts` / `start.ts` centralizam o entrypoint SSR e o middleware de captura de erros (`lib/error-capture.ts`, `lib/error-page.ts`), evitando telas brancas em produção.
- **Roteamento por arquivo** — `src/routes/` segue a convenção do TanStack Router; `routeTree.gen.ts` é gerado automaticamente e nunca editado manualmente.

## Como executar

```bash
# instale as dependências
bun install     # recomendado (há bun.lock no repo)
# ou
npm install

# ambiente de desenvolvimento (hot reload)
npm run dev
```

Abre em `http://localhost:3000` (ou a porta indicada no terminal).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Build de produção (Vite + Nitro) |
| `npm run build:dev` | Build em modo development, para debug |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Roda o ESLint |
| `npm run format` | Formata o código com Prettier |

## Estrutura do projeto

```
src/
├── assets/images/     Imagens das seções (hero, galeria, before/after, cta)
├── components/
│   ├── ui/             Componentes shadcn/ui (base, não editar à mão)
│   ├── common/         Primitivos: Reveal, Counter, GlowButton, Eyebrow,
│   │                   ScrollProgressBar, CustomCursor, AmbientGlow, Preloader
│   ├── layout/         Navbar (menu mobile + scroll-spy) e Footer
│   └── sections/       Cada seção da landing page (Hero, Services, Gallery,
│                       Differentiators, Packages, Process, Testimonials, Faq...)
├── constants/          Dados estáticos das seções (services, packages, faq...)
├── types/              Interfaces TypeScript compartilhadas
├── hooks/               Hooks customizados (use-mobile, use-scroll-progress)
├── lib/                 Utilitários e tratamento de erros (cn, error-capture...)
├── styles/global.css    Estilos globais, tema (Tailwind v4 via @theme)
├── routes/              Rotas do TanStack Router (roteamento por arquivo)
├── router.tsx           Configuração do router + QueryClient
├── server.ts / start.ts Entrypoint SSR e middleware de erro do TanStack Start
└── routeTree.gen.ts     Árvore de rotas gerada automaticamente (não editar)
```

> Sem `pages/`, `context/` ou `App.tsx`: o roteamento já é por arquivo e não há
> estado global nem chamadas de API hoje. Se isso mudar, `context/` (providers)
> e `services/` (chamadas HTTP) são os lugares naturais para crescer.

## Deploy

O projeto builda com Vite + Nitro, que suporta múltiplos presets de deploy. O alvo atual é **Vercel**:

```ts
// vite.config.ts
export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
  nitro: { preset: "vercel" },
});
```

1. Importe o repositório na Vercel (Framework Preset: **Other** — o Nitro cuida do build).
2. Build Command: `npm run build`. Output gerenciado pelo adapter Vercel do Nitro (`.vercel/output`).
3. Configure variáveis de ambiente, se houver, em *Project Settings → Environment Variables*.

## Notas de manutenção

- Há dois lockfiles no repositório (`package-lock.json` e `bun.lock`). Escolha um gerenciador de pacotes e remova o outro para evitar divergência de versões.
- `routeTree.gen.ts` e `tsconfig.tsbuildinfo` são artefatos gerados — não editar manualmente.

## Licença

Projeto proprietário — todos os direitos reservados à OBSIDIAN Auto Detailing.
