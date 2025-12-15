// src/services/gapgptApi.js
// سرویس API برای ارتباط با GapGPT API

const GAPGPT_BASE_URL = 'https://api.gapgpt.app/v1';
const GAPGPT_API_KEY = import.meta.env.VITE_GAPGPT_API_KEY || '';

/**
 * ارسال درخواست به API GapGPT
 * @param {string} prompt - متن درخواست (پرامپت)
 * @param {string} model - مدل مورد استفاده (پیش‌فرض: gpt-4o)
 * @returns {Promise<Object>} پاسخ API
 */
export const callGapGPT = async (prompt, model = 'gpt-4o') => {
  if (!GAPGPT_API_KEY) {
    throw new Error('کلید API GapGPT تنظیم نشده است. لطفاً VITE_GAPGPT_API_KEY را در فایل .env تنظیم کنید.');
  }

  try {
    const response = await fetch(`${GAPGPT_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GAPGPT_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || 
        `خطا در ارتباط با API: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('فرمت پاسخ API نامعتبر است');
    }

    return {
      content: data.choices[0].message.content,
      usage: data.usage,
      model: data.model
    };
  } catch (error) {
    console.error('خطا در فراخوانی GapGPT API:', error);
    throw error;
  }
};

/**
 * پرامپت حرفه‌ای برای دریافت اطلاعات دارو
 * @param {string} drugName - نام دارو
 * @param {string} language - زبان پاسخ (پیش‌فرض: فارسی)
 * @returns {string} پرامپت کامل
 */
export const getDrugInfoPrompt = (drugName, language = 'فارسی') => {
  return `شما یک متخصص داروسازی و اطلاعات دارویی هستید. لطفاً اطلاعات کامل و دقیق درباره داروی "${drugName}" را به زبان ${language} ارائه دهید.

لطفاً اطلاعات را در قالب JSON با ساختار زیر برگردانید:

{
  "name": "نام فارسی دارو",
  "englishName": "نام انگلیسی دارو",
  "category": "دسته‌بندی اصلی",
  "subCategory": "زیردسته‌بندی",
  "dosage": "دوز و شکل دارو (مثال: قرص 500mg)",
  "type": "نوع مصرف (خوراکی، تزریقی، موضعی و ...)",
  "form": "شکل دارو (قرص، کپسول، شربت و ...)",
  "usage": "کاربرد اصلی دارو",
  "description": "توضیحات کامل درباره دارو",
  "sideEffects": ["عوارض جانبی 1", "عوارض جانبی 2", ...],
  "seriousSideEffects": ["عوارض جدی 1", "عوارض جدی 2", ...],
  "warnings": "هشدارها و نکات مهم",
  "pregnancy": "گروه بارداری (A, B, C, D, X)",
  "interactions": ["تداخل دارویی 1", "تداخل دارویی 2", ...],
  "storage": "شرایط نگهداری",
  "manufacturer": "سازنده دارو (در صورت موجود بودن)",
  "tags": ["تگ 1", "تگ 2", ...]
}

نکات مهم:
- تمام اطلاعات باید دقیق و علمی باشند
- در صورت عدم اطلاع از اطلاعات خاص، مقدار null یا "نامشخص" قرار دهید
- عوارض جانبی را به ترتیب اهمیت و شیوع فهرست کنید
- اطلاعات باید بر اساس منابع معتبر دارویی باشد
- پاسخ را فقط به صورت JSON خالص برگردانید، بدون توضیحات اضافی`;
};

/**
 * پرامپت برای دریافت لیست دسته‌بندی‌های دارو
 * @param {string} language - زبان پاسخ (پیش‌فرض: فارسی)
 * @returns {string} پرامپت کامل
 */
export const getDrugCategoriesPrompt = (language = 'فارسی') => {
  return `شما یک متخصص داروسازی هستید. لطفاً لیست کامل دسته‌بندی‌های اصلی داروهای ایران را به زبان ${language} ارائه دهید.

لطفاً اطلاعات را در قالب JSON با ساختار زیر برگردانید:

{
  "categories": [
    {
      "id": 1,
      "name": "نام دسته‌بندی",
      "count": تعداد تقریبی داروها,
      "color": "کلاس رنگ برای UI (مثال: from-blue-500 to-blue-600)",
      "icon": "ایموجی مناسب",
      "sub": ["زیردسته 1", "زیردسته 2", ...]
    },
    ...
  ],
  "stats": {
    "totalDrugs": "تعداد کل داروها",
    "totalCategories": "تعداد دسته‌بندی‌ها",
    "totalSubCategories": "تعداد زیردسته‌بندی‌ها",
    "totalManufacturers": "تعداد سازندگان"
  }
}

نکات مهم:
- دسته‌بندی‌های اصلی داروهای ایران را شامل شود (آنتی‌بیوتیک، مسکن، گوارشی، قلبی، دیابت، اعصاب، آلرژی، هورمون و ...)
- برای هر دسته، زیردسته‌های مهم را فهرست کنید
- تعداد تقریبی داروها را بر اساس آمار واقعی ارائه دهید
- پاسخ را فقط به صورت JSON خالص برگردانید، بدون توضیحات اضافی`;
};

/**
 * پرامپت برای جستجوی داروها
 * @param {string} searchQuery - عبارت جستجو
 * @param {number} limit - تعداد نتایج (پیش‌فرض: 20)
 * @param {string} language - زبان پاسخ (پیش‌فرض: فارسی)
 * @returns {string} پرامپت کامل
 */
export const getDrugSearchPrompt = (searchQuery, limit = 20, language = 'فارسی') => {
  return `شما یک متخصص داروسازی هستید. لطفاً داروهای مرتبط با عبارت "${searchQuery}" را جستجو و فهرست کنید.

لطفاً اطلاعات را در قالب JSON با ساختار زیر برگردانید:

{
  "drugs": [
    {
      "id": 1,
      "name": "نام فارسی دارو",
      "englishName": "نام انگلیسی",
      "category": "دسته‌بندی",
      "subCategory": "زیردسته",
      "dosage": "دوز",
      "form": "شکل دارو",
      "usage": "کاربرد",
      "manufacturer": "سازنده",
      "price": "قیمت تقریبی"
    },
    ...
  ],
  "total": تعداد کل نتایج,
  "query": "${searchQuery}"
}

نکات مهم:
- حداکثر ${limit} نتیجه برگردانید
- نتایج را بر اساس مرتبط‌ترین به عبارت جستجو مرتب کنید
- در صورت عدم یافتن نتیجه، آرایه خالی برگردانید
- پاسخ را فقط به صورت JSON خالص برگردانید، بدون توضیحات اضافی`;
};

/**
 * تجزیه پاسخ JSON از API
 * @param {string} content - محتوای پاسخ API
 * @returns {Object} داده‌های تجزیه شده
 */
export const parseJSONResponse = (content) => {
  try {
    // حذف markdown code blocks اگر وجود داشته باشد
    const cleanedContent = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    return JSON.parse(cleanedContent);
  } catch (error) {
    console.error('خطا در تجزیه JSON:', error);
    console.error('محتوای پاسخ:', content);
    throw new Error('فرمت پاسخ API نامعتبر است. پاسخ باید JSON باشد.');
  }
};

/**
 * دریافت اطلاعات یک دارو
 * @param {string} drugName - نام دارو
 * @returns {Promise<Object>} اطلاعات دارو
 */
export const getDrugInfo = async (drugName) => {
  const prompt = getDrugInfoPrompt(drugName);
  const response = await callGapGPT(prompt);
  return parseJSONResponse(response.content);
};

/**
 * دریافت لیست دسته‌بندی‌های دارو
 * @returns {Promise<Object>} لیست دسته‌بندی‌ها و آمار
 */
export const getDrugCategories = async () => {
  const prompt = getDrugCategoriesPrompt();
  const response = await callGapGPT(prompt);
  return parseJSONResponse(response.content);
};

/**
 * جستجوی داروها
 * @param {string} query - عبارت جستجو
 * @param {number} limit - تعداد نتایج
 * @returns {Promise<Object>} نتایج جستجو
 */
export const searchDrugs = async (query, limit = 20) => {
  const prompt = getDrugSearchPrompt(query, limit);
  const response = await callGapGPT(prompt);
  return parseJSONResponse(response.content);
};

