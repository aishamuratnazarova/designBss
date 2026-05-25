import { LiquidButton } from './ui/liquid-glass-button';
import React, { useState } from 'react';
import { BUSINESS_DIRECTIONS } from '../data';
import { ExternalLink, ChevronDown, ChevronUp, Link as LinkIcon, BookOpen, Layers, Package, Leaf, Sparkles, Cpu, Truck, FlaskConical } from 'lucide-react';

interface BusinessDirectionsProps {
  lang: 'RU' | 'EN';
}

export default function BusinessDirections({ lang }: BusinessDirectionsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const getLogoColor = (logo: string) => {
    switch (logo) {
      case 'dist': return 'bg-teal-50 text-teal-700 border-teal-150';
      case 'aloe': return 'bg-emerald-50 text-emerald-700 border-emerald-150';
      case 'endo': return 'bg-indigo-50 text-indigo-700 border-indigo-150';
      case 'zenit': return 'bg-blue-50 text-blue-700 border-blue-150';
      case 'logistics': return 'bg-amber-50 text-amber-700 border-amber-150';
      case 'production': return 'bg-purple-50 text-purple-700 border-purple-150';
      default: return 'bg-gray-50 text-gray-700 border-gray-150';
    }
  };

  const getLogoIcon = (logo: string) => {
    switch (logo) {
      case 'dist': return <Package className="w-6 h-6" />;
      case 'aloe': return <Leaf className="w-6 h-6" />;
      case 'endo': return <Sparkles className="w-6 h-6" />;
      case 'zenit': return <Cpu className="w-6 h-6" />;
      case 'logistics': return <Truck className="w-6 h-6" />;
      case 'production': return <FlaskConical className="w-6 h-6" />;
      default: return <Layers className="w-6 h-6" />;
    }
  };

  return (
    <div className="py-12 bg-white">
      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex text-xs text-gray-500 font-medium space-x-2" aria-label="Breadcrumb">
          <span className="hover:text-brand-teal cursor-pointer">
            {lang === 'RU' ? 'Главная' : 'Home'}
          </span>
          <span>/</span>
          <span className="text-gray-900">
            {lang === 'RU' ? 'Направления деятельности' : 'Business Divisions'}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TITLE */}
        <div className="mb-12 border-b border-gray-100 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-black text-brand-blue-deep tracking-tight">
              {lang === 'RU' ? 'Дивизионы и бизнес-единицы холдинга' : 'Corporate Structure & Divisions'}
            </h1>
            <p className="text-sm text-gray-400 mt-2 font-sans font-light">
              {lang === 'RU'
                ? 'Диверсифицированная экосистема для полного закрытия потребностей здравоохранения и бьюти-индустрии РФ.'
                : 'Diversified ecosystem targeting complete spectrum of pharmaceutical and healthcare services.'}
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-2 bg-brand-overcast-light px-4 py-1.5 rounded-sm text-[10px] text-brand-blue-deep font-bold uppercase tracking-wider border border-brand-overcast/30">
            <Layers className="w-3.5 h-3.5 text-brand-teal" />
            <span>{BUSINESS_DIRECTIONS.length} {lang === 'RU' ? 'Дивизионов' : 'Divisions'}</span>
          </div>
        </div>

        {/* DIRECTIONS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BUSINESS_DIRECTIONS.map((dir) => {
            const isExpanded = expandedId === dir.id;
            return (
              <div
                key={dir.id}
                className="glass-card p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  
                  {/* CARD HEADER */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      {/* Brand Logo Container */}
                      <div className={`w-14 h-14 rounded-sm border flex items-center justify-center ${getLogoColor(dir.logo)} shadow-sm`}>
                        {getLogoIcon(dir.logo)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-brand-blue-deep">
                          {dir.name}
                        </h3>
                        <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">
                          {dir.id} DIVISION
                        </span>
                      </div>
                    </div>

                    <LiquidButton
                      onClick={() => toggleExpand(dir.id)}
                      className="p-1.5 rounded-sm hover:bg-gray-50 text-gray-400 hover:text-black transition-colors"
                      title={isExpanded ? 'Скрыть информацию' : 'Раскрыть детали'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </LiquidButton>
                  </div>

                  {/* SHORT DESCRIPTION */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {dir.shortDesc}
                  </p>

                  {/* EXPANDABLE ACCORDION CONTENT */}
                  {isExpanded && (
                    <div className="mt-4 mb-6 pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-3 font-sans font-light animate-fade-in">
                      <p className="leading-relaxed">
                        {dir.fullDesc}
                      </p>
                      
                      {/* Specific directions details if customized */}
                      <div className="bg-brand-overcast-light p-3.5 rounded-sm border border-brand-overcast/15">
                        <span className="font-bold text-[9px] text-[#00A8E8] uppercase tracking-[0.15em] block mb-1">
                          {lang === 'RU' ? 'Область регулирования и комплаенс' : 'Regulation and standards'}
                        </span>
                        <p className="text-[11px] leading-relaxed text-gray-500 font-sans font-light">
                          {dir.id === 'logistics' && (lang === 'RU' ? 'Сертификат GDP № SPB-4491-09. Охраняемый периметр, температурные датчики, мониторинг Честным ЗНАКом.' : 'GDP standard validation cert, tracking indicators.')}
                          {dir.id === 'aloe' && (lang === 'RU' ? 'Фармацевтическая лицензия розничной торговли. Интеграция с льготным государственным отпуском лекарств.' : 'Pharma license check compliance.')}
                          {dir.id === 'endoart' && (lang === 'RU' ? 'Эксклюзивное партнерство с лидерами медицинских инноваций. Строгая сертификация и защита медицинских прав РФ.' : 'Medical devices import security.')}
                          {dir.id === 'zenit' && (lang === 'RU' ? 'Собственные серверы внутри РФ. Защита коммерческих данных B2B в соответствии с ФЗ-152.' : 'Enterprise clouds located in Russian Federation boundaries.')}
                          {dir.id === 'dist' && (lang === 'RU' ? 'Многолетнее надежное участие в тендерах госзакупок по 44ФЗ и 223ФЗ.' : 'Direct state procurement compliance.')}
                          {dir.id === 'production' && (lang === 'RU' ? 'Разработка в соответствии с директивами GMP. Собственные лаборатории молекулярного синтеза.' : 'GMP standards research laboratories.')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* LOCAL METRICS */}
                  {dir.metrics && (
                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-sm border border-gray-100 mb-6">
                      {dir.metrics.map((m, idx) => (
                        <div key={idx} className="text-center">
                          <span className="block font-display font-bold text-sm text-brand-blue-deep tracking-tight">
                            {m.value}
                          </span>
                          <span className="text-[9px] text-gray-400 font-medium leading-tight block truncate uppercase" title={m.label}>
                            {m.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* CALL TO ACTION ROW */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <LiquidButton
                    onClick={() => toggleExpand(dir.id)}
                    className="text-[10px] text-brand-teal uppercase tracking-widest hover:text-[#0096d1] font-bold flex items-center space-x-1 cursor-pointer font-sans"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isExpanded ? (lang === 'RU' ? 'Свернуть' : 'Hide info') : (lang === 'RU' ? 'Подробнее' : 'Details')}</span>
                  </LiquidButton>

                  <a
                    href={dir.website}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-gray-650 text-[10px] font-bold uppercase tracking-widest rounded-sm border border-gray-150 transition-all flex items-center space-x-1.5 font-sans cursor-pointer"
                  >
                    <span>{lang === 'RU' ? 'Сайт' : 'Visit'}</span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* BOTTOM CALLOUT */}
        <div className="mt-16 glass-panel p-8 text-center space-y-4 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-teal">
            {lang === 'RU' ? 'ХОТИТЕ ЗАРЕГИСТРИРОВАТЬ СВОЙ БРЕНД У НАС?' : 'WANT TO DISTRIBUTE YOUR BIOTECH WITH BSS?'}
          </p>
          <h4 className="text-xl font-display font-black text-brand-blue-deep max-w-2xl mx-auto leading-snug">
            {lang === 'RU' 
              ? 'БСС гарантирует комплексный вывод вашего продукта на фармацевтический и косметологический рынок РФ.' 
              : 'Our holding covers customs safety, certification compliance, and direct delivery straight to aesthetic clinics.'}
          </h4>
          <p className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed font-sans font-light">
            {lang === 'RU'
              ? 'От регистрации торговых марок в Роспотребнадзоре до размещения рекламы на федеральных ресурсах и проведения обучающих симпозиумов.'
              : 'Full package: registration of licenses, targeted marketing in state-wide newsletters, and interactive seminars.'}
          </p>
          <div className="pt-2">
            <a
              href="mailto:office@bsspharm.ru"
              className="inline-flex items-center space-x-2 px-6 py-3.5 glass-button-dark text-[11px] font-bold uppercase tracking-widest shadow-md"
            >
              <LinkIcon className="w-3.5 h-3.5 text-brand-teal" />
              <span>{lang === 'RU' ? 'Подать заявку дистрибьютора' : 'Apply for distributor program'}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
