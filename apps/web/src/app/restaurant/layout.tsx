import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Nested layout: chỉ áp dụng cho các trang nằm dưới /restaurant.
 * Nó được lồng bên trong Root layout (Header, Footer vẫn hiển thị) và bọc thêm
 * khung nội dung cùng nút quay lại. Khi chuyển giữa các nhà hàng, layout này giữ nguyên.
 */
export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Tất cả nhà hàng
      </Link>
      {children}
    </div>
  );
}
