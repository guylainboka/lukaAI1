import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { useCountry } from '../context/CountryContext';
import { PaymentLogo } from './PaymentLogo';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, query?: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpen,
  onToggle,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { currentCountry, countryPayments } = useCountry();
  const [searchFilter, setSearchFilter] = useState('');

  const mainNavLinks: { id: PageId; label: string; icon: string; badge?: string; desc: string }[] = [
    { id: 'home', label: 'Accueil', icon: 'home', badge: 'Top', desc: 'Page principale' },
    { id: 'explorer', label: 'Explorer', icon: 'explore', desc: 'Catalogue & adresses' },
    { id: 'comparateur', label: 'Comparateur', icon: 'compare_arrows', badge: 'Prix', desc: 'Hôtels & restos' },
    { id: 'concierge', label: 'Concierge IA', icon: 'smart_toy', badge: 'IA 24/7', desc: 'Assistant local' },
  ];

  const quickCategories: { label: string; icon: string; filter: string; color: string }[] = [
    { label: 'Restaurants & Maquis', icon: 'restaurant', filter: 'restaurant', color: 'text-amber-600 bg-amber-50' },
    { label: 'Hôtels & Résidences', icon: 'hotel', filter: 'hotel', color: 'text-blue-600 bg-blue-50' },
    { label: 'Boutiques & Mode', icon: 'storefront', filter: 'boutique', color: 'text-purple-600 bg-purple-50' },
    { label: 'Loisirs & Rooftops', icon: 'local_bar', filter: 'loisir', color: 'text-emerald-600 bg-emerald-50' },
  ];

  const proNavLinks: { id: PageId; label: string; icon: string; desc: string }[] = [
    { id: 'espace-etablissement', label: 'Espace Pro', icon: 'business_center', desc: 'Pour les commerçants' },
    { id: 'dashboard', label: 'Dashboard Gérant', icon: 'dashboard', desc: 'Stats & réservations' },
    { id: 'publications', label: 'Publications & Offres', icon: 'campaign', desc: 'Mises en avant' },
  ];

  const accountLinks: { id: PageId; label: string; icon: string }[] = [
    { id: 'compte', label: 'Mon Compte & Favoris', icon: 'account_circle' },
    { id: 'connexion', label: 'Connexion / Profil', icon: 'login' },
    { id: 'inscription', label: 'Créer un compte', icon: 'person_add' },
  ];

  const handleCategoryClick = (categoryFilter: string) => {
    onNavigate('explorer', categoryFilter);
    onCloseMobile();
  };

  const handleLinkClick = (pageId: PageId) => {
    onNavigate(pageId);
    onCloseMobile();
  };

  // Sidebar Inner Content Component (used for both desktop and mobile drawer)
  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface-container-lowest border-r border-surface-container-high/80 text-on-surface select-none shadow-sm">
      {/* Sidebar Header with Brand */}
      <div className="h-20 px-5 flex items-center justify-between border-b border-surface-container shrink-0 bg-surface-container-lowest">
        <div
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-[#0052ff] flex items-center justify-center text-white font-bold text-xl shadow-md shadow-primary/25 group-hover:scale-105 transition-transform shrink-0">
            lAI
          </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-on-surface">lukaAI</span>
              </div>
              <span className="text-xs text-outline font-medium">
                Guide & Bons plans
              </span>
            </motion.div>
          )}
        </div>

        {/* Desktop Collapse / Expand Toggle Button */}
        <button
          onClick={onToggle}
          title={isOpen ? 'Réduire la barre latérale' : 'Agrandir la barre latérale'}
          className="hidden lg:flex w-9 h-9 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isOpen ? 'first_page' : 'last_page'}
          </span>
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden w-9 h-9 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>
      </div>

      {/* Quick Search inside Sidebar (when open) */}
      {isOpen && (
        <div className="p-3 border-b border-surface-container shrink-0">
          <div className="relative flex items-center">
            <span className="absolute left-3 material-symbols-outlined text-[18px] text-outline pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchFilter.trim()) {
                  onNavigate('explorer', searchFilter);
                  onCloseMobile();
                }
              }}
              placeholder="Recherche rapide..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container text-body-sm text-on-surface placeholder:text-outline border border-transparent focus:border-primary/40 focus:bg-surface focus:outline-none transition-all"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2.5 text-xs text-outline hover:text-on-surface"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-body-md custom-scrollbar">
        {/* Section 1: Navigation Principale */}
        <div>
          {isOpen && (
            <div className="px-3 pb-2 text-[11px] font-bold tracking-wider text-outline uppercase">
              Navigation principale
            </div>
          )}
          <div className="space-y-1">
            {mainNavLinks.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  title={!isOpen ? item.label : undefined}
                  className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    active
                      ? 'bg-primary text-on-primary font-semibold shadow-sm'
                      : 'text-on-surface hover:bg-surface-container hover:text-primary'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[22px] shrink-0 ${
                      active ? 'text-on-primary' : 'text-outline group-hover:text-primary'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {isOpen && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate text-body-md">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                            active ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Catégories Populaires (Direct Filters) */}
        {isOpen && (
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold tracking-wider text-outline uppercase flex items-center justify-between">
              <span>Catégories locales</span>
              <span className="material-symbols-outlined text-[14px]">tune</span>
            </div>
            <div className="space-y-1">
              {quickCategories.map((cat) => (
                <button
                  key={cat.filter}
                  onClick={() => handleCategoryClick(cat.filter)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-body-sm text-on-surface hover:bg-surface-container transition-colors cursor-pointer group"
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${cat.color}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                  </div>
                  <span className="truncate flex-1 group-hover:text-primary transition-colors">
                    {cat.label}
                  </span>
                  <span className="material-symbols-outlined text-[14px] text-outline opacity-0 group-hover:opacity-100 transition-opacity">
                    chevron_right
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Espace Professionnel */}
        <div>
          {isOpen && (
            <div className="px-3 pb-2 text-[11px] font-bold tracking-wider text-outline uppercase">
              Espace Professionnels
            </div>
          )}
          <div className="space-y-1">
            {proNavLinks.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  title={!isOpen ? item.label : undefined}
                  className={`w-full flex items-center gap-3.5 px-3 py-2 rounded-xl transition-all cursor-pointer text-left ${
                    active
                      ? 'bg-primary/15 text-primary font-bold'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] shrink-0 ${
                      active ? 'text-primary' : 'text-outline'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {isOpen && (
                    <div className="flex-1 truncate">
                      <div className="text-body-sm font-medium truncate">{item.label}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Mon Espace */}
        <div>
          {isOpen && (
            <div className="px-3 pb-2 text-[11px] font-bold tracking-wider text-outline uppercase">
              Mon Espace
            </div>
          )}
          <div className="space-y-1">
            {accountLinks.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  title={!isOpen ? item.label : undefined}
                  className={`w-full flex items-center gap-3.5 px-3 py-2 rounded-xl transition-all cursor-pointer text-left ${
                    active
                      ? 'bg-primary/15 text-primary font-bold'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] shrink-0 ${
                      active ? 'text-primary' : 'text-outline'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {isOpen && <span className="text-body-sm truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Guarantee Banner (when open) */}
        {isOpen && (
          <div className="p-3.5 rounded-2xl bg-surface-container border border-surface-container-high space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Paiements en {currentCountry.name}</span>
              </div>
              <span className="text-base">{currentCountry.flag}</span>
            </div>
            <p className="text-xs text-outline leading-relaxed">
              Réglez sur place directement avec vos moyens de paiement locaux vérifiés.
            </p>
            <div className="flex items-center flex-wrap gap-1.5 pt-1">
              {countryPayments.slice(0, 4).map((pay) => (
                <PaymentLogo key={`sb-${pay.id}`} type={pay.id} size="sm" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Footer User Card */}
      <div className="p-3 border-t border-surface-container shrink-0 bg-surface-container-lowest">
        {isOpen ? (
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container transition-colors">
            <div
              onClick={() => handleLinkClick('compte')}
              className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 border border-primary/20">
                YA
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-body-sm font-semibold truncate text-on-surface">
                  Yannick Amon
                </div>
                <div className="text-[11px] text-outline truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <span>Membre Abidjan</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleLinkClick('connexion')}
              title="Se déconnecter / Changer"
              className="p-1.5 text-outline hover:text-error rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleLinkClick('compte')}
            title="Mon Compte"
            className="w-full flex items-center justify-center py-2 text-outline hover:text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky/Fixed Sidebar (Visible on lg screens) */}
      <aside
        className={`hidden lg:block fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-72' : 'w-20'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Off-canvas Slide-over Drawer (Visible on smaller screens when toggled) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity"
            />

            {/* Slide Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] z-50 shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
