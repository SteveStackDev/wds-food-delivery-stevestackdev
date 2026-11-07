"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useIsClient } from "@/hooks/use-is-client";
import { formatVND } from "@/lib/format";
import { checkoutSchema, type CheckoutFormValues } from "@/schemas/checkout";
import { selectTotalPrice, useCartStore } from "@/store/cart-store";

/**
 * Form thanh toán. Luồng xử lý:
 *  1. Người dùng nhập thông tin -> React Hook Form quản lý giá trị các ô.
 *  2. Bấm "Đặt hàng" -> zodResolver chạy checkoutSchema; sai thì hiện lỗi ngay dưới ô
 *     tương ứng và KHÔNG gọi onSubmit.
 *  3. Hợp lệ -> onSubmit gọi POST /api/orders. Trong lúc chờ, `isSubmitting` = true
 *     nên nút bị khóa và hiện spinner (chặn bấm đúp tạo 2 đơn).
 *  4. Thành công -> lưu mã đơn, xóa giỏ hàng, hiện màn hình xác nhận.
 */
export function CheckoutForm() {
  const isClient = useIsClient();
  const storedItems = useCartStore((state) => state.items);
  const storedTotal = useCartStore(selectTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  // Giỏ hàng lấy từ localStorage nên chỉ dùng sau khi đã ở client (xem hooks/use-is-client.ts)
  const items = isClient ? storedItems : [];
  const totalPrice = isClient ? storedTotal : 0;

  const [orderCode, setOrderCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched", // báo lỗi khi rời khỏi ô, sau đó kiểm tra lại mỗi lần gõ
    defaultValues: { fullName: "", phone: "", address: "", note: "" },
  });

  // handleSubmit chỉ gọi hàm này khi dữ liệu đã qua validate
  const onSubmit = async (values: CheckoutFormValues) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: values,
          items: items.map(({ dishId, quantity }) => ({ dishId, quantity })),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Đặt hàng không thành công");
      }

      setOrderCode(data.orderCode);
      clearCart(); // Xóa giỏ hàng (cả trong localStorage nhờ Zustand Persist)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Đặt hàng không thành công, vui lòng thử lại");
    }
  };

  // Chờ client sẵn sàng để không nhấp nháy màn hình "giỏ hàng trống" khi tải trang
  if (!isClient) {
    return <p className="text-muted-foreground">Đang tải giỏ hàng...</p>;
  }

  // Màn hình xác nhận. Phải kiểm tra trước "giỏ trống" vì giỏ đã bị xóa sau khi đặt thành công.
  if (orderCode) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <CardContent className="flex flex-col items-center gap-3 p-8">
          <CircleCheck className="size-14 text-green-600" aria-hidden="true" />
          <h2 className="text-xl font-semibold">Đặt hàng thành công</h2>
          <p className="text-muted-foreground">Mã đơn hàng của bạn</p>
          <p className="rounded-md bg-muted px-4 py-2 font-mono text-lg font-semibold">{orderCode}</p>
          <p className="text-sm text-muted-foreground">Nhà hàng sẽ sớm xác nhận và giao hàng đến bạn.</p>
          <Button asChild className="mt-2">
            <Link href="/">Tiếp tục đặt món</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <p className="text-muted-foreground">Giỏ hàng đang trống, hãy chọn món trước khi thanh toán.</p>
        <Button asChild>
          <Link href="/#restaurants">Xem nhà hàng</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-5">
      {/* noValidate: tắt tooltip kiểm tra mặc định của trình duyệt, dùng thông báo của Zod */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 md:col-span-3">
        <Field id="fullName" label="Họ và tên" error={errors.fullName?.message}>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            {...register("fullName")}
          />
        </Field>

        <Field id="phone" label="Số điện thoại" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="0901234567"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
        </Field>

        <Field id="address" label="Địa chỉ giao hàng" error={errors.address?.message}>
          <Input
            id="address"
            autoComplete="street-address"
            placeholder="Số nhà, đường, phường/xã, quận/huyện"
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            {...register("address")}
          />
        </Field>

        <Field id="note" label="Ghi chú (không bắt buộc)" error={errors.note?.message}>
          <Textarea
            id="note"
            placeholder="Ví dụ: ít cay, gọi trước khi giao"
            aria-invalid={!!errors.note}
            aria-describedby={errors.note ? "note-error" : undefined}
            {...register("note")}
          />
        </Field>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <LoaderCircle className="animate-spin" aria-hidden="true" />}
          {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
        </Button>
      </form>

      <Card className="h-fit md:col-span-2">
        <CardHeader>
          <CardTitle>Đơn hàng của bạn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ul className="space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.dishId} className="flex justify-between gap-2">
                <span>
                  {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                </span>
                <span className="shrink-0">{formatVND(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t pt-3 font-semibold">
            <span>Tổng cộng</span>
            <span>{formatVND(totalPrice)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/** Bọc một ô nhập: nhãn ở trên, thông báo lỗi (nếu có) ngay bên dưới ô. */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
