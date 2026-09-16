import React, { useState } from 'react';
import { PageId } from '../types';
import { ESTABLISHMENTS_DATA } from '../data/establishments';
import { useComparator } from '../context/ComparatorContext';
import { useToast } from '../context/ToastContext';
import {
  WaveLogo,
  OrangeMoneyLogo,
  MtnLogo,
  MoovAfricaLogo,
  MpesaLogo,
  AirtelMoneyLogo,
  VisaLogo,
  MastercardLogo,
  PaypalLogo,
} from '../components/PaymentLogos';

interface HomePageProps {
  onNavigate: (page: PageId, query?: string) => void;
  onSelectProduct?: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProduct }) => {
  const { showToast } = useToast();
  const { addToComparator, removeFromComparator, isInComparator, setSelectedProductId, clearComparator } =
    useComparator();

  const [searchQuery, setSearchQuery] = useState('');
  const [conciergeQuery, setConciergeQuery] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('explorer', searchQuery.trim());
    } else {
      onNavigate('explorer');
    }
  };

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (conciergeQuery.trim()) {
      onNavigate('concierge', conciergeQuery.trim());
    } else {
      onNavigate('concierge');
    }
  };

  const handleOpenDetail = (id: string) => {
    const item = ESTABLISHMENTS_DATA.find((e) => e.id === id);
    if (item) {
      setSelectedProductId(item.id);
      if (onSelectProduct) onSelectProduct(item.id);
    }
    onNavigate('detail');
  };

  const handleToggleCompare = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const item = ESTABLISHMENTS_DATA.find((item) => item.id === id);
    if (!item) return;

    if (isInComparator(item.id)) {
      removeFromComparator(item.id);
    } else {
      addToComparator(item);
    }
  };

  const handleLaunchDuel = (id1: string, id2: string) => {
    clearComparator();
    const item1 = ESTABLISHMENTS_DATA.find((e) => e.id === id1);
    const item2 = ESTABLISHMENTS_DATA.find((e) => e.id === id2);
    if (item1) addToComparator(item1);
    if (item2) addToComparator(item2);
    onNavigate('comparateur');
  };

  return (
    <div className="w-full bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-[#0047ff]">
      {/* BEGIN: HeroSection */}
      <section className="relative pt-6 pb-12 overflow-hidden" data-purpose="hero-comparator">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-b from-[#f3f7ff] via-[#f7faff] to-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-blue-100/70 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Hero Left: Copy & Search Form */}
              <div className="lg:col-span-7 space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#0047ff] text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0047ff]"></span>
                  GUIDE & COMPARATEUR PANAFRICAIN
                </div>

                {/* Main Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  Trouvez ou payer par{' '}
                  <span className="text-[#0047ff] underline decoration-wavy decoration-[#0047ff] underline-offset-8">
                    mobile money
                  </span>{' '}
                  et comparer avec notre comparateur intelligent
                </h1>

                {/* Explanatory Subtitle */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  Produits électroniques, boutiques de mode, restaurants gastronomiques et hôtels vérifiés. Comparez les prix réels et bénéficiez de l'arbitrage par l'IA sans prépaiement forcé.
                </p>

                {/* Primary Hero Search Input Box */}
                <div className="pt-2">
                  <form
                    onSubmit={handleHeroSearch}
                    className="bg-white rounded-2xl p-2 sm:p-2.5 shadow-xl shadow-blue-900/5 border border-slate-200 flex flex-col sm:flex-row items-center gap-2"
                    data-purpose="hero-search-form"
                  >
                    <div className="flex items-center gap-3 pl-3 flex-1 w-full">
                      <i className="fa-solid fa-magnifying-glass text-[#0047ff] text-base"></i>
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border-0 focus:ring-0 text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-medium p-0 outline-none"
                        placeholder="Que cherchez-vous ? (ex: iPhone 15, Azalaï, poisson braisé, Wave...)"
                        type="text"
                      />
                    </div>
                    <button
                      className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#0047ff] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      type="submit"
                    >
                      <span>Rechercher</span>
                    </button>
                  </form>
                </div>

                {/* Quick Action Pills */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => onNavigate('explorer')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm shadow-sm transition cursor-pointer"
                  >
                    <i className="fa-regular fa-compass text-[#0047ff]"></i>
                    <span>Explorer tout le catalogue</span>
                  </button>
                  <button
                    onClick={() => onNavigate('comparateur')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-100/70 hover:bg-blue-100 text-[#0047ff] font-semibold text-xs sm:text-sm transition cursor-pointer"
                  >
                    <i className="fa-solid fa-arrow-right-arrow-left text-xs"></i>
                    <span>Espace comparateur & IA</span>
                  </button>
                </div>
              </div>

              {/* Hero Right: Curated Product Showcase Visual */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white group">
                  {/* Top Mini Breadcrumb Overlay */}
                  <div className="absolute top-3 left-4 z-10 text-[10px] text-slate-400 font-medium tracking-wide bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    Accueil & Découverte
                  </div>
                  {/* Image Container */}
                  <div className="aspect-[16/10] overflow-hidden bg-slate-50">
                    <img
                      alt="Vitrine High-Tech et Mode lukaAI"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNWVwF0zpf1Olm8fE5UNKaFRd0Ap30UQi7BBw6xSQaGviGNZ4y5Q1T_oumPq7tNStXbwx073VFSwwjOBtr4nIeHmt_cVmMg8OqG1ojhgyleq6_My28qgWS3SFQlJpLUvLsHL5lytKKqMVVBNaOwG40IzAq6QXz_oc7bG7AXnEhN0o65TF98F6oEI2xtAD5aSuFtL3OLqvRJckUsIQ0x9Q1aJaNzJ543DJOJhRIIetJYVuwP3NZkzhgIA"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Trust & Value Badges Strip */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-circle-check text-emerald-500 text-sm"></i>
                <span>100% Vérifié sur place</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-[#0047ff] text-sm"></i>
                <span>Zéro frais de transaction client</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-robot text-[#0047ff] text-sm"></i>
                <span>Arbitrage par l'IA</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: HeroSection */}

      {/* BEGIN: VerifiedCategoriesSection */}
      <section className="py-10 bg-white" data-purpose="verified-categories" id="explorer">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          {/* Header Section */}
          <div className="flex items-end justify-between mb-7">
            <div>
              <span className="text-xs font-bold text-[#0047ff] uppercase tracking-wider block mb-1">
                RAYONS & SERVICES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Catégories vérifiées
              </h2>
            </div>
            <button
              onClick={() => onNavigate('explorer')}
              className="text-xs sm:text-sm font-bold text-[#0047ff] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Voir tout</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>

          {/* 4 Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Category 1: Produits & Tech */}
            <div
              onClick={() => onNavigate('explorer', 'boutique')}
              className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-13 h-13 p-3.5 rounded-xl bg-blue-100/70 text-[#0047ff] group-hover:bg-[#0047ff] group-hover:text-white transition-colors flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-[#0047ff] text-base transition-colors">
                  Produits & Tech
                </h3>
                <p className="text-xs text-slate-400 font-medium">Smartphones, Mode</p>
              </div>
            </div>

            {/* Category 2: Restaurants */}
            <div
              onClick={() => onNavigate('explorer', 'restaurant')}
              className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-13 h-13 p-3.5 rounded-xl bg-blue-100/70 text-[#0047ff] group-hover:bg-[#0047ff] group-hover:text-white transition-colors flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-utensils"></i>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-[#0047ff] text-base transition-colors">
                  Restaurants
                </h3>
                <p className="text-xs text-slate-400 font-medium">Gastronomie & Maquis</p>
              </div>
            </div>

            {/* Category 3: Hôtels */}
            <div
              onClick={() => onNavigate('explorer', 'hotel')}
              className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-13 h-13 p-3.5 rounded-xl bg-blue-100/70 text-[#0047ff] group-hover:bg-[#0047ff] group-hover:text-white transition-colors flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-bed"></i>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-[#0047ff] text-base transition-colors">
                  Hôtels
                </h3>
                <p className="text-xs text-slate-400 font-medium">Résidences & 4-5★</p>
              </div>
            </div>

            {/* Category 4: Loisirs & Sorties */}
            <div
              onClick={() => onNavigate('explorer', 'loisir')}
              className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-13 h-13 p-3.5 rounded-xl bg-blue-100/70 text-[#0047ff] group-hover:bg-[#0047ff] group-hover:text-white transition-colors flex items-center justify-center text-xl shrink-0">
                <i className="fa-solid fa-martini-glass-citrus"></i>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-[#0047ff] text-base transition-colors">
                  Loisirs & Sorties
                </h3>
                <p className="text-xs text-slate-400 font-medium">Beach Clubs, Spas</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: VerifiedCategoriesSection */}

      {/* BEGIN: FeaturedProductsSection */}
      <section className="py-10 bg-white" data-purpose="featured-products">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="flex items-end justify-between mb-7">
            <div>
              <span className="text-xs font-bold text-[#0047ff] uppercase tracking-wider block mb-1">
                TENDANCES TECH & SHOPPING
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Produits phares & Boutiques
              </h2>
            </div>
            <button
              onClick={() => onNavigate('explorer', 'boutique')}
              className="text-xs sm:text-sm font-bold text-[#0047ff] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Voir tous les produits</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>

          {/* 4 Products Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Concept Store Sandaga */}
            <article className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div
                className="relative aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => handleOpenDetail('3')}
              >
                <img
                  alt="Concept Store Sandaga"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFJS8ob-x88eUBPpsP5_k7Uh_hrKfVLAXr54g4QjzGBsPqW0TpcmhHk-flRCtbojldeFrGhCEt8rCle3z9lHyNmbkCznbbI12_O8P-wUTVHzQpsSex78T0Aqq1eX_PLS4HtHKYn_d9OuJ5gGTsGz0GNzR4eri-cKf6IImLvb8RnS39t0rvJGUXlqIlsHGGcU6Wzs7C7CQVTSbyrphZiWainLjkuQRgvd6g2qSKp6Man95UaptSslnjmg"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  Boutique & Mode
                </span>
                <div className="absolute bottom-3 left-3 bg-[#0047ff] text-white text-xs font-extrabold px-2.5 py-1 rounded shadow-sm">
                  18 500 FCFA
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-location-dot text-slate-400"></i> Dakar
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <i className="fa-solid fa-star text-[11px]"></i> 4.9
                    </span>
                  </div>
                  <h3
                    onClick={() => handleOpenDetail('3')}
                    className="font-bold text-slate-900 text-sm hover:text-[#0047ff] transition-colors cursor-pointer"
                  >
                    Concept Store Sandaga
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    Vêtements de créateurs locaux, accessoires de mode uniques et objets...
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenDetail('3')}
                    className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition cursor-pointer"
                    type="button"
                  >
                    Détails
                  </button>
                  <button
                    aria-label="Sélectionné"
                    onClick={(e) => handleToggleCompare(e, '3')}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs cursor-pointer transition ${
                      isInComparator('3')
                        ? 'bg-[#8c4b12] text-white'
                        : 'bg-blue-50 text-[#0047ff] hover:bg-blue-100'
                    }`}
                    type="button"
                  >
                    <i className={`fa-solid ${isInComparator('3') ? 'fa-check' : 'fa-arrow-right-arrow-left'}`}></i>
                  </button>
                </div>
              </div>
            </article>

            {/* Card 2: iPhone 15 Pro Max */}
            <article className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div
                className="relative aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => handleOpenDetail('5')}
              >
                <img
                  alt="Digital Life iPhone 15 Pro"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo4iv7xXOZoPMRE79adDxlap8JHELjcXeRAYYb1V1M_lrokb7OlbvrOnusZyZpAMMvn1-ro5dF40fVzCkeEvvgY0PD75deU9CnGp7wYYFq2UgrDigSaEWhraf6fKHWgGH402uXy9E-MbItLiAHyZFGRAbSVPzM7u0OH6JBQbtgEy2QiTQFQ_yqs4D930RCKDB8RS971x2Jk1Mk9xSoSx47p9d72VWq7dLoF2qgLDt5szHigDXRv8hxXQ"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  Produit Tech & Mobile
                </span>
                <div className="absolute bottom-3 left-3 bg-[#0047ff] text-white text-xs font-extrabold px-2.5 py-1 rounded shadow-sm">
                  1 150 USD
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-location-dot text-slate-400"></i> Kinshasa
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <i className="fa-solid fa-star text-[11px]"></i> 4.9
                    </span>
                  </div>
                  <h3
                    onClick={() => handleOpenDetail('5')}
                    className="font-bold text-slate-900 text-sm hover:text-[#0047ff] transition-colors cursor-pointer"
                  >
                    iPhone 15 Pro Max (256 Go)
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    Smartphone titane ultra-résistant, puce A17 Pro, zoom optique 5x et autonomie...
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenDetail('5')}
                    className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition cursor-pointer"
                    type="button"
                  >
                    Détails
                  </button>
                  <button
                    aria-label="Comparer"
                    onClick={(e) => handleToggleCompare(e, '5')}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs transition cursor-pointer ${
                      isInComparator('5')
                        ? 'bg-[#8c4b12] text-white'
                        : 'bg-blue-50 hover:bg-blue-100 text-[#0047ff]'
                    }`}
                    type="button"
                  >
                    <i className={`fa-solid ${isInComparator('5') ? 'fa-check' : 'fa-arrow-right-arrow-left'}`}></i>
                  </button>
                </div>
              </div>
            </article>

            {/* Card 3: Kola Concept Store */}
            <article className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div
                className="relative aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => handleOpenDetail('9')}
              >
                <img
                  alt="Kola Concept Store Douala"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQw7eM2RnRWANdQBXi_CIFUAnoHkBc3nMOHQFk5NerGnUubnNkCLSWFoVTNxRK_d6xNtnoRB67n7uKVpFGqFXIkx3mfGcODOapUsnbJWKVUJXUsedBwf7Odvyr0HHay8cFdZfUbkyVP2ofvg9Rh7lJlDuyPbxa6Nzy1eqEQmyvGaNGCvo1taRoMkxPVqb7PONNSi20_bHsqAQbqhZLCrBQ9LF-uev50yC1eZn6XwxUvR4DmnHXKbAokg"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  Boutique Design & Mode
                </span>
                <div className="absolute bottom-3 left-3 bg-[#0047ff] text-white text-xs font-extrabold px-2.5 py-1 rounded shadow-sm">
                  45 000 FCFA
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-location-dot text-slate-400"></i> Douala
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <i className="fa-solid fa-star text-[11px]"></i> 4.7
                    </span>
                  </div>
                  <h3
                    onClick={() => handleOpenDetail('9')}
                    className="font-bold text-slate-900 text-sm hover:text-[#0047ff] transition-colors cursor-pointer"
                  >
                    Kola Concept Store
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    Mode, design et accessoires d'exception signés par les créateurs les plus...
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenDetail('9')}
                    className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition cursor-pointer"
                    type="button"
                  >
                    Détails
                  </button>
                  <button
                    aria-label="Comparer"
                    onClick={(e) => handleToggleCompare(e, '9')}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs transition cursor-pointer ${
                      isInComparator('9')
                        ? 'bg-[#8c4b12] text-white'
                        : 'bg-blue-50 hover:bg-blue-100 text-[#0047ff]'
                    }`}
                    type="button"
                  >
                    <i className={`fa-solid ${isInComparator('9') ? 'fa-check' : 'fa-arrow-right-arrow-left'}`}></i>
                  </button>
                </div>
              </div>
            </article>

            {/* Card 4: Samsung Galaxy S24 Ultra */}
            <article className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div
                className="relative aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => handleOpenDetail('11')}
              >
                <img
                  alt="Samsung Galaxy S24 Ultra"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuO3EVMyhcVH0iO9UJOv90kcC-y22oWarMyyMD5cwoSgeYkxs5St3etL5aupv9SEhjoGBVCYRwL3pox0Y46jdCCnjEdtGvJ0hrhSVsg9YybNapBv3taoxL6naLxjSp8NkmjR8prsWsf6e7SdFJieAJ_4mIhOeK64KNWvIVcB-8cCs3Y-AAQzR8FrBFshXKKFQdnZCJ20hQP8NFD5xkHjpnZU6kMR_PID6E1ZSxWbjdMNzU0btQWczvkg"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  Produit Tech & Mobile
                </span>
                <div className="absolute bottom-3 left-3 bg-[#0047ff] text-white text-xs font-extrabold px-2.5 py-1 rounded shadow-sm">
                  1 090 USD
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
                    <span className="flex items-center gap-1">
                      <i className="fa-solid fa-location-dot text-slate-400"></i> Kinshasa
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <i className="fa-solid fa-star text-[11px]"></i> 4.8
                    </span>
                  </div>
                  <h3
                    onClick={() => handleOpenDetail('11')}
                    className="font-bold text-slate-900 text-sm hover:text-[#0047ff] transition-colors cursor-pointer"
                  >
                    Samsung Galaxy S24 Ultra (512 Go)
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    Le summum Android avec Galaxy AI intégrée, stylet S-Pen rétractable, capte...
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenDetail('11')}
                    className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition cursor-pointer"
                    type="button"
                  >
                    Détails
                  </button>
                  <button
                    aria-label="Comparer"
                    onClick={(e) => handleToggleCompare(e, '11')}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs transition cursor-pointer ${
                      isInComparator('11')
                        ? 'bg-[#8c4b12] text-white'
                        : 'bg-blue-50 hover:bg-blue-100 text-[#0047ff]'
                    }`}
                    type="button"
                  >
                    <i className={`fa-solid ${isInComparator('11') ? 'fa-check' : 'fa-arrow-right-arrow-left'}`}></i>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* END: FeaturedProductsSection */}

      {/* BEGIN: MostConsultedComparisonsSection */}
      <section className="py-8 bg-white" data-purpose="popular-comparisons" id="comparateur">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 rounded-3xl p-6 sm:p-8 border border-blue-100/70">
            {/* Heading */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
              <div>
                <span className="text-xs font-bold text-[#0047ff] uppercase tracking-wider block mb-1">
                  GAGNEZ DU TEMPS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Comparatifs les plus consultés
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md font-medium">
                Lancez instantanément un duel comparatif complet avec l'arbitrage de l'intelligence artificielle :
              </p>
            </div>

            {/* Comparison Duel Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {/* Duel 1 */}
              <div
                onClick={() => handleLaunchDuel('5', '11')}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider mb-1">
                    SMARTPHONE HAUT DE GAMME
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-[#0047ff] transition-colors">
                    iPhone 15 Pro vs Samsung S24 Ultra
                  </h3>
                  <span className="inline-flex items-center text-[#0047ff] text-xs font-bold mt-2 hover:underline">
                    Voir verdict IA →
                  </span>
                </div>
                <button
                  aria-label="Lancer duel"
                  className="w-9 h-9 rounded-xl bg-blue-50 text-[#0047ff] group-hover:bg-[#0047ff] group-hover:text-white transition flex items-center justify-center flex-shrink-0 cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-right-arrow-left text-xs"></i>
                </button>
              </div>

              {/* Duel 2 */}
              <div
                onClick={() => handleLaunchDuel('2', '6')}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider mb-1">
                    SÉJOUR & HÔTEL 4-5★
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-[#0047ff] transition-colors">
                    Azalaï Hotel vs Radisson Blu
                  </h3>
                  <span className="inline-flex items-center text-[#0047ff] text-xs font-bold mt-2 hover:underline">
                    Voir verdict IA →
                  </span>
                </div>
                <button
                  aria-label="Lancer duel"
                  className="w-9 h-9 rounded-xl bg-blue-50 text-[#0047ff] group-hover:bg-[#0047ff] group-hover:text-white transition flex items-center justify-center flex-shrink-0 cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-right-arrow-left text-xs"></i>
                </button>
              </div>

              {/* Duel 3 */}
              <div
                onClick={() => handleLaunchDuel('1', '8')}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider mb-1">
                    GASTRONOMIE & MER
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-[#0047ff] transition-colors">
                    Le Jardin Gourmand vs Le Lagon 1
                  </h3>
                  <span className="inline-flex items-center text-[#0047ff] text-xs font-bold mt-2 hover:underline">
                    Voir verdict IA →
                  </span>
                </div>
                <button
                  aria-label="Lancer duel"
                  className="w-9 h-9 rounded-xl bg-blue-50 text-[#0047ff] group-hover:bg-[#0047ff] group-hover:text-white transition flex items-center justify-center flex-shrink-0 cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-right-arrow-left text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: MostConsultedComparisonsSection */}

      {/* BEGIN: VerifiedDiningAndHotelsSection */}
      <section className="py-10 bg-white" data-purpose="verified-dining-hotels">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="flex items-end justify-between mb-7">
            <div>
              <span className="text-xs font-bold text-[#0047ff] uppercase tracking-wider block mb-1">
                HOSPITALITÉ & TABLES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Tables & Hôtels vérifiés
              </h2>
            </div>
            <button
              onClick={() => onNavigate('explorer')}
              className="text-xs sm:text-sm font-bold text-[#0047ff] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Tout explorer</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>

          {/* 3 Major Venue Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Venue 1: Le Jardin Gourmand */}
            <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div
                className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => handleOpenDetail('1')}
              >
                <img
                  alt="Le Jardin Gourmand Restaurant"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxVYH4uUqDNcU9gWYNG8JevsQvOj91_QJfD7ORJauPFkm_k5Zs3zyDuRjJYarDp29gfM8Sx-KQ1f4bN8xFx87AqivkT3PTQRFhS7Zf4ghujA-iWQv8cTXHBB8I4HPtB2Tw-yuxhK3RPBpBTso2K485dIiJ8ZtuGHcQQa8py2kEVZlcE-b7GhZxmSy7DfqO20jwEAVxOgol3a10JtMzKcLCyxrlj4wL2XRpNILvBf36M2Pj9S5cqygzXg"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  Restaurant
                </span>
                <div className="absolute bottom-3 left-3 bg-[#0047ff] text-white text-xs font-extrabold px-3 py-1 rounded shadow-sm">
                  12 000 FCFA
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-location-dot text-[#0047ff]"></i> Plateau, Dakar • 1.2 km
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <i className="fa-solid fa-star text-[11px]"></i> 4.8
                    </span>
                  </div>
                  <h3
                    onClick={() => handleOpenDetail('1')}
                    className="font-extrabold text-slate-900 text-lg hover:text-[#0047ff] transition-colors cursor-pointer"
                  >
                    Le Jardin Gourmand
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                    Cuisine fusion méditerranéenne et sénégalaise dans un cadre verdoyant et climatisé. Poissons frais du jour et...
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenDetail('1')}
                    className="flex-1 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition cursor-pointer"
                    type="button"
                  >
                    Détails
                  </button>
                  <button
                    aria-label="Sélectionné"
                    onClick={(e) => handleToggleCompare(e, '1')}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs cursor-pointer transition ${
                      isInComparator('1')
                        ? 'bg-[#8c4b12] text-white'
                        : 'bg-blue-50 text-[#0047ff] hover:bg-blue-100'
                    }`}
                    type="button"
                  >
                    <i className={`fa-solid ${isInComparator('1') ? 'fa-check' : 'fa-arrow-right-arrow-left'}`}></i>
                  </button>
                </div>
              </div>
            </article>

            {/* Venue 2: Le Lagon 1 */}
            <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div
                className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => handleOpenDetail('8')}
              >
                <img
                  alt="Le Lagon 1 Restaurant"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCsOhyY0ho3JAF0O0EJ7rLzdyVzHvMz_ifGHFRaOX96FaQ4Hm_kxO4Ui4-iT5UWDvMIzi3BmayzsYBKji2tijNnj7emv2cFE_0EjMwFewxlKfFF4N1PfDBC9z4kpeIjbRYDQHldKIt4UIRuVPtHhkqMTadINML395z7-az04JG5MnH7phLbn7dMMDaf73FbDn7UyOpwg8A67gtwyFiAHflZgtt6wkn5MxJ9wNaaIcGKYACSMSaZEbJpw"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  Restaurant & Gastronomie
                </span>
                <div className="absolute bottom-3 left-3 bg-[#0047ff] text-white text-xs font-extrabold px-3 py-1 rounded shadow-sm">
                  25 000 FCFA
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-location-dot text-[#0047ff]"></i> Dakar, Almadies • Bord de mer
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <i className="fa-solid fa-star text-[11px]"></i> 4.9
                    </span>
                  </div>
                  <h3
                    onClick={() => handleOpenDetail('8')}
                    className="font-extrabold text-slate-900 text-lg hover:text-[#0047ff] transition-colors cursor-pointer"
                  >
                    Le Lagon 1
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                    Gastronomie seafood raffinée suspendue au-dessus de l'océan Atlantique avec vue spectaculaire.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenDetail('8')}
                    className="flex-1 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition cursor-pointer"
                    type="button"
                  >
                    Détails
                  </button>
                  <button
                    aria-label="Comparer"
                    onClick={(e) => handleToggleCompare(e, '8')}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs transition cursor-pointer ${
                      isInComparator('8')
                        ? 'bg-[#8c4b12] text-white'
                        : 'bg-blue-50 hover:bg-blue-100 text-[#0047ff]'
                    }`}
                    type="button"
                  >
                    <i className={`fa-solid ${isInComparator('8') ? 'fa-check' : 'fa-arrow-right-arrow-left'}`}></i>
                  </button>
                </div>
              </div>
            </article>

            {/* Venue 3: Le Grand Large */}
            <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div
                className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => handleOpenDetail('10')}
              >
                <img
                  alt="Le Grand Large Restaurant Abidjan"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYz4vBdrPE9mXvuodCK6nG0vkeNMb2pR9vni9-mTtLz2WZ7P-t4_8wEMz8GqNwnicMu9Gq1P7IZ7c5Ee4wV6GGGO7sUJN6qOve5lXL5dIQpqSkvpi4elkRyd7rwiRRV1lD6CpdjrxxKdmXch8qk45g0FkFmFQyAbMS_tIjc2tR7Z3KAT_gySVhtvNwF2ufgBFUCCoMwCCObhQVw0QdB1q8huYQVpaQwSvO3PsDSgBHB_NMIx7p8Z5nWg"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  Restaurant
                </span>
                <div className="absolute bottom-3 left-3 bg-[#0047ff] text-white text-xs font-extrabold px-3 py-1 rounded shadow-sm">
                  20 000 FCFA
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-location-dot text-[#0047ff]"></i> Abidjan, Marcory
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <i className="fa-solid fa-star text-[11px]"></i> 4.8
                    </span>
                  </div>
                  <h3
                    onClick={() => handleOpenDetail('10')}
                    className="font-extrabold text-slate-900 text-lg hover:text-[#0047ff] transition-colors cursor-pointer"
                  >
                    Le Grand Large
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                    L'adresse incontournable pour déguster des poissons frais et fruits de mer les pieds dans l'eau en bord de lagune.
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenDetail('10')}
                    className="flex-1 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition cursor-pointer"
                    type="button"
                  >
                    Détails
                  </button>
                  <button
                    aria-label="Comparer"
                    onClick={(e) => handleToggleCompare(e, '10')}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs transition cursor-pointer ${
                      isInComparator('10')
                        ? 'bg-[#8c4b12] text-white'
                        : 'bg-blue-50 hover:bg-blue-100 text-[#0047ff]'
                    }`}
                    type="button"
                  >
                    <i className={`fa-solid ${isInComparator('10') ? 'fa-check' : 'fa-arrow-right-arrow-left'}`}></i>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* END: VerifiedDiningAndHotelsSection */}

      {/* BEGIN: AiConciergeBannerSection */}
      <section className="py-10 bg-white" data-purpose="ai-assistant-callout" id="concierge">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="bg-[#0047ff] rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-blue-600/15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Info Block */}
              <div className="lg:col-span-7 flex items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-white text-2xl flex-shrink-0 border border-white/20">
                  <i className="fa-solid fa-robot"></i>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold tracking-wider uppercase text-blue-200 block">
                    ASSISTANT INTELLIGENT LUKAAI
                  </span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
                    Besoin d'un conseil personnalisé ?
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-xl">
                    Demandez à l'IA où trouver un produit précis ou comparer deux quartiers en quelques secondes.
                  </p>
                </div>
              </div>

              {/* Right Interactive Prompt Input */}
              <div className="lg:col-span-5">
                <form
                  onSubmit={handleConciergeSubmit}
                  className="bg-white rounded-2xl p-1.5 sm:p-2 shadow-lg flex items-center gap-2"
                >
                  <input
                    value={conciergeQuery}
                    onChange={(e) => setConciergeQuery(e.target.value)}
                    className="flex-1 border-0 focus:ring-0 text-slate-800 placeholder-slate-400 text-xs sm:text-sm pl-3 font-medium bg-transparent outline-none"
                    placeholder="Posez votre question à l'IA..."
                    type="text"
                  />
                  <button
                    className="bg-[#001e73] hover:bg-slate-900 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-all cursor-pointer"
                    type="submit"
                  >
                    Demander
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: AiConciergeBannerSection */}

      {/* BEGIN: MobileMoneyEcosystemSection */}
      <section className="py-12 bg-white" data-purpose="mobile-money-ecosystem">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="bg-slate-50/80 rounded-3xl p-8 sm:p-12 border border-slate-200/80 text-center">
            <span className="text-xs font-bold text-[#0047ff] uppercase tracking-wider block mb-2">
              ÉCOSYSTÈME MOBILE MONEY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight max-w-2xl mx-auto">
              Réglez directement sur place sans commission cachée
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl mx-auto mt-2 mb-8">
              lukaAI référence uniquement les professionnels équipés pour encaisser vos paiements mobiles officiels en direct.
            </p>

            {/* Interactive Brand Logos Row with Real Official Payment Logos */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-5xl mx-auto">
              {/* Wave */}
              <div
                onClick={() => onNavigate('explorer', 'Wave')}
                className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#1DC3EC] transition-all cursor-pointer group"
                title="Découvrir les établissements compatibles Wave"
              >
                <WaveLogo size="md" />
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 block group-hover:text-[#1DC3EC] transition-colors">
                    Wave
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Sénégal & CI</span>
                </div>
              </div>

              {/* Orange Money */}
              <div
                onClick={() => onNavigate('explorer', 'Orange Money')}
                className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#FF6600] transition-all cursor-pointer group"
                title="Découvrir les établissements compatibles Orange Money"
              >
                <OrangeMoneyLogo size="md" />
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 block group-hover:text-[#FF6600] transition-colors">
                    Orange Money
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Afrique de l'Ouest</span>
                </div>
              </div>

              {/* MTN MoMo */}
              <div
                onClick={() => onNavigate('explorer', 'MTN')}
                className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group"
                title="Découvrir les établissements compatibles MTN MoMo"
              >
                <MtnLogo size="md" />
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 block group-hover:text-amber-600 transition-colors">
                    MTN MoMo
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">CI, Bénin, Cameroun</span>
                </div>
              </div>

              {/* Moov Africa */}
              <div
                onClick={() => onNavigate('explorer', 'Moov')}
                className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#005BA3] transition-all cursor-pointer group"
                title="Découvrir les établissements compatibles Moov Africa"
              >
                <MoovAfricaLogo size="md" />
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 block group-hover:text-[#005BA3] transition-colors">
                    Moov Africa
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Bénin, Togo, Gabon</span>
                </div>
              </div>

              {/* M-Pesa */}
              <div
                onClick={() => onNavigate('explorer', 'M-Pesa')}
                className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-red-400 transition-all cursor-pointer group"
                title="Découvrir les établissements compatibles M-Pesa"
              >
                <MpesaLogo size="md" />
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 block group-hover:text-red-600 transition-colors">
                    M-Pesa
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">RDC & Afrique de l'Est</span>
                </div>
              </div>

              {/* Airtel Money */}
              <div
                onClick={() => onNavigate('explorer', 'Airtel Money')}
                className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-red-500 transition-all cursor-pointer group"
                title="Découvrir les établissements compatibles Airtel Money"
              >
                <AirtelMoneyLogo size="md" />
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 block group-hover:text-red-600 transition-colors">
                    Airtel Money
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">RDC, Congo, Gabon</span>
                </div>
              </div>

              {/* VISA */}
              <div
                onClick={() => onNavigate('explorer', 'Visa')}
                className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-500 transition-all cursor-pointer group"
                title="Découvrir les établissements acceptant Visa"
              >
                <div className="px-1">
                  <VisaLogo size="md" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 block group-hover:text-[#1A1F71] transition-colors">
                    Carte VISA
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">International</span>
                </div>
              </div>

              {/* Mastercard */}
              <div
                onClick={() => onNavigate('explorer', 'Mastercard')}
                className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-500 transition-all cursor-pointer group"
                title="Découvrir les établissements acceptant Mastercard"
              >
                <MastercardLogo size="md" />
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 block group-hover:text-amber-600 transition-colors">
                    Mastercard
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">International</span>
                </div>
              </div>

              {/* PayPal */}
              <div
                onClick={() => onNavigate('explorer', 'PayPal')}
                className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group"
                title="Découvrir les établissements acceptant PayPal"
              >
                <PaypalLogo size="sm" />
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-800 block group-hover:text-[#0079C1] transition-colors">
                    PayPal
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">En ligne & TPE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: MobileMoneyEcosystemSection */}
    </div>
  );
};
