import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Activity } from 'lucide-react';

// ثابت‌های خارج از کامپوننت
const CATEGORIES_DATA = [
  { 
    id: 1, 
    name: 'آنتی‌بیوتیک', 
    count: 247, 
    color: 'from-blue-500 to-blue-600',
    icon: '💊',
    sub: ['پنی‌سیلین', 'ماکرولید', 'کینولون'] 
  },
  { 
    id: 2, 
    name: 'مسکن و ضدالتهاب', 
    count: 186, 
    color: 'from-red-500 to-red-600',
    icon: '🩹',
    sub: ['NSAID', 'اپیوئید', 'تب‌بر'] 
  },
  { 
    id: 3, 
    name: 'داروهای گوارشی', 
    count: 142, 
    color: 'from-green-500 to-green-600',
    icon: '🍃',
    sub: ['PPI', 'آنتی‌هیستامین H2', 'ضد اسهال'] 
  },
  { 
    id: 4, 
    name: 'داروهای قلبی', 
    count: 198, 
    color: 'from-purple-500 to-purple-600',
    icon: '❤️',
    sub: ['استاتین', 'بتا بلوکر', 'ACE مهارکننده'] 
  },
  { 
    id: 5, 
    name: 'داروهای دیابت', 
    count: 134, 
    color: 'from-orange-500 to-orange-600',
    icon: '🩸',
    sub: ['بی‌گوانید', 'سولفونیل اوره', 'انسولین'] 
  },
  { 
    id: 6, 
    name: 'داروهای اعصاب', 
    count: 167, 
    color: 'from-indigo-500 to-indigo-600',
    icon: '🧠',
    sub: ['SSRI', 'بنزودیازپین', 'آنتی‌سایکوتیک'] 
  },
  { 
    id: 7, 
    name: 'آلرژی و تنفسی', 
    count: 124, 
    color: 'from-cyan-500 to-cyan-600',
    icon: '🌬️',
    sub: ['آنتی‌هیستامین', 'کورتون استنشاقی', 'برونکودیلاتور'] 
  },
  { 
    id: 8, 
    name: 'هورمون و غدد', 
    count: 98, 
    color: 'from-pink-500 to-pink-600',
    icon: '⚖️',
    sub: ['تیروئید', 'کورتون', 'هورمون جنسی'] 
  },
];

const STATS_DATA = [
  { value: '۵,۸۴۷', label: 'کل داروها', color: 'text-blue-600' },
  { value: '۸', label: 'دسته‌بندی اصلی', color: 'text-green-600' },
  { value: '۲۴', label: 'زیردسته‌بندی', color: 'text-purple-600' },
  { value: '۱۲', label: 'سازنده دارویی', color: 'text-orange-600' },
];

const DrugCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('جستجوی دسته‌بندی:', searchQuery);
      // در اینجا منطق جستجو را پیاده‌سازی کنید
    }
  };

  const filteredCategories = CATEGORIES_DATA.filter(category =>
    category.name.includes(searchQuery) ||
    category.sub.some(sub => sub.includes(searchQuery))
  );

  // کامپوننت هدر صفحه
  const PageHeader = () => (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl">
          <Link 
            to="/"
            className="
              inline-flex items-center gap-2 
              text-blue-100 hover:text-white 
              mb-6 transition-colors
              focus:outline-none focus:text-white
            "
          >
            <ChevronRight size={20} />
            بازگشت به صفحه اصلی
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            دسته‌بندی داروها
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            جستجو و فیلتر میان ۵,۸۴۷ داروی ثبت شده
          </p>
        </div>
      </div>
    </div>
  );

  // کامپوننت فرم جستجو
  const SearchBar = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSearch}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search 
              size={20} 
              className="
                absolute right-4 top-1/2 transform -translate-y-1/2 
                text-gray-400 pointer-events-none
              " 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی دسته‌بندی (مثال: آنتی‌بیوتیک، قلبی...)"
              className="
                w-full py-3 pr-12 pl-4 
                border border-gray-300 rounded-xl 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                outline-none transition-colors
              "
              dir="rtl"
              aria-label="جستجوی دسته‌بندی داروها"
            />
          </div>
          <button 
            type="submit"
            className="
              bg-gradient-to-r from-blue-600 to-blue-700 
              text-white px-8 py-3 rounded-xl 
              hover:from-blue-700 hover:to-blue-800 
              font-medium transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            disabled={!searchQuery.trim()}
          >
            جستجو
          </button>
        </div>
        {searchQuery && (
          <p className="text-sm text-gray-500 mt-3 text-center">
            {filteredCategories.length} دسته‌بندی یافت شد
          </p>
        )}
      </form>
    </div>
  );

  // کامپوننت کارت دسته‌بندی
  const CategoryCard = ({ category }) => (
    <Link
      to={`/drugs/${category.id}`}
      className="
        bg-white rounded-xl border border-gray-200 
        p-6 shadow-sm hover:shadow-lg 
        transition-all duration-300 
        hover:border-blue-300 group
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
      onClick={() => setSelectedCategory(category.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`
          w-14 h-14 rounded-xl 
          flex items-center justify-center
          bg-gradient-to-br ${category.color} 
          text-white text-2xl shadow-md
        `}>
          {category.icon}
        </div>
        <span className="text-sm font-medium text-gray-600">
          {category.count} دارو
        </span>
      </div>
      
      <h3 className="font-bold text-gray-800 text-lg mb-4 group-hover:text-blue-600">
        {category.name}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {category.sub.map((subItem, idx) => (
          <span 
            key={idx}
            className="
              text-xs bg-gray-50 text-gray-700 
              px-3 py-1.5 rounded-lg border border-gray-200
              group-hover:bg-blue-50 group-hover:text-blue-700
              transition-colors
            "
          >
            {subItem}
          </span>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="
          flex items-center justify-between 
          text-blue-600 text-sm font-medium
        ">
          <span>مشاهده داروها</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );

  // کامپوننت آمار
  const StatsSection = () => (
    <div className="
      bg-gradient-to-r from-blue-50 to-blue-100 
      border border-blue-200 rounded-2xl p-8
    ">
      <div className="flex items-center gap-3 mb-6">
        <Activity size={24} className="text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">📊 آمار دسته‌بندی‌ها</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS_DATA.map((stat, index) => (
          <div 
            key={index}
            className="
              text-center p-4 bg-white rounded-xl 
              border border-blue-100 shadow-sm
              hover:shadow-md transition-shadow
            "
          >
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50"
      dir="rtl"
    >
      <PageHeader />

      <div className="container mx-auto px-4 py-8 -mt-8">
        <SearchBar />

        {/* دسته‌بندی‌ها */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              دسته‌بندی‌های اصلی
            </h2>
            <span className="text-sm text-gray-500">
              مجموع: {CATEGORIES_DATA.length} دسته‌بندی
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                دسته‌بندی یافت نشد
              </h3>
              <p className="text-gray-500">
                هیچ دسته‌بندی با عبارت "{searchQuery}" پیدا نشد
              </p>
            </div>
          )}
        </div>

        <StatsSection />
      </div>
    </div>
  );
};

export default DrugCategories;