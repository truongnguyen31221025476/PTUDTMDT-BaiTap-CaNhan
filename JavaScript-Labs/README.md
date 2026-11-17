# JavaScript Labs

Nguyễn Văn Trường · MSSV 31221025476
Lớp học phần: 26C1INF50902701 · UEH · Thương mại điện tử

[GitHub cá nhân](https://github.com/truongnguyen31221025476) · [Repository](https://github.com/truongnguyen31221025476/PTUDTMDT-BaiTap-CaNhan)

## Mục tiêu

Thực hành nền tảng JavaScript, String/Date/Math/Array/Object, hàm, DOM, sự kiện, biểu mẫu, jQuery, animation và GET/jqXHR.

## Cấu trúc

- index.html: portfolio, thông tin sinh viên, mục tiêu, kiến thức và tự đánh giá.
- css/style.css, js/main.js: giao diện và điều hướng các trang giới thiệu.
- images/avatar.png: ảnh đại diện do sinh viên cung cấp.
- Lab08, Lab09, Lab10: từng Lab có index.html và các ExerciseXX/index.html.
- JS ngoài riêng của bài nằm cạnh HTML dưới tên script.js. Bài nhúng JavaScript không cần tạo JS ngoài.
- CSS, ảnh, cờ, PDF và thư viện dùng chung giữ ở cấp Lab.

## Truy cập source

Mở thư mục JavaScript-Labs trong VS Code, mở index.html bằng Live Preview rồi truy cập từng Lab/Exercise. Các bài GET cần chạy qua HTTP local hoặc HTTPS, không mở bằng file://.

## Các Lab

- Lab08: cú pháp nền tảng, kiểu dữ liệu, chuỗi/ngày giờ, mảng, hàm và đối tượng.
- Lab09: chọn/sửa/thêm/xóa DOM, sự kiện, gỡ lỗi, focus/blur và kiểm tra trường trống.
- Lab10: nạp jQuery, selector, event, DOM, fade/slide/animate, GET và jqXHR.

## Các bài tiếp nối cùng trang gốc

8.2–8.5, 9.5–9.6 và 10.1–10.2 tiếp nối cùng tệp trong PDF. Thư mục mới lưu trạng thái cuối của từng Exercise để tên bài khớp kết quả khi mở riêng. Ảnh các giai đoạn walkthrough cũ vẫn là minh chứng quá trình.

## Điều chỉnh kỹ thuật so với nguồn PDF

- Tên bài thống nhất theo PDF. 8.2 dùng alert Hello World; 9.5 alert nội dung div1 sau load; 10.1 chỉ thiết lập jQuery.
- jQuery dùng CDN HTTPS, kèm bản local cùng phiên bản: 3.1.1 cho 10.1–10.2 và 3.1.0 cho 10.3–10.10.
- 10.2 comment dòng thay toàn bộ first ở các bước sau để textarea vẫn tồn tại; ảnh chặng html() đã được giữ.
- Bổ sung dấu đóng cần thiết ở ví dụ thiếu của PDF, giữ các phép minh họa phạm vi biến và lỗi có chủ đích.
- 10.9–10.10 ưu tiên GET endpoint HTTPS của dịch vụ gốc, timeout 5 giây. Nếu lỗi, GET bản phản hồi thật đã lưu ngày 17/11/2026 trong Lab10/data/cities.json. Đây là snapshot 53 thành phố, không phải dữ liệu trực tiếp. Console và data-source của results phân biệt remote/local-snapshot. Xem Lab10/data/README.md.
- 10.10 chỉ kết thúc loading sau khi yêu cầu cuối cùng thành công hoặc thất bại.
- Bỏ tham chiếu stripes.jpg không có trong bộ nguồn ở class tiled chưa được các Exercise dùng; không đổi giao diện các bài được giao.

Lab08/exercise.html là mẫu travel bổ sung của bộ starter, không phải Exercise thứ 12 và không được đưa vào danh sách bài đã làm. Các liên kết post.php của mẫu này thuộc ví dụ PHP ngoài phạm vi ba Lab JavaScript.

## Exercise 8.1

Hai ảnh mới ghi nhận bật/tắt JavaScript và HTTP 502 ở dịch vụ giáo trình. Ảnh nằm trong Lab08/screenshots và hiển thị tại Exercise01/index.html. Không trình bày lỗi 502 thành thông báo enabled/disabled đã nhận từ dịch vụ.

## Ánh xạ mã nguồn

| Exercise | HTML | JavaScript | Trang nguồn trước khi sắp xếp |
|---|---|---|---|
| 8.1 | Lab08/Exercise01/index.html | Thao tác trình duyệt | External URL in Lab08.pdf |
| 8.2 | Lab08/Exercise02/index.html | JavaScript nhúng trong HTML | Lab08/lab08-walkthrough02.html |
| 8.3 | Lab08/Exercise03/index.html | Lab08/Exercise03/script.js | Lab08/lab08-walkthrough02.html |
| 8.4 | Lab08/Exercise04/index.html | Lab08/Exercise04/script.js | Lab08/lab08-walkthrough02.html |
| 8.5 | Lab08/Exercise05/index.html | Lab08/Exercise05/script.js | Lab08/lab08-walkthrough02.html |
| 8.6 | Lab08/Exercise06/index.html | Lab08/Exercise06/script.js | Lab08/lab08-walkthrough06.html |
| 8.7 | Lab08/Exercise07/index.html | Lab08/Exercise07/script.js | Lab08/lab08-walkthrough07.html |
| 8.8 | Lab08/Exercise08/index.html | Lab08/Exercise08/script.js | Lab08/lab08-walkthrough08.html |
| 8.9 | Lab08/Exercise09/index.html | Lab08/Exercise09/script.js | Lab08/lab08-walkthrough09.html |
| 8.10 | Lab08/Exercise10/index.html | Lab08/Exercise10/script.js | Lab08/lab08-walkthrough10.html |
| 8.11 | Lab08/Exercise11/index.html | Lab08/Exercise11/script.js | Lab08/lab08-walkthrough11.html |
| 9.1 | Lab09/Exercise01/index.html | Lab09/Exercise01/script.js | Lab09/lab09-walkthrough01.html |
| 9.2 | Lab09/Exercise02/index.html | Lab09/Exercise02/script.js | Lab09/lab09-walkthrough02.html |
| 9.3 | Lab09/Exercise03/index.html | Lab09/Exercise03/script.js | Lab09/lab09-walkthrough03.html |
| 9.4 | Lab09/Exercise04/index.html | Lab09/Exercise04/script.js | Lab09/lab09-walkthrough04.html |
| 9.5 | Lab09/Exercise05/index.html | Lab09/Exercise05/script.js | Lab09/lab09-walkthrough05.html |
| 9.6 | Lab09/Exercise06/index.html | Lab09/Exercise06/script.js | Lab09/lab09-walkthrough05.html |
| 9.7 | Lab09/Exercise07/index.html | Lab09/Exercise07/script.js | Lab09/lab09-walkthrough07.html |
| 9.8 | Lab09/Exercise08/index.html | Lab09/Exercise08/script.js | Lab09/lab09-walkthrough08.html |
| 10.1 | Lab10/Exercise01/index.html | JavaScript nhúng trong HTML | Lab10/lab10-walkthrough01.html |
| 10.2 | Lab10/Exercise02/index.html | Lab10/Exercise02/script.js | Lab10/lab10-walkthrough01.html |
| 10.3 | Lab10/Exercise03/index.html | Lab10/Exercise03/script.js | Lab10/lab10-walkthrough03.html |
| 10.4 | Lab10/Exercise04/index.html | Lab10/Exercise04/script.js | Lab10/lab10-walkthrough04.html |
| 10.5 | Lab10/Exercise05/index.html | Lab10/Exercise05/script.js | Lab10/lab10-walkthrough05.html |
| 10.6 | Lab10/Exercise06/index.html | Lab10/Exercise06/script.js | Lab10/lab10-walkthrough06.html |
| 10.7 | Lab10/Exercise07/index.html | Lab10/Exercise07/script.js | Lab10/lab10-walkthrough07.html |
| 10.8 | Lab10/Exercise08/index.html | Lab10/Exercise08/script.js | Lab10/lab10-walkthrough08.html |
| 10.9 | Lab10/Exercise09/index.html | Lab10/Exercise09/script.js | Lab10/lab10-walkthrough09.html |
| 10.10 | Lab10/Exercise10/index.html | Lab10/Exercise10/script.js | Lab10/lab10-walkthrough10.html |

## Tự đánh giá

Ba Lab cho thấy JavaScript không chỉ tạo hiệu ứng mà còn quyết định cách website phản hồi trước thao tác và dữ liệu. Lab09 hữu ích nhất với TMĐT vì DOM và sự kiện là nền tảng cập nhật thông tin sản phẩm, giỏ hàng và kiểm tra biểu mẫu. Lab10 khó hơn ở yêu cầu bất đồng bộ: giao diện cần thể hiện đúng trạng thái đang tải, thành công hoặc thất bại, tránh để người mua hiểu nhầm thao tác đã hoàn tất. Từ đó, dữ liệu đúng và phản hồi rõ ràng quan trọng hơn hiệu ứng đẹp. Các kỹ năng cần luyện thêm là quản lý trạng thái, kiểm thử lỗi và tổ chức mã. Khi ứng dụng vào website TMĐT, ưu tiên là giảm thao tác sai và giữ trải nghiệm nhất quán.

## GitHub Pages

Chưa triển khai/xác nhận URL của bản này. Ưu tiên hoàn thiện và kiểm tra source, đưa mã nguồn đầy đủ lên repository trước; cấu hình và kiểm tra Pages thực hiện sau.

## Phạm vi

Gói chỉ tổ chức nội dung trong JavaScript-Labs. Không sửa bài thực hành trước ở thư mục khác, không tạo thư mục backup và không tự stage/commit/push.
