# AI Agent Instructions

## Purpose
This file helps AI coding agents understand the repository structure, conventions, and developer workflow for this Next.js portfolio project.

## Project overview
- Next.js 16 App Router project written in TypeScript.
- Tailwind CSS v4 and custom UI primitives under `src/components/ui/`.
- Uses Radix UI components, `next-themes`, `react-three/fiber`, and `Resend` for email sending.
- Contains a contact form with Cloudflare Turnstile verification and a server-side API route.

## Key files and directories
- `package.json`: install and run scripts.
- `README.md`: main project documentation.
- `next.config.mjs`: `output: 'standalone'` and `typescript.ignoreBuildErrors: true`.
- `src/app/page.tsx`: main homepage composition.
- `src/app/layout.tsx`: app layout and global wrappers.
- `src/components/sections/`: portfolio sections like hero, about, skills, contact, gallery.
- `src/components/ui/`: reusable UI components and shadcn-style primitives.
- `src/app/api/contact/route.ts`: contact API endpoint using Resend and Turnstile.
- `src/app/api/download-cv/route.ts`: download endpoint.
- `src/lib/validate.ts`: validation utilities for forms.
- `src/lib/rate-limit.ts`: rate limiting for contact submissions.

## Environment and runtime notes
- Requires `.env.local` for secrets and public keys.
- Important env variables:
  - `RESEND_API_KEY`
  - `CONTACT_EMAIL`
  - `CLOUDFLARE_SECRET_KEY`
  - `NEXT_PUBLIC_CLOUDFLARE_SITE_KEY`
- Contact form expects client-side Turnstile token and server-side verification.
- The contact endpoint handles spam prevention via honeypot, rate limiting, and Turnstile.

## Scripts
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run lint:fix`

## Styling and component conventions
- Uses Tailwind utility classes in JSX.
- `use client` is required on shared client components in `src/components/`.
- Core sections are assembled in `src/app/page.tsx`; adding or removing sections should update that file.

## Guidance for code changes
- Preserve responsive design and dark/light theme support.
- Keep business logic in `src/lib/` and UI markup in `src/components/`.
- For new API behavior, follow the existing `src/app/api/contact/route.ts` server-side pattern.
- Keep component props typed and prefer `const` where possible to follow lint rules.

## Useful links
- [README.md](README.md)

---

> If you want, I can also add a focused custom skill for contact form and email validation maintenance, or a prompt file to help update UI sections consistently.