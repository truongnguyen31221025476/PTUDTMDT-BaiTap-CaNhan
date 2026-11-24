# Chương 6 · Advanced Frontend

Nguyễn Văn Trường · MSSV **31221025476** · Lớp học phần **26C1INF50902701**  
Học phần Phát triển ứng dụng thương mại điện tử · GVHD TS. Nguyễn Mạnh Tuấn

[Trang giới thiệu trên GitHub Pages](https://truongnguyen31221025476.github.io/PTUDTMDT-BaiTap-CaNhan/AdvanceFrontend/)

## Mục tiêu

Ứng dụng Bootstrap và jQuery vào cửa hàng thiết bị công nghệ, truy vấn bài tập trên LMS UEH và điều khiển trò chơi bằng bàn phím. Đây là phần thực hành nhóm 2 của bài tập cá nhân. Nhóm 3 có báo cáo trò chơi riêng.

| Bài | Mở bài | Thao tác kiểm tra |
| --- | --- | --- |
| TechStore | [Trang chủ](https://truongnguyen31221025476.github.io/PTUDTMDT-BaiTap-CaNhan/AdvanceFrontend/ecommerce/ecommerce.html) · [Chi tiết](https://truongnguyen31221025476.github.io/PTUDTMDT-BaiTap-CaNhan/AdvanceFrontend/ecommerce/ecommerce-detail.html?id=laptop) · [Đơn hàng](https://truongnguyen31221025476.github.io/PTUDTMDT-BaiTap-CaNhan/AdvanceFrontend/ecommerce/ecommerce-status.html) | Chọn sản phẩm, rê chuột lên ảnh đại diện, đổi thumbnail, xem tồn kho, mở biểu mẫu đánh giá và giỏ hàng. |
| jQuery trên LMS UEH | [Hướng dẫn và mã truy vấn](https://truongnguyen31221025476.github.io/PTUDTMDT-BaiTap-CaNhan/AdvanceFrontend/lms-jquery/) | Chạy mã ở Console của trang môn học sau khi đăng nhập. Đối chiếu bài thứ năm và bảng chủ đề, bài tập, deadline với báo cáo. |
| Flappy Noël | [Chơi game](https://truongnguyen31221025476.github.io/PTUDTMDT-BaiTap-CaNhan/AdvanceFrontend/flappy-bird/) | Nhấn ↓ để bắt đầu và vỗ cánh. P tạm dừng, M bật/tắt âm thanh, H mở hướng dẫn dưới khung chơi. |

## Cấu trúc thư mục

| Đường dẫn | Nội dung |
| --- | --- |
| `index.html` | Trang giới thiệu và điều hướng ba bài |
| `ecommerce/` | Ba trang TechStore cùng CSS, JavaScript, thư viện và ảnh sản phẩm trong `assets/` |
| `lms-jquery/` | Trang hướng dẫn và tệp `bai-tap.js` để chạy trên LMS |
| `flappy-bird/` | Trang trò chơi, CSS, JavaScript và sprite Noël |
| `evidence/` | Quy ước bộ ảnh nhóm 2 gồm `01_ecommerce`, `02_jquery_lms` và `03_flappy_bird` |
| `report/` | Thư mục dành cho báo cáo nhóm 2 theo quy định đặt tên |

## Ghi chú thực hành

- TechStore dùng chung danh mục sáu sản phẩm. xZoom chỉ phóng ảnh đại diện trong trang chi tiết và cửa sổ xem nhanh. Các thumbnail khác dùng để đổi ảnh. Phần sao dùng Kartik Star Rating. Dữ liệu giỏ hàng và nhận xét được lưu trong trình duyệt.
- LMS phân biệt ngày mở với hạn nộp. Bản mã để chạy lại được biên soạn từ quy trình và các đoạn mã nhìn thấy trong ảnh. Ảnh MC01–MC06 là kết quả thực tế của lần thực hành.
- Flappy Noël có các mốc 5, 20 và 40 điểm để lên Level 2, 3 và 4. Interval lần lượt là 40, 30, 25 và 20 ms. Ở 50 điểm, vòng lặp dừng và game hiện chiến thắng. Giữ phím ↓ không gây vỗ cánh liên tục.
