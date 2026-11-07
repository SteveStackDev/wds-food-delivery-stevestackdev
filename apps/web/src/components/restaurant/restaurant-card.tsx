import Image from "next/image";
import Link from "next/link";
import { Clock, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Restaurant } from "@/types";

/** Thẻ nhà hàng ở trang chủ. Bấm vào thẻ sẽ sang /restaurant/[id]. Server Component. */
export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link
      href={`/restaurant/${restaurant.id}`}
      className="group block rounded-xl focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-md">
        <div className="relative aspect-4/3 w-full bg-muted">
          <Image
            src={restaurant.imageUrl}
            alt={`Ảnh nhà hàng ${restaurant.name}`}
            fill
            // sizes giúp trình duyệt biết ảnh chiếm bao nhiêu chiều rộng ở từng cỡ màn hình
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <CardContent className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold">{restaurant.name}</h3>
            <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
              <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              {restaurant.rating.toFixed(1)}
            </span>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{restaurant.description}</p>
          <div className="flex items-center gap-3 pt-1">
            <Badge variant="secondary">{restaurant.cuisine}</Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3.5" aria-hidden="true" />
              {restaurant.deliveryTime}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
