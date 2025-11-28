// Hàm tải nội dung từ file HTML và chèn vào thẻ main
async function loadContent(pageName) {
    const mainContent = document.getElementById('main-content');
    const url = `${pageName}.html`; // Ví dụ: trang-chu.html, dich-vu.html

    try {
        // 1. Hiển thị thông báo đang tải
        mainContent.innerHTML = '<div class="loading-state" style="text-align: center; padding: 50px;">Đang tải nội dung...</div>';

        // 2. Lấy nội dung từ file HTML
        const response = await fetch(url);
        
        // Xử lý lỗi nếu file không tồn tại (ví dụ: 404)
        if (!response.ok) {
            throw new Error(`Không thể tải trang: ${pageName}.html (Status: ${response.status})`);
        }

        const htmlContent = await response.text();

        // 3. Thay thế nội dung trong thẻ main
        mainContent.innerHTML = htmlContent;

        // 4. Cập nhật trạng thái Active trên menu (Tùy chọn)
        updateActiveLink(pageName);

    } catch (error) {
        console.error("Lỗi tải trang:", error);
        mainContent.innerHTML = `<div class="error-state" style="text-align: center; padding: 50px; color: red;">Không thể tải nội dung trang **${pageName}**. Vui lòng thử lại.</div>`;
    }
}

// Hàm cập nhật trạng thái active của menu
function updateActiveLink(targetPage) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.target === targetPage) {
            link.classList.add('active');
        }
    });
}

// Hàm xử lý sự kiện click
function handleNavigationClick(event) {
    const link = event.target.closest('.nav-link');
    if (link) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định (chuyển trang)

        const targetPage = link.dataset.target;

        if (targetPage) {
            // Tải nội dung mới
            loadContent(targetPage);

            // Cập nhật URL trình duyệt (Tùy chọn - Tốt cho SEO và History)
            // LƯU Ý: Đây là kỹ thuật History API của SPA
            history.pushState({ page: targetPage }, targetPage, `#${targetPage}`);
        }
    }
}

// Xử lý sự kiện khi người dùng bấm nút back/forward của trình duyệt
window.addEventListener('popstate', (event) => {
    const page = event.state ? event.state.page : 'trang-chu';
    loadContent(page);
});

// Chạy khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    // 1. Thiết lập sự kiện lắng nghe cho toàn bộ header
    document.querySelector('.main-nav').addEventListener('click', handleNavigationClick);
    document.querySelector('.logo').addEventListener('click', handleNavigationClick);

    // 2. Tải trang chủ mặc định khi vào trang lần đầu
    // Kiểm tra hash trong URL (nếu có), nếu không thì tải trang-chu
    const initialPage = window.location.hash ? window.location.hash.substring(1) : 'trang-chu';
    loadContent(initialPage);
});