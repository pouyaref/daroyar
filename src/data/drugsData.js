// src/data/drugsData.js
// این فایل اکنون از API GapGPT برای دریافت اطلاعات دارو استفاده می‌کند
// به جای داده‌های هاردکد شده

import { searchDrugs, getDrugInfo } from '../services/gapgptApi';

/**
 * جستجوی داروها از طریق API
 * @param {string} query - عبارت جستجو
 * @param {number} limit - تعداد نتایج
 * @returns {Promise<Array>} لیست داروهای یافت شده
 */
export const searchDrugsData = async (query, limit = 20) => {
  try {
    const result = await searchDrugs(query, limit);
    return result.drugs || [];
  } catch (error) {
    console.error('خطا در جستجوی داروها:', error);
    // در صورت خطا، آرایه خالی برگردانید
    return [];
  }
};

/**
 * دریافت اطلاعات یک دارو از طریق API
 * @param {string} drugName - نام دارو
 * @returns {Promise<Object|null>} اطلاعات دارو
 */
export const getDrugData = async (drugName) => {
  try {
    const drugInfo = await getDrugInfo(drugName);
    return drugInfo;
  } catch (error) {
    console.error('خطا در دریافت اطلاعات دارو:', error);
    return null;
  }
};

/**
 * دریافت لیست داروها بر اساس دسته‌بندی
 * @param {string} category - دسته‌بندی دارو
 * @param {number} limit - تعداد نتایج
 * @returns {Promise<Array>} لیست داروها
 */
export const getDrugsByCategory = async (category, limit = 50) => {
  try {
    const query = `داروهای دسته ${category}`;
    const result = await searchDrugs(query, limit);
    return result.drugs || [];
  } catch (error) {
    console.error('خطا در دریافت داروهای دسته‌بندی:', error);
    return [];
  }
};

// برای سازگاری با کدهای قدیمی، یک آرایه خالی
// توجه: این آرایه دیگر داده‌های هاردکد شده برنمی‌گرداند
export const drugsData = [];

// تابع برای بارگذاری اولیه داروها (اختیاری)
export const loadInitialDrugs = async (limit = 100) => {
  try {
    const result = await searchDrugs('داروهای رایج ایران', limit);
    return result.drugs || [];
  } catch (error) {
    console.error('خطا در بارگذاری داروهای اولیه:', error);
    return [];
  }
};
