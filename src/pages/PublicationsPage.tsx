import React, { useState } from 'react';
import { PageId, PublicationItem } from '../types';
import { useToast } from '../context/ToastContext';

interface PublicationsPageProps {
  onNavigate: (page: PageId) => void;
}

export const PublicationsPage: React.FC<PublicationsPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [filter, setFilter] = useState<'all' | 'active' | 'scheduled' | 'archived'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [publications, setPublications] = useState<PublicationItem[]>([
    {
      id: 'PUB-1',
      title: 'Offre Déjeuner Express -20%',
      type: 'Promotion',
      status: 'active',
      validUntil: '30 Octobre 2024',
      views: 1240,
      shares: 84,
      paymentTag: 'Wave & Orange Money',
      description:
        'Bénéficiez de 20% de réduction sur notre formule midi complète en réglant par Wave ou Orange Money sur place.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAvixOU59n7Kpphg2690kTJYbVsjuZTXqXCg5jc0n2gNd_cMLF4qtnKIJfE4Wfg_u-M2xxlOSD4CiOH5j8vWLkgFjc8QB-i4ZRnhvUXMhRXHM7-ARuMSHVLp4TCaT3NrCQVOTyUgWdWcz6ANMJNgM6HB_tzlddm_hcS1Ikt-4XHFblY93FYt5-jGkgUCNgr5ow8y88Q2fv5AU9Q4aJS32Y3lzDY-6EuFYlnnu87XGdsQgvYS2otyfxpMA',
    },
    {
      id: 'PUB-2',
      title: 'Menu Spécial Fêtes & Week-end',
      type: 'Menu Spécial',
      status: 'active',
      validUntil: '15 Novembre 2024',
      views: 2890,
      shares: 142,
      paymentTag: 'Cartes & Wave',
      description:
        'Découvrez nos 5 plats gastronomiques inédits avec accord mets et vins. Réservation sur place sans prépaiement.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBfyft-T9k6BVIh_8b6s0FbaLEPGyJl7KGvwhwS7dvaZyDoimMDXF2rctUts_5MHvoVC_ZSBGKJR88MwwcOPgidAu4iXhmx0PIHUPHxTfuIfB6kz5K4NHMpQ67Zc9GtJe3NcK5oKWLWuTot3kyRFj55t2KLYNg5G4gJFRaKi4jyHZA8qfKtJQFYDp-_ed8IfII7gUV2hMS3YOguG5xSmmDBG7t4bsZgkccQJLeHVJkz-_yvrftQY3s_yQ',
    },
    {
      id: 'PUB-3',
      title: 'Happy Hour Rooftop Cocktails',
      type: 'Événement',
      status: 'active',
      validUntil: 'Chaque Vendredi',
      views: 980,
      shares: 67,
      paymentTag: 'Orange Money',
      description:
        'Un cocktail acheté = un cocktail offert entre 18h et 21h sur présentation de votre application lukaAI.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD4ybxtjfpGnzu6nUfZ0fY6d2daOc8wB4TBVE1cwOp34YHt6ftwchkJTNpwWoCPiwiFqFCnQ4yYQiAlKrLpU9nkmRRnf9LBhBErZVqMsbz6BAcPte3WnkPhd-4InymIdEV1yitUZhdQ_hHQrJJ20hjb7tub19qgLVX6niG_VbDwx9kw_18wwvG5RY84w9IY5v1fYzEbePtLsUP7RPyLrtx1KORegeFAG0Zdddr8c8ybYpuw6LQj-31LBw',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Promotion');
  const [newDesc, setNewDesc] = useState('');
  const [newPaymentTag, setNewPaymentTag] = useState('Wave & Orange Money');
  const [newValid, setNewValid] = useState('Fin du mois');

  const handleCreatePub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPub: PublicationItem = {
      id: `PUB-${Date.now().toString().slice(-4)}`,
      title: newTitle,
      type: newType,
      status: 'active',
      validUntil: newValid,
      views: 1,
      shares: 0,
      paymentTag: newPaymentTag,
      description: newDesc,
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAKxMHZGcQFbWwmpyeJhAXX9NKGf7rsa3dO44Ra8XFV8RwvXMov4bSDTCLb59csozK_ST-j_WQKjpHFD79cf4r3lI0VZ-eh7wvdWSRtDXsuHA6DivGt5ROabcOxXjP8eOhMclSpfHN6R__buq3AX20DWD9Qtt5D8pcbgaUGDn5n-pxRhZxzciZCyttSjSJSQYQueOiyJZeypK11crKFTB7wobdOz8ToagKUxHomD2EAPKrztZMgnB5p5A',
    };

    setPublications([newPub, ...publications]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const filteredPubs = publications.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <div className="flex flex-col w-full bg-surface">
      <div className="max-w-7xl mx-auto w-full px-space-lg py-space-xl flex flex-col gap-space-xl">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md pb-space-lg border-b border-surface-container">
          <div>
            <div className="flex items-center gap-space-xs text-primary font-label-md uppercase tracking-wider mb-1 font-bold">
              <span className="material-symbols-outlined text-[18px]">campaign</span>
              <span>Gestion des Publications & Offres</span>
            </div>
            <h1 className="text-headline-xl font-bold text-on-surface">
              Animez votre visibilité et diffusez vos offres
            </h1>
            <p className="text-body-md text-on-surface-variant mt-1">
              Vos publications s'affichent en temps réel dans les résultats de recherche et sont recommandées par le
              Concierge AI.
            </p>
          </div>

          <div className="flex items-center gap-space-sm">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-5 py-2.5 bg-surface-container-high text-on-surface rounded-full font-label-lg font-semibold hover:bg-surface-container-highest transition-all cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>Tableau de bord</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>Créer une publication</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-full font-label-md font-bold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Toutes ({publications.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-5 py-2 rounded-full font-label-md font-bold transition-all cursor-pointer ${
              filter === 'active'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Actives ({publications.filter((p) => p.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('scheduled')}
            className={`px-5 py-2 rounded-full font-label-md font-bold transition-all cursor-pointer ${
              filter === 'scheduled'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Programmées (0)
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`px-5 py-2 rounded-full font-label-md font-bold transition-all cursor-pointer ${
              filter === 'archived'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Archivées (0)
          </button>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {filteredPubs.map((pub) => (
            <div
              key={pub.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                <img
                  src={pub.imageUrl}
                  alt={pub.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-bold shadow-md">
                  {pub.type}
                </div>
                <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm text-on-surface px-3 py-1 rounded-full text-label-sm font-bold shadow-sm">
                  {pub.paymentTag}
                </div>
              </div>

              <div className="p-space-lg flex flex-col gap-space-sm flex-1 justify-between">
                <div>
                  <span className="text-body-sm text-outline">Valide jusqu'au {pub.validUntil}</span>
                  <h3 className="text-headline-sm font-bold text-on-surface mt-1">{pub.title}</h3>
                  <p className="text-body-md text-on-surface-variant mt-2 line-clamp-2">{pub.description}</p>
                </div>

                <div className="pt-space-md border-t border-surface-container flex items-center justify-between mt-space-md">
                  <div className="flex items-center gap-space-md text-body-sm text-outline">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      {pub.views} vues
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">share</span>
                      {pub.shares} partages
                    </span>
                  </div>
                  <button
                    onClick={() => showToast(`Publication « ${pub.title} » mise en avant avec succès !`, 'success')}
                    className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
                    title="Promouvoir"
                  >
                    <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: New Publication */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-xl shadow-2xl flex flex-col gap-space-lg relative border border-surface-container">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div>
                <span className="text-label-sm text-primary font-bold uppercase tracking-wider">
                  Diffusion en temps réel
                </span>
                <h2 className="text-headline-lg font-bold text-on-surface">Créer une publication</h2>
                <p className="text-body-sm text-outline">
                  Cette offre sera visible auprès de tous les clients recherchant des adresses compatibles dans votre ville.
                </p>
              </div>

              <form onSubmit={handleCreatePub} className="flex flex-col gap-space-md">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md font-bold text-on-surface">Titre de l'offre *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Formule Midi Express 10 000 FCFA"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md font-bold text-on-surface">Type d'offre</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Promotion">Promotion</option>
                      <option value="Menu Spécial">Menu Spécial</option>
                      <option value="Événement">Événement</option>
                      <option value="Nouveauté">Nouveauté</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-md font-bold text-on-surface">Paiement valorisé</label>
                    <select
                      value={newPaymentTag}
                      onChange={(e) => setNewPaymentTag(e.target.value)}
                      className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Wave & Orange Money">Wave & Orange Money</option>
                      <option value="Cartes & Wave">Cartes & Wave</option>
                      <option value="Tous paiements">Tous paiements</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md font-bold text-on-surface">Date de fin</label>
                  <input
                    type="text"
                    placeholder="Ex: 31 Décembre 2024"
                    value={newValid}
                    onChange={(e) => setNewValid(e.target.value)}
                    className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-label-md font-bold text-on-surface">Description / Conditions</label>
                  <textarea
                    rows={3}
                    placeholder="Détaillez votre offre (réductions, horaires, conditions de paiement sur place)..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="p-3 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-space-sm pt-space-md border-t border-surface-container">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 bg-surface-container text-on-surface rounded-full font-label-md font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary text-on-primary rounded-full font-label-md font-bold hover:bg-primary/90 transition-all shadow-md cursor-pointer"
                  >
                    Publier immédiatement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
