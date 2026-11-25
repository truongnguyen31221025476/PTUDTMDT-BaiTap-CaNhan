
# TODO App - Quản lý công việc cá nhân

## 1. Giới thiệu

TODO App là ứng dụng web hỗ trợ người dùng quản lý, theo dõi và sắp xếp các công việc cá nhân. Hệ thống giúp người dùng lập kế hoạch hằng ngày, xác định mức độ ưu tiên và theo dõi tiến độ hoàn thành công việc.

## 2. Chức năng hệ thống

### 2.1. Hiển thị công việc

- Hiển thị danh sách công việc cần thực hiện trong ngày hôm nay.
- Xem toàn bộ công việc đã được tạo.
- Theo dõi các công việc quá hạn chưa hoàn thành.
- Hiển thị thông tin về tên công việc, mô tả, danh mục, hạn hoàn thành, mức độ ưu tiên và trạng thái.

### 2.2. Tìm kiếm và lọc công việc

- Tìm kiếm công việc theo từ khóa.
- Lọc theo trạng thái: Chưa làm, Đang làm, Hoàn thành.
- Lọc theo danh mục: Học tập, Công việc, Cá nhân.
- Lọc theo mức độ ưu tiên: Thấp, Vừa, Cao.
- Kết hợp nhiều điều kiện lọc cùng lúc.
- Đặt lại bộ lọc để trở về danh sách ban đầu.

### 2.3. Quản lý công việc

- Thêm công việc mới với đầy đủ thông tin.
- Chỉnh sửa thông tin công việc đã tạo.
- Xóa công việc không còn cần thiết.
- Xác nhận trước khi xóa để hạn chế thao tác nhầm.
- Đánh dấu công việc đã hoàn thành.
- Cập nhật danh sách và số liệu tổng quan sau mỗi thao tác.

### 2.4. Thống kê công việc

- Thống kê tổng số công việc.
- Thống kê số công việc đã hoàn thành, đang thực hiện và quá hạn.
- Tính tỷ lệ hoàn thành công việc.
- Thống kê công việc theo trạng thái và danh mục.
- Hiển thị biểu đồ công việc trong 7 ngày gần đây.

Trang thống kê giúp người dùng theo dõi tiến độ và đánh giá hiệu quả quản lý công việc cá nhân.

## 3. Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js |
| Database | SQLite |
| Giao tiếp dữ liệu | REST API |
| Kiểm thử | Node.js Test Runner |

## 4. Kiến trúc hệ thống

Ứng dụng được xây dựng theo mô hình Client-Server. Người dùng thực hiện các thao tác thông qua giao diện web. Frontend gửi yêu cầu đến Backend thông qua REST API. Backend xử lý yêu cầu, truy xuất dữ liệu và trả kết quả về giao diện.

Hệ thống hỗ trợ hai chế độ hoạt động:

- Không có cơ sở dữ liệu: Công việc được lưu tạm thời trong bộ nhớ và được khởi tạo bằng dữ liệu mẫu.
- Có cơ sở dữ liệu: Công việc được lưu trữ trong SQLite và duy trì sau khi khởi động lại chương trình.

## 5. Hướng dẫn chạy chương trình

### Yêu cầu môi trường

- Node.js 22.13.0 trở lên.
- Trình duyệt web.

### Chạy chương trình không có cơ sở dữ liệu

```bash
node server.js --memory
```

### Chạy chương trình có cơ sở dữ liệu SQLite

```bash
node server.js
```

Cơ sở dữ liệu được khởi tạo tự động khi chạy chương trình ở chế độ SQLite lần đầu.

Truy cập ứng dụng tại:

http://localhost:3000

### Kiểm thử hệ thống

```bash
node --test tests/api.test.js
```

## 6. Thông tin sinh viên

- Họ và tên: Nguyễn Văn Trường
- MSSV: 31221025476
- Môn học: Phát triển ứng dụng thương mại điện tử
- Trường: Đại học Kinh tế Thành phố Hồ Chí Minh (UEH)
