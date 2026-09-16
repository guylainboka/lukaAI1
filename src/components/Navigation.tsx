import React, { useState } from 'react';
import { PageId } from '../types';
import { useComparator } from '../context/ComparatorContext';

interface NavigationProps {
  currentPage: PageId;
  onNavigate: (page: PageId, query?: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  hasTopBanner?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  searchQuery = '',
  onSearchChange,
}) => {
  const { comparedItems } = useComparator();
  const [proDropdownOpen, setProDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const compareCount = comparedItems.length > 0 ? comparedItems.length : 3;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      onNavigate('explorer', localSearch.trim());
    } else {
      onNavigate('explorer');
    }
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm select-none">
      <nav className="max-w-[1440px] mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#0047ff] flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md shadow-blue-500/20">
              IAI
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 block leading-none">
                lukaAI
              </span>
            </div>
          </div>

          {/* Quick Search Toggle Icon */}
          <button
            aria-label="Recherche rapide"
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center ml-2 transition-colors cursor-pointer"
            type="button"
          >
            <i className="fa-solid fa-magnifying-glass text-xs"></i>
          </button>

          {/* Quick Search Dropdown / Input on demand */}
          {searchOpen && (
            <form onSubmit={handleSearchSubmit} className="relative ml-2 flex items-center">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                placeholder="Rechercher produit, hôtel..."
                autoFocus
                className="w-48 sm:w-64 h-9 px-3 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0047ff]"
              />
            </form>
          )}
        </div>

        {/* Navigation Pill Menu */}
        <div className="hidden lg:flex items-center bg-slate-50 p-1.5 rounded-full border border-slate-200/70 gap-1 text-sm font-semibold">
          {/* Accueil (Active) */}
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all cursor-pointer ${
              currentPage === 'home'
                ? 'bg-[#0047ff] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0047ff] hover:bg-white'
            }`}
          >
            <i className="fa-solid fa-house text-xs"></i>
            <span>Accueil</span>
          </button>

          {/* Explorer */}
          <button
            onClick={() => onNavigate('explorer')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all cursor-pointer ${
              currentPage === 'explorer'
                ? 'bg-[#0047ff] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0047ff] hover:bg-white'
            }`}
          >
            <i className="fa-regular fa-compass text-xs"></i>
            <span>Explorer</span>
          </button>

          {/* Comparateur */}
          <button
            onClick={() => onNavigate('comparateur')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all cursor-pointer ${
              currentPage === 'comparateur'
                ? 'bg-[#0047ff] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0047ff] hover:bg-white'
            }`}
          >
            <i className="fa-solid fa-arrow-right-arrow-left text-xs"></i>
            <span>Comparateur</span>
            <span className="w-4 h-4 bg-[#0047ff] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {compareCount}
            </span>
          </button>

          {/* Concierge AI */}
          <button
            onClick={() => onNavigate('concierge')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all cursor-pointer ${
              currentPage === 'concierge'
                ? 'bg-[#0047ff] text-white shadow-sm'
                : 'text-slate-700 hover:text-[#0047ff] hover:bg-white'
            }`}
          >
            <i className="fa-solid fa-robot text-xs"></i>
            <span>Concierge AI</span>
            <span className="bg-blue-100 text-[#0047ff] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              IA
            </span>
          </button>

          {/* Espace Pro Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setProDropdownOpen(true)}
            onMouseLeave={() => setProDropdownOpen(false)}
          >
            <button
              onClick={() => onNavigate('espace-etablissement')}
              className={`px-4 py-2 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                currentPage === 'espace-etablissement' ||
                currentPage === 'dashboard' ||
                currentPage === 'publications'
                  ? 'bg-[#0047ff] text-white shadow-sm'
                  : 'text-slate-700 group-hover:text-[#0047ff] group-hover:bg-white'
              }`}
            >
              <i className="fa-solid fa-store text-xs"></i>
              <span>Espace Pro</span>
              <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
            </button>

            {proDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 flex flex-col gap-1 z-50">
                <button
                  onClick={() => {
                    onNavigate('espace-etablissement');
                    setProDropdownOpen(false);
                  }}
                  className="text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0047ff] rounded-xl"
                >
                  <i className="fa-solid fa-store mr-2 text-slate-400"></i>
                  Partenaires & Terminaux
                </button>
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setProDropdownOpen(false);
                  }}
                  className="text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0047ff] rounded-xl"
                >
                  <i className="fa-solid fa-chart-line mr-2 text-slate-400"></i>
                  Tableau de bord gérant
                </button>
                <button
                  onClick={() => {
                    onNavigate('publications');
                    setProDropdownOpen(false);
                  }}
                  className="text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0047ff] rounded-xl"
                >
                  <i className="fa-solid fa-bullhorn mr-2 text-slate-400"></i>
                  Offres & Publications
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Auth & User Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('connexion')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 text-slate-700 hover:border-slate-300 font-semibold text-xs sm:text-sm transition-colors cursor-pointer ${
              currentPage === 'connexion' || currentPage === 'inscription'
                ? 'bg-slate-100'
                : ''
            }`}
          >
            <i className="fa-solid fa-lock text-slate-500 text-xs"></i>
            <span>Connexion</span>
          </button>
          <button
            aria-label="Profil"
            onClick={() => onNavigate('compte')}
            className={`w-10 h-10 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer ${
              currentPage === 'compte' ? 'ring-2 ring-[#0047ff] text-[#0047ff]' : ''
            }`}
            type="button"
          >
            <i className="fa-regular fa-user text-sm"></i>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-slate-100 flex lg:hidden items-center justify-center text-slate-700 text-sm cursor-pointer"
            aria-label="Menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 flex flex-col gap-2">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center gap-2"
          >
            <i className="fa-solid fa-house text-[#0047ff]"></i> Accueil
          </button>
          <button
            onClick={() => {
              onNavigate('explorer');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center gap-2"
          >
            <i className="fa-regular fa-compass text-[#0047ff]"></i> Explorer
          </button>
          <button
            onClick={() => {
              onNavigate('comparateur');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-arrow-right-arrow-left text-[#0047ff]"></i> Comparateur
            </span>
            <span className="bg-[#0047ff] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {compareCount}
            </span>
          </button>
          <button
            onClick={() => {
              onNavigate('concierge');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center gap-2"
          >
            <i className="fa-solid fa-robot text-[#0047ff]"></i> Concierge AI
          </button>
          <button
            onClick={() => {
              onNavigate('espace-etablissement');
              setMobileMenuOpen(false);
            }}
            className="text-left py-2 px-3 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center gap-2"
          >
            <i className="fa-solid fa-store text-[#0047ff]"></i> Espace Pro
          </button>
        </div>
      )}
    </header>
  );
};
