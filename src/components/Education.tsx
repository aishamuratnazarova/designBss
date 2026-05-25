import { LiquidButton } from './ui/liquid-glass-button';
import React, { useState } from 'react';
import { EDUCATION_EVENTS } from '../data';
import { EducationEvent } from '../types';
import { Calendar, Video, MapPin, User, Tag, Monitor, Award, CheckCircle, Clock, X, FileText, ChevronRight } from 'lucide-react';

interface EducationProps {
  lang: 'RU' | 'EN';
}

export default function Education({ lang }: EducationProps) {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDirection, setSelectedDirection] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  
  // Registration modal state
  const [activeRegEvent, setActiveRegEvent] = useState<EducationEvent | null>(null);
  
  // Form input values
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formTerms, setFormTerms] = useState(false);
  
  // Form error and success states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [regSuccess, setRegSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter events
  const filteredEvents = EDUCATION_EVENTS.filter((evt) => {
    if (selectedType !== 'all' && evt.type !== selectedType) return false;
    if (selectedDirection !== 'all' && evt.direction !== selectedDirection) return false;
    
    // Simple month matching (date: "2026-06-09" corresponds to "6" / June)
    if (selectedMonth !== 'all') {
      const monthNum = parseInt(evt.date.split('-')[1]);
      if (selectedMonth === 'june' && monthNum !== 6) return false;
      if (selectedMonth === 'may' && monthNum !== 5) return false;
    }
    return true;
  });

  const handleOpenRegistration = (evt: EducationEvent) => {
    setActiveRegEvent(evt);
    setRegSuccess(false);
    setErrors({});
    // Reset form values
    setFormName('');
    setFormRole('');
    setFormPhone('');
    setFormEmail('');
    setFormCompany('');
    setFormTerms(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate inputs
    if (!formName.trim()) {
      newErrors.name = lang === 'RU' ? 'Обязательное поле для ввода ФИО' : 'Name is required';
    } else if (formName.trim().split(' ').length < 2) {
      newErrors.name = lang === 'RU' ? 'Укажите Имя и Фамилию' : 'Provide full name';
    }

    if (!formRole.trim()) {
      newErrors.role = lang === 'RU' ? 'Укажите Вашу должность' : 'Position is required';
    }

    // Phone mask check (Russian phone contains 11 digits: +7 or 8)
    const rawPhoneDigits = formPhone.replace(/\D/g, '');
    if (!formPhone.trim()) {
      newErrors.phone = lang === 'RU' ? 'Обязательное поле для ввода телефона' : 'Phone is required';
    } else if (rawPhoneDigits.length < 10) {
      newErrors.phone = lang === 'RU' ? 'Некорректный формат телефона (+7 ___ --- __ __)' : 'Invalid phone format';
    }

    // Email check
    if (!formEmail.trim()) {
      newErrors.email = lang === 'RU' ? 'Обязательное поле для ввода E-mail' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formEmail)) {
      newErrors.email = lang === 'RU' ? 'Неверный формат адреса электронной почты' : 'Invalid email';
    }

    if (!formCompany.trim()) {
      newErrors.company = lang === 'RU' ? 'Укажите название Вашей аптеки или клиники' : 'Company/Pharmacy is required';
    }

    if (!formTerms) {
      newErrors.terms = lang === 'RU' ? 'Необходимо дать согласие на обработку персональных данных' : 'Acceptance required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit simulation with loading spinner inside registration modal
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRegSuccess(true);
    }, 1200);
  };

  const formatEventDate = (dateStr: string) => {
    const dates = dateStr.split('-');
    const day = dates[2];
    const month = dates[1];
    
    if (month === '06') return `${day} ${lang === 'RU' ? 'Июня' : 'June'} 2026`;
    if (month === '05') return `${day} ${lang === 'RU' ? 'Мая' : 'May'} 2026`;
    return dateStr;
  };

  return (
    <div id="education-schedule" className="py-12 bg-white">
      
      {/* HEADER BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav className="flex text-xs text-gray-500 font-medium space-x-2">
          <span className="hover:text-brand-teal cursor-pointer">{lang === 'RU' ? 'Главная' : 'Home'}</span>
          <span>/</span>
          <span className="text-gray-900">{lang === 'RU' ? 'Академия Обучения' : 'Education Events'}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* VIEW TITLE */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
              {lang === 'RU' ? 'Расписание научно-практических вебинаров' : 'Academy & Seminars'}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              {lang === 'RU'
                ? 'Сертифицированное образование для врачей, косметологов, провизоров и руководителей аптечного бизнеса.'
                : 'Interactive online and offline masterclasses run by Ph.D. dermatologists and key ERP integration professionals.'}
            </p>
          </div>
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-100 flex items-center space-x-2 self-start sm:self-center">
            <Monitor className="w-4 h-4" />
            <span>{lang === 'RU' ? 'Лицензия № СР-45-12' : 'Certified Academy'}</span>
          </div>
        </div>

        {/* COMBINED CONTROLS AND CALENDAR MONTH TABS */}
        <div className="glass-panel p-6 mb-8 space-y-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Type selector: toggle buttons online / offline / all */}
            <div className="space-y-1.5">
              <span className="text-xs uppercase font-extrabold text-gray-500 tracking-wider">
                {lang === 'RU' ? 'Формат проведения' : 'Event Format'}
              </span>
              <div className="flex bg-white p-1 rounded-xl border border-gray-200">
                <LiquidButton
                  onClick={() => setSelectedType('all')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedType === 'all' ? 'bg-brand-teal text-white shadow-sm' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {lang === 'RU' ? 'Все' : 'All'}
                </LiquidButton>
                <LiquidButton
                  onClick={() => setSelectedType('online')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedType === 'online' ? 'bg-brand-teal text-white shadow-sm' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {lang === 'RU' ? 'Онлайн' : 'Online'}
                </LiquidButton>
                <LiquidButton
                  onClick={() => setSelectedType('offline')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedType === 'offline' ? 'bg-brand-teal text-white shadow-sm' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {lang === 'RU' ? 'Оффлайн' : 'Offline'}
                </LiquidButton>
              </div>
            </div>

            {/* Target theme direction */}
            <div className="space-y-1.5">
              <span className="text-xs uppercase font-extrabold text-gray-500 tracking-wider">
                {lang === 'RU' ? 'Тематика обучения' : 'Direction Topic'}
              </span>
              <select
                value={selectedDirection}
                onChange={(e) => setSelectedDirection(e.target.value)}
                className="w-full bg-white border border-gray-200 px-3 py-2.5 rounded-xl text-xs text-neutral-800 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-teal"
              >
                <option value="all">{lang === 'RU' ? 'Все тематики' : 'All Directions'}</option>
                <option value="cosmetology">{lang === 'RU' ? 'Эстетическая косметология' : 'Cosmetology & Injectables'}</option>
                <option value="pharmacy">{lang === 'RU' ? 'Фармакология и терапия' : 'Pharmacy Clinical Cases'}</option>
                <option value="management">{lang === 'RU' ? 'Управление аптекой & IT' : 'Management & IT Systems'}</option>
              </select>
            </div>

            {/* Calendar Month limits tab */}
            <div className="space-y-1.5">
              <span className="text-xs uppercase font-extrabold text-gray-500 tracking-wider">
                {lang === 'RU' ? 'Месяц события' : 'Calendar Months'}
              </span>
              <div className="flex bg-white p-1 rounded-xl border border-gray-200">
                <LiquidButton
                  onClick={() => setSelectedMonth('all')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedMonth === 'all' ? 'bg-brand-teal text-white' : 'text-gray-600'
                  }`}
                >
                  {lang === 'RU' ? 'Показать все' : 'All'}
                </LiquidButton>
                <LiquidButton
                  onClick={() => setSelectedMonth('may')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedMonth === 'may' ? 'bg-brand-teal text-white' : 'text-gray-600'
                  }`}
                >
                  {lang === 'RU' ? 'Май' : 'May'}
                </LiquidButton>
                <LiquidButton
                  onClick={() => setSelectedMonth('june')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedMonth === 'june' ? 'bg-brand-teal text-white' : 'text-gray-600'
                  }`}
                >
                  {lang === 'RU' ? 'Июнь' : 'June'}
                </LiquidButton>
              </div>
            </div>

          </div>
        </div>

        {/* LIST OF EVENTS */}
        <div className="space-y-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={`glass-card border-none p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all duration-300 ${
                evt.isCompleted
                  ? 'border-gray-100 bg-gray-50/40 opacity-75'
                  : 'border-gray-150 hover:shadow-lg hover:border-brand-teal/30'
              }`}
            >
              
              {/* DATE & TIME COLUMNS */}
              <div className="flex items-start sm:items-center space-x-4 flex-shrink-0">
                {/* Visual Calendar card representation */}
                <div className={`p-4 rounded-xl flex flex-col items-center justify-center text-center w-16 sm:w-20 ${
                  evt.isCompleted ? 'bg-gray-100 text-gray-505 text-gray-400' : 'bg-brand-teal/5 text-brand-teal'
                }`}>
                  <Calendar className="w-5 h-5 mb-1" />
                  <span className="text-base sm:text-lg font-extrabold tracking-tight leading-none">
                    {evt.date.split('-')[2]}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase font-semibold">
                    {evt.date.split('-')[1] === '06' ? (lang === 'RU' ? 'Июн' : 'Jun') : (lang === 'RU' ? 'Май' : 'May')}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1 text-xs font-bold text-neutral-800">
                    <Clock className="w-3.5 h-3.5 text-brand-teal" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {evt.type === 'online' ? (
                      <span className="inline-flex items-center space-x-1 text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        <Video className="w-3 h-3" />
                        <span>Online Вебинар</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-[10px] uppercase font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                        <MapPin className="w-3 h-3" />
                        <span>Offline Семинар</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* CORE EVENT DESCRIPTION */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    {evt.directionLabel}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                    {evt.title}
                  </h3>
                </div>

                {/* Speaker profile panel */}
                <div className="flex items-start sm:items-center space-x-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100 max-w-xl">
                  {/* initials photo placeholder */}
                  <div className="w-10 h-10 rounded-full bg-brand-overcast text-white border-2 border-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm flex-shrink-0">
                    {evt.speaker.photo}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-neutral-800 flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>{evt.speaker.name}</span>
                    </p>
                    <p className="text-gray-500 font-light text-[11px] line-clamp-1">
                      {evt.speaker.position}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT ACTION COLUMN */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between lg:justify-center gap-4 w-full lg:w-auto p-4 bg-gray-50 rounded-xl border border-gray-100 sm:bg-transparent sm:border-none sm:p-0 flex-shrink-0">
                
                {/* Price tag */}
                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                  <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase block sm:mb-1">
                    {lang === 'RU' ? 'Стоимость участия' : 'Price rate'}
                  </span>
                  {evt.price === 'free' ? (
                    <span className="px-2 py-1 rounded bg-green-50 border border-green-150 text-green-700 font-extrabold text-xs uppercase">
                      {lang === 'RU' ? 'Бесплатно' : 'Free access'}
                    </span>
                  ) : (
                    <span className="text-brand-teal font-extrabold text-lg leading-none">
                      {evt.priceValue}
                    </span>
                  )}
                </div>

                {/* Event Registration action */}
                {evt.isCompleted ? (
                  <div className="flex flex-col space-y-2">
                    <span className="text-[10px] text-gray-500 font-bold uppercase py-1 px-3 bg-gray-100 rounded text-center">
                      {lang === 'RU' ? 'КУРС ЗАВЕРШЕН' : 'EVENT COMPLETED'}
                    </span>
                    <LiquidButton
                      onClick={() => alert(lang === 'RU' ? `Воспроизведение видеозаписи курса на vimeo: ${evt.recordingUrl}` : `Loading archives...`)}
                      className="px-4 py-2 bg-white hover:bg-gray-50 text-neutral-800 rounded-lg text-xs font-bold border border-gray-200 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Video className="w-3.5 h-3.5 text-red-500" />
                      <span>{lang === 'RU' ? 'Смотреть в записи' : 'Watch recording'}</span>
                    </LiquidButton>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-1.5">
                    {evt.availableSeats && (
                      <span className="text-[10px] text-gray-500 block text-right">
                        {lang === 'RU' ? 'Осталось мест:' : 'Seats available:'}{' '}
                        <strong className="text-red-500">{evt.availableSeats}</strong>
                      </span>
                    )}
                    <LiquidButton
                      onClick={() => handleOpenRegistration(evt)}
                      className="px-5 py-2.5 glass-button-primary text-xs font-bold transition-all text-center cursor-pointer"
                    >
                      {lang === 'RU' ? 'Зарегистрироваться' : 'Register Now'}
                    </LiquidButton>
                  </div>
                )}

              </div>

            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-500">
              {lang === 'RU' ? 'Мероприятий по заданным параметрам не найдено.' : 'No active educational events found.'}
            </div>
          )}
        </div>

      </div>

      {/* REGISTRATION MODAL WITH SIDE LOGIC & SUCCESS INDICATOR */}
      {activeRegEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-100 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 bg-brand-teal text-white relative">
              <LiquidButton
                onClick={() => setActiveRegEvent(null)}
                className="absolute right-4 top-4 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors"
                title="Закрыть"
              >
                <X className="w-5 h-5" />
              </LiquidButton>
              
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm inline-block mb-2">
                {activeRegEvent.directionLabel}
              </span>
              <h2 className="text-lg font-bold tracking-tight leading-snug">
                {lang === 'RU' ? 'Заявка на участие в вебинаре' : 'Webinar request'}
              </h2>
              <p className="text-xs text-brand-overcast-light mt-1.5">
                {activeRegEvent.title}
              </p>
            </div>

            {/* Modal Body / Form */}
            <div className="p-6 sm:p-8 space-y-4">
              {regSuccess ? (
                
                /* SUCCESS STATE */
                <div className="text-center py-8 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto border-2 border-emerald-200">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-extrabold text-neutral-900">
                    {lang === 'RU' ? 'Вы успешно записаны!' : 'Registration Confirmed!'}
                  </h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                    {lang === 'RU'
                      ? 'Ссылка на вход в вебинарную комнату и инструкция по подключению были автоматически отправлены на указанный E-mail. Мы также пришлем SMS-напоминание за 1 час до начала.'
                      : 'Confirmation email details was successfully sent to your address. Please check spam if missing.'}
                  </p>
                  
                  {activeRegEvent.price !== 'free' && (
                    <div className="p-3 bg-brand-overcast-light text-neutral-800 rounded-xl text-xs font-semibold max-w-xs mx-auto text-center border border-brand-overcast/15">
                      {lang === 'RU' ? `К оплате: ${activeRegEvent.priceValue}` : `Due value: ${activeRegEvent.priceValue}`}
                      <p className="text-[10px] text-gray-500 font-normal mt-1">
                        {lang === 'RU' ? 'Менеджер свяжется для выставления счета-договора.' : 'BSS finance team will coordinate the billing doc.'}
                      </p>
                    </div>
                  )}

                  <div className="pt-4">
                    <LiquidButton
                      onClick={() => setActiveRegEvent(null)}
                      className="px-6 py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800 transition-colors"
                    >
                      {lang === 'RU' ? 'Готово' : 'Done'}
                    </LiquidButton>
                  </div>
                </div>
              ) : (
                
                /* CORE FORM */
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* FIO */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                      ФИО врача / участника *
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Иванов Александр Сергеевич"
                      className={`w-full px-4 py-2.5 bg-white border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                        errors.name ? 'border-red-500' : 'border-gray-250'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-medium">{errors.name}</p>}
                  </div>

                  {/* Role / Job Option */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                      Ваша Специализация / Должность *
                    </label>
                    <input
                      type="text"
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      placeholder="Косметолог / Провизор / Заведующий аптекой"
                      className={`w-full px-4 py-2.5 bg-white border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                        errors.role ? 'border-red-500' : 'border-gray-250'
                      }`}
                    />
                    {errors.role && <p className="text-[10px] text-red-500 font-medium">{errors.role}</p>}
                  </div>

                  {/* Phone & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Phone input with validation format instructions */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                        Контактный Телефон *
                      </label>
                      <input
                        type="text"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+7 (999) 999-99-99"
                        className={`w-full px-4 py-2.5 bg-white border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                          errors.phone ? 'border-red-500' : 'border-gray-250'
                        }`}
                      />
                      {errors.phone && <p className="text-[10px] text-red-500 font-medium">{errors.phone}</p>}
                    </div>

                    {/* Email address */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                        Электронная Почта (Email) *
                      </label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="doctor@example.ru"
                        className={`w-full px-4 py-2.5 bg-white border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                          errors.email ? 'border-red-500' : 'border-gray-250'
                        }`}
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email}</p>}
                    </div>

                  </div>

                  {/* Company info */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">
                      Название Организации / Клиники / Аптеки *
                    </label>
                    <input
                      type="text"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      placeholder="Клиника красоты «Эстетика» / Аптека Алоэ № 12"
                      className={`w-full px-4 py-2.5 bg-white border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal ${
                        errors.company ? 'border-red-500' : 'border-gray-250'
                      }`}
                    />
                    {errors.company && <p className="text-[10px] text-red-500 font-medium">{errors.company}</p>}
                  </div>

                  {/* Terms acceptance Checkbox mandated */}
                  <div className="space-y-1 pt-2">
                    <label className="flex items-start space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formTerms}
                        onChange={(e) => setFormTerms(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-brand-teal focus:ring-brand-teal border-gray-300 rounded"
                      />
                      <span className="text-[10px] text-gray-500 leading-snug">
                        Я подтверждаю достоверность информации и даю безусловное согласие на обработку моих персональных данных в соответствии с требованиями Федерального закона ФЗ-152 РФ и политикой конфиденциальности.
                      </span>
                    </label>
                    {errors.terms && <p className="text-[10px] text-red-500 font-medium">{errors.terms}</p>}
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                    <LiquidButton
                      type="button"
                      onClick={() => setActiveRegEvent(null)}
                      className="px-4 py-2 text-xs text-gray-500 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {lang === 'RU' ? 'Отмена' : 'Cancel'}
                    </LiquidButton>
                    
                    <LiquidButton
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-brand-teal hover:bg-brand-teal-hover text-white rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-brand-teal mr-2" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span>{lang === 'RU' ? 'Отправка заявки...' : 'Sending registration...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{lang === 'RU' ? 'Отправить заявку' : 'Confirm Registration'}</span>
                        </>
                      )}
                    </LiquidButton>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
