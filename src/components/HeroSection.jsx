import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  Shield, 
  Pill, 
  AlertTriangle, 
  ChevronDown 
} from 'lucide-react';

// ثابت‌ها خارج از کامپوننت
const QUICK_SEARCH_TAGS = [
  { name: 'مسکن', color: 'bg-gradient-to-r from-red-500 to-red-600' },
  { name: 'آنتی‌بیوتیک', color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
  { name: 'ویتامین', color: 'bg-gradient-to-r from-green-500 to-green-600' },
  { name: 'گوارش', color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
  { name: 'قلب', color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
];

const STATS_DATA = [
  { value: '۵,۸۴۷', label: 'داروی ثبت شده', color: 'text-blue-600' },
  { value: '۱۵۸,۴۲۳', label: 'کاربر فعال', color: 'text-green-600' },
  { value: '۹۸.۷٪', label: 'رضایت کاربران', color: 'text-purple-600' },
  { value: '۱,۳۲۴', label: 'مقاله آموزشی', color: 'text-orange-600' },
];

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // هدایت به صفحه نتایج جستجو
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickSearch = (tagName) => {
    setSearchQuery(tagName);
    // هدایت مستقیم به نتایج جستجو
    navigate(`/search?q=${encodeURIComponent(tagName)}`);
  };

  // کامپوننت پس‌زمینه
  const BackgroundShapes = () => (
    <div className="absolute inset-0 opacity-10" aria-hidden="true">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full -translate-y-48 translate-x-48" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full translate-y-40 -translate-x-40" />
    </div>
  );

  // کامپوننت بنر اعتماد
  const TrustBanner = () => (
    <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
      <Shield size={16} className="text-blue-600" />
      <span className="text-blue-700 text-sm font-medium">
        منبع معتبر وزارت بهداشت
      </span>
    </div>
  );

  // کامپوننت هشدار
  const WarningAlert = () => (
    <div className="max-w-2xl mx-auto mb-10 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle 
          size={20} 
          className="text-yellow-600 mt-0.5 flex-shrink-0" 
        />
        <p className="text-sm text-yellow-800">
          <span className="font-bold">توجه:</span> 
          اطلاعات این سایت صرفاً آموزشی است. برای مصرف دارو با پزشک مشورت کنید.
        </p>
      </div>
    </div>
  );

  // کامپوننت فرم جستجو
  const SearchForm = () => (
    <form onSubmit={handleSearch} className="space-y-6">
      {/* نوار جستجو */}
      <div className="relative">
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <Search className="text-blue-500" size={22} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchQuery.trim()) {
              handleSearch(e);
            }
          }}
          placeholder="مثال: آموکسی‌سیلین، سرماخوردگی، سردرد..."
          className="w-full py-4 pr-14 pl-4 text-base bg-gray-50 text-gray-800 rounded-xl border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
          dir="rtl"
          aria-label="جستجوی دارو"
          autoComplete="off"
        />
        <button
          type="submit"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!searchQuery.trim()}
        >
          جستجو
        </button>
      </div>

      {/* تگ‌های سریع */}
      <QuickSearchTags />
    </form>
  );

  // کامپوننت تگ‌های جستجوی سریع
  const QuickSearchTags = () => (
    <div className="text-center">
      <p className="text-gray-600 text-sm mb-3">جستجوی سریع:</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {QUICK_SEARCH_TAGS.map((tag) => (
          <button
            key={tag.name}
            type="button"
            onClick={() => handleQuickSearch(tag.name)}
            className={`
              px-3 py-1.5 ${tag.color} text-white rounded-full 
              hover:shadow-md transition-all text-sm
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current
            `}
            aria-label={`جستجوی ${tag.name}`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );

  // کامپوننت کارت آمار
  const StatCard = ({ value, label, color }) => (
    <div className="bg-white p-6 rounded-xl border text-center hover:shadow-md transition-shadow">
      <div className={`text-2xl md:text-3xl font-bold ${color} mb-2`}>
        {value}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );

  return (
    <section 
      className="relative min-h-[80vh] bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden" 
      dir="rtl"
      aria-label="بخش اصلی سایت دارویار"
    >
      <BackgroundShapes />

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        
        {/* عنوان اصلی */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <TrustBanner />
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            بانک اطلاعات دارویی
            <span className="block text-blue-600 mt-3">
              داروهای ایران
            </span>
          </h1>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            جستجوی هوشمند میان هزاران دارو با اطلاعات کامل عوارض و هشدارها
          </p>
        </div>

        <WarningAlert />

        {/* موتور جستجو */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                جستجوی دارو
              </h2>
              <p className="text-gray-600">
                نام دارو، بیماری یا علائم خود را وارد کنید
              </p>
            </div>
            
            <SearchForm />
          </div>
        </div>

        {/* دکمه‌های اقدام */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/categories"
            className="
              flex items-center justify-center gap-3 
              bg-gradient-to-r from-blue-600 to-blue-700 
              text-white px-8 py-4 rounded-xl text-lg 
              font-bold shadow-lg hover:shadow-xl 
              transition-all hover:scale-105 
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            <Pill size={22} />
            مشاهده همه دسته‌بندی‌ها
          </Link>
          
          <Link
            to="/articles"
            className="
              flex items-center justify-center gap-3 
              bg-white text-blue-600 border-2 border-blue-300 
              px-8 py-4 rounded-xl text-lg font-bold shadow-md 
              hover:bg-blue-50 transition-all
              focus:outline-none focus:ring-2 focus:ring-blue-300
            "
          >
            <BookOpen size={22} />
            مقالات آموزشی
          </Link>
        </div>

        {/* آمار */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS_DATA.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              color={stat.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;