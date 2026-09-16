export type PageId =
  | 'home'
  | 'explorer'
  | 'comparateur'
  | 'detail'
  | 'concierge'
  | 'espace-etablissement'
  | 'dashboard'
  | 'publications'
  | 'compte'
  | 'connexion'
  | 'inscription';

export interface Establishment {
  id: string;
  name: string;
  category: 'restaurant' | 'hotel' | 'boutique' | 'loisir';
  categoryLabel: string;
  city: string;
  location: string;
  rating: number;
  reviewsCount?: number;
  priceDisplay: string;
  priceNumeric?: number;
  priceSubtitle?: string;
  description: string;
  fullDescription?: string;
  payments: string[];
  imageUrl: string;
  gallery?: string[];
  features?: string[];
  pros?: string[];
  cons?: string[];
  openingHours?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  verified?: boolean;
  productType?: 'service' | 'product' | 'venue';
}

export interface PublicationItem {
  id: string;
  title: string;
  type: string;
  status: 'active' | 'scheduled' | 'archived';
  validUntil: string;
  views: number;
  shares: number;
  paymentTag: string;
  description: string;
  imageUrl: string;
}

export interface BookingItem {
  id: string;
  name: string;
  details: string;
  phone: string;
  status: 'Confirmé' | 'En attente';
  paymentMode: string;
}
