import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Trả về `false` khi render trên server và lần render hydrate đầu tiên,
 * sau đó chuyển thành `true` trên trình duyệt.
 *
 * Vì sao cần: giỏ hàng được Zustand Persist lưu trong localStorage, mà server
 * không đọc được localStorage. Nếu render số lượng giỏ hàng ngay lần đầu,
 * HTML từ server (giỏ trống) sẽ khác HTML ở client (giỏ có món) và React báo
 * lỗi hydration mismatch. Các component giỏ hàng dùng hook này để chỉ hiển thị
 * dữ liệu giỏ sau khi đã chạy ở client.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
