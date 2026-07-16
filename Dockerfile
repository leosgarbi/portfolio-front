FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
# Use --legacy-peer-deps to avoid peer dependency install failures in CI
# Use `npm install` here to allow builds when lockfile is out of sync.
# Long-term: run `npm install` locally and commit updated package-lock.json, then revert to `npm ci`.
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "server.js"]
