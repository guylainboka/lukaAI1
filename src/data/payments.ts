export interface PaymentMethodInfo {
  id: string;
  name: string;
  shortName: string;
  category: 'mobile_money' | 'card' | 'online';
  bgColor: string;
  textColor: string;
  borderColor?: string;
  badgeLabel: string;
  description: string;
  popularIn: string[]; // Country codes: 'CI', 'SN', 'CM', 'CD', 'BJ', 'TG', 'KE', 'UG', 'ALL'
}

export const PAYMENT_METHODS: PaymentMethodInfo[] = [
  {
    id: 'visa',
    name: 'Visa',
    shortName: 'Visa',
    category: 'card',
    bgColor: '#ffffff',
    textColor: '#1a1f71',
    borderColor: '#e2e8f0',
    badgeLabel: 'Carte bancaire',
    description: 'Carte bancaire internationale acceptée sur les TPE et sur place',
    popularIn: ['ALL', 'CI', 'SN', 'CM', 'CD', 'BJ', 'TG', 'KE'],
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    shortName: 'Mastercard',
    category: 'card',
    bgColor: '#ffffff',
    textColor: '#111827',
    borderColor: '#e2e8f0',
    badgeLabel: 'Carte bancaire',
    description: 'Carte de débit et crédit acceptée universellement',
    popularIn: ['ALL', 'CI', 'SN', 'CM', 'CD', 'BJ', 'TG', 'KE'],
  },
  {
    id: 'paypal',
    name: 'PayPal',
    shortName: 'PayPal',
    category: 'online',
    bgColor: '#ffffff',
    textColor: '#003087',
    borderColor: '#e2e8f0',
    badgeLabel: 'Paiement en ligne',
    description: 'Paiement international sécurisé pour voyageurs et diaspora',
    popularIn: ['ALL', 'KE', 'CM', 'CI', 'SN'],
  },
  {
    id: 'wave',
    name: 'Wave',
    shortName: 'Wave',
    category: 'mobile_money',
    bgColor: '#1dc4fa',
    textColor: '#ffffff',
    badgeLabel: 'Mobile Money 1%',
    description: 'Transfert d’argent et règlement instantané avec 1% de frais',
    popularIn: ['CI', 'SN', 'ML', 'BF', 'GM'],
  },
  {
    id: 'moov',
    name: 'Moov Africa',
    shortName: 'Moov Money',
    category: 'mobile_money',
    bgColor: '#005baa',
    textColor: '#ffffff',
    badgeLabel: 'Moov Money',
    description: 'Paiement mobile Moov Africa (Flooz) partout en Afrique de l’Ouest et Centrale',
    popularIn: ['CI', 'BJ', 'TG', 'BF', 'NE', 'GA', 'CF'],
  },
  {
    id: 'mtn',
    name: 'MTN MoMo',
    shortName: 'MTN Money',
    category: 'mobile_money',
    bgColor: '#ffcc00',
    textColor: '#000000',
    badgeLabel: 'MTN MoMo',
    description: 'Le réseau Mobile Money le plus étendu en Côte d’Ivoire, Cameroun, Bénin',
    popularIn: ['CI', 'CM', 'BJ', 'UG', 'GH', 'CG', 'RW'],
  },
  {
    id: 'orange',
    name: 'Orange Money',
    shortName: 'Orange Money',
    category: 'mobile_money',
    bgColor: '#000000',
    textColor: '#ff7900',
    badgeLabel: 'Orange Money',
    description: 'Paiement marchand sécurisé avec QR code et numéro de téléphone',
    popularIn: ['CI', 'SN', 'CM', 'CD', 'ML', 'GN', 'BF', 'MG'],
  },
  {
    id: 'mpesa',
    name: 'M-Pesa',
    shortName: 'M-Pesa',
    category: 'mobile_money',
    bgColor: '#e60000',
    textColor: '#ffffff',
    badgeLabel: 'Vodacom / Safaricom',
    description: 'Paiement mobile leader en RD Congo, Kenya, Tanzanie et Afrique de l’Est',
    popularIn: ['CD', 'KE', 'TZ', 'MZ'],
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
    shortName: 'Airtel Money',
    category: 'mobile_money',
    bgColor: '#e60000',
    textColor: '#ffffff',
    badgeLabel: 'Airtel Money',
    description: 'Paiement mobile instantané présent en RD Congo, Ouganda, Gabon, Congo, Niger',
    popularIn: ['CD', 'UG', 'GA', 'CG', 'NE', 'TD', 'MG', 'KE'],
  },
];
