# JavaScript Labs

- Họ tên: Nguyễn Văn Trường
- MSSV: 31221025476
- Lớp học phần: 26C1INF50902701
- Ngành: Thương mại điện tử, UEH
- [GitHub cá nhân](https://github.com/truongnguyen31221025476)
- [Repository](https://github.com/truongnguyen31221025476/PTUDTMDT-BaiTap-CaNhan)

## Mục tiêu

Thực hành cú pháp JavaScript, thao tác DOM, xử lý sự kiện và sử dụng jQuery. Các bài tập giúp hiểu cách website phản hồi thao tác, kiểm tra biểu mẫu, cập nhật nội dung và lấy dữ liệu.

## Các bài Lab

| Lab | Nội dung | Số bài | Trang giới thiệu |
|---|---|---|---|
| Lab 08 | JavaScript 1: Language Foundations. Thực hành cú pháp, biến, kiểu dữ liệu, mảng, hàm và đối tượng. | 11 | Lab08/index.html |
| Lab 09 | JavaScript 2: DOM and Events. Thao tác với phần tử HTML, xử lý sự kiện và kiểm tra biểu mẫu. | 8 | Lab09/index.html |
| Lab 10 | JavaScript 3: jQuery. Dùng jQuery để xử lý DOM, sự kiện, hiệu ứng và yêu cầu GET. | 10 | Lab10/index.html |

## Cấu trúc

| Vị trí | Nội dung |
|---|---|
| index.html | Thông tin sinh viên, giới thiệu, liên kết Lab, kiến thức và tự đánh giá |
| css/style.css | Giao diện trang chủ và các trang giới thiệu |
| js/main.js | Menu trên điện thoại và tìm bài thực hành |
| images/avatar.png | Ảnh đại diện |
| fonts | Noto Sans và giấy phép sử dụng |
| Lab08, Lab09, Lab10 | Trang giới thiệu, Exercise, tài nguyên và PDF của từng Lab |
| LabXX/ExerciseXX/index.html | Trang của từng Exercise |
| LabXX/ExerciseXX/script.js | JavaScript ngoài nếu bài sử dụng |

## Truy cập

Mở thư mục JavaScript-Labs trong VS Code. Mở index.html bằng Live Preview rồi chọn Lab và Exercise. Các bài GET cần chạy qua máy chủ HTTP hoặc HTTPS, không mở trực tiếp bằng file://.

## Mã nguồn từng Exercise

| Exercise | HTML | JavaScript |
|---|---|---|
| 8.1 | Lab08/Exercise01/index.html | Thao tác trình duyệt |
| 8.2 | Lab08/Exercise02/index.html | JavaScript nhúng trong HTML |
| 8.3 | Lab08/Exercise03/index.html | Lab08/Exercise03/script.js |
| 8.4 | Lab08/Exercise04/index.html | Lab08/Exercise04/script.js |
| 8.5 | Lab08/Exercise05/index.html | Lab08/Exercise05/script.js |
| 8.6 | Lab08/Exercise06/index.html | Lab08/Exercise06/script.js |
| 8.7 | Lab08/Exercise07/index.html | Lab08/Exercise07/script.js |
| 8.8 | Lab08/Exercise08/index.html | Lab08/Exercise08/script.js |
| 8.9 | Lab08/Exercise09/index.html | Lab08/Exercise09/script.js |
| 8.10 | Lab08/Exercise10/index.html | Lab08/Exercise10/script.js |
| 8.11 | Lab08/Exercise11/index.html | Lab08/Exercise11/script.js |
| 9.1 | Lab09/Exercise01/index.html | Lab09/Exercise01/script.js |
| 9.2 | Lab09/Exercise02/index.html | Lab09/Exercise02/script.js |
| 9.3 | Lab09/Exercise03/index.html | Lab09/Exercise03/script.js |
| 9.4 | Lab09/Exercise04/index.html | Lab09/Exercise04/script.js |
| 9.5 | Lab09/Exercise05/index.html | Lab09/Exercise05/script.js |
| 9.6 | Lab09/Exercise06/index.html | Lab09/Exercise06/script.js |
| 9.7 | Lab09/Exercise07/index.html | Lab09/Exercise07/script.js |
| 9.8 | Lab09/Exercise08/index.html | Lab09/Exercise08/script.js |
| 10.1 | Lab10/Exercise01/index.html | JavaScript nhúng trong HTML |
| 10.2 | Lab10/Exercise02/index.html | Lab10/Exercise02/script.js |
| 10.3 | Lab10/Exercise03/index.html | Lab10/Exercise03/script.js |
| 10.4 | Lab10/Exercise04/index.html | Lab10/Exercise04/script.js |
| 10.5 | Lab10/Exercise05/index.html | Lab10/Exercise05/script.js |
| 10.6 | Lab10/Exercise06/index.html | Lab10/Exercise06/script.js |
| 10.7 | Lab10/Exercise07/index.html | Lab10/Exercise07/script.js |
| 10.8 | Lab10/Exercise08/index.html | Lab10/Exercise08/script.js |
| 10.9 | Lab10/Exercise09/index.html | Lab10/Exercise09/script.js |
| 10.10 | Lab10/Exercise10/index.html | Lab10/Exercise10/script.js |

## Ghi chú về mã nguồn

- Các bài tiếp nối trong PDF được lưu theo trạng thái cuối của từng Exercise. Ảnh thực hành trước khi đổi cấu trúc vẫn ghi nhận các bước đã làm.
- Exercise 8.1 có hai ảnh bật và tắt JavaScript. Dịch vụ giáo trình báo HTTP 502 ở cả hai lần thử, chưa trả thông báo enabled hoặc disabled.
- Lab10 dùng CDN HTTPS và thư viện local cùng phiên bản. Bản 3.1.1 dùng cho 10.1, 10.2. Bản 3.1.0 dùng cho các bài còn lại.
- Exercise 10.9, 10.10 ưu tiên dịch vụ HTTPS. Nếu dịch vụ lỗi hoặc quá 5 giây, chương trình GET bản phản hồi đã lưu ngày 17/11/2026 tại Lab10/data/cities.json. Console và data-source của vùng results cho biết nguồn đang dùng. Chi tiết nằm trong Lab10/data/README.md.
- Lab08/exercise.html là mẫu travel bổ sung của starter, không phải Exercise thứ 12. Các liên kết post.php trong mẫu này thuộc ví dụ PHP ngoài phạm vi bài JavaScript.

## GitHub Pages

[Trang chủ JavaScript Labs](https://truongnguyen31221025476.github.io/PTUDTMDT-BaiTap-CaNhan/JavaScript-Labs/)

- [Lab 08](https://truongnguyen31221025476.github.io/PTUDTMDT-BaiTap-CaNhan/JavaScript-Labs/Lab08/)
- [Lab 09](https://truongnguyen31221025476.github.io/PTUDTMDT-BaiTap-CaNhan/JavaScript-Labs/Lab09/)
- [Lab 10](https://truongnguyen31221025476.github.io/PTUDTMDT-BaiTap-CaNhan/JavaScript-Labs/Lab10/)

Các địa chỉ trên dùng cho bản triển khai từ repository này. Cần kiểm tra lại sau khi push source và GitHub Pages hoàn tất build.

## Font chữ

[Noto Sans](https://github.com/google/fonts/tree/main/ofl/notosans) được lưu trong dự án để hiển thị tiếng Việt. Giấy phép SIL Open Font License nằm trong fonts/OFL.txt.
