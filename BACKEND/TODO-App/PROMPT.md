# Prompt Vibe Coding

Prompt dưới đây là bản đặc tả triển khai được tổng hợp từ yêu cầu bài thực hành và các quyết định kỹ thuật của dự án.

> Xây dựng TODO App quản lý công việc cá nhân bằng HTML, CSS, JavaScript và Node.js. Giao diện tiếng Việt, responsive, có menu Hôm nay, Tất cả công việc, Quá hạn và Thống kê. Trang mặc định hiển thị task có hạn hôm nay theo ngày máy chủ. Cho phép tìm kiếm tên/mô tả không phân biệt dấu tiếng Việt, lọc trạng thái, danh mục và mức ưu tiên, thêm/sửa/xóa công việc, đánh dấu hoàn thành. Form có tên, mô tả, ngày đến hạn, danh mục, ưu tiên, trạng thái; kiểm tra dữ liệu đầu vào. Trang thống kê có tổng công việc, số hoàn thành, đang làm, quá hạn, tỷ lệ hoàn thành, phân bố theo danh mục và hạn công việc trong 7 ngày gần đây. Tạo dữ liệu mock tương đối với ngày khởi chạy. Xây dựng REST API Node.js có hai chế độ: mảng dữ liệu trong RAM không dùng CSDL và SQLite lưu dữ liệu thật, dùng chung giao diện. Dùng câu lệnh SQL có tham số. Cung cấp schema SQL, README hướng dẫn chạy, mô tả API, kiểm thử CRUD, lọc, thống kê và lưu dữ liệu sau khi khởi động lại. Không yêu cầu thư viện ngoài. Không tự commit hoặc push GitHub.

## Tiêu chí kiểm tra

- Chế độ RAM không sinh file cơ sở dữ liệu.
- Chế độ SQLite tạo file tasks.db và giữ dữ liệu sau khi khởi động lại.
- Cả hai chế độ dùng chung REST API và giao diện.
- Dữ liệu thống kê được tính từ danh sách công việc, không hardcode số liệu.
