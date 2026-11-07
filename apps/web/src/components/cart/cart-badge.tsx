import { Badge } from "@/components/ui/badge";

/**
 * Huy hiệu hiển thị tổng số lượng món, gắn lên góc nút giỏ hàng nổi.
 * Không hiển thị gì khi giỏ trống. `aria-live` để trình đọc màn hình
 * đọc lại số mới mỗi khi thêm hoặc bớt món.
 */
export function CartBadge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <Badge
      aria-live="polite"
      aria-label={`${count} món trong giỏ hàng`}
      className="absolute -top-1 -right-1 min-w-6 border-2 border-background px-1.5"
    >
      {count > 99 ? "99+" : count}
    </Badge>
  );
}
