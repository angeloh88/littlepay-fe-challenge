# Builds the mock API from repo root so `fe_challenge_api/` stays free of Docker files.
FROM node:20-alpine AS builder
WORKDIR /app
COPY fe_challenge_api/package.json fe_challenge_api/package-lock.json ./
RUN npm ci
COPY fe_challenge_api/tsconfig.json ./
COPY fe_challenge_api/src ./src
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY fe_challenge_api/package.json fe_challenge_api/package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
ENV PORT=3001
EXPOSE 3001
CMD ["node", "dist/index.js"]
