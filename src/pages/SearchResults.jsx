import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Loader2, 
  AlertCircle, 
  ChevronRight, 
  Pill,
  X
} from 'lucide-react';
import { searchDrugsData } from '../data/drugsData';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(query);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const drugs = await searchDrugsData(searchQuery, 50);
      setResults(drugs);
    } catch (err) {
      console.error('خطا در جستجو:', err);
      setError('خطا در جستجو. لطفاً دوباره تلاش کنید.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // جستجو هنگام تغییر query در URL
  useEffect(() => {
    if (query.trim()) {
      performSearch(query);
    } else {
      setResults([]);
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // به‌روزرسانی searchInput هنگام تغییر query
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchParams({});
    setResults([]);
  };

  const handleQuickSearch = (tagName) => {
    setSearchInput(tagName);
    setSearchParams({ q: tagName });
  };

  // کامپوننت هدر
  const PageHeader = () => (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition-colors"
        >
          <ChevronRight size={20} />
          بازگشت به صفحه اصلی
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          نتایج جستجو
        </h1>
        
        {query && (
          <p className="text-blue-100 text-lg">
            جستجو برای: <span className="font-bold">{query}</span>
          </p>
        )}
      </div>
    </div>
  );

  // کامپوننت فرم جستجو
  const SearchForm = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <Search className="text-blue-500" size={22} />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchInput.trim() && !loading) {
                handleSearch(e);
              }
            }}
            placeholder="مثال: آموکسی‌سیلین، سرماخوردگی، سردرد..."
            className="w-full py-4 pr-14 pl-20 text-base bg-gray-50 text-gray-800 rounded-xl border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
            dir="rtl"
            aria-label="جستجوی دارو"
            autoComplete="off"
            autoFocus
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute left-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="پاک کردن"
            >
              <X size={20} />
            </button>
          )}
          <button
            type="submit"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!searchInput.trim() || loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'جستجو'
            )}
          </button>
        </div>
      </form>

      {/* تگ‌های سریع */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-gray-600 text-sm mb-3">جستجوی سریع:</p>
        <div className="flex flex-wrap gap-2">
          {['مسکن', 'آنتی‌بیوتیک', 'ویتامین', 'گوارش', 'قلب'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleQuickSearch(tag)}
              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors text-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // کامپوننت کارت دارو
  const DrugCard = ({ drug }) => (
    <Link
      to={`/drug/${encodeURIComponent(drug.name)}`}
      className="
        bg-white rounded-xl border border-gray-200 
        p-6 shadow-sm hover:shadow-lg 
        transition-all duration-300 
        hover:border-blue-300 group
        block
      "
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-blue-600">
            {drug.name}
          </h3>
          {drug.englishName && (
            <p className="text-gray-500 text-sm mb-2">{drug.englishName}</p>
          )}
        </div>
        <Pill className="text-blue-500 group-hover:text-blue-600" size={24} />
      </div>

      <div className="space-y-2">
        {drug.category && (
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">دسته‌بندی:</span>
            <span className="text-gray-800 font-medium text-sm">{drug.category}</span>
          </div>
        )}
        
        {drug.usage && (
          <div>
            <span className="text-gray-600 text-sm">کاربرد:</span>
            <p className="text-gray-800 text-sm mt-1">{drug.usage}</p>
          </div>
        )}

        {drug.form && (
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">شکل:</span>
            <span className="text-gray-800 font-medium text-sm">{drug.form}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-blue-600 text-sm font-medium">
          <span>مشاهده جزئیات</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50"
      dir="rtl"
    >
      <PageHeader />

      <div className="container mx-auto px-4 py-8 -mt-8">
        <SearchForm />

        {/* حالت بارگذاری */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">در حال جستجو...</p>
          </div>
        )}

        {/* حالت خطا */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center mb-8">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-800 mb-2">خطا در جستجو</h3>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* نتایج */}
        {!loading && !error && query && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                نتایج جستجو
              </h2>
              <span className="text-sm text-gray-500">
                {results.length} نتیجه یافت شد
              </span>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((drug, index) => (
                  <DrugCard key={drug.id || index} drug={drug} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  نتیجه‌ای یافت نشد
                </h3>
                <p className="text-gray-500 mb-6">
                  هیچ دارویی با عبارت "{query}" پیدا نشد
                </p>
                <button
                  onClick={handleClearSearch}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  جستجوی جدید
                </button>
              </div>
            )}
          </div>
        )}

        {/* حالت اولیه (بدون جستجو) */}
        {!loading && !error && !query && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              جستجوی دارو
            </h3>
            <p className="text-gray-500">
              نام دارو، بیماری یا علائم خود را وارد کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

