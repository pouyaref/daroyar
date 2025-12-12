import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, Heart } from 'lucide-react';

// ثابت‌ها خارج از کامپوننت
const FOOTER_LINKS = {
  خدمات: [
    { name: 'جستجوی دارو', link: '/search' },
    { name: 'دسته‌بندی داروها', link: '/categories' },
    { name: 'مقالات آموزشی', link: '/articles' },
    { name: 'مشاوره دارویی', link: '/consultation' },
  ],
  اطلاعات: [
    { name: 'درباره ما', link: '/about' },
    { name: 'تماس با ما', link: '/contact' },
    { name: 'قوانین و مقررات', link: '/rules' },
    { name: 'سوالات متداول', link: '/faq' },
  ],
  اپلیکیشن: [
    { name: 'دانلود برای اندروید', link: '/download/android' },
    { name: 'دانلود برای iOS', link: '/download/ios' },
    { name: 'نسخه وب', link: '/' },
  ],
};

const CONTACT_INFO = [
  { icon: Phone, text: '۰۲۱-۱۲۳۴۵۶۷۸', href: 'tel:02112345678' },
  { icon: Mail, text: 'info@daruvar.com', href: 'mailto:info@daruvar.com' },
  { icon: MapPin, text: 'تهران، خیابان ولیعصر' },
];

const SOCIAL_MEDIA = [
  { name: 'تلگرام', initial: 'ت', href: 'https://t.me/daruvar' },
  { name: 'اینستاگرام', initial: 'ا', href: 'https://instagram.com/daruvar' },
  { name: 'توییتر', initial: 'ت', href: 'https://twitter.com/daruvar' },
];

const LEGAL_LINKS = [
  { text: 'حریم خصوصی', link: '/privacy' },
  { text: 'شرایط استفاده', link: '/terms' },
  { text: 'نقشه سایت', link: '/sitemap' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const persianYear = currentYear - 621; // تبدیل به سال شمسی

  // کامپوننت هشدار امنیتی
  const SecurityAlert = () => (
    <div className="bg-yellow-900/50 border-b border-yellow-800/50" role="alert">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-3">
          <Shield size={20} className="text-yellow-400 flex-shrink-0" />
          <p className="text-sm text-yellow-100 text-center leading-relaxed">
            اطلاعات این سایت صرفاً آموزشی است. تشخیص و تجویز دارو تنها بر عهده پزشک معالج شماست.
          </p>
        </div>
      </div>
    </div>
  );

  // کامپوننت لوگو و توضیحات
  const LogoSection = () => (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-xl">د</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">دارویار</h2>
          <p className="text-blue-300 text-sm">مرجع اطلاعات دارویی</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
        جامع‌ترین مرجع اطلاعات دارویی به زبان فارسی، ارائه‌دهنده آخرین اطلاعات داروها و مقالات آموزشی.
      </p>
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <Heart size={16} className="text-red-400 flex-shrink-0" />
        <span>با اشتیاق برای سلامتی شما</span>
      </div>
    </div>
  );

  // کامپوننت ستون لینک‌ها
  const LinksColumn = ({ title, links }) => (
    <div>
      <h3 className="font-bold text-lg text-white mb-4 pb-2 border-b border-gray-700">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map(({ name, link }) => (
          <li key={name}>
            <Link 
              to={link}
              className="
                text-gray-400 hover:text-white transition-colors 
                text-sm flex items-center gap-2 group
                focus:outline-none focus:text-blue-300
              "
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover:scale-125 transition-transform" />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  // کامپوننت اطلاعات تماس
  const ContactInfo = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {CONTACT_INFO.map(({ icon: Icon, text, href }, index) => {
        const content = (
          <div className="flex items-center gap-3">
            <Icon size={18} className="text-blue-400 flex-shrink-0" />
            <span className="text-gray-300">{text}</span>
          </div>
        );

        return href ? (
          <a
            key={index}
            href={href}
            className="hover:text-blue-300 transition-colors"
          >
            {content}
          </a>
        ) : (
          <div key={index}>{content}</div>
        );
      })}
    </div>
  );

  // کامپوننت شبکه‌های اجتماعی
  const SocialMedia = () => (
    <div className="flex gap-3 justify-center">
      {SOCIAL_MEDIA.map(({ name, initial, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-10 h-10 bg-gray-700 hover:bg-gray-600 
            rounded-lg flex items-center justify-center 
            text-gray-300 hover:text-white 
            transition-all hover:scale-105
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
          aria-label={`${name} دارویار`}
        >
          {initial}
        </a>
      ))}
    </div>
  );

  // کامپوننت کپی رایت
  const Copyright = () => (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
      <p className="text-gray-500 text-sm">
        © {persianYear} دارویار - تمامی حقوق محفوظ است
      </p>
      <div className="flex gap-6 text-xs text-gray-500">
        {LEGAL_LINKS.map(({ text, link }) => (
          <Link
            key={text}
            to={link}
            className="
              hover:text-gray-300 transition-colors
              focus:outline-none focus:text-blue-300
            "
          >
            {text}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <footer 
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white mt-auto" 
      dir="rtl"
      role="contentinfo"
    >
      <SecurityAlert />

      {/* بخش اصلی فوتر */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <LogoSection />
          
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <LinksColumn key={title} title={title} links={links} />
          ))}
        </div>

        {/* اطلاعات تماس */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <ContactInfo />
        </div>

        {/* شبکه‌های اجتماعی */}
        <div className="mt-8">
          <SocialMedia />
        </div>
      </div>

      {/* کپی رایت */}
      <div className="bg-gray-900/80 py-6">
        <div className="container mx-auto px-4">
          <Copyright />
        </div>
      </div>
    </footer>
  );
};

export default Footer;