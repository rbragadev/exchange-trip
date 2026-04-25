# Exchange Trip — Foundation Core

## Stack
- npm workspaces
- TypeScript + ESLint + Prettier
- NestJS API + Prisma + PostgreSQL
- Next.js Admin SaaS + shadcn-like components + Tailwind
- Expo mobile with Expo Router + React Query + Zustand

## Execução

1. `make install`
2. `make db-up`
3. `make db-migrate`
4. `make db-seed`
5. `make dev`

## URLs esperadas
- API: `http://localhost:3000/api/health`
- API Docs: `http://localhost:3000/api/docs`
- Admin: `http://localhost:3001`
- Mobile: `npx expo start` no `apps/mobile`
