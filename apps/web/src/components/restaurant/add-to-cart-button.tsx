"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import type { Dish } from "@/types";

/**
 * Nút "Thêm vào giỏ" của một món ăn.
 *
 * Đây là phần DUY NHẤT của trang nhà hàng cần "use client" (vì có sự kiện onClick
 * và dùng Zustand). Phần còn lại của trang (ảnh, tên, giá...) vẫn là Server Component,
 * nhờ vậy lượng JavaScript gửi xuống trình duyệt được giữ ở mức nhỏ nhất.
 */
export function AddToCartButton({ dish }: { dish: Dish }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem(dish);
    toast.success(`Đã thêm ${dish.name} vào giỏ hàng`);
  };

  return (
    <Button size="sm" onClick={handleAdd} aria-label={`Thêm ${dish.name} vào giỏ hàng`}>
      <Plus />
      Thêm vào giỏ
    </Button>
  );
}
