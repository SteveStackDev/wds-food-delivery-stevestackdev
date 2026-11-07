import Link from "next/link";

import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { Button } from "@/components/ui/button";
import { getRestaurants } from "@/data";

/**
 * Trang chủ: Server Component (không có "use client").
 * Danh sách nhà hàng được lấy và render ngay trên server, trình duyệt nhận HTML
 * đã có sẵn nội dung nên hiển thị nhanh và tốt cho SEO.
 */
export default function HomePage() {
  const restaurants = getRestaurants();

  return (
    <>
      <section className="bg-primary/5">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
          <h1 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            Đặt món ngon, nhận hàng tận nơi
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Chọn nhà hàng, thêm món vào giỏ và đặt hàng chỉ trong vài bước.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="#restaurants">Xem nhà hàng</Link>
          </Button>
        </div>
      </section>

      <section id="restaurants" className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-10">
        <h2 className="text-2xl font-semibold">Nhà hàng gần bạn</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </>
  );
}
