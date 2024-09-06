# Stage 1: Build the Next.js app
FROM node:18 AS builder
WORKDIR /app
COPY ./package.json ./pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build

# Stage 2: Serve the Next.js app
FROM node:18
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY ./package.json ./pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod
CMD ["pnpm", "start"]

EXPOSE 3000
