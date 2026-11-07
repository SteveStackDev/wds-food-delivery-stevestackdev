import type { Metadata } from "next";
import { Toaster } from "sonner";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Food Delivery",
    template: "%s | Food Delivery",
  },
  description: "Đặt món từ các nhà hàng yêu thích và nhận hàng tại nhà.",
};

/**
 * Root layout: khung chung cho mọi trang (Header, Footer, giỏ hàng nổi, Toast).
 * Header, Footer là Server Component; CartDrawer là Client Component.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        {/* Toaster hiển thị mọi thông báo gọi bằng toast() ở bất kỳ component nào */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
