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
