import { LiquidButton } from './ui/liquid-glass-button';
import React from 'react';
import { Mail, Phone, MapPin, Shield, HelpCircle, Briefcase, Award, ExternalLink } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  setTab: (tab: string) => void;
  onOpenPortal: () => void;
  lang: 'RU' | 'EN';
}

export default function Footer({ setTab, onOpenPortal, lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="global-footer" className="bg-neutral-950 text-gray-400 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* ABOUT COLUMN */}
          <div className="space-y-4">
            <Logo
              variant="dark"
              showText={true}
              size={56}
              onClick={() => setTab('main')}
              lang={lang}
              className="cursor-pointer"
            />
            <p className="text-xs leading-relaxed text-gray-500">
              {lang === 'RU' 
                ? 'Динамичный международный биотехнологический холдинг. Свыше 30 лет обеспечиваем качественное лидерство в сфере поставок медицинского оборудования, лекарственных средств и эстетической косметологии по всей территории России.' 
                : 'International biotechnological holding. Providing comprehensive medical distribution, pharmaceuticals, equipment, and training services for over 30 years across the Russian Federation.'}
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>ИНН: 7813084341</div>
              <div>ОГРН: 1027806864149</div>
            </div>
          </div>

          {/* QUICK NAVIGATION */}
          <div>
            <h4 className="text-white text-xs font-display font-semibold uppercase tracking-[0.2em] mb-4">
              {lang === 'RU' ? 'Разделы сайта' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'main', label: lang === 'RU' ? 'Главная страница' : 'Home Page' },
                { id: 'direction', label: lang === 'RU' ? 'Направления деятельности' : 'Business Divisions' },
                { id: 'press', label: lang === 'RU' ? 'Пресс-центр и новости' : 'Press & News' },
                { id: 'education', label: lang === 'RU' ? 'Календарь обучения' : 'Education Events' },
                { id: 'contacts', label: lang === 'RU' ? 'Контакты и офисы' : 'Contacts' },
              ].map((link) => (
                <li key={link.id}>
                  <LiquidButton
                    onClick={() => setTab(link.id)}
                    className="hover:text-brand-teal transition-colors text-left text-xs font-sans font-medium"
                  >
                    {link.label}
                  </LiquidButton>
                </li>
              ))}
            </ul>
          </div>
 
          {/* B2B PORTAL EXTRAS */}
          <div>
            <h4 className="text-white text-xs font-display font-semibold uppercase tracking-[0.2em] mb-4">
              {lang === 'RU' ? 'Закрытые системы B2B' : 'B2B Secure Portal'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <LiquidButton
                  onClick={onOpenPortal}
                  className="flex items-center space-x-1 hover:text-brand-teal text-xs transition-colors font-sans font-medium cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{lang === 'RU' ? 'Вход в личный кабинет БСС' : 'B2B Client Sign In'}</span>
                </LiquidButton>
              </li>
              <li>
                <a
                  href="#privacy"
                  onClick={(e) => { e.preventDefault(); }}
                  className="hover:text-brand-teal transition-colors text-xs font-sans font-light"
                >
                  {lang === 'RU' ? 'Политика обработки персональных данных' : 'Privacy & Cookie Policy'}
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  onClick={(e) => { e.preventDefault(); }}
                  className="hover:text-brand-teal transition-colors text-xs font-sans font-light"
                >
                  {lang === 'RU' ? 'Пользовательское соглашение' : 'User Agreement'}
                </a>
              </li>
              <li className="pt-2">
                <div className="inline-flex items-center space-x-1 bg-brand-teal-dark/30 px-3 py-1 rounded-sm text-[9px] text-[#00A8E8] font-bold uppercase tracking-[0.2em] border border-brand-teal/20">
                  <Award className="w-3 h-3 text-brand-teal" />
                  <span>{lang === 'RU' ? '30 лет надежности' : '30 Years of trust'}</span>
                </div>
              </li>
            </ul>
          </div>
 
          {/* CENTRAL SUPPORT CONTACTS */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-display font-semibold uppercase tracking-[0.2em] mb-4">
              {lang === 'RU' ? 'Связь с центром' : 'Central Contacts'}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                <span>197375, Санкт-Петербург, ул. Маршала Новикова, д. 28, к. 2</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-teal flex-shrink-0" />
                <a href="tel:+78123277474" className="hover:text-white transition-colors">+7 (812) 327-74-74</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-teal flex-shrink-0" />
                <a href="mailto:office@bsspharm.ru" className="hover:text-white transition-colors">office@bsspharm.ru</a>
              </div>
            </div>
            
            <div className="pt-2 border-t border-white/5 flex space-x-3 text-xs">
              <span className="text-gray-600">Telegram • VK • Dzen</span>
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL ROW */}
        <div className="border-t border-white/5 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600">
          <p>© {currentYear} ООО «БСС». {lang === 'RU' ? 'Все права защищены холдингом.' : 'All rights reserved BSS Holding.'}</p>
          <p className="mt-2 sm:mt-0">
            {lang === 'RU' ? 'Лицензия на фармацевтическую деятельность № ФС-99-02-008112' : 'Pharma License FS-99-02-008112'}
          </p>
        </div>

      </div>
    </footer>
  );
}
