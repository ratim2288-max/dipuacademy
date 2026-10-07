# ------------------------------------------------------------------------------
# Production Multi-Stage Dockerfile — Dipu's Edu
# ------------------------------------------------------------------------------
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Step 1: Install dependencies
FROM base AS dependencies
COPY package*.json ./
RUN npm ci --only=production

# Step 2: Production image
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=5000

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 edtechuser

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

USER edtechuser
EXPOSE 5000

CMD ["node", "src/server.js"]
