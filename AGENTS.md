# AGENTS.md

Hướng dẫn cho OpenCode và các AI coding agent khi làm việc trong repo này.

## Tổng quan dự án

Food Delivery: ứng dụng đặt đồ ăn. Monorepo gồm `apps/web` (Frontend, Next.js 16) và
`apps/api` (Backend, làm ở Buổi 4, hiện còn trống). Hiện tại dữ liệu là mock.
Đây là **bài tập học tập**, ưu tiên code đơn giản, dễ đọc, đúng yêu cầu; không thêm tính năng ngoài đề bài.

## Công nghệ

Next.js 16 (App Router) + React 19 + TypeScript, Tailwind CSS v4, shadcn/ui, Zustand (persist),
React Hook Form + Zod, Sonner. Trình quản lý gói: **pnpm** (không dùng npm hay yarn).

## Lệnh thường dùng (chạy trong `apps/web`)

```bash
pnpm install     # cài dependencies
pnpm dev         # chạy dev tại http://localhost:3000
pnpm build       # build production, phải chạy thành công trước khi commit
pnpm start       # chạy bản đã build
```

Ở thư mục gốc: `node scripts/check-repo.mjs` để tự kiểm tra bài.

## Cấu trúc code (trong `apps/web/src`)

- `app/`: route của App Router (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `api/.../route.ts`)
- `components/ui/`: component shadcn/ui, hạn chế sửa trực tiếp
- `components/<feature>/`: component theo tính năng (`layout`, `cart`, `restaurant`, `checkout`)
- `data/`: mock data. Component chỉ import qua `@/data`, không import trực tiếp file mock
- `store/`: Zustand store
- `schemas/`: Zod schema, dùng chung cho client và server
- `lib/`, `hooks/`, `types/`: tiện ích, hook, kiểu dữ liệu dùng chung

## Quy ước code

- **Server Component là mặc định.** Chỉ thêm `"use client"` cho component cần sự kiện, state, hook hoặc API trình duyệt, và đặt càng sâu càng tốt.
- Trong Next.js 16, `params` của page là `Promise`, phải `await`.
- Dùng alias `@/` cho import từ `src/`.
- Tiền tệ là số nguyên VND, hiển thị bằng `formatVND()` trong `lib/format.ts`.
- Giỏ hàng chỉ được đọc ở client; dùng `useIsClient()` để tránh lỗi hydration.
- Mọi chuỗi hiển thị cho người dùng và thông báo lỗi validate viết bằng **tiếng Việt**.
- Comment chỉ khi giải thích "vì sao" (quyết định, ràng buộc, chỗ dễ nhầm), không comment điều code đã tự nói rõ.
- Không dùng `any`; giữ TypeScript `strict`.

## Quy trình Git

- Mỗi task một nhánh `feat/<tên-ngắn>`, không commit trực tiếp vào `main`.
- Commit theo Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`... ví dụ `feat: thêm trang checkout`.
- Gộp vào `main` bằng Pull Request.
- Không commit `node_modules`, `.next`, `.env*` (trừ `.env.example`).

## Không làm

- Không thêm thư viện hoặc tính năng ngoài đề bài khi chưa được yêu cầu.
- Không sửa `scripts/check-repo.mjs`, `lighthouserc.json`, `.github/workflows/check.yml` (bộ chấm bài).
- Không dùng `localStorage` trực tiếp; để Zustand Persist quản lý.
