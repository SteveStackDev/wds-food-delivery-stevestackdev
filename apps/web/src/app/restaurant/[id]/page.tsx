import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, MapPin, Star } from "lucide-react";

import { DishCard } from "@/components/restaurant/dish-card";
import { getDishesByRestaurantId, getRestaurantById, restaurants } from "@/data";

// Từ Next.js 15, `params` là một Promise nên phải `await` trước khi dùng.
type RestaurantPageProps = {
  params: Promise<{ id: string }>;
};

/**
 * Báo cho Next.js biết trước các id hợp lệ để dựng sẵn trang HTML lúc build (SSG).
 * Id không nằm trong danh sách này vẫn được xử lý lúc có request, và sẽ rơi vào notFound().
 */
export function generateStaticParams() {
  return restaurants.map((restaurant) => ({ id: restaurant.id }));
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const { id } = await params;
  const restaurant = getRestaurantById(id);
  return { title: restaurant ? restaurant.name : "Không tìm thấy nhà hàng" };
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { id } = await params;
  const restaurant = getRestaurantById(id);

  // Id không tồn tại: dừng render và hiển thị file not-found.tsx gần nhất (status 404)
  if (!restaurant) {
    notFound();
  }

  const dishes = getDishesByRestaurantId(restaurant.id);

  return (
    <article>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:w-64">
          <Image
            src={restaurant.imageUrl}
            alt={`Ảnh nhà hàng ${restaurant.name}`}
            fill
            sizes="(min-width: 640px) 256px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold sm:text-3xl">{restaurant.name}</h1>
          <p className="text-muted-foreground">{restaurant.description}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <li className="flex items-center gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              {restaurant.rating.toFixed(1)}
            </li>
            <li className="flex items-center gap-1">
              <Clock className="size-4" aria-hidden="true" />
              {restaurant.deliveryTime}
            </li>
            <li className="flex items-center gap-1">
              <MapPin className="size-4" aria-hidden="true" />
              {restaurant.address}
            </li>
          </ul>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-semibold">Thực đơn</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </article>
  );
}
