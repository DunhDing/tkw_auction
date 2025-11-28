// --- CONSTANTS & MOCK DATA ---
const VPA_RED = '#be1e2d';
const VPA_YELLOW = '#fbb03b';

const createMockPlate = (id, plateNumber, province, type, auctionTime, startPrice = '50.000.000 VNĐ') => ({
    id: `plate-${id}`,
    plateNumber,
    startPrice,
    province,
    type,
    auctionTime
});

// Mock Data: Danh sách công bố
const motorbikePlates = [
    createMockPlate(1, '30K-999.99', 'Thành phố Hà Nội', 'Ngũ quý'),
    createMockPlate(2, '51L-123.45', 'Thành phố Hồ Chí Minh', 'Sảnh tiến'),
    createMockPlate(3, '15A-888.88', 'Thành phố Hải Phòng', 'Tứ quý', undefined, '30.000.000 VNĐ'),
    createMockPlate(4, '43B-000.01', 'Đà Nẵng', 'Số gánh'),
    createMockPlate(5, '65C-688.68', 'Thành phố Cần Thơ', 'Lộc phát'),
    createMockPlate(6, '37-P1 39.79', 'Nghệ An', 'Thần tài', undefined, '15.000.000 VNĐ'),
    createMockPlate(7, '86-A1 11.11', 'Bình Thuận', 'Ngũ quý', undefined, '40.000.000 VNĐ'),
];

// Mock Data: Danh sách chính thức (có thời gian đấu giá)
const officialMotorbikePlates = [
    createMockPlate(10, '30K-999.99', 'Thành phố Hà Nội', 'Ngũ quý', '2025-12-05 10:00:00'),
    createMockPlate(11, '51L-123.45', 'Thành phố Hồ Chí Minh', 'Sảnh tiến', '2025-12-05 10:30:00'),
    createMockPlate(12, '15A-888.88', 'Thành phố Hải Phòng', 'Tứ quý', '2025-12-06 14:00:00'),
    createMockPlate(13, '43B-000.01', 'Đà Nẵng', 'Số gánh', '2025-12-07 09:30:00'),
    createMockPlate(14, '65C-688.68', 'Thành phố Cần Thơ', 'Lộc phát', '2025-12-08 11:00:00'),
    createMockPlate(15, '37-P1 39.79', 'Nghệ An', 'Thần tài', '2025-12-08 14:00:00'),
    createMockPlate(16, '86-A1 11.11', 'Bình Thuận', 'Ngũ quý', '2025-12-10 10:00:00'),
];

// Mock Data: Kết quả đấu giá (giả định giá trúng)
const motorbikeAuctionResults = [
    createMockPlate(20, '30K-999.99', 'Thành phố Hà Nội', 'Ngũ quý', '2025-11-20 10:00:00', '1.200.000.000 VNĐ'),
    createMockPlate(21, '51L-123.45', 'Thành phố Hồ Chí Minh', 'Sảnh tiến', '2025-11-21 10:30:00', '150.000.000 VNĐ'),
    createMockPlate(22, '15A-888.88', 'Thành phố Hải Phòng', 'Tứ quý', '2025-11-22 14:00:00', '520.000.000 VNĐ'),
    createMockPlate(23, '43B-000.01', 'Đà Nẵng', 'Số gánh', '2025-11-23 09:30:00', '75.000.000 VNĐ'),
    createMockPlate(24, '65C-688.68', 'Thành phố Cần Thơ', 'Lộc phát', '2025-11-24 11:00:00', '210.000.000 VNĐ'),
];

const specialProvinces = ["Thành phố Hà Nội", "Thành phố Hồ Chí Minh", "Thành phố Hải Phòng", "Đà Nẵng", "Thành phố Cần Thơ"];
const allProvinces = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", 
    "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", 
    "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", 
    "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", 
    "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên", 
    "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", 
    "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", 
    "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", 
    "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", 
    "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", 
    "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
].filter(p => !specialProvinces.includes(p)).sort();

const vietnameseProvinces = ["", ...specialProvinces, ...allProvinces];
const plateTypes = ["Ngũ quý", "Sảnh tiến", "Tứ quý", "Tam hoa", "Thần tài", "Lộc phát", "Ông địa", "Số gánh", "Lặp đôi"];
const avoidNumbers = ["Tránh 4", "Tránh 7", "Tránh 49", "Tránh 53", "Tránh 13"];
const birthYears = ["Năm sinh 196x", "Năm sinh 197x", "Năm sinh 198x", "Năm sinh 199x", "Năm sinh 200x"];


// --- STATE MANAGEMENT ---
let appState = {
    activePage: 'motorbikes',
    activeTab: 'results', // 'announced', 'official', 'results'
    mobileMenuOpen: false,
    // Filters
    searchTerm: '',
    selectedProvince: '',
    selectedTypes: [],
    selectedAvoids: [],
    selectedYears: [],
    startDate: '',
    endDate: '',
    // UI State
    openSections: { type: true, year: true, avoid: true },
    sortConfig: null, // { key: 'auctionTime', direction: 'ascending' | 'descending' }
    // Pagination
    currentPage: 1,
    itemsPerPage: 50
};

// --- UTILITY FUNCTIONS (SVG Icons & Helpers) ---
// Hàm lấy SVG cho các icon (được tái sử dụng từ Lucide React)
const getIcon = (name, size = 20, classes = '') => {
    const icons = {
        Search: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
        Menu: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
        X: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
        User: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
        Star: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="${classes}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
        ChevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M6 9l6 6 6-6"/></svg>`,
        ChevronUp: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M18 15l-6-6-6 6"/></svg>`,
        ChevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M15 18l-6-6 6-6"/></svg>`,
        ChevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M9 18l6-6-6-6"/></svg>`,
        ArrowUpDown: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`,
        Calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
        MapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 14 6 14s6-9.5 6-14c0-3.314-2.686-6-6-6z"></path><circle cx="12" cy="8" r="3"></circle></svg>`,
        Phone: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-5.74-5.74A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.15.96.41 1.9.79 2.78a2 2 0 0 1-.58 2.34L7.8 11.2a14.62 14.62 0 0 0 6.55 6.55l1.04-1.6c.38-.6.8-.93 1.34-1.1z"></path></svg>`,
        Mail: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${classes}"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
        Facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="${classes}"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
    };
    return icons[name] || '';
};

const getPlateAuctionTime = (item) => item.auctionTime || "";

const getLastTwoDigits = (plateNumber) => {
    // Lấy chuỗi số sau ký tự phân tách đầu tiên (dấu gạch ngang hoặc khoảng trắng)
    const parts = plateNumber.split(/[\s-]/);
    let numberPart = parts[parts.length - 1];
    
    // Nếu vẫn còn dấu chấm (ví dụ: '39.79'), lấy phần sau dấu chấm
    if (numberPart.includes('.')) {
        numberPart = numberPart.split('.')[1];
    }
    
    const digits = numberPart.replace(/[^0-9]/g, '');
    
    if (digits.length >= 2) {
        return digits.slice(-2);
    }
    return '';
};


// --- RENDER FUNCTIONS (Được định nghĩa là hàm để sử dụng trong script) ---

function renderHeader() {
    const { activePage, mobileMenuOpen } = appState;

    const navClass = (page) =>
        `cursor-pointer transition-colors text-gray-700 ${activePage === page ? 'text-[#be1e2d] font-bold border-b-2 border-[#be1e2d]' : 'hover:text-[#be1e2d] border-b-2 border-transparent hover:border-red-300'}`;
    
    const mobileNavClass = (page) =>
        `cursor-pointer py-3 px-4 transition-colors rounded-lg ${activePage === page ? 'text-white font-bold bg-[#be1e2d] shadow-md' : 'text-gray-700 hover:bg-gray-100'}`;

    const navItemHTML = (page, text, isMobile = false) => `
        <span 
            onclick="handleNavClick('${page}')" 
            class="${isMobile ? mobileNavClass(page) : navClass(page)}"
            data-nav="${page}"
        >${text}</span>
    `;

    const headerHTML = `
        <header class="w-full sticky top-0 z-50 shadow-lg bg-white">
            <div class="container mx-auto px-4 py-4 flex items-center justify-between">
                
                <div class="flex items-center gap-2 cursor-pointer" onclick="handleNavClick('home')">
                    <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-red-600 rounded-lg flex items-center justify-center transform rotate-45 shadow-lg">
                        <div class="w-6 h-6 bg-white transform -rotate-45" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%);"></div>
                    </div>
                    <span class="text-3xl font-extrabold text-[#be1e2d] tracking-tight">VPA</span>
                </div>

                <div class="hidden lg:flex items-center gap-8 font-medium text-sm xl:text-base">
                    
                    <nav class="flex items-center gap-6">
                        ${navItemHTML('home', 'Trang chủ')}
                        ${navItemHTML('cars', 'Đấu giá biển số xe ô tô')}
                        ${navItemHTML('motorbikes', 'Đấu giá biển số xe máy')}
                        ${navItemHTML('assets', 'Đấu giá tài sản')}
                        ${navItemHTML('news', 'Tin tức')}
                        ${navItemHTML('notifications', 'Kế hoạch')}
                    </nav>

                    <div class="flex items-center gap-4 pl-8 border-l border-gray-200">
                        <button
                            onclick="handleNavClick('login')"
                            class="flex items-center justify-center gap-1 text-white bg-[#be1e2d] px-4 py-2 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-md shadow-red-300/50 transform hover:scale-[1.02] active:scale-100 whitespace-nowrap"
                        >
                            ${getIcon('User', 18)} Đăng nhập
                        </button>
                    </div>
                </div>

                <div class="flex items-center gap-4 lg:hidden">
                    <button class="text-gray-700 p-2 focus:outline-none" onclick="toggleMobileMenu()" id="mobile-menu-toggle">
                        ${mobileMenuOpen ? getIcon('X', 26) : getIcon('Menu', 26)}
                    </button>
                </div>
            </div>

            ${mobileMenuOpen ? `
            <div class="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 z-40 shadow-xl rounded-b-lg">
                <div class="flex flex-col p-4 space-y-1 font-medium">
                    
                    <div class="flex items-center justify-center py-2 border-b border-gray-100 mb-2">
                        <button
                            onclick="handleNavClick('login')"
                            class="flex items-center justify-center gap-1 text-white bg-[#be1e2d] px-6 py-2.5 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-md"
                        >
                            ${getIcon('User', 18)} Đăng nhập
                        </button>
                    </div>

                    ${navItemHTML('home', 'Trang chủ', true)}
                    ${navItemHTML('cars', 'Đấu giá biển số xe ô tô', true)}
                    ${navItemHTML('motorbikes', 'Đấu giá biển số xe máy', true)}
                    ${navItemHTML('assets', 'Đấu giá tài sản', true)}
                    ${navItemHTML('news', 'Tin tức', true)}
                    ${navItemHTML('notifications', 'Kế hoạch', true)}
                    <span onclick="handleNavClick('about')" class="${mobileNavClass('about')}">Giới thiệu</span>
                </div>
            </div>
            ` : ''}
        </header>
    `;
    return headerHTML;
}

function renderPageBanner(title, subtitle) {
    return `
        <div class="bg-red-900/90 text-white py-12 shadow-xl">
            <div class="container mx-auto px-4">
                <h1 class="text-3xl sm:text-4xl font-extrabold mb-2">${title}</h1>
                <p class="text-red-200">${subtitle}</p>
            </div>
        </div>
    `;
}

function renderDateInputWithLabel(id, label, value) {
    return `
        <div class="relative">
            <input
                type="${appState[id] ? 'date' : 'text'}"
                id="${id}"
                placeholder="${appState[id] ? '' : label}"
                value="${value}"
                onfocus="this.type='date'; this.placeholder=''"
                onblur="if(!this.value) this.type='text'; this.placeholder='${label}'"
                onchange="handleFilterChange(this)"
                class="w-full border border-gray-300 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none custom-focus bg-white cursor-pointer hover:border-gray-400 transition-colors
                        [color-scheme:light] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
            ${!value ? `<span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-sm">${label}</span>` : ''}
            ${getIcon('Calendar', 18, 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none')}
        </div>
    `;
}

function renderFilterCheckbox(type, label, checked) {
    const id = `${type}-${label.replace(/\s/g, '-')}`;
    return `
        <label class="flex items-center gap-3 py-1.5 cursor-pointer hover:bg-gray-50 rounded px-1 -mx-1">
            <div class="relative flex items-center">
                <input 
                    type="checkbox" 
                    id="${id}"
                    data-filter-type="${type}"
                    data-filter-value="${label}"
                    ${checked ? 'checked' : ''}
                    onchange="handleCheckboxChange(this)"
                    class="custom-checkbox peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-[#be1e2d] checked:bg-[#be1e2d]" 
                />
                <svg class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <span class="text-gray-600 text-[15px]">${label}</span>
        </label>
    `;
}

function renderTableHeader() {
    const { activeTab, sortConfig } = appState;

    const getSortIcon = (key) => {
        if (sortConfig?.key !== key) return getIcon('ArrowUpDown', 14, 'text-gray-500');
        return sortConfig.direction === 'ascending' 
            ? getIcon('ChevronUp', 14, 'text-[#be1e2d]') 
            : getIcon('ChevronDown', 14, 'text-[#be1e2d]');
    }

    const getSortHeader = (key, text) => `
        <th 
            class="px-3 sm:px-6 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-300 transition-colors"
            onclick="requestSort('${key}')" 
        >
            <div class="flex items-center gap-1">
                ${text}
                ${getSortIcon(key)}
            </div>
        </th>
    `;

    if (activeTab === 'results') {
        return `
            <thead class="bg-[#e5e5e5] text-gray-900 font-bold">
                <tr>
                    <th class="px-3 sm:px-6 py-4 w-12 sm:w-16 text-center">STT</th>
                    <th class="px-3 sm:px-6 py-4">Biển số</th>
                    <th class="px-3 sm:px-6 py-4">Giá trúng đấu giá</th> 
                    <th class="px-3 sm:px-6 py-4">Tỉnh, Thành phố</th>
                    ${getSortHeader('auctionTime', 'T.gian đấu giá')}
                    <th class="px-3 sm:px-6 py-4"></th>
                </tr>
            </thead>
        `;
    }
    
    return `
        <thead class="bg-[#e5e5e5] text-gray-900 font-bold">
            <tr>
                <th class="px-3 sm:px-6 py-4 w-12 sm:w-16 text-center">STT</th>
                <th class="px-3 sm:px-6 py-4">Biển số</th>
                <th class="px-3 sm:px-6 py-4">Giá khởi điểm</th>
                <th class="px-3 sm:px-6 py-4">Tỉnh, Thành phố</th>
                <th class="px-3 sm:px-6 py-4">Loại biển</th>
                ${activeTab === 'official' ? getSortHeader('auctionTime', 'T.gian đấu giá') : ''}
                <th class="px-3 sm:px-6 py-4"></th>
            </tr>
        </thead>
    `;
}

function renderTableBody(currentTableData) {
    const { activeTab, currentPage, itemsPerPage } = appState;

    if (currentTableData.length === 0) {
        return `
            <tbody>
                <tr>
                    <td colSpan="${activeTab === 'official' ? 7 : 6}" class="px-6 py-8 text-center text-gray-500">
                        Không tìm thấy biển số nào phù hợp với điều kiện tìm kiếm/lọc.
                    </td>
                </tr>
            </tbody>
        `;
    }

    let rows = currentTableData.map((item, index) => {
        const stt = (currentPage - 1) * itemsPerPage + index + 1;
        
        if (activeTab === 'results') {
            const winningPrice = item.startPrice; 
            const auctionTime = getPlateAuctionTime(item).split(' ')[0] || '---';
            
            return `
                <tr class="hover:bg-red-50 transition-colors group">
                    <td class="px-3 sm:px-6 py-4 text-center font-medium text-gray-900">${stt}</td>
                    <td class="px-3 sm:px-6 py-4">
                        <div class="flex items-center gap-2 sm:gap-3">
                            ${getIcon('Star', 16, 'text-yellow-400 fill-yellow-400 cursor-pointer opacity-0 sm:opacity-100')}
                            <span class="font-bold border border-gray-200 px-2 sm:px-3 py-1 rounded shadow-sm transition-colors whitespace-nowrap bg-white text-gray-800 group-hover:border-[#be1e2d]">
                                ${item.plateNumber}
                            </span>
                        </div>
                    </td>
                    <td class="px-3 sm:px-6 py-4 font-bold text-gray-900 whitespace-nowrap">${winningPrice}</td>
                    <td class="px-3 sm:px-6 py-4 text-gray-700 whitespace-nowrap">${item.province}</td>
                    <td class="px-3 sm:px-6 py-4 text-gray-900 font-medium whitespace-nowrap">${auctionTime}</td>
                    <td class="px-3 sm:px-6 py-4"></td> 
                </tr>
            `;
        }
        
        const plateBgClass = activeTab === 'official' ? 'bg-[#ffc107] border-[#ffc107] text-gray-900' : 'bg-white border-gray-300 text-gray-800 group-hover:border-[#be1e2d]';
        const auctionTimeDisplay = activeTab === 'official' ? (getPlateAuctionTime(item).split(' ')[0] || '---') : '';
        const timeCell = activeTab === 'official' ? `<td class="px-3 sm:px-6 py-4 text-gray-900 font-medium whitespace-nowrap">${auctionTimeDisplay}</td>` : '';

        return `
            <tr class="hover:bg-red-50 transition-colors group">
                <td class="px-3 sm:px-6 py-4 text-center font-medium text-gray-900">${stt}</td>
                <td class="px-3 sm:px-6 py-4">
                    <div class="flex items-center gap-2 sm:gap-3">
                        ${getIcon('Star', 16, 'text-yellow-400 fill-yellow-400 cursor-pointer')}
                        <span class="font-bold border px-2 sm:px-3 py-1 rounded shadow-sm transition-colors whitespace-nowrap ${plateBgClass}">
                            ${item.plateNumber}
                        </span>
                    </div>
                </td>
                <td class="px-3 sm:px-6 py-4 font-bold text-gray-900 whitespace-nowrap">${item.startPrice}</td>
                <td class="px-3 sm:px-6 py-4 text-gray-700 whitespace-nowrap">${item.province}</td>
                <td class="px-3 sm:px-6 py-4 text-gray-700 whitespace-nowrap">${item.type}</td>
                ${timeCell}
                <td class="px-3 sm:px-6 py-4">
                    <a href="#" class="text-[#be1e2d] font-bold hover:underline decoration-2 underline-offset-2 whitespace-nowrap">Đăng ký</a>
                </td>
            </tr>
        `;
    }).join('');

    return `<tbody class="divide-y divide-gray-100 text-xs sm:text-sm">${rows}</tbody>`;
}

function renderPaginationControls(totalItems, totalPages, currentPage, itemsPerPage) {
    if (totalItems === 0 || totalPages <= 1) return '';
    
    const getPaginationItems = () => {
        const maxVisible = 5; 
        let itemsHTML = '';
        const startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        // Điều chỉnh lại startPage nếu endPage bị kẹp vào totalPages
        if (endPage === totalPages && endPage - startPage < maxVisible - 1) {
            const newStartPage = Math.max(1, endPage - maxVisible + 1);
            if (newStartPage !== startPage) {
                // Render ellipsis nếu newStartPage > 1
                if (newStartPage > 1) {
                     itemsHTML += `<span class="w-9 h-9 flex items-center justify-center text-gray-400 pb-2">...</span>`;
                }
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            itemsHTML += `
                <button 
                    onclick="setCurrentPage(${i})"
                    class="w-9 h-9 flex items-center justify-center rounded font-medium text-sm transition-colors ${
                        i === currentPage ? 'bg-[#be1e2d] text-white shadow-sm' : 'bg-white border border-gray-100 hover:bg-gray-50 text-gray-600'
                    }"
                >
                    ${i}
                </button>
            `;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) { 
                 itemsHTML += `<span class="w-9 h-9 flex items-center justify-center text-gray-400 pb-2">...</span>`;
            }
            if (endPage < totalPages) { 
                 itemsHTML += `
                    <button 
                        onclick="setCurrentPage(${totalPages})"
                        class="w-9 h-9 flex items-center justify-center rounded font-medium text-sm transition-colors ${
                            totalPages === currentPage ? 'bg-[#be1e2d] text-white shadow-sm' : 'bg-white border border-gray-100 hover:bg-gray-50 text-gray-600'
                        }"
                    >
                        ${totalPages}
                    </button>
                `;
            }
        }

        return itemsHTML;
    }

    return `
        <div class="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div class="flex items-center gap-2">
                <span class="text-[#be1e2d] font-bold text-sm">Xem</span>
                <div class="relative">
                    <select 
                        onchange="setItemsPerPage(this.value)"
                        class="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none appearance-none pr-8 bg-white text-[#be1e2d] font-bold cursor-pointer"
                    >
                        <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                        <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                        <option value="50" ${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                        <option value="100" ${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                    </select>
                    ${getIcon('ChevronDown', 14, 'absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none')}
                </div>
            </div>
            
            <div class="flex gap-1.5">
                <button 
                    onclick="setCurrentPage(${currentPage - 1})"
                    ${currentPage === 1 ? 'disabled' : ''}
                    class="w-9 h-9 flex items-center justify-center rounded bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ${getIcon('ChevronLeft', 18)}
                </button>
                
                ${getPaginationItems()}

                <button 
                    onclick="setCurrentPage(${currentPage + 1})"
                    ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}
                    class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 hover:text-[#be1e2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ${getIcon('ChevronRight', 18)}
                </button>
            </div>
        </div>
    `;
}

function renderAuctionTable(title, data, id) {
    const { activeTab, openSections, searchTerm, selectedProvince, selectedTypes, selectedAvoids, selectedYears, startDate, endDate, currentPage, itemsPerPage } = appState;
    
    const sourceData = getSourceData(activeTab);
    const filteredAndSortedData = applyFiltersAndSort(sourceData);
    const totalItems = filteredAndSortedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentTableData = paginateData(filteredAndSortedData);
    const resultCount = totalItems.toLocaleString('en-US'); 
    
    const getTabClass = (tabName) => {
        const baseClass = "px-6 py-3 font-bold text-sm rounded-t-lg transition-colors whitespace-nowrap";
        return activeTab === tabName 
            ? `${baseClass} bg-[#be1e2d] text-white shadow-md` 
            : `${baseClass} text-gray-500 hover:text-[#be1e2d] hover:bg-gray-50`;
    };
    
    const tableHTML = `
        <div id="${id}" class="py-10 bg-white border-b border-gray-100">
            <div class="container mx-auto px-4">
                <h2 class="text-[28px] sm:text-[32px] font-bold text-gray-900 mb-6">${title}</h2>
            
                <div class="flex gap-1 mb-8 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
                    <button onclick="handleTabChange('announced')" class="${getTabClass('announced')}">Danh sách công bố</button>
                    <button onclick="handleTabChange('official')" class="${getTabClass('official')}">Danh sách chính thức</button>
                    <button onclick="handleTabChange('results')" class="${getTabClass('results')}">Kết quả đấu giá</button>
                </div>

                <div class="flex flex-col lg:flex-row gap-8">
                    <div class="w-full lg:w-1/4 flex-shrink-0 space-y-4">
                        <h3 class="font-medium text-gray-500 mb-2">Lọc kết quả</h3>
                        
                        <div class="relative">
                            <input 
                                type="text" 
                                id="searchTerm"
                                placeholder="Nhập để tìm kiếm biển số xe" 
                                value="${searchTerm}"
                                oninput="handleFilterChange(this)"
                                class="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#be1e2d]"
                            />
                            ${getIcon('Search', 18, 'absolute left-3 top-1/2 transform -translate-y-1/2 text-[#be1e2d]')}
                        </div>

                        <div class="relative">
                            <select 
                                id="selectedProvince"
                                onchange="handleFilterChange(this)"
                                class="w-full border border-gray-300 rounded-lg py-2.5 px-4 appearance-none text-gray-500 text-sm focus:outline-none bg-white cursor-pointer hover:border-gray-400 transition-colors"
                            >
                                <option value="" ${selectedProvince === '' ? 'selected' : ''}>Chọn tỉnh, thành phố</option>
                                ${vietnameseProvinces.filter(p => p).map(province => `<option value="${province}" ${selectedProvince === province ? 'selected' : ''}>${province}</option>`).join('')}
                            </select>
                            ${getIcon('ChevronDown', 16, 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none')}
                        </div>
                        
                        ${((activeTab === 'official' || activeTab === 'results') ? `
                            ${renderDateInputWithLabel('startDate', 'Từ ngày đấu giá', startDate)}
                            ${renderDateInputWithLabel('endDate', 'Đến ngày đấu giá', endDate)}
                        ` : '')}

                        <div class="bg-red-50/50 rounded-lg border border-red-50 p-1">
                            <button 
                                onclick="toggleSection('type')"
                                class="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg text-[#be1e2d] font-bold text-sm hover:bg-red-100 transition-colors"
                            >
                                Loại biển
                                ${openSections.type ? getIcon('ChevronUp', 18) : getIcon('ChevronDown', 18)}
                            </button>
                            ${openSections.type ? `
                            <div class="p-3 bg-white mt-1 rounded-md border border-gray-100 pl-4 max-h-48 overflow-y-auto">
                                ${plateTypes.map(type => renderFilterCheckbox('selectedTypes', type, selectedTypes.includes(type))).join('')}
                            </div>` : ''}
                        </div>

                        <div class="bg-red-50/50 rounded-lg border border-red-50 p-1">
                            <button 
                                onclick="toggleSection('year')"
                                class="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg text-[#be1e2d] font-bold text-sm hover:bg-red-100 transition-colors"
                            >
                                Năm sinh
                                ${openSections.year ? getIcon('ChevronUp', 18) : getIcon('ChevronDown', 18)}
                            </button>
                            ${openSections.year ? `
                            <div class="p-3 bg-white mt-1 rounded-md border border-gray-100 pl-4">
                                ${birthYears.map(year => renderFilterCheckbox('selectedYears', year, selectedYears.includes(year))).join('')}
                            </div>` : ''}
                        </div>

                        <div class="bg-red-50/50 rounded-lg border border-red-50 p-1">
                            <button 
                                onclick="toggleSection('avoid')"
                                class="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg text-[#be1e2d] font-bold text-sm hover:bg-red-100 transition-colors"
                            >
                                Tránh số
                                ${openSections.avoid ? getIcon('ChevronUp', 18) : getIcon('ChevronDown', 18)}
                            </button>
                            ${openSections.avoid ? `
                            <div class="p-3 bg-white mt-1 rounded-md border border-gray-100 pl-4">
                                ${avoidNumbers.map(avoid => renderFilterCheckbox('selectedAvoids', avoid, selectedAvoids.includes(avoid))).join('')}
                            </div>` : ''}
                        </div>
                    </div>

                    <div class="w-full lg:w-3/4">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-gray-500 text-sm">Hiển thị <b>${resultCount}</b> kết quả</span>
                        </div>

                        <div class="overflow-x-auto rounded-t-lg border border-gray-200 shadow-md">
                            <table class="auction-table w-full text-left table-auto">
                                ${renderTableHeader()}
                                ${renderTableBody(currentTableData)}
                            </table>
                        </div>

                        ${renderPaginationControls(totalItems, totalPages, currentPage, itemsPerPage)}
                    </div>
                </div>
            </div>
        </div>
    `;
    return tableHTML;
}

function renderFooter() {
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
                                    ${getIcon('MapPin', 16, 'text-[#fbb03b]')}
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
                                    ${getIcon('Phone', 16, 'text-[#fbb03b]')}
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
                                    ${getIcon('Mail', 16, 'text-[#fbb03b]')}
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
                                ${getIcon('Facebook', 24, 'fill-white')}
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

function renderStickyContact() {
    return `
        <div class="fixed right-4 bottom-8 z-50 flex flex-col gap-3">
            <a href="#" title="Facebook"
                class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center w-12 h-12">
                ${getIcon('Facebook', 24, 'fill-white')}
            </a>
            <a href="#" title="Zalo"
                class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center w-12 h-12">
                <div class="font-bold text-xs">Zalo</div>
            </a>
            <a href="tel:1900055515" title="Hotline CSKH: 1900.0555.15"
                class="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center w-12 h-12 animate-bounce-slow">
                ${getIcon('Phone', 24, 'fill-white')}
            </a>
        </div>
    `;
}

// --- CORE LOGIC ---

function getSourceData(activeTab) {
    if (activeTab === 'announced') return motorbikePlates;
    if (activeTab === 'official') return officialMotorbikePlates;
    if (activeTab === 'results') return motorbikeAuctionResults;
    return [];
}

function applyFiltersAndSort(data) {
    let temp = [...data];
    const { searchTerm, selectedProvince, selectedTypes, selectedAvoids, selectedYears, startDate, endDate, activeTab, sortConfig } = appState;

    // 1. Filter by Search Term (Plate Number)
    if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        temp = temp.filter(item => item.plateNumber.toLowerCase().includes(lowerSearchTerm));
    }

    // 2. Filter by Province
    if (selectedProvince) {
        temp = temp.filter(item => item.province === selectedProvince);
    }
    
    // 3. Filter by Type
    if (selectedTypes.length > 0) {
        temp = temp.filter(item => selectedTypes.includes(item.type));
    }

    // 4. Filter by Avoid Numbers
    if (selectedAvoids.length > 0) {
        temp = temp.filter(item => {
            const plate = item.plateNumber;
            let shouldKeep = true;
            if (selectedAvoids.includes("Tránh 4") && plate.includes('4')) shouldKeep = false;
            if (selectedAvoids.includes("Tránh 7") && plate.includes('7')) shouldKeep = false;
            if (selectedAvoids.includes("Tránh 49") && plate.includes('49')) shouldKeep = false;
            if (selectedAvoids.includes("Tránh 53") && plate.includes('53')) shouldKeep = false;
            if (selectedAvoids.includes("Tránh 13") && plate.includes('13')) shouldKeep = false;
            return shouldKeep;
        });
    }

    // 5. Filter by Birth Years (using last two digits)
    if (selectedYears.length > 0) {
        temp = temp.filter(item => {
            const lastTwoDigitsStr = getLastTwoDigits(item.plateNumber);
            if (lastTwoDigitsStr.length < 2) return false;
            
            const lastTwoDigits = parseInt(lastTwoDigitsStr);

            return selectedYears.some(yearLabel => {
                // Ví dụ: "Năm sinh 196x" -> 6, "Năm sinh 200x" -> 0
                const yearPrefixDigit = parseInt(yearLabel.slice(10, 11)); 

                if (yearLabel.includes('200x')) {
                     return lastTwoDigits >= 0 && lastTwoDigits <= 9; // 00-09
                } else {
                     const startDigit = yearPrefixDigit * 10; // e.g., 60
                     const endDigit = yearPrefixDigit * 10 + 9; // e.g., 69
                     return lastTwoDigits >= startDigit && lastTwoDigits <= endDigit;
                }
            });
        });
    }

    // 6. Filter by Date Range
    if ((activeTab === 'official' || activeTab === 'results') && (startDate || endDate)) {
        const parseDate = (dateString) => {
            if (!dateString) return null;
            const parts = dateString.split('-');
            // Sử dụng Date.UTC để tránh vấn đề múi giờ
            return new Date(Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])));
        };

        const start = startDate ? parseDate(startDate) : null;
        const end = endDate ? parseDate(endDate) : null;

        temp = temp.filter(item => {
            const auctionTimeString = getPlateAuctionTime(item).split(' ')[0]; // Lấy phần YYYY-MM-DD
            if (!auctionTimeString) return false; 

            const parts = auctionTimeString.split('-');
            const auctionDate = new Date(Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])));

            if (start && auctionDate < start) return false;
            if (end && auctionDate > end) return false;
            return true;
        });
    }

    // 7. Sort
    if (sortConfig !== null) {
        temp.sort((a, b) => {
            // Chỉ sort theo auctionTime vì đây là key duy nhất có thể sort trong bảng
            const dateA = new Date(getPlateAuctionTime(a));
            const dateB = new Date(getPlateAuctionTime(b));

            if (dateA < dateB) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (dateA > dateB) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }
    return temp;
}

function paginateData(data) {
    const { currentPage, itemsPerPage } = appState;
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return data.slice(firstPageIndex, lastPageIndex);
}

// --- EVENT HANDLERS (Global scope) ---

window.handleTabChange = function(tabName) {
    if (appState.activeTab === tabName) return;

    appState.activeTab = tabName;
    // Reset filters and pagination when changing tabs
    appState.searchTerm = '';
    appState.selectedProvince = '';
    appState.selectedTypes = [];
    appState.selectedAvoids = [];
    appState.selectedYears = [];
    appState.startDate = '';
    appState.endDate = '';
    appState.currentPage = 1;
    appState.sortConfig = null;
    // Tự động gọi renderApp()
    renderApp();
}

window.handleFilterChange = function(element) {
    const id = element.id;
    const value = element.value;

    appState[id] = value;
    appState.currentPage = 1;
    renderApp();
}

window.handleCheckboxChange = function(checkbox) {
    const type = checkbox.dataset.filterType;
    const value = checkbox.dataset.filterValue;
    const isChecked = checkbox.checked;
    
    if (type === 'selectedTypes' || type === 'selectedAvoids' || type === 'selectedYears') {
        let currentArray = appState[type];
        if (isChecked) {
            if (!currentArray.includes(value)) {
                appState[type] = [...currentArray, value];
            }
        } else {
            appState[type] = currentArray.filter(t => t !== value);
        }
        appState.currentPage = 1;
        renderApp();
    }
}

window.requestSort = function(key) {
    let direction = 'ascending';
    if (appState.sortConfig && appState.sortConfig.key === key && appState.sortConfig.direction === 'ascending') {
        direction = 'descending';
    }
    appState.sortConfig = { key, direction };
    appState.currentPage = 1;
    renderApp();
}

window.setCurrentPage = function(page) {
    const sourceData = getSourceData(appState.activeTab);
    const filteredAndSortedData = applyFiltersAndSort(sourceData);
    const totalPages = Math.ceil(filteredAndSortedData.length / appState.itemsPerPage);
    
    if (page >= 1 && page <= totalPages) {
        appState.currentPage = page;
        renderApp();
    }
}

window.setItemsPerPage = function(count) {
    const newCount = Number(count);
    appState.itemsPerPage = newCount;
    appState.currentPage = 1;
    renderApp();
}

window.handleNavClick = function(page) { 
    appState.activePage = page; 
    appState.mobileMenuOpen = false; 
    renderApp(); 
};

window.toggleSection = function(section) { 
    appState.openSections[section] = !appState.openSections[section]; 
    renderApp(); 
};

window.toggleMobileMenu = function() { 
    appState.mobileMenuOpen = !appState.mobileMenuOpen; 
    renderApp(); 
};

// --- MAIN RENDER FUNCTION ---
function renderApp() {
    const rootEl = document.getElementById('root');
    if (!rootEl) return;

    // 1. Tạo các container cần thiết nếu chưa có
    if (!document.getElementById('app-container')) {
        rootEl.innerHTML = `
            <div id="app-container" class="min-h-screen flex flex-col font-sans bg-gray-50">
                <div id="app-header-container"></div>
                <main id="app-main-content" class="flex-grow"></main>
                <div id="app-footer-container"></div>
                <div id="app-sticky-contact-container"></div>
            </div>
        `;
    }

    // 2. Render các phần tĩnh/chung
    document.getElementById('app-header-container').innerHTML = renderHeader();
    document.getElementById('app-footer-container').innerHTML = renderFooter();
    document.getElementById('app-sticky-contact-container').innerHTML = renderStickyContact();

    // 3. Render nội dung chính
    const mainContentEl = document.getElementById('app-main-content');
    
    let mainContentHTML;
    if (appState.activePage === 'motorbikes') {
        mainContentHTML = `
            ${renderPageBanner("Đấu giá biển số xe máy", "Nền tảng đấu giá trực tuyến chính thức, minh bạch và tin cậy.")}
            ${renderAuctionTable("Danh sách biển số xe máy", motorbikeAuctionResults, "motorbike-auction-table")}
        `;
    } else {
        mainContentHTML = `
            <div class="bg-gray-50 py-20 text-center">
                <h2 class="text-3xl font-bold text-gray-700">Trang "${appState.activePage}"</h2>
                <p class="mt-4 text-gray-500">Đây là nội dung placeholder. Vui lòng chuyển sang tab "Đấu giá biển số xe máy" để xem chức năng chính.</p>
            </div>
        `;
    }
    
    mainContentEl.innerHTML = mainContentHTML;

    // 4. Khởi tạo lại Lucide Icons cho toàn bộ nội dung mới
    if (typeof lucide !== 'undefined') {
        // Tắt lỗi nếu lucide không tồn tại trong môi trường test
        if (typeof lucide.createIcons === 'function') {
            lucide.createIcons();
        }
    }
}

// Initialize the application on page load
document.addEventListener('DOMContentLoaded', renderApp);