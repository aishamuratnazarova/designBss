import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CompanyMetrics from './components/CompanyMetrics';
import BusinessDirections from './components/BusinessDirections';
import PressCenter from './components/PressCenter';
import Education from './components/Education';
import Contacts from './components/Contacts';
import ClientPortal from './components/ClientPortal';
import RadialOrbitalTimeline from './components/RadialOrbitalTimeline';

import corporateBg from './assets/images/corporate_bg_1779708974400.png';
import { LiquidButton } from './components/ui/liquid-glass-button';

import { NEWS_ARTICLES, BUSINESS_DIRECTIONS } from './data';
import { Calendar, ArrowRight, ShieldCheck, Mail, Phone, Library, Award, Package, Leaf, Sparkles, Cpu, Truck, FlaskConical, Layers } from 'lucide-react';

export default function App() {
  const [currentTab, setTab] = useState<string>('main');
  const [showPortal, setShowPortal] = useState<boolean>(false);
  const [lang, setLang] = useState<'RU' | 'EN'>('RU');

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

  const getLogoColor = (logo: string) => {
    switch (logo) {
      case 'dist': return 'bg-teal-50 text-teal-700 border-teal-100 group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500';
      case 'aloe': return 'bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500';
      case 'endo': return 'bg-indigo-50 text-indigo-700 border-indigo-100 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500';
      case 'zenit': return 'bg-blue-50 text-blue-700 border-blue-100 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500';
      case 'logistics': return 'bg-gray-100 text-gray-700 border-gray-200 group-hover:bg-gray-600 group-hover:text-white group-hover:border-gray-600';
      case 'production': return 'bg-sky-50 text-sky-700 border-sky-100 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 group-hover:bg-slate-600 group-hover:text-white group-hover:border-slate-600';
    }
  };

  // Handle switching tabs smoothly
  const handleSetTab = (tabId: string) => {
    setTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenB2BPortal = () => {
    setShowPortal(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If the user selects the closed secure portal, render it cleanly with zero distractions
  if (showPortal) {
    return <ClientPortal onClose={() => setShowPortal(false)} lang={lang} />;
  }

  return (
    <div 
      className="min-h-screen text-neutral-800 font-sans flex flex-col justify-between overflow-x-hidden relative"
      style={{
         backgroundImage: `url(${corporateBg})`,
         backgroundSize: 'cover',
         backgroundAttachment: 'fixed',
         backgroundPosition: 'center',
         backgroundColor: 'rgba(255, 255, 255, 0.93)',
         backgroundBlendMode: 'lighten'
      }}
    >
      
      {/* GLOBAL NAVIGATION HEADER */}
      <Header
        currentTab={currentTab}
        setTab={handleSetTab}
        onOpenPortal={handleOpenB2BPortal}
        lang={lang}
        setLang={setLang}
      />

      {/* CORE CONTENT LAYOUT SWITCHER */}
      <main className={`flex-grow ${currentTab !== 'main' ? 'pt-[104px]' : ''}`}>
        {currentTab === 'main' && (
          <div className="space-y-0 animate-fade-in">
            {/* HERO CAROUSEL */}
            <Hero setTab={handleSetTab} onOpenPortal={handleOpenB2BPortal} lang={lang} />

            {/* METRICS OF MASSIVE SCALE */}
            <CompanyMetrics lang={lang} />

            {/* INTERACTIVE SUBSIDIARIES ORBITAL MAP */}
            <RadialOrbitalTimeline lang={lang} />

            {/* VISUAL CARDS OF DIRECTIONS (Brief view) */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-teal tracking-widest bg-brand-teal/5 px-2.5 py-1 rounded">
                      {lang === 'RU' ? 'Структура Холдинга' : 'Corporate Divisions'}
                    </span>
                    <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight mt-3">
                      {lang === 'RU' ? 'Ключевые направления деятельности' : 'Key Business Directions'}
                    </h2>
                  </div>
                  <LiquidButton
                    onClick={() => handleSetTab('direction')}
                    className="text-xs font-bold text-brand-teal hover:underline flex items-center space-x-1"
                  >
                    <span>{lang === 'RU' ? 'Посмотреть все направления подробно' : 'Explore full catalog'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </LiquidButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {BUSINESS_DIRECTIONS.slice(0, 3).map((dir) => (
                    <div
                      key={dir.id}
                      onClick={() => handleSetTab('direction')}
                      className="group glass-card p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        {/* Generated icon mapped */}
                        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transition-colors ${getLogoColor(dir.logo)}`}>
                          {getLogoIcon(dir.logo)}
                        </div>
                        <h3 className="text-sm font-bold text-neutral-950 mb-2 group-hover:text-brand-teal transition-colors">
                          {dir.name}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed font-light line-clamp-3">
                          {dir.shortDesc}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between text-[11px] font-bold text-brand-teal">
                        <span>{lang === 'RU' ? 'Смотреть детали' : 'Details'}</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* PREVIEW OF LATEST NEWS IN PRESS CENTER */}
            <section className="py-20 bg-gray-50 border-t border-gray-150">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-teal tracking-widest bg-brand-teal/5 px-2.5 py-1 rounded">
                      {lang === 'RU' ? 'Пресс-центр' : 'Publications'}
                    </span>
                    <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight mt-3">
                      {lang === 'RU' ? 'Последние новости холдинга' : 'Latest News'}
                    </h2>
                  </div>
                  <LiquidButton
                    onClick={() => handleSetTab('press')}
                    className="text-xs font-bold text-brand-teal hover:underline flex items-center space-x-1"
                  >
                    <span>{lang === 'RU' ? 'Перейти в ленту новостей' : 'Browse press room'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </LiquidButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {NEWS_ARTICLES.slice(0, 2).map((art) => (
                    <div
                      key={art.id}
                      onClick={() => handleSetTab('press')}
                      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold">
                          <span className="text-brand-teal uppercase tracking-wider">{art.categoryLabel}</span>
                          <span className="font-mono">{art.date}</span>
                        </div>
                        <h3 className="text-base font-bold text-neutral-900 group-hover:text-brand-teal transition-colors line-clamp-1 leading-snug">
                          {art.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-light">
                          {art.lead}
                        </p>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-105 border-gray-100 flex items-center justify-between text-xs font-bold text-brand-teal">
                        <span>{lang === 'RU' ? 'Читать полностью' : 'Read more'}</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* TRUST STATEMENT STRIP */}
            <section className="py-12 bg-neutral-950 text-white relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-1 text-xs text-brand-teal uppercase font-bold tracking-widest">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{lang === 'RU' ? 'Стандарты дистрибуции GDP' : 'GDP LOGISTICS STANDARD CERTIFICATIONS'}</span>
                  </div>
                  <p className="text-sm text-gray-400 font-light max-w-2xl">
                    {lang === 'RU'
                      ? 'Холдинг БСС строго соблюдает государственные и международные регламенты хранения лекарственных средств, непрерывно контролируя холодовую цепь на каждом этапе грузоперевозок.'
                      : 'We secure total compliance with federal pharmacovigilance directives, maintaining strict temperature chain monitors.'}
                  </p>
                </div>
                <LiquidButton
                  onClick={handleOpenB2BPortal}
                  className="px-6 py-3 bg-brand-teal text-white text-xs font-bold rounded-lg shadow-lg flex-shrink-0"
                >
                  {lang === 'RU' ? 'Личный Кабинет B2B' : 'Go to B2B secure workspace'}
                </LiquidButton>
              </div>
            </section>
          </div>
        )}

        {currentTab === 'direction' && <BusinessDirections lang={lang} />}

        {currentTab === 'press' && <PressCenter lang={lang} />}

        {currentTab === 'education' && <Education lang={lang} />}

        {currentTab === 'contacts' && <Contacts lang={lang} />}
      </main>

      {/* GLOBAL FOOTER */}
      <Footer setTab={handleSetTab} onOpenPortal={handleOpenB2BPortal} lang={lang} />

    </div>
  );
}
