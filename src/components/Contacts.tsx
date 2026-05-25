import { LiquidButton } from './ui/liquid-glass-button';
import React, { useState, useRef } from 'react';
import { BRANCHES } from '../data';
import { Branch } from '../types';
import { Mail, Phone, MapPin, Clock, Search, Send, Upload, Paperclip, AlertCircle, Sparkles, Map, Info, CheckCircle } from 'lucide-react';

interface ContactsProps {
  lang: 'RU' | 'EN';
}

export default function Contacts({ lang }: ContactsProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('spb');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [showScrollWarning, setShowScrollWarning] = useState(false);

  // Helpdesk Request Form states
  const [ticketTopic, setTicketTopic] = useState('collaboration');
  const [ticketName, setTicketName] = useState('');
  const [ticketContact, setTicketContact] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  
  // File upload state matching usablity guidelines (supports drag-and-drop & manual selection)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Form submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const activeBranch = BRANCHES.find((b) => b.id === selectedBranchId) || BRANCHES[0];

  // Filter branches for autocomplete dropdown query
  const filteredBranches = BRANCHES.filter((b) =>
    b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Drag over handler
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Drop handler
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // Select file manual
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    setFileError(null);
    // Limit file size to 10MB as requested
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setFileError(lang === 'RU' ? 'Файл слишком большой. Максимальный размер 10 МБ.' : 'File too large. Maximum size is 10MB.');
      setUploadedFile(null);
    } else {
      setUploadedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName.trim() || !ticketContact.trim() || !ticketMessage.trim()) {
      alert(lang === 'RU' ? 'Пожалуйста, заполните необходимые поля формы.' : 'Fill required entry fields first.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset
      setTicketName('');
      setTicketContact('');
      setTicketMessage('');
      setUploadedFile(null);
    }, 1500);
  };

  return (
    <div id="contacts-page" className="py-12 bg-white">
      
      {/* HEADER BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex text-xs text-gray-500 font-medium space-x-2">
          <span className="hover:text-brand-teal cursor-pointer">{lang === 'RU' ? 'Главная' : 'Home'}</span>
          <span>/</span>
          <span className="text-gray-900">{lang === 'RU' ? 'Контакты и офисы' : 'Contacts'}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* VIEW TITLE */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            {lang === 'RU' ? 'География присутствия BSS Holding' : 'Our Branches & Locations'}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {lang === 'RU'
              ? '15 крупных логистических складов и 79 представительств на всей территории РФ. Свяжитесь напрямую с ключевыми подразделениями.'
              : 'Our distributed hub networks secure instant cargo logistics. Get in touch with regional commercial agents.'}
          </p>
        </div>

        {/* REGIONAL SELECTOR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* LEFT SELECTOR & BRANCH INFORMATION CARD */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Search and Dropdown city list selector */}
            <div className="glass-panel p-4 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-505 text-gray-400 block">
                {lang === 'RU' ? 'Выбор города (из 15 логистических хабов)' : 'Select City Hub'}
              </span>
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={lang === 'RU' ? 'Поиск по городам присутствия...' : 'Search hub city...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-250 rounded-xl text-xs text-black focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>

              {/* Dynamic city list tags based on search */}
              <div className="flex flex-wrap gap-1.5 pt-2 max-h-[140px] overflow-y-auto pr-1">
                {filteredBranches.map((b) => (
                  <LiquidButton
                    key={b.id}
                    onClick={() => {
                      setSelectedBranchId(b.id);
                      setSearchQuery('');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-tight transition-colors ${
                      selectedBranchId === b.id
                        ? 'bg-brand-teal text-white'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {b.city}
                  </LiquidButton>
                ))}
                {filteredBranches.length === 0 && (
                  <span className="text-[11px] text-gray-400 italic">
                    {lang === 'RU' ? 'Город не найден в логистических центрах' : 'Hub not found'}
                  </span>
                )}
              </div>
            </div>

            {/* DYNAMIC INFORMATION CARD OFFICE */}
            <div className="p-6 sm:p-8 glass-panel-dark text-white border-gray-800 shadow-xl space-y-6">
              
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-teal bg-brand-teal/15 px-2.5 py-1 rounded">
                  {lang === 'RU' ? 'Региональный Узел' : 'Regional Branch Node'}
                </span>
                <h3 className="text-xl font-extrabold tracking-tight mt-3">
                  {activeBranch.city} • {activeBranch.name}
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                
                {/* Physical address */}
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 font-bold block">
                      {lang === 'RU' ? 'Точный адрес' : 'Postal address'}
                    </span>
                    <p className="text-gray-200 mt-1">{activeBranch.address}</p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 font-bold block">
                      {lang === 'RU' ? 'Режим работы' : 'Working hours'}
                    </span>
                    <p className="text-gray-200 mt-1">{activeBranch.hours}</p>
                  </div>
                </div>

                {/* Telephone links */}
                <div className="flex items-start space-x-3.5 border-t border-gray-800 pt-4">
                  <Phone className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 font-bold block">
                      {lang === 'RU' ? 'Контактные телефоны' : 'Phones'}
                    </span>
                    <div className="mt-1 space-y-1">
                      {activeBranch.phones.map((phone, idx) => (
                        <a
                          key={idx}
                          href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                          className="text-white hover:text-brand-teal hover:underline font-semibold block"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Emails division */}
                <div className="flex items-start space-x-3.5 border-t border-gray-800 pt-4">
                  <Mail className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 font-bold block">
                      {lang === 'RU' ? 'Электронные адреса отделов' : 'Division Emails'}
                    </span>
                    <div className="mt-1.5 space-y-2 text-[11px] grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(activeBranch.emails).map(([dept, email]) => (
                        <div key={dept}>
                          <span className="text-gray-400 capitalize block text-[10px] font-mono">
                            {dept === 'office' ? 'Общий офис' : dept === 'sales' ? 'Продажи' : dept === 'hr' ? 'Вакансии' : 'Поддержка'}
                          </span>
                          <a href={`mailto:${email}`} className="text-brand-overcast hover:underline font-bold block truncate">
                            {email}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
              
              <div className="p-4 bg-brand-teal/10 rounded-xl border border-brand-teal/20 text-[11px] text-brand-overcast-light flex items-center space-x-2.5">
                <Info className="w-4 h-4 text-brand-teal flex-shrink-0" />
                <span>
                  {lang === 'RU' 
                    ? 'Склады осуществляют отгрузку товара партнёрам 24 часа в сутки.' 
                    : 'Logistic centers are always working, loading trucks round-the-clock.'}
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT MAP SECTION */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* MOBILE TOGGLE TRIGGER CONTROLS */}
            <div className="lg:hidden mb-4 flex justify-center">
              <LiquidButton
                onClick={() => setShowMobileMap(!showMobileMap)}
                className="px-5 py-2.5 glass-button-dark absolute text-white text-xs font-bold shadow flex items-center space-x-2"
              >
                <Map className="w-4 h-4 text-brand-teal" />
                <span>{showMobileMap ? (lang === 'RU' ? 'Скрыть интерактивную карту' : 'Hide Map') : (lang === 'RU' ? 'Показать интерактивную карту' : 'Show Map')}</span>
              </LiquidButton>
            </div>

            {/* INTERACTIVE COMPREHENSIVE VECTOR MAP - matching exactly the designer coordinates and layout request */}
            <div
              className={`relative h-[440px] bg-sky-950/10 rounded-2xl border border-gray-100 overflow-hidden flex flex-col items-center justify-center ${
                !showMobileMap ? 'hidden lg:flex' : 'flex'
              }`}
              onWheel={(e) => {
                // If scroll on map container without Ctrl, show warning overlay! Exactly as requested
                if (!e.ctrlKey) {
                  setShowScrollWarning(true);
                  setTimeout(() => setShowScrollWarning(false), 2400);
                }
              }}
            >
              
              {/* WARNING SCROLL ZOOM OVERLAY */}
              {showScrollWarning && (
                <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center text-center p-4 transition-opacity duration-300">
                  <div className="bg-neutral-900 border border-brand-teal/25 rounded-2xl p-6 max-w-xs space-y-3 text-white">
                    <Info className="w-8 h-8 text-brand-teal mx-auto animate-bounce" />
                    <p className="text-xs">
                      {lang === 'RU' 
                        ? 'Используйте Ctrl + scroll для масштабирования интерактивной карты.' 
                        : 'Use Ctrl + scroll to scale dynamic vector indicators.'}
                    </p>
                  </div>
                </div>
              )}

              {/* DUMMY SCHEMATIC RUSSIA MAP SCHEMES FOR HIGH-END VISUAL QUALITY */}
              <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 1000 600" className="w-full h-full text-indigo-950 fill-current opacity-30">
                  {/* Schematic broad layout contour vector */}
                  <path d="M50 200 C150 180 250 100 350 100 C450 100 550 120 650 140 C750 140 850 180 950 120 C920 250 890 380 950 500 C800 520 700 480 500 450 C300 450 200 500 50 420 Z" />
                </svg>
              </div>

              {/* MAP GRID PERIMETERS */}
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Map Title banner overlay */}
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-200 text-[10px] text-gray-500 font-bold z-10 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
                <span>{lang === 'RU' ? 'СХЕМА СКЛАДСКОЙ ЛОГИСТИКИ БСС' : 'BSS TRANSPORT PERIMETER NODES'}</span>
              </div>

              {/* PINS ON THE VECTOR CANVAS MAP */}
              <div className="relative w-full h-full">
                
                {/* SVG connection lines representing federal transport logistics paths */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-brand-teal/20 stroke-2" fill="none">
                  <line x1="12%" y1="22%" x2="25%" y2="40%" /> {/* SPB to MSK */}
                  <line x1="25%" y1="40%" x2="42%" y2="52%" /> {/* MSK to Kazan */}
                  <line x1="25%" y1="40%" x2="35%" y2="80%" /> {/* MSK to Rostov */}
                  <line x1="42%" y1="52%" x2="65%" y2="58%" /> {/* Kazan to Ekaterinburg */}
                  <line x1="65%" y1="58%" x2="84%" y2="60%" /> {/* Ekaterinburg to Novosibirsk */}
                </svg>

                {/* Saint Petersburg (SPB) - Headquarter */}
                <LiquidButton
                  onClick={() => setSelectedBranchId('spb')}
                  style={{ top: '22%', left: '12%' }}
                  className={`absolute group transform -translate-x-1/2 -translate-y-1/2 z-10`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    selectedBranchId === 'spb' ? 'bg-brand-teal text-white scale-125 ring-4 ring-brand-teal/20' : 'bg-white text-brand-teal border border-brand-overcast hover:scale-110'
                  }`}>
                    <span className="text-[9px] font-extrabold font-mono">СПБ</span>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-neutral-900 border border-gray-800 text-white text-[8px] font-bold py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {lang === 'RU' ? 'ЦЕНТР (Санкт-Петербург)' : 'HQ St.Petersburg'}
                  </div>
                </LiquidButton>

                {/* Moscow (MSK) */}
                <LiquidButton
                  onClick={() => setSelectedBranchId('msk')}
                  style={{ top: '40%', left: '25%' }}
                  className="absolute group transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    selectedBranchId === 'msk' ? 'bg-brand-teal text-white scale-125 ring-4 ring-brand-teal/20' : 'bg-white text-brand-teal border border-brand-overcast hover:scale-110'
                  }`}>
                    <span className="text-[9px] font-extrabold font-mono">МСК</span>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-neutral-900 border border-gray-800 text-white text-[8px] font-bold py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Москва
                  </div>
                </LiquidButton>

                {/* Ekaterinburg (EKB) */}
                <LiquidButton
                  onClick={() => setSelectedBranchId('ekb')}
                  style={{ top: '58%', left: '65%' }}
                  className="absolute group transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    selectedBranchId === 'ekb' ? 'bg-brand-teal text-white scale-125 ring-4 ring-brand-teal/20' : 'bg-white text-brand-teal border border-brand-overcast hover:scale-110'
                  }`}>
                    <span className="text-[9px] font-extrabold font-mono">ЕКБ</span>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-neutral-900 border border-gray-800 text-white text-[8px] font-bold py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Екатеринбург
                  </div>
                </LiquidButton>

                {/* Kazan (KZN) */}
                <LiquidButton
                  onClick={() => setSelectedBranchId('kzn')}
                  style={{ top: '52%', left: '42%' }}
                  className="absolute group transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    selectedBranchId === 'kzn' ? 'bg-brand-teal text-white scale-125 ring-4 ring-brand-teal/20' : 'bg-white text-brand-teal border border-brand-overcast hover:scale-110'
                  }`}>
                    <span className="text-[9px] font-extrabold font-mono">КЗН</span>
                  </div>
                </LiquidButton>

                {/* Rostov (RND) */}
                <LiquidButton
                  onClick={() => setSelectedBranchId('rnd')}
                  style={{ top: '80%', left: '35%' }}
                  className="absolute group transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    selectedBranchId === 'rnd' ? 'bg-brand-teal text-white scale-125 ring-4 ring-brand-teal/20' : 'bg-white text-brand-teal border border-brand-overcast hover:scale-110'
                  }`}>
                    <span className="text-[9px] font-extrabold font-mono">РНД</span>
                  </div>
                </LiquidButton>

                {/* Novosibirsk (NSK) */}
                <LiquidButton
                  onClick={() => setSelectedBranchId('novosib')}
                  style={{ top: '60%', left: '84%' }}
                  className="absolute group transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    selectedBranchId === 'novosib' ? 'bg-brand-teal text-white scale-125 ring-4 ring-brand-teal/20' : 'bg-white text-brand-teal border border-brand-overcast hover:scale-110'
                  }`}>
                    <span className="text-[9px] font-extrabold font-mono">НСК</span>
                  </div>
                </LiquidButton>

              </div>

              {/* Map footer with indicators */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-gray-150 text-[10px] text-gray-500 flex items-center justify-between z-10">
                <span className="font-light">
                  {lang === 'RU' ? 'Кликните на кружки (СПБ, МСК...) для вывода адреса.' : 'Click any node to switch detailed panel.'}
                </span>
                <span className="font-extrabold text-brand-teal uppercase tracking-widest">{activeBranch.city}</span>
              </div>

            </div>

          </div>

        </div>

        {/* FEEDBACK FORM - Остались вопросы? */}
        <div className="glass-panel p-6 sm:p-10 max-w-4xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-905 text-neutral-900 tracking-tight">
              {lang === 'RU' ? 'Остались вопросы? Обратная связь' : 'Submit feedback support enquries'}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              {lang === 'RU'
                ? 'Направить официальное обращение, предложение о закупках или претензионную жалобу. Наша юридическая и коммерческая служба ответит в течение 24 часов.'
                : 'Formulate your official requests to departments. BSS legal agents respond in 24 business hours.'}
            </p>
          </div>

          {submitSuccess ? (
            
            /* SUCCESS FEEDBACK SUBMIT SCREEN */
            <div className="text-center py-8 space-y-4 max-w-sm mx-auto animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-neutral-900">
                {lang === 'RU' ? 'Обращение зарегистрировано!' : 'Message Submitted!'}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {lang === 'RU' 
                  ? `Спасибо за предоставленные данные! Вашему тикету присвоен ID #${Math.floor(Math.random() * 90000) + 10000}. Менеджеры свяжутся в ближайшее время.` 
                  : 'We have catalogued your ticket and forwarded it to designated departments.'}
              </p>
              <LiquidButton
                onClick={() => setSubmitSuccess(false)}
                className="px-5 py-2 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-80s"
              >
                {lang === 'RU' ? 'Написать еще' : 'Submit another'}
              </LiquidButton>
            </div>
          ) : (
            
            /* FEEDBACK TICKET FORM */
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Topic select */}
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wide block">
                    {lang === 'RU' ? 'Тема обращения *' : 'Inquiry Topic *'}
                  </label>
                  <select
                    value={ticketTopic}
                    onChange={(e) => setTicketTopic(e.target.value)}
                    className="w-full bg-white border border-gray-250 px-3.5 py-2.5 rounded-xl text-xs text-neutral-800 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  >
                    <option value="purchasing">{lang === 'RU' ? 'Закупки лекарств / Коммерческие прайсы' : 'Procurements & Pricing'}</option>
                    <option value="collaboration">{lang === 'RU' ? 'Сотрудничество с поставщиками (3PL)' : 'Supplier Logistics 3PL'}</option>
                    <option value="education">{lang === 'RU' ? 'Запись в Академию Обучения EndoArt' : 'Cosmetology Education Programs'}</option>
                    <option value="complaint">{lang === 'RU' ? 'Подать Жалобу / Претензию' : 'Quality Complaints'}</option>
                  </select>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wide block">
                    {lang === 'RU' ? 'Ваше Имя *' : 'Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketName}
                    onChange={(e) => setTicketName(e.target.value)}
                    placeholder={lang === 'RU' ? 'Иван Смирнов' : 'John Doe'}
                    className="w-full px-4 py-2.5 bg-white border border-gray-250 rounded-xl text-xs text-black focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                </div>

              </div>

              {/* Contact phone/email */}
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wide block">
                  {lang === 'RU' ? 'Электронная почта или Телефон для связи *' : 'Contact Phone or Email *'}
                </label>
                <input
                  type="text"
                  required
                  value={ticketContact}
                  onChange={(e) => setTicketContact(e.target.value)}
                  placeholder="name@company.ru или +7 (999) 000-00-00"
                  className="w-full px-4 py-2.5 bg-white border border-gray-250 rounded-xl text-xs text-black focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wide block">
                  {lang === 'RU' ? 'Текст обращения *' : 'Enquiry Description *'}
                </label>
                <textarea
                  required
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  rows={4}
                  placeholder={lang === 'RU' ? 'Опишите ваше предложение или перечислите перечень лекарственных препаратов, планируемых к поставке...' : 'Describe details...'}
                  className="w-full px-4 py-2.5 bg-white border border-gray-250 rounded-xl text-xs text-black focus:outline-none focus:ring-2 focus:ring-brand-teal resize-none"
                />
              </div>

              {/* DRAG AND DROP FILE UPLOAD AREA (matching usability guidelines exactly) */}
              <div className="space-y-1.5">
                <span className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wide block">
                  {lang === 'RU' ? 'Прикрепить правоустанавливающие файлы / Лицензии (до 10 МБ)' : 'Attach legal certificates / Licenses (Max 10MB)'}
                </span>
                
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-5 text-center transition-colors flex flex-col items-center justify-center ${
                    dragActive ? 'border-brand-teal bg-brand-teal/5' : 'border-gray-250 hover:bg-gray-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg"
                  />
                  
                  {uploadedFile ? (
                    <div className="space-y-2 text-xs flex flex-col items-center animate-fade-in">
                      <Paperclip className="w-8 h-8 text-brand-teal" />
                      <p className="font-semibold text-neutral-800 text-xs">
                        {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                      <LiquidButton
                        type="button"
                        onClick={handleRemoveFile}
                        className="text-[10px] text-red-500 hover:underline font-bold"
                      >
                        {lang === 'RU' ? 'Удалить прикрепленный файл' : 'Remove file'}
                      </LiquidButton>
                    </div>
                  ) : (
                    <div className="space-y-2 text-center text-xs text-gray-500">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <p>
                        {lang === 'RU' 
                          ? 'Перетащите файлы сюда (Drag & Drop) или ' 
                          : 'Drag and drop certificates here or '}
                        <LiquidButton
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-brand-teal font-bold hover:underline"
                        >
                          {lang === 'RU' ? 'выберите вручную' : 'browse files'}
                        </LiquidButton>
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {lang === 'RU' ? 'Поддерживаемые форматы: PDF, Word, Excel, JPG, PNG' : 'Admitted format: PDF, Word, Excel, Images'}
                      </p>
                    </div>
                  )}
                  {fileError && (
                    <div className="mt-2 text-[10px] text-red-500 font-bold flex items-center space-x-1 justify-center">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{fileError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTION SUBMIT BUTTON */}
              <div className="pt-2 text-right">
                <LiquidButton
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3.5 glass-button-dark text-white font-bold text-xs shadow-md flex items-center space-x-2 ml-auto cursor-pointer disabled:bg-gray-100 disabled:text-gray-400"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-brand-teal mr-2" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>{lang === 'RU' ? 'Отправка...' : 'Submitting...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-brand-teal" />
                      <span>{lang === 'RU' ? 'Отправить обращение в БСС' : 'Submit Feedback Ticket'}</span>
                    </>
                  )}
                </LiquidButton>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
