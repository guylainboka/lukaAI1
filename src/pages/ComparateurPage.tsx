import React, { useState, useMemo } from 'react';
import { PageId, Establishment } from '../types';
import { ESTABLISHMENTS_DATA } from '../data/establishments';
import { useComparator } from '../context/ComparatorContext';
import { useToast } from '../context/ToastContext';
import { PaymentLogo } from '../components/PaymentLogo';

interface ComparateurPageProps {
  onNavigate: (page: PageId, query?: string) => void;
  onSelectProduct?: (id: string) => void;
}

export const ComparateurPage: React.FC<ComparateurPageProps> = ({
  onNavigate,
  onSelectProduct,
}) => {
  const { showToast } = useToast();
  const {
    comparedItems,
    removeFromComparator,
    addToComparator,
    clearComparator,
    setSelectedProductId,
  } = useComparator();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState('');
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);
  const [aiVerdict, setAiVerdict] = useState<string | null>(null);
  const [aiAnalysisType, setAiAnalysisType] = useState<'general' | 'budget' | 'mobile_money' | 'reputation'>('general');

  // Items available to add to comparator (not yet added)
  const availableItems = useMemo(() => {
    return ESTABLISHMENTS_DATA.filter(
      (e) => !comparedItems.some((ci) => ci.id === e.id)
    ).filter((e) => {
      if (!modalSearch) return true;
      const q = modalSearch.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.categoryLabel.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    });
  }, [comparedItems, modalSearch]);

  const handleOpenDetail = (id: string) => {
    setSelectedProductId(id);
    if (onSelectProduct) onSelectProduct(id);
    onNavigate('detail');
  };

  // Run AI Comparison
  const handleRunAiAnalysis = (type: 'general' | 'budget' | 'mobile_money' | 'reputation' = 'general') => {
    if (comparedItems.length < 2) {
      showToast('Ajoutez au moins 2 éléments pour lancer l’analyse comparative IA.', 'warning');
      return;
    }

    setIsAnalyzingAI(true);
    setAiAnalysisType(type);

    setTimeout(() => {
      setIsAnalyzingAI(false);
      const names = comparedItems.map((i) => i.name).join(' et ');
      const bestRated = [...comparedItems].sort((a, b) => b.rating - a.rating)[0];
      const lowestPrice = [...comparedItems].sort(
        (a, b) => (a.priceNumeric || 0) - (b.priceNumeric || 0)
      )[0];

      if (type === 'budget') {
        setAiVerdict(
          `💡 **Verdict Économique de l'IA** : Pour un budget maîtrisé, **${lowestPrice.name}** (${lowestPrice.priceDisplay}) offre le meilleur coût direct. Les transactions s’effectuent sans avance de frais via les moyens mobiles locaux (${lowestPrice.payments.join(', ')}).`
        );
      } else if (type === 'mobile_money') {
        setAiVerdict(
          `⚡ **Verdict Mobile Money de l'IA** : Si vous privilégiez la rapidité des transactions locales, tous les éléments sélectionnés acceptent le paiement instantané. Mention spéciale pour **${comparedItems[0].name}** qui propose un encaissement direct QR code sans frais supplémentaires avec une confirmation immédiate.`
        );
      } else if (type === 'reputation') {
        setAiVerdict(
          `⭐ **Verdict Réputation & Qualité de l'IA** : Avec une note de **${bestRated.rating}/5** (${bestRated.reviewsCount} avis), **${bestRated.name}** se démarque nettement sur la satisfaction client et la fiabilité du service.`
        );
      } else {
        setAiVerdict(
          `🏆 **Analyse Comparative Complète de l'IA** :\n\n• **Recommandation Globale** : **${bestRated.name}** remporte la comparaison grâce à son équilibre parfait entre avis vérifiés (${bestRated.rating}/5), transparence des tarifs et conformité des paiements locaux.\n• **Alternative Budgétaire** : Si votre priorité absolue est le tarif, tournez-vous vers **${lowestPrice.name}** (${lowestPrice.priceDisplay}).\n• **Garantie lukaAI** : Aucun des établissements comparés n'impose de prépaiement forcé en ligne.`
        );
      }
      showToast('Analyse comparative IA générée avec succès !', 'success');
    }, 900);
  };

  // Quick compare preset helper
  const handleLoadPreset = (ids: string[]) => {
    clearComparator();
    const presetItems = ESTABLISHMENTS_DATA.filter((e) => ids.includes(e.id));
    presetItems.forEach((item) => addToComparator(item));
  };

  return (
    <div className="w-full flex flex-col min-h-screen pb-16">
      {/* Top Banner Header */}
      <div className="w-full bg-surface-container-low/80 border-b border-surface-container-high py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
              <span>Outil de Décision lukaAI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-on-surface tracking-tight">
              Comparateur Intelligent & IA
            </h1>
            <p className="text-sm text-on-surface-variant mt-1 max-w-2xl">
              Comparez tous les détails des produits, boutiques, hôtels et restaurants : tarifs réels, modes de paiement Mobile Money, notes clients et demandez l’avis de l’IA.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {comparedItems.length > 0 && (
              <button
                onClick={clearComparator}
                className="px-4 py-2 rounded-full bg-surface border border-surface-container-high text-xs font-semibold text-outline hover:text-red-600 hover:border-red-300 transition-colors cursor-pointer"
              >
                Vider le comparateur
              </button>
            )}

            <button
              onClick={() => setAddModalOpen(true)}
              disabled={comparedItems.length >= 4}
              className="px-5 py-2.5 rounded-full bg-primary text-white font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-all cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Ajouter un élément ({comparedItems.length}/4)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* AI Comparative Assistant Box ("ou le faire avec l'ia pour trouver le meilleur") */}
        <div className="w-full rounded-3xl bg-gradient-to-br from-primary/10 via-surface-container-low to-surface-container-low border border-primary/20 p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-[#0052ff] text-white flex items-center justify-center shadow-md shrink-0">
                <span className="material-symbols-outlined text-[26px]">smart_toy</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-on-surface">
                    Arbitrage & Recommandation par l’IA
                  </h3>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary text-white uppercase tracking-wider">
                    IA Active
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                  L’IA compare les avis certifiés, les devises, la proximité et les facilités de paiement pour vous désigner le meilleur choix.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleRunAiAnalysis('general')}
              disabled={isAnalyzingAI || comparedItems.length < 2}
              className="w-full md:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-primary to-[#0052ff] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[20px] animate-pulse">
                auto_awesome
              </span>
              <span>{isAnalyzingAI ? 'Analyse en cours...' : 'Lancer l’arbitrage IA'}</span>
            </button>
          </div>

          {/* Quick AI Filters */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-surface-container flex-wrap relative z-10">
            <span className="text-xs font-semibold text-outline">Critère prioritaire :</span>
            <button
              onClick={() => handleRunAiAnalysis('general')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                aiAnalysisType === 'general'
                  ? 'bg-primary text-white shadow-2xs'
                  : 'bg-surface hover:bg-surface-container text-on-surface'
              }`}
            >
              Équilibre global
            </button>
            <button
              onClick={() => handleRunAiAnalysis('budget')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                aiAnalysisType === 'budget'
                  ? 'bg-primary text-white shadow-2xs'
                  : 'bg-surface hover:bg-surface-container text-on-surface'
              }`}
            >
              Meilleur budget
            </button>
            <button
              onClick={() => handleRunAiAnalysis('mobile_money')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                aiAnalysisType === 'mobile_money'
                  ? 'bg-primary text-white shadow-2xs'
                  : 'bg-surface hover:bg-surface-container text-on-surface'
              }`}
            >
              Facilité Mobile Money
            </button>
            <button
              onClick={() => handleRunAiAnalysis('reputation')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                aiAnalysisType === 'reputation'
                  ? 'bg-primary text-white shadow-2xs'
                  : 'bg-surface hover:bg-surface-container text-on-surface'
              }`}
            >
              Top réputation
            </button>
          </div>

          {/* AI Result View */}
          {aiVerdict && (
            <div className="mt-5 p-5 rounded-2xl bg-surface border border-primary/20 shadow-sm relative z-10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                  Synthèse de l’arbitrage IA
                </span>
                <span className="text-[11px] text-outline">Mis à jour instantanément</span>
              </div>
              <div className="text-xs sm:text-sm text-on-surface leading-relaxed whitespace-pre-line font-medium">
                {aiVerdict}
              </div>
            </div>
          )}
        </div>

        {/* Empty State: If user has 0 or 1 item, guide them */}
        {comparedItems.length === 0 && (
          <div className="w-full p-10 rounded-3xl bg-surface-container-low border border-surface-container-high text-center flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">compare_arrows</span>
            </div>
            <div className="max-w-md">
              <h3 className="text-lg font-bold text-on-surface">Votre comparateur est vide</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                Ajoutez des produits, boutiques, hôtels ou restaurants depuis l’accueil, la page explorer ou choisissez l’une de nos suggestions rapides :
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handleLoadPreset(['1', '8'])}
                className="px-4 py-2 rounded-full bg-surface border border-surface-container-high hover:border-primary text-xs font-bold text-on-surface hover:text-primary transition-all cursor-pointer shadow-xs"
              >
                🍽️ Le Jardin Gourmand vs Le Lagon 1
              </button>
              <button
                onClick={() => handleLoadPreset(['2', '6'])}
                className="px-4 py-2 rounded-full bg-surface border border-surface-container-high hover:border-primary text-xs font-bold text-on-surface hover:text-primary transition-all cursor-pointer shadow-xs"
              >
                🏨 Azalaï Hotel vs Radisson Blu
              </button>
              <button
                onClick={() => handleLoadPreset(['5', '11'])}
                className="px-4 py-2 rounded-full bg-surface border border-surface-container-high hover:border-primary text-xs font-bold text-on-surface hover:text-primary transition-all cursor-pointer shadow-xs"
              >
                📱 iPhone 15 Pro vs Samsung S24 Ultra
              </button>
            </div>
          </div>
        )}

        {/* Full Side-by-Side Comparison Matrix */}
        {comparedItems.length > 0 && (
          <div className="w-full overflow-x-auto rounded-3xl border border-surface-container-high bg-surface-container-low shadow-sm">
            <table className="w-full border-collapse min-w-[750px]">
              {/* Product Header Row */}
              <thead>
                <tr className="border-b border-surface-container-high bg-surface-container">
                  <th className="p-4 sm:p-6 text-left w-52 text-xs font-black text-outline uppercase tracking-wider">
                    Critères & Détails
                  </th>
                  {comparedItems.map((item) => (
                    <th key={item.id} className="p-4 sm:p-6 text-left w-72 align-top">
                      <div className="flex flex-col gap-3">
                        {/* Image & Remove button */}
                        <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-surface-container border border-surface-container-high">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => removeFromComparator(item.id)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                            title="Retirer de la comparaison"
                          >
                            ✕
                          </button>
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-medium backdrop-blur-xs">
                            {item.categoryLabel}
                          </span>
                        </div>

                        {/* Title & Actions */}
                        <div>
                          <h4 className="text-base font-extrabold text-on-surface line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="text-xs text-on-surface-variant block mt-0.5">
                            {item.location}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleOpenDetail(item.id)}
                          className="w-full py-2 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-1 hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
                        >
                          <span>Voir la fiche détaillée</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </th>
                  ))}

                  {/* Empty slot placeholder if < 4 */}
                  {comparedItems.length < 4 && (
                    <th className="p-4 sm:p-6 text-center w-60 align-middle">
                      <button
                        onClick={() => setAddModalOpen(true)}
                        className="w-full h-48 rounded-2xl border-2 border-dashed border-surface-container-highest hover:border-primary flex flex-col items-center justify-center gap-2 text-outline hover:text-primary transition-all cursor-pointer bg-surface/50"
                      >
                        <span className="material-symbols-outlined text-[32px]">add_circle</span>
                        <span className="text-xs font-bold">Ajouter un autre</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-surface-container-high text-xs sm:text-sm">
                {/* Tarif Row */}
                <tr className="hover:bg-surface-container/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-on-surface">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">payments</span>
                      <span>Tarif direct</span>
                    </div>
                  </td>
                  {comparedItems.map((item) => (
                    <td key={item.id} className="p-4 sm:p-5">
                      <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-black text-primary">
                          {item.priceDisplay}
                        </span>
                        {item.priceSubtitle && (
                          <span className="text-xs text-on-surface-variant font-medium">
                            {item.priceSubtitle}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                  {comparedItems.length < 4 && <td />}
                </tr>

                {/* Moyens de paiement Row */}
                <tr className="hover:bg-surface-container/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-on-surface">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">account_balance_wallet</span>
                      <span>Paiements acceptés</span>
                    </div>
                  </td>
                  {comparedItems.map((item) => (
                    <td key={item.id} className="p-4 sm:p-5">
                      <div className="flex flex-wrap gap-1.5">
                        {item.payments.map((p, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface border border-surface-container text-xs font-semibold text-on-surface"
                          >
                            <PaymentLogo type={p} size="xs" />
                            <span>{p}</span>
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] text-green-700 font-semibold block mt-1.5">
                        ✓ 0% commission client
                      </span>
                    </td>
                  ))}
                  {comparedItems.length < 4 && <td />}
                </tr>

                {/* Avis & Note Row */}
                <tr className="hover:bg-surface-container/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-on-surface">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-amber-500">star</span>
                      <span>Note clients</span>
                    </div>
                  </td>
                  {comparedItems.map((item) => (
                    <td key={item.id} className="p-4 sm:p-5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 font-black text-sm">
                          ★ {item.rating}
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          ({item.reviewsCount || 250} avis vérifiés)
                        </span>
                      </div>
                    </td>
                  ))}
                  {comparedItems.length < 4 && <td />}
                </tr>

                {/* Points Forts Row */}
                <tr className="hover:bg-surface-container/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-on-surface">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-emerald-600">thumb_up</span>
                      <span>Points forts majeurs</span>
                    </div>
                  </td>
                  {comparedItems.map((item) => (
                    <td key={item.id} className="p-4 sm:p-5">
                      <ul className="space-y-1.5">
                        {(item.pros || ['Qualité reconnue', 'Paiement sans contact rapide']).map(
                          (pro, i) => (
                            <li key={i} className="text-xs text-on-surface flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{pro}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </td>
                  ))}
                  {comparedItems.length < 4 && <td />}
                </tr>

                {/* Caractéristiques & Services Row */}
                <tr className="hover:bg-surface-container/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-on-surface">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
                      <span>Équipements & Services</span>
                    </div>
                  </td>
                  {comparedItems.map((item) => (
                    <td key={item.id} className="p-4 sm:p-5">
                      <div className="flex flex-wrap gap-1">
                        {(item.features || ['Wifi', 'Climatisation', 'Facture']).map((f, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-surface-container-high text-[11px] font-medium text-on-surface"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                  {comparedItems.length < 4 && <td />}
                </tr>

                {/* Horaires d'ouverture Row */}
                <tr className="hover:bg-surface-container/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-on-surface">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-outline">schedule</span>
                      <span>Disponibilité & Horaires</span>
                    </div>
                  </td>
                  {comparedItems.map((item) => (
                    <td key={item.id} className="p-4 sm:p-5 text-xs text-on-surface-variant font-medium">
                      {item.openingHours || 'Lun - Sam : 09h00 - 20h00'}
                    </td>
                  ))}
                  {comparedItems.length < 4 && <td />}
                </tr>

                {/* Actions Row */}
                <tr className="bg-surface-container/20">
                  <td className="p-4 sm:p-5 font-bold text-on-surface">
                    <span>Décision directe</span>
                  </td>
                  {comparedItems.map((item) => (
                    <td key={item.id} className="p-4 sm:p-5">
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(item.id)}
                          className="w-full py-2.5 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center gap-1 hover:bg-primary/90 transition-all cursor-pointer shadow-xs"
                        >
                          Choisir & Voir détails
                        </button>
                        {item.whatsapp && (
                          <a
                            href={`https://wa.me/${item.whatsapp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1 transition-colors text-center"
                          >
                            <span className="material-symbols-outlined text-[16px]">chat</span>
                            <span>Contacter WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </td>
                  ))}
                  {comparedItems.length < 4 && <td />}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-surface-container-high rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-surface-container flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-on-surface">
                  Ajouter un produit ou établissement
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Sélectionnez parmi tous les articles et commerces vérifiés
                </p>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Search Bar */}
            <div className="p-4 border-b border-surface-container bg-surface-container-low">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  placeholder="Rechercher par nom, ville, catégorie (ex: iPhone, Hôtel, Dakar)..."
                  className="w-full h-11 pl-10 pr-4 bg-surface rounded-xl border border-surface-container-high text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Modal List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {availableItems.length === 0 ? (
                <div className="text-center py-10 text-xs sm:text-sm text-outline">
                  Aucun résultat trouvé ou tous les éléments sont déjà dans votre comparateur.
                </div>
              ) : (
                availableItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-surface hover:bg-surface-container border border-surface-container-high flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface-container text-outline uppercase">
                          {item.categoryLabel} • {item.city}
                        </span>
                        <h4 className="text-sm font-bold text-on-surface line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="text-xs font-black text-primary">
                          {item.priceDisplay}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToComparator(item);
                        setAddModalOpen(false);
                      }}
                      className="px-4 py-2 rounded-full bg-primary text-white font-bold text-xs flex items-center gap-1 hover:bg-primary/90 transition-all cursor-pointer shrink-0"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      <span>Comparer</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
