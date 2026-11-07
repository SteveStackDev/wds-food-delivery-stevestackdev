import type { Restaurant } from "@/types";

export const restaurants: Restaurant[] = [
  {
    id: "com-tam-sai-gon",
    name: "Cơm Tấm Sài Gòn",
    description: "Cơm tấm sườn nướng than hoa, bì, chả trứng theo kiểu truyền thống.",
    cuisine: "Cơm Việt Nam",
    address: "12 Nguyễn Thị Minh Khai, Quận 1, TP.HCM",
    rating: 4.8,
    deliveryTime: "20-30 phút",
    imageUrl: "/images/restaurants/com-tam-sai-gon.svg",
  },
  {
    id: "pho-ha-noi",
    name: "Phở Hà Nội",
    description: "Nước dùng hầm xương 12 tiếng, bánh phở mềm, thịt bò tươi mỗi ngày.",
    cuisine: "Phở và bún",
    address: "45 Lê Lợi, Quận 1, TP.HCM",
    rating: 4.7,
    deliveryTime: "15-25 phút",
    imageUrl: "/images/restaurants/pho-ha-noi.svg",
  },
  {
    id: "burger-nha-lam",
    name: "Burger Nhà Làm",
    description: "Burger bò xay thủ công, gà rán giòn và khoai tây chiên nóng hổi.",
    cuisine: "Burger và đồ ăn nhanh",
    address: "88 Pasteur, Quận 3, TP.HCM",
    rating: 4.5,
    deliveryTime: "20-35 phút",
    imageUrl: "/images/restaurants/burger-nha-lam.svg",
  },
];
