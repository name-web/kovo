# ---------------- build stage ----------------

FROM node:24-alpine AS builder

WORKDIR /app

ENV NPM_CONFIG_CACHE=/root/.npm

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

# Generate Prisma Client before compiling NestJS
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

RUN npm run build


# ---------------- run stage ----------------

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/generated ./generated
COPY --chown=node:node --from=builder /app/prisma ./prisma
COPY --chown=node:node --from=builder /app/prisma.config.ts ./prisma.config.ts

USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]