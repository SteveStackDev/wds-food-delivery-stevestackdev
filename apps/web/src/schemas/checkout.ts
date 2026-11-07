import { z } from "zod";
import { VN_PHONE_REGEX } from "@/lib/validators";

/**
 * Schema cho form thanh toán. Dùng ở 2 nơi:
 *  - Client: React Hook Form + zodResolver để báo lỗi ngay dưới từng ô nhập.
 *  - Server: Route Handler /api/orders validate lại, vì không bao giờ được tin dữ liệu từ client.
 *
 * Mỗi rule có thông báo tiếng Việt riêng. Rule `min(1)` đặt trước các rule khác
 * để ô bỏ trống luôn hiện câu "Vui lòng nhập...".
 */
export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập họ và tên")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(50, "Họ và tên không được quá 50 ký tự"),

  phone: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số điện thoại")
    .regex(VN_PHONE_REGEX, "Số điện thoại không hợp lệ (ví dụ: 0901234567)"),

  address: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập địa chỉ giao hàng")
    .min(10, "Địa chỉ quá ngắn, hãy ghi rõ số nhà, đường, quận/huyện")
    .max(200, "Địa chỉ không được quá 200 ký tự"),

  // Ghi chú không bắt buộc: để chuỗi rỗng là hợp lệ
  note: z.string().trim().max(200, "Ghi chú không được quá 200 ký tự"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
