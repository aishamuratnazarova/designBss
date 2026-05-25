import { LiquidButton } from './ui/liquid-glass-button';
import React, { useState, useEffect } from 'react';
import { NEWS_ARTICLES } from '../data';
import { NewsArticle } from '../types';
import { Search, Calendar, ArrowRight, RefreshCw, SlidersHorizontal, X, FileText } from 'lucide-react';

interface PressCenterProps {
  lang: 'RU' | 'EN';
}

export default function PressCenter({ lang }: PressCenterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [btnLoading, setBtnLoading] = useState(false);
  
  // Detail modal state
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Trigger brief skeleton loading effect on category / search shifts
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 500ms simulation
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedYear]);

  // Handle mock pagination loading
  const handleLoadMore = () => {
    setBtnLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 2);
      setBtnLoading(false);
    }, 700);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedYear('all');
  };

  // Filter logic
  const filteredArticles = NEWS_ARTICLES.filter((art) => {
    // Category match
    if (selectedCategory !== 'all' && art.category !== selectedCategory) {
      return false;
    }
    // Year match (e.g. date format "20.05.2026")
    if (selectedYear !== 'all') {
      const year = art.date.split('.')[2]; // Gets '2026'
      if (year !== selectedYear) return false;
    }
    // Search query match (Title or Lead or Content)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = art.title.toLowerCase().includes(q);
      const inLead = art.lead.toLowerCase().includes(q);
      const inContent = art.content.toLowerCase().includes(q);
      if (!inTitle && !inLead && !inContent) return false;
    }
    return true;
  });

  // Unique list of years in our articles
  const availableYears = Array.from(
    new Set(NEWS_ARTICLES.map((art) => art.date.split('.')[2]))
  ).sort((a, b) => b.localeCompare(a));

  const categories = [
    { id: 'all', label: lang === 'RU' ? 'Все материалы' : 'All materials' },
    { id: 'company', label: lang === 'RU' ? 'Новости компании' : 'Company News' },
    { id: 'industry', label: lang === 'RU' ? 'Отраслевые статьи' : 'Industry Articles' },
    { id: 'events', label: lang === 'RU' ? 'Мероприятия' : 'Events' },
  ];

  // Placeholder SVGs/images for the articles, customized by topic
  const getArticleBg = (imageType?: string) => {
    switch (imageType) {
      case 'anniversary':
        return 'from-[#002B5B] to-[#003d80]';
      case 'warehouse':
        return 'from-slate-800 to-[#002B5B]';
      case 'pharmacy_growth':
        return 'from-slate-900 to-[#1e5d8a]';
      case 'it_software':
        return 'from-[#002B5B] to-[#00A8E8]/90';
      case 'biotech':
        return 'from-sky-950 to-[#002B5B]';
      case 'conference':
        return 'from-slate-900 to-slate-800';
      default:
        return 'from-slate-900 to-brand-blue-deep';
    }
  };

  return (
    <div id="press-section" className="py-16 bg-white border-t border-gray-100 font-sans">
      
      {/* HEADER BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex text-[10px] text-gray-400 font-bold uppercase tracking-wider space-x-2">
          <span className="hover:text-[#00A8E8] transition-colors cursor-pointer">{lang === 'RU' ? 'Главная' : 'Home'}</span>
          <span>/</span>
          <span className="text-gray-950">{lang === 'RU' ? 'Пресс-центр' : 'Press Center'}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* VIEW TITLE */}
        <div className="mb-10 text-left">
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-brand-blue-deep tracking-tight uppercase">
            {lang === 'RU' ? 'ИНФОРМАЦИОННЫЙ ПРЕСС-ЦЕНТР' : 'BSS PRESS CENTER'}
          </h2>
          <div className="w-12 h-1 bg-[#00A8E8] mt-3 mb-4" />
          <p className="text-xs sm:text-sm text-gray-500 max-w-3xl leading-relaxed font-sans font-light">
            {lang === 'RU' 
              ? 'Официальные заявления холдинга, аналитические статьи по биофармации, новости логистического комплекса и инновации BSS.' 
              : 'Official publications, biotech releases, state-wide logistical notes, and medical summits updates.'}
          </p>
        </div>

        {/* SEARCH & FILTERS CONTROLS */}
        <div className="glass-panel p-6 mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input with Clear Button */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'RU' ? 'Поиск новостей и материалов по ключевым словам...' : 'Search articles and press releases...'}
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#00A8E8] focus:border-transparent text-xs text-black transition-all font-light"
              />
              {searchQuery && (
                <LiquidButton
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-black"
                  title="Очистить"
                >
                  <X className="w-4 h-4" />
                </LiquidButton>
              )}
            </div>

            {/* Year filter Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider whitespace-nowrap">
                {lang === 'RU' ? 'ФИЛЬТР ГОДА:' : 'FILTER YEAR:'}
              </span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-white border border-gray-200 px-3.5 py-2.5 rounded-sm text-xs text-neutral-800 font-bold uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-[#00A8E8] cursor-pointer"
              >
                <option value="all">{lang === 'RU' ? 'Все годы' : 'All years'}</option>
                {availableYears.map((yr) => (
                  <option key={yr} value={yr}>{yr} {lang === 'RU' ? 'г.' : ''}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Category Chips/Tabs */}
          <div className="flex flex-wrap gap-2 border-t border-gray-200/60 pt-4">
            {categories.map((cat) => (
              <LiquidButton
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#002B5B] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-black'
                }`}
              >
                {cat.label}
              </LiquidButton>
            ))}
          </div>

        </div>

        {/* LOADING SHET / SKELETON LOADERS SIMULATION */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-slate-50 rounded-sm border border-gray-200 p-6 space-y-4">
                <div className="h-44 bg-slate-200 rounded-sm w-full" />
                <div className="h-4 bg-slate-200 rounded-sm w-1/4" />
                <div className="h-6 bg-slate-200 rounded-sm w-3/4" />
                <div className="h-4 bg-slate-200 rounded-sm w-full" />
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          
          /* EMPTY STATE AS REQUESTED */
          <div className="text-center py-16 bg-slate-50 rounded-sm border border-dashed border-gray-200 space-y-4">
            <div className="w-14 h-14 rounded-sm bg-red-50 flex items-center justify-center text-red-500 mx-auto">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-display font-bold text-brand-blue-deep uppercase tracking-wider">
              {lang === 'RU' ? 'Материалы не найдены' : 'No articles match your search'}
            </h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed font-light">
              {lang === 'RU'
                ? 'К сожалению, по указанным критериям фильтров новостей не обнаружено. Сбросьте настройки для просмотра полного списка.'
                : 'No press-materials corresponding to current choices. Try resetting all indicators.'}
            </p>
            <div className="pt-2">
              <LiquidButton
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-brand-blue-deep text-white font-bold rounded-sm text-[10px] uppercase tracking-widest shadow hover:shadow-lg transition-all cursor-pointer"
              >
                {lang === 'RU' ? 'СБРОСИТЬ НАТРОЙКИ' : 'Reset all filters'}
              </LiquidButton>
            </div>
          </div>
        ) : (
          
          /* METADATA ARTICLES LISTING GRID */
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.slice(0, visibleCount).map((art) => (
                <article
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="group glass-card overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    
                    {/* Visual Pattern representing missing photography dynamically */}
                    <div className={`h-44 bg-gradient-to-r ${getArticleBg(art.image)} p-5 flex flex-col justify-between text-white relative overflow-hidden rounded-sm`}>
                      
                      {/* background overlay mesh */}
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                      
                      <div className="flex items-center justify-between z-10">
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-black/30 border border-white/20 px-2.5 py-1 rounded-sm backdrop-blur-md">
                          {art.categoryLabel}
                        </span>
                        <span className="text-[9px] font-bold opacity-85 flex items-center space-x-1 uppercase tracking-wider">
                          <Calendar className="w-3.5 h-3.5 text-[#00A8E8]" />
                          <span>{art.date}</span>
                        </span>
                      </div>

                      {/* Decal logo asset */}
                      <div className="absolute right-4 bottom-4 opacity-5">
                        <svg viewBox="0 0 100 100" className="w-16 h-16 fill-current text-white">
                          <path d="M50 85 V45 M50 55 C42 45 35 48 30 52 M50 62 C58 52 65 55 70 58" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
                        </svg>
                      </div>

                      <div className="z-10 bg-black/25 p-2 rounded-sm backdrop-blur-xs mt-auto max-w-max border border-white/5">
                        <span className="text-[8.5px] font-bold text-[#00A8E8] block uppercase tracking-widest">
                          ХОЛДИНГ БСС • ОФИЦИАЛЬНО
                        </span>
                      </div>
                    </div>

                    <div className="p-5.5 space-y-2.5">
                      <h3 className="text-sm sm:text-base font-display font-semibold text-brand-blue-deep group-hover:text-[#00A8E8] transition-colors line-clamp-2 leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-light">
                        {art.lead}
                      </p>
                    </div>

                  </div>

                  <div className="p-5.5 pt-0 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-brand-blue-deep group-hover:text-[#00A8E8] transition-colors mt-auto">
                    <span>{lang === 'RU' ? 'ЧИТАТЬ МАТЕРИАЛ' : 'Read publication'}</span>
                    <ArrowRight className="w-4 h-4 text-[#00A8E8] transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </article>
              ))}
            </div>

            {/* LAZY LOAD / CLASSIC PAGINATION */}
            {filteredArticles.length > visibleCount && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-gray-200 font-sans">
                <LiquidButton
                  onClick={handleLoadMore}
                  disabled={btnLoading}
                  className="px-6 py-3 bg-white border border-gray-200 text-neutral-800 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors flex items-center space-x-2 cursor-pointer disabled:bg-gray-100 disabled:text-gray-400"
                >
                  {btnLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00A8E8]" />
                      <span>{lang === 'RU' ? 'ПОДГОТОВКА...' : 'Fetching...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{lang === 'RU' ? 'ПОКАЗАТЬ ЕЩЕ МАТЕРИАЛЫ' : 'Show more articles'}</span>
                    </>
                  )}
                </LiquidButton>

                <div className="flex items-center space-x-1 text-[11px] text-gray-400 font-light font-sans">
                  <span>{lang === 'RU' ? 'Показано' : 'Showing'}</span>
                  <span className="font-bold text-neutral-800">{visibleCount}</span>
                  <span>{lang === 'RU' ? 'из' : 'of'}</span>
                  <span className="font-bold text-neutral-800">{filteredArticles.length}</span>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* FULL PUBLICATION DETAILS MODAL VIEW */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in font-sans">
          <div className="bg-white rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl flex flex-col">
            
            {/* Modal header with slate gradient container */}
            <div className={`p-6 sm:p-8 bg-gradient-to-r ${getArticleBg(selectedArticle.image)} text-white relative rounded-t-sm`}>
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="flex items-center justify-between mb-4 z-10 relative">
                <span className="text-[9px] font-bold uppercase tracking-widest bg-black/30 border border-white/20 px-3 py-1 rounded-sm">
                  {selectedArticle.categoryLabel}
                </span>
                <LiquidButton
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
                  title="Закрыть"
                >
                  <X className="w-4 h-4" />
                </LiquidButton>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-semibold uppercase tracking-tight relative z-10 leading-snug">
                {selectedArticle.title}
              </h2>
              
              <div className="mt-4 flex items-center space-x-3 text-[10px] font-medium uppercase tracking-wider opacity-85 z-10 relative">
                <Calendar className="w-4 h-4 text-[#00A8E8]" />
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{lang === 'RU' ? 'ИНФОРМАЦИОННЫЙ ВЫПУСК' : 'Official release'}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              {/* Lead highlight bar */}
              <div className="border-l-4 border-[#00A8E8] pl-4 py-1.5 text-xs sm:text-sm text-neutral-800 font-medium italic bg-slate-50 rounded-r-sm">
                {selectedArticle.lead}
              </div>

              {/* Core content text blocks */}
              <div className="text-xs sm:text-sm text-neutral-650 leading-relaxed font-sans font-light space-y-4">
                <p>{selectedArticle.content}</p>
                <p>
                  {lang === 'RU'
                    ? 'Группа компаний БСС гарантирует бесперебойную и своевременную заботу о здоровье населения, непрерывно масштабируя логистические мощности и задействуя современные технологические платформы. Интегрированное развитие инфраструктурных решений позволяет удерживать первенство на рынке B2B-дистрибуции.'
                    : 'Additionally, BSS Holding keeps investing heavily in high-standard equipment R&D to replace outsourced supply channels, providing highly optimal therapeutic solutions locally.'}
                </p>
                <div className="p-4.5 bg-slate-50 border border-gray-150 rounded-sm flex items-start space-x-3 mt-4">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-[11px] text-gray-500 font-light italic leading-relaxed">
                    {lang === 'RU'
                      ? 'Официальные запросы прессы, предложения об аккредитации на отраслевые мероприятия и запросы интервью с руководством холдинга направляйте в медиа-департамент по адресу: office@bsspharm.ru.'
                      : 'To request official media kit, please submit your enquiry to our PR-office.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-gray-150 flex items-center justify-end">
              <LiquidButton
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 bg-[#002B5B] hover:bg-[#002B5B]/90 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm cursor-pointer transition-colors"
              >
                {lang === 'RU' ? 'ЗАКРЫТЬ МАТЕРИАЛ' : 'Close Publication'}
              </LiquidButton>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
