function localDate(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function seedTasks() {
  return [
    ['Hoàn thành bài thực hành Backend','Kiểm thử REST API và chụp minh chứng',0,'study','high','doing'],
    ['Ôn tập JavaScript','Xem lại DOM và Event Listener',0,'study','medium','todo'],
    ['Gửi báo cáo tiến độ','Tổng hợp nội dung đã hoàn thành',0,'work','high','done'],
    ['Đọc sách 30 phút','',0,'personal','low','todo'],
    ['Chuẩn bị tài liệu thuyết trình','',1,'study','medium','todo'],
    ['Kiểm tra email','',-1,'work','low','done'],
    ['Lên kế hoạch tuần','',-1,'personal','medium','todo']
  ].map(([title,description,offset,category,priority,status]) => ({title,description,due_date:localDate(offset),category,priority,status}));
}
module.exports={localDate,seedTasks};
