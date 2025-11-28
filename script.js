// --- STATE & DATA ---
let activePage = 'home';
let activeTab = 'news';

// --- CẤU HÌNH: Ánh xạ data-target đến đường dẫn file và script ---
const externalPages = {
    'cars': { html: 'CarAuction/carAuction.html', script: 'carAuction.js' },
    'motorbikes': { html: 'MotorbikeAuction/motorbikeAuction.html', script: 'motorbikeAuction.js' },
    'assets': { html: 'AssetAuction/assetAuction.html', script: 'assetAuction.js' },
    'news': { html: 'NewsSections/newsSections.html', script: 'newsSections.js' },
    'notifications': { html: 'Plan/planAuction.html', script: 'planAuction.js' },
};

let loadedScriptElement = null; // Biến theo dõi script ngoài đang được tải

// --- CONSTANTS & MOCK DATA (GIỮ NGUYÊN) ---
const MOCK_NEWS_DATA = [
    { id: 1, title: 'Thông tin về phiên đấu giá biển số xe lần thứ N năm 2025.', source: 'VPA News', date: '20/11/2025', category: 'Tin tức' },
    { id: 2, title: '[VietNamNet] Đấu giá thành công 34.000 biển số sau 1 năm thí điểm.', source: 'Báo chí', date: '15/11/2025', category: 'Báo chí' },
    { id: 3, title: 'Hướng dẫn tham gia đấu giá trực tuyến lần đầu.', source: 'VPA News', date: '10/11/2025', category: 'Hướng dẫn' },
];

const MOCK_NOTIF_DATA = [
    { id: 101, title: 'THÔNG BÁO: Lịch đấu giá tài sản ngày 01/12/2025', date: '25/11/2025' },
    { id: 102, title: 'Danh sách các tài sản mới niêm yết chờ đấu giá.', date: '20/11/2025' },
];

const MOCK_ASSETS = [
    { id: 201, title: 'Lô đất thổ cư tại khu vực Thanh Xuân, Hà Nội, diện tích 150m2.', image: 'https://picsum.photos/seed/asset1/400/300', startPrice: '500.000.000 đ', auctionTime: '10:00 - 10/12/2025', registerTime: 'Đến 17:00 - 08/12/2025' },
    { id: 202, title: 'Xe ô tô Mazda 3, sản xuất 2020, đã qua sử dụng, biển 30K-xxx.xx.', image: 'https://picsum.photos/seed/asset2/400/300', startPrice: '750.000.000 đ', auctionTime: '14:00 - 15/12/2025', registerTime: 'Đến 17:00 - 13/12/2025' },
    { id: 203, title: 'Tài sản là tang vật vi phạm hành chính, điện thoại iPhone 15 Pro Max.', image: 'https://picsum.photos/seed/asset3/400/300', startPrice: '15.000.000 đ', auctionTime: '10:00 - 20/12/2025', registerTime: 'Đến 17:00 - 18/12/2025' },
    { id: 204, title: 'Bất động sản nhà ở tại TP Hồ Chí Minh, khu vực Quận 1.', image: 'https://picsum.photos/seed/asset4/400/300', startPrice: '5.000.000.000 đ', auctionTime: '08:00 - 25/12/2025', registerTime: 'Đến 17:00 - 23/12/2025' },
];

const MOCK_CAR_PLATES = [
    { id: 1, plateNumber: '30K-999.99', startPrice: '1.2 Tỷ đ', province: 'Hà Nội', type: 'Ngũ quý', auctionTime: '10:00 - 05/12/2025' },
    { id: 2, plateNumber: '51L-888.88', startPrice: '1.5 Tỷ đ', province: 'TP Hồ Chí Minh', type: 'Tứ quý', auctionTime: '11:00 - 05/12/2025' },
    { id: 3, plateNumber: '43A-678.90', startPrice: '40 Triệu đ', province: 'Đà Nẵng', type: 'Sảnh tiến', auctionTime: '14:00 - 15/12/2025' },
];

const MOCK_MOTORBIKE_PLATES = [
    { id: 1, plateNumber: '30K9-9999', startPrice: '50 Triệu đ', province: 'Hà Nội', type: 'Ngũ quý' },
    { id: 2, plateNumber: '51L1-2345', startPrice: '50 Triệu đ', province: 'TP Hồ Chí Minh', type: 'Sảnh tiến' },
    { id: 3, plateNumber: '15A-8888', startPrice: '30 Triệu đ', province: 'Hải Phòng', type: 'Tứ quý' },
];


// --- UTILITY FUNCTIONS ---

/**
 * Tải và thực thi script ngoài.
 * @param {string} src Đường dẫn URL của script.
 */
function loadExternalScript(src) {
    // 1. Loại bỏ script cũ để tránh xung đột
    if (loadedScriptElement) {
        loadedScriptElement.remove();
        loadedScriptElement = null;
    }

    // 2. Tải script mới
    const script = document.createElement('script');
    script.src = src;

    // Nếu là file React/Babel, thêm type="text/babel"
    if (src.includes('planAuction.js')) {
        script.type = 'text/babel';
    } else if (src.includes('carAuction.js')) {
        script.type = 'module'; 
    }

    document.body.appendChild(script);
    loadedScriptElement = script;

    // 3. Khởi tạo lại Lucide Icons (chủ yếu cho các trang đấu giá xe)
    if (typeof lucide !== 'undefined') {
        setTimeout(() => {
            if (typeof lucide.createIcons === 'function') {
                lucide.createIcons();
            }
        }, 500); 
    }
}

/**
 * Xử lý việc tải nội dung và script của trang ngoài.
 * @param {string} pageName - Tên của trang (ví dụ: 'cars', 'assets').
 */
async function loadExternalPage(pageName) {
    const pageInfo = externalPages[pageName];
    if (!pageInfo) return;

    const mainContentEl = document.getElementById('main-content');

    // Hiển thị trạng thái tải
    mainContentEl.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 min-h-screen">
            <i class="fas fa-spinner fa-spin text-vpaRed text-4xl"></i>
            <p class="mt-4 text-lg text-gray-700">Đang tải nội dung ${pageName.toUpperCase()}...</p>
        </div>
    `;

    try {
        // 1. Fetch HTML content
        const response = await fetch(pageInfo.html);
        const htmlText = await response.text();

        // 2. Parse HTML để lấy root container mà script ngoài sẽ render vào
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        let rootContainerHTML = '';

        // Xác định root container mà script ngoài mong đợi
        if (pageName === 'cars' || pageName === 'motorbikes') {
            rootContainerHTML = '<div id="app" class="font-sans antialiased text-gray-900"></div>';
        } else if (pageName === 'assets') {
             rootContainerHTML = '<main id="app-main" class="flex-grow"></main>';
        } else if (pageName === 'notifications') {
             rootContainerHTML = '<div id="root"></div>';
        } else if (pageName === 'news') {
             rootContainerHTML = '<div id="app-root" class="min-h-screen flex flex-col font-sans antialiased"></div>';
        }

        // 3. Chèn root container vào khu vực nội dung chính của index.html
        mainContentEl.innerHTML = `
            <div id="external-page-wrapper" class="w-full">
                ${rootContainerHTML}
            </div>
        `;

        // 4. Tải động và thực thi script ngoài
        const scriptPath = pageInfo.html.substring(0, pageInfo.html.lastIndexOf('/') + 1) + pageInfo.script;
        loadExternalScript(scriptPath);

    } catch (error) {
        console.error("Lỗi khi tải trang ngoài:", error);
        mainContentEl.innerHTML = `
            <div class="text-center py-20">
                <p class="text-2xl text-red-600">Lỗi: Không thể tải nội dung trang ${pageName}.</p>
                <p class="text-gray-500">Vui lòng kiểm tra đường dẫn file (${pageInfo.html}) hoặc cấu trúc trang HTML/JS.</p>
            </div>
        `;
    }
}


// --- HÀM RENDER COMPONENTS CHUNG ---

function renderHeader() {
    // Hàm này phải được gọi từ index.html để render nội dung header
    const navClass = (page) =>
        `nav-link text-gray-700 hover:text-vpaRed ${activePage === page ? 'text-vpaRed font-bold active' : ''}`;

    return `
        <header class="w-full">
            <div class="bg-white shadow-md sticky top-0 z-50">
                <div class="container mx-auto px-4 py-3 flex items-center justify-between">
                    <a id="logo-link" href="#home" data-target="home" class="flex items-center gap-2 cursor-pointer">
                        <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-red-600 rounded-lg flex items-center justify-center transform rotate-45 shadow-lg">
                            <div class="w-6 h-6 bg-white transform -rotate-45" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
                        </div>
                        <span class="text-3xl font-extrabold text-vpaRed tracking-tight">VPA</span>
                    </a>

                    <div class="hidden lg:flex items-center gap-8 font-medium text-sm xl:text-base">
                        <nav id="desktop-nav" class="flex items-center gap-6" aria-label="Điều hướng chính">
                            <a href="#home" data-target="home" class="${navClass('home')}">Trang chủ</a>
                            <a href="#cars" data-target="cars" class="${navClass('cars')}">Đấu giá biển số xe ô tô</a>
                            <a href="#motorbikes" data-target="motorbikes" class="${navClass('motorbikes')}">Đấu giá biển số xe máy</a>
                            <a href="#assets" data-target="assets" class="${navClass('assets')}">Đấu giá tài sản</a>
                            
                            <a href="#news" data-target="news" class="${navClass('news')}">Tin tức</a>
                            <a href="#notifications" data-target="notifications" class="${navClass('notifications')}">Kế hoạch</a>
                            <a href="#about" data-target="about" class="${navClass('about')}">Giới thiệu</a>
                        </nav>

                        <div class="flex items-center gap-4 pl-8 border-l border-gray-200">
                            <a href="#login" id="login-btn-desktop" data-target="login"
                                class="flex items-center justify-center gap-1 text-white bg-vpaRed px-4 py-2 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-md shadow-red-300/50 transform hover:scale-[1.02] active:scale-100 whitespace-nowrap">
                                <i class="fas fa-user" style="font-size: 14px;"></i> Đăng nhập
                            </a>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 lg:hidden">
                        <button id="menu-toggle" class="text-gray-700 p-1 focus:outline-none" aria-expanded="false"
                            aria-controls="mobile-menu-dropdown" aria-label="Mở menu">
                            <i class="fas fa-bars" id="menu-icon"></i>
                        </button>
                    </div>
                </div>

                <nav id="mobile-menu-dropdown"
                    class="mobile-menu lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 z-40 shadow-xl rounded-b-lg">
                    <div class="flex flex-col p-4 space-y-2 font-medium">
                        <div class="flex items-center justify-center py-2 border-b border-gray-100 mb-2">
                            <a href="#login" id="login-btn-mobile" data-target="login"
                                class="flex items-center justify-center gap-1 text-white bg-vpaRed px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-md">
                                <i class="fas fa-user" style="font-size: 14px;"></i> Đăng nhập
                            </a>
                        </div>
                        <a href="#home" data-target="home" class="${navClass('home')} mobile-nav-class">Trang chủ</a>
                        <a href="#cars" data-target="cars" class="${navClass('cars')} mobile-nav-class">Đấu giá biển số xe ô tô</a>
                        <a href="#motorbikes" data-target="motorbikes" class="${navClass('motorbikes')} mobile-nav-class">Đấu giá biển số xe máy</a>
                        <a href="#assets" data-target="assets" class="${navClass('assets')} mobile-nav-class">Đấu giá tài sản</a>
                        
                        <a href="#news" data-target="news" class="${navClass('news')} mobile-nav-class">Tin tức</a>
                        <a href="#notifications" data-target="notifications" class="${navClass('notifications')} mobile-nav-class">Kế hoạch</a>
                        <a href="#about" data-target="about" class="${navClass('about')} mobile-nav-class">Giới thiệu</a>
                    </div>
                </nav>
            </div>
        </header>
    `;
}

// Tái tạo Footer Component
function renderFooter() {
    return `
        <div class="bg-vpaDark text-white pt-16 pb-8 border-t-4 border-vpaRed">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
                    <div class="lg:col-span-7">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-600 rounded-lg flex items-center justify-center transform rotate-45">
                                <div class="w-7 h-7 bg-vpaDark transform -rotate-45" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
                            </div>
                            <h2 class="text-4xl font-bold text-vpaRed">VPA</h2>
                        </div>
                        <h3 class="text-xl font-bold mb-6">Công ty Đấu giá Hợp danh Việt Nam</h3>
                        <div class="space-y-4 text-sm text-gray-300">
                            <div class="flex items-start gap-3">
                                <div class="mt-1 w-8 h-8 rounded-full bg-vpaRed/20 flex items-center justify-center text-vpaGold flex-shrink-0"><i class="fas fa-map-marker-alt" style="font-size: 14px;"></i></div>
                                <div><span class="text-vpaGold font-bold block mb-1">Trụ sở chính:</span>NO2-T4.03, tầng 4 tòa nhà NO2 - TNL Plaza Goldseason, số 47 Nguyễn Tuân, phường Thanh Xuân Trung, quận Thanh Xuân, thành phố Hà Nội</div>
                            </div>
                            <div class="flex items-start gap-3"><div class="w-8 h-8 rounded-full bg-transparent flex-shrink-0"></div><div><span class="text-vpaGold font-bold block mb-1">Chi nhánh HCM:</span>Số 466 Hai Bà Trưng, phường Tân Định, Thành phố Hồ Chí Minh</div></div>
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-vpaRed/20 flex items-center justify-center text-vpaGold flex-shrink-0"><i class="fas fa-phone" style="font-size: 14px;"></i></div>
                                <div><span class="text-vpaGold font-bold">Hotline CSKH:</span> 1900.0555.15</div>
                            </div>
                            <div class="pl-11 text-gray-400">Các số gọi ra: 024.9995.5515, 024.9996.8888 hoặc các đầu số tên "DAU GIA VN".</div>
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-vpaRed/20 flex items-center justify-center text-vpaGold flex-shrink-0"><i class="fas fa-envelope" style="font-size: 14px;"></i></div>
                                <div><span class="text-vpaGold font-bold">Đấu giá biển số:</span> dgbs@vpa.com.vn</div>
                            </div>
                            <div class="pl-11"><span class="text-vpaGold font-bold">Đấu giá tài sản:</span> dgts@vpa.com.vn</div>
                            <div class="pl-11"><span class="text-vpaGold font-bold">Liên hệ hợp tác:</span> info@vpa.com.vn</div>
                        </div>
                        <div class="mt-8 text-sm text-gray-400">
                            <p>Đại diện: Bà Lâm Thị Mai Anh - Chức vụ: Giám Đốc</p>
                            <p>Giấy chứng nhận ĐKHĐ: 41/TP-ĐKHĐ do Sở Tư pháp Hà Nội cấp ngày 21/01/2019</p>
                        </div>
                    </div>
                    <div class="lg:col-span-5 flex flex-col items-start lg:items-end">
                        <h3 class="text-lg font-bold mb-4">Theo dõi chúng tôi trên</h3>
                        <div class="flex gap-4 mb-8">
                            <a href="#" class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition" aria-label="Facebook"><i class="fab fa-facebook-f" style="font-size: 24px;"></i></a>
                            <a href="#" class="btn-zalo text-white p-2 rounded-lg hover:bg-blue-600 transition font-bold text-xs flex items-center justify-center w-10 h-10" aria-label="Zalo">Zalo</a>
                        </div>
                        <div class="mb-8 bg-white rounded p-1">
                            <div class="border border-red-500 flex items-center p-1 gap-2">
                                <div class="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">✓</div>
                                <div class="text-red-600 font-bold leading-tight text-xs uppercase">Đã đăng ký<br/>Bộ Công Thương</div>
                            </div>
                        </div>
                        <div class="text-left w-full lg:text-right">
                            <h3 class="text-lg font-bold mb-4">Chính sách</h3>
                            <ul class="space-y-2 text-sm text-gray-300">
                                <li><a href="#" class="hover:text-white">• Chính sách bảo vệ dữ liệu cá nhân</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>Trang thông tin điện tử đấu giá trực tuyến vpa.com.vn đã được Sở Tư pháp thành phố Hà Nội phê duyệt đủ điều kiện thực hiện hình thức đấu giá trực tuyến theo Quyết định số 226/QĐ-STP ngày 16/3/2023</p>
                    <p class="mt-2 md:mt-0">Bản quyền thuộc về VPA@2023</p>
                </div>
            </div>
        </div>
    `;
}

// Tái tạo Floating Actions Component
function renderFloatingActions() {
    return `
        <div class="fixed right-4 bottom-24 md:bottom-1/2 md:translate-y-1/2 flex flex-col gap-3 z-50">
            <a href="#" class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" aria-label="Facebook">
                <i class="fab fa-facebook-f" style="font-size: 24px;"></i>
            </a>
            <a href="#" class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform font-bold text-[10px]" aria-label="Zalo">
                Zalo
            </a>
            <a href="tel:1900055515" class="w-12 h-12 bg-[#00cca3] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse" aria-label="Gọi điện thoại hotline">
                <i class="fas fa-phone" style="font-size: 24px;"></i>
            </a>
        </div>
    `;
}

// Tái tạo News Row Component
function renderNewsRow(item, isNewsTab) {
    const categoryDisplay = isNewsTab && item.category ? `[${item.category}]` : '';
    const sourceText = isNewsTab ? item.source : "Thông báo";

    return `
        <a role="button" href='#' class="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-red-200 pb-4 pt-4 group cursor-pointer hover:bg-red-50/50 transition-colors">
            <div class="flex items-start gap-3 w-full md:w-3/4">
                <i class="fas fa-chevron-right fa-2x text-vpaRed mt-1 flex-shrink-0" style="font-size: 14px;"></i>
                <h3 class="text-gray-800 font-medium text-base group-hover:text-vpaRed transition-colors">
                    <span class="text-gray-500 font-normal text-sm mr-1">${categoryDisplay}</span>
                    ${item.title}
                </h3>
            </div>
            <div class="flex items-center gap-4 mt-2 md:mt-0 md:w-1/4 md:justify-end">
                ${item.source ? `
                    <span class="text-vpaRed border border-vpaRed bg-red-50 px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">
                        ${sourceText}
                    </span>
                ` : ''}
                <span class="text-gray-500 text-xs italic whitespace-nowrap">
                    (Ngày đăng bài: ${item.date})
                </span>
            </div>
        </a>
    `;
}

// Tái tạo News Section Component
function renderNewsSection(newsData, notifData) {
    const totalPages = activeTab === 'news' ? 60 : 30; 

    // Hàm render nội dung bên trong của section (sử dụng biến activeTab toàn cục)
    function renderNewsSectionInner() {
        const currentData = activeTab === 'news' ? newsData : notifData;
        const titleText = activeTab === 'news' ? "Tin tức" : "Thông báo";
        
        const getTabClass = (tabName) =>
            `px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 ${
                activeTab === tabName 
                    ? 'bg-vpaRed text-white border-vpaRed' 
                    : 'text-gray-500 hover:text-vpaRed bg-white border-gray-200 hover:border-vpaRed'
            }`;

        const listHtml = currentData.map(item => renderNewsRow(item, activeTab === 'news')).join('');
        
        const paginationHtml = `
            <div class="flex justify-center items-center mt-8 gap-1.5">
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors">&lt;</button>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-vpaRed text-white font-bold text-sm shadow-sm">1</button>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-600 font-medium text-sm transition-colors">2</button>
                <span class="w-8 h-8 flex items-center justify-center text-gray-400 pb-2">...</span>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-600 font-medium text-sm transition-colors">${totalPages}</button>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors">&gt;</button>
            </div>
        `;
        
        return `
            <div class="container mx-auto px-4">
                <div role="tablist" class="flex gap-1 mb-6 border-b border-gray-200">
                    <button id="tab-news" role="tab" aria-selected="${activeTab === 'news'}" aria-controls="news-panel" class="${getTabClass('news')}">Tin tức</button>
                    <button id="tab-notif" role="tab" aria-selected="${activeTab === 'notif'}" aria-controls="notif-panel" class="${getTabClass('notif')}">Thông báo</button>
                </div>
                
                <div class="w-full flex items-center">
                    <div class="inline-block px-6 py-3 font-bold text-lg text-white rounded-t-lg shadow-sm border-r-4 border-white ${activeTab === 'news' ? 'bg-vpaRed' : 'bg-red-800'}">
                        ${titleText}
                    </div>
                    <div class="flex-grow border-b border-red-700 h-1"></div>
                </div>

                <div role="tabpanel" id="${activePage === 'news' ? 'news-panel' : 'notif-panel'}" class="space-y-0 pb-4">
                    ${listHtml}
                </div>
                
                ${paginationHtml}
            </div>
        `;
    }

    return `<div class="py-16 bg-white" id="news-section-container">${renderNewsSectionInner()}</div>`;
}

// Tái tạo AboutIntro Component
function renderAboutIntro() {
    return `
        <div class="py-12 md:py-16">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-8 text-center">
                Lời giới thiệu
            </h1>
            
            <div class="max-w-4xl mx-auto text-center space-y-6 text-lg text-gray-700 leading-relaxed px-4">
                <p>
                    Công ty Đấu giá hợp danh VPA xin gửi lời chào trân trọng nhất đến quý khách hàng.
                </p>
                <p>
                    Công ty Đấu giá hợp danh Việt Nam (Vietnam Partnerships Auction) - là một Tổ chức hoạt động chuyên nghiệp trong lĩnh vực dịch vụ tư vấn, tổ chức đấu giá tài sản, quyền tài sản, vật tư, thiết bị, hàng hóa và các dịch vụ khác liên quan đến đấu giá tài sản. Công ty Đấu giá hợp danh Việt Nam được nhiều Cơ quan, Tập đoàn, doanh nghiệp, đơn vị, tổ chức tin cậy, ký hợp đồng bán đấu giá tài sản, trong đó nhiều hợp đồng với tài sản có giá trị lớn, có tính chất phức tạp. Chúng tôi luôn nỗ lực không ngừng nghỉ, với mục tiêu luôn là tổ chức đấu giá tài sản thuộc hàng đầu tại Việt Nam. "Chuyên nghiệp, tin cậy, đặt quyền lợi của khách hàng lên trên quyền lợi của Công ty" là phương châm hoạt động của chúng tôi khi hợp tác cùng Quý khách hàng. Chúng tôi cam kết mang đến cho Quý khách hàng dịch vụ chuyên nghiệp, chất lượng và hiệu quả tối ưu trong lĩnh vực đấu giá tài sản.
                </p>
            </div>
        </div>
    `;
}

// Tái tạo VpaStats Component
function renderVpaStats() {
    const statsData = [
        { value: "1.000 tỷ+", label: "Giá trị tài sản đã đấu giá", iconClass: "fas fa-money-bill-wave" },
        { value: "500.000+", label: "Biển số công bố đấu giá", iconClass: "fas fa-car" },
        { value: "17.000+", label: "Cuộc đấu giá đã diễn ra", iconClass: "fas fa-gavel" }
    ];

    const statItemsHtml = statsData.map(stat => `
        <div class="text-center p-6 border border-gray-100 rounded-lg bg-white shadow-sm hover:shadow-md transition">
            <div class="w-12 h-12 mx-auto mb-4 text-vpaRed flex items-center justify-center">
                <i class="${stat.iconClass}" style="font-size: 32px;"></i>
            </div>
            <div class="text-3xl font-black text-vpaRed">${stat.value}</div>
            <p class="text-gray-600 font-medium">${stat.label}</p>
        </div>
    `).join('');

    return `
        <div class="bg-gray-50 py-12">
            <div class="container mx-auto px-4">
                <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Những con số nổi bật</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    ${statItemsHtml}
                </div>
            </div>
        </div>
    `;
}

// Tái tạo PolicySections Component
function renderPolicySections() {
    const policyCards = [
        { title: "Chính sách bảo mật", linkText: "Chính sách bảo mật", target: "policy-privacy" },
        { title: "Điều khoản sử dụng", linkText: "Điều khoản sử dụng", target: "policy-terms" },
        { title: "Quy chế hoạt động", linkText: "Quy chế hoạt động", target: "policy-rules" }
    ];

    const policyHtml = policyCards.map(policy => `
        <div class="p-4 md:p-6 border-b border-gray-300 md:border-r md:border-b-0 last:border-r-0">
            <h3 class="text-xl font-bold text-gray-900 mb-2">${policy.title}</h3>
            <a href="#${policy.target}" data-target="${policy.target}" aria-label="Xem ${policy.title}" class="nav-link text-vpaRed hover:underline transition-colors">
                ${policy.linkText}
            </a>
        </div>
    `).join('');

    return `
        <div class="py-12 border-t border-gray-200">
            <div class="max-w-5xl mx-auto">
                <nav class="grid grid-cols-1 md:grid-cols-3 text-center mb-10" aria-label="Chính sách và Điều khoản">
                    ${policyHtml}
                </nav>

                <div class="border-t border-gray-300 pt-6 mt-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">Hướng dẫn đấu giá</h2>
                    <a href="#guide" data-target="guide" aria-label="Xem hướng dẫn chi tiết về đấu giá" class="nav-link text-center text-vpaRed hover:underline cursor-pointer block">Hướng dẫn đấu giá</a>
                </div>
            </div>
        </div>
    `;
}

// Tái tạo Home Content
function renderHomeContent() {
    const heroHtml = `
        <div class="relative w-full h-[500px] md:h-[600px] bg-gradient-to-r from-orange-500 via-red-500 to-red-700 overflow-hidden">
            <div class="absolute inset-0 bg-[url('https://picsum.photos/seed/bgpattern/1920/1080')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
            
            <div class="container mx-auto px-4 h-full flex flex-col md:flex-row items-center relative z-10">
                <div class="w-full md:w-1/2 text-white pt-10 md:pt-0">
                    <div class="inline-block bg-white text-vpaRed px-4 py-1 rounded-full text-sm font-semibold mb-6 shadow-md border border-red-200">
                        Công ty Đấu giá Hợp danh Việt Nam
                    </div>
                    <h1 class="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-wide">
                        Đấu giá trực tuyến
                    </h1>
                    <button class="bg-[#a91823] hover:bg-[#8b121b] text-white px-8 py-3 rounded-md font-bold text-lg flex items-center gap-2 shadow-lg transform transition hover:scale-105">
                        Đăng ký <i class="fas fa-arrow-up-right-from-square" style="font-size: 16px;"></i>
                    </button>
                </div>

                <div class="w-full md:w-1/2 flex justify-center items-end h-full pb-10">
                    <div class="relative w-full max-w-lg">
                        <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 transform rotate-1 hover:rotate-0 transition duration-500">
                            <div class="flex flex-col items-center">
                                <span class="text-yellow-300 font-bold text-2xl md:text-3xl drop-shadow-md mb-2 uppercase text-center">Đấu giá liên tay</span>
                                <span class="text-white font-black text-3xl md:text-4xl drop-shadow-md uppercase text-center mb-4">Rinh ngay biển đẹp</span>
                                <img src="https://picsum.photos/seed/car_auction/600/300" alt="Banner đấu giá biển số xe" class="rounded-lg shadow-2xl w-full object-cover h-48 md:h-64" loading="lazy" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-vpaServiceBg to-transparent"></div>
        </div>
    `;

    // Tái tạo Services Component
    const servicesHtml = `
        <div class="bg-vpaServiceBg py-16">
            <div class="container mx-auto px-4 flex flex-col lg:flex-row items-center">
                <div class="lg:w-1/3 mb-10 lg:mb-0 pr-0 lg:pr-10">
                    <h2 class="text-4xl font-bold text-gray-900 mb-6">Dịch vụ của chúng tôi</h2>
                    <p class="text-gray-700 text-lg leading-relaxed">
                        Công ty Đấu giá hợp danh Việt Nam (Vietnam Partnerships Auction) là tổ chức hoạt động chuyên nghiệp trong lĩnh vực đấu giá tài sản.
                    </p>
                </div>

                <div class="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div data-target="cars" class="service-card bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div class="w-14 h-14 bg-vpaRed rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <i class="fas fa-car" style="font-size: 28px;"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-vpaRed transition-colors">Đấu giá biển số xe</h3>
                        <p class="text-gray-600 text-sm">Cơ hội sở hữu biển số xe đẹp, hợp phong thủy. Quy trình đấu giá công khai, tuân thủ quy định pháp luật.</p>
                    </div>

                    <div data-target="assets" class="service-card bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div class="w-14 h-14 bg-[#00cca3] rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <i class="fas fa-home" style="font-size: 28px;"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00cca3] transition-colors">Đấu giá tài sản</h3>
                        <p class="text-gray-600 text-sm">Đấu giá đa dạng các loại tài sản khác như: tang vật, phương tiện vi phạm hành chính, tài sản thi hành án...</p>
                    </div>

                    <div class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-vpaRed cursor-pointer group">
                        <div class="w-14 h-14 bg-[#ffc107] rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <i class="fas fa-gavel" style="font-size: 28px;"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#ffc107] transition-colors">Dành cho các tổ chức</h3>
                        <p class="text-gray-600 text-sm">Đăng ký sử dụng dịch vụ tổ chức đấu giá tài sản trực tuyến trên nền tảng của VPA.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Tái tạo Asset List Component
    const assetCardsHtml = MOCK_ASSETS.map(asset => `
        <article key="${asset.id}" class="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
            <div class="relative h-48 overflow-hidden">
                <img src="${asset.image}" alt="${asset.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div class="absolute top-2 left-2 bg-yellow-400 text-red-700 p-1 rounded-full shadow-md">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of-Vietnam.svg.png" class="w-6 h-6 rounded-full object-cover border border-white" alt="Cờ Việt Nam"/>
                </div>
            </div>
            <div class="p-5">
                <h3 class="font-bold text-gray-800 text-sm mb-4 line-clamp-2 h-10">${asset.title}</h3>
                
                <div class="flex items-center gap-2 mb-3">
                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <i class="fas fa-dollar-sign" style="font-size: 14px;"></i>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">Giá khởi điểm</p>
                        <p class="text-vpaRed font-bold text-base">${asset.startPrice}</p>
                    </div>
                </div>

                <div class="space-y-3">
                    <div class="flex items-start gap-2">
                        <i class="fas fa-clock text-gray-400 mt-0.5" style="font-size: 14px;"></i>
                        <div>
                            <p class="text-xs text-gray-500">Thời gian đấu giá</p>
                            <p class="text-gray-800 font-medium text-sm">${asset.auctionTime}</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-2">
                        <i class="fas fa-clock text-gray-400 mt-0.5" style="font-size: 14px;"></i>
                        <div>
                            <p class="text-xs text-gray-500">Thời gian đăng ký</p>
                            <p class="text-gray-800 font-medium text-sm">${asset.registerTime}</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `).join('');

    const assetListHtml = `
        <div id="assets" class="py-16 bg-[#f8f9fa]">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-bold text-gray-900 mb-8">Danh sách tài sản đấu giá</h2>

                <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <form class="relative w-full md:w-1/2" role="search">
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-vpaRed" style="font-size: 14px;"></i>
                        <input type="search" name="search_query" placeholder="Tìm kiếm tài sản" class="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-vpaRed text-sm bg-white shadow-sm" aria-label="Tìm kiếm tài sản đấu giá"/>
                    </form>
                    <button class="bg-vpaRed text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-[#a01825]">Xem thêm</button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${assetCardsHtml}
                </div>
                
                <div class="flex justify-end mt-6">
                    <div class="flex gap-1">
                        <button class="w-8 h-8 flex items-center justify-center rounded bg-vpaRed text-white font-bold text-sm">1</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Tái tạo Banner Strip (Sau Asset List)
    const bannerStripHtml = `
        <section class="relative bg-gradient-to-r from-red-800 to-red-600 py-16 text-white text-center overflow-hidden">
            <div class="absolute inset-0 bg-[url('https://picsum.photos/seed/bg3/1920/400')] opacity-20 bg-cover mix-blend-overlay"></div>
            <div class="container mx-auto relative z-10 px-4">
                <span class="block text-sm font-medium mb-2 opacity-90">Công ty Đấu giá Hợp danh Việt Nam</span>
                <h2 class="text-4xl md:text-5xl font-black mb-6">Nâng tầm giá trị tài sản</h2>
                <button data-target="assets" class="navigate-btn bg-vpaGold text-[#8b0000] px-6 py-3 rounded-md font-bold hover:bg-yellow-400 transition shadow-lg">
                    Liên hệ đấu giá tài sản
                </button>
            </div>
        </section>
    `;

    // Tái tạo Partners Component
    const partnersHtml = `
        <div class="py-12 bg-pink-50">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold text-gray-900 mb-10">Đối tác</h2>
                <div class="flex items-center justify-center gap-4 md:gap-12 flex-wrap relative">
                    <button class="absolute left-0 md:left-4 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-md hidden md:flex" aria-label="Đối tác trước">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="flex items-center gap-8 md:gap-16 overflow-x-auto no-scrollbar py-4 px-4 w-full justify-center">
                        <div class="h-12 flex items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100"><span class="text-2xl font-black text-green-600 tracking-tighter">BIDV</span><span class="text-yellow-500 ml-1">✦</span></div>
                        <div class="h-16 w-16 bg-vpaRed rounded flex items-center justify-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100 text-white font-bold">AGRIBANK</div>
                        <div class="h-12 flex items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100"><span class="text-2xl font-black text-blue-600">VietinBank</span></div>
                        <div class="h-12 flex items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100"><span class="text-2xl font-bold text-green-700">Vietcombank</span></div>
                        <div class="h-12 flex items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100"><span class="text-xl font-bold text-orange-500 flex items-center">▶ FPT Play</span></div>
                    </div>
                    <button class="absolute right-0 md:right-4 w-10 h-10 rounded-full bg-vpaRed flex items-center justify-center text-white hover:bg-red-700 shadow-md hidden md:flex" aria-label="Đối tác tiếp theo">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Tái tạo About Section (Bao gồm Intro, Stats, Policies)
    const aboutSectionHtml = `
        <section id="home-about" class="bg-white border-t border-gray-100">
            ${renderAboutIntro()}
            ${renderVpaStats()}
            ${renderPolicySections()}
        </section>
    `;

    // Kết hợp tất cả các section
    return heroHtml + servicesHtml + assetListHtml + bannerStripHtml + renderNewsSection(MOCK_NEWS_DATA, MOCK_NOTIF_DATA) + aboutSectionHtml + partnersHtml;
}


// Hàm render nội dung tĩnh (Giới thiệu, Tin tức, Kế hoạch, Điều khoản)
function renderStaticContent(pageTitle) {
    let contentHtml = '';
    if (pageTitle === 'about') {
         contentHtml = renderAboutIntro() + renderVpaStats();
    } else if (pageTitle === 'news' || pageTitle === 'notifications') {
        contentHtml = renderNewsSection(MOCK_NEWS_DATA, MOCK_NOTIF_DATA);
    } else {
        // Áp dụng cho policy-privacy, policy-terms, policy-rules, guide
        const displayTitle = pageTitle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        
        contentHtml = `
             <div class="max-w-4xl mx-auto py-16 px-4">
                <h2 class="text-4xl font-bold text-vpaRed mb-6">${displayTitle}</h2>
                <p class="text-gray-700">Đây là nội dung chi tiết cho trang ${displayTitle}.</p>
                <ul class="list-disc list-inside mt-4 text-gray-600 space-y-2">
                    <li>Mục đích và phạm vi áp dụng.</li>
                    <li>Điều khoản về quyền và trách nhiệm của người dùng.</li>
                    <li>Các quy định pháp lý liên quan.</li>
                </ul>
            </div>
        `;
    }

    return `<div class="bg-white min-h-[60vh]">${contentHtml}</div>`;
}


function renderMainContent() {
    const mainEl = document.getElementById('main-content');
    if (!mainEl) return;

    // Loại bỏ script ngoài nếu có (Đã được xử lý trong onNavigate, nhưng vẫn cần thiết khi chuyển từ news/notif sang home)
    if (loadedScriptElement) {
        loadedScriptElement.remove();
        loadedScriptElement = null;
    }
    
    let contentHTML;
    
    switch (activePage) {
        case 'home':
            contentHTML = renderHomeContent();
            break;
        case 'about':
        case 'news':
        case 'notifications':
        case 'policy-privacy':
        case 'policy-terms':
        case 'policy-rules':
        case 'guide':
            contentHTML = renderStaticContent(activePage);
            break;
        default:
            contentHTML = renderHomeContent(); 
            break;
    }
    
    mainEl.innerHTML = contentHTML;
    
    // Gắn lại listeners cho các tab (nếu có)
    if (activePage === 'news' || activePage === 'notifications') {
         attachNewsTabListeners();
    }
}


// --- LOGIC ĐIỀU HƯỚNG CHÍNH ---

function onNavigate(targetPage) {
    // 1. Nếu là trang ngoài, gọi hàm tải trang ngoài
    if (externalPages[targetPage]) {
        activePage = targetPage;
        window.location.hash = targetPage;
        loadExternalPage(targetPage);
        return;
    }
    
    // 2. Logic cho các trang nội bộ (home, about, policies)
    
    // Loại bỏ script ngoài nếu có
    if (loadedScriptElement) {
        loadedScriptElement.remove();
        loadedScriptElement = null;
    }

    activePage = targetPage;
    window.location.hash = targetPage;
    renderMainContent(); 
    
    // Đóng mobile menu
    const mobileMenu = document.getElementById('mobile-menu-dropdown');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu-dropdown');
    const menuIcon = document.getElementById('menu-icon');
    
    const isExpanded = mobileMenu.classList.toggle('active');

    if (isExpanded) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        mobileMenu.setAttribute('aria-expanded', 'true');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        mobileMenu.setAttribute('aria-expanded', 'false');
    }
}


// --- GẮN SỰ KIỆN & KHỞI TẠO ---

function attachEventListeners() {
    // 1. Navigation Handlers (Cho cả desktop và mobile menu)
    document.querySelectorAll('.nav-link[data-target]').forEach(el => {
        el.onclick = (e) => {
            e.preventDefault(); 
            const targetPage = el.getAttribute('data-target');
            onNavigate(targetPage);

            // Cập nhật class active cho navbar
            document.querySelectorAll('.nav-link[data-target]').forEach(nav => {
                nav.classList.remove('active', 'text-vpaRed', 'font-bold');
                nav.classList.add('text-gray-700');
            });
            el.classList.add('active', 'text-vpaRed', 'font-bold');
            el.classList.remove('text-gray-700');
        };
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // 3. Home Page Listeners (cho các service card)
    attachHomeListeners(); 

    // 4. News Tab Listeners (chỉ gán một lần)
    attachNewsTabListeners(); 
}

function attachNewsTabListeners() {
    const newsSectionContainer = document.getElementById('news-section-container');
    if (!newsSectionContainer) return;
    
    const tabNews = newsSectionContainer.querySelector('#tab-news');
    const tabNotif = newsSectionContainer.querySelector('#tab-notif');

    if (tabNews) {
        tabNews.onclick = () => {
            if (activeTab !== 'news') {
                activeTab = 'news';
                renderMainContent(); 
            }
        };
    }

    if (tabNotif) {
        tabNotif.onclick = () => {
            if (activeTab !== 'notif') {
                activeTab = 'notif';
                renderMainContent(); 
            }
        };
    }
}

function attachHomeListeners() {
    // Gắn sự kiện cho các service card trên trang chủ
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const targetPage = e.currentTarget.getAttribute('data-target');
            if (externalPages[targetPage]) {
                onNavigate(targetPage);
            }
        });
    });
}

function renderApp() {
    const headerEl = document.getElementById('main-header');
    const footerEl = document.getElementById('main-footer');
    const floatingEl = document.getElementById('floating-actions');
    
    // Render các phần chung
    headerEl.innerHTML = renderHeader().replace(/<header.*?>|<\/header>/g, '');
    footerEl.innerHTML = renderFooter();
    floatingEl.innerHTML = renderFloatingActions();

    // Xác định trang ban đầu
    const initialPage = window.location.hash.substring(1) || 'home';
    
    // Render nội dung chính và gắn sự kiện
    onNavigate(initialPage);
    
    attachEventListeners();
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderApp();

    // Setup hash change listener for routing
    window.addEventListener('hashchange', () => {
        const newPage = window.location.hash.substring(1) || 'home';
        if (activePage !== newPage) {
            onNavigate(newPage);
        }
    });
});