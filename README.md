# ABA — Tourgeman (Frontend)

Application **Next.js (App Router) + TypeScript + Tailwind** pour :
- **Uploader** des livres en hébreu (PDF)
- Suivre le **statut** de traduction (polling)
- **Télécharger** le DOCX traduit
- Gérer un **glossaire** (mémoire de traduction)
- Basculer l’interface en **FR / EN / HE** (RTL automatique pour l’hébreu)

## Démarrage

1) Installer

```bash
npm install
```

2) Configurer le backend (optionnel)

Par défaut, le proxy utilise `https://aba-backend-9lba.onrender.com`.

Copie `example.env` → `.env` et ajuste si besoin :

```bash
ABA_BACKEND_URL=https://aba-backend-9lba.onrender.com
```

3) Lancer en dev

```bash
npm run dev
```

## Architecture (high level)

- **UI / pages** : `src/app/(app)/*`
- **Composants** : `src/components/*`
- **Proxy API (route handlers)** : `src/app/api/*` (forward vers le backend)
- **i18n** : `src/i18n/*` + `messages/*.json`
- **History local** (jobs) : `src/lib/history.ts` (localStorage)

## Backend

Le frontend appelle **uniquement** les endpoints Next (`/api/*`) qui proxy le backend :
- `GET /api/health`
- `POST /api/translate`
- `GET /api/jobs/:id`
- `GET /api/jobs/:id/download`
- `GET/POST /api/glossary`

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
