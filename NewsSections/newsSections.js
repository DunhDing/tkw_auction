// --- 1. MOCK DATA ---
const MOCK_NEWS_DATA = [
    { id: 1, title: 'Thông báo kết quả đấu giá biển số xe ô tô ngày 20/09/2024', category: 'Biển số xe', source: 'Tin mới', date: '21/09/2024' },
    { id: 2, title: 'Quy trình đăng ký và tham gia đấu giá tài sản online chi tiết', category: 'Hướng dẫn', source: 'VPA', date: '15/09/2024' },
    { id: 3, title: 'Khởi động đợt đấu giá biển số xe máy đầu tiên tại Hà Nội', category: 'Xe máy', source: 'Sự kiện', date: '10/09/2024' },
    { id: 4, title: 'Các lưu ý khi thanh toán và nhận biển số trúng đấu giá', category: 'Tài chính', source: 'VPA', date: '05/09/2024' },
    { id: 5, title: 'Đánh giá phiên đấu giá thử nghiệm hệ thống mới', category: 'Hệ thống', source: 'Tin mới', date: '01/09/2024' },
];

const MOCK_NOTIF_DATA = [
    { id: 101, title: 'Kế hoạch đấu giá đợt 3 quý IV/2024 chính thức được công bố', date: '01/10/2024' },
    { id: 102, title: 'Danh sách biển số ô tô đẹp sẽ được đấu giá trong tháng 11', date: '28/09/2024' },
    { id: 103, title: 'Thông báo về việc thay đổi thời gian bảo trì hệ thống', date: '25/09/2024' },
    { id: 104, title: 'Hướng dẫn sử dụng chức năng nộp tiền cọc mới', date: '20/09/2024' },
    { id: 105, title: 'Quyết định phê duyệt danh sách tài sản đấu giá', date: '18/09/2024' },
];

// --- 2. GLOBAL STATE (Mô phỏng React state) ---
let activePage = 'news';
let mobileMenuOpen = false;
let activeTab = 'news';
let currentPage = 1;
const TOTAL_PAGES_NEWS = 60;
const TOTAL_PAGES_NOTIF = 30;

// --- 3. STATE MUTATORS & RENDER TRIGGER ---
function setActivePageAndRender(page) {
    activePage = page;
    renderApp();
}

function setMobileMenuOpenAndRender(isOpen) {
    mobileMenuOpen = isOpen;
    renderApp();
}

function setActiveTabAndRender(tab) {
    activeTab = tab;
    currentPage = 1; // Reset page when changing tab
    renderApp();
}

function setCurrentPageAndRender(page) {
    const totalPages = activeTab === 'news' ? TOTAL_PAGES_NEWS : TOTAL_PAGES_NOTIF;
    currentPage = Math.max(1, Math.min(totalPages, page));
    renderApp();
}

// --- 4. UTILITY FUNCTIONS (SVG Icons) ---

// Lucide icons as inline SVG strings (simplified for essential icons)
const icons = {
    User: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    Menu: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
    X: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    MapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    Phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.67-4.14A19.5 19.5 0 0 1 3.2 6.55 2 2 0 0 1 5.23 4h3a2 2 0 0 1 2 1.77 13.82 13.82 0 0 0 .59 2.05L8.71 10.96a1 1 0 0 0 .51 1.25 16.6 16.6 0 0 0 2.29 1.39 1 1 0 0 0 1.25.51l2.14-1.89a2 2 0 0 1 1.77.16 13.8 13.8 0 0 0 2.05.59A2 2 0 0 1 22 16.92Z"/></svg>`,
    Mail: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.8 6.4c-.6.4-1.4.4-2 0L2 7"/></svg>`,
    Facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    ChevronsRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>`
};

// --- 5. COMPONENT HTML GENERATORS ---

function getNavClass(page) {
    // Nav class cho desktop
    return `cursor-pointer transition-colors text-gray-700 ${activePage === page ? 'text-[#be1e2d] font-bold border-b-2 border-[#be1e2d]' : 'hover:text-[#be1e2d] border-b-2 border-transparent hover:border-red-300'}`;
}

function getMobileNavClass(page) {
    // Nav class cho mobile
    return `cursor-pointer py-3 px-4 transition-colors rounded-lg ${activePage === page ? 'text-white font-bold bg-[#be1e2d] shadow-md' : 'text-gray-700 hover:bg-gray-100'}`;
}

function Header() {
    const navLinks = [
        { page: 'home', text: 'Trang chủ' },
        { page: 'cars', text: 'Đấu giá biển số xe ô tô' },
        { page: 'motorbikes', text: 'Đấu giá biển số xe máy' },
        { page: 'assets', text: 'Đấu giá tài sản' },
        { page: 'news', text: 'Tin tức' },
        { page: 'notifications', text: 'Kế hoạch' },
        { page: 'about', text: 'Giới thiệu' },
    ];

    const desktopNav = navLinks.map(link => 
        `<span data-page="${link.page}" class="${getNavClass(link.page)} nav-link">${link.text}</span>`
    ).join('');

    const mobileNav = navLinks.map(link => 
        `<span data-page="${link.page}" class="${getMobileNavClass(link.page)} nav-link">${link.text}</span>`
    ).join('');
    
    return `
    <header class="w-full sticky top-0 z-50 shadow-lg bg-white">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
            
            <div data-page="home" class="flex items-center gap-2 cursor-pointer logo-link nav-link">
                <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-red-600 rounded-lg flex items-center justify-center transform rotate-45 shadow-lg">
                    <div class="w-6 h-6 bg-white transform -rotate-45" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
                </div>
                <span class="text-3xl font-extrabold text-[#be1e2d] tracking-tight">VPA</span>
            </div>

            <div class="hidden lg:flex items-center gap-8 font-medium text-sm xl:text-base">
                <nav id="desktop-nav-links" class="flex items-center gap-6">
                    ${desktopNav}
                </nav>

                <div class="flex items-center gap-4 pl-8 border-l border-gray-200">
                    <button data-page="login" class="nav-auth-button flex items-center justify-center gap-1 text-white bg-[#be1e2d] px-4 py-2 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-md shadow-red-300/50 transform hover:scale-[1.02] active:scale-100 whitespace-nowrap nav-link">
                        ${icons.User} Đăng nhập
                    </button>
                </div>
            </div>

            <div class="flex items-center gap-4 lg:hidden">
                <button id="mobile-menu-toggle" class="text-gray-700 p-1 focus:outline-none">
                    ${mobileMenuOpen ? icons.X : icons.Menu}
                </button>
            </div>
        </div>

        ${mobileMenuOpen ? `
        <div class="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 z-40 shadow-xl rounded-b-lg">
            <div class="flex flex-col p-4 space-y-2 font-medium">
                
                <div class="flex items-center justify-center py-2 border-b border-gray-100 mb-2">
                    <button data-page="login" class="nav-auth-button flex items-center justify-center gap-1 text-white bg-[#be1e2d] px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-md nav-link">
                        ${icons.User} Đăng nhập
                    </button>
                </div>

                <div id="mobile-nav-links" class="flex flex-col space-y-1">
                    ${mobileNav}
                </div>
            </div>
        </div>
        ` : ''}
    </header>
    `;
}

function NewsRow(item, isNewsTab) {
    const categoryDisplay = isNewsTab && item.category ? `[${item.category}]` : '';
    const sourceText = isNewsTab ? item.source : "Thông báo";

    return `
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-red-200 pb-4 pt-4 group cursor-pointer hover:bg-red-50/50 transition-colors">
        <div class="flex items-start gap-3 w-full md:w-3/4">
            <div class="text-[#be1e2d] mt-1 flex-shrink-0">${icons.ChevronsRight}</div>
            <h3 class="text-gray-800 font-medium text-base group-hover:text-[#be1e2d] transition-colors">
                <span class="text-gray-500 font-normal text-sm mr-1">${categoryDisplay}</span>
                ${item.title}
            </h3>
        </div>
        <div class="flex items-center gap-4 mt-2 md:mt-0 md:w-1/4 md:justify-end">
             ${item.source ? `
                 <span class="text-[#be1e2d] border border-[#be1e2d] bg-red-50 px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">
                    ${sourceText}
                 </span>
             ` : ''}
             <span class="text-gray-500 text-xs italic whitespace-nowrap">
                (Ngày đăng bài: ${item.date})
             </span>
        </div>
    </div>
    `;
}

function Pagination() {
    const totalPages = activeTab === 'news' ? TOTAL_PAGES_NEWS : TOTAL_PAGES_NOTIF;
    const maxVisible = 5;
    let pageNumbers = [];

    // Luôn hiển thị trang 1
    if (totalPages >= 1) pageNumbers.push(1);

    const startWindow = Math.max(2, currentPage - Math.floor(maxVisible / 2) + 1);
    const endWindow = Math.min(totalPages - 1, currentPage + Math.floor(maxVisible / 2));

    // Thêm dấu ... nếu cửa sổ không bắt đầu ngay sau trang 1
    if (startWindow > 2) pageNumbers.push('...');

    // Thêm các trang trong cửa sổ hiện tại
    for (let i = startWindow; i <= endWindow; i++) {
        pageNumbers.push(i);
    }
    
    // Thêm dấu ... nếu cửa sổ không kết thúc ngay trước trang cuối
    if (endWindow < totalPages - 1) pageNumbers.push('...');
    
    // Luôn hiển thị trang cuối (trừ khi nó trùng với các trang đã hiển thị)
    if (totalPages > 1 && !pageNumbers.includes(totalPages)) pageNumbers.push(totalPages);
    
    // Loại bỏ các phần tử trùng lặp và các dấu '...' dư thừa
    const uniquePages = pageNumbers.filter((item, index) => {
        if (item === '...' && pageNumbers[index + 1] === '...') return false;
        if (typeof item === 'number' && pageNumbers.indexOf(item) < index) return false;
        return true;
    });

    const pageButtons = uniquePages.map(page => {
        if (page === '...') {
            return `<span class="w-8 h-8 flex items-center justify-center text-gray-400 pb-2">...</span>`;
        }
        const pageNum = parseInt(page);
        const isCurrent = pageNum === currentPage;
        return `
            <button 
                data-page="${pageNum}"
                class="page-button w-8 h-8 flex items-center justify-center rounded text-sm font-bold shadow-sm transition-colors ${
                    isCurrent 
                    ? 'bg-[#be1e2d] text-white' 
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
                }"
            >
                ${pageNum}
            </button>
        `;
    }).join('');

    return `
        <div class="flex justify-center items-center mt-8 gap-1.5" id="pagination-controls">
            <button 
                data-nav="prev"
                ${currentPage === 1 ? 'disabled' : ''}
                class="nav-page-button w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                &lt;
            </button>
            
            ${pageButtons}
            
             <button 
                data-nav="next"
                ${currentPage === totalPages ? 'disabled' : ''}
                class="nav-page-button w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                &gt;
            </button>
        </div>
    `;
}


function NewsSection() {
    const currentData = activeTab === 'news' ? MOCK_NEWS_DATA : MOCK_NOTIF_DATA;
    const titleText = activeTab === 'news' ? "Tin tức" : "Thông báo";

    const getTabClass = (tabName) =>
        `px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 ${
        activeTab === tabName 
            ? 'bg-[#be1e2d] text-white border-[#be1e2d] shadow-md' 
            : 'text-gray-500 hover:text-[#be1e2d] bg-white border-gray-200 hover:border-[#be1e2d]'
        }`;

    const listHtml = currentData.length > 0 ?
        `<div class="space-y-0 pb-4">${currentData.map(item => NewsRow(item, activeTab === 'news')).join('')}</div>` :
        `<div class="text-center py-10 text-gray-500 italic">Hiện chưa có tin tức nào.</div>`;

    return `
        <div class="py-16 bg-gray-50 min-h-full">
            <div class="container mx-auto px-4">
                
                <div class="flex gap-1 mb-0 border-b border-gray-200">
                    <button data-tab="news" class="tab-button ${getTabClass('news')}">Tin tức</button>
                    <button data-tab="notif" class="tab-button ${getTabClass('notif')}">Thông báo</button>
                </div>
                
                <div class="w-full relative -mt-[2px] mb-4">
                    <div class="absolute inset-0 bg-red-700 h-1 top-full"></div>
                    <div class="inline-block px-6 py-3 font-bold text-lg text-white rounded-t-lg shadow-sm ${activeTab === 'news' ? 'bg-[#be1e2d]' : 'bg-red-800'}">
                        ${titleText}
                    </div>
                </div>

                <div class="bg-white p-6 rounded-b-lg shadow-xl">
                    ${listHtml}
                    ${Pagination()}
                </div>
            </div>
        </div>
    `;
}

function Footer() {
    return `
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
                  ${icons.MapPin}
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
                  ${icons.Phone.replace('width="24" height="24"', 'width="16" height="16"')}
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
                  ${icons.Mail}
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
              <a href="#" class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition" aria-label="Facebook">
                ${icons.Facebook}
              </a>
              <a href="#" class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition font-bold text-xs flex items-center justify-center w-10 h-10" aria-label="Zalo">
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
}

function StickyContact() {
    return `
    <div class="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
        <a href="#" class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center w-12 h-12" aria-label="Facebook">
            ${icons.Facebook}
        </a>
        <a href="https://zalo.me/yourzalonumber" target="_blank" rel="noopener noreferrer" class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center w-12 h-12" aria-label="Zalo">
            <div class="font-bold text-xs">Zalo</div>
        </a>
        <a href="tel:1900055515" class="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center w-12 h-12 animate-pulse" aria-label="Hotline">
            ${icons.Phone}
        </a>
    </div>
    `;
}

// --- 6. EVENT ATTACHMENT ---

function attachEventListeners() {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    // 1. Header Navigation, Logo, and Auth Buttons (Event Delegation)
    appRoot.querySelectorAll('.nav-link').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            // Lấy data-page từ chính element đó (span, button, div)
            const page = e.currentTarget.getAttribute('data-page'); 
            if (page) {
                // Đảm bảo menu di động đóng lại nếu chuyển trang
                if(mobileMenuOpen) {
                    setMobileMenuOpenAndRender(false);
                }
                // Thay vì gọi setActivePageAndRender, gọi hàm tương đương nhưng chuyển trang
                // Cập nhật URL hash để mô phỏng routing (tùy chọn)
                window.location.hash = page;
                setActivePageAndRender(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // 2. Mobile Menu Toggle
    const toggleButton = document.getElementById('mobile-menu-toggle');
    if (toggleButton) {
        // Gán trực tiếp hàm toggleMobileMenu vì ID là duy nhất và không bị re-render
        toggleButton.onclick = () => setMobileMenuOpenAndRender(!mobileMenuOpen);
    }

    // 3. News Section Tabs
    appRoot.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const tab = e.currentTarget.getAttribute('data-tab');
            if (tab === 'news' || tab === 'notif') {
                setActiveTabAndRender(tab);
            }
        });
    });
    
    // 4. Pagination Controls
    appRoot.querySelectorAll('.page-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const page = parseInt(e.currentTarget.getAttribute('data-page'));
            if (!isNaN(page)) {
                setCurrentPageAndRender(page);
            }
        });
    });

    appRoot.querySelectorAll('.nav-page-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const nav = e.currentTarget.getAttribute('data-nav');
            if (nav === 'prev') {
                 setCurrentPageAndRender(currentPage - 1);
            } else if (nav === 'next') {
                setCurrentPageAndRender(currentPage + 1);
            }
        });
    });
}


// --- 7. MAIN RENDER FUNCTION ---
function renderApp() {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;
    
    // Tạo nội dung hoàn chỉnh cho #app-root
    const htmlContent = `
        <div class="min-h-screen flex flex-col font-sans bg-gray-50">
            ${Header()}
            <main class="flex-grow">
                ${activePage === 'news' || activePage === 'notifications' ? NewsSection() : '<div class="bg-gray-50 py-20 text-center flex-grow">Trang đang phát triển. Vui lòng chuyển sang Tin tức hoặc Kế hoạch.</div>'}
            </main>
            ${Footer()}
            ${StickyContact()}
        </div>
    `;
    
    // Cập nhật DOM
    appRoot.innerHTML = htmlContent;
    
    // Re-attach tất cả các event listeners sau khi DOM được cập nhật
    attachEventListeners();
}

// Lắng nghe sự kiện hashchange để mô phỏng routing
window.addEventListener('hashchange', () => {
    const newPage = window.location.hash.substring(1) || 'news';
    if (activePage !== newPage) {
        activePage = newPage;
        renderApp();
    }
});


// Chỉ gọi renderApp() sau khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', renderApp);