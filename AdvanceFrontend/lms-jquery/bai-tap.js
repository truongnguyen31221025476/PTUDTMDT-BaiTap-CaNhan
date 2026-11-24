// Chạy trong Console của trang học phần LMS UEH sau khi đăng nhập.
(async function () {
    const $ = window.jQuery;
    if (!$) {
        console.warn('Trang hiện tại chưa có jQuery.');
        return;
    }
    const sections = $('.course-content li.section');
    if (!sections.length) {
        console.warn('Hãy mở trang chính của học phần.');
        return;
    }

    const names = $('.modtype_assign .instancename').map(function () {
        return $(this).text().trim();
    }).get();
    console.log('Tổng số bài tập:', names.length);
    console.log('Bài tập thứ 5:', names[4] || 'Không tìm thấy');

    const noDue = 'Không hiển thị hạn nộp trên LMS';
    async function getDeadline(href) {
        if (!href) return 'Chưa kiểm tra được';
        try {
            const url = new URL(href, location.href);
            if (url.origin !== location.origin || !url.pathname.endsWith('/mod/assign/view.php')) {
                return 'Chưa kiểm tra được';
            }
            const response = await fetch(url, { credentials: 'same-origin' });
            if (!response.ok) return 'Lỗi truy xuất HTTP ' + response.status;
            const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
            if (doc.querySelector('form#login') || !doc.querySelector('#region-main')) {
                return 'Chưa kiểm tra được';
            }
            const fields = doc.querySelectorAll('.activity-dates strong, [data-region="activity-dates"] strong, tr > th, tr > td:first-child');
            const dueLabel = /^(?:due(?: date)?|hạn nộp(?: bài)?|ngày hết hạn)\s*:?$/i;
            for (const field of fields) {
                if (!dueLabel.test(field.textContent.trim())) continue;
                const value = field.matches('td, th') ? field.nextElementSibling?.textContent :
                    field.parentElement.textContent.slice(field.textContent.length);
                if (value?.trim()) return value.replace(/\s+/g, ' ').trim();
            }
            return noDue;
        } catch {
            return 'Lỗi truy xuất';
        }
    }

    const rows = [];
    for (const [index, section] of sections.get().entries()) {
        const title = $(section).find('.sectionname').first().text().trim() || 'Chủ đề ' + (index + 1);
        const tasks = $(section).find('.modtype_assign').filter(function () {
            return $(this).closest('li.section')[0] === section;
        });
        if (!tasks.length) {
            rows.push({ STT: index + 1, 'Chủ đề': title, 'Có bài tập': 'Không', 'Tên bài tập': 'Không có bài tập', Deadline: 'Không áp dụng' });
        }
        for (const task of tasks.get()) {
            const link = $(task).find('a[href*="/mod/assign/view.php"]').first();
            rows.push({ STT: index + 1, 'Chủ đề': title, 'Có bài tập': 'Có',
                'Tên bài tập': $(task).find('.instancename').first().text().trim(),
                Deadline: await getDeadline(link.attr('href')) });
        }
    }
    const tasks = rows.filter(row => row['Có bài tập'] === 'Có');
    const missing = tasks.filter(row => row.Deadline === noDue);
    const errors = tasks.filter(row => /^(Lỗi truy xuất|Chưa kiểm tra được)/.test(row.Deadline));
    console.log('Tổng số chủ đề:', sections.length);
    console.log('Bài tập có deadline:', tasks.length - missing.length - errors.length);
    console.log('Bài không hiển thị deadline:', missing.length);
    console.log('Lỗi truy xuất:', errors.length);
    console.table(rows);
})();
