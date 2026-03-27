## PayQuick — Frontend Engineering Challenge (Part 2)

This repository implements the **PayQuick** frontend against the challenge mock API. The full brief (including Part 2) is in [`fe-challenge-resources/Frontend_Engineering_Challenge.pdf`](fe-challenge-resources/Frontend_Engineering_Challenge.pdf).

### Static pages

These routes render **static UI** from the challenge designs (marketing shell, auth, and dashboard layout). They do not load transaction data from the API:

| Page | Route | Notes |
| --- | --- | --- |
| **Landing** | [`/`](http://localhost:3000/) | Public marketing home. |
| **Login** | [`/login`](http://localhost:3000/login) | Public. Successful login sets a session and redirects to the dashboard. |
| **Dashboard** | [`/dashboard`](http://localhost:3000/dashboard) | **Requires login.** Shell, balances, and widgets are static presentation content. |

### Dynamic page: transactions

| Page | Route | Notes |
| --- | --- | --- |
| **Transaction history** | [`/transactions`](http://localhost:3000/transactions) | **Requires login.** **Dynamic:** the list is loaded from the mock API (`GET /v1/transactions` with pagination) through Next.js route handlers (`/api/v1/transactions`). The UI uses client-side fetching (TanStack Query) with infinite scroll / “load more”. |

### How to access pages

1. **Start the app and API** (see [Run with Docker](#run-with-docker-api--frontend) or [local Node](#avoid-port-clash-api-vs-next--local-node) below). The UI is at **http://localhost:3000** when using the default port.
2. **Public routes:** open `/` or `/login` directly.
3. **Protected routes** (`/dashboard`, `/transactions`): sign in first. Example credentials accepted by the mock API: **smith@example.com** / **pass123** (see `fe_challenge_api/README.md`).
4. After login, use the sidebar **Dashboard** and **Transactions** links, or go directly to `/dashboard` or `/transactions`.

The Next.js app lives in **`payquick-frontend/`**; implementation details and env vars are in [`payquick-frontend/README.md`](payquick-frontend/README.md).

---

## Run with Docker (API + frontend)

From the **repository root** (where `docker-compose.yml` lives):

**Prerequisites:** [Docker](https://docs.docker.com/get-docker/) with Compose v2 (`docker compose`).

Build and start both services:

```bash
docker compose up --build
```

- **App:** [http://localhost:3000](http://localhost:3000)
- **Mock API:** [http://localhost:3001](http://localhost:3001)

Run in the background:

```bash
docker compose up --build -d
```

Stop and remove containers:

```bash
docker compose down
```

Compose builds two images (`api`, `web`). The API image is defined in `docker/fe-challenge-api.Dockerfile` so `fe_challenge_api/` stays a plain `npm install` / `npm run dev` package with no Docker files in that folder. The Next.js app calls the mock API inside the network at `http://api:3001`; your browser still uses `http://localhost:3000` for the UI.

---

## Avoid port clash (API vs Next) — local Node

- Next (`npm run dev` in `payquick-frontend`) uses **3000** by default.
- `fe_challenge_api` defaults to **3000** in `index.ts` (`PORT || 3000`).

### Run mock API (CLI)

```bash
cd fe_challenge_api
PORT=3001 npm run dev
```

### Run frontend (CLI)

```bash
cd payquick-frontend
npm run dev
```

## Local BFF env

Set `MOCK_API_ORIGIN=http://localhost:3001` in `payquick-frontend/.env.local` (see `payquick-frontend/.env.example`).

## Author

[Angelo Hernandez](https://www.linkedin.com/in/angelo-hernandez/)

---
