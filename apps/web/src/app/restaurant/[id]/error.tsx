"use client"; // Bắt buộc: error boundary của Next.js phải là Client Component

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * Hiển thị khi có lỗi bất ngờ lúc render trang nhà hàng (ví dụ API lỗi).
 * Lỗi chỉ ảnh hưởng vùng này, Header và Footer vẫn hoạt động bình thường.
 * `reset` thử render lại segment này.
 */
export default function RestaurantError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Ghi log để dễ debug; nơi này cũng là chỗ gửi lỗi lên dịch vụ giám sát (Sentry...)
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Không tải được nhà hàng</h1>
      <p className="text-muted-foreground">Đã có lỗi xảy ra. Hãy thử tải lại trang.</p>
      <Button onClick={reset}>Thử lại</Button>
    </div>
  );
}
