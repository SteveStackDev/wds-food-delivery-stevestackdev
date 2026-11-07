import { createOrderSchema } from "@/schemas/order";

/**
 * Mock API đặt hàng: POST /api/orders (Route Handler của Next.js).
 *
 * Chưa lưu đơn vào đâu cả, chỉ validate dữ liệu, chờ một chút để giả lập độ trễ
 * mạng/xử lý, rồi trả về mã đơn ngẫu nhiên. Ở Buổi 4, endpoint thật nằm ở apps/api
 * và client chỉ cần đổi URL gọi.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Dữ liệu gửi lên không hợp lệ" }, { status: 400 });
  }

  // Validate lại ở server bằng cùng schema với client: không bao giờ tin dữ liệu từ trình duyệt
  const result = createOrderSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { message: result.error.issues[0]?.message ?? "Dữ liệu đơn hàng không hợp lệ" },
      { status: 400 },
    );
  }

  // Giả lập độ trễ để thấy rõ spinner ở phía giao diện
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const orderCode = `FD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  return Response.json({ orderCode }, { status: 201 });
}
