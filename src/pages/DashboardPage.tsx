import React, { useState } from 'react';
import { PageId } from '../types';
import { useToast } from '../context/ToastContext';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
}

interface BookingRecord {
  id: string;
  client: string;
  partySize: number;
  date: string;
  time: string;
  paymentExpected: string;
  status: 'Confirmé' | 'Terminé' | 'En attente';
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [activePaymentWave, setActivePaymentWave] = useState(true);
  const [activePaymentOM, setActivePaymentOM] = useState(true);
  const [activePaymentCards, setActivePaymentCards] = useState(true);

  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'BK-9021',
      client: 'Moussa Diop',
      partySize: 4,
      date: "Aujourd'hui",
      time: '13h30',
      paymentExpected: 'Wave',
      status: 'Confirmé',
    },
    {
      id: 'BK-9022',
      client: 'Aïssatou Sow',
      partySize: 2,
      date: "Aujourd'hui",
      time: '14h00',
      paymentExpected: 'Orange Money',
      status: 'Confirmé',
    },
    {
      id: 'BK-9023',
      client: 'David Laurent',
      partySize: 6,
      date: 'Demain',
      time: '20h00',
      paymentExpected: 'Cartes bancaires',
      status: 'En attente',
    },
    {
      id: 'BK-9024',
      client: 'Fatou Kébé',
      partySize: 2,
      date: 'Hier',
      time: '12h45',
      paymentExpected: 'Wave',
      status: 'Terminé',
    },
  ]);

  const markCompleted = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Terminé' } : b))
    );
  };

  return (
    <div className="flex flex-col w-full bg-surface">
      <div className="max-w-7xl mx-auto w-full px-space-lg py-space-xl flex flex-col gap-space-xl">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md pb-space-lg border-b border-surface-container">
          <div>
            <div className="flex items-center gap-space-xs text-primary font-label-md uppercase tracking-wider mb-1 font-bold">
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              <span>Tableau de Bord Gérant</span>
            </div>
            <div className="flex items-center gap-space-sm flex-wrap">
              <h1 className="text-headline-xl font-bold text-on-surface">Le Jardin Gourmand</h1>
              <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-label-sm font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>Établissement Vérifié lukaAI</span>
              </span>
              <span className="text-body-sm text-outline font-medium">Dakar, Plateau</span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm flex-wrap">
            <button
              onClick={() => onNavigate('publications')}
              className="px-5 py-2.5 bg-primary text-on-primary rounded-full font-label-lg font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">post_add</span>
              <span>Nouvelle publication</span>
            </button>
            <button
              onClick={() => onNavigate('compte')}
              className="px-5 py-2.5 bg-surface-container-high text-on-surface rounded-full font-label-lg font-semibold hover:bg-surface-container-highest transition-all cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
              <span>Paramètres</span>
            </button>
          </div>
        </div>

        {/* 4 KPIs Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-low p-space-lg rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-outline font-medium">Vues de la fiche</span>
              <span className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">visibility</span>
              </span>
            </div>
            <div className="mt-4">
              <div className="text-headline-xl font-bold text-on-surface">14 250</div>
              <div className="flex items-center gap-1 text-label-sm text-emerald-600 font-bold mt-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>+18.4% ce mois</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-lg rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-outline font-medium">Demandes d'itinéraire</span>
              <span className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">directions</span>
              </span>
            </div>
            <div className="mt-4">
              <div className="text-headline-xl font-bold text-on-surface">1 420</div>
              <div className="flex items-center gap-1 text-label-sm text-emerald-600 font-bold mt-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>+12.1% ce mois</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-lg rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-outline font-medium">Intentions de paiement</span>
              <span className="w-10 h-10 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </span>
            </div>
            <div className="mt-4">
              <div className="text-headline-xl font-bold text-on-surface">845</div>
              <div className="flex items-center gap-1 text-label-sm text-emerald-600 font-bold mt-1">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>+24.8% ce mois</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-lg rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-outline font-medium">Satisfaction clients</span>
              <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </span>
            </div>
            <div className="mt-4">
              <div className="text-headline-xl font-bold text-on-surface">4.8 / 5</div>
              <div className="text-body-sm text-outline mt-1">Sur 420 avis certifiés</div>
            </div>
          </div>
        </div>

        {/* Middle Section: Payment Methods Config & Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {/* Quick Payment Toggles */}
          <div className="bg-surface-container-low p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md border border-surface-container">
            <div className="flex items-center justify-between">
              <h3 className="text-headline-sm font-bold text-on-surface">Moyens de paiement actifs</h3>
              <span className="text-label-sm text-primary font-bold">Temps réel</span>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Les clients consultant votre fiche voient instantanément ces modes de paiement acceptés sur place :
            </p>

            <div className="flex flex-col gap-space-sm mt-2">
              <div className="flex items-center justify-between p-space-sm bg-surface rounded-xl border border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                  <span className="text-body-md font-bold text-on-surface">Wave Mobile</span>
                </div>
                <button
                  onClick={() => setActivePaymentWave(!activePaymentWave)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    activePaymentWave ? 'bg-primary' : 'bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      activePaymentWave ? 'right-0.5' : 'left-0.5'
                    }`}
                  ></span>
                </button>
              </div>

              <div className="flex items-center justify-between p-space-sm bg-surface rounded-xl border border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  <span className="text-body-md font-bold text-on-surface">Orange Money</span>
                </div>
                <button
                  onClick={() => setActivePaymentOM(!activePaymentOM)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    activePaymentOM ? 'bg-primary' : 'bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      activePaymentOM ? 'right-0.5' : 'left-0.5'
                    }`}
                  ></span>
                </button>
              </div>

              <div className="flex items-center justify-between p-space-sm bg-surface rounded-xl border border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-body-md font-bold text-on-surface">Cartes Bancaires TPE</span>
                </div>
                <button
                  onClick={() => setActivePaymentCards(!activePaymentCards)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    activePaymentCards ? 'bg-primary' : 'bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      activePaymentCards ? 'right-0.5' : 'left-0.5'
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          </div>

          {/* Payment Usage Distribution */}
          <div className="lg:col-span-2 bg-surface-container-low p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md border border-surface-container">
            <div className="flex items-center justify-between">
              <h3 className="text-headline-sm font-bold text-on-surface">Répartition des paiements déclarés sur place</h3>
              <span className="text-label-sm text-outline">30 derniers jours</span>
            </div>

            <div className="flex flex-col gap-space-md mt-2">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-body-sm">
                  <span className="font-semibold text-on-surface">Wave</span>
                  <span className="text-primary font-bold">48%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '48%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-body-sm">
                  <span className="font-semibold text-on-surface">Orange Money</span>
                  <span className="text-primary font-bold">34%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-body-sm">
                  <span className="font-semibold text-on-surface">Cartes bancaires (Visa / Mastercard)</span>
                  <span className="text-primary font-bold">14%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '14%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-body-sm">
                  <span className="font-semibold text-on-surface">Espèces & Autres</span>
                  <span className="text-primary font-bold">4%</span>
                </div>
                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-surface-container-highest rounded-full" style={{ width: '4%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings & Incoming Visits Table */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-space-lg flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-headline-md font-bold text-on-surface">Venues & Réservations Récentes</h3>
              <p className="text-body-sm text-outline">
                Visiteurs ayant déclaré leur venue sur place avec leur mode de règlement prévu
              </p>
            </div>
            <button
              onClick={() => showToast('Export des réservations au format CSV généré avec succès !', 'success')}
              className="px-4 py-2 bg-surface-container text-on-surface rounded-lg text-label-md font-semibold hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              Exporter CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container text-label-md text-on-surface-variant">
                  <th className="py-3 px-4">Réf</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Couverts</th>
                  <th className="py-3 px-4">Date & Heure</th>
                  <th className="py-3 px-4">Paiement prévu</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container text-body-md text-on-surface">
                {bookings.map((bk) => (
                  <tr key={bk.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-outline">{bk.id}</td>
                    <td className="py-3 px-4 font-bold">{bk.client}</td>
                    <td className="py-3 px-4">{bk.partySize} pers.</td>
                    <td className="py-3 px-4">
                      {bk.date} à {bk.time}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 bg-surface-container rounded-lg text-label-sm font-semibold">
                        {bk.paymentExpected}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-label-sm font-bold ${
                          bk.status === 'Confirmé'
                            ? 'bg-primary-container text-on-primary-container'
                            : bk.status === 'Terminé'
                            ? 'bg-tertiary-container text-on-tertiary-container'
                            : 'bg-surface-container-high text-outline'
                        }`}
                      >
                        {bk.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {bk.status !== 'Terminé' ? (
                        <button
                          onClick={() => markCompleted(bk.id)}
                          className="px-3 py-1 bg-primary text-on-primary rounded-lg text-label-sm font-bold hover:bg-primary/90 transition-colors cursor-pointer"
                        >
                          Valider venue
                        </button>
                      ) : (
                        <span className="text-body-sm text-outline italic">Visite close</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
