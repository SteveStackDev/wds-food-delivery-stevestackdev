# Kiến trúc

## Tổng quan

```mermaid
flowchart LR
  Browser["Trình duyệt"] -->|HTTP| Web["apps/web (Next.js)"]
  Web -->|"hiện tại: mock data + /api/orders"| Mock["src/data, Route Handler"]
  Web -.->|"Buổi 4"| Api["apps/api (Backend)"]
  Api -.-> Db[("Database")]
```

Hiện tại toàn bộ chạy trong `apps/web`. Mọi truy cập dữ liệu đi qua `src/data/index.ts` nên khi có Backend
chỉ cần thay phần ruột của các hàm trong file đó.

## Ranh giới Server và Client Component

```mermaid
flowchart TD
  Layout["layout.tsx (Server)"] --> Header["Header (Server)"]
  Layout --> Main["children"]
  Layout --> Footer["Footer (Server)"]
  Layout --> Cart["CartDrawer (Client)"]
  Layout --> Toaster["Toaster (Client)"]
  Main --> Home["Trang chủ (Server)"]
  Main --> Rest["/restaurant/[id] (Server)"]
  Main --> Checkout["/checkout (Server vỏ)"]
  Home --> RCard["RestaurantCard (Server)"]
  Rest --> DCard["DishCard (Server)"]
  DCard --> Add["AddToCartButton (Client)"]
  Checkout --> Form["CheckoutForm (Client)"]
```

Nguyên tắc: Server Component là mặc định; `"use client"` chỉ dùng ở các lá cần tương tác.

## Luồng giỏ hàng

1. `AddToCartButton` gọi `addItem(dish)` trên Zustand store và hiện toast.
2. Store cập nhật `items`; middleware `persist` ghi vào localStorage (key `food-delivery-cart`).
3. `CartDrawer` đọc `items` qua selector (`selectTotalQuantity`, `selectTotalPrice`) nên badge đổi số ngay.
4. Server không đọc được localStorage, nên các component giỏ hàng dùng `useIsClient()` để chỉ hiển thị
   dữ liệu giỏ sau khi hydrate, tránh lỗi hydration mismatch.

## Luồng đặt hàng

```mermaid
sequenceDiagram
  participant U as Người dùng
  participant F as CheckoutForm
  participant Z as Zod schema
  participant A as POST /api/orders
  U->>F: Bấm "Đặt hàng"
  F->>Z: zodResolver validate
  alt Dữ liệu sai
    Z-->>F: Lỗi tiếng Việt từng trường
    F-->>U: Hiện lỗi dưới ô nhập, không gửi
  else Dữ liệu hợp lệ
    F->>A: fetch (nút khóa, hiện spinner)
    A->>A: Validate lại bằng cùng schema, chờ 1,5 giây
    A-->>F: orderCode
    F->>F: clearCart() rồi hiện màn hình xác nhận
  end
```

Cùng một schema (`src/schemas/checkout.ts`) được dùng ở client để báo lỗi sớm và ở server để bảo vệ,
vì không bao giờ được tin dữ liệu từ trình duyệt.

## Quyết định kỹ thuật

| Quyết định | Lý do |
|---|---|
| Mock API bằng Route Handler | Không cần thêm thư viện, chạy cùng `next dev` |
| Ảnh SVG cục bộ trong `public/` | Không phụ thuộc mạng, Lighthouse ổn định |
| Font hệ thống | Không tải font ngoài, giảm thời gian load |
| Sheet (shadcn) làm Cart Drawer | Radix Dialog lo sẵn focus, phím Esc và aria |
| `apps/web` là project pnpm độc lập | Đơn giản; lockfile nằm ở `apps/web/pnpm-lock.yaml` |
