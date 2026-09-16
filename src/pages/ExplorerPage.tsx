import React, { useState, useMemo } from 'react';
import { ESTABLISHMENTS_DATA } from '../data/establishments';
import { Establishment, PageId } from '../types';
import { useToast } from '../context/ToastContext';
import { useCountry } from '../context/CountryContext';
import { useComparator } from '../context/ComparatorContext';
import { PaymentLogo } from '../components/PaymentLogo';

interface ExplorerPageProps {
  initialFilter?: string;
  onNavigate: (page: PageId, query?: string) => void;
  onSelectProduct?: (id: string) => void;
}

export const ExplorerPage: React.FC<ExplorerPageProps> = ({
  initialFilter,
  onNavigate,
  onSelectProduct,
}) => {
  const { showToast } = useToast();
  const { currentCountry, countryPayments } = useCountry();
  const { addToComparator, removeFromComparator, isInComparator, setSelectedProductId } =
    useComparator();

  const [currentCategory, setCurrentCategory] = useState<string>(
    initialFilter && ['restaurant', 'hotel', 'boutique', 'loisir'].includes(initialFilter)
      ? initialFilter
      : 'all'
  );
  const [currentPayment, setCurrentPayment] = useState<string>(
    initialFilter && ['orange', 'wave', 'mtn', 'moov', 'card', 'airtel', 'mpesa'].includes(initialFilter.toLowerCase())
      ? initialFilter.toLowerCase()
      : 'all'
  );
  const [searchQuery, setSearchQuery] = useState(
    initialFilter && !['restaurant', 'hotel', 'boutique', 'loisir'].includes(initialFilter) ? initialFilter : ''
  );
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'popular'>('popular');

  const filteredEstablishments = useMemo(() => {
    const list = ESTABLISHMENTS_DATA.filter((item) => {
      const matchCat = currentCategory === 'all' || item.category === currentCategory;
      const payStr = item.payments.join(' ').toLowerCase();
      let matchPay = true;
      if (currentPayment !== 'all') {
        if (currentPayment === 'orange') matchPay = payStr.includes('orange');
        else if (currentPayment === 'wave') matchPay = payStr.includes('wave');
        else if (currentPayment === 'mtn') matchPay = payStr.includes('mtn');
        else if (currentPayment === 'moov') matchPay = payStr.includes('moov');
        else if (currentPayment === 'airtel') matchPay = payStr.includes('airtel');
        else if (currentPayment === 'mpesa') matchPay = payStr.includes('mpesa') || payStr.includes('m-pesa');
        else if (currentPayment === 'card') matchPay = payStr.includes('carte') || payStr.includes('visa');
        else matchPay = payStr.includes(currentPayment.toLowerCase());
      }

      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      return matchCat && matchPay && matchSearch;
    });

    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => (a.priceNumeric || 0) - (b.priceNumeric || 0));
    } else if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => (b.priceNumeric || 0) - (a.priceNumeric || 0));
    }
    return list;
  }, [currentCategory, currentPayment, searchQuery, sortBy]);

  const handleOpenDetail = (item: Establishment) => {
    setSelectedProductId(item.id);
    if (onSelectProduct) onSelectProduct(item.id);
    onNavigate('detail');
  };

  const handleToggleCompare = (e: React.MouseEvent, item: Establishment) => {
    e.stopPropagation();
    if (isInComparator(item.id)) {
      removeFromComparator(item.id);
    } else {
      addToComparator(item);
    }
  };

  const categoriesList = [
    { id: 'all', label: 'Tous les produits & lieux', icon: 'apps' },
    { id: 'boutique', label: 'Produits & Boutiques', icon: 'shopping_bag' },
    { id: 'restaurant', label: 'Restaurants & Maquis', icon: 'restaurant' },
    { id: 'hotel', label: 'Hôtels & Résidences', icon: 'hotel' },
    { id: 'loisir', label: 'Loisirs & Sorties', icon: 'celebration' },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen pb-16">
      {/* Top Explorer Header & Search Bar */}
      <section className="w-full bg-surface-container-low/80 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-surface-container-high">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                <span className="material-symbols-outlined text-[16px]">travel_explore</span>
                <span>Catalogue Complet & Vérifié</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-on-surface tracking-tight">
                Explorer tous les produits & adresses
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl">
                Trouvez n’importe quel produit, boutique ou service en Afrique. Vérifiés sur place, sans prépaiement forcé et compatibles Mobile Money.
              </p>
            </div>

            {/* Quick Link to Comparator */}
            <button
              onClick={() => onNavigate('comparateur')}
              className="px-4 py-2 rounded-full bg-surface hover:bg-surface-container border border-surface-container-high text-xs font-bold text-primary transition-all flex items-center gap-2 shadow-xs cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
              <span>Ouvrir l’espace comparateur</span>
            </button>
          </div>

          {/* Search Bar (Prominent & Real-time) */}
          <div className="relative w-full max-w-3xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-[22px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par produit, boutique, restaurant, ville (iPhone, poisson braisé, Dakar, hôtel...)"
              className="w-full pl-12 pr-10 py-3.5 bg-surface text-on-surface rounded-2xl outline-none border border-surface-container-high shadow-xs focus:ring-2 focus:ring-primary transition-all text-sm sm:text-base font-medium placeholder:text-outline"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1 text-sm cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCurrentCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  currentCategory === cat.id
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface hover:bg-surface-container border border-surface-container-high text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Secondary Filter: Payment method & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-surface-container">
            {/* Payment Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs text-outline font-semibold shrink-0 mr-1">Paiement :</span>
              <button
                onClick={() => setCurrentPayment('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                  currentPayment === 'all'
                    ? 'bg-on-surface text-surface'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                Tous
              </button>
              {['wave', 'orange', 'mtn', 'airtel', 'mpesa', 'card'].map((pm) => (
                <button
                  key={pm}
                  onClick={() => setCurrentPayment(pm)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
                    currentPayment === pm
                      ? 'bg-primary text-white'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                  }`}
                >
                  <PaymentLogo type={pm} size="xs" showLabel={false} />
                  <span className="capitalize">{pm}</span>
                </button>
              ))}
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-outline font-semibold">Trier :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-surface border border-surface-container-high rounded-xl px-3 py-1.5 text-xs font-semibold text-on-surface outline-none cursor-pointer"
              >
                <option value="popular">Recommandés</option>
                <option value="rating">Mieux notés (★)</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        <div className="flex items-center justify-between text-xs text-on-surface-variant font-medium">
          <span>
            <strong className="text-on-surface font-bold">{filteredEstablishments.length}</strong> résultats trouvés
          </span>
          {searchQuery && (
            <span>
              Filtre actif : « <strong>{searchQuery}</strong> »
            </span>
          )}
        </div>

        {/* Establishments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEstablishments.map((item) => {
            const isCompared = isInComparator(item.id);
            return (
              <div
                key={item.id}
                onClick={() => handleOpenDetail(item)}
                className="group bg-surface-container-low rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-surface-container-high transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-surface-container">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md text-on-surface px-2.5 py-1 rounded-full text-xs font-bold shadow-xs border border-surface-container-high">
                      {item.categoryLabel}
                    </div>

                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md text-on-surface px-2.5 py-1 rounded-full text-xs flex items-center gap-1 shadow-xs font-bold border border-surface-container-high">
                      <span className="material-symbols-outlined text-amber-500 text-[15px] fill-1">
                        star
                      </span>
                      <span>{item.rating}</span>
                    </div>

                    {/* Price tag */}
                    <div className="absolute bottom-3 left-3 bg-primary text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5">
                      <span>{item.priceDisplay}</span>
                      {item.priceSubtitle && (
                        <span className="text-[10px] font-medium opacity-90">
                          {item.priceSubtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[15px] text-primary">location_on</span>
                        <span>{item.location}</span>
                      </span>
                      <span className="text-[11px] text-green-700 font-bold">Vérifié ✓</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                      {item.name}
                    </h3>

                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Payments preview */}
                    <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                      {item.payments.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-surface text-[11px] font-semibold text-on-surface border border-surface-container"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 border-t border-surface-container flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(item);
                    }}
                    className="flex-1 py-2.5 rounded-full bg-surface hover:bg-surface-container border border-surface-container-high text-xs font-bold text-on-surface text-center transition-colors cursor-pointer"
                  >
                    Voir le détail
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleToggleCompare(e, item)}
                    className={`px-3.5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isCompared
                        ? 'bg-secondary text-on-secondary shadow-xs'
                        : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                    }`}
                    title={isCompared ? 'Retirer du comparateur' : 'Ajouter au comparateur'}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isCompared ? 'check' : 'compare_arrows'}
                    </span>
                    <span>{isCompared ? 'Comparé' : 'Comparer'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Result */}
        {filteredEstablishments.length === 0 && (
          <div className="text-center py-16 bg-surface-container-low rounded-3xl mt-4 border border-surface-container-high p-8">
            <span className="material-symbols-outlined text-5xl text-outline mb-2">search_off</span>
            <h3 className="text-base font-bold text-on-surface">Aucun élément trouvé</h3>
            <p className="text-xs text-on-surface-variant mt-1 max-w-md mx-auto">
              Aucun résultat ne correspond à votre recherche « {searchQuery} ». Essayez un autre mot-clé ou réinitialisez les filtres.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={() => {
                  setCurrentCategory('all');
                  setCurrentPayment('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2 bg-primary text-white rounded-full text-xs font-bold cursor-pointer hover:bg-primary/90 transition-colors"
              >
                Voir tous les produits & adresses
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
