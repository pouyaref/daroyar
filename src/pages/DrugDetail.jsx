import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Loader2, AlertCircle, Pill, AlertTriangle } from 'lucide-react';
import { getDrugData } from '../data/drugsData';

const DrugDetail = () => {
  const { id } = useParams();
  const [drug, setDrug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDrug = async () => {
      try {
        setLoading(true);
        setError(null);
        // استفاده از id به عنوان نام دارو (می‌توانید منطق را تغییر دهید)
        const drugData = await getDrugData(id);
        if (drugData) {
          setDrug(drugData);
        } else {
          setError('دارو یافت نشد');
        }
      } catch (err) {
        console.error('خطا در بارگذاری دارو:', err);
        setError('خطا در بارگذاری اطلاعات دارو');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDrug();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">در حال بارگذاری اطلاعات دارو...</p>
        </div>
      </div>
    );
  }

  if (error || !drug) {
    return (
      <div className="min-h-screen bg-white py-12" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-800 mb-2">خطا</h3>
            <p className="text-red-600 mb-4">{error || 'دارو یافت نشد'}</p>
            <Link
              to="/categories"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block"
            >
              بازگشت به دسته‌بندی‌ها
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <Link 
            to="/categories"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition-colors"
          >
            <ChevronRight size={20} />
            بازگشت به دسته‌بندی‌ها
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{drug.name}</h1>
          {drug.englishName && (
            <p className="text-blue-100 text-lg">{drug.englishName}</p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Pill className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">اطلاعات کلی</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="text-gray-600">دسته‌بندی:</span>
              <p className="font-bold text-gray-800">{drug.category || 'نامشخص'}</p>
            </div>
            <div>
              <span className="text-gray-600">زیردسته:</span>
              <p className="font-bold text-gray-800">{drug.subCategory || 'نامشخص'}</p>
            </div>
            <div>
              <span className="text-gray-600">شکل دارو:</span>
              <p className="font-bold text-gray-800">{drug.form || 'نامشخص'}</p>
            </div>
            <div>
              <span className="text-gray-600">دوز:</span>
              <p className="font-bold text-gray-800">{drug.dosage || 'نامشخص'}</p>
            </div>
            <div>
              <span className="text-gray-600">نوع مصرف:</span>
              <p className="font-bold text-gray-800">{drug.type || 'نامشخص'}</p>
            </div>
            {drug.manufacturer && (
              <div>
                <span className="text-gray-600">سازنده:</span>
                <p className="font-bold text-gray-800">{drug.manufacturer}</p>
              </div>
            )}
          </div>
        </div>

        {drug.description && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">توضیحات</h2>
            <p className="text-gray-700 leading-relaxed">{drug.description}</p>
          </div>
        )}

        {drug.usage && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">کاربرد</h2>
            <p className="text-gray-700">{drug.usage}</p>
          </div>
        )}

        {drug.sideEffects && drug.sideEffects.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">عوارض جانبی</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {drug.sideEffects.map((effect, index) => (
                <li key={index}>{effect}</li>
              ))}
            </ul>
          </div>
        )}

        {drug.seriousSideEffects && drug.seriousSideEffects.length > 0 && drug.seriousSideEffects[0] !== 'ندارد' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-yellow-600" size={24} />
              <h2 className="text-2xl font-bold text-yellow-800">عوارض جدی</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-yellow-900">
              {drug.seriousSideEffects.map((effect, index) => (
                <li key={index}>{effect}</li>
              ))}
            </ul>
          </div>
        )}

        {drug.warnings && (
          <div className="bg-red-50 border border-red-200 rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-red-800 mb-4">هشدارها</h2>
            <p className="text-red-900">{drug.warnings}</p>
          </div>
        )}

        {drug.interactions && drug.interactions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">تداخلات دارویی</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {drug.interactions.map((interaction, index) => (
                <li key={index}>{interaction}</li>
              ))}
            </ul>
          </div>
        )}

        {drug.storage && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">شرایط نگهداری</h2>
            <p className="text-gray-700">{drug.storage}</p>
          </div>
        )}

        {drug.pregnancy && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">گروه بارداری</h2>
            <p className="text-gray-700">{drug.pregnancy}</p>
          </div>
        )}

        {drug.tags && drug.tags.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">برچسب‌ها</h2>
            <div className="flex flex-wrap gap-2">
              {drug.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrugDetail;