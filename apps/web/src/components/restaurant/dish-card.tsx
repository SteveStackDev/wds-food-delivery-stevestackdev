import Image from "next/image";

import { Card } from "@/components/ui/card";
import { formatVND } from "@/lib/format";
import type { Dish } from "@/types";
import { AddToCartButton } from "./add-to-cart-button";

/**
 * Thẻ món ăn. Là Server Component: dữ liệu món được render sẵn trên server,
 * chỉ riêng <AddToCartButton /> là Client Component (ranh giới Server/Client nằm ở đây).
 */
export function DishCard({ dish }: { dish: Dish }) {
  return (
    <Card className="flex gap-4 p-3">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted">
        <Image src={dish.imageUrl} alt={dish.name} fill sizes="96px" className="object-cover" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-semibold">{dish.name}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{dish.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="font-semibold text-primary">{formatVND(dish.price)}</span>
          <AddToCartButton dish={dish} />
        </div>
      </div>
    </Card>
  );
}
