import Link from "next/link";

import { Button } from "@/components/ui/button";

/** Trang 404 chung, hiện khi người dùng vào một đường dẫn không tồn tại. */
export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Không tìm thấy trang</h1>
      <p className="text-muted-foreground">Đường dẫn bạn truy cập không tồn tại hoặc đã bị xóa.</p>
      <Button asChild>
        <Link href="/">Về trang chủ</Link>
      </Button>
    </div>
  );
}
