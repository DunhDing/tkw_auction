// --- MOCK DATA ---
const mockAssets = [
    {
        id: 1,
        title: "Lô đất vàng tại Quận 1, TP. Hồ Chí Minh (DT 500m²)",
        image: "https://placehold.co/600x400/000000/FFFFFF?text=Bất+Động+Sản",
        startPrice: "50 Tỷ VNĐ",
        auctionTime: "10:00 - 10/12/2025",
        registerTime: "Đến 09/12/2025",
    },
    {
        id: 2,
        title: "Máy móc thiết bị công nghiệp nặng nhập khẩu từ Đức (Bộ 12 chiếc)",
        image: "https://placehold.co/600x400/3498db/FFFFFF?text=Thiết+Bị",
        startPrice: "2.5 Tỷ VNĐ",
        auctionTime: "14:30 - 15/12/2025",
        registerTime: "Đến 14/12/2025",
    },
    {
        id: 3,
        title: "Xe ô tô sedan hạng sang Mercedes-Benz C300 đời 2024 (Biển số đẹp)",
        image: "https://placehold.co/600x400/27ae60/FFFFFF?text=Xe+Ô+Tô",
        startPrice: "1.8 Tỷ VNĐ",
        auctionTime: "09:00 - 20/12/2025",
        registerTime: "Đến 19/12/2025",
    },
    {
        id: 4,
        title: "Tài khoản ngân hàng có giá trị tiền mặt (Chi tiết trong hồ sơ)",
        image: "https://placehold.co/600x400/f39c12/FFFFFF?text=Tài+Khoản+NH",
        startPrice: "500 Triệu VNĐ",
        auctionTime: "11:00 - 25/12/2025",
        registerTime: "Đến 24/12/2025",
    },
];

// --- APP STATE (Trạng thái ứng dụng) ---
// Đổi tên biến state để đồng bộ với các hàm render chung
const state = {
    activePage: window.location.hash.substring(1) || 'assets',
    mobileMenuOpen: false,
};

// --- NAVIGATION & ROUTING ---
function onNavigate(page) {
    if (page === state.activePage && page !== 'home') {
        return;
    }
    state.activePage = page;
    state.mobileMenuOpen = false; // Close mobile menu on navigation
    window.location.hash = page;
    renderApp();
}

function toggleMobileMenu() {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    renderHeader(); 
    // Re-attach handlers, especially for the mobile button, after re-rendering the header
    attachHeaderHandlers(); 
}

// --- UTILITY FUNCTIONS ---

/**
 * Renders Lucide icons dynamically after content is inserted.
 * @param {string} iconName - Tên icon (ví dụ: 'Search').
 * @param {string} classNames - Các class Tailwind.
 * @param {number} size - Kích thước.
 * @returns {string} HTML cho icon.
 */
const renderLucideIcon = (iconName, classNames, size = 24) => {
    // Sử dụng thẻ span với data-lucide để Lucide.createIcons() xử lý sau
    return `<span data-lucide="${iconName}" class="${classNames}" width="${size}" height="${size}"></span>`;
};


// --- COMPONENT RENDERING FUNCTIONS ---

/**
 * Renders the Header component (Đã đồng bộ với mẫu chi tiết).
 */
function renderHeader() {
    const headerEl = document.getElementById('app-header');

    // Utility function for active navigation link styling (Desktop)
    const navDesktopClass = (page) =>
        `cursor-pointer transition-colors text-gray-700 ${state.activePage === page ? 'text-[#be1e2d] font-bold border-b-2 border-[#be1e2d]' : 'hover:text-[#be1e2d] border-b-2 border-transparent hover:border-red-300'}`;
    
    // Utility function for mobile navigation link styling
    const navMobileClass = (page) =>
        `cursor-pointer py-3 px-4 transition-colors rounded-lg ${state.activePage === page ? 'text-white font-bold bg-[#be1e2d] shadow-md' : 'text-gray-700 hover:bg-gray-100'}`;
    
    const navItem = (page, text, isMobile = false) => `
        <span 
            class="${isMobile ? navMobileClass(page) : navDesktopClass(page)}" 
            data-nav="${page}"
        >
            ${text}
        </span>
    `;

    const html = `
        <header class="w-full sticky top-0 z-50 shadow-lg">
            <div class="bg-white">
                <div class="container mx-auto px-4 py-4 flex items-center justify-between">
                    
                    <div class="flex items-center gap-2 cursor-pointer" data-nav="home">
                        <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-red-600 rounded-lg flex items-center justify-center transform rotate-45 shadow-lg">
                            <div class="w-6 h-6 bg-white transform -rotate-45" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
                        </div>
                        <span class="text-3xl font-extrabold text-[#be1e2d] tracking-tight">VPA</span>
                    </div>

                    <div class="hidden lg:flex items-center gap-8 font-medium text-sm xl:text-base">
                        
                        <nav class="flex items-center gap-6">
                            ${navItem('home', 'Trang chủ')}
                            ${navItem('cars', 'Đấu giá biển số xe ô tô')}
                            ${navItem('motorbikes', 'Đấu giá biển số xe máy')}
                            ${navItem('assets', 'Đấu giá tài sản')}
                            ${navItem('news', 'Tin tức')}
                            ${navItem('notifications', 'Kế hoạch')}
                            ${navItem('about', 'Giới thiệu')}
                        </nav>

                        <div class="flex items-center gap-4 pl-8 border-l border-gray-200">
                            <button
                                data-nav="login"
                                class="flex items-center justify-center gap-2 text-white bg-[#be1e2d] px-5 py-2.5 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-md shadow-red-300/50 transform hover:scale-[1.02] active:scale-100 whitespace-nowrap text-sm"
                            >
                                ${renderLucideIcon('User', 'text-white', 18)} Đăng nhập
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 lg:hidden">
                        <button id="mobile-menu-btn" class="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none" aria-expanded="${state.mobileMenuOpen}" aria-label="Mở menu">
                            ${renderLucideIcon(state.mobileMenuOpen ? 'X' : 'Menu', 'text-gray-700', 26)}
                        </button>
                    </div>
                </div>

                <nav id="mobile-menu-dropdown" class="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 z-40 shadow-xl rounded-b-xl ${state.mobileMenuOpen ? '' : 'hidden'}">
                    <div class="flex flex-col p-4 space-y-1 font-medium">
                        
                        <div class="flex items-center justify-center py-2 border-b border-gray-100 mb-2">
                            <button
                                data-nav="login"
                                class="flex items-center justify-center gap-2 text-white bg-[#be1e2d] px-6 py-2.5 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-lg text-sm"
                            >
                                ${renderLucideIcon('User', 'text-white', 18)} Đăng nhập
                            </button>
                        </div>

                        ${navItem('home', 'Trang chủ', true)}
                        ${navItem('cars', 'Đấu giá biển số xe ô tô', true)}
                        ${navItem('motorbikes', 'Đấu giá biển số xe máy', true)}
                        ${navItem('assets', 'Đấu giá tài sản', true)}
                        ${navItem('news', 'Tin tức', true)}
                        ${navItem('notifications', 'Kế hoạch', true)}
                        ${navItem('about', 'Giới thiệu', true)}
                    </div>
                </nav>
            </div>
        </header>
    `;
    
    // Cập nhật nội dung của Header (thay vì thay thế toàn bộ innerHTML của #app)
    headerEl.innerHTML = html;
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderPageBanner(title, description) {
    return `
        <div class="bg-[#be1e2d] text-white py-16 text-center shadow-lg">
            <div class="container mx-auto px-4">
                <h1 class="text-4xl font-extrabold mb-2">${title}</h1>
                <p class="text-lg font-light">${description}</p>
            </div>
        </div>
    `;
}

function renderAssetList(assets) {
    const assetCards = assets.map(asset => `
        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#be1e2d] group cursor-pointer">
            <div class="relative h-48 overflow-hidden">
                <img 
                    src="${asset.image}" 
                    alt="${asset.title}" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onerror="this.onerror=null; this.src='https://placehold.co/600x400/CCCCCC/333333?text=Ảnh+Đấu+Giá';"
                />
                <div class="absolute top-2 left-2 bg-yellow-400 p-1 rounded-full shadow-md transform rotate-45">
                    <div class="w-6 h-6 bg-red-600 flex items-center justify-center text-white text-lg font-extrabold rounded-full transform -rotate-45">★</div>
                </div>
            </div>
            <div class="p-5">
                <h3 class="font-bold text-gray-800 text-lg mb-4 line-clamp-2 h-14 hover:text-[#be1e2d] transition-colors">${asset.title}</h3>
                
                <div class="flex items-center gap-2 mb-4 p-3 bg-red-50 rounded-lg border-l-4 border-[#be1e2d]">
                  <div class="w-8 h-8 rounded-full bg-[#be1e2d]/10 flex items-center justify-center text-[#be1e2d] flex-shrink-0">
                    ${renderLucideIcon('DollarSign', 'text-[#be1e2d]', 18)}
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Giá khởi điểm</p>
                    <p class="text-[#be1e2d] font-extrabold text-xl">${asset.startPrice}</p>
                  </div>
                </div>

                <div class="space-y-3 pt-2 border-t border-gray-100">
                  <div class="flex items-start gap-2">
                    ${renderLucideIcon('Clock', 'text-blue-500 mt-0.5 flex-shrink-0', 16)}
                    <div>
                      <p class="text-xs text-gray-500">Thời gian đấu giá</p>
                      <p class="text-gray-800 font-medium text-sm">${asset.auctionTime}</p>
                    </div>
                  </div>
                   <div class="flex items-start gap-2">
                    ${renderLucideIcon('Clock', 'text-green-500 mt-0.5 flex-shrink-0', 16)}
                    <div>
                      <p class="text-xs text-gray-500">Thời gian đăng ký</p>
                      <p class="text-gray-800 font-medium text-sm">${asset.registerTime}</p>
                    </div>
                  </div>
                </div>
                
                <button class="mt-4 w-full bg-[#be1e2d] text-white py-2.5 rounded-full font-semibold text-sm hover:bg-red-700 transition-colors shadow-md shadow-red-300/50">
                    Đăng ký tham gia
                </button>
              </div>
            </div>
    `).join('');

    return `
        <div id="assets-list-content" class="container mx-auto px-4 flex flex-col">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">Danh sách tài sản đấu giá</h2>

            <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div class="relative w-full md:w-1/2">
                    ${renderLucideIcon('Search', 'absolute left-3 top-1/2 transform -translate-y-1/2 text-[#be1e2d]', 18)}
                    <input type="text" placeholder="Tìm kiếm tài sản" class="w-full border border-gray-300 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#be1e2d] text-sm bg-white shadow-sm" />
                </div>
                 <button class="w-full md:w-auto bg-[#be1e2d] text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-[#a01825] transition-colors">Xem thêm</button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                ${assetCards}
            </div>
            
            <div class="flex justify-end mt-10">
                <div class="flex gap-1 items-center">
                    <button class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">&lt;</button>
                    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-[#be1e2d] text-white font-bold text-sm shadow-lg">1</button>
                    <button class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">2</button>
                    <button class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">3</button>
                    <button class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">&gt;</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renders the Footer component (Đã đồng bộ với mẫu chi tiết).
 */
function renderFooter() {
    const footerEl = document.getElementById('app-footer');
    footerEl.innerHTML = `
        <footer class="bg-[#2a0a0a] text-white pt-16 pb-8 border-t-4 border-[#be1e2d]">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
              
              <div class="lg:col-span-7">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-600 rounded-lg flex items-center justify-center transform rotate-45">
                      <div class="w-7 h-7 bg-[#2a0a0a] transform -rotate-45" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
                    </div>
                    <h2 class="text-4xl font-bold text-[#be1e2d]">VPA</h2>
                </div>
                
                <h3 class="text-xl font-bold mb-6">Công ty Đấu giá Hợp danh Việt Nam</h3>
                
                <div class="space-y-4 text-sm text-gray-300">
                  <div class="flex items-start gap-3">
                    <div class="mt-1 w-8 h-8 rounded-full bg-[#be1e2d]/20 flex items-center justify-center text-[#fbb03b] flex-shrink-0">
                      ${renderLucideIcon('MapPin', '', 16)}
                    </div>
                    <div>
                      <span class="text-[#fbb03b] font-bold block mb-1">Trụ sở chính:</span>
                      NO2-T4.03, tầng 4 tòa nhà NO2 - TNL Plaza Goldseason, số 47 Nguyễn Tuân, phường Thanh Xuân Trung, quận Thanh Xuân, thành phố Hà Nội
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-3">
                     <div class="w-8 h-8 rounded-full bg-transparent flex-shrink-0"></div>
                     <div>
                      <span class="text-[#fbb03b] font-bold block mb-1">Chi nhánh HCM:</span>
                      Số 466 Hai Bà Trưng, phường Tân Định, Thành phố Hồ Chí Minh
                     </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-[#be1e2d]/20 flex items-center justify-center text-[#fbb03b] flex-shrink-0">
                      ${renderLucideIcon('Phone', '', 16)}
                    </div>
                    <div>
                      <span class="text-[#fbb03b] font-bold">Hotline CSKH:</span> 1900.0555.15
                    </div>
                  </div>
                   <div class="pl-11 text-gray-400">
                     Các số gọi ra: 024.9995.5515, 024.9996.8888 hoặc các đầu số tên "DAU GIA VN".
                   </div>

                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-[#be1e2d]/20 flex items-center justify-center text-[#fbb03b] flex-shrink-0">
                      ${renderLucideIcon('Mail', '', 16)}
                    </div>
                    <div>
                       <span class="text-[#fbb03b] font-bold">Đấu giá biển số:</span> dgbs@vpa.com.vn
                    </div>
                  </div>
                   <div class="pl-11">
                      <span class="text-[#fbb03b] font-bold">Đấu giá tài sản:</span> dgts@vpa.com.vn
                    </div>
                    <div class="pl-11">
                      <span class="text-[#fbb03b] font-bold">Liên hệ hợp tác:</span> info@vpa.com.vn
                    </div>
                </div>

                <div class="mt-8 text-sm text-gray-400">
                  <p>Đại diện: Bà Lâm Thị Mai Anh - Chức vụ: Giám Đốc</p>
                  <p>Giấy chứng nhận ĐKHĐ: 41/TP-ĐKHĐ do Sở Tư pháp Hà Nội cấp ngày 21/01/2019</p>
                </div>
              </div>

              <div class="lg:col-span-5 flex flex-col items-start lg:items-end">
                <h3 class="text-lg font-bold mb-4 text-[#fbb03b]">Theo dõi chúng tôi trên</h3>
                <div class="flex gap-4 mb-8">
                  <a href="#" class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition shadow-lg" aria-label="Facebook">
                    ${renderLucideIcon('Facebook', '', 24)}
                  </a>
                  <a href="#" class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition font-bold text-xs flex items-center justify-center w-10 h-10 shadow-lg" aria-label="Zalo">
                    Zalo
                  </a>
                </div>

                <div class="mb-8 bg-white rounded-xl p-3 shadow-2xl">
                    <div class="border-2 border-red-500 flex items-center p-2 gap-2 rounded-lg">
                      <div class="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">✓</div>
                      <div class="text-red-600 font-bold leading-tight text-xs uppercase">
                         Đã đăng ký<br/>Bộ Công Thương
                      </div>
                    </div>
                </div>

                <div class="text-left w-full lg:text-right">
                  <h3 class="text-lg font-bold mb-4 text-[#fbb03b]">Chính sách</h3>
                  <ul class="space-y-2 text-sm text-gray-300">
                    <li><a href="#" class="hover:text-white transition-colors">• Chính sách bảo vệ dữ liệu cá nhân</a></li>
                    <li><a href="#" class="hover:text-white transition-colors">• Điều khoản sử dụng</a></li>
                    <li><a href="#" class="hover:text-white transition-colors">• Chính sách thanh toán</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 text-center md:text-left">
              <p class="order-2 md:order-1 mt-4 md:mt-0">Bản quyền thuộc về VPA@2023</p>
              <p class="order-1 md:order-2">Trang thông tin điện tử đấu giá trực tuyến vpa.com.vn đã được Sở Tư pháp thành phố Hà Nội phê duyệt đủ điều kiện thực hiện hình thức đấu giá trực tuyến theo Quyết định số 226/QĐ-STP ngày 16/3/2023</p>
            </div>
          </div>
        </footer>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

/**
 * Renders the Sticky Contact component (Đã đồng bộ với mẫu chi tiết).
 */
function renderStickyContact() {
    const stickyEl = document.getElementById('app-sticky-contact');
    stickyEl.innerHTML = `
        <div class="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
            <a href="#" title="Facebook" class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 flex items-center justify-center w-12 h-12">
                ${renderLucideIcon('Facebook', '', 24)}
            </a>
            <a href="#" title="Zalo" class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 flex items-center justify-center w-12 h-12">
                <div class="font-bold text-xs">Zalo</div>
            </a>
            <a href="tel:1900055515" title="Hotline" class="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 flex items-center justify-center w-12 h-12 animate-pulse">
                ${renderLucideIcon('Phone', '', 24)}
            </a>
        </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderContent() {
    const mainEl = document.getElementById('app-main');
    let contentHtml = '';
    
    switch (state.activePage) {
        case 'home':
            contentHtml = renderPageBanner("Trang Chủ", "Chào mừng đến với hệ thống đấu giá trực tuyến VPA.");
            break;
        case 'cars':
            contentHtml = renderPageBanner("Đấu Giá Biển Số Xe Ô Tô", "Tham gia đấu giá biển số xe đẹp, độc quyền.");
            break;
        case 'motorbikes':
            contentHtml = renderPageBanner("Đấu Giá Biển Số Xe Máy", "Các biển số xe máy độc đáo đang chờ bạn.");
            break;
        case 'assets':
            const banner = renderPageBanner("Đấu Giá Tài Sản", "Xem danh sách các tài sản được đấu giá công khai và minh bạch.");
            const assetList = renderAssetList(mockAssets);
            contentHtml = `
                <div class='flex flex-col'>
                    ${banner}
                    <div id="assets" class="py-16 bg-[#f8f9fa]">${assetList}</div>
                </div>
            `;
            break;
        case 'news':
            contentHtml = renderPageBanner("Tin Tức & Sự Kiện", "Cập nhật thông tin mới nhất từ VPA.");
            break;
        case 'notifications':
            contentHtml = renderPageBanner("Kế Hoạch & Thông Báo", "Lịch đấu giá và các thông báo quan trọng.");
            break;
        case 'login':
            contentHtml = renderPageBanner("Đăng Nhập", "Vui lòng đăng nhập để tham gia đấu giá.");
            break;
        case 'about':
            contentHtml = renderPageBanner("Giới Thiệu", "Tìm hiểu thêm về Công ty Đấu giá Hợp danh Việt Nam.");
            break;
        default:
            contentHtml = renderPageBanner("404", "Trang bạn tìm kiếm không tồn tại.");
            break;
    }

    mainEl.innerHTML = contentHtml;
    // Re-create icons for the main content area after updating innerHTML
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderApp() {
    // Tạo các điểm gắn kết ban đầu nếu chưa có
    const root = document.getElementById('root');
    if (root && !document.getElementById('app-header')) {
        root.innerHTML = `
            <div id="app" class="min-h-screen flex flex-col font-sans bg-gray-50">
                <div id="app-header"></div>
                <main id="app-main" class="flex-grow"></main>
                <div id="app-footer"></div>
                <div id="app-sticky-contact"></div>
            </div>
        `;
    }

    renderHeader();
    renderContent();
    renderFooter();
    renderStickyContact();
    attachHeaderHandlers();
}

function attachHeaderHandlers() {
    // 1. Navigation Handlers
    const headerEl = document.getElementById('app-header');
    if (headerEl) {
        headerEl.querySelectorAll('[data-nav]').forEach(el => {
            el.onclick = (e) => {
                e.preventDefault();
                const page = el.getAttribute('data-nav');
                onNavigate(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
        });
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.onclick = toggleMobileMenu;
    }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Check initial hash for deep linking
    if (window.location.hash) {
        state.activePage = window.location.hash.substring(1);
    }
    
    // Initial render
    renderApp();

    // Setup hash change listener for routing
    window.addEventListener('hashchange', () => {
        state.activePage = window.location.hash.substring(1) || 'assets';
        renderApp();
    });
});