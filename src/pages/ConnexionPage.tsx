import React, { useState } from 'react';
import { PageId } from '../types';
import { useToast } from '../context/ToastContext';

interface ConnexionPageProps {
  onNavigate: (page: PageId) => void;
}

export const ConnexionPage: React.FC<ConnexionPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [identifier, setIdentifier] = useState('demo@lukaai.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Connexion réussie ! Bienvenue sur votre espace.', 'success');
      onNavigate('compte');
    }, 800);
  };

  const handleQuickMobileLogin = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(`Connexion instantanée validée via ${provider} !`, 'success');
      onNavigate('compte');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full min-h-[80vh] items-center justify-center bg-surface py-space-xl px-space-lg">
      <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl p-space-xl md:p-space-xxl shadow-xl border border-surface-container flex flex-col gap-space-lg">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-space-xs">
          <div
            onClick={() => onNavigate('home')}
            className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-on-primary font-headline font-bold text-headline-lg shadow-md cursor-pointer mb-2"
          >
            lAI
          </div>
          <span className="text-label-sm text-primary font-bold uppercase tracking-wider">Espace Sécurisé</span>
          <h1 className="text-headline-xl font-bold text-on-surface">Bienvenue sur lukaAI</h1>
          <p className="text-body-md text-on-surface-variant">
            Connectez-vous pour retrouver vos favoris, réservations et paramètres de paiement.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1.5">
            <label className="text-label-md font-bold text-on-surface">Email ou Numéro Mobile</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                person
              </span>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Ex: aminata@email.com ou +221..."
                className="w-full h-12 pl-10 pr-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-label-md font-bold text-on-surface">Mot de passe</label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Un lien de réinitialisation a été envoyé à votre adresse email.', 'info');
                }}
                className="text-body-sm text-primary hover:underline cursor-pointer"
              >
                Mot de passe oublié ?
              </a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
                lock
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 pl-10 pr-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full bg-primary text-on-primary rounded-full font-label-lg font-bold hover:bg-primary/90 transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Connexion en cours...</span>
            ) : (
              <>
                <span>Se connecter</span>
                <span className="material-symbols-outlined text-[18px]">login</span>
              </>
            )}
          </button>
        </form>

        {/* Alternative Logins with Wave / Orange Money */}
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center gap-space-sm text-body-sm text-outline">
            <div className="h-px bg-surface-container flex-1"></div>
            <span>ou connexion directe</span>
            <div className="h-px bg-surface-container flex-1"></div>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <button
              type="button"
              onClick={() => handleQuickMobileLogin('Wave')}
              className="h-11 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 text-label-md font-bold flex items-center justify-center gap-2 hover:bg-cyan-100 transition-colors cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span>Wave Mobile</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickMobileLogin('Orange Money')}
              className="h-11 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-label-md font-bold flex items-center justify-center gap-2 hover:bg-orange-100 transition-colors cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span>Orange Money</span>
            </button>
          </div>
        </div>

        <div className="text-center pt-space-xs border-t border-surface-container text-body-md text-on-surface-variant">
          Pas encore de compte ?{' '}
          <button
            onClick={() => onNavigate('inscription')}
            className="text-primary font-bold hover:underline cursor-pointer"
          >
            S'inscrire gratuitement
          </button>
        </div>
      </div>
    </div>
  );
};
