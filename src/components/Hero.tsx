import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CornerRightDown, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { LiquidButton } from './ui/liquid-glass-button';

import bg1 from '../assets/images/bss.png';
import bg2 from '../assets/images/beauty.png';
import bg3 from '../assets/images/digital_innovations.png';

interface HeroProps {
  setTab: (tab: string) => void;
  onOpenPortal: () => void;
  lang: 'RU' | 'EN';
}

export default function Hero({ setTab, onOpenPortal, lang }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: lang === 'RU' ? 'Инвестиции в здоровье нации' : 'Investing in the Health of the Nation',
      subtitle: lang === 'RU' 
        ? 'ООО «БСС» — ведущий дистрибьютор лекарственных средств, обеспечивающий бесперебойные поставки жизненно важных препаратов по всей территории Российской Федерации.'
        : 'BSS — a leading pharmaceutical holding, providing uninterrupted supplies of life-saving medicines and high-tech medical products nationwide.',
      primaryAction: { label: lang === 'RU' ? 'Стать партнером' : 'Become Partner', onClick: onOpenPortal },
      secondaryAction: { label: lang === 'RU' ? 'Направления' : 'Our Directions', onClick: () => setTab('direction') },
      badge: lang === 'RU' ? '30 ЛЕТ НА РЫНКЕ РОССИИ' : '30 YEARS LEADING IN RUSSIA',
      bgGradient: 'from-emerald-950/70 via-teal-900/60 to-black/80',
      image: bg1
    },
    {
      title: lang === 'RU' ? 'Эстетическая медицина мирового класса' : 'World-Class Aesthetic Medicine',
      subtitle: lang === 'RU'
        ? 'Премиальные портфели препаратов, профессиональные инъекции и оборудование для клиник через эксклюзивный дивизион «EndoArt / ЭндоАрт» холдинга БСС.'
        : 'Premium aesthetic medical products, professional injections, fillers, and certified equipment for modern beauty clinics through EndoArt.',
      primaryAction: { label: lang === 'RU' ? 'Календарь обучения' : 'Training Calendar', onClick: () => setTab('education') },
      secondaryAction: { label: lang === 'RU' ? 'О бренде EndoArt' : 'About EndoArt', onClick: () => setTab('direction') },
      badge: lang === 'RU' ? 'ЭКСКЛЮЗИВНАЯ ДИСТРИБУЦИЯ' : 'EXCLUSIVE DISTRIBUTOR',
      bgGradient: 'from-cyan-950/70 via-indigo-950/60 to-black/80',
      image: bg2
    },
    {
      title: lang === 'RU' ? 'Цифровые инновации и экосистема B2B' : 'Digital Innovations & B2B Ecosystem',
      subtitle: lang === 'RU'
        ? 'Интеллектуальный контроль Честный ЗНАК, мгновенный документооборот и автоматизированная сборка заказов благодаря IT-экспертизе фирмы «Дзен Ай Ти».'
        : 'Intelligent barcode logistics, automated e-invoices, and instant orders control on bsspharm.ru facilitated by Dzen IT tech.',
      primaryAction: { label: lang === 'RU' ? 'Портал Личного Кабинета' : 'Client B2B Login', onClick: onOpenPortal },
      secondaryAction: { label: lang === 'RU' ? 'Техподдержка' : 'Help Desk', onClick: () => setTab('contacts') },
      badge: lang === 'RU' ? 'IT-РЕШЕНИЯ ДЛЯ ФАРМАЦЕВТИКИ' : 'PHARMA ERP SYSTEMS',
      bgGradient: 'from-sky-950/70 via-slate-900/60 to-black/80',
      image: bg3
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // 7 seconds slide intervals
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="hero-slider" className="relative h-[100vh] min-h-[600px] bg-slate-50 overflow-hidden text-neutral-800">
      
      {/* BACKGROUND GRAPHICS */}
      {slides.map((slide, index) => (
        <div 
          key={`bg-${index}`}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`} 
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-white/5 pointer-events-none" />
        </div>
      ))}

      {/* SLIDES */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center ${
            index === activeSlide ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-full z-0 pointer-events-none'
          }`}
        >
          {/* Slide light gradient overlay for readability and pure brand aesthetics */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/75 to-transparent pointer-events-none" />

          {/* SLIDE CONTENT CONTAINER */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 z-20">
            <div className="max-w-3xl space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-brand-teal/10 border border-brand-teal/20 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] text-brand-teal-hover uppercase animate-fade-in">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                <span className="text-brand-teal-hover">{slide.badge}</span>
              </div>

              {/* H1 Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1] text-brand-blue-deep">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-2xl font-sans">
                {slide.subtitle}
              </p>

              {/* Actions Button Row */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <LiquidButton
                  onClick={slide.primaryAction.onClick}
                  variant="primary"
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white"
                >
                  <span>{slide.primaryAction.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </LiquidButton>
                <LiquidButton
                  onClick={slide.secondaryAction.onClick}
                  variant="outline"
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-brand-teal/30 bg-white/50 text-neutral-800 hover:bg-white"
                >
                  <span>{slide.secondaryAction.label}</span>
                </LiquidButton>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* MANUAL NAVIGATION DOTS AND ARROWS */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Indicators Dots */}
        <div className="flex space-x-3">
          {slides.map((_, i) => (
            <LiquidButton
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-1.5 transition-all duration-500 ease-out cursor-pointer ${
                i === activeSlide ? 'w-14 bg-brand-teal' : 'w-4 bg-neutral-300 hover:bg-neutral-400'
              }`}
              title={`Slide ${i+1}`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <div className="flex space-x-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white/80 hover:bg-white text-neutral-700 flex items-center justify-center transition-all shadow-sm cursor-pointer active:scale-95"
            title="Назад"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white/80 hover:bg-white text-neutral-700 flex items-center justify-center transition-all shadow-sm cursor-pointer active:scale-95"
            title="Вперед"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* SLANTED TRANSITION BANNER AT THE BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent z-20 pointer-events-none" />

    </section>
  );
}
