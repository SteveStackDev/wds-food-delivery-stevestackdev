import Link from "next/link";

import { Button } from "@/components/ui/button";

/** Hiển thị khi page gọi notFound(), tức là id nhà hàng không tồn tại. */
export default function RestaurantNotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Không tìm thấy nhà hàng</h1>
      <p className="text-muted-foreground">Nhà hàng này không tồn tại hoặc đã ngừng hoạt động.</p>
      <Button asChild>
        <Link href="/#restaurants">Xem các nhà hàng khác</Link>
      </Button>
    </div>
  );
}
