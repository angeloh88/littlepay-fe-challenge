# PayQuick Frontend

Frontend for **PayQuick**: a Next.js app with marketing pages, authentication, and an authenticated area for dashboard and transactions. The UI talks to a mock API via Next.js route handlers (`src/app/api/v1/...`), which proxy to the backend configured by environment variables.

## Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query** for server state
- **Radix UI** and **shadcn-style** primitives under `src/components/ui`

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- **npm** (ships with Node)

## Install

From this directory:

```bash
npm install
```

## Environment

Copy the example file and adjust values if needed:

```bash
cp .env.example .env.local
```

| Variable                                 | Purpose                                                    |
| ---------------------------------------- | ---------------------------------------------------------- |
| `MOCK_API_ORIGIN`                        | Base URL of the mock API (default `http://localhost:3001`) |
| `NEXT_PUBLIC_APP_URL`                    | Public app URL (default `http://localhost:3000`)           |
| `SESSION_ACCESS_COOKIE_TIMEOUTINMINUTES` | Access session cookie lifetime in minutes                  |
| `SESSION_REFRESH_COOKIE_TIMEOUTINDAYS`   | Refresh session cookie lifetime in days                    |

If you omit variables, `src/lib/env.ts` applies the defaults in the table where noted.

## Run (development)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Ensure the mock API is running at `MOCK_API_ORIGIN` when exercising login and transactions.

## Build and run (production)

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Project layout (overview)

- `src/app/` — routes, layouts, and API routes
- `src/features/` — feature-scoped components and hooks (auth, dashboard, marketing, transactions)
- `src/lib/` — shared utilities, auth helpers, and API clients
- `src/components/ui/` — reusable UI primitives

## Author

[Angelo Hernandez](https://www.linkedin.com/in/angelo-hernandez/)

---

This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). See the [Next.js documentation](https://nextjs.org/docs) for framework details.
