// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ========== IMPORT COMPONENTS ==========
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import DrugCategories from './pages/DrugCategories';
import DrugDetail from './pages/DrugDetail';
import SearchResults from './pages/SearchResults';
import Articles from './pages/Articles';
import QAPage from './pages/QAPage';
import Contact from './pages/Contact';

// ========== MAIN APP COMPONENT ==========
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col" dir="rtl">
        {/* Header - در همه صفحات نمایش داده می‌شود */}
        <Header />
        
        {/* Main Content - بر اساس مسیر تغییر می‌کند */}
        <main className="flex-grow">
          <Routes>
            {/* صفحه اصلی */}
            <Route path="/" element={<HeroSection />} />
            
            {/* دسته‌بندی داروها */}
            <Route path="/categories" element={<DrugCategories />} />
            
            {/* نتایج جستجو */}
            <Route path="/search" element={<SearchResults />} />
            
            {/* جزئیات دارو */}
            <Route path="/drug/:id" element={<DrugDetail />} />
            
            {/* مقالات آموزشی */}
            <Route path="/articles" element={<Articles />} />
            
            {/* پرسش و پاسخ */}
            <Route path="/qa" element={<QAPage />} />
            
            {/* تماس با ما */}
            <Route path="/contact" element={<Contact />} />
            
            {/* صفحه 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Footer - در همه صفحات نمایش داده می‌شود */}
        <Footer />
      </div>
    </Router>
  );
}

// ========== 404 PAGE ==========
const NotFound = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">۴۰۴</h1>
      <p className="text-gray-600 mb-6">صفحه مورد نظر یافت نشد</p>
      <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        بازگشت به صفحه اصلی
      </a>
    </div>
  </div>
);

export default App;