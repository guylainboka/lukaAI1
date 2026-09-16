import React, { useState } from 'react';
import { PageId } from '../types';
import { useToast } from '../context/ToastContext';

interface ComptePageProps {
  onNavigate: (page: PageId) => void;
}

export const ComptePage: React.FC<ComptePageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'favoris' | 'reservations' | 'preferences'>('favoris');
  const [defaultPayment, setDefaultPayment] = useState<'Wave' | 'Orange Money' | 'Cartes'>('Wave');
  const [notifyDeals, setNotifyDeals] = useState(true);

  return (
    <div className="flex flex-col w-full bg-surface">
      <div className="max-w-7xl mx-auto w-full px-space-lg py-space-xl flex flex-col gap-space-xl">
        {/* User Profile Header Card */}
        <div className="bg-surface-container-low rounded-3xl p-space-xl md:p-space-xxl shadow-sm border border-surface-container flex flex-col md:flex-row items-center md:items-start justify-between gap-space-lg">
          <div className="flex flex-col md:flex-row items-center gap-space-lg text-center md:text-left">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-md border-4 border-surface shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3mWDpanfOjV7PcDg8E4iiyFhjPfaAA49Mbft3TUYLOxrzCuGP7MWDH-x31NHP6ftxIcixIJasqj35dME1CfDLS3O_lSDr02W9LOOgw9JyjSl-AZVkFBCnX7M-Sh4C3jxAyJFQnUkqzK5TmED8ZXuKrWOaPsxnKo2TGKT73OLitSmF2t53Lcw6kEGnG2oPPsR-lpTY4_LkPrGuS7ZxVoh_LTtmFMVhM13Bm_dwqzhtaappZjDReJzmvg"
                alt="Aminata Diallo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <h1 className="text-headline-xl font-bold text-on-surface">Aminata Diallo</h1>
                <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-label-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Membre Vérifié</span>
                </span>
              </div>
              <p className="text-body-md text-on-surface-variant mt-1">
                Dakar, Sénégal • aminata.diallo@email.com • +221 77 123 45 67
              </p>
              <div className="flex items-center justify-center md:justify-start gap-space-md mt-space-sm text-body-sm text-outline">
                <span>Membre depuis Janvier 2024</span>
                <span>•</span>
                <span className="text-primary font-semibold">Mode de paiement favori : {defaultPayment}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-space-sm">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-5 py-2.5 bg-surface-container-high text-on-surface rounded-full font-label-md font-semibold hover:bg-surface-container-highest transition-colors cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              <span>Passer en vue Gérant</span>
            </button>
            <button
              onClick={() => {
                showToast('Vous avez été déconnecté avec succès.', 'info');
                onNavigate('home');
              }}
              className="px-4 py-2.5 bg-error/10 text-error rounded-full font-label-md font-semibold hover:bg-error/20 transition-colors cursor-pointer"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* 3 Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
          <div className="bg-surface-container-low p-space-lg rounded-2xl border border-surface-container text-center">
            <div className="text-headline-xl font-bold text-primary">18</div>
            <div className="text-body-sm text-outline">Adresses favorites enregistrées</div>
          </div>
          <div className="bg-surface-container-low p-space-lg rounded-2xl border border-surface-container text-center">
            <div className="text-headline-xl font-bold text-secondary">6</div>
            <div className="text-body-sm text-outline">Réservations sur place honorées</div>
          </div>
          <div className="bg-surface-container-low p-space-lg rounded-2xl border border-surface-container text-center">
            <div className="text-headline-xl font-bold text-tertiary">0 FCFA</div>
            <div className="text-body-sm text-outline">Frais cachés ou commissions payées</div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-space-sm border-b border-surface-container pb-space-sm">
          <button
            onClick={() => setActiveTab('favoris')}
            className={`px-6 py-2.5 rounded-full font-label-lg font-bold transition-all cursor-pointer ${
              activeTab === 'favoris'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Mes Favoris (3)
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-6 py-2.5 rounded-full font-label-lg font-bold transition-all cursor-pointer ${
              activeTab === 'reservations'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Mes Réservations Récentes
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-6 py-2.5 rounded-full font-label-lg font-bold transition-all cursor-pointer ${
              activeTab === 'preferences'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Préférences de Paiement
          </button>
        </div>

        {/* Tab 1: Favoris */}
        {activeTab === 'favoris' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="h-44 w-full bg-surface-container overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvixOU59n7Kpphg2690kTJYbVsjuZTXqXCg5jc0n2gNd_cMLF4qtnKIJfE4Wfg_u-M2xxlOSD4CiOH5j8vWLkgFjc8QB-i4ZRnhvUXMhRXHM7-ARuMSHVLp4TCaT3NrCQVOTyUgWdWcz6ANMJNgM6HB_tzlddm_hcS1Ikt-4XHFblY93FYt5-jGkgUCNgr5ow8y88Q2fv5AU9Q4aJS32Y3lzDY-6EuFYlnnu87XGdsQgvYS2otyfxpMA"
                  alt="Le Jardin Gourmand"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-bold">
                  Wave & OM
                </span>
              </div>
              <div className="p-space-lg flex flex-col gap-2">
                <h3 className="text-headline-sm font-bold text-on-surface">Le Jardin Gourmand</h3>
                <p className="text-body-sm text-outline">Plateau, Dakar • 12 000 FCFA</p>
                <button
                  onClick={() => onNavigate('comparateur')}
                  className="mt-2 w-full py-2 bg-primary text-on-primary rounded-xl font-label-md font-semibold cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  Voir fiche et tarifs
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="h-44 w-full bg-surface-container overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZEwwvefaim74iggzjBxrosji4X6qKMtAQFOd2iLb7x-5pYrNejIOKrxmWcvvsp4nXDJq1SqWW5qWJCJsGMT5tM2qUkadUKkGminkIxvXkF58nVJCq6ecs9S2yXTgd7qajjj_gBrm94ia7b2pMH2tz8CCaDzPd1J8SVR2Au0b-1Q0cZnSMe8DHBvRUB1MYt1_wYIR_epffgZRwr4-RmwNihYSpPmv-_OUviZlQ1jdlaIiwB9T4hFT_yw"
                  alt="Azalaï Hotel"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-bold">
                  Orange & Cartes
                </span>
              </div>
              <div className="p-space-lg flex flex-col gap-2">
                <h3 className="text-headline-sm font-bold text-on-surface">Azalaï Hotel Dakar</h3>
                <p className="text-body-sm text-outline">Corniche Ouest • 45 000 FCFA</p>
                <button
                  onClick={() => onNavigate('comparateur')}
                  className="mt-2 w-full py-2 bg-primary text-on-primary rounded-xl font-label-md font-semibold cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  Voir fiche et tarifs
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="h-44 w-full bg-surface-container overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOtKOLiAzHN1ifnEHM07c91WZeznT748fenWWfG9PNjjtTdcHWOAjb6ZHA5gZWt8mrLQPknvu0WtIpfqP2viyNd17y4Y-wBG5Rd_4xWqQemwKYE87Q55tNvrjAq1l7y2G69GspSt_jNVPT8k_x7SS_1xPAkvw3CEIMVi-CzYfyGd1qpiMkhO1uNJU7BVQEdwaQTWBXgS3byxY3DoU-_qXVSukNTCcgdkIUg-bhGwcUMilnV_tZix6K2A"
                  alt="Noom Hotel"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-bold">
                  Tous paiements
                </span>
              </div>
              <div className="p-space-lg flex flex-col gap-2">
                <h3 className="text-headline-sm font-bold text-on-surface">Noom Hotel Abidjan</h3>
                <p className="text-body-sm text-outline">Plateau, Abidjan • 85 000 FCFA</p>
                <button
                  onClick={() => onNavigate('comparateur')}
                  className="mt-2 w-full py-2 bg-primary text-on-primary rounded-xl font-label-md font-semibold cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  Voir fiche et tarifs
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Reservations */}
        {activeTab === 'reservations' && (
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container overflow-hidden shadow-sm p-space-lg">
            <h3 className="text-headline-md font-bold text-on-surface mb-space-md">
              Historique de vos réservations sans prépaiement
            </h3>
            <div className="flex flex-col gap-space-md">
              <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
                <div>
                  <span className="text-label-sm bg-primary-container text-on-primary-container px-2.5 py-1 rounded font-bold">
                    Confirmé
                  </span>
                  <h4 className="text-headline-sm font-bold text-on-surface mt-2">Le Bistrot Gourmand</h4>
                  <p className="text-body-sm text-on-surface-variant">Table pour 2 pers. • Samedi 20h00</p>
                </div>
                <div className="text-right">
                  <span className="text-body-sm text-outline block">Mode de paiement sur place :</span>
                  <span className="text-label-lg font-bold text-primary">Wave Mobile (0 frais)</span>
                </div>
              </div>

              <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
                <div>
                  <span className="text-label-sm bg-tertiary-container text-on-tertiary-container px-2.5 py-1 rounded font-bold">
                    Honoré
                  </span>
                  <h4 className="text-headline-sm font-bold text-on-surface mt-2">Hôtel Residence Azur</h4>
                  <p className="text-body-sm text-on-surface-variant">Séjour 1 nuit • 12 Octobre</p>
                </div>
                <div className="text-right">
                  <span className="text-body-sm text-outline block">Règlement sur place :</span>
                  <span className="text-label-lg font-bold text-primary">Orange Money (Payé à la réception)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Preferences */}
        {activeTab === 'preferences' && (
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container p-space-xl max-w-2xl flex flex-col gap-space-lg shadow-sm">
            <div>
              <h3 className="text-headline-md font-bold text-on-surface">Préférences de paiement mobile</h3>
              <p className="text-body-md text-on-surface-variant">
                Indiquez à l'application lukaAI et au Concierge votre méthode de prédilection pour prioriser vos
                recommandations.
              </p>
            </div>

            <div className="flex flex-col gap-space-sm">
              <label className="text-label-md font-bold text-on-surface">Mode de paiement par défaut :</label>
              <div className="grid grid-cols-3 gap-space-sm">
                {(['Wave', 'Orange Money', 'Cartes'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setDefaultPayment(method)}
                    className={`p-3 rounded-xl border text-label-md font-bold transition-all cursor-pointer ${
                      defaultPayment === method
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface-container-low text-on-surface border-surface-container hover:bg-surface-container'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-space-md border-t border-surface-container">
              <div>
                <span className="text-label-md font-bold text-on-surface block">Alertes bons plans et promos</span>
                <span className="text-body-sm text-outline">
                  Recevoir les réductions des établissements compatibles Wave et OM.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setNotifyDeals(!notifyDeals)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  notifyDeals ? 'bg-primary' : 'bg-surface-container-high'
                }`}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                    notifyDeals ? 'right-0.5' : 'left-0.5'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
