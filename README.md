# lukaAI 🌍💳

> **Plateforme intelligente de découverte locale, annuaire d'établissements et compatibilité Mobile Money & Cartes bancaires en Afrique.**

[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📌 Présentation du Projet

En Afrique (Côte d’Ivoire, Sénégal, Bénin, Cameroun, RDC, Togo, Mali, etc.), les solutions de paiement mobile (**Wave, Orange Money, MTN MoMo, Moov Africa, M-Pesa, Airtel Money**) sont au cœur de l'économie quotidienne, aux côtés des cartes bancaires (**Visa, Mastercard**) et solutions digitales (**PayPal**).

Cependant, il est souvent difficile pour un client, voyageur ou résident de savoir **à l'avance** quel moyen de paiement est effectivement accepté au comptoir d'un restaurant, hôtel, supermarché ou boutique tech.

**lukaAI** résout cette problématique en proposant un annuaire interactif, vérifié et géolocalisé qui connecte les consommateurs aux établissements acceptant leurs moyens de paiement préférés, sans mauvaise surprise ni frais cachés.

---

## ✨ Fonctionnalités Clés

### 1. 📢 Bandeau Ticker d'Annonces & Actualités en Direct
- **Défilement horizontal fluide (Marquee)** situé sous la barre de navigation.
- **Annonces publicitaires & bons plans** pour les hôtels, restaurants et boutiques tech partenaires.
- **Derniers arrivages tech vérifiés** (iPhone 15 Pro, Samsung S24 Ultra, MacBook, PS5...).
- **Contrôles interactifs** : mise en pause automatique au survol de la souris, bouton pause/lecture dédié et redirection immédiate vers les fiches ou filtres en un clic.

### 2. 🔍 Moteur de Recherche & Filtres Avancés
- Recherche par **moyen de paiement** (Wave, Orange Money, MTN MoMo, Moov Africa, Visa, Mastercard, etc.).
- Filtrage par **pays & ville** (Abidjan, Dakar, Cotonou, Douala, Kinshasa, Lomé, Bamako...).
- Tri par catégorie (Hôtels & Résidences, Gastronomie, High-Tech, Boutiques, Santé & Bien-être, Loisirs...).
- Filtres de budget, notes vérifiées et statuts d'ouverture.

### 3. 🏢 Fiches Établissements Détaillées
- Informations complètes : coordonnées, horaires, photos haute définition, localisation.
- **Badges officiels des moyens de paiement acceptés**.
- **Simulateur de transaction intégré** pour calculer les frais éventuels selon le montant.
- **Contact direct en un clic** : appel téléphonique, redirection WhatsApp pré-remplie, itinéraire GPS.

### 4. ⚖️ Comparateur d'Établissements en Temps Réel
- Outil de comparaison côte à côte permettant d'évaluer jusqu'à 3 établissements simultanément (tarifs moyens, services, moyens de paiement acceptés, notes).

### 5. 🤖 lukaAI Concierge (Assistant Intelligent)
- Assistant conversationnel pour obtenir des recommandations sur-mesure d'endroits où sortir, dormir ou faire ses achats en fonction de sa localisation et de son portefeuille mobile.

### 6. 💼 Espace Pro & Inscription Commerçants
- Formulaire dédié permettant aux propriétaires d'établissements de soumettre ou mettre à jour leur commerce, leurs canaux de paiement acceptés et leurs coordonnées.

### 7. 🎨 Logos Officiels Vectoriels Haute Définition
- Reproduction fidèle des identités visuelles officielles au format SVG ultra-léger et responsive :
  - **Wave** (mascotte pingouin officielle et typographie cyan)
  - **Orange Money** (symbole de double flèche sur fond noir & typographie)
  - **MTN MoMo** (ovale noir signature sur fond jaune vif)
  - **Moov Africa** (croissant dynamique orange et mosaïque losange)
  - **M-Pesa** (smartphone rouge et billet vert en mouvement)
  - **Airtel Money** (icône d'onde et rouge distinctif)
  - **Visa, Mastercard, PayPal**

---

## 🛠️ Stack Technique

- **Frontend** : React 19, TypeScript
- **Bundler & Serveur de Dev** : Vite 6
- **Styling** : Tailwind CSS v4, transitions CSS optimisées GPU
- **Icônes** : `lucide-react`
- **Animations** : `motion` (Framer Motion)
- **Backend / Proxy optionnel** : Express & Node.js

---

## 📂 Structure du Répertoire

```bash
lukaAI/
├── public/                 # Fichiers statiques & favicons
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── Footer.tsx            # Pied de page avec récapitulatif des badges de paiement
│   │   ├── Navigation.tsx        # Barre de navigation principale
│   │   ├── PaymentLogo.tsx       # Composant adaptatif d'affichage des badges de paiement
│   │   ├── PaymentLogos.tsx      # Composants vectoriels SVG des logos officiels
│   │   ├── Sidebar.tsx           # Menu latéral mobile
│   │   └── TopTickerBanner.tsx   # Bandeau déroulant d'actualités et publicités
│   ├── context/            # Contextes globaux React
│   │   ├── ComparatorContext.tsx # Gestion de la liste de comparaison
│   │   ├── CountryContext.tsx    # Sélecteur de pays et géolocalisation
│   │   └── ToastContext.tsx      # Système de notifications toast
│   ├── data/               # Données structurées et référentiels
│   │   ├── countries.ts          # Liste des pays et devises d'Afrique
│   │   ├── establishments.ts     # Base de données des commerces vérifiés
│   │   └── payments.ts           # Métadonnées des passerelles de paiement
│   ├── pages/              # Pages de l'application
│   │   ├── HomePage.tsx               # Accueil & découverte
│   │   ├── ExplorerPage.tsx           # Recherche et filtres multicritères
│   │   ├── DetailPage.tsx             # Fiche détaillée d'un établissement
│   │   ├── ComparateurPage.tsx        # Comparaison côte à côte
│   │   ├── ConciergeAIPage.tsx        # Assistant virtuel lukaAI
│   │   ├── EspaceEtablissementPage.tsx # Enregistrement d'un commerce
│   │   ├── PublicationsPage.tsx       # Actualités et bons plans
│   │   ├── DashboardPage.tsx          # Tableau de bord
│   │   ├── ComptePage.tsx             # Gestion du profil
│   │   ├── ConnexionPage.tsx          # Authentification
│   │   └── InscriptionPage.tsx        # Création de compte
│   ├── types.ts            # Définitions TypeScript globales
│   ├── App.tsx             # Composant racine avec routage applicatif
│   ├── main.tsx            # Point d'entrée React
│   └── index.css           # Feuilles de style globales Tailwind CSS
├── index.html              # Fichier HTML principal
├── metadata.json           # Métadonnées du projet AI Studio
├── package.json            # Dépendances et scripts npm
├── tsconfig.json           # Configuration TypeScript
├── vite.config.ts          # Configuration du bundler Vite
└── README.md               # Documentation du projet
```

---

## 🚀 Installation & Démarrage en Local

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- `npm`, `yarn` ou `bun`

### 1. Cloner ou télécharger le dépôt
```bash
git clone https://github.com/<votre-utilisateur>/lukaAI.git
cd lukaAI
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:3000`.

### 4. Compiler pour la production
```bash
npm run build
```
Les fichiers statiques optimisés seront générés dans le dossier `dist/`.

---

## 📤 Exporter ou Pousser vers GitHub

### Option 1 : Depuis l'interface Google AI Studio
1. Cliquez sur le menu déroulant en haut à droite (ou l'icône de paramètres).
2. Sélectionnez **« Export to GitHub »** (ou « Télécharger au format ZIP »).
3. Connectez votre compte GitHub et choisissez le nom du dépôt : le fichier `README.md` ainsi que l'ensemble du code source seront automatiquement publiés sur votre profil GitHub.

### Option 2 : En ligne de commande (Git CLI)
Si vous récupérez le projet en local :
```bash
git init
git add .
git commit -m "feat: initial commit - plateforme lukaAI avec support complet Mobile Money & Cartes"
git branch -M main
git remote add origin https://github.com/<votre-utilisateur>/<votre-depot>.git
git push -u origin main
```

---

## 📄 Licence & Droits

Ce projet est distribué sous licence MIT. Les marques et logos commerciaux cités (Wave, Orange Money, MTN, Moov, M-Pesa, Airtel, Visa, Mastercard, PayPal) sont la propriété respective de leurs titulaires légaux.
