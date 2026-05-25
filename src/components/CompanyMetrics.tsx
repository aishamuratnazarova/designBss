import React, { useState, useEffect } from 'react';
import { Calendar, Shield, MapPin, Grid, Activity, Award } from 'lucide-react';

interface CompanyMetricsProps {
  lang: 'RU' | 'EN';
}

export default function CompanyMetrics({ lang }: CompanyMetricsProps) {
  const [counts, setCounts] = useState({
    years: 0,
    warehouses: 0,
    offices: 0,
    pharmacies: 0
  });

  useEffect(() => {
    // Elegant counter animation
    const duration = 2000; // 2 seconds
    const steps = 50;
    const intervalTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounts({
        years: Math.min(30, Math.floor((30 / steps) * currentStep)),
        warehouses: Math.min(15, Math.floor((15 / steps) * currentStep)),
        offices: Math.min(79, Math.floor((79 / steps) * currentStep)),
        pharmacies: Math.min(650, Math.floor((650 / steps) * currentStep))
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        // Force exact numbers at the end
        setCounts({
          years: 30,
          warehouses: 15,
          offices: 79,
          pharmacies: 650
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const metricsData = [
    {
      id: 'years',
      value: `${counts.years} ${lang === 'RU' ? 'лет' : 'years'}`,
      label: lang === 'RU' ? 'Опыта на рынке фармдистрибуции' : 'Leading the market since 1996',
      desc: lang === 'RU' ? 'Уверенность, проверенная десятилетиями и кризисами.' : 'Proven stability, surviving decades of economics challenges.',
      icon: Award,
      color: 'text-brand-teal'
    },
    {
      id: 'warehouses',
      value: counts.warehouses.toString(),
      label: lang === 'RU' ? 'Логистических хабов (складов)' : 'Distribution GDP warehouses',
      desc: lang === 'RU' ? 'Собственные складские комплексы класса «А» с температурным контролем.' : 'A-class warehouses with automated temperature control loops.',
      icon: Shield,
      color: 'text-emerald-600'
    },
    {
      id: 'offices',
      value: counts.offices.toString(),
      label: lang === 'RU' ? 'Представительств по России' : 'Regional representative offices',
      desc: lang === 'RU' ? 'Локальная оперативная поддержка в ключевых городах от Владивостока до Калининграда.' : 'Local partner support team covering all key cities of Russian Fed.',
      icon: MapPin,
      color: 'text-indigo-600'
    },
    {
      id: 'pharmacies',
      value: `> ${counts.pharmacies}`,
      label: lang === 'RU' ? 'Федеральных аптек «Алоэ»' : 'Federal Aloe pharmacies',
      desc: lang === 'RU' ? 'Розничное подразделение с ежедневной помощью миллионам пациентов.' : 'Retail wing offering therapeutic counseling in neighborhood pharmacies.',
      icon: Grid,
      color: 'text-cyan-600'
    }
  ];

  return (
    <section id="metrics" className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-brand-overcast-light text-brand-teal-dark border border-brand-overcast/35 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
            <Activity className="w-3.5 h-3.5 text-brand-teal" />
            <span>{lang === 'RU' ? 'Масштаб дистрибуции' : 'Enterprise Level Scale'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-blue-deep tracking-tight">
            {lang === 'RU' ? 'БСС в цифрах и показателях' : 'BSS metrics of federal success'}
          </h2>
          <p className="text-gray-550 text-sm sm:text-base font-light font-sans max-w-2xl mx-auto text-gray-500">
            {lang === 'RU'
              ? 'Мы построили надежную инфраструктуру полного цикла: от научно-исследовательских биотехнологических разработок до финальной выдачи медикаментов в аптеках.'
              : 'Our robust system covers full bio-pharma loop: from molecular R&D synthesis to instant client supply.'}
          </p>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metricsData.map((m) => {
            const IconComponent = m.icon;
            return (
              <div
                key={m.id}
                className="glass-card p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Icon container */}
                  <div className="w-10 h-10 rounded-sm bg-[#f1fafe] flex items-center justify-center text-brand-teal mb-6">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Big Number */}
                  <div className="font-display font-black text-4xl sm:text-5xl text-brand-blue-deep tracking-tighter mb-3">
                    {m.value}
                  </div>

                  {/* Title Label */}
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    {m.label}
                  </h3>
                </div>

                <p className="text-xs text-gray-400 mt-2 leading-relaxed font-sans font-light">
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* EXTRA TRUST MESSAGE */}
        <div className="mt-16 p-8 glass-panel-dark text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border-l-4 border-brand-teal">
          <div className="space-y-2">
            <h4 className="text-lg font-display font-bold">
              {lang === 'RU' ? 'Готовы заключить договор на выгодных условиях?' : 'Looking for direct supplier contracts on best conditions?'}
            </h4>
            <p className="text-xs text-gray-400 max-w-2xl font-light font-sans">
              {lang === 'RU' 
                ? 'Для производителей лекарств и медицинских систем мы гарантируем надежный контракт с соблюдением требований комплаенса, а также стабильный сбыт в ЛПУ РФ.'
                : 'We guarantee full compliant 3PL logistics, pricing transparency, and robust security for international biochemical brands.'}
            </p>
          </div>
          <a
            href="mailto:sales@bsspharm.ru"
            className="px-8 py-4 glass-button-primary text-center flex-shrink-0 cursor-pointer shadow-lg"
          >
            {lang === 'RU' ? 'Связаться с дистрибьюторским отделом' : 'Contact Distribution Division'}
          </a>
        </div>

      </div>
    </section>
  );
}
