# PRD: Food Delivery (Frontend)

| | |
|---|---|
| Phiên bản | 1.0 (Buổi 1 đến Buổi 3) |
| Loại dự án | Bài tập học tập |
| Trạng thái | Frontend dùng mock data, chưa có Backend |

## 1. Bối cảnh và mục tiêu

Người dùng muốn đặt món từ các nhà hàng gần mình mà không cần gọi điện. Dự án xây dựng phần Frontend của
một ứng dụng đặt đồ ăn, làm nền tảng cho các buổi học sau (Backend, cơ sở dữ liệu, xác thực).

Mục tiêu:

- Người dùng xem được nhà hàng, thực đơn, thêm món vào giỏ và hoàn tất đặt hàng.
- Giao diện dùng tốt trên điện thoại (từ 375px) lẫn máy tính.
- Trang tải nhanh (Lighthouse Performance trên 85).
- Code có cấu trúc rõ ràng để dễ nối với Backend ở Buổi 4.

## 2. Đối tượng người dùng

Khách hàng đặt đồ ăn: dùng chủ yếu trên điện thoại, muốn chọn món và đặt hàng nhanh, ít bước.

## 3. Phạm vi

Trong phạm vi:

- Xem danh sách nhà hàng và thực đơn từng nhà hàng.
- Giỏ hàng: thêm, xóa, tăng giảm số lượng, lưu lại sau khi tải lại trang.
- Thanh toán: nhập thông tin giao hàng, kiểm tra hợp lệ, đặt hàng (mock) và nhận mã đơn.

Ngoài phạm vi (làm ở các buổi sau hoặc không làm):

- Backend, cơ sở dữ liệu, đăng nhập và đăng ký.
- Thanh toán trực tuyến, theo dõi đơn hàng, đánh giá nhà hàng.
- Tìm kiếm, lọc nhà hàng, đa ngôn ngữ, chế độ tối.

## 4. User stories và tiêu chí chấp nhận

### US1. Xem nhà hàng

Là khách hàng, tôi muốn xem danh sách nhà hàng để chọn nơi đặt món.

- Trang chủ hiển thị đủ nhà hàng (tối thiểu 3) gồm ảnh, tên, mô tả, đánh giá, thời gian giao.
- Bấm vào một nhà hàng sẽ sang đúng `/restaurant/[id]`.
- Vào id không tồn tại thì hiện trang "Không tìm thấy nhà hàng".

### US2. Xem thực đơn

Là khách hàng, tôi muốn xem các món của một nhà hàng kèm ảnh và giá.

- Mỗi nhà hàng có tối thiểu 5 món, mỗi món có ảnh, tên, mô tả, giá (VND).

### US3. Quản lý giỏ hàng

Là khách hàng, tôi muốn thêm và bớt món trong giỏ để chuẩn bị đơn hàng.

- Bấm "Thêm vào giỏ" thì huy hiệu giỏ hàng đổi số ngay và có thông báo (toast).
- Trong ngăn kéo giỏ hàng có thể tăng, giảm số lượng và xóa món; có tổng số lượng và tổng tiền.
- Tải lại trang, giỏ hàng vẫn còn nguyên.

### US4. Đặt hàng

Là khách hàng, tôi muốn nhập thông tin giao hàng và đặt đơn.

- Từ ngăn kéo giỏ hàng có nút "Thanh toán" sang `/checkout`.
- Form gồm họ tên, số điện thoại Việt Nam, địa chỉ, ghi chú (không bắt buộc).
- Bỏ trống hoặc nhập sai thì không gửi được; mỗi ô sai hiện một thông báo lỗi tiếng Việt ngay bên dưới.
- Số điện thoại hợp lệ (ví dụ `0901234567`) được chấp nhận; `12345` bị báo lỗi.
- Khi gửi: nút bị khóa và hiện spinner; thành công thì hiện màn hình xác nhận kèm mã đơn, giỏ hàng được xóa.

## 5. Yêu cầu phi chức năng

| Nhóm | Yêu cầu |
|---|---|
| Hiệu năng | Lighthouse Performance trên 85 ở trang chủ |
| Responsive | Dùng tốt từ 375px đến desktop, không tràn ngang |
| Khả năng truy cập | Nhãn cho ô nhập, `aria-label` cho nút biểu tượng, thông báo lỗi có `role="alert"` |
| Chất lượng code | TypeScript strict, `pnpm build` không lỗi |
| Nội dung | Toàn bộ giao diện và thông báo bằng tiếng Việt |

## 6. Mô hình dữ liệu (mock)

- **Restaurant**: `id`, `name`, `description`, `cuisine`, `address`, `rating`, `deliveryTime`, `imageUrl`
- **Dish**: `id`, `restaurantId`, `name`, `description`, `price`, `imageUrl`
- **CartItem**: `dishId`, `restaurantId`, `name`, `price`, `imageUrl`, `quantity`

Tên field được đặt gần schema ở Buổi 4 để chuyển sang API thật dễ dàng.

## 7. Rủi ro và giả định

- Giả định hiện tại: một giỏ hàng có thể chứa món của nhiều nhà hàng. Backend ở Buổi 4 sẽ cần quyết định có tách đơn theo nhà hàng hay không.
- Giá hiển thị lấy từ mock data ở client; khi có Backend, giá phải được server tính lại, không tin giá từ client.
