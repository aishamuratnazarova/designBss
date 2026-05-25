import { LiquidButton } from './ui/liquid-glass-button';
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User, Search, ChevronDown, Check, Briefcase } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onOpenPortal: () => void;
  lang: 'RU' | 'EN';
  setLang: (lang: 'RU' | 'EN') => void;
}

export default function Header({ currentTab, setTab, onOpenPortal, lang, setLang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const navItems = [
    { id: 'main', label: lang === 'RU' ? 'Главная' : 'Home' },
    { id: 'direction', label: lang === 'RU' ? 'Направления' : 'Directions' },
    { id: 'press', label: lang === 'RU' ? 'Пресс-центр' : 'Press Center' },
    { id: 'education', label: lang === 'RU' ? 'Обучение' : 'Education' },
    { id: 'contacts', label: lang === 'RU' ? 'Контакты' : 'Contacts' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Simulate finding results on the website
    const term = searchQuery.toLowerCase();
    const mockResults: string[] = [];
    if (term.includes('космет') || term.includes('derm') || term.includes('инъе')) {
      mockResults.push('Обучение: "Применение индукторов коллагена" (9 июня)');
      mockResults.push('Направление: Эстетическая медицина и косметология');
    } else if (term.includes('аптек') || term.includes('алоэ')) {
      mockResults.push('Направление: Аптечная сеть «Алоэ» (более 650 аптек)');
      mockResults.push('Новость: Розничные аптечные продажи выросли на 18%');
    } else if (term.includes('склад') || term.includes('достав') || term.includes('лог')) {
      mockResults.push('Направление: Фармацевтическая логистика класса GDP');
      mockResults.push('Новость: Новый GDP-хаб в Екатеринбурге');
    } else if (term.includes('дзен') || term.includes('it') || term.includes('прогр')) {
      mockResults.push('Направление: IT-решения «Дзен Ай Ти»');
      mockResults.push('Новость: Платформа включена в реестр отечественного ПО');
    } else {
      mockResults.push('Направление: Фармацевтическая дистрибуция BSS');
      mockResults.push('Новость: Холдингу «БСС» исполняется 30 лет');
    }
    setSearchResults(mockResults);
  };

  const isDarkBg = false;

  return (
    <header
      id="global-header"
      className="absolute top-0 left-0 right-0 z-50 py-2"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* LOGO */}
          <Logo
            onClick={() => setTab('main')}
            size={36}
            showText={true}
            variant={isDarkBg ? 'light' : 'adaptive'}
            lang={lang}
            className="cursor-pointer group hover:opacity-80 transition-opacity"
          />

          {/* DESKTOP MENU */}
          <nav className={`hidden lg:flex items-center space-x-1 px-2 py-1 rounded-2xl ${isDarkBg ? 'bg-black/10 backdrop-blur-md border border-white/5' : 'bg-white/50 backdrop-blur-md border border-black/5 shadow-sm'}`}>
            {navItems.map((item) => (
              <LiquidButton
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => setTab(item.id)}
                className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 relative ${
                  currentTab === item.id
                    ? (isDarkBg ? 'text-white bg-white/10 shadow-sm' : 'text-brand-teal bg-white shadow-sm ring-1 ring-black/5')
                    : (isDarkBg ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-brand-teal hover:bg-black/5')
                }`}
              >
                {item.label}
              </LiquidButton>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Search toggler */}
            <LiquidButton
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className={`rounded-full transition-colors ${isDarkBg ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}`}
              title="Поиск на сайте"
            >
              <Search className="w-4 h-4" />
            </LiquidButton>

            {/* Language Selection */}
            <LiquidButton
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-colors border-0 ${isDarkBg ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}`}
            >
              <span className={lang === 'RU' ? (isDarkBg ? 'text-white' : 'text-brand-teal') : 'text-gray-400'}>RU</span>
              <span className="text-gray-400 mx-1">/</span>
              <span className={lang === 'EN' ? (isDarkBg ? 'text-white' : 'text-brand-teal') : 'text-gray-400'}>EN</span>
            </LiquidButton>

            {/* B2B Portal Button */}
            <LiquidButton
              variant="primary"
              onClick={onOpenPortal}
              className="px-5 py-2 hover:bg-brand-teal-hover transition-all cursor-pointer flex items-center space-x-2 rounded-xl text-[11px]"
            >
              <User className="w-3.5 h-3.5 text-white" />
              <span>{lang === 'RU' ? 'Личный кабинет' : 'B2B Portal'}</span>
            </LiquidButton>

          </div>

          {/* MOBILE MENU TRIGGER */}
          <div className="lg:hidden flex items-center space-x-2">
            <LiquidButton
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')}
              className={`px-2 py-1 rounded-xl text-[10px] font-bold uppercase ${isDarkBg ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}`}
            >
              {lang}
            </LiquidButton>

            <LiquidButton
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className={`rounded-xl ${isDarkBg ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}`}
            >
              <Search className="w-5 h-5" />
            </LiquidButton>

            <LiquidButton
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`rounded-xl transition-colors ${isDarkBg ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </LiquidButton>
          </div>

        </div>
      </div>

      {/* SEARCH DROP-DOWN overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl p-4 text-black animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={lang === 'RU' ? 'Введите поисковый запрос (например: косметология, аптека, склад)...' : 'Type to search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm"
                autoFocus
              />
              <LiquidButton
                type="submit"
                className="px-4 py-2 bg-brand-teal text-white rounded-lg text-sm font-semibold hover:bg-brand-teal-hover"
              >
                {lang === 'RU' ? 'Найти' : 'Search'}
              </LiquidButton>
              <LiquidButton
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="px-3 py-2 text-gray-500 hover:text-black text-sm"
              >
                {lang === 'RU' ? 'Закрыть' : 'Close'}
              </LiquidButton>
            </form>

            {/* Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-wider">
                  {lang === 'RU' ? 'Найденные соответствия:' : 'Results matching:'}
                </p>
                <div className="space-y-2">
                  {searchResults.map((res, i) => (
                    <div 
                      key={i} 
                      className="p-2 hover:bg-brand-overcast-light rounded-md cursor-pointer transition-colors flex items-center justify-between text-sm text-gray-800"
                      onClick={() => {
                        if (res.includes('Обучение')) setTab('education');
                        else if (res.includes('Направление')) setTab('direction');
                        else if (res.includes('Новость')) setTab('press');
                        setSearchOpen(false);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                    >
                      <span>{res}</span>
                      <span className="text-xs text-brand-teal font-medium hover:underline">
                        {lang === 'RU' ? 'Перейти →' : 'Go to →'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE NAV DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white text-black border-b border-gray-200 shadow-xl animate-slide-down">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <LiquidButton
                key={item.id}
                onClick={() => {
                  setTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-bold transition-all ${
                  currentTab === item.id
                    ? 'bg-brand-teal/10 text-brand-teal'
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </LiquidButton>
            ))}

            <div className="pt-4 border-t border-gray-100 mt-2">
              <LiquidButton
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="flex w-full items-center justify-center space-x-2 px-4 py-3 bg-brand-teal text-white font-bold rounded-lg shadow"
              >
                <User className="w-5 h-5" />
                <span>{lang === 'RU' ? 'Личный кабинет B2B' : 'B2B Client Portal'}</span>
              </LiquidButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
