import React from 'react';
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

interface FooterProps {
  onNavigate: (page: PageId, query?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8 select-none" data-purpose="platform-footer">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Top Network Payment Strip */}
        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-credit-card text-[#0047ff]"></i>
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
                MOYENS DE PAIEMENT ACCEPTÉS SUR LE RÉSEAU LUKAAI
              </span>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Paiement direct sans surcoût</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium mb-5">
            Réglez en toute sérénité sur place auprès de l'établissement avec vos applications et cartes préférées
          </p>
          {/* Payment Badges List with Real Official Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2.5 text-center">
            {/* Wave */}
            <div
              onClick={() => onNavigate('explorer', 'Wave')}
              className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-[#1DC3EC] transition cursor-pointer flex flex-col items-center justify-center gap-1 group"
            >
              <WaveLogo size="md" />
              <span className="text-[10px] font-bold text-slate-700 group-hover:text-[#1DC3EC] transition-colors">
                Wave
              </span>
            </div>

            {/* Orange Money */}
            <div
              onClick={() => onNavigate('explorer', 'Orange Money')}
              className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-[#FF6600] transition cursor-pointer flex flex-col items-center justify-center gap-1 group"
            >
              <OrangeMoneyLogo size="md" />
              <span className="text-[10px] font-bold text-slate-700 group-hover:text-[#FF6600] transition-colors">
                Orange Money
              </span>
            </div>

            {/* MTN MoMo */}
            <div
              onClick={() => onNavigate('explorer', 'MTN')}
              className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-amber-400 transition cursor-pointer flex flex-col items-center justify-center gap-1 group"
            >
              <MtnLogo size="md" />
              <span className="text-[10px] font-bold text-slate-700 group-hover:text-amber-600 transition-colors">
                MTN MoMo
              </span>
            </div>

            {/* Moov Africa */}
            <div
              onClick={() => onNavigate('explorer', 'Moov')}
              className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-[#005BA3] transition cursor-pointer flex flex-col items-center justify-center gap-1 group"
            >
              <MoovAfricaLogo size="md" />
              <span className="text-[10px] font-bold text-slate-700 group-hover:text-[#005BA3] transition-colors">
                Moov Africa
              </span>
            </div>

            {/* M-Pesa */}
            <div
              onClick={() => onNavigate('explorer', 'M-Pesa')}
              className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-red-400 transition cursor-pointer flex flex-col items-center justify-center gap-1 group"
            >
              <MpesaLogo size="md" />
              <span className="text-[10px] font-bold text-slate-700 group-hover:text-red-600 transition-colors">
                M-Pesa
              </span>
            </div>

            {/* Airtel Money */}
            <div
              onClick={() => onNavigate('explorer', 'Airtel Money')}
              className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-red-400 transition cursor-pointer flex flex-col items-center justify-center gap-1 group"
            >
              <AirtelMoneyLogo size="md" />
              <span className="text-[10px] font-bold text-slate-700 group-hover:text-red-600 transition-colors">
                Airtel Money
              </span>
            </div>

            {/* Visa */}
            <div
              onClick={() => onNavigate('explorer', 'Visa')}
              className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-500 transition cursor-pointer flex flex-col items-center justify-center gap-1 group"
            >
              <VisaLogo size="md" />
              <span className="text-[10px] font-bold text-slate-700 group-hover:text-[#1A1F71] transition-colors">
                Carte VISA
              </span>
            </div>

            {/* Mastercard */}
            <div
              onClick={() => onNavigate('explorer', 'Mastercard')}
              className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-amber-500 transition cursor-pointer flex flex-col items-center justify-center gap-1 group"
            >
              <MastercardLogo size="md" />
              <span className="text-[10px] font-bold text-slate-700 group-hover:text-amber-600 transition-colors">
                Mastercard
              </span>
            </div>

            {/* PayPal */}
            <div
              onClick={() => onNavigate('explorer', 'PayPal')}
              className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-400 transition cursor-pointer flex flex-col items-center justify-center gap-1 group"
            >
              <PaypalLogo size="sm" />
              <span className="text-[10px] font-bold text-slate-700 group-hover:text-[#0079C1] transition-colors">
                PayPal
              </span>
            </div>
          </div>
        </div>

        {/* 4 Columns Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10">
          {/* Column 1: Brand presentation (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="w-9 h-9 rounded-xl bg-[#0047ff] flex items-center justify-center text-white font-black text-xs">
                IAI
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">lukaAI</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal pr-4">
              Plateforme intelligente de découverte locale et comparateur de compatibilité de paiement mobile money et cartes bancaires.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                aria-label="Web"
                onClick={() => onNavigate('explorer')}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs transition cursor-pointer"
              >
                <i className="fa-solid fa-globe"></i>
              </button>
              <button
                aria-label="Partager"
                onClick={() => onNavigate('comparateur')}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs transition cursor-pointer"
              >
                <i className="fa-solid fa-share-nodes"></i>
              </button>
              <button
                aria-label="Concierge Chat"
                onClick={() => onNavigate('concierge')}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs transition cursor-pointer"
              >
                <i className="fa-solid fa-robot"></i>
              </button>
            </div>
          </div>

          {/* Column 2: EXPLORER (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">EXPLORER</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li>
                <button onClick={() => onNavigate('explorer', 'restaurant')} className="hover:text-[#0047ff] transition cursor-pointer text-left">
                  Restaurants & Maquis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explorer', 'hotel')} className="hover:text-[#0047ff] transition cursor-pointer text-left">
                  Hôtels & Résidences
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explorer', 'boutique')} className="hover:text-[#0047ff] transition cursor-pointer text-left">
                  Boutiques & Mode
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('comparateur')} className="hover:text-[#0047ff] transition text-[#0047ff] cursor-pointer text-left font-bold">
                  Comparateur de prix
                </button>
              </li>
              <li className="flex items-center gap-2">
                <button onClick={() => onNavigate('concierge')} className="hover:text-[#0047ff] transition cursor-pointer text-left">
                  Concierge IA
                </button>
                <span className="bg-[#0047ff] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  24/7
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: PARTENAIRES (3 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">PARTENAIRES</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li>
                <button onClick={() => onNavigate('espace-etablissement')} className="hover:text-[#0047ff] transition cursor-pointer text-left">
                  Répertorier mon lieu
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-[#0047ff] transition cursor-pointer text-left">
                  Tableau de bord gérant
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('publications')} className="hover:text-[#0047ff] transition cursor-pointer text-left">
                  Offres & Campagnes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inscription')} className="hover:text-[#0047ff] transition cursor-pointer text-left">
                  Créer un compte pro
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: CONFIANCE (2 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">CONFIANCE</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li className="flex items-center gap-2 text-slate-800 font-bold">
                <i className="fa-solid fa-shield-halved text-[#0047ff]"></i>
                <span>Paiement sur place garanti</span>
              </li>
              <li>
                <button onClick={() => onNavigate('compte')} className="hover:text-[#0047ff] transition cursor-pointer text-left">
                  Mon profil & sécurité
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compte')} className="hover:text-[#0047ff] transition cursor-pointer text-left">
                  Espace Membre
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('concierge')} className="hover:text-[#0047ff] transition cursor-pointer text-left">
                  Assistance & WhatsApp
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bottom Sub-footer */}
        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] font-medium text-slate-400">
          <div>
            © 2026  Devlloper par guymadev et guylaindesign lukaAI. Tous droits réservés. Zéro commission cachée sur vos paiements locaux.
          </div>
        </div>
      </div>
    </footer>
  );
};
