import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import { CornerRightDown, ArrowRight, ShieldCheck, Award, CheckCircle2, Server, Star } from 'lucide-react';
import { LiquidButton } from './ui/liquid-glass-button';
import { AuroraBackground } from './ui/aurora-background';
import { ShimmerText } from './ui/shimmer-text';
import { ContainerTextScroll } from './ui/container-text-scroll';

import bg1 from '../assets/images/bss.png';
import bg2 from '../assets/images/beauty.png';
import bg3 from '../assets/images/digital_innovations.png';

interface HeroProps {
  setTab: (tab: string) => void;
  onOpenPortal: () => void;
  lang: 'RU' | 'EN';
}

export default function Hero({ setTab, onOpenPortal, lang }: HeroProps) {
  const slides = [
    {
      title: lang === 'RU' ? 'Инвестиции в здоровье нации' : 'Investing in the Health of the Nation',
      subtitle: lang === 'RU' 
        ? 'ООО «БСС» — ведущий дистрибьютор лекарственных средств, обеспечивающий бесперебойные поставки жизненно важных препаратов по всей территории Российской Федерации.'
        : 'BSS — a leading pharmaceutical holding, providing uninterrupted supplies of life-saving medicines and high-tech medical products nationwide.',
      primaryAction: { label: lang === 'RU' ? 'Стать партнером' : 'Become Partner', onClick: onOpenPortal },
      secondaryAction: { label: lang === 'RU' ? 'Направления' : 'Our Directions', onClick: () => setTab('direction') },
      badge: lang === 'RU' ? '30 ЛЕТ НА РЫНКЕ РОССИИ' : '30 YEARS LEADING IN RUSSIA',
      image: bg1,
      bullets: lang === 'RU' ? [
        'Полное соответствие стандартам надлежащей дистрибьюторской практики GDP',
        'Собственная современная складская и транспортная логистика',
        'Прямые партнерские контракты с Топ-100 мировых производителей'
      ] : [
        'Full compliance with Good Distribution Practice (GDP) standards',
        'Proprietary advanced cold-chain warehouse and transport logistics',
        'Direct partnership agreements with Top-100 global drug manufacturers'
      ],
      stats: [
        { label: lang === 'RU' ? 'Лет на рынке' : 'Years Active', value: '30+' },
        { label: lang === 'RU' ? 'Филиалов РФ' : 'RF Branches', value: '12' },
        { label: lang === 'RU' ? 'Аптек-партнеров' : 'Pharmacy partners', value: '15k+' }
      ]
    },
    {
      title: lang === 'RU' ? 'Эстетическая медицина мирового класса' : 'World-Class Aesthetic Medicine',
      subtitle: lang === 'RU'
        ? 'Премиальные портфели препаратов, профессиональные инъекции и оборудование для клиник через эксклюзивный дивизион «EndoArt / ЭндоАрт» холдинга БСС.'
        : 'Premium aesthetic medical products, professional injections, fillers, and certified equipment for modern beauty clinics through EndoArt.',
      primaryAction: { label: lang === 'RU' ? 'Календарь обучения' : 'Training Calendar', onClick: () => setTab('education') },
      secondaryAction: { label: lang === 'RU' ? 'О бренде EndoArt' : 'About EndoArt', onClick: () => setTab('direction') },
      badge: lang === 'RU' ? 'ЭКСКЛЮЗИВНАЯ ДИСТРИБУЦИЯ' : 'EXCLUSIVE DISTRIBUTOR',
      image: bg2,
      bullets: lang === 'RU' ? [
        'Официально сертифицированные портфели инъекций и филлеров',
        'Высокотехнологичное косметологическое оборудование нового поколения',
        'Собственный научно-образовательный центр для практикующих врачей'
      ] : [
        'Officially registered & certified injectables, fillers, and peels',
        'Cutting-edge, certified cosmetology equipment for licensed clinics',
        'State-of-the-art scientific and educational hub for medical professionals'
      ],
      stats: [
        { label: lang === 'RU' ? 'Препаратов' : 'Brands/SKUs', value: '250+' },
        { label: lang === 'RU' ? 'Врачей обучено' : 'Doctors Trained', value: '5k+' },
        { label: lang === 'RU' ? 'Рейтинг качества' : 'Quality Rating', value: 'AAA' }
      ]
    },
    {
      title: lang === 'RU' ? 'Цифровые инновации и экосистема B2B' : 'Digital Innovations & B2B Ecosystem',
      subtitle: lang === 'RU'
        ? 'Интеллектуальный контроль Честный ЗНАК, мгновенный электронный документооборот и автоматизированная сборка заказов благодаря IT-экспертизе фирмы «Дзен Ай Ти».'
        : 'Intelligent barcode logistics, automated e-invoices, and instant orders control on bsspharm.ru facilitated by Dzen IT tech.',
      primaryAction: { label: lang === 'RU' ? 'Личный Кабинет B2B' : 'B2B Client Portal', onClick: onOpenPortal },
      secondaryAction: { label: lang === 'RU' ? 'Техподдержка' : 'Help Desk', onClick: () => setTab('contacts') },
      badge: lang === 'RU' ? 'IT-РЕШЕНИЯ ДЛЯ ФАРМАЦЕВТИКИ' : 'PHARMA ERP SYSTEMS',
      image: bg3,
      bullets: lang === 'RU' ? [
        'Бесшовная интеграция с государственной маркировкой «Честный ЗНАК»',
        'Мгновенный защищенный электронный документооборот (ЭДО)',
        'Автоматизированный интеллектуальный контроль заказов bsspharm.ru'
      ] : [
        'Seamless out-of-the-box integration serialize-tracking',
        'Secure, high-speed electronic document interchange (EDI)',
        'Next-generation smart control interface on bsspharm.ru'
      ],
      stats: [
        { label: lang === 'RU' ? 'Аптайм систем' : 'Ecosystem Uptime', value: '99.9%' },
        { label: lang === 'RU' ? 'B2B Клиентов' : 'B2B Client accounts', value: '8k+' },
        { label: lang === 'RU' ? 'Запросов в день' : 'API calls / day', value: '1.2M' }
      ]
    }
  ];

  return (
    <section id="hero-showcase" className="relative bg-slate-50 text-neutral-800 pb-20">
      
      {/* GLOBAL AURORA GLOW IN BACKDROP */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AuroraBackground className="w-full h-full opacity-60" showRadialGradient={true} />
      </div>

      {/* INTRODUCTORY WELCOME JUMBOTRON */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 z-10 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="inline-flex items-center space-x-2 bg-brand-teal/10 border border-brand-teal/20 px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] text-brand-teal-hover uppercase mb-6 animate-fade-in">
          <Award className="w-4 h-4 text-brand-teal mr-1" />
          <span>{lang === 'RU' ? 'ХОЛДИНГ БСС • ОСНОВАН В 1996' : 'BSS HOLDING • ESTABLISHED IN 1996'}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.05] max-w-5xl mb-6">
          <ShimmerText duration={4} delay={0.5} className="text-brand-blue-deep font-display font-extrabold pb-2">
            {lang === 'RU' ? 'Здоровье и красота сквозь призму инноваций' : 'Health and Beauty Through Innovation'}
          </ShimmerText>
        </h1>

        <p className="text-lg sm:text-xl text-neutral-600 font-normal leading-relaxed max-w-3xl font-sans mb-12">
          {lang === 'RU' 
            ? 'Лидирующий дистрибьютор фармацевтических препаратов, медицинской продукции и эксклюзивной косметологии на территории Российской Федерации.'
            : 'Russia\'s leading distributor of pharmaceuticals, medical products, and world-class beauty solutions.'}
        </p>

        {/* SCROLL DOWN INDICATOR */}
        <div className="flex flex-col items-center space-y-2 animate-bounce mt-4 text-neutral-400">
          <span className="text-[10px] font-bold tracking-[0.25em] text-neutral-500 uppercase">
            {lang === 'RU' ? 'ЛИСТАЙТЕ ДЛЯ ОЗНАКОМЛЕНИЯ' : 'SCROLL DOWN TO DISCOVER'}
          </span>
          <CornerRightDown className="w-5 h-5 text-brand-teal rotate-45" />
        </div>
      </div>

      {/* 3D SCROLLING SECTIONS */}
      <div className="relative z-10 space-y-16 md:space-y-24 max-w-7xl mx-auto">
        {slides.map((slide, index) => (
          <ContainerTextScroll
            key={index}
            className="py-12"
            titleComponent={
              <div className="max-w-4xl mx-auto px-4">
                {/* Active index & Badge */}
                <div className="inline-flex items-center space-x-2 bg-brand-teal/10 border border-brand-teal/25 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] text-brand-teal-hover uppercase mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{slide.badge}</span>
                </div>
                
                {/* Section title */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-brand-blue-deep leading-tight">
                  {slide.title}
                </h2>
              </div>
            }
          >
            {/* Split row inside the 3D Tilted Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 h-full w-full flex-1">
              
              {/* Left Column: Rich textual information, Actions, stats */}
              <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full lg:overflow-y-auto bg-white/95">
                
                <div className="space-y-6">
                  {/* Long descriptive text */}
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans mt-2">
                    {slide.subtitle}
                  </p>

                  {/* Bullet Benefits list */}
                  <ul className="space-y-3.5 pt-2">
                    {slide.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start text-xs sm:text-sm text-neutral-700">
                        <CheckCircle2 className="w-5 h-5 text-brand-teal mr-3 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sub-row statistic summary cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-neutral-150 pt-6 mt-6">
                  {slide.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="bg-brand-overcast-light/40 border border-brand-overcast/15 rounded-xl p-2.5 sm:p-3 text-center">
                      <div className="text-lg sm:text-xl font-display font-extrabold text-brand-blue-deep">
                        {stat.value}
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-sans text-neutral-500 uppercase tracking-wider mt-1 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom line action buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-6 mt-auto">
                  <LiquidButton
                    onClick={slide.primaryAction.onClick}
                    variant="primary"
                    className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white shadow-md shadow-brand-teal/20"
                  >
                    <span>{slide.primaryAction.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </LiquidButton>
                  <LiquidButton
                    onClick={slide.secondaryAction.onClick}
                    variant="outline"
                    className="text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-brand-teal/30 bg-white hover:bg-neutral-50 text-neutral-800"
                  >
                    <span>{slide.secondaryAction.label}</span>
                  </LiquidButton>
                </div>

              </div>

              {/* Right Column: Parallax image with dynamic crop overlay */}
              <div className="lg:col-span-5 relative h-48 lg:h-full bg-slate-900 overflow-hidden border-t lg:border-t-0 lg:border-l border-neutral-200/40">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                
                {/* Modern visual gradients overlay */}
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/60 via-slate-900/10 to-transparent pointer-events-none" />
                
                {/* Floating badge over image */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-neutral-100 flex items-center space-x-1.5 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                  <span className="text-[9px] font-bold text-neutral-700 uppercase tracking-widest leading-none">
                    {lang === 'RU' ? 'ПРОВЕРЕНО' : 'VERIFIED'}
                  </span>
                </div>
              </div>

            </div>
          </ContainerTextScroll>
        ))}
      </div>

      {/* GRADIENT SHADOW BOX SPAN FOR A FLUID PAGE TRANSITION */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-100 to-transparent z-10 pointer-events-none" />

    </section>
  );
}
