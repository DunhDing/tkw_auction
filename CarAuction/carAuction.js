// --- TYPE DEFINITIONS (Comments only in JS) ---
/*
interface NewsItem {
    id: string | number;
    title: string;
    category?: string;
    source?: string;
    date?: string;
}

interface LicensePlate {
    id: number;
    plateNumber: string;
    startPrice: string;
    province: string;
    type: string; // Ngũ quý, Sảnh tiến, etc.
    auctionTime?: string; // Ngày đấu giá (HH:MM - DD/MM/YYYY)
}
*/

// --- CONSTANTS & MOCK DATA ---
const MOCK_NEWS_DATA = [
    { id: 1, title: 'Thông tin về phiên đấu giá biển số xe lần thứ N năm 2025.', source: 'VPA News', date: '20/11/2025', category: 'Tin tức' },
];

const MOCK_NOTIF_DATA = [
    { id: 101, title: 'THÔNG BÁO: Lịch đấu giá tài sản ngày 01/12/2025', date: '25/11/2025' },
];

const MOCK_ASSETS = [
    { id: 201, title: 'Lô đất thổ cư tại khu vực Thanh Xuân, Hà Nội, diện tích 150m2.', image: 'https://picsum.photos/seed/asset1/400/300', startPrice: '500.000.000 đ', auctionTime: '10:00 - 10/12/2025', registerTime: 'Đến 17:00 - 08/12/2025' },
];

const vietnameseProvinces = [
    "Thành phố Hà Nội", "Thành phố Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "An Giang", 
    "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", 
    "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", 
    "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", 
    "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", 
    "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", 
    "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", 
    "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", 
    "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

// Mock data for announced tab
const MOCK_LICENSE_PLATES = [
    { id: 1, plateNumber: '30K-999.99', startPrice: '1.200.000.000 đ', province: 'Thành phố Hà Nội', type: 'Ngũ quý', auctionTime: '10:00 - 05/12/2025' },
    { id: 2, plateNumber: '51L-888.88', startPrice: '1.500.000.000 đ', province: 'Thành phố Hồ Chí Minh', type: 'Tứ quý', auctionTime: '11:00 - 05/12/2025' },
    { id: 3, plateNumber: '43A-678.90', startPrice: '40.000.000 đ', province: 'Đà Nẵng', type: 'Sảnh tiến', auctionTime: '14:00 - 15/12/2025' },
    { id: 4, plateNumber: '15C-456.68', startPrice: '40.000.000 đ', province: 'Hải Phòng', type: 'Lộc phát', auctionTime: '15:00 - 16/12/2025' },
    { id: 5, plateNumber: '37C-000.03', startPrice: '550.000.000 đ', province: 'Nghệ An', type: 'Tam hoa', auctionTime: '09:00 - 01/12/2025' },
    { id: 6, plateNumber: '29A-123.45', startPrice: '40.000.000 đ', province: 'Thành phố Hà Nội', type: 'Bình thường', auctionTime: '10:00 - 20/12/2025' },
    { id: 7, plateNumber: '50K-111.11', startPrice: '900.000.000 đ', province: 'Thành phố Hồ Chí Minh', type: 'Ngũ quý', auctionTime: '11:00 - 20/12/2025' },
];

// Mock data for officialCarPlates tab
const MOCK_OFFICIAL_PLATES = [
    { id: 10, plateNumber: '30K-123.45', startPrice: '40.000.000 đ', province: 'Thành phố Hà Nội', type: 'Bình thường', auctionTime: '10:30 - 08/12/2025' },
    { id: 11, plateNumber: '51M-543.21', startPrice: '40.000.000 đ', province: 'Thành phố Hồ Chí Minh', type: 'Bình thường', auctionTime: '11:00 - 09/12/2025' },
];

// Mock data for auctionResultsData tab
const MOCK_RESULTS_PLATES = [
    { id: 20, plateNumber: '30K-888.88', startPrice: '5.500.000.000 đ', province: 'Thành phố Hà Nội', type: 'Tứ quý', auctionTime: '10:00 - 01/10/2025' },
    { id: 21, plateNumber: '51K-777.77', startPrice: '3.200.000.000 đ', province: 'Thành phố Hồ Chí Minh', type: 'Tứ quý', auctionTime: '14:00 - 25/11/2025' },
];


const availableTypes = ["Ngũ quý", "Sảnh tiến", "Tứ quý", "Tam hoa", "Thần tài", "Lộc phát", "Ông địa", "Số gánh", "Lặp đôi"];
const availableYears = ["196x", "197x", "198x", "199x", "200x"];
const availableAvoids = ["Tránh 4", "Tránh 7", "Tránh 49", "Tránh 53", "Tránh 13"];

// --- APPLICATION STATE ---
const state = {
    activePage: 'cars',
    activeTab: 'announced',
    searchTerm: '',
    selectedProvince: '',
    selectedTypes: [],
    selectedYears: [],
    selectedAvoids: [],
    startDate: '',
    endDate: '',
    openSections: {
        type: true,
        year: true,
        avoid: true,
    }
};

// --- HELPER FUNCTIONS ---

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

/**
 * Cập nhật trạng thái và re-render ứng dụng.
 * @param {object} newState - Object chứa các thuộc tính state cần cập nhật.
 */
const updateState = (newState) => {
    Object.assign(state, newState);
    renderApp();
};

/**
 * Lấy danh sách tỉnh/thành phố duy nhất, đã sắp xếp.
 */
const getAllProvinces = () => {
    const provinceSet = new Set([
        ...vietnameseProvinces,
        ...MOCK_LICENSE_PLATES.map(p => p.province),
        ...MOCK_OFFICIAL_PLATES.map(p => p.province),
        ...MOCK_RESULTS_PLATES.map(p => p.province)
    ]);
    return Array.from(provinceSet).filter(Boolean).sort();
};

// --- CORE LOGIC: FILTERING ---

const getFilteredData = () => {
    let sourceData = [];
    if (state.activeTab === 'announced') {
        sourceData = MOCK_LICENSE_PLATES;
    } else if (state.activeTab === 'official') {
        sourceData = MOCK_OFFICIAL_PLATES;
    } else if (state.activeTab === 'results') {
        sourceData = MOCK_RESULTS_PLATES;
    }

    return sourceData.filter(item => {
        const plateNumber = item.plateNumber.toLowerCase();
        
        // 1. Lọc theo tìm kiếm (biển số)
        if (state.searchTerm) {
            if (!plateNumber.includes(state.searchTerm.toLowerCase())) {
                return false;
            }
        }

        // 2. Lọc theo tỉnh/thành phố
        if (state.selectedProvince && item.province !== state.selectedProvince) {
            return false;
        }
        
        // 3. Lọc theo Loại biển (checkboxes)
        if (state.selectedTypes.length > 0 && item.type && !state.selectedTypes.includes(item.type)) {
            return false;
        }

        // 4. Lọc theo Tránh số
        if (state.selectedAvoids.length > 0) {
            // Lấy ra chuỗi số từ biển số (bỏ dấu chấm, dấu gạch)
            const plateDigits = plateNumber.replace(/[^0-9]/g, '');
            const avoids = state.selectedAvoids.map(a => a.split(' ')[1]);
            
            const includesAvoid = avoids.some(avoid => plateDigits.includes(avoid));
            if (includesAvoid) return false;
        }

        // 5. Lọc theo Khoảng ngày (chỉ áp dụng cho tab 'official' và 'results')
        if ((state.activeTab === 'official' || state.activeTab === 'results') && (state.startDate || state.endDate)) {
            // Lấy phần ngày (DD/MM/YYYY)
            const auctionTimeString = item.auctionTime?.split(' - ')[1]; 
            
            if (auctionTimeString) {
                const [day, month, year] = auctionTimeString.split('/').map(Number);
                // Dùng Date.UTC để tránh lỗi múi giờ
                const itemTime = new Date(Date.UTC(year, month - 1, day)).getTime();

                if (state.startDate) {
                    const [sYear, sMonth, sDay] = state.startDate.split('-').map(Number);
                    const startTime = new Date(Date.UTC(sYear, sMonth - 1, sDay)).getTime();
                    if (itemTime < startTime) return false;
                }
                
                if (state.endDate) {
                    const [eYear, eMonth, eDay] = state.endDate.split('-').map(Number);
                    const endTime = new Date(Date.UTC(eYear, eMonth - 1, eDay)).getTime();
                    if (itemTime > endTime) return false;
                }
            } else if (state.startDate || state.endDate) {
                // Nếu có bộ lọc ngày nhưng biển số không có thời gian đấu giá (chưa xác định), bỏ qua
                return false;
            }
        }
        
        return true;
    });
};

// --- RENDER FUNCTIONS (Templates) ---

/**
 * Renders the Page Banner.
 */
const renderPageBanner = (title, backgroundImage) => `
    <div 
        class="relative h-40 md:h-56 bg-cover bg-center flex items-center" 
        style="background-image: url(${backgroundImage})"
    >
        <div class="absolute inset-0 bg-[#be1e2d] opacity-80"></div>
        <div class="container mx-auto px-4 relative z-10 text-white">
            <h1 class="text-3xl md:text-4xl font-bold">${title}</h1>
            <p class="mt-1 text-sm opacity-80">Cơ hội sở hữu tài sản giá trị.</p>
        </div>
    </div>
`;


/**
 * Renders the Header component.
 */
const renderHeader = () => {
    const navClass = (page) =>
        `cursor-pointer transition-colors text-gray-700 ${state.activePage === page ? 'text-[#be1e2d] font-bold' : 'hover:text-[#be1e2d]'}`;

    return `
        <header class="w-full">
            <div class="bg-white shadow-md sticky top-0 z-50">
                <div class="container mx-auto px-4 py-3 flex items-center justify-between">
                    
                    <a id="nav-home-logo" role="button" class="flex items-center gap-2 cursor-pointer">
                        <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-red-600 rounded-lg flex items-center justify-center transform rotate-45 shadow-lg">
                            <div class="w-6 h-6 bg-white transform -rotate-45" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%)"></div>
                        </div>
                        <span class="text-3xl font-extrabold text-[#be1e2d] tracking-tight">VPA</span>
                    </a>

                    <div class="hidden lg:flex items-center gap-8 font-medium text-sm xl:text-base">
                        <nav class="flex items-center gap-6" aria-label="Điều hướng chính">
                            <a id="nav-home" role="button" class="${navClass('home')}">Trang chủ</a>
                            <a id="nav-cars" role="button" class="${navClass('cars')}">Đấu giá biển số xe ô tô</a>
                            <a id="nav-motorbikes" role="button" class="${navClass('motorbikes')}">Đấu giá biển số xe máy</a>
                            <a id="nav-assets" role="button" class="${navClass('assets')}">Đấu giá tài sản</a>
                            <a id="nav-news" role="button" class="${navClass('news')}">Tin tức</a>
                            <a id="nav-notifications" role="button" class="${navClass('notifications')}">Kế hoạch</a>
                            <a id="nav-about" role="button" class="${navClass('about')}">Giới thiệu</a>
                        </nav>

                        <div class="flex items-center gap-4 pl-8 border-l border-gray-200">
                            <button id="nav-login" class="flex items-center justify-center gap-1 text-white bg-[#be1e2d] px-4 py-2 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-md shadow-red-300/50 transform hover:scale-[1.02] active:scale-100 whitespace-nowrap">
                                ${renderLucideIcon('User', 'text-white', 18)} Đăng nhập
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 lg:hidden">
                        <button id="mobile-menu-toggle" class="text-gray-700 p-1 focus:outline-none" aria-expanded="false" aria-controls="mobile-menu-dropdown" aria-label="Mở menu">
                            ${renderLucideIcon('Menu', 'text-gray-700', 26)}
                        </button>
                    </div>
                </div>

                <!-- Mobile Menu (Hidden by default, shown via class in JS) -->
                <nav id="mobile-menu-dropdown" class="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 z-40 shadow-xl rounded-b-lg hidden">
                    <div class="flex flex-col p-4 space-y-2 font-medium">
                        <div class="flex items-center justify-center py-2 border-b border-gray-100 mb-2">
                            <button id="mobile-nav-login" class="flex items-center justify-center gap-1 text-white bg-[#be1e2d] px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-md">
                                ${renderLucideIcon('User', 'text-white', 18)} Đăng nhập
                            </button>
                        </div>

                        <a id="mobile-nav-home" role="button" class="${navClass('home')}">Trang chủ</a>
                        <a id="mobile-nav-cars" role="button" class="${navClass('cars')}">Đấu giá biển số xe ô tô</a>
                        <a id="mobile-nav-motorbikes" role="button" class="${navClass('motorbikes')}">Đấu giá biển số xe máy</a>
                        <a id="mobile-nav-assets" role="button" class="${navClass('assets')}">Đấu giá tài sản</a>
                        <a id="mobile-nav-news" role="button" class="${navClass('news')}">Tin tức</a>
                        <a id="mobile-nav-notifications" role="button" class="${navClass('notifications')}">Kế hoạch</a>
                        <a id="mobile-nav-about" role="button" class="${navClass('about')}">Giới thiệu</a>
                    </div>
                </nav>
            </div>
        </header>
    `;
};

/**
 * Renders the Car Auction Section (Main Content).
 */
const renderCarAuctionSection = (filteredData) => {
    
    const getTabClass = (tabName) => {
        const baseClass = "tab-btn px-6 py-3 font-bold text-sm rounded-t-lg transition-colors";
        return state.activeTab === tabName 
            ? `${baseClass} bg-[#be1e2d] text-white` 
            : `${baseClass} text-gray-500 hover:text-[#be1e2d] hover:bg-gray-50`;
    };

    let displayCount = "0";
    if (state.activeTab === 'announced') displayCount = "115.256";
    else if (state.activeTab === 'official') displayCount = "80.000";
    else if (state.activeTab === 'results') displayCount = "99.882"; 

    // --- Table Header ---
    let tableHeaderHTML = '';
    if (state.activeTab === 'results') {
        tableHeaderHTML = `
            <thead class="bg-[#e5e5e5] text-gray-900 font-bold">
                <tr>
                    <th scope="col" class="px-6 py-4 w-16 text-center">STT</th>
                    <th scope="col" class="px-6 py-4">Biển số</th>
                    <th scope="col" class="px-6 py-4">Giá trúng đấu giá</th> 
                    <th scope="col" class="px-6 py-4">Tỉnh, Thành phố</th>
                    <th scope="col" class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center gap-1">
                            Thời gian đấu giá
                            ${renderLucideIcon('ArrowUpDown', 'text-gray-500', 14)}
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-4">Chi tiết</th>
                </tr>
            </thead>
        `;
    } else {
        tableHeaderHTML = `
            <thead class="bg-[#e5e5e5] text-gray-900 font-bold">
                <tr>
                    <th scope="col" class="px-6 py-4 w-16 text-center">STT</th>
                    <th scope="col" class="px-6 py-4">Biển số</th>
                    <th scope="col" class="px-6 py-4">Giá khởi điểm</th>
                    <th scope="col" class="px-6 py-4">Tỉnh, Thành phố</th>
                    <th scope="col" class="px-6 py-4">Loại biển</th>
                    <th scope="col" class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center gap-1">
                            Thời gian đấu giá
                            ${renderLucideIcon('ArrowUpDown', 'text-gray-500', 14)}
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-4">Lựa chọn</th>
                </tr>
            </thead>
        `;
    }

    // --- Table Body ---
    let tableBodyHTML = '';
    const displayData = filteredData.slice(0, 50); // Giả lập phân trang

    if (displayData.length === 0) {
        tableBodyHTML = `
            <tbody>
                <tr>
                    <td colSpan="7" class="text-center py-8 text-gray-500">
                        Không tìm thấy biển số nào phù hợp với điều kiện lọc.
                    </td>
                </tr>
            </tbody>
        `;
    } else {
        tableBodyHTML = `<tbody>`;
        displayData.forEach((item, index) => {
            if (state.activeTab === 'results') {
                const winningPrice = item.startPrice; 
                const auctionTime = item.auctionTime?.split(' - ')[1] || 'Đã đấu giá';
                
                tableBodyHTML += `
                    <tr class="hover:bg-red-50 transition-colors group">
                        <td class="px-6 py-4 text-center font-medium text-gray-900">${index + 1}</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                ${renderLucideIcon('Star', 'text-yellow-400 fill-yellow-400 cursor-pointer', 18)}
                                <span class="font-bold border border-gray-200 px-3 py-1.5 rounded shadow-sm transition-colors whitespace-nowrap bg-white text-gray-800 group-hover:border-[#be1e2d]">
                                    ${item.plateNumber}
                                </span>
                            </div>
                        </td>
                        <td class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">${winningPrice}</td>
                        <td class="px-6 py-4 text-gray-700 whitespace-nowrap">${item.province}</td>
                        <td class="px-6 py-4 text-gray-900 font-medium whitespace-nowrap">${auctionTime}</td>
                        <td class="px-6 py-4">
                            <a href="#" class="text-blue-500 font-bold hover:underline decoration-2 underline-offset-2 whitespace-nowrap">Chi tiết</a>
                        </td> 
                    </tr>
                `;
            } else {
                const price = item.startPrice || "40.000.000 đ"; // Giá khởi điểm
                const auctionTimeDisplay = item.auctionTime?.split(' - ')[1] || 'Chưa xác định';
                const plateClass = state.activeTab === 'official' 
                    ? 'bg-[#eecc48] border-[#eecc48] text-gray-900' 
                    : 'bg-white border-gray-200 text-gray-800 group-hover:border-[#be1e2d]';
                
                tableBodyHTML += `
                    <tr class="hover:bg-red-50 transition-colors group">
                        <td class="px-6 py-4 text-center font-medium text-gray-900">${index + 1}</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                ${renderLucideIcon('Star', 'text-yellow-400 fill-yellow-400 cursor-pointer', 18)}
                                <span class="font-bold border px-3 py-1.5 rounded shadow-sm transition-colors whitespace-nowrap ${plateClass}">
                                    ${item.plateNumber}
                                </span>
                            </div>
                        </td>
                        <td class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">${price}</td>
                        <td class="px-6 py-4 text-gray-700 whitespace-nowrap">${item.province}</td>
                        <td class="px-6 py-4 text-gray-700 whitespace-nowrap">${item.type}</td>
                        <td class="px-6 py-4 text-gray-900 font-medium whitespace-nowrap">${auctionTimeDisplay}</td>
                        <td class="px-6 py-4">
                            <a href="#" class="text-[#be1e2d] font-bold hover:underline decoration-2 underline-offset-2 whitespace-nowrap">Đăng ký đấu giá</a>
                        </td>
                    </tr>
                `;
            }
        });
        tableBodyHTML += `</tbody>`;
    }

    // --- Sidebar Filters ---

    const renderFilterCheckbox = (label, group, isChecked) => `
        <label class="flex items-center gap-3 py-1.5 cursor-pointer hover:bg-gray-50 rounded px-1 -mx-1 filter-checkbox" data-group="${group}" data-label="${label}">
            <div class="relative flex items-center">
                <input 
                    type="checkbox" 
                    ${isChecked ? 'checked' : ''}
                    class="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-[#be1e2d] checked:bg-[#be1e2d]" 
                />
                <svg class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <span class="text-gray-600 text-[15px]">${label}</span>
        </label>
    `;
    
    const renderAccordionSection = (sectionKey, title, itemsArray, group) => {
        const isOpen = state.openSections[sectionKey];
        const stateArray = state[`selected${group === 'type' ? 'Types' : group === 'year' ? 'Years' : 'Avoids'}`];
        const icon = isOpen ? 'ChevronUp' : 'ChevronDown';

        return `
            <div class="bg-red-50/50 rounded-lg border border-red-50 p-1">
                <button 
                    class="toggle-section w-full flex items-center justify-between p-3 bg-red-50 rounded-lg text-[#be1e2d] font-bold text-sm hover:bg-red-100 transition-colors"
                    data-section="${sectionKey}"
                >
                    ${title}
                    ${renderLucideIcon(icon, '', 18)}
                </button>
                <div class="accordion-content ${!isOpen ? 'hidden' : ''}">
                    <div class="p-3 bg-white mt-1 rounded-md border border-gray-100 pl-4">
                        ${itemsArray.map(item => renderFilterCheckbox(item, group, stateArray.includes(item))).join('')}
                    </div>
                </div>
            </div>
        `;
    };

    const dateFiltersHTML = (state.activeTab === 'official' || state.activeTab === 'results') ? `
        <div class="date-input-container">
            <input type="${state.startDate ? 'date' : 'text'}" id="start-date" value="${state.startDate}" placeholder="Từ ngày đấu giá" class="w-full border border-gray-300 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#be1e2d] bg-white cursor-pointer hover:border-gray-400 transition-colors" onfocus="this.type='date'" onblur="if(!this.value) this.type='text'" />
            ${renderLucideIcon('Calendar', 'date-input-icon', 18)}
        </div>
        <div class="date-input-container">
            <input type="${state.endDate ? 'date' : 'text'}" id="end-date" value="${state.endDate}" placeholder="Đến ngày đấu giá" class="w-full border border-gray-300 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#be1e2d] bg-white cursor-pointer hover:border-gray-400 transition-colors" onfocus="this.type='date'" onblur="if(!this.value) this.type='text'" />
            ${renderLucideIcon('Calendar', 'date-input-icon', 18)}
        </div>
    ` : '';


    // --- Main HTML Structure ---
    return `
        <div id="car-auction" class="bg-white border-b border-gray-100">
            ${renderPageBanner('Đấu giá biển số xe ô tô', 'https://picsum.photos/seed/car_banner/1920/200')}
            
            <div class="container mx-auto px-4 py-10"> 
                <h2 class="text-[32px] font-bold text-gray-900 mb-6">Danh sách đấu giá</h2>

                <!-- Top Tabs -->
                <div class="flex gap-1 mb-8 border-b border-gray-200" id="auction-tabs">
                    <button data-tab="announced" class="${getTabClass('announced')}">Danh sách công bố</button>
                    <button data-tab="official" class="${getTabClass('official')}">Danh sách chính thức</button>
                    <button data-tab="results" class="${getTabClass('results')}">Kết quả đấu giá</button>
                </div>

                <div class="flex flex-col lg:flex-row gap-8">
                    <!-- Left Sidebar - Filters -->
                    <div id="filter-sidebar" class="w-full lg:w-1/4 flex-shrink-0 space-y-4">
                        <h3 class="font-medium text-gray-500 mb-2">Lọc kết quả</h3>
                        
                        <!-- Search Input -->
                        <div class="relative">
                            <input 
                                type="text" 
                                placeholder="Nhập để tìm kiếm biển số xe" 
                                id="search-term"
                                value="${state.searchTerm}"
                                class="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#be1e2d] focus:ring-1 focus:ring-[#be1e2d]"
                            />
                            ${renderLucideIcon('Search', 'absolute left-3 top-1/2 transform -translate-y-1/2 text-[#be1e2d]', 18)}
                        </div>

                        <!-- Dropdowns (Màu biển) -->
                        <div class="relative">
                            <select class="w-full border border-gray-300 rounded-lg py-2.5 px-4 appearance-none text-gray-500 text-sm focus:outline-none focus:border-[#be1e2d] bg-white cursor-pointer hover:border-gray-400 transition-colors">
                                <option>Chọn màu biển</option>
                                <option>Biển trắng</option>
                                <option>Biển xanh</option>
                            </select>
                            ${renderLucideIcon('ChevronDown', 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none', 16)}
                        </div>

                        <!-- Dropdowns (Tỉnh/Thành phố) -->
                        <div class="relative">
                            <select 
                                id="select-province"
                                class="w-full border border-gray-300 rounded-lg py-2.5 px-4 appearance-none text-gray-500 text-sm focus:outline-none focus:border-[#be1e2d] bg-white cursor-pointer hover:border-gray-400 transition-colors"
                            >
                                <option value="">Chọn tỉnh, thành phố</option>
                                ${getAllProvinces().map(p => `<option value="${p}" ${state.selectedProvince === p ? 'selected' : ''}>${p}</option>`).join('')}
                            </select>
                            ${renderLucideIcon('ChevronDown', 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none', 16)}
                        </div>
                        
                        <!-- Date Filters -->
                        ${dateFiltersHTML}

                        <!-- Accordion: Loại biển -->
                        ${renderAccordionSection('type', 'Loại biển', availableTypes, 'type')}

                        <!-- Accordion: Tránh số -->
                        ${renderAccordionSection('avoid', 'Tránh số', availableAvoids, 'avoid')}

                        <!-- Accordion: Năm sinh -->
                        ${renderAccordionSection('year', 'Năm sinh (4 số cuối)', availableYears, 'year')}

                    </div>

                    <!-- Right Content - Table -->
                    <div class="w-full lg:w-3/4">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-gray-500 text-sm">Hiển thị ${filteredData.length} / ${displayCount} kết quả</span>
                        </div>

                        <div class="overflow-x-auto rounded-t-lg border border-gray-200">
                            <table class="w-full text-sm text-left">
                                ${tableHeaderHTML}
                                ${tableBodyHTML}
                            </table>
                        </div>

                        <!-- Pagination -->
                        <div class="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                            <div class="flex items-center gap-2">
                                <span class="text-[#be1e2d] font-bold text-sm">Xem</span>
                                <div class="relative">
                                    <select class="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none appearance-none pr-8 bg-white text-[#be1e2d] font-bold cursor-pointer">
                                    <option>50</option>
                                    <option>100</option>
                                    <option>200</option>
                                    </select>
                                    ${renderLucideIcon('ChevronDown', 'absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none', 14)}
                                </div>
                            </div>
                            <div class="flex gap-1.5">
                                <button class="w-9 h-9 flex items-center justify-center rounded bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors" aria-label="Trang trước">${renderLucideIcon('ChevronLeft', '', 18)}</button>
                                <button class="w-9 h-9 flex items-center justify-center rounded bg-[#be1e2d] text-white font-bold text-sm shadow-sm">1</button>
                                <button class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 font-medium text-sm transition-colors">2</button>
                                <button class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 font-medium text-sm transition-colors">3</button>
                                <span class="w-9 h-9 flex items-center justify-center text-gray-400 pb-2">...</span>
                                <button class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 font-medium text-sm transition-colors">2000</button>
                                <button class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 hover:text-[#be1e2d] transition-colors" aria-label="Trang sau">${renderLucideIcon('ChevronRight', '', 18)}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};


/**
 * Renders the Footer component.
 */
const renderFooter = () => {
    return `
        <footer class="bg-[#2a0a0a] text-white pt-16 pb-8 border-t-4 border-[#be1e2d]">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
                
                    <!-- Company Info -->
                    <div class="lg:col-span-7">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-600 rounded-lg flex items-center justify-center transform rotate-45">
                                <div class="w-7 h-7 bg-[#2a0a0a] transform -rotate-45" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%)"></div>
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

                    <!-- Social & Certs -->
                    <div class="lg:col-span-5 flex flex-col items-start lg:items-end">
                        <h3 class="text-lg font-bold mb-4">Theo dõi chúng tôi trên</h3>
                        <div class="flex gap-4 mb-8">
                            <a href="#" class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition" aria-label="Facebook">
                                <span class="icon-facebook" data-lucide="Facebook" fill="white"></span>
                            </a>
                            <a href="#" class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition font-bold text-xs flex items-center justify-center w-10 h-10" aria-label="Zalo">
                                Zalo
                            </a>
                        </div>

                        <div class="mb-8 bg-white rounded p-1">
                            <div class="border border-red-500 flex items-center p-1 gap-2">
                                <div class="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">✓</div>
                                <div class="text-red-600 font-bold leading-tight text-xs uppercase">
                                    Đã đăng ký<br/>Bộ Công Thương
                                </div>
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
        </footer>
    `;
};


/**
 * Renders the Sticky Contact component.
 */
const renderStickyContact = () => {
    return `
        <div class="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
            <a href="#" class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center w-12 h-12" aria-label="Facebook">
                ${renderLucideIcon('Facebook', '', 24)}
            </a>
            <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center w-12 h-12" aria-label="Zalo">
                <div class="font-bold text-xs">Zalo</div>
            </a>
            <a href="tel:1900055515" class="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center w-12 h-12 animate-bounce" aria-label="Gọi điện thoại hotline">
                ${renderLucideIcon('Phone', '', 24)}
            </a>
        </div>
    `;
};

/**
 * Renders placeholder content for non-car pages.
 */
const renderHomePlaceholder = () => {
    const icon = state.activePage === 'home' ? 'Home' : 'Car';
    return `
        <main class="min-h-screen p-16 text-center bg-gray-50">
            ${renderLucideIcon(icon, 'mx-auto text-[#be1e2d] mb-4', 64)}
            <h2 class="text-3xl font-bold text-gray-700">Trang "${state.activePage}"</h2>
            <p class="mt-4 text-gray-500">Đây là nội dung placeholder. Vui lòng sử dụng tab "Đấu giá biển số xe ô tô" để xem chức năng chính.</p>
        </main>
    `;
};


// --- EVENT HANDLERS ---

const attachEventHandlers = () => {
    // 1. Navigation Handlers (Header)
    const navs = document.querySelectorAll('a[id^="nav-"], button[id^="nav-"], a[id^="mobile-nav-"]');
    navs.forEach(nav => {
        const page = nav.id.replace(/(mobile-)?nav-/, '');
        nav.onclick = (e) => {
            e.preventDefault();
            updateState({ activePage: page });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    });

    // 2. Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuDropdown = document.getElementById('mobile-menu-dropdown');
    if (mobileMenuToggle && mobileMenuDropdown) {
        mobileMenuToggle.onclick = () => {
            const isHidden = mobileMenuDropdown.classList.toggle('hidden');
            mobileMenuToggle.setAttribute('aria-expanded', !isHidden);
            const icon = isHidden ? 'Menu' : 'X';
            mobileMenuToggle.innerHTML = renderLucideIcon(icon, 'text-gray-700', 26);
            if (typeof lucide !== 'undefined') lucide.createIcons();
        };
    }
    
    // Check if we are on the 'cars' page to attach specific handlers
    if (state.activePage === 'cars') {
        // 3. Tab Handlers
        document.querySelectorAll('#auction-tabs .tab-btn').forEach(button => {
            button.onclick = () => {
                const tab = button.getAttribute('data-tab');
                updateState({ activeTab: tab });
            };
        });

        // 4. Filter Handlers (Search, Province)
        const searchTermInput = document.getElementById('search-term');
        if (searchTermInput) {
            searchTermInput.oninput = (e) => {
                updateState({ searchTerm: e.target.value });
            };
        }
        
        const selectProvince = document.getElementById('select-province');
        if (selectProvince) {
            selectProvince.onchange = (e) => {
                updateState({ selectedProvince: e.target.value });
            };
        }
        
        // 5. Date Filter Handlers
        const startDateInput = document.getElementById('start-date');
        if (startDateInput) {
            startDateInput.onchange = (e) => {
                updateState({ startDate: e.target.value });
            };
        }
        
        const endDateInput = document.getElementById('end-date');
        if (endDateInput) {
            endDateInput.onchange = (e) => {
                updateState({ endDate: e.target.value });
            };
        }

        // 6. Checkbox Handlers
        document.querySelectorAll('#filter-sidebar .filter-checkbox input[type="checkbox"]').forEach(checkbox => {
            checkbox.onchange = (e) => {
                const label = checkbox.closest('.filter-checkbox').getAttribute('data-label');
                const group = checkbox.closest('.filter-checkbox').getAttribute('data-group');
                const isChecked = e.target.checked;
                
                let updatedState = {};
                let currentArray = state[`selected${group === 'type' ? 'Types' : group === 'year' ? 'Years' : 'Avoids'}`];

                if (isChecked) {
                    updatedState[`selected${group === 'type' ? 'Types' : group === 'year' ? 'Years' : 'Avoids'}`] = [...currentArray, label];
                } else {
                    updatedState[`selected${group === 'type' ? 'Types' : group === 'year' ? 'Years' : 'Avoids'}`] = currentArray.filter(t => t !== label);
                }

                updateState(updatedState);
            };
        });

        // 7. Accordion Toggle Handlers
        document.querySelectorAll('#filter-sidebar .toggle-section').forEach(button => {
            button.onclick = () => {
                const sectionKey = button.getAttribute('data-section');
                const content = button.nextElementSibling;
                const newOpenSections = { ...state.openSections, [sectionKey]: !state.openSections[sectionKey] };
                
                // Manually toggle class and update icon (since we are not re-rendering the whole sidebar)
                if (content) {
                    content.classList.toggle('hidden');
                }
                const iconElement = button.querySelector('[data-lucide]');
                if (iconElement) {
                    const newIcon = newOpenSections[sectionKey] ? 'ChevronUp' : 'ChevronDown';
                    iconElement.setAttribute('data-lucide', newIcon);
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }

                state.openSections = newOpenSections;
            };
        });
    }
};

/**
 * Main application render function.
 */
const renderApp = () => {
    const appRoot = document.getElementById('app');
    if (!appRoot) return;

    let mainContentHTML;
    const filteredData = getFilteredData();

    if (state.activePage === 'cars') {
        mainContentHTML = renderCarAuctionSection(filteredData);
    } else {
        mainContentHTML = renderHomePlaceholder();
    }

    appRoot.innerHTML = `
        ${renderHeader()}
        ${mainContentHTML}
        ${renderFooter()}
        ${renderStickyContact()}
    `;

    // Re-attach event listeners after DOM is updated
    attachEventHandlers();

    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});