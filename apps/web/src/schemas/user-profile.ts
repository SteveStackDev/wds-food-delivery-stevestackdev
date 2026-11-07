import { z } from "zod";
import { VN_PHONE_REGEX } from "@/lib/validators";

/**
 * Schema hồ sơ người dùng (bài tập Buổi 3). Chưa dùng ở giao diện nào,
 * sẽ được dùng cho trang hồ sơ / đăng ký khi có Backend ở Buổi 4.
 */
export const userProfileSchema = z.object({
  id: z.string().min(1),
  fullName: z
    .string()
    .trim()
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(50, "Họ và tên không được quá 50 ký tự"),
  email: z.email("Email không hợp lệ"),
  phone: z.string().trim().regex(VN_PHONE_REGEX, "Số điện thoại không hợp lệ (ví dụ: 0901234567)"),
  defaultAddress: z.string().trim().min(10, "Địa chỉ quá ngắn, hãy ghi rõ số nhà, đường, quận/huyện"),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
