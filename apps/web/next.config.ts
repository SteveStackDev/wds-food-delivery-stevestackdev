import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ảnh trong dự án là file SVG cục bộ ở /public nên không cần cấu hình remotePatterns.
  // Nếu sau này dùng ảnh từ domain ngoài, khai báo domain đó ở images.remotePatterns.
};

export default nextConfig;
