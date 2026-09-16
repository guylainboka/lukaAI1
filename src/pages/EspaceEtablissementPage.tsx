import React, { useState } from 'react';
import { PageId } from '../types';

interface EspaceEtablissementPageProps {
  onNavigate: (page: PageId) => void;
}

export const EspaceEtablissementPage: React.FC<EspaceEtablissementPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'restaurant',
    city: 'Dakar',
    address: '',
    phone: '',
    managerName: '',
    email: '',
    avgPrice: '15 000 FCFA',
    payments: ['Wave', 'Orange Money'] as string[],
  });

  const [submitted, setSubmitted] = useState(false);

  const togglePayment = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      payments: prev.payments.includes(method)
        ? prev.payments.filter((p) => p !== method)
        : [...prev.payments, method],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full bg-surface">
      <div className="max-w-7xl mx-auto w-full px-space-lg py-space-xl flex flex-col gap-space-xxl">
        {/* Header Hero */}
        <section className="bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-high rounded-3xl p-space-xl md:p-space-xxl flex flex-col md:flex-row items-center justify-between gap-space-xl shadow-sm border border-surface-container-high">
          <div className="flex flex-col gap-space-md max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-primary text-on-primary text-label-sm font-bold rounded-full uppercase tracking-wider">
                Espace Établissement
              </span>
              <span className="text-body-sm text-outline font-medium">Programme Partenaires lukaAI</span>
            </div>
            <h1 className="text-headline-xl md:text-[36px] md:leading-[44px] font-bold text-on-surface tracking-tight">
              Référencez votre établissement sur lukaAI
            </h1>
            <p className="text-body-lg text-on-surface-variant">
              Rejoignez le 1er réseau de commerces et lieux vérifiés avec garantie de paiement sur place. Attirez des
              milliers de clients locaux et voyageurs prêts à consommer avec Mobile Money ou carte bancaire.
            </p>
            <div className="flex items-center gap-space-sm pt-2 flex-wrap">
              <a
                href="#formulaire"
                className="px-6 py-3 bg-primary text-on-primary rounded-full font-label-lg font-bold hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
              >
                Référencer mon établissement
              </a>
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 bg-surface text-on-surface border border-outline-variant rounded-full font-label-lg font-semibold hover:bg-surface-container transition-all cursor-pointer"
              >
                Voir la démo du tableau de bord
              </button>
            </div>
          </div>

          <div className="w-full md:w-80 h-72 rounded-2xl overflow-hidden shadow-lg border border-surface-container shrink-0">
            <img
              className="w-full h-full object-cover"
              alt="Propriétaire restaurant souriant"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB71-pTmtXqJxp6PfakIV47ISctGLHQGwvkAO8jon0FlTLuL90aFtCFno-FsQ_JGwtZd-TNsRBRQLwRt1S-OS4egsRj12Mfx_k2ZdFAqFft15dZonU0wg84ZbTVAVDfPAZM91appQxPgyPQ880VZ2EPq-do6hQ4HCibbBouVEKG0gB6FkJCxK0bct1gxvEX2IuHaVY5-JBCQzz3PJNycOfq72Qa-Z2JOsgs9BFTG8u10kHhQ3jtmWh6Rw"
            />
          </div>
        </section>

        {/* 3 Pillars Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          <div className="bg-surface-container-low p-space-xl rounded-2xl flex flex-col gap-space-sm shadow-sm border border-surface-container">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xl shadow-sm">
              <span className="material-symbols-outlined text-[26px]">visibility</span>
            </div>
            <h3 className="text-headline-sm font-bold text-on-surface">Visibilité Ciblée & Qualifiée</h3>
            <p className="text-body-md text-on-surface-variant">
              Vos futurs clients recherchent activement les lieux acceptant leur mode de paiement habituel (Wave, Orange
              Money, MoMo). Soyez immédiatement en tête de liste.
            </p>
          </div>

          <div className="bg-surface-container-low p-space-xl rounded-2xl flex flex-col gap-space-sm shadow-sm border border-surface-container">
            <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xl shadow-sm">
              <span className="material-symbols-outlined text-[26px]">paid</span>
            </div>
            <h3 className="text-headline-sm font-bold text-on-surface">Zéro Commission sur vos Ventes</h3>
            <p className="text-body-md text-on-surface-variant">
              Aucun prélèvement intermédiaire. Vos clients règlent directement sur place à votre caisse ou réception le
              jour de leur venue en toute autonomie.
            </p>
          </div>

          <div className="bg-surface-container-low p-space-xl rounded-2xl flex flex-col gap-space-sm shadow-sm border border-surface-container">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold text-xl shadow-sm">
              <span className="material-symbols-outlined text-[26px]">smart_toy</span>
            </div>
            <h3 className="text-headline-sm font-bold text-on-surface">Recommandation par IA (Concierge)</h3>
            <p className="text-body-md text-on-surface-variant">
              Notre Concierge lukaAI suggère votre adresse en priorité aux utilisateurs qui posent des questions
              géolocalisées précises en temps réel.
            </p>
          </div>
        </section>

        {/* Partner Registration Form */}
        <section
          id="formulaire"
          className="bg-surface-container-lowest rounded-3xl p-space-xl md:p-space-xxl shadow-md border border-surface-container max-w-4xl mx-auto w-full"
        >
          <div className="flex flex-col gap-2 mb-space-xl text-center md:text-left">
            <span className="text-label-md text-primary font-bold uppercase tracking-wider">
              Enregistrement Facile & Gratuit
            </span>
            <h2 className="text-headline-lg font-bold text-on-surface">Formulaire de référencement partenaire</h2>
            <p className="text-body-md text-on-surface-variant">
              Remplissez les informations ci-dessous pour créer la fiche de votre établissement et activer le badge
              Paiement Garanti.
            </p>
          </div>

          {submitted ? (
            <div className="bg-tertiary-container/20 text-on-tertiary-container p-space-xl rounded-2xl text-center flex flex-col items-center gap-space-md border border-tertiary-container">
              <span className="material-symbols-outlined text-5xl text-tertiary">task_alt</span>
              <h3 className="text-headline-md font-bold">Établissement enregistré avec succès !</h3>
              <p className="text-body-md max-w-md">
                Votre demande a bien été prise en compte. Redirection en cours vers votre tableau de bord gérant...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-space-xl">
              {/* Step 1: General Info */}
              <div className="flex flex-col gap-space-md">
                <h3 className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-sm">
                    1
                  </span>
                  <span>Informations Générales</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md font-bold text-on-surface">Nom de l'établissement *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Le Jardin Gourmand"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md font-bold text-on-surface">Catégorie principale *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="restaurant">Restaurant / Bar / Café</option>
                      <option value="hotel">Hôtel / Résidence / Hébergement</option>
                      <option value="boutique">Boutique / Commerce / Mode</option>
                      <option value="loisir">Loisirs / Activités / Club</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md font-bold text-on-surface">Ville / Pays *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Dakar">Dakar (Sénégal)</option>
                      <option value="Abidjan">Abidjan (Côte d'Ivoire)</option>
                      <option value="Douala">Douala (Cameroun)</option>
                      <option value="Cotonou">Cotonou (Bénin)</option>
                      <option value="Autre">Autre métropole</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md font-bold text-on-surface">Adresse physique précise *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Rue 12, Plateau, Dakar"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Methods */}
              <div className="flex flex-col gap-space-md">
                <h3 className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-sm">
                    2
                  </span>
                  <span>Modes de Paiement Acceptés sur Place</span>
                </h3>
                <p className="text-body-sm text-on-surface-variant">
                  Cochez tous les modes de paiement que vos clients peuvent utiliser directement à votre caisse :
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm">
                  {[
                    { label: 'Wave', icon: 'payments', color: 'text-cyan-500' },
                    { label: 'Orange Money', icon: 'payments', color: 'text-orange-500' },
                    { label: 'MTN MoMo', icon: 'payments', color: 'text-amber-500' },
                    { label: 'Moov Money', icon: 'payments', color: 'text-blue-500' },
                    { label: 'Cartes bancaires (TPE)', icon: 'credit_card', color: 'text-primary' },
                    { label: 'Espèces locales', icon: 'local_atm', color: 'text-emerald-600' },
                  ].map((p, idx) => {
                    const isChecked = formData.payments.includes(p.label);
                    return (
                      <div
                        key={idx}
                        onClick={() => togglePayment(p.label)}
                        className={`p-space-md rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-primary-container/20 border-primary text-on-surface'
                            : 'bg-surface-container-low border-surface-container text-on-surface-variant hover:bg-surface-container'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[20px] ${p.color}`}>{p.icon}</span>
                        <span className="text-label-md font-semibold">{p.label}</span>
                        <span className="material-symbols-outlined text-[18px] ml-auto text-primary">
                          {isChecked ? 'check_box' : 'check_box_outline_blank'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Manager Contact */}
              <div className="flex flex-col gap-space-md">
                <h3 className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-sm">
                    3
                  </span>
                  <span>Coordonnées du Responsable / Gérant</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md font-bold text-on-surface">Nom complet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Babacar Ndiaye"
                      value={formData.managerName}
                      onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                      className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md font-bold text-on-surface">Téléphone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+221 77 000 00 00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md font-bold text-on-surface">Email professionnel *</label>
                    <input
                      type="email"
                      required
                      placeholder="contact@monetablissement.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-md border-t border-surface-container">
                <div className="flex items-center gap-2 text-body-sm text-outline">
                  <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
                  <span>Vos données sont sécurisées et vérifiées par l'équipe lukaAI sous 24h.</span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-primary text-on-primary rounded-full font-label-lg font-bold hover:bg-primary/90 transition-all shadow-md cursor-pointer whitespace-nowrap"
                >
                  Valider et soumettre mon établissement
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};
