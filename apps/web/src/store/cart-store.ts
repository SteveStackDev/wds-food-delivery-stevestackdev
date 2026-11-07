import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem, Dish } from "@/types";

interface CartState {
  items: CartItem[];
  /** Thêm 1 món; nếu món đã có trong giỏ thì tăng số lượng. */
  addItem: (dish: Dish) => void;
  /** Xóa hẳn món khỏi giỏ, bất kể số lượng. */
  removeItem: (dishId: string) => void;
  increaseQuantity: (dishId: string) => void;
  /** Giảm 1; nếu số lượng đang là 1 thì xóa món khỏi giỏ. */
  decreaseQuantity: (dishId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  // persist: tự động lưu state vào localStorage và khôi phục khi tải lại trang.
  persist(
    (set) => ({
      items: [],

      addItem: (dish) =>
        set((state) => {
          const exists = state.items.some((item) => item.dishId === dish.id);
          if (exists) {
            return {
              items: state.items.map((item) =>
                item.dishId === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            };
          }
          const newItem: CartItem = {
            dishId: dish.id,
            restaurantId: dish.restaurantId,
            name: dish.name,
            price: dish.price,
            imageUrl: dish.imageUrl,
            quantity: 1,
          };
          return { items: [...state.items, newItem] };
        }),

      removeItem: (dishId) =>
        set((state) => ({ items: state.items.filter((item) => item.dishId !== dishId) })),

      increaseQuantity: (dishId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.dishId === dishId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),

      decreaseQuantity: (dishId) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.dishId === dishId ? { ...item, quantity: item.quantity - 1 } : item))
            // Món nào giảm về 0 thì bị loại khỏi giỏ
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "food-delivery-cart", // key lưu trong localStorage
      version: 1, // tăng số này khi đổi cấu trúc CartItem để bỏ dữ liệu cũ
      storage: createJSONStorage(() => localStorage),
      // Chỉ lưu dữ liệu (items), không lưu các hàm action
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

/*
 * Selector: tính giá trị dẫn xuất từ state. Dùng dạng
 *   const total = useCartStore(selectTotalPrice);
 * để component chỉ re-render khi giá trị đó thay đổi, không re-render theo cả giỏ hàng.
 */
export const selectTotalQuantity = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);
