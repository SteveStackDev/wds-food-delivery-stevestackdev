/**
 * Điểm truy cập dữ liệu duy nhất cho toàn app.
 *
 * Các component và page chỉ import từ "@/data", không import trực tiếp file mock.
 * Ở Buổi 4, khi có Backend, chỉ cần viết lại các hàm dưới đây để gọi API
 * (và đổi thành async); phần còn lại của app không phải sửa.
 */
import type { Dish, Restaurant } from "@/types";
import { dishes } from "./dishes";
import { restaurants } from "./restaurants";

export { dishes, restaurants };

export function getRestaurants(): Restaurant[] {
  return restaurants;
}

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((restaurant) => restaurant.id === id);
}

export function getDishesByRestaurantId(restaurantId: string): Dish[] {
  return dishes.filter((dish) => dish.restaurantId === restaurantId);
}
