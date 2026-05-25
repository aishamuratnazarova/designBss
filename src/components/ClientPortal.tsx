import { LiquidButton } from './ui/liquid-glass-button';
import React, { useState } from 'react';
import { MOCK_ORDERS, MOCK_DOCUMENTS } from '../data';
import { Eye, EyeOff, ShieldAlert, KeyRound, ArrowLeft, Download, FileSpreadsheet, Lock, Sparkles, LogOut, CheckCircle2, RefreshCw, Upload, Clock, PhoneCall, Check, FileText } from 'lucide-react';

interface ClientPortalProps {
  onClose: () => void; // safely exit back to public site
  lang: 'RU' | 'EN';
}

export default function ClientPortal({ onClose, lang }: ClientPortalProps) {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation errors
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Authed internal states
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [cabinetTab, setCabinetTab] = useState<'orders' | 'documents' | 'pricelist'>('orders');
  const [signingDocId, setSigningDocId] = useState<string | null>(null);
  const [signingSuccess, setSigningSuccess] = useState<string | null>(null);
  const [xlsLoading, setXlsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setPasswordError('');
    setServerError('');

    let hasErrors = false;
    if (!loginInput.trim()) {
      setLoginError(lang === 'RU' ? 'Обязательное поле' : 'Field is required');
      hasErrors = true;
    }
    if (!passwordInput.trim()) {
      setPasswordError(lang === 'RU' ? 'Обязательное поле' : 'Field is required');
      hasErrors = true;
    }

    if (hasErrors) return;

    // Simulation server login checking logic
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      // Valid simulation credentials: ИНН must be numbers or "demo", password can be anything unless "wrong"
      if (loginInput.toLowerCase() === 'error' || passwordInput.toLowerCase() === 'wrong') {
        setServerError(lang === 'RU' ? 'Неверный логин, ИНН или пароль' : 'Invalid login, INN or password');
      } else {
        setIsLoggedIn(true);
      }
    }, 1500); // 1.5 seconds spinner loading states
  };

  // Sign document simulation
  const handleSignDocument = (docId: string) => {
    setSigningDocId(docId);
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) => {
          if (doc.id === docId) {
            return { ...doc, status: 'fully_signed' };
          }
          return doc;
        })
      );
      setSigningDocId(null);
      setSigningSuccess(docId);
      setTimeout(() => setSigningSuccess(null), 3000);
    }, 1200);   
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Download Price sheet XLS simulation
  const handleDownloadXLS = () => {
    setXlsLoading(true);
    setTimeout(() => {
      setXlsLoading(false);
      setToastMessage(lang === 'RU' 
        ? 'Прайс-лист "BSS_PRICELIST_25.05.2026.xlsx" объемом 12 400 позиций успешно скачан!' 
        : 'Pricelist successfully generated and downloaded.'
      );
      setTimeout(() => setToastMessage(null), 4000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-neutral-800 font-sans relative">
      
      {/* Dynamic Sleek Floating Toast Banners */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[100] max-w-sm w-full bg-[#002B5B] text-white p-4 rounded-sm border-l-4 border-[#00A8E8] shadow-2xl animate-fade-in flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed font-sans font-medium">
            {toastMessage}
          </div>
        </div>
      )}
      
      {/* 1. Header (Шапка авторизации / кабинета) */}
      <header className="glass-header py-4.5 px-4 sm:px-6 z-40 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo BSS Left */}
          <div className="flex items-center space-x-3.5">
            <div className="w-8.5 h-8.5 bg-[#002B5B] flex items-center justify-center p-1.5 rounded-sm">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#00A8E8] fill-current">
                <path d="M50 85 V45 M50 55 C42 45 35 48 30 52 M50 62 C58 52 65 55 70 58" stroke="currentColor" strokeWidth="10" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <div>
              <div className="font-display font-black text-lg leading-none tracking-tight flex items-center space-x-1.5">
                <span className="text-brand-blue-deep font-display font-semibold">БСС</span>
                <span className="text-[#00A8E8] text-[9px] tracking-widest font-bold px-1.5 py-0.5 rounded-sm bg-[#00A8E8]/10">B2B ПОРТАЛ</span>
              </div>
              <p className="text-[8.5px] uppercase tracking-[0.18em] text-gray-400 font-bold font-sans">
                {lang === 'RU' ? 'КЛИЕНТСКИЙ КАБИНЕТ' : 'CLIENT SECURE ROOM'}
              </p>
            </div>
          </div>

          {/* Quick Support & Public site links */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-xs text-gray-600 font-sans">
            <div className="hidden sm:flex flex-col items-end text-[10px]">
              <span className="text-gray-400 uppercase tracking-widest text-[8px] font-bold">{lang === 'RU' ? 'Поддержка B2B:' : 'B2B Support:'}</span>
              <a href="tel:+78123277474" className="font-bold text-neutral-900 hover:text-brand-teal transition-colors">
                +7 (812) 327-74-74
              </a>
            </div>

            <LiquidButton
              onClick={onClose}
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-gray-800 rounded-sm font-bold text-[10px] uppercase tracking-wider border border-gray-200 flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'RU' ? 'Вернуться' : 'Public Web'}</span>
            </LiquidButton>
          </div>

        </div>
      </header>

      {/* CORE CONTAINER */}
      <div className="flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        
        {!isLoggedIn ? (
          
          /* ======================================= */
          /*        2. AUTH FORM  (ВХОД)             */
          /* ======================================= */
          <div className="max-w-md w-full mx-auto glass-panel overflow-hidden p-6 sm:p-10 space-y-6 animate-slide-down font-sans">
            
            {/* Title Area */}
            <div className="text-center space-y-2">
              <div className="w-11 h-11 bg-brand-teal/15 rounded-sm flex items-center justify-center mx-auto text-[#00A8E8]">
                <KeyRound className="w-5.5 h-5.5" />
              </div>
              <h2 className="text-xl font-display font-semibold text-brand-blue-deep tracking-tight">
                {lang === 'RU' ? 'ВХОД ДЛЯ ПАРТНЕРОВ' : 'B2B Partner Sign In'}
              </h2>
              <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-light">
                {lang === 'RU' 
                  ? 'Введите логин партнера (коммерческий код) или ИНН компании для доступа к прайс-листам и заказам.' 
                  : 'Requires security credentials code or INN assigned by BSS distributors.'}
              </p>
            </div>

            {/* SERVER ERROR BAR */}
            {serverError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700 flex items-start space-x-2 animate-fade-in font-medium">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
                <span>{serverError}</span>
              </div>
            )}

            {/* AUTH FORM COMPONENT */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Login / INN Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest font-sans">
                    {lang === 'RU' ? 'Код партнера или ИНН компании *' : 'Client ID or Company INN *'}
                  </label>
                  <span className="text-[9px] text-[#00A8E8] font-mono tracking-wider font-semibold">Demo: demo</span>
                </div>
                
                <input
                  type="text"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="Например, 7813084341"
                  className={`w-full px-4.5 py-3.5 bg-slate-50 border rounded-sm text-xs focus:outline-none focus:ring-2 focus:ring-[#00A8E8] focus:border-transparent transition-all font-sans font-light ${
                    loginError ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200'
                  }`}
                />
                
                {loginError && (
                  <p className="text-[10px] text-red-500 font-bold flex items-center space-x-1 font-sans">
                    <span className="inline-block w-1 h-1 bg-red-500" />
                    <span>{loginError}</span>
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest font-sans">
                    {lang === 'RU' ? 'Пароль доступа *' : 'Password *'}
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      setToastMessage(lang === 'RU' 
                        ? 'Для восстановления пароля обратитесь в дистрибуторский отдел: +7 (812) 327-74-74 или к вашему менеджеру.' 
                        : 'Contact your assigned agent: +7 (812) 327-74-74.'
                      );
                      setTimeout(() => setToastMessage(null), 5000);
                    }}
                    className="text-[9.5px] text-[#00A8E8] font-bold uppercase tracking-wider hover:underline font-sans"
                  >
                    {lang === 'RU' ? 'Забыли пароль?' : 'Forgot?'}
                  </a>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full px-4.5 py-3.5 bg-slate-50 border rounded-sm text-xs focus:outline-none focus:ring-2 focus:ring-[#00A8E8] focus:border-transparent transition-all font-sans font-light ${
                      passwordError ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200'
                    }`}
                  />
                  <LiquidButton
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-black"
                    title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </LiquidButton>
                </div>

                {passwordError && (
                  <p className="text-[10px] text-red-500 font-bold flex items-center space-x-1 font-sans">
                    <span className="inline-block w-1 h-1 bg-red-500" />
                    <span>{passwordError}</span>
                  </p>
                )}
              </div>

              {/* Remember me trigger */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2.5 cursor-pointer font-sans select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#00A8E8] focus:ring-[#00A8E8]/50 border-gray-350 rounded-sm"
                  />
                  <span className="text-[11px] text-gray-400 font-sans font-light">
                    {lang === 'RU' ? 'Запомнить меня' : 'Remember me next sessions'}
                  </span>
                </label>
              </div>

              {/* Submitting button with Loading spinner */}
              <div className="pt-2">
                <LiquidButton
                  type="submit"
                  disabled={authLoading}
                  className="w-full px-4.5 py-3.5 glass-button-dark text-[10px] sm:text-xs font-bold shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 text-center uppercase"
                >
                  {authLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-brand-teal" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>{lang === 'RU' ? 'АВТОРИЗАЦИЯ...' : 'AUTHENTICATING...'}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#00A8E8]" />
                      <span>{lang === 'RU' ? 'ВОЙТИ В КАБИНЕТ B2B' : 'SIGN IN B2B PORTAL'}</span>
                    </>
                  )}
                </LiquidButton>
              </div>

            </form>

            <div className="border-t border-gray-100 pt-5 text-center text-xs text-gray-400 font-light leading-relaxed">
              <p>
                {lang === 'RU' 
                  ? 'По вопросам получения кодов авторизации обращайтесь к вашему куратору в коммерческом отделе БСС.' 
                  : 'Secure 256-bit SSL connection. Data exchanges are protected.'}
              </p>
            </div>

          </div>
        ) : (
          
          /* ======================================= */
          /*        3. AUTHED CABINET ROOM           */
          /* ======================================= */
          <div className="max-w-7xl w-full mx-auto glass-card overflow-hidden animate-fade-in flex flex-col min-h-[560px] font-sans">
            
            {/* CABINET BANNER TABS */}
            <div className="bg-[#002B5B] text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#00A8E8]/25">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-display font-bold text-green-400 uppercase tracking-widest">
                    {lang === 'RU' ? 'B2B ПРОФИЛЬ: СЕССИЯ АКТИВНА' : 'PARTNER ACTIVE STATUS'}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-display font-semibold tracking-tight text-white">
                  {lang === 'RU' ? 'ООО «ФармАльянс-Регионы» (ИНН 7810149022)' : 'PharmAlliance Regions LLC'}
                </h2>
                <div className="text-[10px] text-gray-300 font-sans font-light">
                  {lang === 'RU' ? 'Персональный менеджер: Родионова Вера Павловна' : 'Assigned manager: Vera Rodionova'} •{' '}
                  <span className="text-sky-300 font-bold hover:text-white transition-colors cursor-pointer">v.rodionova@bsspharm.ru</span>
                </div>
              </div>

              <LiquidButton
                onClick={() => {
                  setIsLoggedIn(false);
                  setLoginInput('');
                  setPasswordInput('');
                }}
                className="px-4 py-2 bg-[#00A8E8]/10 hover:bg-[#00A8E8]/20 text-white rounded-sm border border-[#00A8E8]/30 font-bold text-[10px] uppercase tracking-wider transition-all flex items-center space-x-1.5 self-start sm:self-center cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-brand-teal" />
                <span>{lang === 'RU' ? 'ВЫХОД' : 'Sign Out'}</span>
              </LiquidButton>
            </div>

            {/* INNER NAVIGATION COLUMN & BODY PANEL GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 flex-grow">
              
              {/* Left tab selectors */}
              <div className="md:col-span-1 border-r border-gray-150 bg-slate-50/50 p-4 space-y-1.5">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 block px-3 mb-2 font-display">
                  {lang === 'RU' ? 'РАЗДЕЛЫ КАБИНЕТА' : 'SECTIONS'}
                </span>
                {[
                  { id: 'orders', label: lang === 'RU' ? 'Мои Заказы (К отгрузке)' : 'Active Orders', count: orders.length },
                  { id: 'documents', label: lang === 'RU' ? 'Электронный документооборот' : 'E-Documents', count: documents.filter(d=>d.status!=='fully_signed').length },
                  { id: 'pricelist', label: lang === 'RU' ? 'Скачать оптовые Прайс-листы' : 'Download Pricelist' },
                ].map((tab) => (
                  <LiquidButton
                    key={tab.id}
                    onClick={() => setCabinetTab(tab.id as any)}
                    className={`w-full text-left px-4 py-3 rounded-sm text-xs font-bold tracking-tight transition-all flex items-center justify-between cursor-pointer font-sans ${
                      cabinetTab === tab.id
                        ? 'bg-[#002B5B] text-white shadow'
                        : 'text-gray-650 hover:bg-slate-100 hover:text-black'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold font-mono ${
                        cabinetTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </LiquidButton>
                ))}

                <div className="border-t border-gray-200 pt-4 mt-6 px-3">
                  <span className="text-[9px] uppercase font-bold tracking-[0.12em] text-gray-400 block mb-1">
                    {lang === 'RU' ? 'ВАШ ОСТАТОК КРЕДИТА' : 'CREDIT DISPOSABLE'}
                  </span>
                  <div className="font-display font-black text-[#002B5B] text-base tracking-tight">
                    3 420 500.00 ₽
                  </div>
                  <div className="w-full bg-slate-200 h-1 rounded-sm mt-1.5 overflow-hidden">
                    <div className="bg-[#00A8E8] h-full w-2/3" />
                  </div>
                  <span className="text-[8.5px] text-gray-400 mt-1 block font-sans font-light">
                    {lang === 'RU' ? 'Лимит: 5 000 000 ₽. Срок отсрочки 30 дней.' : 'Limit: 5 000 000 ₽.'}
                  </span>
                </div>
              </div>

              {/* Right content view area */}
              <div className="md:col-span-3 p-6 sm:p-8 space-y-6 overflow-y-auto">
                
                {/* 3.1 ORDERS TAB */}
                {cabinetTab === 'orders' && (
                  <div className="space-y-4 animate-fade-in font-sans">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <h3 className="text-sm font-display font-semibold text-brand-blue-deep uppercase tracking-widest">
                        {lang === 'RU' ? 'История поставок и движения грузов' : 'Recent Supply Orders'}
                      </h3>
                      <LiquidButton
                        onClick={() => {
                          setToastMessage(lang === 'RU' ? 'Список заказов успешно обновлен со складов холдинга!' : 'Order sheet synchronized.');
                          setTimeout(() => setToastMessage(null), 3500);
                        }}
                        className="p-1.5 rounded-sm border border-gray-200 text-gray-400 hover:text-black bg-white shadow-xs cursor-pointer hover:border-gray-300 transition-all"
                        title="Обновить"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </LiquidButton>
                    </div>

                    <div className="border border-gray-200 rounded-sm overflow-hidden">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-gray-400 border-b border-gray-250 font-display font-bold uppercase tracking-wider text-[9px]">
                            <th className="p-3.5 font-bold">{lang === 'RU' ? 'ЗАКАЗ ID' : 'ORDER ID'}</th>
                            <th className="p-3.5 font-bold">{lang === 'RU' ? 'ДАТА' : 'DATE'}</th>
                            <th className="p-3.5 font-bold">{lang === 'RU' ? 'СТАТУС' : 'STATUS'}</th>
                            <th className="p-3.5 font-bold">{lang === 'RU' ? 'ПРЕПАРАТОВ' : 'ITEMS'}</th>
                            <th className="p-3.5 text-right font-bold">{lang === 'RU' ? 'СУММА' : 'TOTAL'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-sans font-light">
                          {orders.map((ord) => (
                            <tr key={ord.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-3.5">
                                <span className="font-bold text-neutral-800 font-mono">{ord.id}</span>
                                <span className="block text-[10px] text-gray-400 font-mono">СФ: {ord.invoiceNumber}</span>
                              </td>
                              <td className="p-3.5 text-gray-500 font-mono text-[11px]">{ord.date}</td>
                              <td className="p-3.5">
                                {ord.status === 'processing' && (
                                  <span className="px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider bg-yellow-50 text-yellow-700 border border-yellow-200">
                                    {lang === 'RU' ? 'Сборка груза' : 'Processing'}
                                  </span>
                                )}
                                {ord.status === 'shipped' && (
                                  <span className="px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                                    {lang === 'RU' ? 'В пути' : 'Shipped'}
                                  </span>
                                )}
                                {ord.status === 'delivered' && (
                                  <span className="px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    {lang === 'RU' ? 'Доставлен' : 'Delivered'}
                                  </span>
                                )}
                                {ord.status === 'cancelled' && (
                                  <span className="px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">
                                    {lang === 'RU' ? 'Отменен' : 'Cancelled'}
                                  </span>
                                )}
                              </td>
                              <td className="p-3.5 text-gray-500 font-mono">{ord.itemsCount} поз.</td>
                              <td className="p-3.5 text-right font-display font-semibold text-neutral-900">{ord.totalAmount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3.2 DOCUMENTS TAB (With e-signature simulation) */}
                {cabinetTab === 'documents' && (
                  <div className="space-y-4 animate-fade-in font-sans">
                    
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <h3 className="text-sm font-display font-semibold text-brand-blue-deep uppercase tracking-widest">
                        {lang === 'RU' ? 'Электронные контракты и акты сверки' : 'E-Documents Manager'}
                      </h3>
                      <div className="text-[9px] px-2.5 py-1 rounded-sm bg-indigo-50 text-indigo-700 font-bold uppercase tracking-widest border border-indigo-200 font-mono">
                        {lang === 'RU' ? 'ЭЦП ПОДКЛЮЧЕНА' : 'Secured digital signs active'}
                      </div>
                    </div>

                    {signingSuccess && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center space-x-2 animate-fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>Документ {signingSuccess} успешно подписан электронной цифровой подписью партнера!</span>
                      </div>
                    )}

                    <div className="space-y-3">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-4 rounded-sm border border-gray-200 hover:border-brand-teal/30 transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-start space-x-3.5">
                            <div className="w-9 h-9 rounded-sm bg-slate-50 flex items-center justify-center text-brand-teal flex-shrink-0 border border-gray-150">
                              <FileText className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-mono text-gray-400 block">
                                {doc.id} • {doc.date}
                              </span>
                              <h4 className="text-xs font-bold text-neutral-800 leading-snug">
                                {doc.name}
                              </h4>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 self-end sm:self-center">
                            {/* Sign status info */}
                            {doc.status === 'fully_signed' ? (
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200 flex items-center space-x-1 uppercase tracking-wider">
                                <Check className="w-3.5 h-3.5" />
                                <span>{lang === 'RU' ? 'Подписан' : 'Signed'}</span>
                              </span>
                            ) : doc.status === 'signed_by_us' ? (
                              <span className="text-[9px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-sm border border-gray-200 block uppercase tracking-wider">
                                {lang === 'RU' ? 'Подписан БСС' : 'Signed by BSS'}
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-sm border border-amber-200 flex items-center space-x-1 uppercase tracking-wider">
                                <Clock className="w-3.5 h-3.5 animate-spin" />
                                <span>{lang === 'RU' ? 'Ждет ЭЦП' : 'Sign pending'}</span>
                              </span>
                            )}

                            {/* Digital signature trigger */}
                            {doc.status !== 'fully_signed' && (
                              <LiquidButton
                                onClick={() => handleSignDocument(doc.id)}
                                disabled={signingDocId === doc.id}
                                className="px-3.5 py-2 bg-brand-blue-deep hover:bg-[#002B5B]/95 text-white text-[9px] font-bold uppercase tracking-widest rounded-sm border border-[#002B5B]/30 flex items-center space-x-1.5 disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer transition-all"
                              >
                                {signingDocId === doc.id ? (
                                  <>
                                    <svg className="animate-spin h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    <span>{lang === 'RU' ? 'Подписание...' : 'Signing...'}</span>
                                  </>
                                ) : (
                                  <>
                                    <span>{lang === 'RU' ? 'Подписать' : 'Sign'}</span>
                                  </>
                                )}
                              </LiquidButton>
                            )}

                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* 3.3 PRICELIST TAB */}
                {cabinetTab === 'pricelist' && (
                  <div className="space-y-6 animate-fade-in font-sans">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="p-6 rounded-sm border border-gray-200 space-y-4 bg-slate-50 flex flex-col justify-between">
                        <div className="space-y-2">
                          <FileSpreadsheet className="w-9 h-9 text-[#00A8E8]" />
                          <h4 className="font-display font-semibold text-xs text-brand-blue-deep uppercase tracking-wider leading-snug">
                            {lang === 'RU' ? 'Опт прайс-лист Лекарственных средств (ЛС)' : 'General Pharmaceuticals XLS'}
                          </h4>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-light">
                            {lang === 'RU'
                              ? 'Обновляется каждые 4 часа. Включает реальные остатки по 15 региональным хабам холдинга. Доступно к мгновенному бронированию.'
                              : 'Pharmaceutical supply logs containing over 12,000 unique inventory codes.'}
                          </p>
                        </div>
                        <LiquidButton
                          onClick={handleDownloadXLS}
                          disabled={xlsLoading}
                          className="px-4 py-3 bg-[#002B5B] hover:bg-[#002B5B]/90 text-white font-bold text-[10px] uppercase tracking-widest rounded-sm flex items-center justify-center space-x-1.5 transition-all text-center cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#00A8E8]" />
                          <span>{xlsLoading ? 'Сборка...' : (lang === 'RU' ? 'Скачать XLS (14.2 MB)' : 'Download XLSX')}</span>
                        </LiquidButton>
                      </div>

                      <div className="p-6 rounded-sm border border-gray-200 space-y-4 bg-slate-50 flex flex-col justify-between">
                        <div className="space-y-2">
                          <FileSpreadsheet className="w-9 h-9 text-indigo-500" />
                          <h4 className="font-display font-semibold text-xs text-brand-blue-deep uppercase tracking-wider leading-snug">
                            {lang === 'RU' ? 'Прайс-лист косметологии EndoArt' : 'EndoArt Aesthetic Pricelist'}
                          </h4>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-sans font-light">
                            {lang === 'RU'
                              ? 'Филлеры, мезонити, сыворотки и профессиональное сертифицированное оборудование. Эксклюзивные дистрибуторские лимиты.'
                              : 'Professional aesthetic bio-rebalancing creams and syringes wholesale logs.'}
                          </p>
                        </div>
                        <LiquidButton
                          onClick={handleDownloadXLS}
                          disabled={xlsLoading}
                          className="px-4 py-3 bg-[#002B5B] hover:bg-[#002B5B]/90 text-white font-bold text-[10px] uppercase tracking-widest rounded-sm flex items-center justify-center space-x-1.5 transition-all text-center cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{xlsLoading ? 'Сборка...' : (lang === 'RU' ? 'Скачать XLS (4.8 MB)' : 'Download XLSX')}</span>
                        </LiquidButton>
                      </div>

                    </div>

                    {/* XLS warning notice disclaimer */}
                    <div className="p-4 bg-amber-50 text-amber-800 rounded-sm border border-amber-200 text-xs leading-relaxed flex items-start space-x-2.5">
                      <ShieldAlert className="w-4.5 h-4.5 flex-shrink-0 text-amber-500 mt-0.5" />
                      <div>
                        <strong>{lang === 'RU' ? 'Официальный регламент резервирования:' : 'Compulsory Notice:'}</strong>
                        <p className="mt-1 text-[11px] text-amber-700 font-sans font-light leading-relaxed">
                          {lang === 'RU'
                            ? 'Все бронирования по выгруженным оптовым прайс-листам проводятся автоматически в электронной системе B2B или закрепляются у персонального куратора. БСС гарантирует удержание цен на 24 часа с момента создания резерва.'
                            : 'All prices on inventory list are subject to change in 24 hours. Please secure reserve block directly.'}
                        </p>
                      </div>
                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </div>

      {/* 4. Footer (Подвал для юр. инфо) */}
      <footer className="bg-white border-t border-gray-150 py-5 text-center text-[10.5px] text-gray-400 font-sans font-light">
        <p>© 2026 ООО «БСС». {lang === 'RU' ? 'Все права защищены в соответствии с законами РФ.' : 'All rights reserved BSS Holding.'}</p>
        <p className="mt-0.5 text-[9.5px]">
          {lang === 'RU' ? 'Лицензия на осуществление фармацевтической деятельности холдинга № ФС-99-02-008112' : 'Pharma trade license check registered with Health Ministry.'}
        </p>
      </footer>

    </div>
  );
}
