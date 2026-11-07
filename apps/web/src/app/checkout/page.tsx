import type { Metadata } from "next";

import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = { title: "Thanh toán" };

/**
 * Trang /checkout là Server Component chỉ làm vỏ (tiêu đề, khung trang).
 * Toàn bộ phần tương tác (form, giỏ hàng) nằm trong <CheckoutForm />, Client Component.
 */
export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Thanh toán</h1>
      <CheckoutForm />
    </div>
  );
}
