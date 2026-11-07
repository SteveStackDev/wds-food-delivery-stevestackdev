/**
 * Các kiểu dữ liệu dùng chung toàn app.
 * Tên field được đặt gần với schema Database ở Buổi 4 (id, restaurantId, imageUrl...)
 * để sau này chuyển từ mock data sang API thật mà không phải sửa nhiều.
 */

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  address: string;
  rating: number;
  /** Thời gian giao hàng ước tính, ví dụ "20-30 phút" */
  deliveryTime: string;
  imageUrl: string;
}

export interface Dish {
  id: string;
  /** Khóa ngoại trỏ tới Restaurant.id */
  restaurantId: string;
  name: string;
  description: string;
  /** Giá tính bằng VND, số nguyên (không dùng số thập phân cho tiền) */
  price: number;
  imageUrl: string;
}

/**
 * Một dòng trong giỏ hàng. Lưu sẵn name/price/imageUrl (snapshot của Dish)
 * để Cart Drawer hiển thị được mà không cần tra cứu lại dữ liệu món ăn.
 */
export interface CartItem {
  dishId: string;
  restaurantId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
