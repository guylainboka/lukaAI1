import React, { useState } from 'react';
import { PageId, Establishment } from '../types';
import { ESTABLISHMENTS_DATA } from '../data/establishments';
import { useComparator } from '../context/ComparatorContext';
import { useToast } from '../context/ToastContext';
import { PaymentLogo } from '../components/PaymentLogo';

interface DetailPageProps {
  productId?: string | null;
  onNavigate: (page: PageId, query?: string) => void;
  onSelectProduct?: (id: string) => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({
  productId,
  onNavigate,
  onSelectProduct,
}) => {
  const { showToast } = useToast();
  const {
    selectedProduct: contextProduct,
    setSelectedProductId,
    addToComparator,
    removeFromComparator,
    isInComparator,
    comparedItems,
  } = useComparator();

  // Determine current item to display
  const product: Establishment =
    ESTABLISHMENTS_DATA.find((e) => e.id === productId) ||
    contextProduct ||
    ESTABLISHMENTS_DATA[0];

  const [activeImage, setActiveImage] = useState<string>(product.imageUrl);
  const [activeTab, setActiveTab] = useState<'details' | 'features' | 'reviews'>('details');

  // Related suggestions: other items excluding the current one
  const suggestions = ESTABLISHMENTS_DATA.filter((e) => e.id !== product.id).slice(0, 3);

  const isCompared = isInComparator(product.id);

  const handleToggleComparator = () => {
    if (isCompared) {
      removeFromComparator(product.id);
    } else {
      addToComparator(product);
    }
  };

  const handleSelectSuggestion = (suggestedItem: Establishment) => {
    if (onSelectProduct) {
      onSelectProduct(suggestedItem.id);
    }
    setSelectedProductId(suggestedItem.id);
    setActiveImage(suggestedItem.imageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Découvrez ${product.name} sur lukaAI !`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Lien de la fiche copié dans le presse-papier !', 'success');
    }
  };

  const imagesList = product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl];

  return (
    <div className="w-full flex flex-col min-h-screen pb-16">
      {/* Top Breadcrumb & Quick Actions Header */}
      <div className="w-full bg-surface-container-low/60 border-b border-surface-container-high py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant truncate">
            <button
              onClick={() => onNavigate('explorer')}
              className="hover:text-primary font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Explorer</span>
            </button>
            <span>/</span>
            <span className="text-on-surface font-semibold capitalize">{product.categoryLabel}</span>
            <span>/</span>
            <span className="text-primary font-bold truncate max-w-[160px] sm:max-w-xs">{product.name}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Share Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-surface hover:bg-surface-container border border-surface-container-high text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              title="Partager cette fiche"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>

            {/* Quick Comparator Status Link */}
            <button
              onClick={() => onNavigate('comparateur')}
              className="px-3 py-1.5 rounded-full bg-surface hover:bg-surface-container border border-surface-container-high text-xs font-bold text-primary transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
              <span>Comparateur</span>
              <span className="px-1.5 py-0.2 bg-primary text-white rounded-full text-[10px]">
                {comparedItems.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-10">
        {/* Main Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Image Gallery (5 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            {/* Primary Large Image */}
            <div className="relative aspect-4/3 sm:aspect-16/11 w-full rounded-3xl overflow-hidden bg-surface-container-high border border-surface-container-high shadow-md">
              <img
                src={activeImage || product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
              />

              {/* Verified Ribbon */}
              {product.verified && (
                <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-primary font-bold text-xs shadow-md">
                  <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                  <span>100% Vérifié lukaAI</span>
                </div>
              )}

              {/* Category Pill */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-medium text-xs">
                {product.categoryLabel}
              </div>

              {/* Zero fee mobile money indicator */}
              <div className="absolute bottom-4 left-4 right-4 bg-surface/95 backdrop-blur-md px-3.5 py-2 rounded-2xl flex items-center justify-between border border-surface-container-high shadow-md">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-green-600">check_circle</span>
                  <span className="text-xs font-bold text-on-surface">Paiement sans avance de frais</span>
                </div>
                <span className="text-[11px] font-semibold text-primary">0% commission</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeImage === img
                        ? 'border-primary ring-2 ring-primary/20 scale-102'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} miniature ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Pricing, Actions & Key Specifications (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Header / Titles */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-primary/10 text-primary uppercase tracking-wider">
                  {product.city}
                </span>
                <span className="text-xs font-medium text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                  {product.location}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 font-extrabold text-sm">
                  <span className="material-symbols-outlined text-[18px] text-amber-500 fill-1">star</span>
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs sm:text-sm text-on-surface-variant">
                  ({product.reviewsCount || 340} avis clients vérifiés)
                </span>
                <span className="text-outline">•</span>
                <span className="text-xs text-green-700 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                  {product.openingHours || 'Ouvert'}
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container-high flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex flex-col">
                <span className="text-xs text-outline font-semibold uppercase tracking-wider">
                  Tarif indicatif direct
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
                    {product.priceDisplay}
                  </span>
                  {product.priceSubtitle && (
                    <span className="text-sm font-semibold text-on-surface-variant">
                      {product.priceSubtitle}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-on-surface-variant mt-0.5">
                  Aucun paiement forcé en ligne • Règlement direct sur place
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-surface px-3 py-1.5 rounded-xl border border-surface-container text-xs font-bold text-on-surface shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                <span>Garantie lukaAI</span>
              </div>
            </div>

            {/* Modes de paiement acceptés */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">account_balance_wallet</span>
                Modes de paiement acceptés sur place
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {product.payments.map((pm, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container border border-surface-container-high text-xs font-semibold text-on-surface shadow-2xs"
                  >
                    <PaymentLogo type={pm} size="xs" />
                    <span>{pm}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons: Add to Comparator & Contact */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {/* Add to Comparator Button */}
              <button
                type="button"
                onClick={handleToggleComparator}
                className={`flex-1 px-5 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  isCompared
                    ? 'bg-secondary text-on-secondary hover:bg-secondary/90 ring-2 ring-secondary/30'
                    : 'bg-primary text-white hover:bg-primary/90 hover:scale-101'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isCompared ? 'check_circle' : 'compare_arrows'}
                </span>
                <span>{isCompared ? 'Dans le comparateur ✓' : 'Ajouter au comparateur'}</span>
              </button>

              {/* View Comparator direct link if added */}
              {isCompared && (
                <button
                  type="button"
                  onClick={() => onNavigate('comparateur')}
                  className="px-4 py-3.5 rounded-full bg-surface-container hover:bg-surface-container-high border border-surface-container-highest text-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Comparer maintenant</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              )}

              {/* WhatsApp direct contact */}
              {product.whatsapp && (
                <a
                  href={`https://wa.me/${product.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp</span>
                </a>
              )}
            </div>

            {/* Quick Contact & Address Bar */}
            <div className="flex items-center gap-4 text-xs text-on-surface-variant border-t border-surface-container-high pt-4 flex-wrap">
              {product.phone && (
                <a
                  href={`tel:${product.phone}`}
                  className="hover:text-primary flex items-center gap-1 font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                  {product.phone}
                </a>
              )}
              {product.address && (
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-outline">pin_drop</span>
                  {product.address}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Overview, Specifications & Reviews */}
        <div className="w-full flex flex-col gap-6 pt-4 border-t border-surface-container-high">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-surface-container pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'details'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">description</span>
              <span>Description complète</span>
            </button>

            <button
              onClick={() => setActiveTab('features')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'features'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Caractéristiques & Avantages</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">star</span>
              <span>Avis clients ({product.reviewsCount || 340})</span>
            </button>
          </div>

          {/* Tab Content: Details */}
          {activeTab === 'details' && (
            <div className="flex flex-col gap-6 max-w-4xl">
              <div className="bg-surface-container-low rounded-3xl p-6 sm:p-8 border border-surface-container-high">
                <h3 className="text-lg font-bold text-on-surface mb-3">À propos de cet établissement</h3>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed mb-4">
                  {product.fullDescription || product.description}
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Tous les paiements s’effectuent en toute transparence. Lorsque vous visitez l’établissement ou commandez, vous réglez directement via votre application mobile money habituelle sans surcoût.
                </p>
              </div>

              {/* Points forts & Points à savoir */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pros */}
                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                    <span>Points forts majeurs</span>
                  </div>
                  <ul className="space-y-2">
                    {(product.pros || [
                      'Accueil chaleureux et professionnel',
                      'Encaissements Wave & Orange Money instantanés',
                      'Emplacement accessible et sécurisé',
                    ]).map((pro, i) => (
                      <li key={i} className="text-xs sm:text-sm text-on-surface flex items-start gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-[16px] shrink-0 mt-0.5">check</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                    <span className="material-symbols-outlined text-[20px]">info</span>
                    <span>Bon à savoir avant de venir</span>
                  </div>
                  <ul className="space-y-2">
                    {(product.cons || [
                      'Pensez à réserver à l’avance lors des jours de forte affluence',
                      'Vérifiez le solde de votre compte mobile money avant encaissement',
                    ]).map((con, i) => (
                      <li key={i} className="text-xs sm:text-sm text-on-surface flex items-start gap-2">
                        <span className="material-symbols-outlined text-amber-600 text-[16px] shrink-0 mt-0.5">arrow_right</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Features */}
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
              {(product.features || [
                'Paiement direct Wave sans commission',
                'Wifi haut débit gratuit',
                'Service voiturier & parking sécurisé',
                'Climatisation intégrale',
                'Facture avec TVA disponible',
                'Accessible aux personnes à mobilité réduite',
              ]).map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-on-surface">{feat}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Reviews */}
          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-6 max-w-4xl">
              <div className="flex items-center gap-4 p-6 rounded-3xl bg-surface-container-low border border-surface-container-high">
                <div className="text-center">
                  <span className="text-4xl sm:text-5xl font-black text-primary">{product.rating}</span>
                  <div className="flex text-amber-500 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-[18px] fill-1">star</span>
                    ))}
                  </div>
                  <span className="text-xs text-outline mt-1 block">Sur 5 étoiles</span>
                </div>
                <div className="h-16 w-[1px] bg-surface-container-high mx-2" />
                <div className="flex-1 text-xs sm:text-sm text-on-surface-variant">
                  <strong className="text-on-surface">100% avis vérifiés sur place.</strong> Nos utilisateurs confirment avoir réglé via mobile money sans aucune mauvaise surprise ni frais de change non annoncés.
                </div>
              </div>

              {/* Sample Review Cards */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-surface border border-surface-container-high shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                        AM
                      </div>
                      <span className="text-sm font-bold text-on-surface">Awa M.</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 font-semibold">Client vérifié</span>
                    </div>
                    <span className="text-xs text-outline">Il y a 3 jours</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    « Excellent service ! J’ai payé avec Wave par QR code en 5 secondes chrono. Aucun frais supplémentaire, service impeccable. Je recommande vivement ! »
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface border border-surface-container-high shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary font-bold flex items-center justify-center text-xs">
                        KD
                      </div>
                      <span className="text-sm font-bold text-on-surface">Koffi D.</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 font-semibold">Client vérifié</span>
                    </div>
                    <span className="text-xs text-outline">Il y a 1 semaine</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    « Cadre magnifique et personnel aux petits soins. Pratique de pouvoir comparer et voir à l’avance les modes de paiement disponibles. »
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Similar Suggestions Section ("avec des suggestion des autres produit") */}
        <section className="w-full pt-8 border-t border-surface-container-high flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Recommandations</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface">
                Autres adresses et produits suggérés
              </h2>
            </div>
            <button
              onClick={() => onNavigate('explorer')}
              className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Voir tout le catalogue</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((item) => {
              const itemInComparator = isInComparator(item.id);
              return (
                <div
                  key={item.id}
                  className="group bg-surface-container-low rounded-2xl border border-surface-container-high overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div
                      onClick={() => handleSelectSuggestion(item)}
                      className="relative aspect-16/10 w-full overflow-hidden bg-surface-container cursor-pointer"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[11px] font-medium backdrop-blur-xs">
                        {item.categoryLabel}
                      </div>
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-surface/95 text-primary text-xs font-black backdrop-blur-xs shadow-xs">
                        {item.priceDisplay}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-outline font-medium flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          {item.location}
                        </span>
                        <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                          {item.rating}
                        </span>
                      </div>

                      <h4
                        onClick={() => handleSelectSuggestion(item)}
                        className="text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1 cursor-pointer"
                      >
                        {item.name}
                      </h4>

                      <p className="text-xs text-on-surface-variant line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 pt-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectSuggestion(item)}
                      className="flex-1 py-2 rounded-xl bg-surface hover:bg-surface-container border border-surface-container-high text-xs font-bold text-on-surface text-center transition-colors cursor-pointer"
                    >
                      Voir le détail
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (itemInComparator) {
                          removeFromComparator(item.id);
                        } else {
                          addToComparator(item);
                        }
                      }}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                        itemInComparator
                          ? 'bg-secondary text-on-secondary border-secondary'
                          : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white'
                      }`}
                      title={itemInComparator ? 'Retirer du comparateur' : 'Ajouter au comparateur'}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {itemInComparator ? 'check' : 'compare_arrows'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
