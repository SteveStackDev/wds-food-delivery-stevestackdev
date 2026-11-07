"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsClient } from "@/hooks/use-is-client";
import { formatVND } from "@/lib/format";
import { selectTotalPrice, selectTotalQuantity, useCartStore } from "@/store/cart-store";
import type { CartItem } from "@/types";
import { CartBadge } from "./cart-badge";

/**
 * Nút giỏ hàng nổi (floating) kèm ngăn kéo xem trước đơn hàng (Cart Drawer).
 * Được đặt một lần trong app/layout.tsx nên xuất hiện ở mọi trang.
 *
 * Phải là Client Component vì dùng Zustand (hook), state mở/đóng và sự kiện bấm.
 */
export function CartDrawer() {
  const [open, setOpen] = useState(false);

  // Xem hooks/use-is-client.ts: tránh lỗi hydration vì giỏ hàng nằm ở localStorage
  const isClient = useIsClient();
  const storedItems = useCartStore((state) => state.items);
  const storedQuantity = useCartStore(selectTotalQuantity);
  const storedPrice = useCartStore(selectTotalPrice);
  const items = isClient ? storedItems : [];
  const totalQuantity = isClient ? storedQuantity : 0;
  const totalPrice = isClient ? storedPrice : 0;

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleIncrease = (item: CartItem) => {
    increaseQuantity(item.dishId);
    toast.success(`Đã thêm ${item.name} vào giỏ hàng`);
  };

  const handleDecrease = (item: CartItem) => {
    decreaseQuantity(item.dishId);
    // Số lượng đang là 1 thì store sẽ xóa món, nên thông báo cho đúng hành động
    toast.success(item.quantity === 1 ? `Đã xóa ${item.name} khỏi giỏ hàng` : `Đã giảm số lượng ${item.name}`);
  };

  const handleRemove = (item: CartItem) => {
    removeItem(item.dishId);
    toast.success(`Đã xóa ${item.name} khỏi giỏ hàng`);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          aria-label="Mở giỏ hàng"
          className="fixed right-4 bottom-4 z-40 size-14 rounded-full shadow-lg sm:right-6 sm:bottom-6"
        >
          <ShoppingCart className="size-6" aria-hidden="true" />
          <CartBadge count={totalQuantity} />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="border-b">
          <SheetTitle>Giỏ hàng của bạn</SheetTitle>
          <SheetDescription>
            {totalQuantity > 0 ? `${totalQuantity} món trong giỏ hàng` : "Chưa có món nào trong giỏ hàng"}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center text-muted-foreground">
            <ShoppingCart className="size-10" aria-hidden="true" />
            <p>Giỏ hàng đang trống. Hãy chọn món từ một nhà hàng để bắt đầu.</p>
            <Button asChild variant="outline" onClick={() => setOpen(false)}>
              <Link href="/#restaurants">Xem nhà hàng</Link>
            </Button>
          </div>
        ) : (
          <ul className="flex-1 space-y-4 overflow-y-auto px-4">
            {items.map((item) => (
              <li key={item.dishId} className="flex gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image src={item.imageUrl} alt={item.name} fill sizes="64px" className="object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{formatVND(item.price)}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8"
                      aria-label={`Giảm số lượng ${item.name}`}
                      onClick={() => handleDecrease(item)}
                    >
                      <Minus />
                    </Button>
                    <span className="w-6 text-center text-sm font-medium" aria-live="polite">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8"
                      aria-label={`Tăng số lượng ${item.name}`}
                      onClick={() => handleIncrease(item)}
                    >
                      <Plus />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto size-8 text-muted-foreground hover:text-destructive"
                      aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
                      onClick={() => handleRemove(item)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <SheetFooter className="border-t">
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Tổng cộng</span>
              <span>{formatVND(totalPrice)}</span>
            </div>
            {/* asChild: giữ style của Button nhưng render ra thẻ <a> để điều hướng sang /checkout */}
            <Button asChild size="lg" onClick={() => setOpen(false)}>
              <Link href="/checkout">Thanh toán</Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
