import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ToastProvider } from './context/ToastContext';
import { CountryProvider } from './context/CountryContext';
import { ComparatorProvider } from './context/ComparatorContext';
import { TopTickerBanner } from './components/TopTickerBanner';
import { HomePage } from './pages/HomePage';
import { ExplorerPage } from './pages/ExplorerPage';
import { ComparateurPage } from './pages/ComparateurPage';
import { DetailPage } from './pages/DetailPage';
import { ConciergeAIPage } from './pages/ConciergeAIPage';
import { EspaceEtablissementPage } from './pages/EspaceEtablissementPage';
import { DashboardPage } from './pages/DashboardPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { ComptePage } from './pages/ComptePage';
import { ConnexionPage } from './pages/ConnexionPage';
import { InscriptionPage } from './pages/InscriptionPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [activeQuery, setActiveQuery] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickSwitcherOpen, setQuickSwitcherOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleNavigate = (page: PageId, query?: string) => {
    setCurrentPage(page);
    setActiveQuery(query);
    if (query) setSearchQuery(query);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pagesList: { id: PageId; label: string; icon: string; tag: string }[] = [
    { id: 'home', label: 'Accueil', icon: 'home', tag: 'Principal' },
    { id: 'explorer', label: 'Explorer le catalogue', icon: 'explore', tag: 'Catalogue' },
    { id: 'detail', label: 'Fiche Détail Produit', icon: 'info', tag: 'Détails' },
    { id: 'comparateur', label: 'Comparateur & IA', icon: 'compare_arrows', tag: 'IA & Prix' },
    { id: 'concierge', label: 'Concierge AI', icon: 'smart_toy', tag: 'Assistant' },
    { id: 'espace-etablissement', label: 'Espace Pro', icon: 'storefront', tag: 'Partenaire' },
    { id: 'dashboard', label: 'Dashboard Gérant', icon: 'dashboard', tag: 'Pro' },
    { id: 'publications', label: 'Publications & Offres', icon: 'campaign', tag: 'Offres' },
    { id: 'compte', label: 'Mon Compte', icon: 'account_circle', tag: 'Profil' },
    { id: 'connexion', label: 'Connexion', icon: 'login', tag: 'Auth' },
    { id: 'inscription', label: 'Inscription', icon: 'person_add', tag: 'Auth' },
  ];

  const mobileNavTabs: { id: PageId; label: string; icon: string }[] = [
    { id: 'home', label: 'Accueil', icon: 'home' },
    { id: 'explorer', label: 'Explorer', icon: 'explore' },
    { id: 'comparateur', label: 'Comparer', icon: 'compare_arrows' },
    { id: 'concierge', label: 'Concierge', icon: 'smart_toy' },
    { id: 'compte', label: 'Compte', icon: 'account_circle' },
  ];

  return (
    <ToastProvider>
      <CountryProvider>
        <ComparatorProvider>
          <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body selection:bg-primary/20 selection:text-primary relative pb-16 sm:pb-0">
            {/* Clean Full-Width Content Container (No lateral sidebar) */}
            <div className="flex-1 flex flex-col w-full">
              {/* Top Header Navigation */}
              <Navigation
                currentPage={currentPage}
                onNavigate={handleNavigate}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                hasTopBanner={false}
              />

              {/* Scrolling Ticker Banner (Placé en bas de la Navigation principale) */}
              <TopTickerBanner onNavigate={handleNavigate} />

              {/* Main Page Content Router with Smooth Page Transitions */}
              <main className="flex-1 flex flex-col w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full flex-1 flex flex-col"
                  >
                    {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
                    {currentPage === 'explorer' && (
                      <ExplorerPage initialFilter={activeQuery} onNavigate={handleNavigate} />
                    )}
                    {currentPage === 'detail' && (
                      <DetailPage onNavigate={handleNavigate} />
                    )}
                    {currentPage === 'comparateur' && (
                      <ComparateurPage onNavigate={handleNavigate} />
                    )}
                    {currentPage === 'concierge' && (
                      <ConciergeAIPage initialPrompt={activeQuery} onNavigate={handleNavigate} />
                    )}
                    {currentPage === 'espace-etablissement' && (
                      <EspaceEtablissementPage onNavigate={handleNavigate} />
                    )}
                    {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
                    {currentPage === 'publications' && (
                      <PublicationsPage onNavigate={handleNavigate} />
                    )}
                    {currentPage === 'compte' && <ComptePage onNavigate={handleNavigate} />}
                    {currentPage === 'connexion' && <ConnexionPage onNavigate={handleNavigate} />}
                    {currentPage === 'inscription' && <InscriptionPage onNavigate={handleNavigate} />}
                  </motion.div>
                </AnimatePresence>
              </main>

              {/* Site-wide Footer */}
              <Footer onNavigate={handleNavigate} />
            </div>

            {/* Mobile Sticky Bottom Navigation Bar (High UX for smartphones) */}
            <div className="fixed sm:hidden bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-surface-container py-1 px-2 flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
              {mobileNavTabs.map((tab) => {
                const isActive = currentPage === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleNavigate(tab.id)}
                    className={`flex-1 flex flex-col items-center py-1.5 px-1 relative transition-colors cursor-pointer ${
                      isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <div className="relative">
                      <span className="material-symbols-outlined text-[22px]">{tab.icon}</span>
                      {isActive && (
                        <motion.span
                          layoutId="mobileActiveDot"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                        />
                      )}
                    </div>
                    <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Floating Scroll to Top Button */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={scrollToTop}
                  aria-label="Remonter en haut"
                  className="fixed bottom-20 sm:bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-surface-container-lowest text-primary shadow-xl border border-surface-container-high flex items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined text-[22px]">arrow_upward</span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Floating Quick Page Switcher */}
            <div className="fixed bottom-20 sm:bottom-6 left-4 z-40">
              <div className="relative">
                <AnimatePresence>
                  {quickSwitcherOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-14 left-0 bg-surface-container-lowest border border-surface-container-high rounded-2xl shadow-2xl p-4 w-72 max-h-[75vh] overflow-y-auto flex flex-col gap-1.5 z-50"
                    >
                      <div className="px-2 py-1.5 border-b border-surface-container text-xs font-bold text-outline flex items-center justify-between">
                        <span>Navigation Rapide</span>
                        <button
                          onClick={() => setQuickSwitcherOpen(false)}
                          className="hover:text-on-surface p-1 text-sm cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>

                      {pagesList.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            handleNavigate(p.id);
                            setQuickSwitcherOpen(false);
                          }}
                          className={`px-3 py-2 rounded-xl text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            currentPage === p.id
                              ? 'bg-primary text-white font-bold shadow-xs'
                              : 'hover:bg-surface-container text-on-surface'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="material-symbols-outlined text-[18px] shrink-0">{p.icon}</span>
                            <span className="truncate">{p.label}</span>
                          </div>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0 ${
                              currentPage === p.id
                                ? 'bg-white/30 text-white'
                                : 'bg-surface-container-high text-outline'
                            }`}
                          >
                            {p.tag}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setQuickSwitcherOpen(!quickSwitcherOpen)}
                  className="px-4 py-2.5 bg-on-surface text-surface rounded-full text-xs font-bold shadow-xl flex items-center gap-2 hover:opacity-95 transition-all cursor-pointer border border-surface-container-highest"
                >
                  <span className="material-symbols-outlined text-[18px]">layers</span>
                  <span>Vues & Pages</span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                </motion.button>
              </div>
            </div>
          </div>
        </ComparatorProvider>
      </CountryProvider>
    </ToastProvider>
  );
}
