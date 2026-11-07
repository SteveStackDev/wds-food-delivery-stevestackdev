# Dockerfile cho Frontend (Next.js). Build từ thư mục apps/web.
# Dùng multi-stage để tận dụng cache: chỉ cài lại dependencies khi package.json
# hoặc pnpm-lock.yaml thay đổi.

FROM node:22-alpine AS base
RUN npm install -g pnpm@10
WORKDIR /app

# Stage 1: cài dependencies theo đúng pnpm-lock.yaml (--frozen-lockfile)
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: build ứng dụng
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Stage 3: image chạy thật, chỉ giữ những thứ cần thiết để `next start`
FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["pnpm", "start"]
