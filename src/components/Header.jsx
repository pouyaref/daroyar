import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  User,
  ShoppingCart,
  Bell,
  Menu,
  X
} from 'lucide-react';

// ثابت‌ها خارج از کامپوننت
const MENU_ITEMS = [
  { id: 'home', label: 'خانه', link: '/' },
  { id: 'categories', label: 'دسته‌بندی داروها', link: '/categories' },
  { id: 'articles', label: 'مقالات آموزشی', link: '/articles' },
  { id: 'qa', label: 'پرسش و پاسخ', link: '/qa' },
  { id: 'contact', label: 'تماس با ما', link: '/contact' },
];

const SCROLL_THRESHOLD = 10;
const DESKTOP_BREAKPOINT = 1024;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('خانه');
  const [isScrolled, setIsScrolled] = useState(false);

  // هندلر اسکرول
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  // هندلر تغییر سایز
  const handleResize = useCallback(() => {
    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // تمیزکردن ایونت‌ها
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  // هندلر کلیک آیتم منو
  const handleMenuItemClick = useCallback((label) => {
    setActiveItem(label);
    setIsMenuOpen(false);
  }, []);

  // کامپوننت لوگو
  const Logo = () => (
    <div className="flex items-center gap-3">
      <div 
        className="
          w-12 h-12 md:w-14 md:h-14 
          bg-gradient-to-br from-blue-100 to-blue-200 
          rounded-xl flex items-center justify-center shadow-sm
        "
      >
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">د</span>
        </div>
      </div>
      <div className="text-right">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          دارویار
        </h1>
        <p className="text-xs md:text-sm text-blue-600 mt-1">
          مرجع تخصصی اطلاعات دارویی
        </p>
      </div>
    </div>
  );

  // کامپوننت آیتم منوی دسکتاپ
  const DesktopMenuItem = ({ item }) => (
    <Link
      to={item.link}
      className={`
        px-5 py-3 rounded-xl mx-1 transition-all duration-300 
        font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50
        ${activeItem === item.label 
          ? 'text-blue-700 font-semibold border-b-2 border-blue-500' 
          : ''
        }
      `}
      onClick={() => setActiveItem(item.label)}
    >
      {item.label}
    </Link>
  );

  // کامپوننت آیتم منوی موبایل
  const MobileMenuItem = ({ item }) => (
    <Link
      to={item.link}
      className={`
        flex items-center px-6 py-4 transition-colors 
        border-b border-gray-50 last:border-b-0 text-base
        ${activeItem === item.label
          ? 'text-blue-700 bg-blue-50 font-medium'
          : 'text-gray-700 hover:bg-gray-50'
        }
      `}
      onClick={() => handleMenuItemClick(item.label)}
    >
      <span className="mr-3">{item.label}</span>
      {activeItem === item.label && (
        <div className="mr-auto w-2 h-2 rounded-full bg-blue-500"></div>
      )}
    </Link>
  );

  // کامپوننت آیکون با نوتیفیکیشن
  const NotificationIcon = ({ icon: Icon, showBadge = false, badgeColor = 'bg-red-500' }) => (
    <button 
      className="
        hidden md:flex items-center justify-center 
        w-10 h-10 rounded-full text-gray-600 
        hover:text-blue-600 hover:bg-blue-50 
        transition-colors relative
      "
    >
      <Icon size={20} />
      {showBadge && (
        <span 
          className={`
            absolute -top-1 -left-1 w-3 h-3 
            ${badgeColor} rounded-full border-2 border-white
          `}
        />
      )}
    </button>
  );

  // کامپوننت دکمه منو موبایل
  const MobileMenuButton = () => (
    <button
      className="
        lg:hidden flex items-center justify-center 
        w-10 h-10 rounded-full text-gray-700 
        hover:bg-blue-100 transition-colors
      "
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو'}
    >
      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  return (
    <header 
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-gradient-to-b from-white to-blue-50'
        }
      `}
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* لوگو */}
          <Logo />

          {/* منوی دسکتاپ */}
          <nav className="hidden lg:flex items-center gap-1">
            {MENU_ITEMS.map((item) => (
              <DesktopMenuItem key={item.id} item={item} />
            ))}
          </nav>

          {/* بخش آیکون‌های کاربر */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              className="
                flex items-center justify-center 
                w-10 h-10 rounded-full text-gray-600 
                hover:text-blue-600 hover:bg-blue-50 
                transition-colors
              "
              aria-label="جستجو"
            >
              <Search size={20} />
            </button>
            
            <NotificationIcon 
              icon={Bell} 
              showBadge 
            />
            
            <NotificationIcon 
              icon={ShoppingCart} 
              showBadge 
              badgeColor="bg-green-500" 
            />
            
            <button 
              className="
                flex items-center gap-2 px-4 py-2 
                bg-gradient-to-r from-blue-600 to-blue-700 
                text-white rounded-xl hover:from-blue-700 
                hover:to-blue-800 transition-all shadow-sm
              "
            >
              <User size={18} />
              <span className="text-sm font-medium hidden sm:inline">
                ورود
              </span>
            </button>

            <MobileMenuButton />
          </div>
        </div>
      </div>

      {/* منوی موبایل */}
      <div
        className={`
          lg:hidden absolute top-full right-0 left-0 
          bg-white shadow-xl z-50 overflow-hidden 
          transition-all duration-300 border-t border-gray-100
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="py-3">
          {MENU_ITEMS.map((item) => (
            <MobileMenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* خط تزئینی پایینی */}
      <div className="h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />
    </header>
  );
};

export default Header;