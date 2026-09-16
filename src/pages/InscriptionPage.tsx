import React, { useState } from 'react';
import { PageId } from '../types';

interface InscriptionPageProps {
  onNavigate: (page: PageId) => void;
}

export const InscriptionPage: React.FC<InscriptionPageProps> = ({ onNavigate }) => {
  const [accountType, setAccountType] = useState<'user' | 'business'>('user');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      if (accountType === 'business') {
        onNavigate('dashboard');
      } else {
        onNavigate('compte');
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full min-h-[80vh] items-center justify-center bg-surface py-space-xl px-space-lg">
      <div className="bg-surface-container-lowest max-w-xl w-full rounded-3xl p-space-xl md:p-space-xxl shadow-xl border border-surface-container flex flex-col gap-space-lg">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-space-xs">
          <div
            onClick={() => onNavigate('home')}
            className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-on-primary font-headline font-bold text-headline-lg shadow-md cursor-pointer mb-2"
          >
            lAI
          </div>
          <span className="text-label-sm text-primary font-bold uppercase tracking-wider">
            Inscription Rapide & Sécurisée
          </span>
          <h1 className="text-headline-xl font-bold text-on-surface">Créer un compte lukaAI</h1>
          <p className="text-body-md text-on-surface-variant">
            Rejoignez la communauté de la découverte locale intelligente et des paiements sans friction.
          </p>
        </div>

        {/* Account Type Selector */}
        <div className="grid grid-cols-2 gap-space-sm p-1.5 bg-surface-container-low rounded-2xl border border-surface-container">
          <div
            onClick={() => setAccountType('user')}
            className={`p-space-md rounded-xl flex flex-col items-center text-center gap-1 cursor-pointer transition-all ${
              accountType === 'user'
                ? 'bg-surface text-on-surface shadow-sm font-bold'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">person</span>
            <span className="text-label-md">Utilisateur / Client</span>
          </div>

          <div
            onClick={() => setAccountType('business')}
            className={`p-space-md rounded-xl flex flex-col items-center text-center gap-1 cursor-pointer transition-all ${
              accountType === 'business'
                ? 'bg-surface text-on-surface shadow-sm font-bold'
                : 'text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">storefront</span>
            <span className="text-label-md">Établissement / Pro</span>
          </div>
        </div>

        {success ? (
          <div className="bg-tertiary-container/20 text-on-tertiary-container p-space-xl rounded-2xl text-center flex flex-col items-center gap-space-md border border-tertiary-container">
            <span className="material-symbols-outlined text-5xl text-tertiary">check_circle</span>
            <h3 className="text-headline-md font-bold">Compte créé avec succès !</h3>
            <p className="text-body-md">Redirection vers votre espace en cours...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="text-label-md font-bold text-on-surface">Nom complet *</label>
              <input
                type="text"
                required
                placeholder="Ex: Aminata Diallo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label-md font-bold text-on-surface">Adresse email *</label>
              <input
                type="email"
                required
                placeholder="nom@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label-md font-bold text-on-surface">Numéro de téléphone / Mobile Money *</label>
              <input
                type="tel"
                required
                placeholder="+221 77 000 00 00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-label-md font-bold text-on-surface">Mot de passe *</label>
              <input
                type="password"
                required
                placeholder="Au moins 8 caractères"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 px-4 bg-surface-container-low rounded-xl text-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                required
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-body-sm text-on-surface-variant cursor-pointer">
                J'accepte les Conditions Générales d'Utilisation et la garantie de paiement sur place de lukaAI.
              </label>
            </div>

            <button
              type="submit"
              className="h-12 w-full bg-primary text-on-primary rounded-full font-label-lg font-bold hover:bg-primary/90 transition-all shadow-md mt-2 cursor-pointer"
            >
              Créer mon compte {accountType === 'business' ? 'Professionnel' : 'Membre'}
            </button>
          </form>
        )}

        <div className="text-center pt-space-xs border-t border-surface-container text-body-md text-on-surface-variant">
          Vous avez déjà un compte ?{' '}
          <button
            onClick={() => onNavigate('connexion')}
            className="text-primary font-bold hover:underline cursor-pointer"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};
