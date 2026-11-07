# Quy trình Git cho bài tập

Mục tiêu: lịch sử commit đạt chuẩn Conventional Commits và mỗi nhánh `feat/...` được gộp vào `main` qua Pull Request.

## Lưu ý quan trọng trước khi bắt đầu

- Tạo repo GitHub **trống**: không tick "Add a README", không thêm `.gitignore` hay license.
  Nếu không GitHub sẽ tạo sẵn commit "Initial commit" (sai chuẩn Conventional Commits) và bộ kiểm tra sẽ báo lỗi.
- Mọi commit (kể cả commit sửa trực tiếp trên giao diện GitHub) phải có dạng `loại: nội dung`, ví dụ `feat: thêm trang checkout`.
- Khi gộp Pull Request, chọn **Create a merge commit** hoặc **Squash and merge** đều được
  (tiêu đề squash dạng `feat: ... (#1)` vẫn hợp lệ). Không đổi tiêu đề thành câu tự do.
- Commit file `apps/web/pnpm-lock.yaml`: CI dùng `pnpm install --frozen-lockfile` nên thiếu file này sẽ đỏ.

## Loại commit

| Loại | Dùng khi |
|---|---|
| `feat` | Thêm tính năng |
| `fix` | Sửa lỗi |
| `docs` | Chỉ sửa tài liệu |
| `chore` | Cấu hình, công cụ, không đổi hành vi |
| `refactor` | Đổi cấu trúc code, không đổi hành vi |
| `style` | Định dạng, không đổi logic |

## Kế hoạch nhánh gợi ý

Các nhánh nên làm lần lượt; mỗi nhánh xong thì mở PR, gộp, rồi mới tách nhánh tiếp theo từ `main` mới nhất.

| # | Nhánh | Nội dung | Ví dụ commit |
|---|---|---|---|
| 0 | `main` | Commit đầu: tài liệu và bộ chấm bài | `chore: khởi tạo repo với README, AGENTS và bộ kiểm tra` |
| 1 | `feat/project-setup` | `.gitignore`, `docs/`, `docker-compose.yml`, `apps/api` | `docs: thêm PRD và kiến trúc`, `chore: thêm docker compose` |
| 2 | `feat/web-foundation` | Khởi tạo Next.js, Tailwind, shadcn/ui, Header, Footer, trang Home tĩnh | `feat: khởi tạo Next.js với Tailwind và shadcn/ui` |
| 3 | `feat/restaurant-pages` | Mock data, trang chủ, `/restaurant/[id]`, loading, error, not-found | `feat: thêm trang chi tiết nhà hàng` |
| 4 | `feat/cart` | Zustand store, Cart Drawer, badge, toast | `feat: thêm giỏ hàng với Zustand persist` |
| 5 | `feat/checkout` | Trang checkout, Zod schema, mock API, màn hình xác nhận | `feat: thêm form checkout với React Hook Form và Zod` |
| 6 | `docs/submission` | Ảnh chụp màn hình, hoàn thiện README | `docs: thêm ảnh chụp màn hình vào README` |

## Các lệnh cho mỗi nhánh

```bash
# Lần đầu
git init -b main
git add .
git commit -m "chore: khởi tạo repo"
git remote add origin https://github.com/<tài-khoản>/wds-food-delivery-<tên-bạn>.git
git push -u origin main

# Mỗi task
git switch main
git pull
git switch -c feat/restaurant-pages
# ... code ...
git add <các file liên quan>
git commit -m "feat: thêm trang chi tiết nhà hàng"
git push -u origin feat/restaurant-pages
# Mở Pull Request trên GitHub, đợi tick xanh, bấm Merge
```

Nếu bạn đã có toàn bộ code từ trước và muốn có lịch sử đẹp, hãy chia code theo bảng trên: dùng
`git add <đường dẫn>` để commit từng phần trên từng nhánh thay vì commit tất cả cùng lúc.

## Kiểm tra trước khi push

```bash
cd apps/web && pnpm build && cd ..
node scripts/check-repo.mjs
git log --format=%s     # mọi dòng phải có dạng "loại: nội dung" (trừ dòng "Merge ...")
```
