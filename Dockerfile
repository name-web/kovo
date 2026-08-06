

# ---------------- build stage -------------- -->

FROM node:24-alpine AS builder
WORKDIR /app
ENV NPM_CONFIG_CACHE=/root/.npm
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN npm run build




# ------------------- run stage ---------------- -->

FROM node:24-alpine AS runner
WORKDIR /app
RUN chown node:node /app
ENV NODE_ENV=production
USER node
ENV NPM_CONFIG_CACHE=/home/node/.npm
COPY --chown=node:node package*.json ./
RUN --mount=type=cache,target=/home/node/.npm npm ci --omit=dev
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/main.js"]
