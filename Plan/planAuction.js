// KHÔNG CẦN import React, { useState } from 'react';
// KHÔNG CẦN import cho các icons (đã được định nghĩa bằng React.createElement bên dưới)
// React, useState, và ReactDOM đã được tải qua CDN và có sẵn.

const useState = React.useState;

// Giả lập các biểu tượng từ lucide-react.
// Lưu ý: Các component này được định nghĩa lại bằng React.createElement để tương thích tốt hơn với Babel standalone và CDN.
const Search = (props) => React.createElement('svg', { ...props, 'aria-label': 'Search icon', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props.size && { width: props.size, height: props.size }, dangerouslySetInnerHTML: { __html: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' } });
const Menu = (props) => React.createElement('svg', { ...props, 'aria-label': 'Menu icon', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props.size && { width: props.size, height: props.size }, dangerouslySetInnerHTML: { __html: '<line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/>' } });
const X = (props) => React.createElement('svg', { ...props, 'aria-label': 'Close icon', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props.size && { width: props.size, height: props.size }, dangerouslySetInnerHTML: { __html: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' } });
const User = (props) => React.createElement('svg', { ...props, 'aria-label': 'User icon', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props.size && { width: props.size, height: props.size }, dangerouslySetInnerHTML: { __html: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' } });
const MapPin = (props) => React.createElement('svg', { ...props, 'aria-label': 'Map pin icon', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props.size && { width: props.size, height: props.size }, dangerouslySetInnerHTML: { __html: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>' } });
const Phone = (props) => React.createElement('svg', { ...props, 'aria-label': 'Phone icon', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props.size && { width: props.size, height: props.size }, dangerouslySetInnerHTML: { __html: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-7.53-7.53A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4.18 2h3c.38 0 .74.15 1.01.44l3.52 3.52a2 2 0 0 1 0 2.83l-1.84 1.84a1.5 1.5 0 0 0 0 2.12l4.7 4.7a1.5 1.5 0 0 0 2.12 0l1.84-1.84a2 2 0 0 1 2.83 0l3.52 3.52c.29.27.44.63.44 1.01v.01z"/>' } });
const Mail = (props) => React.createElement('svg', { ...props, 'aria-label': 'Mail icon', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props.size && { width: props.size, height: props.size }, dangerouslySetInnerHTML: { __html: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' } });
const Facebook = (props) => React.createElement('svg', { ...props, 'aria-label': 'Facebook icon', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props.size && { width: props.size, height: props.size }, dangerouslySetInnerHTML: { __html: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' } });
const Calendar = (props) => React.createElement('svg', { ...props, 'aria-label': 'Calendar icon', viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...props.size && { width: props.size, height: props.size }, dangerouslySetInnerHTML: { __html: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' } });


// --- MOCK DATA AND TYPES ---

/**
 * @typedef {object} NewsItem
 * @property {number} id - ID duy nhất.
 * @property {string} title - Tiêu đề tài liệu/thông báo.
 * @property {string} date - Ngày và giờ ban hành (ví dụ: "10:00 28/11/2025").
 */

/** @type {NewsItem[]} */
const MOCK_NOTIF_DATA = [
    { id: 1, title: "Kế hoạch đấu giá biển số xe ô tô đợt 5/2025", date: "10:00 28/11/2025" },
    { id: 2, title: "Thông báo về việc thay đổi lịch đấu giá các ngày trong tháng 11/2025", date: "16:34 25/11/2025" },
    { id: 3, title: "Quyết định phê duyệt danh sách các biển số xe ô tô đưa ra đấu giá (22/11/2025)", date: "09:15 22/11/2025" },
    { id: 4, title: "Danh sách đấu giá tài sản quý 4 năm 2025", date: "11:00 15/11/2025" },
    { id: 5, title: "Biểu phí và lệ phí tham gia đấu giá mới áp dụng từ 01/12/2025", date: "14:20 10/11/2025" },
    { id: 6, title: "Hướng dẫn tham gia đấu giá trực tuyến cho người mới", date: "08:30 05/11/2025" },
];


// --- UTILITY COMPONENTS ---

/**
 * @param {{item: NewsItem}} props
 */
const NotificationRow = ({ item }) => {
    // Tách ngày khỏi giờ (ví dụ: "16:34 25/11/2025" -> "25/11/2025")
    const dateOnly = item.date?.split(' ')[1] || '';

    return (
        <div className="flex border-b border-gray-100 py-3 items-center text-sm transition-colors hover:bg-red-50/50">
            <div className="w-1/6 px-4 text-gray-700 font-medium whitespace-nowrap">{dateOnly}</div> {/* Cột Thời gian */}
            <div className="w-4/6 px-4 text-gray-800 font-medium">
                <a href="#" className="hover:text-[#be1e2d] transition-colors">{item.title}</a>
            </div> {/* Cột Tên tài liệu */}
            <div className="w-1/6 px-4 text-center">
                <a href="#" className="text-[#be1e2d] font-bold cursor-pointer hover:underline whitespace-nowrap text-xs sm:text-sm">
                    Tải xuống
                </a>
            </div>
        </div>
    );
};

/**
 * @param {{totalPages: number, currentPage: number}} props
 */
const Pagination = ({ totalPages, currentPage }) => {
    const pagesToShow = [1, 2, 3];
    const lastPage = totalPages;

    return (
        <div className="flex justify-end items-center mt-6">
            <div className="flex items-center gap-2 mr-4 text-sm hidden sm:flex">
                <span className="text-gray-600 font-medium">Xem</span>
                <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none text-gray-700">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
            </div>
            <div className="flex gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50" disabled={currentPage === 1}>&lt;</button>

                {pagesToShow.map(page => (
                    <button
                        key={page}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === currentPage
                                ? 'bg-[#be1e2d] text-white font-bold shadow-md'
                                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <span className="w-8 h-8 flex items-center justify-center text-gray-400 pb-2">...</span>

                {lastPage > pagesToShow.length && (
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-100">
                        {lastPage}
                    </button>
                )}

                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50" disabled={currentPage === lastPage}>&gt;</button>
            </div>
        </div>
    );
}

/**
 * @param {{notifData: NewsItem[]}} props
 */
const NotificationArchive = ({ notifData }) => {
    return (
        <div className="bg-gray-50 py-12 min-h-[70vh] w-full">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-extrabold text-[#be1e2d] mb-8 border-b-2 border-gray-200 pb-2">
                    Kế Hoạch & Tài Liệu Đấu Giá
                </h1>

                {/* Search and Filter Bar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="relative md:col-span-2">
                        <input
                            type="text"
                            placeholder="Tìm kiếm tài liệu"
                            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#be1e2d] focus:ring-1 focus:ring-[#be1e2d] shadow-md transition-shadow"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    </div>

                    {/* Input Ngày Bắt đầu */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tài liệu từ ngày"
                            onFocus={(e) => e.currentTarget.type = 'date'}
                            onBlur={(e) => e.currentTarget.type = 'text'}
                            className="w-full border border-gray-300 rounded-xl py-3 px-4 text-sm text-gray-500 focus:outline-none focus:border-[#be1e2d] appearance-none cursor-pointer shadow-md"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    {/* Input Ngày Kết thúc */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tài liệu đến ngày"
                            onFocus={(e) => e.currentTarget.type = 'date'}
                            onBlur={(e) => e.currentTarget.type = 'text'}
                            className="w-full border border-gray-300 rounded-xl py-3 px-4 text-sm text-gray-500 focus:outline-none focus:border-[#be1e2d] appearance-none cursor-pointer shadow-md"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                </div>

                {/* Table Header */}
                <div className="flex bg-[#be1e2d] text-white font-bold py-3 rounded-t-xl text-sm shadow-lg">
                    <div className="w-1/6 px-4">Thời gian</div>
                    <div className="w-4/6 px-4">Tên tài liệu</div>
                    <div className="w-1/6 px-4 text-center"></div>
                </div>

                {/* List Items */}
                <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl overflow-hidden shadow-xl">
                    {notifData.map(item => (
                        <NotificationRow key={item.id} item={item} />
                    ))}
                    {notifData.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Không tìm thấy tài liệu phù hợp.
                        </div>
                    )}
                </div>

                <Pagination totalPages={45} currentPage={1} />
            </div>
        </div>
    );
};

// --- HEADER COMPONENT ---

/**
 * @typedef {object} HeaderProps
 * @property {string} activePage - Trang hiện tại đang hoạt động.
 * @property {(page: string) => void} onNavigate - Hàm xử lý chuyển trang.
 */

/**
 * @param {HeaderProps} props
 */
const Header = ({ activePage, onNavigate }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Utility function for active navigation link styling
    const navClass = (page) =>
        `cursor-pointer transition-colors text-gray-700 ${activePage === page ? 'text-[#be1e2d] font-bold border-b-2 border-[#be1e2d]' : 'hover:text-[#be1e2d] border-b-2 border-transparent hover:border-red-300'}`;

    // Utility function for mobile navigation link styling
    const mobileNavClass = (page) =>
        `cursor-pointer py-3 px-4 transition-colors rounded-lg ${activePage === page ? 'text-white font-bold bg-[#be1e2d] shadow-md' : 'text-gray-700 hover:bg-gray-100'}`;

    // Handle navigation and close the mobile menu
    const handleNavClick = (page) => {
        onNavigate(page);
        setMobileMenuOpen(false);
    }

    return (
        <header className="w-full sticky top-0 z-50 shadow-lg">

            {/* Main Navigation Wrapper */}
            <div className="bg-white">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-red-600 rounded-lg flex items-center justify-center transform rotate-45 shadow-lg">
                            {/* Simple stylized 'V' shape for the logo */}
                            <div className="w-6 h-6 bg-white transform -rotate-45" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}></div>
                        </div>
                        <span className="text-3xl font-extrabold text-[#be1e2d] tracking-tight">VPA</span>
                    </div>

                    {/* Nav Links and Auth Block (Desktop Only) */}
                    <div className="hidden lg:flex items-center gap-8 font-medium text-sm xl:text-base">

                        {/* Nav Links */}
                        <nav className="flex items-center gap-6">
                            <span onClick={() => handleNavClick('home')} className={navClass('home')}>Trang chủ</span>
                            <span onClick={() => handleNavClick('cars')} className={navClass('cars')}>Đấu giá biển số xe ô tô</span>
                            <span onClick={() => handleNavClick('motorbikes')} className={navClass('motorbikes')}>Đấu giá biển số xe máy</span>
                            <span onClick={() => handleNavClick('assets')} className={navClass('assets')}>Đấu giá tài sản</span>
                            <span onClick={() => handleNavClick('news')} className={navClass('news')}>Tin tức</span>
                            <span onClick={() => handleNavClick('notifications')} className={navClass('notifications')}>Kế hoạch</span>
                        </nav>

                        {/* Authentication Links (Desktop) */}
                        <div className="flex items-center gap-4 pl-8 border-l border-gray-200">
                            <button
                                // Chuyển hướng đến trang 'login'
                                onClick={() => handleNavClick('login')}
                                className="flex items-center justify-center gap-2 text-white bg-[#be1e2d] px-5 py-2.5 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-md shadow-red-300/50 transform hover:scale-[1.02] active:scale-100 whitespace-nowrap text-sm"
                            >
                                <User size={18} /> Đăng nhập
                            </button>
                        </div>
                    </div>

                    {/* Mobile/Tablet Actions */}
                    <div className="flex items-center gap-4 lg:hidden">
                        {/* Mobile Menu Icon */}
                        <button className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    // Đảm bảo menu nằm trên các nội dung khác và có chiều rộng tối đa
                    <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 z-40 shadow-xl rounded-b-xl">
                        <div className="flex flex-col p-4 space-y-1 font-medium">

                            {/* Auth Links in Mobile Menu (High Priority) */}
                            <div className="flex items-center gap-4 pl-8 border-l border-gray-200">
                                <button
                                    onClick={() => handleNavClick('login')}
                                    data-page="login"
                                    className="nav-auth-button flex items-center justify-center gap-2 text-white bg-[#be1e2d] px-4 py-2 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-md shadow-red-300/50 transform hover:scale-[1.02] active:scale-100 whitespace-nowrap"
                                >
                                    <User size={18} /> Đăng nhập
                                </button>
                            </div>

                            {/* Main Nav Links in Mobile Menu */}
                            <span onClick={() => handleNavClick('home')} className={mobileNavClass('home')}>Trang chủ</span>
                            <span onClick={() => handleNavClick('cars')} className={mobileNavClass('cars')}>Đấu giá biển số xe ô tô</span>
                            <span onClick={() => handleNavClick('motorbikes')} className={mobileNavClass('motorbikes')}>Đấu giá biển số xe máy</span>
                            <span onClick={() => handleNavClick('assets')} className={mobileNavClass('assets')}>Đấu giá tài sản</span>
                            <span onClick={() => handleNavClick('news')} className={mobileNavClass('news')}>Tin tức</span>
                            <span onClick={() => handleNavClick('notifications')} className={mobileNavClass('notifications')}>Kế hoạch</span>
                            <span onClick={() => handleNavClick('about')} className={mobileNavClass('about')}>Giới thiệu</span>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};


// --- FOOTER COMPONENT ---

const Footer = () => {
    return (
        <footer className="bg-[#2a0a0a] text-white pt-16 pb-8 border-t-4 border-[#be1e2d]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

                    {/* Company Info */}
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-600 rounded-lg flex items-center justify-center transform rotate-45">
                                <div className="w-7 h-7 bg-[#2a0a0a] transform -rotate-45" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}></div>
                            </div>
                            <h2 className="text-4xl font-bold text-[#be1e2d]">VPA</h2>
                        </div>

                        <h3 className="text-xl font-bold mb-6">Công ty Đấu giá Hợp danh Việt Nam</h3>

                        <div className="space-y-4 text-sm text-gray-300">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-8 h-8 rounded-full bg-[#be1e2d]/20 flex items-center justify-center text-[#fbb03b] flex-shrink-0">
                                    <MapPin size={16} />
                                </div>
                                <div>
                                    <span className="text-[#fbb03b] font-bold block mb-1">Trụ sở chính:</span>
                                    NO2-T4.03, tầng 4 tòa nhà NO2 - TNL Plaza Goldseason, số 47 Nguyễn Tuân, phường Thanh Xuân Trung, quận Thanh Xuân, thành phố Hà Nội
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-transparent flex-shrink-0"></div>
                                <div>
                                    <span className="text-[#fbb03b] font-bold block mb-1">Chi nhánh HCM:</span>
                                    Số 466 Hai Bà Trưng, phường Tân Định, Thành phố Hồ Chí Minh
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#be1e2d]/20 flex items-center justify-center text-[#fbb03b] flex-shrink-0">
                                    <Phone size={16} />
                                </div>
                                <div>
                                    <span className="text-[#fbb03b] font-bold">Hotline CSKH:</span> 1900.0555.15
                                </div>
                            </div>
                            <div className="pl-11 text-gray-400">
                                Các số gọi ra: 024.9995.5515, 024.9996.8888 hoặc các đầu số tên "DAU GIA VN".
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#be1e2d]/20 flex items-center justify-center text-[#fbb03b] flex-shrink-0">
                                    <Mail size={16} />
                                </div>
                                <div>
                                    <span className="text-[#fbb03b] font-bold">Đấu giá biển số:</span> dgbs@vpa.com.vn
                                </div>
                            </div>
                            <div className="pl-11">
                                <span className="text-[#fbb03b] font-bold">Đấu giá tài sản:</span> dgts@vpa.com.vn
                            </div>
                            <div className="pl-11">
                                <span className="text-[#fbb03b] font-bold">Liên hệ hợp tác:</span> info@vpa.com.vn
                            </div>
                        </div>

                        <div className="mt-8 text-sm text-gray-400">
                            <p>Đại diện: Bà Lâm Thị Mai Anh - Chức vụ: Giám Đốc</p>
                            <p>Giấy chứng nhận ĐKHĐ: 41/TP-ĐKHĐ do Sở Tư pháp Hà Nội cấp ngày 21/01/2019</p>
                        </div>
                    </div>

                    {/* Social & Certs */}
                    <div className="lg:col-span-5 flex flex-col items-start lg:items-end">
                        <h3 className="text-lg font-bold mb-4 text-[#fbb03b]">Theo dõi chúng tôi trên</h3>
                        <div className="flex gap-4 mb-8">
                            <a href="#" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition shadow-lg">
                                <Facebook size={24} fill="white" />
                            </a>
                            <a href="#" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition font-bold text-xs flex items-center justify-center w-10 h-10 shadow-lg">
                                Zalo
                            </a>
                        </div>

                        <div className="mb-8 bg-white rounded-xl p-3 shadow-2xl">
                            <div className="border-2 border-red-500 flex items-center p-2 gap-2 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">✓</div>
                                <div className="text-red-600 font-bold leading-tight text-xs uppercase">
                                    Đã đăng ký<br />Bộ Công Thương
                                </div>
                            </div>
                        </div>

                        <div className="text-left w-full lg:text-right">
                            <h3 className="text-lg font-bold mb-4 text-[#fbb03b]">Chính sách</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-white transition-colors">• Chính sách bảo vệ dữ liệu cá nhân</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">• Điều khoản sử dụng</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">• Chính sách thanh toán</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 text-center md:text-left">
                    <p className="order-2 md:order-1 mt-4 md:mt-0">Bản quyền thuộc về VPA@2023</p>
                    <p className="order-1 md:order-2">Trang thông tin điện tử đấu giá trực tuyến vpa.com.vn đã được Sở Tư pháp thành phố Hà Nội phê duyệt đủ điều kiện thực hiện hình thức đấu giá trực tuyến theo Quyết định số 226/QĐ-STP ngày 16/3/2023</p>
                </div>
            </div>
        </footer>
    );
};

// --- STICKY CONTACT COMPONENT ---

const StickyContact = () => {
    return (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
            <a href="#" title="Facebook" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 flex items-center justify-center w-12 h-12">
                <Facebook size={24} fill="white" />
            </a>
            <a href="#" title="Zalo" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 flex items-center justify-center w-12 h-12">
                {/* Custom Zalo icon representation */}
                <div className="font-bold text-xs">Zalo</div>
            </a>
            <a href="tel:1900055515" title="Hotline" className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-xl transition-all hover:scale-110 flex items-center justify-center w-12 h-12 animate-pulse">
                <Phone size={24} fill="white" />
            </a>
        </div>
    );
};

// --- MAIN APPLICATION COMPONENT ---

const App = () => {
    // State để quản lý trang hiện tại
    const [activePage, setActivePage] = useState('notifications');

    // Dùng switch để render nội dung chính.
    // Vì yêu cầu là trang 'Kế hoạch', ta chỉ render NotificationArchive.
    const renderContent = () => {
        // Trong môi trường thực tế, bạn sẽ có các component khác cho 'home', 'cars', v.v.
        // Dùng NotificationArchive cho trang 'notifications'
        switch (activePage) {
            case 'notifications':
            case 'home': // Giả sử hiển thị nội dung này cho trang chủ tạm thời
            default:
                return <NotificationArchive notifData={MOCK_NOTIF_DATA} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header activePage={activePage} onNavigate={setActivePage} />

            <main className="flex-grow w-full">
                {renderContent()}
            </main>

            <Footer />

            <StickyContact />
        </div>
    );
};

// Vị trí render ứng dụng
const rootElement = document.getElementById('root');
if (rootElement) {
    // Sửa dụng ReactDOM.createRoot(rootElement).render() cho React 18
    // Đây là cú pháp chính xác khi đã tải Babel
    ReactDOM.createRoot(rootElement).render(<App />);
}