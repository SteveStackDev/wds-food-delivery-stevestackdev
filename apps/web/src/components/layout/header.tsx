import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

/**
 * Header dùng chung cho mọi trang (đặt trong app/layout.tsx).
 * Là Server Component vì chỉ hiển thị link tĩnh, không cần state hay sự kiện.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <UtensilsCrossed className="size-5 text-primary" aria-hidden="true" />
          <span>Food Delivery</span>
        </Link>

        <nav aria-label="Điều hướng chính" className="flex items-center gap-4 text-sm font-medium">
          <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
            Trang chủ
          </Link>
          <Link href="/#restaurants" className="text-muted-foreground transition-colors hover:text-foreground">
            Nhà hàng
          </Link>
        </nav>
      </div>
    </header>
  );
}
