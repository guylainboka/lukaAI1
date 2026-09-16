import React, { useState } from 'react';
import { PageId } from '../types';
import {
  VisaLogo,
  MastercardLogo,
  PaypalLogo,
  WaveLogo,
  MoovAfricaLogo,
  MtnLogo,
  OrangeMoneyLogo,
  MpesaLogo,
  AirtelMoneyLogo,
} from './PaymentLogos';

interface TopTickerBannerProps {
  onNavigate?: (page: PageId, query?: string) => void;
}

interface TickerItem {
  id: string;
  badge: string;
  badgeColor: string;
  text: string;
  linkAction?: { page: PageId; query?: string };
}

const TICKER_ITEMS: TickerItem[] = [
  {
    id: 'pub-1',
    badge: 'PUB • PARTENAIRE',
    badgeColor: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
    text: 'Azalaï Hotel & Radisson Blu : Réservez via lukaAI et réglez sur place par Wave ou Orange Money !',
    linkAction: { page: 'explorer', query: 'hotel' },
  },
  {
    id: 'info-1',
    badge: 'INFO SÉCURITÉ',
    badgeColor: 'bg-emerald-500 text-white',
    text: '0% de commission cachée : vérifiez vos articles et payez directement au commerçant avec votre Mobile Money favori.',
    linkAction: { page: 'explorer' },
  },
  {
    id: 'pub-2',
    badge: 'HIGH-TECH FLASH',
    badgeColor: 'bg-[#0047ff] text-white',
    text: 'iPhone 15 Pro Max & Samsung Galaxy S24 Ultra : Comparez les prix certifiés boutique à boutique.',
    linkAction: { page: 'comparateur' },
  },
  {
    id: 'info-2',
    badge: 'RÉSEAU MOBILE',
    badgeColor: 'bg-indigo-600 text-white',
    text: '2 400+ commerces, restaurants et hôtels certifiés compatibles Wave, Orange Money, MTN MoMo, M-Pesa & Airtel.',
    linkAction: { page: 'explorer' },
  },
  {
    id: 'pub-3',
    badge: 'GASTRONOMIE',
    badgeColor: 'bg-rose-500 text-white',
    text: 'Le Jardin Gourmand & Le Lagon 1 : Tables en bord de mer vérifiées, paiement fluide par cartes & wallets.',
    linkAction: { page: 'explorer', query: 'restaurant' },
  },
  {
    id: 'info-3',
    badge: 'ARBITRAGE IA',
    badgeColor: 'bg-purple-600 text-white',
    text: 'Nouveau comparateur intelligent : demandez à l’IA le meilleur rapport qualité/prix avant votre déplacement.',
    linkAction: { page: 'comparateur' },
  },
];

export const TopTickerBanner: React.FC<TopTickerBannerProps> = ({ onNavigate }) => {
  const [isPaused, setIsPaused] = useState(false);

  const handleClickItem = (item: TickerItem) => {
    if (item.linkAction && onNavigate) {
      onNavigate(item.linkAction.page, item.linkAction.query);
    }
  };

  const handlePaymentClick = (method: string) => {
    if (onNavigate) {
      onNavigate('explorer', method);
    }
  };

  return (
    <aside
      className={`sticky top-20 bg-[#070e1c] text-white text-xs border-b border-slate-800/80 select-none z-40 overflow-hidden shadow-xs backdrop-blur-md ${
        isPaused ? 'ticker-paused' : ''
      }`}
      data-purpose="running-ticker-banner"
      aria-label="Informations et annonces en continu"
    >
      <div className="flex items-center">
        {/* Left Fixed Label Tag */}
        <div className="relative z-20 flex items-center gap-2 bg-[#0047ff] hover:bg-blue-600 text-white px-3 sm:px-4 py-2 text-[11px] font-extrabold uppercase tracking-wider shrink-0 shadow-lg cursor-pointer transition-colors"
          onClick={() => onNavigate && onNavigate('explorer')}
          title="Explorer les annonces"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="hidden sm:inline">ACTU & PUBS</span>
          <span className="sm:hidden">FLASH</span>
          <i className="fa-solid fa-bolt text-[10px] ml-0.5"></i>
        </div>

        {/* Marquee Ticker Track with Infinite Continuous Scroll */}
        <div
          className="flex-1 overflow-hidden py-1.5 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="animate-ticker-marquee flex items-center gap-8 text-[12px] font-medium pl-4">
            {/* Cycle 1 */}
            {TICKER_ITEMS.map((item) => (
              <div
                key={`run1-${item.id}`}
                onClick={() => handleClickItem(item)}
                className="inline-flex items-center gap-2.5 px-3 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 transition-all cursor-pointer shrink-0 group"
              >
                <span
                  className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
                <span className="text-slate-200 group-hover:text-white transition-colors">
                  {item.text}
                </span>
                <i className="fa-solid fa-arrow-right text-[10px] text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all"></i>
              </div>
            ))}

            {/* Official Mobile Money & Card Logos Embedded inside the continuous marquee */}
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-700 shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Paiements officiels acceptés :
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePaymentClick('Wave')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer avec Wave"
                >
                  <WaveLogo size="sm" />
                  <span className="text-[10px] font-bold text-slate-800">Wave</span>
                </button>
                <button
                  onClick={() => handlePaymentClick('Orange Money')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer avec Orange Money"
                >
                  <OrangeMoneyLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('MTN')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer avec MTN MoMo"
                >
                  <MtnLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('Moov')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer avec Moov Africa"
                >
                  <MoovAfricaLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('M-Pesa')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer avec M-Pesa"
                >
                  <MpesaLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('Airtel')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer avec Airtel Money"
                >
                  <AirtelMoneyLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('Visa')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer par Carte Visa"
                >
                  <VisaLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('Mastercard')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer par Carte Mastercard"
                >
                  <MastercardLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('PayPal')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer par PayPal"
                >
                  <PaypalLogo size="sm" />
                </button>
              </div>
            </div>

            {/* Cycle 2 (duplicate for seamless 100% infinite loop) */}
            {TICKER_ITEMS.map((item) => (
              <div
                key={`run2-${item.id}`}
                onClick={() => handleClickItem(item)}
                className="inline-flex items-center gap-2.5 px-3 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 transition-all cursor-pointer shrink-0 group"
              >
                <span
                  className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
                <span className="text-slate-200 group-hover:text-white transition-colors">
                  {item.text}
                </span>
                <i className="fa-solid fa-arrow-right text-[10px] text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all"></i>
              </div>
            ))}

            {/* Duplicate payment strip */}
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-700 shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Paiements officiels acceptés :
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePaymentClick('Wave')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer avec Wave"
                >
                  <WaveLogo size="sm" />
                  <span className="text-[10px] font-bold text-slate-800">Wave</span>
                </button>
                <button
                  onClick={() => handlePaymentClick('Orange Money')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer avec Orange Money"
                >
                  <OrangeMoneyLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('MTN')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer avec MTN MoMo"
                >
                  <MtnLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('Moov')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer avec Moov Africa"
                >
                  <MoovAfricaLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('M-Pesa')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer avec M-Pesa"
                >
                  <MpesaLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('Airtel')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer avec Airtel Money"
                >
                  <AirtelMoneyLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('Visa')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer par Carte Visa"
                >
                  <VisaLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('Mastercard')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer par Carte Mastercard"
                >
                  <MastercardLogo size="sm" />
                </button>
                <button
                  onClick={() => handlePaymentClick('PayPal')}
                  className="bg-white px-2 py-1 rounded-md shadow-xs hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                  title="Payer par PayPal"
                >
                  <PaypalLogo size="sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pause/Resume Control */}
        <div className="relative z-20 flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border-l border-slate-800 text-slate-400 shrink-0">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 hover:text-white transition-colors cursor-pointer rounded"
            title={isPaused ? 'Reprendre le défilement' : 'Mettre en pause le défilement'}
            aria-label={isPaused ? 'Reprendre' : 'Pause'}
          >
            <i className={`fa-solid ${isPaused ? 'fa-play' : 'fa-pause'} text-[11px]`}></i>
          </button>
        </div>
      </div>
    </aside>
  );
};
