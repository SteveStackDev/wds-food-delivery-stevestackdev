import { z } from "zod";
import { checkoutSchema } from "./checkout";

/**
 * Dữ liệu client gửi lên POST /api/orders.
 * Chỉ gửi dishId và quantity, không gửi giá: giá phải do server tra cứu lại
 * (ở Buổi 4) để người dùng không thể tự sửa giá trong request.
 */
export const createOrderSchema = z.object({
  customer: checkoutSchema,
  items: z
    .array(
      z.object({
        dishId: z.string().min(1),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1, "Giỏ hàng đang trống"),
});

export type CreateOrderPayload = z.infer<typeof createOrderSchema>;
