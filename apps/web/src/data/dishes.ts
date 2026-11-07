import type { Dish } from "@/types";

/**
 * Danh sách món ăn dạng "phẳng": mỗi món có restaurantId trỏ tới nhà hàng,
 * giống cách lưu ở bảng Database (quan hệ 1 nhà hàng - nhiều món).
 */
export const dishes: Dish[] = [
  // ---- Cơm Tấm Sài Gòn ----
  {
    id: "dish-01",
    restaurantId: "com-tam-sai-gon",
    name: "Cơm tấm sườn bì chả",
    description: "Sườn nướng, bì, chả trứng, mỡ hành và nước mắm chua ngọt.",
    price: 55000,
    imageUrl: "/images/dishes/dish-01.svg",
  },
  {
    id: "dish-02",
    restaurantId: "com-tam-sai-gon",
    name: "Cơm sườn nướng",
    description: "Sườn cốt lết nướng than, dưa leo, cà chua.",
    price: 45000,
    imageUrl: "/images/dishes/dish-02.svg",
  },
  {
    id: "dish-03",
    restaurantId: "com-tam-sai-gon",
    name: "Cơm gà nướng",
    description: "Đùi gà ướp sả nướng vàng, ăn kèm rau dưa.",
    price: 48000,
    imageUrl: "/images/dishes/dish-03.svg",
  },
  {
    id: "dish-04",
    restaurantId: "com-tam-sai-gon",
    name: "Canh khổ qua nhồi thịt",
    description: "Khổ qua nhồi thịt heo, nấu nước xương ngọt thanh.",
    price: 30000,
    imageUrl: "/images/dishes/dish-04.svg",
  },
  {
    id: "dish-05",
    restaurantId: "com-tam-sai-gon",
    name: "Trà đá chanh",
    description: "Trà đá vắt chanh tươi, giải khát sau bữa cơm.",
    price: 12000,
    imageUrl: "/images/dishes/dish-05.svg",
  },

  // ---- Phở Hà Nội ----
  {
    id: "dish-06",
    restaurantId: "pho-ha-noi",
    name: "Phở bò tái",
    description: "Thịt bò tái mềm, nhúng chín trong nước dùng nóng.",
    price: 60000,
    imageUrl: "/images/dishes/dish-06.svg",
  },
  {
    id: "dish-07",
    restaurantId: "pho-ha-noi",
    name: "Phở bò chín",
    description: "Bắp bò hầm mềm, thái lát mỏng, hành lá và ngò gai.",
    price: 55000,
    imageUrl: "/images/dishes/dish-07.svg",
  },
  {
    id: "dish-08",
    restaurantId: "pho-ha-noi",
    name: "Phở gà",
    description: "Gà ta xé phay, nước dùng trong và thơm.",
    price: 50000,
    imageUrl: "/images/dishes/dish-08.svg",
  },
  {
    id: "dish-09",
    restaurantId: "pho-ha-noi",
    name: "Bún chả",
    description: "Chả nướng than hoa, bún tươi, nước chấm chua ngọt.",
    price: 55000,
    imageUrl: "/images/dishes/dish-09.svg",
  },
  {
    id: "dish-10",
    restaurantId: "pho-ha-noi",
    name: "Quẩy giòn",
    description: "Quẩy chiên giòn, chấm kèm nước phở.",
    price: 10000,
    imageUrl: "/images/dishes/dish-10.svg",
  },

  // ---- Burger Nhà Làm ----
  {
    id: "dish-11",
    restaurantId: "burger-nha-lam",
    name: "Burger bò phô mai",
    description: "Bò xay 150g, phô mai cheddar, rau xà lách, sốt đặc biệt.",
    price: 69000,
    imageUrl: "/images/dishes/dish-11.svg",
  },
  {
    id: "dish-12",
    restaurantId: "burger-nha-lam",
    name: "Burger gà giòn",
    description: "Ức gà tẩm bột chiên giòn, sốt mayonnaise.",
    price: 59000,
    imageUrl: "/images/dishes/dish-12.svg",
  },
  {
    id: "dish-13",
    restaurantId: "burger-nha-lam",
    name: "Khoai tây chiên",
    description: "Khoai tây cắt sợi, chiên vàng, rắc muối.",
    price: 29000,
    imageUrl: "/images/dishes/dish-13.svg",
  },
  {
    id: "dish-14",
    restaurantId: "burger-nha-lam",
    name: "Gà rán 3 miếng",
    description: "Gà rán vỏ giòn, thịt mềm, kèm sốt chua ngọt.",
    price: 65000,
    imageUrl: "/images/dishes/dish-14.svg",
  },
  {
    id: "dish-15",
    restaurantId: "burger-nha-lam",
    name: "Nước ngọt có gas",
    description: "Lon 330ml, uống lạnh.",
    price: 15000,
    imageUrl: "/images/dishes/dish-15.svg",
  },
];
